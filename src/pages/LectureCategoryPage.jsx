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
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{items.map((item) => (
								<div
									key={item.youtubeId}
									className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300"
								>
									{activeVideo === item.youtubeId ? (
										<div className="aspect-video">
											<iframe
												src={`https://www.youtube.com/embed/${item.youtubeId}`}
												title={item.title}
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
												allowFullScreen
												className="w-full h-full"
											/>
										</div>
									) : (
										<button
											onClick={() => setActiveVideo(item.youtubeId)}
											className="w-full aspect-video bg-navy flex items-center justify-center text-white border-none cursor-pointer"
										>
											<PlayCircle size={48} />
										</button>
									)}
									<div className="p-5">
										<h3 className="font-heading text-navy text-lg font-bold mb-1">
											{item.title}
										</h3>
										<p className="text-gray-500 text-sm">{item.description}</p>
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