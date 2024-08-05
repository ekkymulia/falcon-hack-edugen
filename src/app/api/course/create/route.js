import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import fs from 'fs';
import path from 'path';
import { uploadFile } from '@/ai/vectorDb/llamaparse'; // Keep existing uploadFile code
import { createCollection } from '@/ai/vectorDb/weaviate'; // Import or implement createCollection
import fetch from 'node-fetch'; // For fetching data from the Llama Cloud endpoint
import { insertVector } from '@/ai/vectorDb/query';

const prisma = new PrismaClient();

const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export async function POST(request) {
    try {
        const formData = await request.formData();
        const subjectName = formData.get('subjectName');
        const modules = [];

        // Extract modules and files from formData
        for (let [key, value] of formData.entries()) {
            if (key.startsWith('modules[')) {
                const [moduleIndex, field] = key.match(/modules\[(\d+)\]\.(.*)/).slice(1);
                const index = parseInt(moduleIndex);

                if (!modules[index]) {
                    modules[index] = {};
                }

                if (field === 'name') {
                    modules[index].name = value;
                } else if (field === 'file') {
                    modules[index].file = value;
                }
            }
        }

        if (!subjectName) {
            return new Response(
                JSON.stringify({ error: 'Subject name is required' }),
                { status: 400, headers: corsHeaders }
            );
        }

        // Create new subject
        const newSubject = await prisma.subject.create({
            data: { name: subjectName },
        });

        // Create vector collection for the new subject
        const collectionId = await createCollection(newSubject.name);

        const modulePromises = modules.map(async (module) => {
            const fileUpload = module.file;
            let fileId = uuidv4(); // Generate a unique file ID
            let parseId = null;

            if (fileUpload) {
                // Use the existing uploadFile function
                const uploadResponse = await uploadFile(fileUpload);
                parseId = uploadResponse.id; // Use parseId from uploadFile response

                // Save file to public folder
                const fileName = fileUpload.name || fileId; // Use original file name or generated fileId
                const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
                await fs.promises.mkdir(path.dirname(filePath), { recursive: true }); // Ensure directory exists

                // Convert ArrayBuffer to Buffer
                const arrayBuffer = await fileUpload.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                await fs.promises.writeFile(filePath, buffer);
            }

            // Create or update file record
            const filePrisma = fileUpload
                ? await prisma.file.create({
                    data: {
                        name: fileUpload.name,
                        parseId: parseId || '', // Store parseId if available
                    },
                })
                : null;

            // Create module and associate with the subject
            await prisma.module.create({
                data: {
                    name: module.name,
                    fileId: filePrisma ? filePrisma.id : undefined, // Only include if fileId is not null
                    subjectId: newSubject.id,
                },
            });

            return filePrisma;
        });

        // Wait for all file records to be created
        const fileRecords = await Promise.all(modulePromises);

        // Function to fetch parsed data from Llama Cloud
        const fetchParsedData = async (parseId) => {
            const response = await fetch(`https://api.cloud.llamaindex.ai/api/parsing/job/${parseId}/result/markdown`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${process.env.LLAMA_CLOUD_API_KEY}`, // Use your actual API key
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch parsed data from Llama Cloud');
            }

            return await response.json();
        };

        // Fetch parsed data and insert vectors
        await Promise.all(modules.map(async (module, index) => {
            if (module.file) {
                const filePrisma = fileRecords[index];
                if (filePrisma && filePrisma.parseId) {
                    const parsedData = await fetchParsedData(filePrisma.parseId);
                    console.log(collectionId, parsedData.markdown, { subject: newSubject.name, module: module.name })
                    // Example: Assume parsedData has markdown and metadata fields
                    await insertVector(newSubject.name.replace(/\s+/g, ''), parsedData.markdown, { subject: newSubject.name.replace(/\s+/g, ''), module: module.name.replace(/\s+/g, '') });
                }
            }
        }));

        return new Response(
            JSON.stringify({ success: true, collectionId }),
            { status: 200, headers: corsHeaders }
        );

    } catch (error) {
        console.error('Internal Server Error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500, headers: corsHeaders }
        );
    }
}
