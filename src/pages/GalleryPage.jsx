import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const AUTO_PLAY_INTERVAL_MS = 3500;

// Auto-loads every image dropped into src/assets/gallery — no manual imports needed.
const modules = import.meta.glob(
	"../assets/gallery/*.{jpg,jpeg,JPG,JPEG,png,PNG}",
	{
		eager: true,
		import: "default",
	},
);
const galleryImages = Object.values(modules);

export default function GalleryPage() {
	const [activeIndex, setActiveIndex] = useState(null);
	const [isPlaying, setIsPlaying] = useState(true);

	const close = useCallback(() => setActiveIndex(null), []);
	const showPrev = useCallback(
		() => setActiveIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1)),
		[],
	);
	const showNext = useCallback(
		() => setActiveIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1)),
		[],
	);

	// Manual navigation pauses auto-play, so the person keeps control once they've engaged.
	const goPrevManual = useCallback(() => {
		setIsPlaying(false);
		showPrev();
	}, [showPrev]);
	const goNextManual = useCallback(() => {
		setIsPlaying(false);
		showNext();
	}, [showNext]);

	// Reset to auto-play whenever a new photo is opened from the grid.
	const openAt = useCallback((i) => {
		setIsPlaying(true);
		setActiveIndex(i);
	}, []);

	useEffect(() => {
		if (activeIndex === null) return;
		const onKey = (e) => {
			if (e.key === "Escape") close();
			if (e.key === "ArrowLeft") goPrevManual();
			if (e.key === "ArrowRight") goNextManual();
			if (e.key === " ") {
				e.preventDefault();
				setIsPlaying((p) => !p);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [activeIndex, close, goPrevManual, goNextManual]);

	useEffect(() => {
		if (activeIndex === null || !isPlaying) return;
		const id = setInterval(showNext, AUTO_PLAY_INTERVAL_MS);
		return () => clearInterval(id);
	}, [activeIndex, isPlaying, showNext]);

	return (
		<main className="pt-[126px] min-h-screen bg-white">
			<div className="max-w-[1400px] mx-auto px-[5%] py-16">
				<div className="text-center mb-12">
					<h1 className="font-heading text-navy text-4xl md:text-5xl font-bold mb-4">
						Gallery
					</h1>
					<p className="text-gray-600 text-lg max-w-2xl mx-auto">
						Moments from our workshops and events in the field and in the
						classroom.
					</p>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
					{galleryImages.map((src, i) => (
						<button
							key={src}
							onClick={() => openAt(i)}
							className="relative aspect-square overflow-hidden rounded-xl group focus:outline-none focus-visible:ring-4 focus-visible:ring-teal/50"
							aria-label={`Open photo ${i + 1} of ${galleryImages.length}`}
						>
							<img
								src={src}
								alt=""
								loading="lazy"
								className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />
						</button>
					))}
				</div>
			</div>

			{activeIndex !== null && (
				<div
					className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center px-4"
					onClick={close}
				>
					<button
						onClick={close}
						className="absolute top-6 right-6 text-white/80 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-teal/50 rounded-full p-2"
						aria-label="Close"
					>
						<X size={32} />
					</button>

					<button
						onClick={(e) => {
							e.stopPropagation();
							goPrevManual();
						}}
						className="absolute left-4 md:left-8 text-white/80 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-teal/50 rounded-full p-2"
						aria-label="Previous photo"
					>
						<ChevronLeft size={40} />
					</button>

					<img
						src={galleryImages[activeIndex]}
						alt={`Photo ${activeIndex + 1} of ${galleryImages.length}`}
						onClick={(e) => e.stopPropagation()}
						className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
					/>

					<button
						onClick={(e) => {
							e.stopPropagation();
							goNextManual();
						}}
						className="absolute right-4 md:right-8 text-white/80 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-teal/50 rounded-full p-2"
						aria-label="Next photo"
					>
						<ChevronRight size={40} />
					</button>

					<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
						<button
							onClick={(e) => {
								e.stopPropagation();
								setIsPlaying((p) => !p);
							}}
							className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-teal/50 rounded-full p-1.5"
							aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
						>
							{isPlaying ? <Pause size={18} /> : <Play size={18} />}
						</button>
						<div className="text-white/60 text-sm">
							{activeIndex + 1} / {galleryImages.length}
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
