import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { carouselPhotos } from "../data/carousel";

export default function PhotoCarousel() {
	const [index, setIndex] = useState(0);

	const next = useCallback(() => {
		setIndex((i) => (i + 1) % carouselPhotos.length);
	}, []);

	const prev = () => {
		setIndex((i) => (i - 1 + carouselPhotos.length) % carouselPhotos.length);
	};

	useEffect(() => {
		const timer = setInterval(next, 5000);
		return () => clearInterval(timer);
	}, [next]);

	if (carouselPhotos.length === 0) return null;

	return (
		<div className="max-w-[900px] mx-auto">
			<div className="relative rounded-2xl overflow-hidden aspect-video bg-navy">
				<img
					src={carouselPhotos[index].src}
					alt={carouselPhotos[index].alt}
					className="w-full h-full object-cover"
				/>
				<button
					onClick={prev}
					aria-label="Previous photo"
					className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border-none
                     flex items-center justify-center cursor-pointer hover:bg-white transition-colors duration-200"
				>
					<ChevronLeft size={20} className="text-navy" />
				</button>
				<button
					onClick={next}
					aria-label="Next photo"
					className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border-none
                     flex items-center justify-center cursor-pointer hover:bg-white transition-colors duration-200"
				>
					<ChevronRight size={20} className="text-navy" />
				</button>
			</div>

			<div className="flex justify-center gap-2 mt-4">
				{carouselPhotos.map((_, i) => (
					<button
						key={i}
						onClick={() => setIndex(i)}
						aria-label={`Go to photo ${i + 1}`}
						className={`w-2 h-2 rounded-full border-none cursor-pointer transition-colors duration-200 ${
							i === index ? "bg-gold" : "bg-gray-300"
						}`}
					/>
				))}
			</div>
		</div>
	);
}