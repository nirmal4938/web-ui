// src/components/AIChatbot.tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import { FiSend, FiX, FiMessageCircle } from "react-icons/fi";
import { EventSourcePolyfill } from "event-source-polyfill";
import { defaultTheme } from "@/theme/theme";

// ---------- Styled Components ----------
const ChatContainer = styled.div<{ open: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: ${({ open }) => (open ? "360px" : "60px")};
  height: ${({ open }) => (open ? "500px" : "60px")};
  background: ${({ theme }) => theme.CONTENT_CARD};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.CONTENT_SHADOW};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease, height 0.3s ease;
  z-index: 9999;
`;

const ChatHeader = styled.div`
  background: ${({ theme }) => theme.CTA_COLOR};
  color: ${({ theme }) => theme.WHITE};
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ChatBody = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.CONTENT_BG};
  padding: ${({ theme }) => theme.spacing(2)};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const MessageBubble = styled.div<{ sender: "user" | "bot" }>`
  align-self: ${({ sender }) => (sender === "user" ? "flex-end" : "flex-start")};
  background: ${({ theme, sender }) =>
    sender === "user" ? theme.CTA_COLOR : theme.GREY};
  color: ${({ theme, sender }) => (sender === "user" ? theme.WHITE : theme.TEXT)};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.md};
  max-width: 80%;
  word-break: break-word;
  font-size: ${({ theme }) => theme.font.size.body};
`;

const ChatInputWrapper = styled.form`
  display: flex;
  padding: ${({ theme }) => theme.spacing(1)};
  border-top: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
`;

const ChatInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(1)};
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  border-radius: ${({ theme }) => theme.radius.sm};
  outline: none;
  font-size: ${({ theme }) => theme.font.size.body};
`;

const SendButton = styled.button`
  margin-left: ${({ theme }) => theme.spacing(1)};
  background: ${({ theme }) => theme.CTA_COLOR};
  color: ${({ theme }) => theme.WHITE};
  border: none;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.CTA_COLOR_HOVER};
  }
`;

// ---------- Types ----------
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  typing?: boolean;
}

// ---------- Component ----------
export const AIChatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef<string>(crypto.randomUUID());

  // Scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!input.trim()) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: "user",
      };
      setMessages(prev => [...prev, userMessage]);

      const messageToSend = input;
      setInput("");

      try {
        // 1️⃣ Request botMessageId from backend
        const postRes = await fetch(`${import.meta.env.VITE_API_PROD_URL}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionId.current, message: messageToSend }),
        });
        const { botMessageId } = await postRes.json();

        // 2️⃣ Add bot placeholder with typing
        setMessages(prev => [
          ...prev,
          { id: botMessageId.toString(), text: "", sender: "bot", typing: true },
        ]);

        // 3️⃣ Open SSE stream
        const params = new URLSearchParams({
          sessionId: sessionId.current,
          botMessageId: botMessageId.toString(),
          message: messageToSend,
        });
        const eventSource = new EventSourcePolyfill(
          `${import.meta.env.VITE_API_PROD_URL}/chat/stream?${params.toString()}`
        );

        eventSource.onmessage = function (this: EventSource, e: any) {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === botMessageId.toString()
                ? { ...msg, text: msg.text + e.data }
                : msg
            )
          );
        };

        eventSource.addEventListener("done", () => {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === botMessageId.toString() ? { ...msg, typing: false } : msg
            )
          );
          eventSource.close();
        });

        eventSource.onerror = () => {
          eventSource.close();
          setMessages(prev =>
            prev.map(msg =>
              msg.id === botMessageId.toString()
                ? { ...msg, text: msg.text + "\n[Error receiving AI response]", typing: false }
                : msg
            )
          );
        };
      } catch (err) {
        console.error(err);
      }
    },
    [input]
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <ChatContainer open={open}>
        <ChatHeader onClick={() => setOpen(prev => !prev)}>
          {open ? "AI Assistant" : <FiMessageCircle size={24} />}
          {open && <FiX onClick={() => setOpen(false)} />}
        </ChatHeader>

        {open && (
          <>
            <ChatBody ref={bodyRef}>
              {messages.map(msg => (
                <MessageBubble key={msg.id} sender={msg.sender}>
                  {msg.text}
                  {msg.typing && <span> | typing...</span>}
                </MessageBubble>
              ))}
            </ChatBody>

            <ChatInputWrapper onSubmit={sendMessage}>
              <ChatInput
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
              />
              <SendButton type="submit">
                <FiSend size={20} />
              </SendButton>
            </ChatInputWrapper>
          </>
        )}
      </ChatContainer>
    </ThemeProvider>
  );
};
