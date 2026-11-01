"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { getGuideErrorMessage, parseGuideStream, safeGuideLinks } from "@/lib/guide/client";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  pending?: boolean;
};

type ContextMessage = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "What does Teregon Labs build?",
  "What is Teregon Aqua?",
  "Tell me about BrioBot and Briopedia",
  "How do I start a project?",
];

function renderAnswer(text: string) {
  return safeGuideLinks(text).map((part, index) =>
    part.href ? (
      <a
        href={part.href}
        key={`${part.href}-${index}`}
        target={part.href.startsWith("https://") ? "_blank" : undefined}
        rel={part.href.startsWith("https://") ? "noopener noreferrer" : undefined}
      >
        {part.text}
      </a>
    ) : (
      <span key={`text-${index}`}>{part.text}</span>
    ),
  );
}

export function GuideWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const contextRef = useRef<ContextMessage[]>([]);
  const messageIdRef = useRef(0);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages]);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const updateMessage = useCallback((id: number, patch: Partial<Message>) => {
    setMessages((current) => current.map((message) => message.id === id ? { ...message, ...patch } : message));
  }, []);

  const ask = useCallback(async (rawQuestion: string) => {
    const question = rawQuestion.trim().slice(0, 1200);
    if (!question || controllerRef.current) return;

    const userMessage: ContextMessage = { role: "user", content: question };
    const userId = ++messageIdRef.current;
    const answerId = ++messageIdRef.current;
    setMessages((current) => [
      ...current,
      { id: userId, role: "user", text: question },
      { id: answerId, role: "assistant", text: "", pending: true },
    ]);
    setAnnouncement("Question sent. Teregon Guide is preparing an answer.");
    setBusy(true);

    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const messagesToSend = [...contextRef.current, userMessage].slice(-8);
      const response = await fetch("/api/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
        body: JSON.stringify({ messages: messagesToSend }),
        signal: controller.signal,
      });

      if (!response.ok) {
        let payload: { error?: string } = {};
        try { payload = await response.json(); } catch { /* show the safe fallback */ }
        updateMessage(answerId, { text: getGuideErrorMessage(payload.error, response.headers.get("Retry-After") || undefined), pending: false });
        setDraft(question);
        setAnnouncement("The answer could not be completed. Your question is still in the input so you can retry.");
        return;
      }
      if (!response.body) {
        updateMessage(answerId, { text: getGuideErrorMessage("unavailable"), pending: false });
        setDraft(question);
        return;
      }

      let responseText = "";
      await parseGuideStream(response.body, {
        signal: controller.signal,
        onDelta: (_delta, accumulated) => {
          responseText = accumulated;
          updateMessage(answerId, { text: accumulated, pending: true });
        },
      });

      if (!responseText.trim()) {
        updateMessage(answerId, {
          text: "I could not find a grounded answer in the published site information. Try a more specific question or contact the team.",
          pending: false,
        });
        setDraft(question);
        setAnnouncement("No grounded answer was available. Your question is still in the input.");
        return;
      }

      updateMessage(answerId, { text: responseText, pending: false });
      const nextContext: ContextMessage[] = [
        ...contextRef.current,
        userMessage,
        { role: "assistant", content: responseText },
      ];
      contextRef.current = nextContext.slice(-8);
      setDraft("");
      setAnnouncement("Answer received.");
    } catch (error) {
      const aborted = (error as Error)?.name === "AbortError";
      updateMessage(answerId, {
        text: aborted
          ? "Response stopped. Your question is still in the input; submit it again when you are ready."
          : getGuideErrorMessage((error as Error & { code?: string })?.code),
        pending: false,
      });
      setDraft(question);
      setAnnouncement(aborted ? "Response stopped. Your question is still available to retry." : "The answer could not be completed. Your question is still in the input.");
    } finally {
      if (controllerRef.current === controller) controllerRef.current = null;
      setBusy(false);
    }
  }, [updateMessage]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (controllerRef.current) {
      controllerRef.current.abort();
      return;
    }
    void ask(draft);
  };

  const openGuide = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const returnFocus = () => {
    controllerRef.current?.abort();
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const closeFromBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) dialogRef.current?.close();
  };

  const runPrompt = (question: string) => {
    setDraft(question);
    void ask(question);
  };

  return (
    <div className="guide-widget">
      <button
        className="guide-trigger"
        id="guide-open"
        type="button"
        aria-controls="teregon-guide"
        aria-expanded={open}
        onClick={openGuide}
        ref={triggerRef}
      >
        <span className="guide-trigger-dot" aria-hidden="true" />
        Teregon Guide
        <span aria-hidden="true">↗</span>
      </button>

      <dialog
        className="guide-dialog"
        id="teregon-guide"
        aria-labelledby="teregon-guide-title"
        aria-modal="true"
        onClick={closeFromBackdrop}
        onCancel={returnFocus}
        onClose={returnFocus}
        ref={dialogRef}
      >
        <div className="guide-panel">
          <header className="guide-header">
            <div>
              <p className="guide-kicker">TEREGON / SITE GUIDE</p>
              <h2 id="teregon-guide-title">Ask about Teregon.</h2>
              <p>Learn about our work, water practice, and how to start a project.</p>
            </div>
            <button className="guide-close" type="button" aria-label="Close Teregon Guide" onClick={() => dialogRef.current?.close()}>
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div className="guide-messages" id="guide-messages" role="log" aria-live="polite" aria-relevant="additions text" ref={logRef}>
            {messages.map((message) => (
              <div className={`guide-message guide-message-${message.role}`} data-role={message.role} key={message.id}>
                {message.pending && !message.text ? (
                  <span className="guide-thinking" role="status" aria-label="Teregon Guide is thinking">Thinking…</span>
                ) : renderAnswer(message.text)}
              </div>
            ))}
          </div>

          <div className="guide-prompts" role="group" aria-label="Suggested questions">
            {STARTERS.map((question, index) => (
              <button
                className="guide-prompt"
                type="button"
                key={question}
                disabled={busy}
                onClick={() => runPrompt(question)}
              >
                {index === 0 ? "What does Labs build?" : index === 1 ? "What is Teregon Aqua?" : index === 2 ? "Brio systems" : "Start a project"}
              </button>
            ))}
          </div>

          <form className="guide-composer" id="guide-form" onSubmit={submit} aria-busy={busy}>
            <label htmlFor="guide-input">Ask about Teregon</label>
            <div className="guide-composer-row">
              <input
                autoComplete="off"
                id="guide-input"
                maxLength={1200}
                name="question"
                onChange={(event) => setDraft(event.target.value)}
                placeholder="What would you like to know?"
                ref={inputRef}
                required
                value={draft}
              />
              <button className="guide-submit" type="submit" disabled={!busy && !draft.trim()}>
                {busy ? "Stop" : "Ask"}
                <span aria-hidden="true">{busy ? "×" : "↗"}</span>
              </button>
            </div>
            <span className="guide-status" role="status" aria-live="polite">{announcement}</span>
          </form>

          <p className="guide-disclosure" id="guide-disclosure">
            Your question and recent context go to OpenRouter to generate answers. Teregon does not store chat history. {" "}
            <a href="https://openrouter.ai/privacy" target="_blank" rel="noopener noreferrer">OpenRouter privacy</a>.
          </p>
        </div>
      </dialog>
    </div>
  );
}
