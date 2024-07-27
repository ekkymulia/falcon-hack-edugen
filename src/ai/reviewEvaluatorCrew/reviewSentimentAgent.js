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
  ["system", "Tentukan sentimen pada review apakah negatif atau positif. jawab hanya dengan kata positif atau negatif"],
  ["human", "{input}"],
]);

const runnableAgent = RunnableSequence.from([
  {
    input: (i) => i.input,
  },
  prompt,
  model,
]);

export const reviewSentimentAgent = async (input) => {
  const result = await runnableAgent.invoke({ input });
  return result.content.toLowerCase();
};