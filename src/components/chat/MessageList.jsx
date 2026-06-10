import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";

const EMOJI_SET = ["👍", "❤️", "😂", "😮", "🔥", "🧠"];

// ── Helper: format timestamp ───────────────────────────────
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
}

// ── Group messages by date ─────────────────────────────────
function groupMessagesByDate(messages) {
    const groups = [];
    let currentDate = null;
    let currentGroup = null;

    messages.forEach((msg) => {
        const msgDate = new Date(msg.created_at).toDateString();
        if (msgDate !== currentDate) {
            currentDate = msgDate;
            currentGroup = { date: formatDate(msg.created_at), messages: [] };
            groups.push(currentGroup);
        }
        currentGroup.messages.push(msg);
    });

    return groups;
}

// ── Avatar ─────────────────────────────────────────────────
function Avatar({ name, picture, size = "8" }) {
    if (picture) {
        return (
            <img
                src={picture}
                alt={name}
                className={`w-${size} h-${size} rounded-full shrink-0 object-cover`}
            />
        );
    }
    return (
        <div className={`w-${size} h-${size} rounded-full bg-teal flex items-center 
                         justify-center text-white text-xs font-bold shrink-0`}>
            {name?.charAt(0)?.toUpperCase()}
        </div>
    );
}

// ── Emoji Picker ───────────────────────────────────────────
function EmojiPicker({ onSelect }) {
    return (
        <div className="absolute bottom-full mb-1 left-0 z-20
                        bg-white border border-gray-200 rounded-xl shadow-lg
                        px-2 py-1.5 flex gap-1">
            {EMOJI_SET.map(emoji => (
                <button
                    key={emoji}
                    onClick={() => onSelect(emoji)}
                    className="text-lg hover:scale-125 transition-transform 
                               duration-100 cursor-pointer bg-transparent 
                               border-none p-0.5 rounded"
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
}

// ── Reaction Pills ─────────────────────────────────────────
function ReactionPills({ reactions, messageId, channelId, currentUserId }) {
    const { addReaction, removeReaction } = useChat();

    if (!reactions || reactions.length === 0) return null;

    const handleClick = (emoji, userIds) => {
        const alreadyReacted = userIds.includes(currentUserId);
        if (alreadyReacted) {
            removeReaction(channelId, messageId, emoji);
        } else {
            addReaction(channelId, messageId, emoji);
        }
    };

    return (
        <div className="flex flex-wrap gap-1 mt-1">
            {reactions.map(({ emoji, count, user_ids }) => {
                const reacted = user_ids.includes(currentUserId);
                return (
                    <button
                        key={emoji}
                        onClick={() => handleClick(emoji, user_ids)}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full 
                                   text-xs border transition-all duration-150 cursor-pointer
                                   ${reacted
                                       ? "bg-teal/10 border-teal/40 text-teal"
                                       : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                                   }`}
                    >
                        <span>{emoji}</span>
                        <span className="font-medium">{count}</span>
                    </button>
                );
            })}
        </div>
    );
}

// ── Single message row ─────────────────────────────────────
function MessageRow({ message, isOwn, canDelete, onDelete, currentUserId }) {
    const [pickerOpen, setPickerOpen] = useState(false);
    const { addReaction, activeChannelId } = useChat();
    const pickerRef = useRef(null);

    // Close picker when clicking outside
    useEffect(() => {
        if (!pickerOpen) return;
        const handler = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setPickerOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [pickerOpen]);

    const handleEmojiSelect = (emoji) => {
        addReaction(activeChannelId, message.id, emoji);
        setPickerOpen(false);
    };

    return (
        <div className={`flex items-start gap-3 group px-4 py-1
                        hover:bg-gray-50 rounded-lg transition-colors duration-100
                        ${isOwn ? "flex-row-reverse" : ""}`}>
            {/* Avatar */}
            <Avatar
                name={message.user_name ?? message.user_id}
                picture={message.user_picture}
                size="8"
            />

            {/* Bubble + reactions */}
            <div className={`max-w-[70%] ${isOwn ? "items-end" : "items-start"} flex flex-col`}>
                {/* Name + time */}
                <div className={`flex items-baseline gap-2 mb-0.5 
                                ${isOwn ? "flex-row-reverse" : ""}`}>
                    <span className="text-[0.82rem] font-semibold text-navy">
                        {isOwn ? "You" : (message.user_name ?? message.user_id)}
                    </span>
                    <span className="text-[11px] text-gray-400">
                        {formatTime(message.created_at)}
                    </span>
                </div>

                {/* Message bubble */}
                {message.deleted ? (
                    <div className="px-3.5 py-2 rounded-2xl text-[0.85rem] italic
                                    text-gray-400 border border-dashed border-gray-200 bg-gray-50">
                        Message deleted
                    </div>
                ) : (
                    <div className={`px-3.5 py-2 rounded-2xl text-[0.9rem] leading-relaxed
                            ${isOwn
                                ? "bg-teal text-white rounded-tr-sm"
                                : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm"
                            }`}>
                        {message.content}
                    </div>
                )}

                {/* Reaction pills */}
                {!message.deleted && (
                    <ReactionPills
                        reactions={message.reactions}
                        messageId={message.id}
                        channelId={message.channel_id}
                        currentUserId={currentUserId}
                    />
                )}
            </div>

            {/* Hover actions — emoji picker trigger + delete */}
            {!message.deleted && (
                <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 
                                transition-opacity self-center
                                ${isOwn ? "flex-row-reverse" : ""}`}>
                    {/* Emoji picker trigger */}
                    <div className="relative" ref={pickerRef}>
                        <button
                            onClick={() => setPickerOpen(p => !p)}
                            className="text-gray-300 hover:text-gray-500 bg-transparent
                                       border-none cursor-pointer p-1 rounded
                                       text-base leading-none"
                            title="Add reaction"
                        >
                            😊
                        </button>
                        {pickerOpen && (
                            <EmojiPicker onSelect={handleEmojiSelect} />
                        )}
                    </div>

                    {/* Delete button */}
                    {canDelete && (
                        <button
                            onClick={() => onDelete(message.id)}
                            className="text-gray-300 hover:text-red-400 bg-transparent
                                       border-none cursor-pointer p-1 rounded"
                            title="Delete message"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

// ── Date divider ───────────────────────────────────────────
function DateDivider({ label }) {
    return (
        <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[11px] font-semibold text-gray-400 
                             uppercase tracking-widest shrink-0">
                {label}
            </span>
            <div className="flex-1 h-px bg-gray-200" />
        </div>
    );
}

// ── Empty state ────────────────────────────────────────────
function EmptyState({ channelName }) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center 
                            justify-center mb-4">
                <span className="text-3xl font-bold text-teal">#</span>
            </div>
            <h3 className="font-heading text-navy font-bold text-lg mb-2">
                Welcome to #{channelName}
            </h3>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                This is the beginning of the #{channelName} channel. Start the
                conversation!
            </p>
        </div>
    );
}

// ── Main MessageList ───────────────────────────────────────
export default function MessageList() {
    const { messages, isLoadingMessages, activeChannelId, channels, deleteMessage } = useChat();
    const { user } = useAuth();
    const containerRef = useRef(null);

    useEffect(() => {
        if (messages.length === 0) return;
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    const activeChannel = channels.find((c) => c.id === activeChannelId);

    if (isLoadingMessages) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-teal border-t-transparent 
                                   rounded-full animate-spin" />
                    <p className="text-gray-400 text-sm">Loading messages...</p>
                </div>
            </div>
        );
    }

    if (messages.length === 0) {
        return <EmptyState channelName={activeChannel?.name ?? "channel"} />;
    }

    const groups = groupMessagesByDate(messages);

    return (
        <div ref={containerRef} className="flex flex-col h-full overflow-y-auto py-4">
            {groups.map((group) => (
                <div key={group.date}>
                    <DateDivider label={group.date} />
                    {group.messages.map((message) => {
                        const isOwn = message.user_id === user.sub;
                        const canDelete = user.is_admin || isOwn;
                        return (
                            <MessageRow
                                key={message.id}
                                message={message}
                                isOwn={isOwn}
                                canDelete={canDelete}
                                currentUserId={user.sub}
                                onDelete={(messageId) =>
                                    deleteMessage(activeChannelId, messageId)
                                }
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}