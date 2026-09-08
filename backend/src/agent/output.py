from pydantic import BaseModel

class ResearchPlan(BaseModel):
    steps : list[str]

class ResearchAnalyzer(BaseModel):
    analysis : str

class ResearchCritic(BaseModel):
    critique : str
    approved : bool

class ResearchWriter(BaseModel):
    report : str