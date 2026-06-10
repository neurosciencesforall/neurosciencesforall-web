import {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ChatContext = createContext(null);

const API_URL = "https://chat-server-production-e62d.up.railway.app";
const WS_URL = "wss://chat-server-production-e62d.up.railway.app";

export function ChatProvider({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [channels, setChannels] = useState([]);
    const [activeChannelId, setActiveChannelId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState({});  // { channel_id: OnlineUser[] }

    const wsRef = useRef(null);

    // ── Session Expired ────────────────────────────────────
    const handleSessionExpired = useCallback(() => {
        setSessionExpired(true);
        if (wsRef.current) wsRef.current.close();
        setTimeout(() => {
            logout();
            navigate("/login");
        }, 3000);
    }, [logout, navigate]);

    // ── Stable refs for callbacks used inside WS effect ───
    // This lets the WS effect deps stay minimal while always
    // calling the latest version of these functions
    const handleSessionExpiredRef = useRef(handleSessionExpired);
    useEffect(() => {
        handleSessionExpiredRef.current = handleSessionExpired;
    }, [handleSessionExpired]);

    const fetchMessagesRef = useRef(null);

    // ── Fetch Channels ─────────────────────────────────────
    const fetchChannels = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/api/channels`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (res.status === 401) { handleSessionExpiredRef.current(); return; }
            const data = await res.json();
            setChannels(data);
        } catch (err) {
            console.error("Failed to fetch channels:", err);
        }
    }, [user?.token]);

    // ── Fetch Messages ─────────────────────────────────────
    const fetchMessages = useCallback(async (channelId) => {
        if (!channelId) return;
        setIsLoadingMessages(true);
        try {
            const res = await fetch(
                `${API_URL}/api/channels/${channelId}/messages`,
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            if (res.status === 401) { handleSessionExpiredRef.current(); return; }
            const data = await res.json();
            setMessages(data.reverse());
        } catch (err) {
            console.error("Failed to fetch messages:", err);
        } finally {
            setIsLoadingMessages(false);
        }
    }, [user?.token]);

    // Keep fetchMessagesRef in sync
    useEffect(() => {
        fetchMessagesRef.current = fetchMessages;
    }, [fetchMessages]);

    // ── Fetch online users for a channel ──────────────────
    const fetchOnlineUsers = useCallback(async (channelId) => {
        try {
            const res = await fetch(
                `${API_URL}/api/channels/${channelId}/online`,
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            if (!res.ok) return;
            const data = await res.json();
            setOnlineUsers(prev => ({ ...prev, [channelId]: data }));
        } catch (err) {
            console.error("Failed to fetch online users:", err);
        }
    }, [user?.token]);

    // ── Join Channel ───────────────────────────────────────
    const joinChannel = useCallback((channelId) => {
        if (channelId === activeChannelId) return;
        setActiveChannelId(channelId);
        setMessages([]);
    }, [activeChannelId]);

    // ── Send Message ───────────────────────────────────────
    const sendMessage = useCallback((content) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.warn("WebSocket not connected");
            return;
        }
        wsRef.current.send(JSON.stringify({ content }));
    }, []);

    // ── Delete Message ─────────────────────────────────────
    const deleteMessage = useCallback(async (channelId, messageId) => {
        try {
            const res = await fetch(
                `${API_URL}/api/channels/${channelId}/messages/${messageId}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            if (!res.ok) return;
        } catch (err) {
            console.error("Failed to delete message:", err);
        }
    }, [user?.token]);


    // ── Add Reaction ───────────────────────────────────────
const addReaction = useCallback(async (channelId, messageId, emoji) => {
    try {
        await fetch(
            `${API_URL}/api/channels/${channelId}/messages/${messageId}/reactions`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emoji }),
            }
        );
    } catch (err) {
        console.error("Failed to add reaction:", err);
    }
}, [user?.token]);

