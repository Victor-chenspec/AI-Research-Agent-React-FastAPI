from typing import TypedDict

class ResearchState(TypedDict):
    query : str
    plan : list[str]
    sources : list[dict]
    analysis : str
    critique: str
    approved: bool
    report: str