import { useState, useRef } from "react";

export default function App() {

  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const analyzerRef = useRef(null);
  const learnMoreRef = useRef(null);
  const [taskGuide, setTaskGuide] = useState("");
  const [taskLoading, setTaskLoading] = useState(false);
  const [activeTask, setActiveTask] = useState("");

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
async function generateTaskGuide(task) {

  setActiveTask(task);

  setTaskLoading(true);

  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          model: "openai/gpt-3.5-turbo",

          messages: [

            {
              role: "system",

              content: `
              You are TechSaathi.

              Your goal is to help people feel more confident using technology.

              Explain digital tasks in a beginner-friendly way.

              Include:
              - simple step-by-step guidance
              - things to prepare
              - common mistakes
              - safety precautions
              - confidence tips

              Keep language supportive and practical.
              `
            },

            {
              role: "user",

              content: `
              Help me with:
              ${task}
              `
            }

          ]
        })
      }
    );

    const data = await response.json();
    console.log(data);

    const output =
      data.choices[0].message.content;

    setTaskGuide(output);

  } catch (error) {

    console.log(error);

    setTaskGuide("Unable to generate guidance.");

  }

  setTaskLoading(false);
}

  async function analyzeMessage() {

  if (!message) return;

  setLoading(true);

  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          model: "openai/gpt-3.5-turbo",

          messages: [
            {
              role: "system",
              content: `
              You are TechSaathi.

              Help beginners identify suspicious online messages.

              Explain:
              - risk level
              - warning signs
              - what to do next

              Use simple language.
              `
            },

            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    const output =
      data.choices[0].message.content;

    setResult(output);

  } catch (error) {

    console.log(error);

    setResult("Something went wrong.");

  }

  setLoading(false);
}

  return (
  <div className="min-h-screen bg-white text-black">

    {/* NAVBAR */}
    <nav className="flex justify-between items-center px-8 py-6 border-b">

      <h1 className="text-2xl font-bold">
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
    ref={learnMoreRef}
    className="grid md:grid-cols-2 gap-10 px-8 py-20 items-center"
    >

      {/* LEFT */}
      <div>

        <p className="text-sm font-semibold text-gray-500 mb-4">
          AI-Powered Digital Confidence Assistant
        </p>

        <h1 className="text-5xl font-bold leading-tight">

          Making digital tasks simpler, safer and less intimidating.

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

      {/* RIGHT SIDE CARD */}
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

    {/* SURVEY INSIGHTS */}
    <section 
    ref={learnMoreRef}
    className="px-8 py-16 bg-gray-50"
    >

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
    {/* SMART TASK NAVIGATOR */}

<section className="px-8 py-24 bg-gray-50">

  <div className="max-w-6xl mx-auto">

    <h2 className="text-5xl font-bold text-center leading-tight">

      What do you need help with today?

    </h2>

    <p className="text-center text-gray-600 mt-6 max-w-2xl mx-auto text-lg">

      TechSaathi provides AI-guided assistance
      for important digital tasks so users can
      navigate technology with more confidence.

    </p>

    {/* TASK BUTTONS */}

    <div className="grid md:grid-cols-3 gap-6 mt-14">

      <button
        onClick={() =>
          generateTaskGuide(
            "How to safely apply for scholarships online"
          )
        }
        className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition text-left"
      >

        <h3 className="text-2xl font-bold">
          Scholarship Applications
        </h3>

        <p className="text-gray-600 mt-3">
          Understand documents, deadlines,
          verification, and safe application steps.
        </p>

      </button>

      <button
        onClick={() =>
          generateTaskGuide(
            "How to safely make online payments"
          )
        }
        className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition text-left"
      >

        <h3 className="text-2xl font-bold">
          Online Payments
        </h3>

        <p className="text-gray-600 mt-3">
          Learn how to avoid mistakes,
          scams, and unsafe payment practices.
        </p>

      </button>

      <button
        onClick={() =>
          generateTaskGuide(
            "How to safely apply for jobs online"
          )
        }
        className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition text-left"
      >

        <h3 className="text-2xl font-bold">
          Job Applications
        </h3>

        <p className="text-gray-600 mt-3">
          Get guidance on fake jobs,
          application safety, and preparation.
        </p>

      </button>

      <button
        onClick={() =>
          generateTaskGuide(
            "How to safely upload important documents online"
          )
        }
        className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition text-left"
      >

        <h3 className="text-2xl font-bold">
          Uploading Documents
        </h3>

        <p className="text-gray-600 mt-3">
          Learn safe document sharing
          and submission practices.
        </p>

      </button>

      <button
        onClick={() =>
          generateTaskGuide(
            "How to fill online forms confidently"
          )
        }
        className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition text-left"
      >

        <h3 className="text-2xl font-bold">
          Online Forms
        </h3>

        <p className="text-gray-600 mt-3">
          Reduce mistakes while filling
          official forms and applications.
        </p>

      </button>

      <button
        onClick={() =>
          generateTaskGuide(
            "How to identify suspicious online messages"
          )
        }
        className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition text-left"
      >

        <h3 className="text-2xl font-bold">
          Suspicious Messages
        </h3>

        <p className="text-gray-600 mt-3">
          Understand scam signals,
          urgency tactics, and verification steps.
        </p>

      </button>

    </div>

    {/* AI OUTPUT */}

    {(taskGuide || taskLoading) && (

      <div className="bg-white rounded-3xl shadow-xl p-10 mt-16 max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>

            <p className="text-sm text-gray-500">
              AI Guidance
            </p>

            <h3 className="text-3xl font-bold">
              {activeTask}
            </h3>

          </div>

          <div className="bg-black text-white px-5 py-2 rounded-full text-sm">
            TechSaathi AI
          </div>

        </div>

        {taskLoading ? (

          <p className="text-gray-500 text-lg">
            Generating guidance...
          </p>

        ) : (

          <div className="whitespace-pre-wrap leading-8 text-gray-700 text-lg">
            {taskGuide}
          </div>

        )}

      </div>

    )}

  </div>

</section>

    {/* ANALYZER SECTION */}
    <section 
    ref={analyzerRef}
    className="px-8 py-20 max-w-4xl mx-auto"
    >

      <h2 className="text-4xl font-bold text-center">
        Analyze Suspicious Messages
      </h2>

      <p className="text-center text-gray-600 mt-4">
        Paste any suspicious message, payment request,
        or job offer to receive AI-guided analysis.
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste suspicious message here..."
        className="w-full border rounded-3xl p-5 h-44 mt-10 outline-none"
      />

      <div className="flex flex-wrap gap-3 mt-4">

        <button
          onClick={() =>
            setMessage(
              "Congratulations! Pay ₹500 to confirm your scholarship seat."
            )
          }
          className="bg-gray-100 px-4 py-2 rounded-full"
        >
          Scholarship Scam
        </button>

        <button
          onClick={() =>
            setMessage(
              "Your bank account will be blocked today. Share OTP immediately."
            )
          }
          className="bg-gray-100 px-4 py-2 rounded-full"
        >
          OTP Scam
        </button>

        <button
          onClick={() =>
            setMessage(
              "Earn ₹50,000 weekly from home. Registration fee ₹999 only."
            )
          }
          className="bg-gray-100 px-4 py-2 rounded-full"
        >
          Fake Job Offer
        </button>

      </div>

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

  </div>
  )
}