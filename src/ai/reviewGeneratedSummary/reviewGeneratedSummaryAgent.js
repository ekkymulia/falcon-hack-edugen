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

const prompt = ChatPromptTemplate.fromMessages(
  ["system", "Indentikfikasi lah dari data yang diberikan untuk memberikan summary rangkuman terhadap restoran, buatkan 3 paragraf masing masing pada topik: HARGA, RASA dan LAYANAN dari feedback yang ada. tampilkan hasil dengan dipisahkan oleh []. Contoh jawaban: [[rasa, Restoran ini sering mendapat pujian. Beberapa customer mendeskripsikan rasanya enak, gurih, bumbunya berasa.],[harga,Sebagian besar customer merasa harga di restoran ini murah dan banyak promo.],[Layanan,Beberapa customer mengeluhkan proses masak yang lumayan lama.]. Berikan hasil dalam lowercase dan tanpa tanda kutip."],
  ["human", "Produk: {produk}. Review: {review}"],
);

const runnableAgent = RunnableSequence.from([
  prompt,
  model,
]);

export const reviewGeneratedSummaryAgent = async (produk, review) => {
  
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