import { useState } from "react";
import { Send } from "lucide-react";

const TIERS = [
	{
		name: "Gold Sponsor",
		title: "The Visionary",
		price: "$5,000",
		purpose: "Funds the purchase of vital diagnostic equipment",
		benefits: [
			"Prominent logo placement on the website & event signage",
			"Special verbal recognition during the evening program",
			"Reserved VIP seating and dinner for 8 guests",
		],
		featured: true,
	},
	{
		name: "Silver Sponsor",
		title: "The Champion",
		price: "$2,500",
		purpose: "Supports comprehensive hands-on clinical training for local providers",
		benefits: [
			"Logo placement on the website and welcome signage",
			"Acknowledgment in the printed evening program",
			"Reserved seating and dinner for 4 guests",
		],
	},
	{
		name: "Bronze Sponsor",
		title: "The Advocate",
		price: "$1,500",
		purpose: "Covers partial travel and logistics for one medical educator",
		benefits: [
			"Dedicated display space during the welcome cocktail hour",
			"Logo listed on the organization website",
			"Dinner and admission for 2 guests",
		],
	},
	{
		name: "Community Supporter",
		title: null,
		price: "$500",
		purpose: "Every gift moves the mission forward",
		benefits: [
			"Name listed in the evening program and on the website",
			"Dinner and admission for 2 guests",
		],
	},
];

export default function SponsorshipPage() {
	const [form, setForm] = useState({
		name: "",
		organization: "",
		email: "",
		tier: "",
	});
	const [status, setStatus] = useState("idle"); // idle | sending | success | error

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const selectTier = (tierName) => {
		setForm((prev) => ({ ...prev, tier: tierName }));
		document.getElementById("sponsor-inquiry-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("sending");
		try {
			const res = await fetch(
				"https://chat-server-production-e62d.up.railway.app/api/sponsorship",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(form),
				},
			);
			if (!res.ok) throw new Error("Request failed");
			setStatus("success");
			setForm({ name: "", organization: "", email: "", tier: "" });
		} catch (err) {
			setStatus("error", err);
		}
	};

	const inputClass =
		"w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 outline-none focus:border-teal transition-colors duration-200 text-base";

	return (
		<main className="pt-[90px]">
			<div className="py-20 bg-white">
				<div className="max-w-[1400px] mx-auto px-[5%]">

					{/* Header */}
					<div className="text-center mb-14">
						<p className="text-gold text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">
							An Evening of Impact
						</p>
						<h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
							Sponsorship Opportunities
						</h2>
						<p className="text-gray-500 text-lg max-w-2xl mx-auto">
							Partner with us to expand neurology education and care access in Cambodia.
						</p>
					</div>

					{/* Tier cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
						{TIERS.map((tier) => (
							<div
								key={tier.name}
								className={
									tier.featured
										? "rounded-2xl overflow-hidden flex flex-col"
										: "rounded-2xl overflow-hidden flex flex-col border border-gray-100"
								}
								style={tier.featured ? { background: "#0f2158" } : {}}
							>
								{tier.featured && (
									<div className="h-1 w-full bg-gradient-to-r from-[#1E3A8A] via-[#0891B2] to-[#C8930A]" />
								)}
								<div className="p-6 flex flex-col flex-1">
									<p
										className={
											tier.featured
												? "text-[#C8930A] text-[11px] font-semibold tracking-widest uppercase mb-1"
												: "text-gray-400 text-[11px] font-semibold tracking-widest uppercase mb-1"
										}
									>
										{tier.name}
									</p>
									{tier.title && (
										<h3
											className={
												tier.featured
													? "font-heading text-white text-lg font-bold mb-1"
													: "font-heading text-navy text-lg font-bold mb-1"
											}
										>
											{tier.title}
										</h3>
									)}
									<p
										className={
											tier.featured
												? "text-white text-2xl font-bold mb-2"
												: "text-navy text-2xl font-bold mb-2"
										}
									>
										{tier.price}
									</p>
									<p
										className={
											tier.featured
												? "text-white/60 text-sm mb-4"
												: "text-gray-500 text-sm mb-4"
										}
									>
										{tier.purpose}
									</p>
									<ul
										className={
											tier.featured
												? "text-white/80 text-sm space-y-2 mb-6 flex-1 list-disc pl-4"
												: "text-gray-500 text-sm space-y-2 mb-6 flex-1 list-disc pl-4"
										}
									>
										{tier.benefits.map((b) => (
											<li key={b}>{b}</li>
										))}
									</ul>
									<button
										onClick={() => selectTier(tier.name)}
										className={
											tier.featured
												? "bg-[#C8930A] text-white text-sm font-semibold rounded-full py-2.5 hover:bg-[#b3830a] transition-colors duration-200"
												: "bg-navy text-white text-sm font-semibold rounded-full py-2.5 hover:bg-teal transition-colors duration-200"
										}
									>
										Become a Sponsor
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Inquiry form */}
					<div id="sponsor-inquiry-form" className="max-w-xl mx-auto bg-[#F0F9FF] rounded-2xl p-10">
						<h3 className="font-heading text-navy text-xl font-bold mb-2 text-center">
							Interested in Sponsoring?
						</h3>
						<p className="text-gray-500 text-sm text-center mb-8">
							Tell us a bit about your organization and preferred tier, we'll follow up with next steps.
						</p>

						<form onSubmit={handleSubmit} className="space-y-4">
							<input
								type="text"
								name="name"
								placeholder="Full name"
								required
								value={form.name}
								onChange={handleChange}
								className={inputClass}
							/>
							<input
								type="text"
								name="organization"
								placeholder="Company / organization"
								value={form.organization}
								onChange={handleChange}
								className={inputClass}
							/>
							<input
								type="email"
								name="email"
								placeholder="Email address"
								required
								value={form.email}
								onChange={handleChange}
								className={inputClass}
							/>
							<select
								name="tier"
								required
								value={form.tier}
								onChange={handleChange}
								className={inputClass}
							>
								<option value="">Select a tier of interest</option>
								<option value="Gold Sponsor">Gold Sponsor — $5,000</option>
								<option value="Silver Sponsor">Silver Sponsor — $2,500</option>
								<option value="Bronze Sponsor">Bronze Sponsor — $1,500</option>
								<option value="Community Supporter">Community Supporter — $500</option>
							</select>
							<button
								type="submit"
								disabled={status === "sending"}
								className="w-full flex items-center justify-center gap-2 bg-navy text-white py-4 rounded-full font-semibold hover:bg-teal transition-colors duration-300 cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{status === "sending" ? "Sending..." : "Submit Inquiry"}
								<Send size={20} />
							</button>
						</form>

						{status === "success" && (
							<p className="mt-4 text-teal font-medium text-center">
								Inquiry sent. We'll be in touch soon.
							</p>
						)}
						{status === "error" && (
							<p className="mt-4 text-red-500 font-medium text-center">
								Something went wrong. Please try again or email us directly.
							</p>
						)}
					</div>

				</div>
			</div>
		</main>
	);
}