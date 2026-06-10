import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { X, Lock, Hash, Plus, Trash2, Users, RefreshCw } from "lucide-react";

const API_URL = "https://chat-server-production-e62d.up.railway.app";

export default function AdminModal({ onClose, onChannelsChanged }) {
	const { user } = useAuth();

	const [tab, setTab] = useState("channels"); // "channels" | "members"
	const [channels, setChannels] = useState([]);
	const [allUsers, setAllUsers] = useState([]);
	const [selectedChannel, setSelectedChannel] = useState(null);
	const [members, setMembers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// New channel form
	const [newChannelName, setNewChannelName] = useState("");
	const [newChannelDesc, setNewChannelDesc] = useState("");
	const [newChannelPrivate, setNewChannelPrivate] = useState(false);
	const [creating, setCreating] = useState(false);

	const [invitedEmails, setInvitedEmails] = useState([]);
	const [newEmail, setNewEmail] = useState("");
	const [inviting, setInviting] = useState(false);

	const authHeader = { Authorization: `Bearer ${user.token}` };

	// ── Fetch all channels (admin sees all) ────────────────
	const fetchChannels = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(`${API_URL}/api/channels`, {
				headers: authHeader,
			});
			const data = await res.json();
			setChannels(data);
		} catch {
			setError("Failed to load channels");
		} finally {
			setLoading(false);
		}
	}, [user.token]);

	// ── Fetch all users ────────────────────────────────────
	const fetchUsers = useCallback(async () => {
		try {
			const res = await fetch(`${API_URL}/api/admin/users`, {
				headers: authHeader,
			});
			const data = await res.json();
			setAllUsers(data);
		} catch {
			setError("Failed to load users");
		}
	}, [user.token]);

	// ── Fetch members for selected channel ─────────────────
	const fetchMembers = useCallback(
		async (channelId) => {
			try {
				const res = await fetch(
					`${API_URL}/api/admin/channels/${channelId}/members`,
					{ headers: authHeader },
				);
				const data = await res.json();
				setMembers(data);
			} catch {
				setError("Failed to load members");
			}
		},
		[user.token],
	);

	// ── Fetch invited emails ───────────────────────────────
	const fetchInvited = useCallback(async () => {
		try {
			const res = await fetch(`${API_URL}/api/admin/invited`, {
				headers: authHeader,
			});
			const data = await res.json();
			setInvitedEmails(data);
		} catch {
			setError("Failed to load invited emails");
		}
	}, [user.token]);

	// ── Add invited email ──────────────────────────────────
	const addInvited = async () => {
		const email = newEmail.trim().toLowerCase();
		if (!email || !email.includes("@")) return;
		setInviting(true);
		try {
			const res = await fetch(`${API_URL}/api/admin/invited`, {
				method: "POST",
				headers: { ...authHeader, "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			if (!res.ok) {
				setError("Failed to add email");
				return;
			}
			setNewEmail("");
			await fetchInvited();
		} catch {
			setError("Failed to add email");
		} finally {
			setInviting(false);
		}
	};

	// ── Remove invited email ───────────────────────────────
	const removeInvited = async (email) => {
		try {
			const res = await fetch(
				`${API_URL}/api/admin/invited/${encodeURIComponent(email)}`,
				{ method: "DELETE", headers: authHeader },
			);
			if (res.status === 403) {
				setError("You can't remove your own email");
				return;
			}
			await fetchInvited();
		} catch {
			setError("Failed to remove email");
		}
	};

	// ── Toggle private/public ──────────────────────────────
	const togglePrivate = async (channel) => {
		try {
			await fetch(`${API_URL}/api/admin/channels/${channel.id}`, {
				method: "PATCH",
				headers: { ...authHeader, "Content-Type": "application/json" },
				body: JSON.stringify({ is_private: !channel.is_private }),
			});
			await fetchChannels();
			onChannelsChanged(); // refresh sidebar
		} catch {
			setError("Failed to update channel");
		}
	};

	// ── Add member ─────────────────────────────────────────
	const addMember = async (userId) => {
		try {
			await fetch(
				`${API_URL}/api/admin/channels/${selectedChannel.id}/members`,
				{
					method: "POST",
					headers: { ...authHeader, "Content-Type": "application/json" },
					body: JSON.stringify({ user_id: userId }),
				},
			);
			await fetchMembers(selectedChannel.id);
		} catch {
			setError("Failed to add member");
		}
	};

	// ── Remove member ──────────────────────────────────────
	const removeMember = async (userId) => {
		try {
			await fetch(
				`${API_URL}/api/admin/channels/${selectedChannel.id}/members/${userId}`,
				{ method: "DELETE", headers: authHeader },
			);
			await fetchMembers(selectedChannel.id);
		} catch {
			setError("Failed to remove member");
		}
	};

	// ── Create channel ─────────────────────────────────────
	const createChannel = async () => {
		if (!newChannelName.trim()) return;
		setCreating(true);
		try {
			await fetch(`${API_URL}/api/channels`, {
				method: "POST",
				headers: { ...authHeader, "Content-Type": "application/json" },
				body: JSON.stringify({
					name: newChannelName.trim(),
					description: newChannelDesc.trim() || null,
					is_private: newChannelPrivate,
				}),
			});
			setNewChannelName("");
			setNewChannelDesc("");
			setNewChannelPrivate(false);
			await fetchChannels();
			onChannelsChanged();
		} catch {
			setError("Failed to create channel");
		} finally {
			setCreating(false);
		}
	};

	// ── Select a channel in members tab ───────────────────
	const selectChannel = (channel) => {
		setSelectedChannel(channel);
		fetchMembers(channel.id);
	};

	// ── Load on mount ──────────────────────────────────────
	useEffect(() => {
		fetchChannels();
		fetchUsers();
        fetchInvited();
	}, [fetchChannels, fetchUsers, fetchInvited]);

	// ── Non-members (users not yet in selected channel) ───
	const nonMembers = allUsers.filter(
		(u) => !members.some((m) => m.id === u.id),
	);

	return (
		/* Backdrop */
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
			onClick={(e) => e.target === e.currentTarget && onClose()}
		>
			{/* Modal */}
			<div
				className="bg-[#1e1e2e] rounded-xl shadow-2xl w-full max-w-2xl 
                            max-h-[80vh] flex flex-col mx-4"
			>
				{/* Header */}
				<div
					className="flex items-center justify-between px-6 py-4 
                                border-b border-white/10"
				>
					<h2 className="text-white font-semibold text-base">Admin Panel</h2>
					<button
						onClick={onClose}
						className="text-white/40 hover:text-white transition-colors 
                                   cursor-pointer bg-transparent border-none"
					>
						<X size={18} />
					</button>
				</div>

				{/* Tabs */}
				<div className="flex border-b border-white/10 px-6">
					{["channels", "members", "access"].map((t) => (
						<button
							key={t}
							onClick={() => setTab(t)}
							className={`py-3 px-4 text-sm font-medium border-b-2 
                                       transition-colors cursor-pointer bg-transparent
                                       capitalize
                                       ${
                                            tab === t
                                            ? "border-teal-400 text-teal-400"
                                            : "border-transparent text-white/40 hover:text-white"
                                    }`}
						>
							{t}
						</button>
					))}
				</div>

				{/* Body */}
				<div className="flex-1 overflow-y-auto p-6">
					{error && <p className="text-red-400 text-sm mb-4">{error}</p>}

					{/* ── Channels Tab ── */}
					{tab === "channels" && (
						<div className="space-y-6">
							{/* Create new channel */}
							<div className="bg-white/5 rounded-lg p-4 space-y-3">
								<p className="text-white/70 text-sm font-medium">
									Create Channel
								</p>
								<input
									type="text"
									placeholder="Channel name"
									value={newChannelName}
									onChange={(e) => setNewChannelName(e.target.value)}
									className="w-full bg-white/10 text-white text-sm 
                                               rounded-md px-3 py-2 outline-none 
                                               placeholder:text-white/30 border border-white/10
                                               focus:border-teal-400/50"
								/>
								<input
									type="text"
									placeholder="Description (optional)"
									value={newChannelDesc}
									onChange={(e) => setNewChannelDesc(e.target.value)}
									className="w-full bg-white/10 text-white text-sm 
                                               rounded-md px-3 py-2 outline-none 
                                               placeholder:text-white/30 border border-white/10
                                               focus:border-teal-400/50"
								/>
								<div className="flex items-center justify-between">
									<label
										className="flex items-center gap-2 
                                                      text-white/60 text-sm cursor-pointer"
									>
										<input
											type="checkbox"
											checked={newChannelPrivate}
											onChange={(e) => setNewChannelPrivate(e.target.checked)}
											className="accent-teal-400"
										/>
										Private channel
									</label>
									<button
										onClick={createChannel}
										disabled={creating || !newChannelName.trim()}
										className="flex items-center gap-1.5 bg-teal-500 
                                                   hover:bg-teal-400 disabled:opacity-40
                                                   text-white text-sm px-3 py-1.5 rounded-md
                                                   transition-colors cursor-pointer border-none"
									>
										<Plus size={14} />
										{creating ? "Creating..." : "Create"}
									</button>
								</div>
							</div>

							{/* Channel list */}
							<div>
								<div className="flex items-center justify-between mb-2">
									<p className="text-white/70 text-sm font-medium">
										All Channels
									</p>
									<button
										onClick={fetchChannels}
										className="text-white/30 hover:text-white 
                                                   transition-colors bg-transparent 
                                                   border-none cursor-pointer"
									>
										<RefreshCw size={13} />
									</button>
								</div>

								{loading ? (
									<p className="text-white/30 text-sm">Loading...</p>
								) : (
									<ul className="space-y-1 list-none m-0 p-0">
										{channels.map((channel) => (
											<li
												key={channel.id}
												className="flex items-center justify-between 
                                                           bg-white/5 rounded-lg px-3 py-2.5"
											>
												<div className="flex items-center gap-2">
													{channel.is_private ? (
														<Lock size={13} className="text-white/40" />
													) : (
														<Hash size={14} className="text-white/40" />
													)}
													<span className="text-white text-sm">
														{channel.name}
													</span>
													{channel.description && (
														<span className="text-white/30 text-xs">
															— {channel.description}
														</span>
													)}
												</div>
												<button
													onClick={() => togglePrivate(channel)}
													title={
														channel.is_private ? "Make public" : "Make private"
													}
													className={`text-xs px-2 py-1 rounded 
                                                               cursor-pointer border-none
                                                               transition-colors
                                                               ${
                                                                    channel.is_private
                                                                    ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                                                                    : "bg-white/10 text-white/50 hover:bg-white/20"
                                                                }`}
												>
													{channel.is_private ? "Private" : "Public"}
												</button>
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
					)}

					{/* ── Members Tab ── */}
					{tab === "members" && (
						<div className="space-y-4">
							{/* Channel picker */}
							<div>
								<p className="text-white/70 text-sm font-medium mb-2">
									Select Channel
								</p>
								<div className="flex flex-wrap gap-2">
									{channels.map((channel) => (
										<button
											key={channel.id}
											onClick={() => selectChannel(channel)}
											className={`flex items-center gap-1.5 text-sm 
                                                       px-3 py-1.5 rounded-full border 
                                                       transition-colors cursor-pointer
                                                       ${
                                                            selectedChannel?.id ===
                                                            channel.id
                                                                ? "bg-teal-500/20 border-teal-400/50 text-teal-300"
                                                                : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                                                        }`}
										>
											{channel.is_private ? (
												<Lock size={11} />
											) : (
												<Hash size={12} />
											)}
											{channel.name}
										</button>
									))}
								</div>
							</div>

							{selectedChannel && (
								<div className="grid grid-cols-2 gap-4">
									{/* Current members */}
									<div>
										<p
											className="text-white/70 text-sm font-medium mb-2 
                                                      flex items-center gap-1.5"
										>
											<Users size={13} />
											Members ({members.length})
										</p>
										<ul className="space-y-1 list-none m-0 p-0">
											{members.length === 0 ? (
												<p className="text-white/30 text-xs">No members yet</p>
											) : (
												members.map((member) => (
													<li
														key={member.id}
														className="flex items-center justify-between 
                                                               bg-white/5 rounded-lg px-3 py-2"
													>
														<div className="flex items-center gap-2 min-w-0">
															{member.avatar_url ? (
																<img
																	src={member.avatar_url}
																	alt={member.name}
																	className="w-6 h-6 rounded-full shrink-0"
																/>
															) : (
																<div
																	className="w-6 h-6 rounded-full 
                                                                            bg-teal-600 flex items-center 
                                                                            justify-center text-white 
                                                                            text-xs shrink-0"
																>
																	{member.name?.charAt(0)}
																</div>
															)}
															<span className="text-white text-xs truncate">
																{member.name}
															</span>
														</div>
														<button
															onClick={() => removeMember(member.id)}
															className="text-white/30 hover:text-red-400 
                                                                   transition-colors bg-transparent 
                                                                   border-none cursor-pointer ml-2"
														>
															<Trash2 size={13} />
														</button>
													</li>
												))
											)}
										</ul>
									</div>

									{/* Add members */}
									<div>
										<p className="text-white/70 text-sm font-medium mb-2">
											Add Members
										</p>
										<ul className="space-y-1 list-none m-0 p-0">
											{nonMembers.length === 0 ? (
												<p className="text-white/30 text-xs">
													All users are members
												</p>
											) : (
												nonMembers.map((u) => (
													<li
														key={u.id}
														className="flex items-center justify-between 
                                                               bg-white/5 rounded-lg px-3 py-2"
													>
														<div className="flex items-center gap-2 min-w-0">
															{u.avatar_url ? (
																<img
																	src={u.avatar_url}
																	alt={u.name}
																	className="w-6 h-6 rounded-full shrink-0"
																/>
															) : (
																<div
																	className="w-6 h-6 rounded-full 
                                                                            bg-white/20 flex items-center 
                                                                            justify-center text-white 
                                                                            text-xs shrink-0"
																>
																	{u.name?.charAt(0)}
																</div>
															)}
															<span className="text-white text-xs truncate">
																{u.name}
															</span>
														</div>
														<button
															onClick={() => addMember(u.id)}
															className="text-white/30 hover:text-teal-400 
                                                                   transition-colors bg-transparent 
                                                                   border-none cursor-pointer ml-2"
														>
															<Plus size={13} />
														</button>
													</li>
												))
											)}
										</ul>
									</div>
								</div>
							)}
						</div>
					)}
                    {/* ── Access Tab ── */}
					{tab === "access" && (
						<div className="space-y-6">

							{/* Add email form */}
							<div className="bg-white/5 rounded-lg p-4 space-y-3">
								<p className="text-white/70 text-sm font-medium">
									Invite Someone
								</p>
								<p className="text-white/30 text-xs">
									Only emails on this list can log in, regardless of domain.
								</p>
								<div className="flex gap-2">
									<input
										type="email"
										placeholder="name@example.com"
										value={newEmail}
										onChange={e => setNewEmail(e.target.value)}
										onKeyDown={e => e.key === "Enter" && addInvited()}
										className="flex-1 bg-white/10 text-white text-sm 
                                               rounded-md px-3 py-2 outline-none 
                                               placeholder:text-white/30 border border-white/10
                                               focus:border-teal-400/50"
									/>
									<button
										onClick={addInvited}
										disabled={inviting || !newEmail.trim().includes("@")}
										className="flex items-center gap-1.5 bg-teal-500 
                                               hover:bg-teal-400 disabled:opacity-40
                                               text-white text-sm px-3 py-1.5 rounded-md
                                               transition-colors cursor-pointer border-none"
									>
										<Plus size={14} />
										{inviting ? "Adding..." : "Add"}
									</button>
								</div>
							</div>

							{/* Invited list */}
							<div>
								<div className="flex items-center justify-between mb-2">
									<p className="text-white/70 text-sm font-medium">
										Allowed Emails ({invitedEmails.length})
									</p>
									<button
										onClick={fetchInvited}
										className="text-white/30 hover:text-white 
                                               transition-colors bg-transparent 
                                               border-none cursor-pointer"
									>
										<RefreshCw size={13} />
									</button>
								</div>

								<ul className="space-y-1 list-none m-0 p-0">
									{invitedEmails.length === 0 ? (
										<p className="text-white/30 text-sm">No emails yet</p>
									) : invitedEmails.map(entry => (
										<li key={entry.email}
											className="flex items-center justify-between 
                                                       bg-white/5 rounded-lg px-3 py-2.5">
											<div className="min-w-0">
												<p className="text-white text-sm truncate">
													{entry.email}
												</p>
												<p className="text-white/30 text-xs mt-0.5">
													Added {new Date(entry.added_at).toLocaleDateString()}
												</p>
											</div>
											{entry.email !== user.email?.toLowerCase() ? (
												<button
													onClick={() => removeInvited(entry.email)}
													className="text-white/30 hover:text-red-400 
                                                               transition-colors bg-transparent 
                                                               border-none cursor-pointer ml-4 shrink-0"
													title="Remove access"
												>
													<Trash2 size={13} />
												</button>
											) : (
												<span className="text-white/20 text-xs ml-4 shrink-0">
													you
												</span>
											)}
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
                    
				</div>
			</div>
		</div>
	);
}
