const OpenAI = require("openai");

// Initialize the OpenAI client
// Ensure your OPENAI_API_KEY environment variable is set in your environment or Render dashboard
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Sends a prompt to the OpenAI API and returns the response.
 * @param {string} prompt - The input text/message for the model.
 * @returns {Promise<string>} - The text response from the model.
 */
async function getOpenAIResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      // Updated from legacy gpt-3.5-turbo to a current production model name
      model: process.env.OPENAI_MODEL || "gpt-4o-mini", 
      messages: [
        { 
          role: "system", 
          content: "You are a helpful assistant integrated into a Twitch chat application." 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      max_tokens: 300,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.p("Error communicating with OpenAI:", error);
    return "Sorry, I ran into an error processing that request.";
  }
}

module.exports = { getOpenAIResponse };
