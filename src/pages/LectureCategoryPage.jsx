import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, PlayCircle } from "lucide-react";
import { categoryMeta, lectures } from "../data/lectures";

export default function LectureCategoryPage() {
	const { category } = useParams();
	const [activeVideo, setActiveVideo] = useState(null);

	const meta = categoryMeta[category];
	const items = lectures[category];

	if (!meta) {
		return (
			<main className="pt-[126px]">
				<div className="max-w-[1400px] mx-auto px-[5%] py-20 text-center">
					<h2 className="font-heading text-navy text-2xl font-bold mb-4">
						Category not found
					</h2>
					<Link to="/resources" className="text-teal font-semibold no-underline">
						← Back to Resources
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className="pt-[126px]">
			<div className="py-20 bg-white">
				<div className="max-w-[1400px] mx-auto px-[5%]">

					<Link
						to="/resources"
						className="inline-flex items-center gap-1 text-teal font-semibold no-underline mb-8"
					>
						<ChevronLeft size={18} />
						Back to Resources
					</Link>

					<div className="mb-14">
						<h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
							{meta.title}
						</h2>
						<p className="text-gray-500 text-lg max-w-xl">
							{meta.description}
						</p>
					</div>

					{items.length === 0 ? (
						<div className="border border-gray-100 rounded-2xl p-16 text-center text-gray-400">
							Lectures coming soon.
						</div>
					) : (
						<div className="flex flex-col gap-4 max-w-4xl">
							{items.map((item) => (
								<div
									key={item.youtubeId}
									className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300
                             flex flex-col sm:flex-row"
								>
									{/* Thumbnail / player — fixed-width on the left, matches YouTube's playlist list style */}
									<div className="w-full sm:w-40 shrink-0 aspect-video bg-navy relative">
										{activeVideo === item.youtubeId ? (
											<iframe
												src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
												title={item.title}
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
												allowFullScreen
												className="w-full h-full"
											/>
										) : (
											<button
												onClick={() => setActiveVideo(item.youtubeId)}
												className="relative w-full h-full border-none cursor-pointer p-0 group"
											>
												<img
													src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
													alt={item.title}
													className="w-full h-full object-cover"
												/>
												<div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/40 transition-colors duration-200 flex items-center justify-center">
													<PlayCircle size={28} className="text-white drop-shadow-lg" />
												</div>
											</button>
										)}
									</div>

									{/* Title + description — to the right, like YouTube's playlist rows */}
									<div className="p-5 flex flex-col justify-center">
										<h3 className="font-heading text-navy text-lg font-bold mb-1 leading-snug">
											{item.title}
										</h3>
										<p className="text-gray-500 text-sm leading-relaxed">
											{item.description}
										</p>
										{item.credit && (
											<p className="text-gray-400 text-xs mt-2 italic">
												{item.credit}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					)}

				</div>
			</div>
		</main>
	);
}
