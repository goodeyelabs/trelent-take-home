export type MessageType = {
  role: "assistant" | "function" | "system" | "user";
  content: string;
}
