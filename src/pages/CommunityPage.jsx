import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChatProvider, useChat } from "../context/ChatContext";
import ChannelSidebar from "../components/chat/ChannelSidebar";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import AdminModal from "../components/chat/AdminModal";

// ── Inner layout — has access to ChatContext ──────────────
function CommunityLayout() {
    const { channelId } = useParams();
    const navigate = useNavigate();
    const { channels, activeChannelId, joinChannel, fetchChannels } = useChat();
    const [adminOpen, setAdminOpen] = useState(false);

    // If URL has a channelId param, sync it to context
    useEffect(() => {
        if (channelId && channels.length > 0) {
            const channel = channels.find((c) => c.id === channelId);
            if (channel) {
                joinChannel(channelId);
            }
        }
    }, [channelId, channels, joinChannel]);

    // Default redirect bare /community → /community/general
    useEffect(() => {
        if (!channelId && channels.length > 0) {
            const general = channels.find(c => c.name === "general") || channels[0];
            navigate(`/community/${general.id}`, { replace: true });
        }
    }, [channelId, channels, navigate]);

    return (
        <main className="flex h-screen pt-[72px] bg-gray-50">
            {/* Left sidebar */}
            <aside className="w-64 shrink-0 bg-navy flex flex-col border-r border-navy/20">
                <ChannelSidebar onAdminOpen={() => setAdminOpen(true)} />
            </aside>

            {/* Right — main chat area */}
            <section className="flex flex-col flex-1 min-w-0">
                {/* Channel header */}
                <div className="h-14 border-b border-gray-200 bg-white flex items-center 
                                px-6 shrink-0 shadow-sm">
                    <span className="text-gray-400 font-medium text-lg mr-1">#</span>
                    <span className="font-semibold text-navy text-[0.95rem]">
                        {channels.find((c) => c.id === activeChannelId)?.name ?? "..."}
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <MessageList />
                </div>

                <div className="p-4 border-t border-gray-200 bg-white">
                    <MessageInput />
                </div>
            </section>

            {/* Admin modal — only renders when open */}
            {adminOpen && (
                <AdminModal
                    onClose={() => setAdminOpen(false)}
                    onChannelsChanged={fetchChannels}
                />
            )}
        </main>
    );
}

// ── Outer wrapper — provides ChatContext to everything inside
export default function CommunityPage() {
    return (
        <ChatProvider>
            <CommunityLayout />
        </ChatProvider>
    );
}
