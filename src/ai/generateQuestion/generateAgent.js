export async function generateQuestion(topic) {
    try {
        const response = await fetch('https://api.ai71.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AI71_API_KEY}`
            },
            body: JSON.stringify({
                model: 'tiiuae/falcon-180B-chat',
                messages: [
                    { role: 'system', content: `Make one short Question, in mission to get more info from the knowledge base` },
                    { role: 'user', content: `Write me a short Question about ${topic}` }
                ]
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export async function validateQuestion(question, infoKnowledgeBase, formatWanted){
    try {
        const response = await fetch('https://api.ai71.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AI71_API_KEY}`
            },
            body: JSON.stringify({
                model: 'tiiuae/falcon-180B-chat',
                messages: [
                    { role: 'system', content: `Validate the question with short Question with Knowledgebase, in mission to make a question and answer that relevant to knowledge base. DO NOT GIVE OBJECT, VERY INPORTANT TO FOLLOW THE FORMAT
                    RETURN THE RESPONSE with format: Q | <question> | CA | <correctanswer> | O | <option> | <option>, example: Q | What color is apple? | CA | Red | O | Blue, Red, Yellow` },
                    { role: 'user', content: `Validate the question: ${question} to ${infoKnowledgeBase} for format ${formatWanted}` }
                ]
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}