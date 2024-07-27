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
  ["system", `Berikan alasan hasil ekstraksi yang perlu diingat, dari kriteria yang diinputkan pada parameter dibawah ini
    Point Kriteria:
    {parameter}
    
    jika tidak ada menyebutkan salah satu kriteria diatas, isikan kriteria dengan data string kosong, tetpai key adalah parameter nama
    berikan output dengan ditengahi oleh tanda garis | (cth jawaban:  'harga' | 'murah/mahal/sepertinya oke', 'rasa' | suka/tidak suka', 'kemasan' | 'bagus/jelek', 'pengiriman' | 'cepat/lama')
    berikan hasil dalam lowercase dan tanpa tanda kutip
  .`],
  ["human", "{review}"],
]);

const runnableAgent = RunnableSequence.from([
  prompt,
  model,
]);

export const reviewParameterExtractorAgent = async (parameter, review) => {
    console.log("Parameter:", parameter);
    console.log("Review:", review);
  
    const result = await runnableAgent.invoke({ parameter, review });
  
    const parts = result.content.replace(/'/g, '').split(' | ');

    // Step 2: Construct the JSON object
    const jsonObject = [
    parts[1],
    parts[3],
    parts[5],
    parts[7]
    ];

    return jsonObject;
};
