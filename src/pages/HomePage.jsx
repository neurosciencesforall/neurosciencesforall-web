import { Link } from "react-router-dom";
import {
	Heart,
	BookOpen,
	GraduationCap,
	Users,
	ArrowRight,
} from "lucide-react";

export default function HomePage() {
	return (
		<main className="pt-[90px]">
			{/* Hero */}
			<div className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
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
						<div className="relative rounded-2xl overflow-hidden shadow-2xl bg-navy aspect-video">
							<video
								controls
								preload="metadata"
								poster="/images/soma-sahai-srivastava.jpeg"
								className="w-full h-full object-cover"
							>
								<source
									src="/videos/founder-message-web.mp4"
									type="video/mp4"
								/>
								Your browser does not support the video tag.
							</video>
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
									src="/images/soma-sahai-srivastava.jpeg"
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

			{/* Testimonials */}
			<div className="py-20 bg-white">
				<div className="max-w-[1400px] mx-auto px-[5%]">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
						<div>
							<img
								src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop"
								alt="Patient Care"
								className="w-full rounded-2xl shadow-xl"
							/>
						</div>
						<div>
							<h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-8">
								Testimonials
							</h2>
							<div className="space-y-8">
								<div>
									<p className="text-gray-500 text-lg leading-relaxed mb-3 italic">
										"As a second-year pre-med student, I struggled to connect
										textbook neuroscience to real clinical scenarios. The
										foundation's peer-based learning resources gave me a
										structured way to work through complex concepts alongside
										peers who challenged my thinking. It completely changed how
										I approach problem solving in my coursework."
									</p>
									<p className="font-semibold text-teal">
										— J. M., Undergraduate Neuroscience Student
									</p>
								</div>
								<div>
									<p className="text-gray-500 text-lg leading-relaxed mb-3 italic">
										"During my residency, I needed resources that kept pace with
										the demands of clinical training. The foundation's
										graduate-level content bridged the gap between what I
										learned in school and what I was seeing in patients every
										day. The peer collaboration framework was particularly
										invaluable during my neurology rotations."
									</p>
									<p className="font-semibold text-teal">
										— Dr. Peter S., Neurology Resident
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

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
							onSubmit={(e) => e.preventDefault()}
						>
							<input
								type="email"
								placeholder="Enter your email address"
								required
								className="flex-1 px-5 py-3 rounded-full text-gray-800 outline-none border-none text-base"
							/>
							<button
								type="submit"
								className="bg-gold text-white px-8 py-3 rounded-full font-semibold
                  hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 border-none cursor-pointer"
							>
								Subscribe
							</button>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
