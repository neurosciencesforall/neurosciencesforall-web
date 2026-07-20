import { Link } from "react-router-dom";
import {
	Heart,
	BookOpen,
	GraduationCap,
	Users,
	ArrowRight,
	Clock,
	MapPin,
	ChevronDown,
} from "lucide-react";
import { useState } from "react";
import somaImg from "../assets/team/soma-sahai-srivastava.jpeg";

const EVENTBRITE_URL =
	"https://www.eventbrite.com/e/neurosciences-for-all-an-evening-of-impact-tickets-1993761877446?aff=oddtdtcreator";

export default function HomePage() {
	const [newsletterEmail, setNewsletterEmail] = useState("");
	const [newsletterStatus, setNewsletterStatus] = useState("idle"); // idle | sending | success | error

	const handleNewsletterSubmit = async (e) => {
		e.preventDefault();
		setNewsletterStatus("sending");
		try {
			const res = await fetch(
				"https://chat-server-production-e62d.up.railway.app/api/newsletter",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: newsletterEmail }),
				},
			);
			if (!res.ok) throw new Error("Request failed");
			setNewsletterStatus("success");
			setNewsletterEmail("");
		} catch (err) {
			setNewsletterStatus("error");
		}
	};

	return (
		<main className="pt-[90px]">
			{/* Hero */}
			<div className="relative min-h-[65vh] flex items-center justify-center text-center overflow-hidden">
				<img
					src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&auto=format&fit=crop"
					alt="Neural Network"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-navy/70" />
				<div className="relative z-10 max-w-3xl mx-auto px-6">
					<h1 className="font-heading text-white text-4xl md:text-6xl font-bold mb-6 leading-tight">
						Transforming Lives Through Neuroscience Education
					</h1>
					<p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed">
						Advancing neurosciences through rigorous, innovative education —
						from foundational study to specialized clinical practice.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							to="/donate"
							className="flex items-center justify-center gap-2 bg-teal text-white px-8 py-4 rounded-full font-semibold no-underline
                hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
						>
							Support Our Research
							<Heart size={20} />
						</Link>
						<Link
							to="/resources"
							className="flex items-center justify-center gap-2 bg-white/10 border-2 border-white text-white px-8 py-4 rounded-full font-semibold no-underline
                hover:bg-white hover:text-navy transition-all duration-300"
						>
							Find Resources
							<BookOpen size={20} />
						</Link>
					</div>
					<ChevronDown
						size={24}
						className="text-white/70 mx-auto mt-10 animate-bounce"
					/>
				</div>
			</div>

			{/* Upcoming Fundraiser */}
			<div className="py-20 bg-[#F0F9FF]">
				<div className="max-w-[1400px] mx-auto px-[5%] flex justify-center">
					<div className="bg-white rounded-2xl border border-teal/30 shadow-xl hover:shadow-2xl p-10 md:p-12 max-w-xl w-full text-center hover:scale-[1.02] transition-all duration-300">
						<div className="flex items-center justify-center gap-3 mb-5">
							<div className="h-[2px] w-7 bg-teal" />
							<span className="text-teal text-xs font-semibold uppercase tracking-widest">
								Upcoming Fundraiser
							</span>
							<div className="h-[2px] w-7 bg-teal" />
						</div>
						<h2 className="font-heading text-[#C8930A] text-3xl md:text-3xl font-bold mb-4">
							An Evening of Impact
						</h2>
						<div className="flex items-center justify-center gap-6 mb-5 flex-wrap">
							<span className="flex items-center gap-2 text-slate-800 text-sm font-medium">
								<Clock size={16} className="text-teal" />
								August 8, 2026
							</span>
							<span className="flex items-center gap-2 text-slate-800 text-sm font-medium">
								<MapPin size={16} className="text-teal" />
								DerWolf Pasadena, CA
							</span>
						</div>
						<p className="text-gray-500 leading-relaxed max-w-md mx-auto mb-8 text-xl">
							Join us for cocktails, dinner, and a program to support
							neuroscience education in Cambodia.
						</p>
						<a
							href={EVENTBRITE_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block bg-navy text-white px-8 py-3 rounded-full font-semibold no-underline
            hover:scale-105 hover:shadow-lg transition-all duration-300"
						>
							Learn More
						</a>
					</div>
				</div>
			</div>

			{/* Mission */}
			<div className="py-20 bg-white">
				<div className="max-w-[1400px] mx-auto px-[5%]">
					<div className="text-center mb-14">
						<h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
							Our Mission
						</h2>
						<p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
							To advance the frontiers of neuroscience through rigorous,
							innovative education that empowers the next generation of medical
							professionals.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
						{[
							{
								icon: <GraduationCap size={40} />,
								title: "Education & Awareness",
								desc: "Providing resources for students and healthcare professionals",
							},
							{
								icon: <Users size={40} />,
								title: "Community Support",
								desc: "Empowering individuals through community, resources, and access to cutting-edge care",
							},
						].map(({ icon, title, desc }) => (
							<div
								key={title}
								className="bg-[#F0F9FF] rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform duration-300"
							>
								<div className="w-20 h-20 bg-gradient-to-br from-navy to-teal rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
									{icon}
								</div>
								<h3 className="font-heading text-navy text-xl font-bold mb-3">
									{title}
								</h3>
								<p className="text-gray-500 leading-relaxed">{desc}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* ── Founder's Video Message ── */}
			<div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
				<div className="max-w-[1400px] mx-auto px-[5%]">
					{/* Section label */}
					<div className="flex items-center gap-3 mb-10">
						<div className="h-[2px] w-10 bg-teal" />
						<span className="text-teal text-sm font-semibold uppercase tracking-widest">
							A Message From Our Founder
						</span>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Video player */}
						{/* <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-navy aspect-video">
							<video
								controls
								preload="metadata"
								poster={somaImg}
								className="w-full h-full object-cover"
							>
								<source
									src="/videos/founder-message-web.mp4"
									type="video/mp4"
								/>
								Your browser does not support the video tag.
							</video>
						</div> */}

						<div className="relative rounded-2xl overflow-hidden shadow-2xl bg-navy aspect-video">
							<iframe
								src="https://www.youtube.com/embed/z4YKQbi9tbI"
								title="A Message from Our Founder — NeuroSciences For All"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="w-full h-full"
							/>
						</div>

						{/* Quote + attribution */}
						<div className="flex flex-col justify-center">
							{/* Decorative quote mark */}
							<span className="font-heading text-[6rem] leading-none text-teal/20 select-none mb-2">
								"
							</span>
							<blockquote className="font-heading text-2xl lg:text-3xl text-navy font-semibold leading-snug mb-6 -mt-8">
								World-class neuroscience education should be within reach of
								every learner — regardless of geography, background, or
								resources.
							</blockquote>
							<p className="text-gray-500 text-base leading-relaxed mb-8">
								Watch Dr. Sahai-Srivastava share her vision for NeuroSciences
								For All — why she founded it, who it serves, and where it's
								headed.
							</p>

							{/* Attribution */}
							<div className="flex items-center gap-4 pt-6 border-t border-gray-200">
								<img
									src={somaImg}
									alt="Dr. Soma Sahai-Srivastava"
									className="w-14 h-14 rounded-full object-cover border-2 border-gold shadow"
								/>
								<div>
									<p className="font-semibold text-navy text-[0.95rem]">
										Soma Sahai-Srivastava, MD
									</p>
									<p className="text-teal text-sm">Founder & CEO</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Featured Resources */}
			<div className="py-20 bg-[#ECFEFF]">
				<div className="max-w-[1400px] mx-auto px-[5%]">
					<div className="text-center mb-14">
						<h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
							Featured Resources
						</h2>
						<p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
							Medical students explore basic and clinical neurosciences through
							a highly interactive curriculum. By prioritizing innovative,
							peer-based learning, trainees bridge the gap between science and
							practice together.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{
								img: "https://images.unsplash.com/photo-1738707060236-42d641096f96?w=900&auto=format&fit=crop",
								alt: "Brain Scan",
								title: "Foundations",
								desc: "Undergraduate students explore core neuroscience principles through collaborative peer-based learning, transforming basic science into active problem-solving.",
							},
							{
								img: "https://images.unsplash.com/photo-1758691463110-697a814b2033?w=900&auto=format&fit=crop",
								alt: "Neural Pathways",
								title: "Advanced Studies",
								desc: "Residents and physicians master complex diagnostic reasoning through peer-to-peer case mentorship, specialized clinical training, and evidence-based neuroscience.",
							},
							{
								img: "https://images.unsplash.com/photo-1758691462668-046fd85ceac9?w=900&auto=format&fit=crop",
								alt: "Data Analysis",
								title: "Specialized Training",
								desc: "Empowering providers with targeted training in neurocritical care, stroke, and epilepsy, alongside hands-on mastery of specialized diagnostic tests like EEG and EMG.",
							},
						].map(({ img, alt, title, desc }) => (
							<div
								key={title}
								className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
							>
								<img src={img} alt={alt} className="w-full h-48 object-cover" />
								<div className="p-6">
									<h3 className="font-heading text-navy text-xl font-bold mb-3">
										{title}
									</h3>
									<p className="text-gray-500 leading-relaxed mb-4">{desc}</p>
									<Link
										to="/resources"
										className="flex items-center gap-2 text-teal font-semibold no-underline hover:gap-3 transition-all duration-200"
									>
										Learn More <ArrowRight size={18} />
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Our Partners */}
			{(() => {
				const partners = [
					{
						org: "Neurotech, LLC & The Neurotech Foundation",
						contact: "Keith Morgan MSGH, MBA, R.EEG T.",
						title: "Founder & CEO",
						description:
							"A leader in EEG care since 2006, Neurotech has spent two decades advancing neurological diagnostics and education. The Neurotech Foundation extends this mission through global health initiatives, bringing specialized neurology education to underserved communities worldwide.",
						initiative: {
							label: "Featured Initiative",
							title: "Management of Drug-Resistant Epilepsy",
							subtitle: "International seminar · In person & online",
							link: "https://link.edgepilot.com/x/jXzguiiK4L5lB3SNZACR-v3V?u=https://welcome.uoc.gr/2026/03/12/management-of-drug-resistant-epilepsy/",
						},
					},
				];
				return (
					<div className="py-20 bg-white">
						<div className="max-w-[1400px] mx-auto px-[5%]">
							<div className="text-center mb-14">
								<h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
									Our Partners
								</h2>
								<p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
									Organizations we collaborate with to advance neuroscience
									education and care worldwide.
								</p>
							</div>
							<div className="flex flex-col gap-6 max-w-4xl mx-auto">
								{partners.map(
									({ org, contact, title, description, initiative }) => (
										<div
											key={org}
											className="bg-[#F0F9FF] rounded-2xl p-8 flex flex-col md:flex-row gap-8
										           hover:shadow-lg transition-all duration-300
										           border border-transparent hover:border-teal/20"
										>
											{/* Left — org info */}
											<div className="flex flex-col gap-3 md:w-1/2">
												<div>
													<h3 className="font-heading text-navy text-xl font-bold mb-1 leading-snug">
														{org}
													</h3>
													<p className="text-teal text-sm font-semibold">
														{contact}
													</p>
													<p className="text-gray-400 text-xs font-medium mt-0.5">
														{title}
													</p>
												</div>
												<p className="text-gray-500 leading-relaxed text-sm">
													{description}
												</p>
											</div>

											{/* Divider */}
											<div className="hidden md:block w-px bg-gray-200 self-stretch" />

											{/* Right — featured initiative */}
											<div className="md:w-1/2 flex flex-col justify-center">
												<p
													className="text-[10px] font-semibold tracking-[0.2em] uppercase
											              text-teal mb-3"
												>
													{initiative.label}
												</p>
												<div className="bg-white rounded-xl p-5 border border-teal/20 shadow-sm">
													<h4 className="font-heading text-navy text-base font-bold leading-snug mb-1">
														{initiative.title}
													</h4>
													<p className="text-gray-400 text-xs mb-4">
														{initiative.subtitle}
													</p>
													<a
														href={initiative.link}
														target="_blank"
														rel="noopener noreferrer"
														className="inline-flex items-center gap-2 bg-navy text-white
													           text-xs font-semibold px-4 py-2 rounded-full no-underline
													           hover:bg-teal transition-colors duration-200"
													>
														Learn More <ArrowRight size={13} />
													</a>
												</div>
											</div>
										</div>
									),
								)}
							</div>
						</div>
					</div>
				);
			})()}

			{/* Newsletter */}
			<div className="py-20 bg-white">
				<div className="max-w-[1400px] mx-auto px-[5%]">
					<div className="bg-gradient-to-br from-navy to-teal rounded-3xl p-12 text-center text-white">
						<h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
							Stay Connected
						</h2>
						<p className="text-white/90 text-lg mb-8">
							Get the latest research updates, resources, and events delivered
							to your inbox
						</p>
						<form
							className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
							onSubmit={handleNewsletterSubmit}
						>
							<input
								type="email"
								name="newsletterEmail"
								placeholder="Enter your email address"
								required
								value={newsletterEmail}
								onChange={(e) => setNewsletterEmail(e.target.value)}
								disabled={newsletterStatus === "sending"}
								className="flex-1 px-5 py-3 rounded-full text-gray-800 bg-white outline-none border-none text-base shadow-sm focus:ring-2 focus:ring-gold disabled:opacity-50"
							/>
							<button
								type="submit"
								disabled={newsletterStatus === "sending"}
								className="bg-gold text-white px-8 py-3 rounded-full font-semibold
      hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 border-none cursor-pointer
      disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{newsletterStatus === "sending"
									? "Subscribing..."
									: "Subscribe"}
							</button>
						</form>
						{newsletterStatus === "success" && (
							<p className="text-white text-center mt-4 font-medium">
								You're subscribed. Thanks for joining us.
							</p>
						)}
						{newsletterStatus === "error" && (
							<p className="text-white text-center mt-4 font-medium">
								Something went wrong. Please try again.
							</p>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
