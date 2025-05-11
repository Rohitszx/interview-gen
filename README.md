
# 🧠 AI Interview Question Generator

Welcome to the AI Interview Question Generator project — a tool designed to help developers practice and prepare for interviews by generating technical questions based on customizable criteria.

---

## 🔗 Live URL

**[→ Project Live ](https://interview-gen.onrender.com/)**  

**[→ Groq Console (get your API key)](https://console.groq.com)**

---

## 🚀 Features

- Generate technical questions using LLMs (Groq + LLaMA 4)
- Customize topics, roles, and difficulty
- Real-time UI powered by React + Vite
- Store API keys securely in browser
- Calibrate complexity using prompt engineering

---

## 🛠️ Tech Stack

This project is built using modern frontend tools and UI systems:

- **React** – component-based architecture
- **TypeScript** – static type safety
- **Vite** – lightning-fast build system
- **Tailwind CSS** – utility-first styling
- **shadcn/ui** – modern UI components
- **Groq API** – for fast LLaMA-based completions

---

## 🧠 How Question Generation Works

We use **Groq’s ultra-fast LLaMA 4 model** (`llama-4-scout-17b`) to generate technical questions based on user-selected criteria such as:

- Domain (e.g., JavaScript, Node.js, System Design)
- Role (e.g., Frontend, Backend, Full-stack)
- Level (Junior, Mid, Senior)

### Prompt Structure:
```json
{
  "model": "llama3-8b-8192",
  "messages": [
    {
      "role": "system",
      "content": "You are a technical interviewer assistant that creates questions for technical interviews. Format your response as JSON without any explanation. Follow the structure exactly."
    },
    {
      "role": "user",
      "content": "Create a set of 5 technical interview questions for a ${experienceLevel} ${sanitizedRole} with skills in ${sanitizedSkills}.\n\nFor each question:\n1. The question should test the knowledge appropriate for the ${experienceLevel} level\n2. Include 3-5 specific evaluation criteria for each question\n3. Categorize the question based on the skill it primarily tests\n\nFormat the response as a JSON object:\n{\n  \"questions\": [\n    {\n      \"id\": \"1\",\n      \"question\": \"Your question here\",\n      \"difficulty\": \"${experienceLevel}\",\n      \"evaluationCriteria\": [\"Criterion 1\", \"Criterion 2\", \"Criterion 3\"],\n      \"category\": \"Specific skill being tested\"\n    }\n  ]\n}"
    }
  ]
}

```

We carefully structure prompts to maximize relevance and reduce hallucinations. The system can be extended to include follow-up answers and explanations.

---

## 🎯 Difficulty Calibration Strategy

We use prompt-based strategies to guide LLMs in generating beginner, intermediate, or advanced questions.

| Level    | Prompt Keyword      | Strategy                                          |
| -------- | ------------------- | ------------------------------------------------- |
| Beginner | "easy difficulty"   | Focus on fundamentals                             |
| Medium   | "medium difficulty" | Include moderate problem-solving                  |
| Advanced | "hard difficulty"   | Involve edge-cases, scalability, or system design |

Difficulty levels are controlled via the user interface and passed into prompt templates dynamically.

---


## ⚙️ Architecture & Technical Tradeoffs

### Why is the API logic implemented in the frontend?

For the purpose of this time-constrained assignment, the API interaction with the Groq LLM is handled directly in the frontend:

* 🚀 **Faster Implementation**: Embedding the logic in the frontend reduced setup and deployment time, helping focus on the core challenge — question generation quality and prompt design.
* 🧪 **Easy Testing**: Including the API key directly allows reviewers to test the functionality without setting up a backend or creating their own API key.
* 📦 **No Persistent Data or Auth**: Since the application doesn't require user authentication or sensitive data storage, a backend wasn't strictly necessary within the assignment’s scope.

> ✅ **Note**: In a production-grade system, API keys must be kept secure on the server side. I’m fully capable of implementing this using a dedicated Node.js/TypeScript backend, and have documented how the architecture would evolve for scalability and security.


### ✅ Choices Made

* **Groq LLaMA 4**: Selected for speed and cost-efficiency compared to OpenAI or Anthropic
* **Vite + React**: Ensures fast HMR, small bundles, and modern DX
* **Tailwind + shadcn/ui**: Combines rapid styling with clean, accessible components
* **LocalStorage for API Keys**: Balances ease of use with basic security for personal use

### ⚠️ Trade-offs

* **Local API Key Storage**: No server-side vault or encryption, so usage is for personal tools only
* **LLM Cost and Rate Limits**: Limited by Groq API free-tier; scaling would require paid tier and usage monitoring
* **No Caching Layer**: Questions are regenerated each time (for freshness); could be optimized with in-memory or Redis-based caching in future

---

## 💻 Local Development Setup

Make sure you have **Node.js (18+)** and **npm** installed. We recommend using [`nvm`](https://github.com/nvm-sh/nvm#installing-and-updating) to manage versions.

### 🧪 Quick Start

```bash
# Step 1: Clone the repository
git clone https://github.com/rohitszx/interview-gen.git

# Step 2: Navigate into the project
cd interview-gen

# Step 3: Install dependencies
npm install

# Step 4: Start the dev server
npm run dev
```

> Your project will be available at [http://localhost:8080](http://localhost:8080)

---

## 🛠️ Editing Options

### 1. **In Your IDE**

* Edit locally using VSCode or any editor of choice.

### 2. **Directly on GitHub**

* Navigate to a file and click the ✏️ pencil icon to edit inline.

### 3. **Using GitHub Codespaces**

* Click `Code` → `Codespaces` → `New Codespace`
* Start editing instantly in a full dev container environment.

---

## 🧩 Contributing

We welcome issues and PRs to improve the tool, add new question categories, or enhance LLM prompt tuning.

---

## 🔐 API Key Instructions

> A Groq API key is required to use the question generator.

* Visit [https://console.groq.com](https://console.groq.com) and generate your key.
* The key will be stored **locally** in your browser only.

---


### ✨ Built for engineers, by engineers. Interview prep should be fast, focused, and intelligent.



