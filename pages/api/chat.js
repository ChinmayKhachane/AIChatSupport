// pages/api/chat.js
import OpenAI from 'openai';


const openai = new OpenAI({
    
    apiKey: process.env.OPENAI_API_KEY,

});

export default async function handler(req, res) {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }

  try {
    const Chatcompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }],
    });

    const message = Chatcompletion.choices[0].message;
    res.status(200).json({ message });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Error calling OpenAI API' });
  }
}
