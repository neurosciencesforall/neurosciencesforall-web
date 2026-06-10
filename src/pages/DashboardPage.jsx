import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
	BookOpen,
	Video,
	MessageSquare,
	FileText,
	Calendar,
	LayoutDashboard,
} from "lucide-react";

const QUICK_LINKS = [
	{
		icon: BookOpen,
		label: "Resources",
		desc: "Papers, tools & learning materials",
		to: "/resources",
		accent: "teal",
		shadow: "rgba(8,145,178,0.15)",
	},
	{
		icon: Calendar,
		label: "Events",
		desc: "Upcoming talks & workshops",
		to: "/events",
		accent: "gold",
		shadow: "rgba(245,158,11,0.15)",
	},
    {
        icon: MessageSquare,  // ← already imported!
        label: "Community",
        desc: "Slack-like chat with fellow members",
        to: "/community",
        accent: "teal",
        shadow: "rgba(8,145,178,0.15)",
    },
];

const COMING_SOON = [
	{
		icon: FileText,
		label: "Blog",
		desc: "Member-only articles & research breakdowns",
	},
	{
		icon: Video,
		label: "Video Library",
		desc: "Lectures, seminars & explainer content",
	},
];

export default function DashboardPage() {
	const { user } = useAuth();

	return (
		<main className="min-h-screen bg-gray-50 pt-28 pb-16 px-4">
			<div className="max-w-5xl mx-auto">
				{/* Header */}
				<div className="flex items-center gap-4 mb-12">
					<img
						src={user.picture}
						alt={user.name}
						className="w-16 h-16 rounded-full border-4 border-gold shadow-md object-cover shrink-0"
					/>
					<div>
						<div className="flex items-center gap-2 mb-1">
							<LayoutDashboard size={18} className="text-teal" />
							<span className="text-sm font-medium text-teal uppercase tracking-widest">
								Dashboard
							</span>
						</div>
						<h1 className="font-heading text-3xl font-bold text-navy leading-tight">
							Welcome, {user.name.split(" ")[0]}
						</h1>
						<p className="text-gray-400 text-sm mt-0.5">{user.email}</p>
					</div>
				</div>

				{/* Quick Links */}
				<h2 className="font-heading text-xl font-bold text-navy mb-4">
					Quick Access
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
					{QUICK_LINKS.map(({ icon: Icon, label, desc, to, shadow }) => (
						<Link
							key={to}
							to={to}
							className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5
                         hover:border-teal hover:shadow-lg transition-all duration-300 group no-underline"
							style={{ "--hover-shadow": shadow }}
						>
							<div className="bg-gray-50 group-hover:bg-teal/10 rounded-lg p-3 transition-colors duration-300">
								<Icon size={22} className="text-teal" />
							</div>
							<div>
								<p className="font-semibold text-navy text-[0.95rem]">
									{label}
								</p>
								<p className="text-sm text-gray-400 mt-0.5">{desc}</p>
							</div>
						</Link>
					))}
				</div>

				{/* Coming Soon */}
				<h2 className="font-heading text-xl font-bold text-navy mb-4">
					Coming Soon
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					{COMING_SOON.map(({ icon: Icon, label, desc }) => (
						<div
							key={label}
							className="relative bg-white border border-dashed border-gray-300 rounded-xl p-5 opacity-60"
						>
							<span
								className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest
                               bg-gold/20 text-gold px-2 py-0.5 rounded-full"
							>
								Soon
							</span>
							<Icon size={22} className="text-gray-400 mb-3" />
							<p className="font-semibold text-gray-600 text-[0.95rem]">
								{label}
							</p>
							<p className="text-sm text-gray-400 mt-1">{desc}</p>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
