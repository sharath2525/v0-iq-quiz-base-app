# Quiz Content Guide

This guide explains how to add new categories, quizzes, and questions to the Quiz Challenge app.

---

## 📁 File Location

All quiz content is stored in:
```
lib/quiz-data.ts
```

---

## 🗂️ Data Structure Overview

The app uses a **3-level hierarchy**:

```
Category
  └── Quiz (multiple per category)
        └── Question (10 per quiz)
```

### Interface Definitions

```typescript
// A single question
interface Question {
  id: number                    // Unique within the quiz (1, 2, 3...)
  questionText: string          // The question to display
  options: string[]             // Array of 4 answer choices
  correctOptionIndex: number    // Index of correct answer (0-3)
  explanation: string           // Explanation shown after quiz
}

// A quiz containing questions
interface Quiz {
  id: string           // Unique ID (e.g., "history-world-wars")
  name: string         // Display name (e.g., "World Wars")
  description: string  // Short description
  icon: string         // Emoji icon (e.g., "⚔️")
  timeLimit: number    // Time in seconds (600 = 10 minutes)
  questions: Question[] // Array of 10 questions
}

// A category containing quizzes
interface Category {
  id: string           // Unique ID (e.g., "history")
  name: string         // Display name (e.g., "History")
  description: string  // Short description
  icon: string         // Emoji icon (e.g., "📜")
  color: string        // Tailwind gradient (e.g., "from-amber-500 to-orange-600")
  quizzes: Quiz[]      // Array of quizzes
}
```

---

## ➕ Adding a New Quiz to an Existing Category

### Step 1: Find the category's quiz array

Look for the array like `historyQuizzes`, `cryptoQuizzes`, or `techQuizzes` in `lib/quiz-data.ts`.

### Step 2: Add a new quiz object

```typescript
const historyQuizzes: Quiz[] = [
  // ... existing quizzes ...
  
  // ADD YOUR NEW QUIZ HERE:
  {
    id: "history-medieval",        // Must be unique
    name: "Medieval Times",
    description: "Knights, castles, and the Middle Ages",
    icon: "🏰",
    timeLimit: 600,                 // 10 minutes
    questions: [
      {
        id: 1,
        questionText: "What year did the Battle of Hastings occur?",
        options: ["1066", "1086", "1046", "1096"],
        correctOptionIndex: 0,      // "1066" is correct
        explanation: "The Battle of Hastings occurred in 1066 when William the Conqueror invaded England.",
      },
      // ... add 9 more questions (10 total)
    ],
  },
]
```

---

## ➕ Adding a New Category

### Step 1: Create the quiz array

At the top of the categories section in `lib/quiz-data.ts`, add:

```typescript
// ============================================
// YOUR NEW CATEGORY NAME
// ============================================
const scienceQuizzes: Quiz[] = [
  {
    id: "science-physics",
    name: "Physics Basics",
    description: "Laws of motion and energy",
    icon: "⚛️",
    timeLimit: 600,
    questions: [
      // ... 10 questions ...
    ],
  },
  {
    id: "science-biology",
    name: "Biology 101",
    description: "Life sciences fundamentals",
    icon: "🧬",
    timeLimit: 600,
    questions: [
      // ... 10 questions ...
    ],
  },
  // Add more quizzes...
]
```

### Step 2: Add to QUIZ_CATEGORIES array

Find the `QUIZ_CATEGORIES` export and add your category:

```typescript
export const QUIZ_CATEGORIES: Category[] = [
  // ... existing categories ...
  
  {
    id: "science",                              // Unique ID
    name: "Science",                            // Display name
    description: "Physics, Biology & Chemistry", // Short description
    icon: "🔬",                                 // Emoji for home screen
    color: "from-green-500 to-emerald-600",    // Tailwind gradient
    quizzes: scienceQuizzes,                   // Your quiz array
  },
]
```

---

## 🎨 Available Gradient Colors

Use these Tailwind gradients for category colors:

| Color | Gradient Class |
|-------|----------------|
| Amber/Orange | `from-amber-500 to-orange-600` |
| Purple/Indigo | `from-purple-500 to-indigo-600` |
| Cyan/Blue | `from-cyan-500 to-blue-600` |
| Green/Emerald | `from-green-500 to-emerald-600` |
| Red/Rose | `from-red-500 to-rose-600` |
| Pink/Fuchsia | `from-pink-500 to-fuchsia-600` |
| Yellow/Amber | `from-yellow-500 to-amber-600` |
| Teal/Cyan | `from-teal-500 to-cyan-600` |
| Violet/Purple | `from-violet-500 to-purple-600` |
| Sky/Blue | `from-sky-500 to-blue-600` |

---

## 📝 Question Writing Best Practices

### Do's ✅

- Use clear, unambiguous questions
- Provide 4 answer options (A, B, C, D)
- Make sure only ONE answer is correct
- Write helpful explanations
- Keep questions relevant to the quiz topic
- Vary difficulty levels

### Don'ts ❌

- Don't use "All of the above" or "None of the above" options
- Don't make questions too long (keep under 2 sentences)
- Don't use trick questions or ambiguous wording
- Don't repeat similar questions

---

## 📊 Example: Complete Quiz

```typescript
{
  id: "history-renaissance",
  name: "Renaissance Era",
  description: "Art, science, and culture of the Renaissance",
  icon: "🎨",
  timeLimit: 600,
  questions: [
    {
      id: 1,
      questionText: "Who painted the Mona Lisa?",
      options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
      correctOptionIndex: 1,
      explanation: "Leonardo da Vinci painted the Mona Lisa between 1503-1519.",
    },
    {
      id: 2,
      questionText: "In which city did the Renaissance begin?",
      options: ["Rome", "Venice", "Florence", "Milan"],
      correctOptionIndex: 2,
      explanation: "The Renaissance began in Florence, Italy in the 14th century.",
    },
    {
      id: 3,
      questionText: "What famous ceiling did Michelangelo paint?",
      options: ["Notre-Dame", "Sistine Chapel", "St. Peter's Basilica", "Palazzo Vecchio"],
      correctOptionIndex: 1,
      explanation: "Michelangelo painted the Sistine Chapel ceiling from 1508-1512.",
    },
    // ... 7 more questions to make 10 total
  ],
}
```

---

## 🚀 Quick Checklist

When adding content, verify:

- [ ] Quiz ID is unique (no duplicates)
- [ ] Quiz has exactly 10 questions
- [ ] Each question has exactly 4 options
- [ ] `correctOptionIndex` is 0, 1, 2, or 3
- [ ] All questions have explanations
- [ ] Category is added to `QUIZ_CATEGORIES` array
- [ ] Emoji icons display correctly

---

## 💡 Tips

1. **Test locally** after adding content to catch typos
2. **Use consistent IDs** like `{category}-{topic}` (e.g., `history-medieval`)
3. **Keep time limits** at 600 seconds (10 minutes) for 10 questions
4. **Match icon emojis** to the quiz topic for visual clarity

---

## 📂 Current Structure

```
Categories:
├── History (📜)
│   ├── World Wars (⚔️)
│   ├── Ancient Civilizations (🏛️)
│   └── American History (🗽)
├── Crypto (₿)
│   ├── Crypto Basics (🪙)
│   ├── DeFi & Web3 (🌐)
│   └── Ethereum Deep Dive (💎)
└── Tech (⚡)
    ├── Programming Basics (💻)
    ├── AI & Machine Learning (🤖)
    └── Internet & Networking (🌍)
```

---

Need help? Check the existing quizzes in `lib/quiz-data.ts` for reference!

