export async function createCollection(collectionName) {
  try {
    const sanitizedCollectionName = collectionName.replace(/\s+/g, '');
    console.log(collectionName, sanitizedCollectionName)
    const response = await fetch(`${process.env.WEAVIATE_API_URL}/v1/schema`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WEAVIATE_API_KEY}`,
        'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        class: sanitizedCollectionName,
        vectorizer: 'text2vec-openai',
        moduleConfig: {
          'text2vec-openai': {},
          'generative-openai': {} 
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating collection:', errorData); // Log error data
      throw new Error(`Error creating collection: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.name; // Returns the name of the created collection
  } catch (error) {
    console.error('Error:', error); // Log general error
    throw error; // Rethrow the error
  }
}
