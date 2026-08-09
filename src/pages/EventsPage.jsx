import { MapPin, Clock, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { news } from "../data/news";
import eventPhoto1 from "../assets/events/evening-of-impact-1.jpg";
import eventPhoto2 from "../assets/events/evening-of-impact-2.jpg";
import eventPhoto3 from "../assets/events/evening-of-impact-3.jpg";
import eventPhoto4 from "../assets/events/evening-of-impact-4.jpeg";
import workshopPhoto from "../assets/gallery/IMG_5565.jpeg";

export default function EventsPage() {
	const events = [
		{
			date: "NOV 30 – DEC 4, 2026",
			title: "Neuroscience Bootcamp for Medical Students",
			desc: "Join leading neuroscientists for a full day of interactive learning sessions.",
			location: "Phnom Penh, Cambodia",
			time: "8:00 AM – 12:00 PM",
		},
		{
			date: "NOV 30 – DEC 4, 2026",
			title: "EMG Bootcamp",
			desc: "Join the EMG bootcamp training.",
			location: "Phnom Penh, Cambodia",
			time: "8:00 AM – 5:00 PM",
		},
		{
			date: "NOV 30 – DEC 4, 2026",
			title: "Neurology Resident Education",
			desc: "Clinical, comprehensive education on treatment of neurological disorders.",
			location: "Phnom Penh, Cambodia",
			time: "1:00 PM – 5:00 PM",
		},
	];

	return (
		<main className="pt-[90px]">
			{/* Past Events */}
			<div className="py-12 bg-[#F0F9FF]">
				<div className="max-w-[1400px] mx-auto px-[5%]">
					<div className="flex items-center gap-3 mb-6">
						<div className="h-[2px] w-10 bg-teal" />
						<span className="text-teal text-sm font-semibold uppercase tracking-widest">
							Past Events
						</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
						<div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden max-w-md mx-auto md:mx-0">
							<img
								src={eventPhoto1}
								alt="Guests connecting at An Evening of Impact"
								className="w-full h-32 sm:h-40 object-cover rounded-xl"
							/>
							<img
								src={eventPhoto2}
								alt="Guests at An Evening of Impact"
								className="w-full h-32 sm:h-40 object-cover rounded-xl"
							/>
							<img
								src={eventPhoto3}
								alt="NFA team at An Evening of Impact"
								className="w-full h-32 sm:h-40 object-cover rounded-xl"
							/>
							<img
								src={eventPhoto4}
								alt="An Evening of Impact program"
								className="w-full h-32 sm:h-40 object-cover rounded-xl"
							/>
						</div>
						<div>
							<h2 className="font-heading text-[#C8930A] text-3xl font-bold mb-4">
								An Evening of Impact
							</h2>
							<div className="flex flex-col gap-2 mb-6">
								<span className="flex items-center gap-2 text-gray-500 text-sm">
									<Clock size={18} className="text-teal" />
									Saturday, August 8, 2026 · 6:00 – 10:00 PM
								</span>
								<span className="flex items-center gap-2 text-gray-500 text-sm">
									<MapPin size={18} className="text-teal" />
									Lost Parrot Cafe, 1929 Huntington Dr, South Pasadena, CA
									91030
								</span>
							</div>
							<p className="text-gray-500 leading-relaxed mb-8 text-xl">
								A wonderful night of connection and generosity in support of
								neuroscience education in Cambodia. With strong turnout and
								robust fundraising, the evening was a resounding success, and
								we're deeply grateful to everyone who joined us, supported the
								mission, and helped make it possible.
							</p>
							<Link
								to="/gallery"
								className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-full font-semibold no-underline
                hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
							>
								View Photo Gallery
								<ImageIcon size={18} />
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* News */}
			<div className="py-20 bg-white">
				<div className="max-w-[1400px] mx-auto px-[5%]">
					<div className="text-center mb-14">
						<h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
							News
						</h2>
						<p className="text-gray-500 text-lg max-w-2xl mx-auto">
							Press coverage and announcements from our team.
						</p>
					</div>

					{news.length === 0 ? (
						<div className="border border-gray-100 rounded-2xl p-16 text-center text-gray-400 max-w-3xl mx-auto">
							News updates coming soon.
						</div>
					) : (
						<div className="flex flex-col gap-6 max-w-3xl mx-auto">
							{news.map(({ slug, date, headline, excerpt }) => (
								<Link
									key={slug}
									to={`/news/${slug}`}
									className="border border-gray-100 rounded-2xl p-6 no-underline hover:shadow-md transition-shadow duration-300 bg-white block"
								>
									<p className="text-gray-400 text-xs uppercase tracking-widest mb-2">
										{new Date(date).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</p>
									<h3 className="font-heading text-navy text-lg font-bold mb-2 leading-snug">
										{headline}
									</h3>
									<p className="text-gray-500 text-sm leading-relaxed mb-3">
										{excerpt}
									</p>
									<span className="text-teal font-semibold text-sm">
										Read more →
									</span>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Upcoming Events */}
			<div className="py-20 bg-[#F0F9FF]">
				<div className="max-w-[1400px] mx-auto px-[5%]">
					<div className="text-center mb-14">
						<h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
							Events & Programs
						</h2>
						<p className="text-gray-500 text-lg max-w-2xl mx-auto">
							Join us for educational webinars, fundraising events, and
							community gatherings
						</p>
					</div>

					<h3 className="font-heading text-navy text-2xl font-bold mb-8">
						Upcoming Events
					</h3>

					<div className="space-y-6">
						{events.map(({ date, title, desc, location, time }) => (
							<div
								key={title}
								className="flex flex-col md:flex-row gap-6 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300 bg-white"
							>
								{/* Date Badge */}
								<div className="flex-shrink-0 bg-gradient-to-br from-navy to-teal rounded-xl px-6 py-4 text-white text-center flex items-center justify-center min-w-[160px]">
									<span className="font-bold text-sm leading-snug">{date}</span>
								</div>

								{/* Event Details */}
								<div className="flex-1">
									<h3 className="font-heading text-navy text-xl font-bold mb-2">
										{title}
									</h3>
									<p className="text-gray-500 mb-4 leading-relaxed">{desc}</p>
									<div className="flex flex-wrap gap-6">
										<span className="flex items-center gap-2 text-gray-500 text-sm">
											<MapPin size={18} className="text-teal" />
											{location}
										</span>
										<span className="flex items-center gap-2 text-gray-500 text-sm">
											<Clock size={18} className="text-teal" />
											{time}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Fundraising */}
			<div className="py-14 bg-white">
				<div className="max-w-[1400px] mx-auto px-[5%]">
					<div className="text-center mb-10">
						<h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
							Fundraising
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
						<div className="rounded-2xl overflow-hidden shadow-md aspect-4/3">
							<img
								src={workshopPhoto}
								alt="Students at an NFA neuroanatomy workshop"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="bg-white rounded-2xl p-8 shadow-sm">
							<h3 className="font-heading text-navy text-2xl font-bold mb-4">
								How You Make a Difference
							</h3>
							<p className="text-gray-500 leading-relaxed">
								Hands-on clinical experience is irreplaceable in medical
								education. NeuroSciences For All is actively raising funds to
								acquire essential learning equipment — including portable EEG,
								EMG, and digital ophthalmoscope devices — bridging the gap
								between theoretical knowledge and practical neurological
								assessment skills for students and professionals at every level
								of training.
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
