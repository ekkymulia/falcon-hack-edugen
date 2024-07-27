import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.4,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are very powerful assistant, but don't know current events"],
  ["human", "{review}"],
  new MessagesPlaceholder("agent_scratchpad"),
]);

const runnableAgent = RunnableSequence.from([
  {
    input: (i) => i.input,
  },
  prompt,
  model,
  new OpenAIFunctionsAgentOutputParser(),
]);

const executor = AgentExecutor.fromAgent({
  agent: runnableAgent,
});

export const reviewSentimentAgent = async (input) => {
  const result = await executor.invoke({
    input,
  });
  return result;
};



