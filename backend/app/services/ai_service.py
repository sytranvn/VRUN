import controlflow as cf
from app.core.config import settings

from dataclasses import dataclass

import os

os.environ["GOOGLE_API_KEY"] = os.environ.get("GOOGLE_API_KEY",
                                              settings.GOOGLE_API_KEY)


@dataclass
class Assessment:
    content: str
    argumentation: str
    organization: str
    language_use: str
    mechanics: str
    summary: str


@dataclass
class AssessmentScore:
    content: float
    argumentation: float
    organization: float
    language_use: float
    mechanics: float
    summary: float


@dataclass
class AssessmentResult:
    score: AssessmentScore
    assessment: Assessment

    def __str__(self) -> str:
        return f"""
            Assessment: {self.assessment}
            Score: {self.score}
        """


writing_assessor = cf.Agent(
    model=settings.AI_MODEL,
    name="WritingAssessor",
    instructions="""
    You are an English examiner. Evaluate the following English language essay, focusing on the following criteria:
    - Content: Relevance, coherence, and depth of ideas.
    - Organization: Logical flow, paragraph structure, and use of transitions.
    - Language Use: Vocabulary, grammar, and sentence structure.
    - Mechanics: Punctuation, spelling, and capitalization.
    Please provide specific feedback on each criterion.
    """,
)
scoring_assessor = cf.Agent(
    model=settings.AI_MODEL,
    name="WritingAssessor",
    instructions="""
    Please grade essay score by following weights.
    - Content: weight 20%
    - Argumentation: weight 20%
    - Organization: weight 20%
    - Language use: weight 20%
    - Mechnics: weight 20%
    Please provide a score for each criterion and an overall score for the essay.
    """,
)


@cf.flow
def assess_writing_essay(question: str, essay: str) -> AssessmentResult:
    assessment = writing_assessor.run(
        'Asset the following essay written in response to the question',
        result_type=Assessment,
        context=dict(question=question, essay=essay)
    )

    score = scoring_assessor.run(
        "Grade essay with score from 0 to 10 for provided assessment",
        context=dict(assessment=assessment),
        result_type=AssessmentScore
    )

    return AssessmentResult(
        assessment=assessment,
        score=score
    )

# https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/audio-understanding
# https://controlflow.ai/patterns/tools


test_essay = """The sun dips below the horizon, casting a warm glow on the ancient temple complex of Angkor Wat. As the last rays of light illuminate the intricate carvings and majestic spires, I am filled with a sense of awe and wonder. 
This magnificent monument, nestled amidst the lush Cambodian jungle, has been a source of fascination and inspiration for centuries.  

Angkor Wat, a testament to the grandeur of the Khmer Empire, is more than just a collection of stones and mortar. It is a living testament to the ingenuity and artistry of a bygone era. The temple's towering central tower, a symbol of the Hindu god Vishnu, rises majestically above the surrounding landscape, a reminder of the power and devotion of the Khmer people.

Beyond its architectural splendor, Angkor Wat is a place of profound spiritual significance. Its intricate bas-reliefs depict scenes from Hindu mythology, telling stories of gods, demons, and heroes. These carvings, meticulously carved into the temple walls, offer a glimpse into the religious beliefs and cultural practices of the Khmer people.  

As I wander through the temple complex, I am struck by the tranquility and serenity of the place. The air is filled with the sounds of nature – the rustling of leaves, the chirping of birds, and the gentle hum of insects. This peaceful atmosphere provides a stark contrast to the hustle and bustle of modern life, offering a much-needed respite from the stresses and strains of everyday existence.

Angkor Wat is not just a place; it is an experience. It is a journey through time, a glimpse into the past, and a reminder of the enduring power of human creativity and spirituality. It is a place that inspires and uplifts, a place that leaves a lasting impression on the soul."""

test_question = "Where do you want to visit? And why?"
