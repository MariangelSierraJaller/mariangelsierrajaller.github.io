import type { AssistantKnowledgeBase, AssistantTopic } from "@/types/assistant";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface AssistantReply {
  matchedTopic: AssistantTopic | null;
  answer: string;
  highlights: readonly string[];
  links: AssistantTopic["links"];
}

export function answerAssistantQuery(
  kb: AssistantKnowledgeBase,
  query: string,
): AssistantReply {
  const norm = normalize(query);
  if (!norm) {
    return {
      matchedTopic: null,
      answer: kb.fallbackAnswer,
      highlights: [],
      links: [],
    };
  }

  const tokens = norm.split(" ").filter((t) => t.length >= 2);
  let bestTopic: AssistantTopic | null = null;
  let bestScore = 0;

  for (const topic of kb.topics) {
    let score = 0;
    const labelNorm = normalize(topic.label);
    const questionNorm = normalize(topic.question);

    if (norm === labelNorm || norm === questionNorm) {
      score += 50;
    }

    for (const kw of topic.keywords) {
      const kwNorm = normalize(kw);
      if (!kwNorm) continue;
      if (norm.includes(kwNorm)) {
        score += kwNorm.includes(" ") ? 12 : 8;
      } else {
        for (const token of tokens) {
          if (kwNorm === token) score += 6;
          else if (kwNorm.length >= 4 && kwNorm.includes(token) && token.length >= 3) score += 3;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  if (bestTopic && bestScore >= 6) {
    return {
      matchedTopic: bestTopic,
      answer: bestTopic.answer,
      highlights: bestTopic.highlights,
      links: bestTopic.links,
    };
  }

  return {
    matchedTopic: null,
    answer: kb.fallbackAnswer,
    highlights: [],
    links: kb.topics.slice(0, 3).flatMap((t) => t.links.slice(0, 1)),
  };
}
