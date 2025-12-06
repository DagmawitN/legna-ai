"use client";

interface ChatIntroProps {
  language: "tigrinya" | "amharic" | "english";
  onPromptClick?: (prompt: string) => void;
}

const introTexts = {
  english: {
    title: "Ask anything",
    prompts: [
      "Write a social media caption",
      "Explain a topic in simple words",
      "Give me business ideas",
    ],
  },
  amharic: {
    title: "ማንኛውንም ጠይቀኝ",
    prompts: [
      "የሶሻል ሚዲያ ካፕሽን ጻፍልኝ",
      "አንድ ርዕስ በቀላሉ ተረድቼ አስረዳልኝ",
      "የንግድ ሃሳቦች ስጠኝ",
    ],
  },
  tigrinya: {
    title: "ምን ትሕትት?",
    prompts: [
      "ሶሻል ሚዲያ ካፕሽን ጽሓፍልኒ",
      "ርእስ ብቀሊል ኣስረድኦም",
      "ንግዲ ሃሳብታት ስጠኒ",
    ],
  },
};

export default function ChatIntro({ language, onPromptClick }: ChatIntroProps) {
  const content = introTexts[language];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-8 mt-10">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        {content.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-4">
        {content.prompts.map((p, i) => (
          <button
            key={i}
            onClick={() => onPromptClick?.(p)}
            className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all text-left text-sm md:text-base font-medium hover:scale-[1.02]"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
