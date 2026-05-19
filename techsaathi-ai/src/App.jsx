
import { useState, useRef } from "react";

export default function App() {

  // STATES

  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [taskLoading, setTaskLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm TechSaathi. What digital task do you need help with today?"
    }
  ]);

  const [userInput, setUserInput] = useState("");

  const [showAnalyzer, setShowAnalyzer] = useState(false);

  // REFS

  const analyzerRef = useRef(null);
  const learnMoreRef = useRef(null);

  // SCROLL FUNCTIONS

  function scrollToAnalyzer() {

    analyzerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

  function scrollToLearnMore() {

    learnMoreRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

  // CHAT AI

  async function sendMessage(prompt) {
  if (taskLoading) return;
    const response = await fetch("/api/chat", {

  method: "POST",

  headers: {
    "Content-Type": "application/json"
  },

  body: JSON.stringify({
    prompt
  })

});

const data = await response.json();

setMessages([
  ...updatedMessages,
  {
    role: "assistant",
    content: data.reply
  }
]);
}
  // SCAM ANALYZER

  async function analyzeMessage() {
    if (loading) return;

    const response = await fetch("/api/chat", {

  method: "POST",

  headers: {
    "Content-Type": "application/json"
  },

  body: JSON.stringify({
    prompt: `
Analyze this suspicious message:

${message}

Give:
- risk level
- warning signs
- recommended action
`
  })

});

const data = await response.json();

setResult(data.reply);  }

  return (

    <div className="min-h-screen bg-white text-black">

      {/* NAVBAR */}

      <nav className="flex justify-between items-center px-8 py-6 border-b bg-white sticky top-0 z-50">

        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          TechSaathi
        </h1>

        <button
          onClick={scrollToAnalyzer}
          className="bg-black text-white px-5 py-2 rounded-xl"
        >
          Try Demo
        </button>

      </nav>

      {/* HERO SECTION */}

      <section
        className="grid md:grid-cols-2 gap-10 px-8 py-20 items-center"
      >

        <div>

          <p className="text-sm font-semibold text-gray-500 mb-4">
            AI-Powered Digital Confidence Assistant
          </p>

          <h1 className="text-5xl font-bold leading-tight text-gray-900">

            AI-guided assistance for digital tasks like applications,
            online forms, payments and safety verification.

          </h1>

          <p className="text-gray-600 mt-6 text-lg">

            TechSaathi helps users identify suspicious
            messages, avoid scams, and navigate digital
            tasks with AI-guided support.

          </p>

          <div className="flex gap-4 mt-8">

            <button
              onClick={scrollToAnalyzer}
              className="bg-black text-white px-6 py-3 rounded-2xl"
            >
              Analyze Message
            </button>

            <button
              onClick={scrollToLearnMore}
              className="border px-6 py-3 rounded-2xl"
            >
              Learn More
            </button>

          </div>

        </div>

        {/* RIGHT CARD */}

        <div className="bg-gray-100 rounded-3xl p-6 shadow-lg">

          <p className="text-sm text-gray-500 mb-3">
            Example Analysis
          </p>

          <div className="bg-white p-4 rounded-2xl">

            <p className="font-medium">
              “Pay ₹500 to confirm your scholarship seat.”
            </p>

          </div>

          <div className="mt-5 space-y-3">

            <div className="bg-white rounded-2xl p-4">

              <p className="font-semibold">
                Risk Level
              </p>

              <p className="text-red-500 mt-1">
                High Risk
              </p>

            </div>

            <div className="bg-white rounded-2xl p-4">

              <p className="font-semibold">
                Warning Signs
              </p>

              <ul className="list-disc ml-5 text-gray-600 mt-2">

                <li>Urgency pressure</li>
                <li>Advance payment request</li>
                <li>No official verification</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* WHY TECHSAATHI */}

      <section
        ref={learnMoreRef}
        className="px-8 py-24"
      >

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>

            <p className="text-blue-600 font-semibold mb-4">
              WHY TECHSAATHI?
            </p>

            <h2 className="text-5xl font-bold leading-tight">

              Many people avoid digital tasks
              not because they are incapable —
              but because technology feels intimidating.

            </h2>

          </div>

          <div className="space-y-6 text-gray-600 text-lg leading-8">

            <p>
              Through user surveys and conversations,
              we observed that many people hesitate
              while filling online forms, making payments,
              uploading documents, or identifying suspicious messages.
            </p>

            <p>
              The issue was not only lack of knowledge —
              it was lack of confidence.
            </p>

            <p>
              TechSaathi aims to reduce this hesitation
              by providing simple, AI-guided assistance
              for important digital tasks.
            </p>

          </div>

        </div>

      </section>

      {/* SURVEY INSIGHTS */}

      <section className="px-8 py-16 bg-gray-50">

        <h2 className="text-3xl font-bold text-center mb-12">
          Insights From User Research
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <h3 className="text-4xl font-bold">
              72%
            </h3>

            <p className="text-gray-600 mt-3">
              users expressed concern about scams
              and suspicious online activity.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <h3 className="text-4xl font-bold">
              61%
            </h3>

            <p className="text-gray-600 mt-3">
              struggled with forms, uploads,
              and official digital tasks.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <h3 className="text-4xl font-bold">
              80%
            </h3>

            <p className="text-gray-600 mt-3">
              preferred guided assistance over
              traditional tutorials.
            </p>

          </div>

        </div>

      </section>

      {/* TASK NAVIGATOR */}

      <section className="px-8 py-24 bg-gray-50">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-5xl font-bold text-center leading-tight">

            What do you need help with today?

          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-14">

            {[
              "Scholarship Applications",
              "Online Payments",
              "Job Applications",
              "Uploading Documents",
              "Online Forms",
              "Suspicious Messages"
            ].map((task, index) => (

              <button
                key={index}
                onClick={() => sendMessage(task)}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition text-left"
              >

                <h3 className="text-2xl font-bold">
                  {task}
                </h3>

              </button>

            ))}

          </div>

          {/* CHAT UI */}

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-14 max-w-4xl mx-auto">

            <div className="space-y-6 max-h-[500px] overflow-y-auto">

              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`p-5 rounded-2xl whitespace-pre-wrap leading-7 ${
                    msg.role === "user"
                      ? "bg-black text-white ml-12"
                      : "bg-gray-100 text-gray-800 mr-12"
                  }`}
                >

                  {msg.content}

                </div>

              ))}

              {taskLoading && (

                <div className="bg-gray-100 p-5 rounded-2xl mr-12">
                  Thinking...
                </div>

              )}

            </div>

            <div className="flex gap-4 mt-8">

              <input
                type="text"
                value={userInput}
                onChange={(e) =>
                  setUserInput(e.target.value)
                }
                placeholder="Ask TechSaathi anything..."
                className="flex-1 border rounded-2xl px-5 py-4 outline-none"
              />

              <button
                onClick={() => sendMessage(userInput)}
                className="bg-black text-white px-8 rounded-2xl"
              >
                Send
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* ANALYZER TOGGLE */}

      <section className="px-8 py-20">

        <div className="max-w-4xl mx-auto text-center">

          <button
            onClick={() => setShowAnalyzer(!showAnalyzer)}
            className="bg-black text-white px-8 py-4 rounded-2xl hover:scale-105 transition"
          >

            {showAnalyzer
              ? "Hide Suspicious Message Analyzer"
              : "Need help understanding a suspicious message?"
            }

          </button>

        </div>

      </section>

      {/* ANALYZER */}

      {showAnalyzer && (

        <section
          ref={analyzerRef}
          className="px-8 py-20 max-w-4xl mx-auto"
        >

          <h2 className="text-4xl font-bold text-center text-gray-900">
            Analyze Suspicious Messages
          </h2>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste suspicious message here..."
            className="w-full border rounded-3xl p-5 h-44 mt-10 outline-none"
          />

          <button
            onClick={analyzeMessage}
            disabled={loading}
            className="bg-black text-white px-8 py-4 rounded-2xl mt-6 w-full"
          >

            {loading ? "Analyzing..." : "Analyze Message"}

          </button>

          {result && (

            <div className="bg-gray-100 rounded-3xl p-6 mt-8 whitespace-pre-wrap">

              <h3 className="text-2xl font-bold mb-4">
                AI Analysis
              </h3>

              {result}

            </div>

          )}

        </section>

      )}

    </div>

  );

}