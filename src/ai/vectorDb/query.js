import weaviate, { ApiKey } from "weaviate-ts-client";
import { WeaviateStore } from "@langchain/weaviate";
import { OpenAIEmbeddings } from "@langchain/openai";

function cleanAndChunkText(text, chunkSize = 100) {
  // Remove unwanted characters
  const cleanedText = text.replace(/["'{}]/g, '');

  // Split the text into words
  const words = cleanedText.split(/\s+/);

  // Chunk the text into chunks of 100 words
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }

  return chunks;
}


export async function insertVector(collectionId, text, metadata) {
  try {
    let cleanedtext = cleanAndChunkText(text);

    // Initialize Weaviate client with API Key Authentication
    const client = weaviate.client({
      scheme: process.env.WEAVIATE_SCHEME || 'https',
      host: process.env.WEAVIATE_API_URL || "localhost",
      apiKey: new ApiKey(process.env.WEAVIATE_API_KEY) || undefined, // Ensure your API Key is correctly set
    });

    // Ensure WeaviateStore is available and used correctly
    const adding = await WeaviateStore.fromTexts(
      cleanedtext,
      metadata,
      new OpenAIEmbeddings(),
      {
        client,
        indexName: collectionId,
        textKey: `${metadata.subject}${metadata.module}`,
        metadataKeys: [{ module: metadata.module }],
      }
    );
    console.log(adding);
  } catch (error) {
    console.error('Error inserting vector:', error);
    throw error; // Re-throw error to be handled by calling function
  }
}

export async function queryVector(collectionId, module, text) {
  try {
    // Ensure 'text' is a string
    if (typeof text !== 'string') {
      throw new TypeError('Expected a string for text parameter');
    }

    console.log('collectionId:', collectionId);
    console.log('text:', text);

    // Initialize Weaviate client with API Key Authentication
    const client = weaviate.client({
      scheme: process.env.WEAVIATE_SCHEME || 'https',
      host: process.env.WEAVIATE_API_URL || 'localhost',
      apiKey: new ApiKey(process.env.WEAVIATE_API_KEY) || undefined, // Ensure your API Key is correctly set
    });

    // Ensure WeaviateStore is available and used correctly
    // const store = await WeaviateStore.fromExistingIndex(new OpenAIEmbeddings(), {
    //   client,
    //   indexName: collectionId,
    // });

    // // Search the index without any filters
    // const results = await store.similaritySearch(text, "computerArchitectureMotherboard", 2);
    // console.log('Search Results:', results);

 

    const query = `
      {
        Get {
          ${collectionId} (
            limit: 10
            nearText: {
              concepts: ["${text}"]
            }
          ) {
            ${collectionId.charAt(0).toLowerCase() + collectionId.slice(1)}${module}
          }
        }
      }`;

     
      const response = await fetch('https://ozfntzwwtzseyjukxeglg.c0.asia-southeast1.gcp.weaviate.cloud/v1/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WEAVIATE_API_KEY}`,
          'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY
        },
        body: JSON.stringify({ query })
      });
  
      const data = await response.json();
      // Adjust this line based on the actual structure of your data
      return data.data.Get;
  
  } catch (error) {
    console.error('Error querying vector:', error);
    throw error; // Re-throw error to be handled by calling function
  }
}