// ── Remove Reaction ────────────────────────────────────
const removeReaction = useCallback(async (channelId, messageId, emoji) => {
    try {
        await fetch(
            `${API_URL}/api/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${user.token}` },
            }
        );
    } catch (err) {
        console.error("Failed to remove reaction:", err);
    }
}, [user?.token]);

    // ── Fetch channels on mount ────────────────────────────
    useEffect(() => {
        if (!user?.token) return;
        fetchChannels();
    }, [user?.token, fetchChannels]);

    // ── WebSocket + messages effect ────────────────────────
    useEffect(() => {
        if (!activeChannelId || !user?.token || channels.length === 0) return;

        // Fetch message history and initial online users
        fetchMessagesRef.current(activeChannelId);
        fetchOnlineUsers(activeChannelId);

        // Close any existing socket
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }

        const channelId = activeChannelId;
        const token = user.token;

        const ws = new WebSocket(`${WS_URL}/ws/${channelId}?token=${token}`);

        ws.onopen = () => {
            setIsConnected(true);
            console.log(`Connected to channel: ${channelId}`);
        };

        ws.onmessage = (event) => {
            try {
                const wsEvent = JSON.parse(event.data);

                if (wsEvent.type === "NewMessage") {
                    if (wsEvent.payload.channel_id === channelId) {
                        setMessages(prev => [...prev, wsEvent.payload]);
                    }
                } else if (wsEvent.type === "MessageDeleted") {
                    if (wsEvent.payload.channel_id === channelId) {
                        setMessages(prev => prev.map(m =>
                            m.id === wsEvent.payload.message_id
                                ? { ...m, deleted: true }
                                : m
                        ));
                    }
                } else if (wsEvent.type === "ReactionUpdated") {
                    if (wsEvent.payload.channel_id === channelId) {
                        setMessages(prev => prev.map(m =>
                            m.id === wsEvent.payload.message_id
                                ? { ...m, reactions: wsEvent.payload.reactions }
                                : m
                        ));
                    }
                } else if (wsEvent.type === "UserJoined") {
                    if (wsEvent.payload.channel_id === channelId) {
                        setOnlineUsers(prev => {
                            const current = prev[channelId] ?? [];
                            // Avoid duplicates
                            const already = current.some(u => u.id === wsEvent.payload.user.id);
                            if (already) return prev;
                            return {
                                ...prev,
                                [channelId]: [...current, wsEvent.payload.user],
                            };
                        });
                    }
                } else if (wsEvent.type === "UserLeft") {
                    if (wsEvent.payload.channel_id === channelId) {
                        setOnlineUsers(prev => ({
                            ...prev,
                            [channelId]: (prev[channelId] ?? []).filter(
                                u => u.id !== wsEvent.payload.user_id
                            ),
                        }));
                    }
                }
            } catch (err) {
                console.error("Failed to parse WS message:", err);
            }
        };

        ws.onclose = (event) => {
            setIsConnected(false);
            if (event.code === 4001 || event.code === 1008) {
                handleSessionExpiredRef.current();
            }
        };

        ws.onerror = () => setIsConnected(false);

        wsRef.current = ws;

        return () => {
            ws.close();
            wsRef.current = null;
            setTimeout(() => fetchOnlineUsers(channelId), 200);
        };
    }, [activeChannelId, user?.token, channels.length, fetchOnlineUsers]);
    // ↑ fetchOnlineUsers is stable (only depends on user.token which is already here)
    //   fetchMessages and handleSessionExpired accessed via refs — no stale closure risk

    // ── Context Value ──────────────────────────────────────
    return (
        <ChatContext.Provider
            value={{
                channels,
                activeChannelId,
                messages,
                isConnected,
                isLoadingMessages,
                sessionExpired,
                onlineUsers,
                joinChannel,
                sendMessage,
                deleteMessage,
                addReaction,
                removeReaction,
                fetchChannels,
            }}
        >
            {sessionExpired && (
                <div className="fixed top-0 left-0 right-0 z-100 bg-red-500 text-white 
                                text-center py-3 px-4 font-medium animate-pulse">
                    Your session has expired. Redirecting to login...
                </div>
            )}
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error("useChat must be used inside ChatProvider");
    return ctx;
}