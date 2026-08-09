import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { news } from "../data/news";

export default function NewsDetailPage() {
	const { slug } = useParams();
	const item = news.find((n) => n.slug === slug);

	if (!item) {
		return (
			<main className="pt-[126px]">
				<div className="max-w-[800px] mx-auto px-[5%] py-20 text-center">
					<h2 className="font-heading text-navy text-2xl font-bold mb-4">
						Article not found
					</h2>
					<Link to="/events" className="text-teal font-semibold no-underline">
						← Back to News & Events
					</Link>
				</div>
			</main>
		);
	}

	const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	return (
		<main className="pt-[126px]">
			<div className="py-20 bg-white">
				<div className="max-w-[800px] mx-auto px-[5%]">
					<Link
						to="/events"
						className="inline-flex items-center gap-1 text-teal font-semibold no-underline mb-8"
					>
						<ChevronLeft size={18} />
						Back to News & Events
					</Link>

					<p className="text-gray-400 text-xs uppercase tracking-widest mb-3">
						For Immediate Release · {formattedDate}
					</p>
					<h1 className="font-heading text-navy text-2xl md:text-3xl font-bold leading-snug mb-8">
						{item.image && (
							<img
								src={item.image}
								alt={item.headline}
								className="w-full h-[400px] object-cover rounded-2xl mb-8 shadow-md"
							/>
						)}
						{item.headline}
					</h1>

					<div className="space-y-5">
						{item.body.map((paragraph, i) => (
							<p key={i} className="text-gray-600 leading-relaxed">
								{i === 0 && (
									<span className="font-semibold text-navy">
										{item.dateline} —{" "}
									</span>
								)}
								{paragraph}
							</p>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
