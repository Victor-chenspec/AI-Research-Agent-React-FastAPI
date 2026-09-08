from fastapi import APIRouter
from ..schemas.research import ResearchPost
from ..agent.llm import llm
from ..service.research import Research

router = APIRouter()

@router.post("/")
def postResearch(req:ResearchPost):
    return Research(req.message)