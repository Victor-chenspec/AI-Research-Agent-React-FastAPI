from ..agent.graph import app as research_graph

def Research(prompt : str):
    response = research_graph.invoke({
        "query" : prompt,
        "plan" : [],
        "sources": [],
        "analysis" : "",
        "critique" : "",
        "approved" : False,
        "report" : ""
    })

    return response