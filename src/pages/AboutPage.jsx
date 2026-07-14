import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Users, Lightbulb, X } from "lucide-react";
import { team } from "../data/team";

// ── Bio Modal ─────────────────────────────────────────────
function BioModal({ person, onClose }) {
	return (
		<div
			className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 sm:px-6"
			onClick={(e) => e.target === e.currentTarget && onClose()}
		>
			<div className="bg-white w-full rounded-2xl max-w-lg sm:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
				{/* Top accent bar */}
				<div className="h-1 w-full bg-gradient-to-r from-[#1E3A8A] via-[#0891B2] to-[#F59E0B] shrink-0" />

				{/* Header */}
				<div className="flex items-center gap-5 px-8 py-6 border-b border-gray-100 shrink-0">
					<div className="relative shrink-0">
						<img
							src={person.image}
							alt={person.name}
							className="relative w-20 h-20 rounded-full object-cover object-top"
							style={{ boxShadow: "0 0 0 3px #F59E0B" }}
						/>
					</div>
					<div className="min-w-0 flex-1">
						<p className="text-[11px] font-semibold tracking-[0.2em] text-[#F59E0B] uppercase mb-1">
							{person.tier === "leadership" ? "Leadership" : "Team Member"}
						</p>
						<h3 className="font-heading text-[#1E3A8A] text-xl font-bold leading-tight">
							{person.name}
						</h3>
						<p className="text-[#0891B2] text-sm font-medium mt-0.5">
							{person.role}
						</p>
					</div>
					<button
						onClick={onClose}
						className="ml-auto text-gray-300 hover:text-gray-600 transition-colors
                       bg-transparent border-none cursor-pointer shrink-0 p-2 rounded-full
                       hover:bg-gray-100"
					>
						<X size={18} />
					</button>
				</div>

				{/* Bio */}
				<div className="overflow-y-auto px-8 py-6">
					<p className="text-gray-600 leading-[1.85] text-[0.95rem] font-light">
						{person.fullBio}
					</p>
				</div>

				{/* Footer */}
				<div className="px-8 py-4 border-t border-gray-100 shrink-0">
					<button
						onClick={onClose}
						className="text-sm text-gray-400 hover:text-[#1E3A8A] transition-colors
                       bg-transparent border-none cursor-pointer p-0 font-medium"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}

// ── Leadership Card (circular, on dark bg) ────────────────
function LeaderCard({ person, featured = false, onBioClick }) {
	const [hovered, setHovered] = useState(false);

	return (
		<>
			<div
				className="relative flex flex-col items-center text-center group cursor-pointer"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={() => setHovered(true)}
			>
				{/* Photo circle */}
				<div
					className={`relative mb-5 ${featured ? "w-44 h-44" : "w-36 h-36"}`}
				>
					{/* Gradient ring */}
					<div
						className={`absolute inset-0 rounded-full transition-all duration-500
                        ${hovered ? "p-[3px] scale-105" : "p-[2px]"}`}
						style={{
							background: hovered
								? "linear-gradient(135deg, #F59E0B, #0891B2, #1E3A8A)"
								: "linear-gradient(135deg, #F59E0B, #0891B2aa)",
						}}
					>
						<div className="w-full h-full rounded-full bg-[#0f2158]" />
					</div>

					{/* Photo */}
					<img
						src={person.image}
						alt={person.name}
						className="absolute inset-[3px] w-[calc(100%-6px)] h-[calc(100%-6px)]
                       rounded-full object-cover object-top transition-all duration-500
                       group-hover:brightness-50"
					/>

					{/* Hover overlay — Full Bio button */}
					<div
						className={`absolute inset-[3px] rounded-full flex items-center justify-center
                        transition-opacity duration-300
                        ${hovered ? "opacity-100" : "opacity-0"}`}
					>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onBioClick(person);
								setHovered(false);
							}}
							className="text-[11px] font-semibold text-white border border-white/70
                         rounded-full px-3 py-1.5 hover:bg-white hover:text-[#1E3A8A]
                         transition-all duration-200 bg-transparent cursor-pointer
                         tracking-wider uppercase"
						>
							Full Bio
						</button>
					</div>
				</div>

				{/* Name & role */}
				<div className="px-2">
					<h3
						className={`font-heading text-white font-bold leading-tight mb-1
                         ${featured ? "text-[1.05rem]" : "text-[0.9rem]"}`}
					>
						{person.name}
					</h3>
					<p
						className={`text-[#F59E0B] font-medium tracking-wide
                        ${featured ? "text-[0.8rem]" : "text-[0.72rem]"}`}
					>
						{person.role}
					</p>

					{/* Short bio — slides in on hover */}
					{/* <div
            className={`overflow-hidden transition-all duration-400 ease-in-out
                        ${hovered ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}
          >
            <p className="text-white/55 text-[0.72rem] leading-relaxed max-w-[180px] mx-auto">
              {person.shortBio}
            </p>
          </div> */}
				</div>
				{/* Short bio — floating popup, does not affect layout */}
				<div
					className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 z-20
                     bg-[#0f2158] border border-white/10 rounded-xl px-4 py-3 shadow-xl
                     pointer-events-none transition-all duration-300 ease-out
                     ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
				>
					<p className="text-white/70 text-[0.72rem] leading-relaxed text-center">
						{person.shortBio}
					</p>
				</div>
			</div>
		</>
	);
}

// ── Team Member Card (smaller, on frosted card) ───────────
function TeamCard({ person, onBioClick }) {
	const [hovered, setHovered] = useState(false);

	return (
		<>
			<div
				className="relative flex flex-col items-center text-center group cursor-pointer"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={() => setHovered(true)}
			>
				{/* Photo circle */}
				<div className="relative w-28 h-28 mb-4">
					<div
						className={`absolute inset-0 rounded-full transition-all duration-500
                        ${hovered ? "p-[3px] scale-105" : "p-[1.5px]"}`}
						style={{
							background: hovered
								? "linear-gradient(135deg, #F59E0B, #0891B2)"
								: "linear-gradient(135deg, #0891B2aa, #1E3A8A66)",
						}}
					>
						<div className="w-full h-full rounded-full bg-[#0f2158]" />
					</div>

					<img
						src={person.image}
						alt={person.name}
						className="absolute inset-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)]
                       rounded-full object-cover object-top transition-all duration-500
                       group-hover:brightness-50"
					/>

					<div
						className={`absolute inset-[2px] rounded-full flex items-center justify-center
                        transition-opacity duration-300
                        ${hovered ? "opacity-100" : "opacity-0"}`}
					>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onBioClick(person);
								setHovered(false);
							}}
							className="text-[10px] font-semibold text-white border border-white/60
                         rounded-full px-2.5 py-1 hover:bg-white hover:text-[#1E3A8A]
                         transition-all duration-200 bg-transparent cursor-pointer
                         tracking-wider uppercase"
						>
							Bio
						</button>
					</div>
				</div>

				<h3 className="font-heading text-white text-[0.85rem] font-bold leading-tight mb-0.5">
					{person.name}
				</h3>
				<p className="text-[#0891B2] text-[0.7rem] font-medium leading-snug max-w-[150px]">
					{person.role}
				</p>
				{/* Short bio — floating popup, does not affect layout */}
				<div
					className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 z-20
                    bg-[#0f2158] border border-white/10 rounded-xl px-4 py-3 shadow-xl
                     pointer-events-none transition-all duration-300 ease-out
                     ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
				>
					<p className="text-white/70 text-[0.7rem] leading-relaxed text-center">
						{person.shortBio}
					</p>
				</div>
			</div>
		</>
	);
}

// ── About Page ────────────────────────────────────────────
export default function AboutPage() {
	const leadership = team.filter((p) => p.tier === "leadership");
	const members = team.filter((p) => p.tier === "team");
	const [featured, ...rest] = leadership;
	const [selectedPerson, setSelectedPerson] = useState(null);

	return (
		<main className="pt-[90px]">
			{/* Single modal — only one can be open at a time */}
			{selectedPerson && (
				<BioModal
					person={selectedPerson}
					onClose={() => setSelectedPerson(null)}
				/>
			)}

			{/* Vision */}
			<div className="py-20 bg-white">
				<div className="max-w-[1400px] mx-auto px-[5%]">
					<div className="text-center mb-14">
						<h2 className="font-heading text-[#1E3A8A] text-3xl md:text-5xl font-bold mb-4">
							About NeuroSciences For All
						</h2>
						<p className="text-gray-500 text-lg">
							Dedicated to advancing neuroscience through innovative educational
							tools
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="font-heading text-[#1E3A8A] text-3xl md:text-4xl font-bold mb-6">
								Our Vision
							</h2>
							<p className="font-bold text-gray-800 mb-4">
								Universal access to neuroscience education, regardless of
								geography.
							</p>
							<p className="text-gray-500 leading-relaxed mb-8">
								NeuroSciences For All was founded on a simple but powerful
								belief — that world-class neuroscience education should be
								within reach of every learner. Through cutting-edge tools and
								innovative methodologies, we bridge the gap between foundational
								study and specialized clinical expertise, empowering medical
								students and professionals at every stage of their journey.
							</p>
							<Link
								to="/contact"
								className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-8 py-4
                           rounded-full font-semibold no-underline hover:-translate-y-1
                           hover:bg-[#0891B2] transition-all duration-300 shadow-lg"
							>
								Get In Touch
								<Mail size={20} />
							</Link>
						</div>
						<div>
							<img
								src="https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?w=900&auto=format&fit=crop"
								alt="Research Team"
								className="w-full rounded-2xl shadow-xl"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* ── Leadership — deep navy section ── */}
			<div
				className="py-24 pb-28 relative overflow-hidden"
				style={{
					background:
						"linear-gradient(135deg, #0a1535 0%, #1E3A8A 60%, #0d1f4a 100%)",
				}}
			>
				{/* Dot grid texture */}
				<div
					className="absolute inset-0 opacity-[0.035]"
					style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
						backgroundSize: "36px 36px",
					}}
				/>
				{/* Decorative circles */}
				<div
					className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.07]"
					style={{ border: "80px solid #F59E0B" }}
				/>
				<div
					className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-[0.05]"
					style={{ border: "50px solid #0891B2" }}
				/>

				<div className="max-w-[1400px] mx-auto px-[5%] relative">
					{/* Heading */}
					<div className="text-center mb-16">
						<p className="text-[#F59E0B] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
							The People Behind The Mission
						</p>
						<h2 className="font-heading text-white text-3xl md:text-5xl font-bold">
							Leadership Team
						</h2>
						<div className="w-16 h-[2px] bg-gradient-to-r from-[#F59E0B] to-[#0891B2] mx-auto mt-5" />
					</div>

					{/* Leadership row */}
					<div className="flex flex-wrap justify-center items-start gap-x-14 gap-y-12 mb-20">
						<LeaderCard
							person={featured}
							featured={false}
							onBioClick={setSelectedPerson}
						/>
						{rest.map((person) => (
							<LeaderCard
								key={person.name}
								person={person}
								onBioClick={setSelectedPerson}
							/>
						))}
					</div>

					{/* Team members divider */}
					<div className="flex items-center gap-5 mb-14 max-w-sm mx-auto">
						<div className="flex-1 h-px bg-white/10" />
						<p className="text-white/30 text-[10px] font-semibold tracking-[0.3em] uppercase shrink-0">
							Team Members
						</p>
						<div className="flex-1 h-px bg-white/10" />
					</div>

					{/* Team members */}
					<div className="flex flex-wrap justify-center gap-20">
						{members.map((person) => (
							<div
								key={person.name}
								className="bg-white/[0.06] backdrop-blur-sm rounded-2xl px-7 py-8
                           border border-white/[0.08] hover:bg-white/[0.10] 
                           hover:border-white/20 transition-all duration-300"
							>
								<TeamCard person={person} onBioClick={setSelectedPerson} />
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Core Values */}
			<div className="py-20 bg-white">
				<div className="max-w-[1400px] mx-auto px-[5%]">
					<div className="text-center mb-14">
						<h2 className="font-heading text-[#1E3A8A] text-3xl md:text-5xl font-bold mb-4">
							Our Core Values
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
						{[
							{
								icon: <Users size={40} />,
								title: "Accessibility",
								desc: "Making neuroscience education and resources available to medical professionals worldwide.",
							},
							{
								icon: <Lightbulb size={40} />,
								title: "Educational Innovation",
								desc: "Embracing cutting-edge educational tools and approaches to advance understanding.",
							},
						].map(({ icon, title, desc }) => (
							<div
								key={title}
								className="bg-[#F0F9FF] rounded-2xl p-8 text-center
                           hover:-translate-y-1 transition-transform duration-300"
							>
								<div
									className="w-20 h-20 bg-gradient-to-br from-[#1E3A8A] to-[#0891B2]
                                rounded-2xl flex items-center justify-center text-white mx-auto mb-6"
								>
									{icon}
								</div>
								<h3 className="font-heading text-[#1E3A8A] text-xl font-bold mb-3">
									{title}
								</h3>
								<p className="text-gray-500 leading-relaxed">{desc}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
