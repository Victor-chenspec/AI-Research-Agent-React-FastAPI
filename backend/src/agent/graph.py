from langgraph.graph import StateGraph , START , END

from .state import ResearchState
from .nodes import planner , researcher , analyzer , critic , writer , should_continue

graph = StateGraph(ResearchState)

graph.add_node("planner",planner)
graph.add_node("researcher",researcher)
graph.add_node("analyzer",analyzer)
graph.add_node("critic",critic)
graph.add_node("writer",writer)

graph.add_edge(START,"planner")
graph.add_edge("planner","researcher")
graph.add_edge("researcher","analyzer")
graph.add_edge("analyzer","critic")
graph.add_conditional_edges("critic",should_continue,{"writer":"writer","researcher":"researcher"})
graph.add_edge("writer",END)

app = graph.compile()