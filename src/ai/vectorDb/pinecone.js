/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { descriptionGeneratorAgent } from "./descriptionGeneratorAgent";
import { fetchReviewParameter } from "@/app/api/review/parameter/route";

// Instantiate a new Pinecone client, which will automatically read the
// env vars: PINECONE_API_KEY and PINECONE_ENVIRONMENT which come from
// the Pinecone dashboard at https://app.pinecone.io

const pinecone = new Pinecone();

const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);


export const pineconeStore = async (input) => {

  const param = await fetchReviewParameter();

  const additionalDescription = await descriptionGeneratorAgent(JSON.stringify({
    nama: input.nama,
    deskripsi: input.deskripsi,
    price: input.price,
    nama_toko: input.nama_toko
  }), JSON.stringify(param));  

  const docs = [new Document({
    metadata: { nama_toko: input.nama_toko, id_produk: input.id },
    pageContent: additionalDescription,
  })]

  await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
    pineconeIndex,
    maxConcurrency: 5, 
  });
}

