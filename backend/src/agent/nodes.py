from .state import ResearchState
from .llm import planner_llm , analyzer_llm , critic_llm , writer_llm
from .prompt import planner_prompt , analyzer_prompt , critic_prompt , writer_prompt
from .tools import search_web

def planner(state : ResearchState):
    query = state['query']

    response = planner_llm.invoke(
        planner_prompt.invoke({
                "query" : query
            })
    )

    return {
        "plan" : response.steps
    }

def researcher(state : ResearchState):
    query = state['query']
    plan = state['plan']

    sources = []

    for step in plan:
        search_query = f"{query} + {step}"
        result = search_web(search_query)
        for i in result:
            sources.append({
                "title" : i['title'],
                "content" : i['content'],
                "url" : i['url']
            })

    return {
        "sources" : sources
    }

def analyzer(state : ResearchState):
    query = state['query']
    sources = state['sources']
    critique = state['critique']

    response = analyzer_llm.invoke(analyzer_prompt.invoke({
        "query" : query,
        "sources" : sources,
        "critique" : critique
    }))

    return {
        "analysis" : response.analysis
    } 

def critic(state : ResearchState):
    query = state['query']
    sources = state['sources']
    analysis = state['analysis']

    response = critic_llm.invoke(critic_prompt.invoke({
        "query" : query,
        "sources" : sources,
        "analysis" : analysis
    }))

    return {
        "critique" : response.critique,
        "approved" : response.approved
    }

def should_continue(state : ResearchState):
    if state['approved']:
        return "writer"

    return "researcher"

def writer(state : ResearchState):
    query = state['query']
    analysis = state['analysis']
    sources = state['sources']

    response = writer_llm.invoke(writer_prompt.invoke({
        "query" : query,
        "analysis" : analysis,
        "sources" : sources 
    }))

    return {
        "report" : response.report
    }
