# coding: utf-8
from app.services.ai_service import cf
from typing import List
from pydantic import BaseModel


class Answer(BaseModel):
    description: str
    is_correct_answer: bool


class Question(BaseModel):
    description: str
    answers: List[Answer]


class QuestionGroup(BaseModel):
    description: str
    questions: List[Question]


context_maker = cf.Agent(
    name="EssayMaker",
    instructions="""
Generate a essay discussing given topic. The essay should be about 200 words long and include personal opinions, facts, questions, and counterarguments. Ensure the essay is engaging, informative, and flows naturally.
    """
)

question_maker = cf.Agent(
    name="QuestionMaker",
    instructions="""
    You are English test maker. Analyze the following essay and generate 5 questions. The questions should test comprehension of the main ideas, details, and implied meanings.
    """
)

answer_maker = cf.Agent(
    name="AnswerMaker",
    instructions="You are English test maker. Analyze the following essay and question then generate 4 answers, one of them must be is_correct_answer. The answers should be related to content of essay and question."
)

answer_solver = cf.Agent(
    name="AnswerMaker",
    instructions="""
    You are English test maker. Analyze the following essay and question and select the correct answer from given answers.
    """
)


@ cf.flow
def make_question(topic: str):
    essay = context_maker.run(
        f"Create essay discussing topic: {topic}",
        context=dict(topic=topic)
    )
    questions = question_maker.run(
        "Create 5 questions for the essay",
        result_type=List[str],
        context=dict(essay=essay)
    )
    question_result = []
    for question in questions:
        answers = answer_maker.run(
            "Make 4 answers for the essay and question.",
            result_type=List[str],
            context=dict(essay=essay, question=question)
        )
        correct_ans = answer_solver.run("Find the correct answer.", result_type=int,
                                        context=dict(essay=essay, question=question, answers=answers))

        question_result.append(
            Question(
                description=question,
                answers=[Answer(
                    description=ans,
                    is_correct_answer=(i == correct_ans))
                         for i, ans in enumerate(answers)
                ]
            )
        )

    return QuestionGroup(description=essay, questions=questions)
