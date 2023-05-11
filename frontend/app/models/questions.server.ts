// import type { Questions } from "@prisma/client";

import { Configuration, OpenAIApi } from 'openai';
import { prisma } from "~/db.server";


const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

export async function PromptQuestions(subject, examBoard, qualificationLevel, style, topic) {
    const questions = [];
  
    for (let i = 1; i <= 6; i++) {
      const questionPrompt = `Generate a ${style} ${subject} question for a ${qualificationLevel} ${examBoard} exam on the topic of ${topic}. {}`;
      const { data } = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `\n\nQ: ${questionPrompt}\nA:`,
        temperature: 0.5,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['{}'],
      });
  
      const question = data.choices[0].text;
      questions.push(question);
    }
  
    return questions;
                                 
  }

  export default async function CreateQuestions(req, res) {

    if (req.method !== 'POST') {
      res.status(405).send("Method not allowed");
      return;
    }
    
      const { style, subject, topic, examBoard, qualification } = req.body;
  
      const questions = await PromptQuestions(subject, examBoard, qualification, style, topic);
  
      console.log(questions);
    
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ questions });

}