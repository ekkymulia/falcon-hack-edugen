import axios from 'axios';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file, file.name);

  try {
    const response = await axios.post(
      'https://api.cloud.llamaindex.ai/api/parsing/upload',
      formData,
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${process.env.LLAMA_CLOUD_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const checkJobStatus = async (jobId) => {
    try {
      const response = await axios.get(
        `https://api.cloud.llamaindex.ai/api/parsing/job/${jobId}`,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.LLAMA_CLOUD_API_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error checking job status:', error);
      throw error;
    }
};

export const getJobResultsInMarkdown = async (jobId) => {
    try {
      const response = await axios.get(
        `https://api.cloud.llamaindex.ai/api/parsing/job/${jobId}/result/markdown`,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.LLAMA_CLOUD_API_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error getting job results in markdown:', error);
      throw error;
    }
};