import { useState, useRef, useCallback } from "react";
import { useChat } from "../../context/ChatContext";
import { Send } from "lucide-react";

export default function MessageInput() {
    const { sendMessage, isConnected, activeChannelId, channels } = useChat();
    const [content, setContent] = useState("");
    const [isSending, setIsSending] = useState(false);
    const textareaRef = useRef(null);

    // Find active channel name for placeholder text
    const activeChannel = channels.find(c => c.id === activeChannelId);

    // ── Send handler ───────────────────────────────────────
    const handleSend = useCallback(() => {
        const trimmed = content.trim();

        // Don't send empty messages
        if (!trimmed) return;

        // Don't send if WebSocket isn't connected
        if (!isConnected) return;

        setIsSending(true);
        sendMessage(trimmed);
        setContent("");
        setIsSending(false);

        // Refocus the textarea after sending
        textareaRef.current?.focus();
    }, [content, isConnected, sendMessage]);

    // ── Keyboard handler ───────────────────────────────────
    // Enter = send, Shift+Enter = new line
    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // prevent newline
            handleSend();
        }
    }, [handleSend]);

    // ── Auto-resize textarea ───────────────────────────────
    // Grows as user types multiple lines, up to a max height
    const handleChange = useCallback((e) => {
        setContent(e.target.value);

        // Reset height first so it can shrink back down
        e.target.style.height = "auto";
        // Then set to scrollHeight so it fits content
        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
    }, []);

    const isEmpty = content.trim().length === 0;

    return (
        <div className="px-4 py-3">
            <div className={`flex items-end gap-2 bg-white border rounded-xl 
                            px-3 py-2 transition-colors duration-200
                            ${isConnected
                                ? "border-gray-200 focus-within:border-teal focus-within:shadow-sm"
                                : "border-gray-100 bg-gray-50"
                            }`}>

                {/* Textarea — grows with content */}
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={!isConnected}
                    placeholder={
                        isConnected
                            ? `Message #${activeChannel?.name ?? "..."}`
                            : "Connecting to chat..."
                    }
                    rows={1}
                    className="flex-1 resize-none bg-transparent text-[0.9rem] 
                               text-gray-800 placeholder-gray-400 outline-none 
                               border-none py-1 leading-relaxed min-h-[36px]
                               disabled:cursor-not-allowed disabled:text-gray-400"
                    style={{ height: "36px" }}
                />

                {/* Send button */}
                <button
                    onClick={handleSend}
                    disabled={isEmpty || !isConnected || isSending}
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center 
                                justify-center transition-all duration-200 mb-0.5
                                ${!isEmpty && isConnected
                                    ? "bg-teal text-white hover:bg-teal/90 cursor-pointer shadow-sm"
                                    : "bg-gray-100 text-gray-300 cursor-not-allowed"
                                }`}
                >
                    <Send size={15} />
                </button>
            </div>

            {/* Hint text below input */}
            <p className="text-[11px] text-gray-400 mt-1.5 px-1">
                {isConnected
                    ? "Press Enter to send · Shift+Enter for new line"
                    : "Waiting for connection..."
                }
            </p>
        </div>
    );
}
