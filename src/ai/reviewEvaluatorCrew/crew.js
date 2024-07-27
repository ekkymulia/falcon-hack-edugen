import { RunnableSequence } from "@langchain/core/runnables";
import { AgentExecutor } from "langchain/agents";
import { OpenAIFunctionsAgentOutputParser } from "langchain/agents/openai/output_parser";
import { reviewSentimentAgent } from "./reviewSentimentAgent";


export const reviewEvaluatorCrew = (input) => {
  const sentimentReview = reviewSentimentAgent(input);

  return sentimentReview;

  
}