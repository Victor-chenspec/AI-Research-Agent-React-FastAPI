import { Search, Send } from "lucide-react";
import remarkGfm from "remark-gfm";
import { useState } from "react";

import { useResearch } from "./hooks/useResearch";
import Markdown from "react-markdown";

const App = () => {
  const [query, setQuery] = useState("");

  const { data, loading, error, research } = useResearch();

  function handleResearch() {
    if (!query.trim() || loading) return;

    research(query);
    setQuery("");
  }

  return (
    <main className="min-h-screen w-screen bg-[#DBE1FF] px-10 py-15">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        {/* Header */}
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Agentic Researcher
          </h1>

          <p className="text-gray-600">
            Research topics with AI-powered planning, web research, analysis,
            and synthesis.
          </p>
        </header>

        {/* Research Input */}
        <section className="flex items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-lg">
          <Search className="shrink-0 text-gray-500" />

          <input
            type="text"
            className="flex-1 bg-transparent text-gray-900 outline-none"
            placeholder="Enter topic of research."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleResearch();
              }
            }}
          />

          <button
            onClick={handleResearch}
            disabled={loading || !query.trim()}
            className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              "Researching..."
            ) : (
              <>
                <Send size={18} />
                Research
              </>
            )}
          </button>
        </section>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-red-600">{error}</div>
        )}

        {/* Research Result */}
        {data && (
          <div className="flex flex-col gap-8">
            {/* Research Plan */}
            <section className="rounded-2xl bg-white p-7 shadow-lg">
              <h2 className="mb-5 text-2xl font-bold text-gray-900">
                Research Plan
              </h2>

              <div className="flex flex-col gap-3">
                {data.plan.map((step, index) => (
                  <div key={`${step}-${index}`} className="flex gap-4">
                    <span className="font-semibold text-blue-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Sources */}
            <section className="rounded-2xl bg-white p-7 shadow-lg">
              <h2 className="mb-5 text-2xl font-bold text-gray-900">Sources</h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {data.sources.map((source, index) => (
                  <div
                    key={`${source.url}-${index}`}
                    className="rounded-xl border border-gray-200 p-5 transition hover:border-blue-300"
                  >
                    <p className="mb-1 text-sm text-gray-500">
                      {new URL(source.url).hostname}
                    </p>

                    <h3 className="mb-2 font-semibold text-gray-900">
                      {source.title}
                    </h3>

                    <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                      {source.content}
                    </p>

                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-500 hover:text-blue-700"
                    >
                      Open source →
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Analysis */}
            <section className="rounded-2xl bg-white p-7 shadow-lg">
              <h2 className="mb-5 text-2xl font-bold text-gray-900">
                Analysis
              </h2>

              <article className="prose max-w-none text-gray-700">
                <Markdown remarkPlugins={[remarkGfm]}>{data.analysis}</Markdown>
              </article>
            </section>

            {/* Critique */}
            <section className="rounded-2xl bg-white p-7 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Critique</h2>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    data.approved
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {data.approved ? "Passed" : "Needs more research"}
                </span>
              </div>

              <p className="text-gray-700">{data.critique}</p>
            </section>

            {/* Report */}
            <section className="rounded-2xl bg-white p-7 shadow-lg">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Research Report
                </h2>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(data.report);
                  }}
                  className="rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100"
                >
                  Copy Report
                </button>
              </div>

              <article className="prose max-w-none text-gray-700">
                <Markdown remarkPlugins={[remarkGfm]}>{data.report}</Markdown>
              </article>
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
