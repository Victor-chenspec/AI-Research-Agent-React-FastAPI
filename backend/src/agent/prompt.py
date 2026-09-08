from langchain_core.prompts import ChatPromptTemplate

planner_prompt = ChatPromptTemplate.from_template("""
You are a research planner.

Create a research plan for the following question:

{query}

Break the research into 3 to 5 clear steps.

Return only the research steps.

""")

analyzer_prompt = ChatPromptTemplate.from_template("""
You are a research analyst.

Research question:
{query}

Sources:
{sources}

Criticque:
{critique}

Analyze the sources and identify:
1. Main findings
2. Important facts
3. Agreements between sources
4. Contradictions between sources
5. Missing information

Return a clear research analysis.
""")

critic_prompt = ChatPromptTemplate.from_template("""
You are a research critic.

Research question:
{query}

Sources:
{sources}

Analysis:
{analysis}

Evaluate the research.

Check:
1. Is there enough evidence?
2. Are the sources relevant?
3. Are there contradictions?
4. Is important information missing?

If the research is sufficient, return:
PASS

If more research is needed, return:
FAIL

Return only PASS or FAIL.
""")

writer_prompt = ChatPromptTemplate.from_template("""
You are a research writer.

Research question:
{query}

Analysis:
{analysis}

Sources:
{sources}

Write a clear research report answering the question.

Requirements:
- Use the research evidence
- Explain the important findings
- Mention disagreements when relevant
- Do not invent facts
- Structure the answer with headings
- Include source URLs when relevant
""")