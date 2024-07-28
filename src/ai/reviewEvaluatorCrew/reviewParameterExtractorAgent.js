import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

/**
 * Define your chat model to use.
 */
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 1,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", `Identifikasi dan rangkumlah hal yang berkaitan tentang pengguna yang dapat diingat, misalnya rasa, harga, dan selera. Berikanlah kategori yang sesuai dan tampilkan hasil dengan dipisahkan oleh []. Contoh jawaban: [[harga, pengguna suka yang murah],[rasa,pengguna suka yang manis],[kemasan,pengguna suka yang lucu],[pengiriman,pengguna tidak suka menunggu lama],[makanan,pengguna suka mie pedas]]. Berikan hasil dalam lowercase dan tanpa tanda kutip.`],
  ["human", "Bill: Porduk yang dibeli: {produk}. Review: {review}"],
]);

const runnableAgent = RunnableSequence.from([
  prompt,
  model,
]);

export const reviewParameterExtractorAgent = async (produk, review) => {
    console.log("Parameter:", produk);
    console.log("Review:", review);
  
    const result = await runnableAgent.invoke({ produk, review });
  
    // Parse the result to extract the desired format
    const parsedResult = result.content.match(/\[\[(.*?)\]\]/)[1].split('],[')
      .map(item => item.replace(/[\[\]]/g, '').split(','));
  
    const list = parsedResult.map(([category, feedback]) => [category.trim(), feedback.trim()]);
  
    list.forEach(item => {
      console.log(item[0], item[1]);
    });
  
    return list;
  };