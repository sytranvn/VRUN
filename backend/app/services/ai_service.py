from dataclasses import dataclass
from typing import Any

import controlflow as cf
from controlflow.defaults import get_model
from google.cloud import speech
from google.oauth2.service_account import Credentials

from app.core.config import settings

cf.defaults.model = get_model(settings.AI_MODEL, google_api_key=settings.GOOGLE_API_KEY)


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
    # model=settings.AI_MODEL,
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
    # model=settings.AI_MODEL,
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


async def transcribe_file(audio_file: Any) -> str:
    """Transcribe the given audio_file.
    Args:
        audio_file (str): Path to the local audio file to be transcribed.
            Example: "resources/audio.wav"
    Returns:
        str: The response containing the transcription results
    """
    credentials = Credentials.from_service_account_file(settings.GOOGLE_CREDENTIAL)
    client = speech.SpeechAsyncClient(credentials=credentials)

    audio_content = audio_file.read()

    audio = speech.RecognitionAudio(content=audio_content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED,
        sample_rate_hertz=128000,
        language_code="en-US",
    )

    response = await client.recognize(config=config, audio=audio)

    # Each result is for a consecutive portion of the audio. Iterate through
    # them to get the transcripts for the entire audio file.
    text = ""
    async for result in response.results:
        text += result.alternatives[0].transcript
    return text


speaking_assessor = cf.Agent(
    # model=settings.AI_MODEL,
    name="SpeakingAssessor",
    instructions="""
    You are an English examiner. Evaluate the following English language record essay audio file, focusing on the following criteria:
    - Content: Relevance, coherence, and depth of ideas.
    - Organization: Logical flow, paragraph structure, and use of transitions.
    - Language Use: Vocabulary, grammar, and sentence structure.
    - Mechanics: Punctuation, spelling, and capitalization.
    Please provide specific feedback on each criterion.
    """,
)
scoring_assessor = cf.Agent(
    # model=settings.AI_MODEL,
    name="SpeakingAssessor",
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


@cf.flow
def assess_speaking_essay(question: str, transcribed_essay) -> AssessmentResult:
    assessment = speaking_assessor.run(
        'Asset the following transcribed essay in response to the question',
        result_type=Assessment,
        context=dict(question=question, transcribed_essay=transcribed_essay)
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
