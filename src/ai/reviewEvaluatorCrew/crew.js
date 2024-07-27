import { fetchReviewParameter } from "@/app/api/review/parameter/route";
import { reviewSentimentAgent } from "./reviewSentimentAgent";
import { reviewParameterExtractorAgent } from "./reviewParameterExtractorAgent";


export const reviewEvaluatorCrew = async (input) => {
    try {
        const sentimentReview = await reviewSentimentAgent(input);

        const param = await fetchReviewParameter();
        console.log("Fetched Parameters:", param);

        const paramObject = JSON.stringify(param);
        console.log("Parsed Parameters Object:", paramObject);

        const hasilEkstrasi = await reviewParameterExtractorAgent(paramObject, input);
        console.log("Extracted Results:", hasilEkstrasi);


        return { sentimen: sentimentReview, paramObject: paramObject, hasilEkstrasi: hasilEkstrasi };
    } catch (error) {
        console.error("Error in reviewEvaluatorCrew:", error);
        throw error; 
    }
};
