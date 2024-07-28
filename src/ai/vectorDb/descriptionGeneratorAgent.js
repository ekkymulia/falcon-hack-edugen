import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

/**
 * Define your chat model to use.
 */
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.9,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", `Buatkan tambahan deskripsi dari produk yang diberikan berikut ini. Gunakan deskripsi yang sudah ada sebagai referensi, 
  tambahkan harga, rasa, dan keterangan lainnya ke dalam deskripsi tambahan, tujuannya agar bisa memiliki visibilitas dalam vector search.
  Pastikan deskripsi tambahan membahas kategori berikut yang wajib dibahas:
  harga (cth: harga murah/mahal/sesuai)
  rasa (cth: rasa manis/asam/pedas)
  keterangan tambahan lainnya (cth: berat, komposisi bahan, asal produk)
  kalimat jangan hiperbola, dan sertakan keyword keyword agar bisa terindex dengan prompt similarity
  Berikan output dalam satu paragraf yang singkat tapi banyak mencakup keyword.
  `],
  ["human", "{input}"],
]);

const runnableAgent = RunnableSequence.from([
  {
    input: (i) => i.input,
    param: (i) => i.param,
  },
  prompt,
  model,
]);


export const descriptionGeneratorAgent = async (input, param) => {
  const result = await runnableAgent.invoke( { input, param } );
  console.log(result.content)
  return result.content.toLowerCase();
};