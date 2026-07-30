import { Link } from "react-router-dom";
import { GraduationCap, Stethoscope, Activity, Mail, Lock } from "lucide-react";
import { newsletters } from "../data/newletters";

const categories = [
	{
		slug: "students",
		icon: <GraduationCap size={24} className="text-white" />,
		title: "Students",
		desc: "Foundational neuroscience lectures",
	},
	{
		slug: "residents",
		icon: <Stethoscope size={24} className="text-white" />,
		title: "Residents",
		desc: "Clinical case-based lectures",
	},
	{
		slug: "emg",
		icon: <Activity size={24} className="text-white" />,
		title: "EMG Resources",
		desc: "EEG and neurophysiology diagnostics",
	},
];

export default function ResourcesPage() {
	return (
		<main className="pt-[90px]">
			<div className="py-20 bg-white">
				<div className="max-w-[1400px] mx-auto px-[5%]">
					{/* Header */}
					<div className="text-center mb-14">
						<p className="text-gold text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">
							Resources
						</p>
						<h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
							Lecture Library
						</h2>
						<p className="text-gray-500 text-lg max-w-xl mx-auto">
							Curated video lectures organized by learner level, open to
							everyone.
						</p>
					</div>

					{/* Category cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
						{categories.map(({ slug, icon, title, desc }) => (
							<Link
								key={slug}
								to={`/resources/${slug}`}
								className="bg-[#F0F9FF] rounded-2xl p-8 text-center no-underline
                           hover:-translate-y-1 transition-transform duration-300"
							>
								<div
									className="w-16 h-16 bg-gradient-to-br from-navy to-teal rounded-2xl
                                 flex items-center justify-center mx-auto mb-5"
								>
									{icon}
								</div>
								<h3 className="font-heading text-navy text-xl font-bold mb-2">
									{title}
								</h3>
								<p className="text-gray-500 leading-relaxed mb-5">{desc}</p>
								<span className="inline-block text-teal font-semibold">
									Browse lectures
								</span>
							</Link>
						))}
					</div>

					{/* Members-only teaser */}
					<div
						className="max-w-3xl mx-auto rounded-2xl overflow-hidden mb-16"
						style={{ background: "#0f2158" }}
					>
						<div className="h-1 w-full bg-gradient-to-r from-[#1E3A8A] via-[#0891B2] to-[#C8930A]" />
						<div className="px-10 py-10 text-center">
							<p className="text-white/40 text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">
								Members Only
							</p>
							<h3 className="font-heading text-white text-xl font-bold mb-3">
								Member-exclusive lectures and case discussions
							</h3>
							<p className="text-white/65 mb-6">
								Sign in or request membership to access additional content.
							</p>
							<Link
								to="/login"
								className="inline-flex items-center gap-2 bg-[#C8930A] text-white px-8 py-3
                 rounded-full font-semibold no-underline hover:bg-[#b3830a]
                 transition-colors duration-200"
							>
								<Lock size={18} />
								Sign in / Request Access
							</Link>
						</div>
					</div>

					{/* Newsletter archive */}
					<div className="mb-20 max-w-3xl mx-auto">
						<span className="inline-block bg-[#C8930A] text-white text-base font-semibold tracking-wide uppercase px-4 py-1 rounded-full mb-4">
							Newsletter Archive
						</span>
						<p className="text-gray-500 mb-6">
							Past issues sent to our subscriber list.
						</p>

						{newsletters.length === 0 ? (
							<div className="bg-[#FDF6E7] border border-[#C8930A]/20 rounded-2xl p-8 text-center text-[#8a6607]">
								Newsletter archive coming soon.
							</div>
						) : (
							<div className="flex flex-col gap-3">
								{newsletters.map(({ title, date, url }) => (
									<a
										key={url}
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-between border border-gray-100 rounded-xl px-5 py-4 no-underline hover:shadow-md transition-shadow duration-300 bg-white"
									>
										<span className="flex items-center gap-3 text-navy font-medium">
											<Mail size={18} className="text-teal" />
											{title}
										</span>
										<span className="text-gray-400 text-sm">
											{new Date(date).toLocaleDateString("en-US", {
												month: "long",
												year: "numeric",
											})}
										</span>
									</a>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
