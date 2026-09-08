from langchain_google_genai import ChatGoogleGenerativeAI
from .output import ResearchPlan , ResearchAnalyzer , ResearchCritic , ResearchWriter
import os
from dotenv import load_dotenv

load_dotenv()

llm = ChatGoogleGenerativeAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    model="gemini-3.5-flash-lite"
)

planner_llm = llm.with_structured_output(ResearchPlan)

analyzer_llm = llm.with_structured_output(ResearchAnalyzer)

critic_llm = llm.with_structured_output(ResearchCritic)

writer_llm = llm.with_structured_output(ResearchWriter)