import openai
import os

import openai

async def generate_questions(subject, exam_board, qualification_level, style, topic):
    questions = []

    for i in range(1, 7):
        question_prompt = f"Generate a {style} {subject} question for a {qualification_level} {exam_board} exam on the topic of {topic}. {{}}"
        response = await openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"\n\nQ: {question_prompt}\nA:",
            temperature=0.5,
            max_tokens=150,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
            stop=["{}"]
        )

        question = response.choices[0].text
        questions.append(question)

    return questions
