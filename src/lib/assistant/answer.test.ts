import { describe, expect, it } from "vitest";
import { getAssistantKb } from "@/content/assistant";
import { answerAssistantQuery } from "./answer";

describe("local portfolio assistant matcher", () => {
  it("matches Spanish queries with diacritic folding", () => {
    const kb = getAssistantKb("es");
    const reply = answerAssistantQuery(kb, "Experiencia en Oracle NetSuite y compras ASPAEN");
    expect(reply.matchedTopic).not.toBeNull();
    expect(reply.answer.length).toBeGreaterThan(20);
    expect(reply.links.length).toBeGreaterThan(0);
  });

  it("matches English queries for Power BI, Python, and education", () => {
    const kb = getAssistantKb("en");
    const reply = answerAssistantQuery(kb, "Python Pandas ETL pipelines and Power BI DAX");
    expect(reply.matchedTopic).not.toBeNull();
    expect(reply.highlights.length).toBeGreaterThan(0);
  });

  it("returns fallback guidance with helpful links when query is empty or unmatched", () => {
    const kb = getAssistantKb("es");
    const emptyReply = answerAssistantQuery(kb, "   ");
    expect(emptyReply.matchedTopic).toBeNull();
    expect(emptyReply.answer).toBe(kb.fallbackAnswer);

    const unknownReply = answerAssistantQuery(kb, "xyzqwerty123456");
    expect(unknownReply.matchedTopic).toBeNull();
    expect(unknownReply.answer).toBe(kb.fallbackAnswer);
    expect(unknownReply.links.length).toBeGreaterThan(0);
  });
});
