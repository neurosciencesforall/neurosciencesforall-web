import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { Hash, Wifi, WifiOff, Lock, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChannelSidebar({ onAdminOpen }) {
	const { channels, activeChannelId, isConnected, onlineUsers } = useChat();
	const { user } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="flex flex-col h-full">
			{/* Workspace header */}
			<div className="px-4 py-4 border-b border-white/10">
				<h2 className="text-white font-bold text-[0.95rem] tracking-wide">
					NeuroSciences For All
				</h2>
				<p className="text-white/40 text-xs mt-0.5">Community</p>
			</div>

			{/* Connection status indicator */}
			<div className="px-4 py-2 flex items-center gap-1.5">
				{isConnected ? (
					<>
						<Wifi size={11} className="text-green-400" />
						<span className="text-[11px] text-green-400">Connected</span>
					</>
				) : (
					<>
						<WifiOff size={11} className="text-white/30" />
						<span className="text-[11px] text-white/30">Connecting...</span>
					</>
				)}
			</div>

			{/* Channels section */}
			<div className="flex-1 overflow-y-auto px-2 py-2">
				<p
					className="text-white/40 text-[11px] font-semibold uppercase 
                              tracking-widest px-2 mb-1"
				>
					Channels
				</p>

				<ul className="space-y-0.5 list-none m-0 p-0">
					{channels.map((channel) => (
						<li key={channel.id}>
							<button
								onClick={() => navigate(`/community/${channel.id}`)}
								className={`w-full flex items-center gap-2 px-2 py-1.5 
                                           rounded-md text-[0.88rem] transition-colors 
                                           duration-150 text-left cursor-pointer border-none
                                           ${
												activeChannelId === channel.id
												? "bg-white/20 text-white font-medium"
											    : "text-white/60 hover:bg-white/10 hover:text-white"
								            }`}
							>
								{/* Lock for private, Hash for public */}
								{channel.is_private ? (
									<Lock size={13} className="shrink-0 opacity-70" />
								) : (
									<Hash size={15} className="shrink-0 opacity-70" />
								)}
								{channel.name}

								{/* Online presence — stacked avatars, only when count > 0 */}
								{(() => {
									const users = (onlineUsers[channel.id] ?? []).filter(u => u.id !== user.sub);
									if (users.length === 0) return null;
									const visible = users.slice(0, 3);
									const overflow = users.length - 3;
									return (
										<span className="flex items-center ml-auto shrink-0">
											{visible.map((u, i) =>
												u.picture ? (
													<img
														key={u.id}
														src={u.picture}
														alt={u.name}
														title={u.name}
														className="w-4 h-4 rounded-full border border-navy"
														style={{
															marginLeft: i === 0 ? 0 : "-6px",
															zIndex: i,
														}}
													/>
												) : (
													<span
														key={u.id}
														title={u.name}
														className="w-4 h-4 rounded-full bg-teal border border-navy
                                       flex items-center justify-center
                                       text-white text-[8px] font-bold"
														style={{
															marginLeft: i === 0 ? 0 : "-6px",
															zIndex: i,
														}}
													>
														{u.name?.charAt(0)}
													</span>
												),
											)}
											{overflow > 0 && (
												<span className="text-[10px] text-white/50 ml-1">
													+{overflow}
												</span>
											)}
										</span>
									);
								})()}
							</button>
						</li>
					))}
				</ul>
			</div>

			{/* User info at bottom */}
			<div className="px-3 py-3 border-t border-white/10 flex items-center gap-2.5">
				{user.picture ? (
					<img
						src={user.picture}
						alt={user.name}
						className="w-8 h-8 rounded-full border border-white/20 shrink-0"
					/>
				) : (
					<div
						className="w-8 h-8 rounded-full bg-teal flex items-center 
                                    justify-center text-white text-xs font-bold shrink-0"
					>
						{user.name?.charAt(0)}
					</div>
				)}
				<div className="min-w-0 flex-1">
					<p className="text-white text-[0.8rem] font-medium truncate">
						{user.name}
					</p>
					<p className="text-white/40 text-[11px] truncate">{user.email}</p>
				</div>

				{/* Admin gear — only visible to admin */}
				{user.is_admin && (
					<button
						onClick={onAdminOpen}
						title="Admin Panel"
						className="text-white/40 hover:text-white transition-colors 
                                   cursor-pointer border-none bg-transparent p-1 rounded"
					>
						<Settings size={15} />
					</button>
				)}
			</div>
		</div>
	);
}
