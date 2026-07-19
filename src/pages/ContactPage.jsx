import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function ContactPage() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	// Interim fix: opens the visitor's email client with the form fields
	// pre-filled, since there's no backend contact endpoint yet.
	// TODO: replace with a real POST /api/contact backend handler.
	const [status, setStatus] = useState("idle"); // idle | sending | success | error

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("sending");
		try {
			const res = await fetch(
				"https://chat-server-production-e62d.up.railway.app/api/contact",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(form),
				},
			);
			if (!res.ok) throw new Error("Request failed");
			setStatus("success");
			setForm({ name: "", email: "", phone: "", subject: "", message: "" });
		} catch (err) {
			setStatus("error");
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
						<h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
							Get In Touch
						</h2>
						<p className="text-gray-500 text-lg max-w-2xl mx-auto">
							We'd love to hear from you. Reach out with questions, partnership
							inquiries, or to learn more about our work.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
						{/* Contact Form */}
						<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
							<h3 className="font-heading text-navy text-xl font-bold mb-6">
								Send Us a Message
							</h3>
							<form onSubmit={handleSubmit} className="space-y-5">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Full Name *
									</label>
									<input
										type="text"
										name="name"
										placeholder="Your name"
										required
										value={form.name}
										onChange={handleChange}
										className={inputClass}
									/>
								</div>
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Email Address *
									</label>
									<input
										type="email"
										name="email"
										placeholder="your@email.com"
										required
										value={form.email}
										onChange={handleChange}
										className={inputClass}
									/>
								</div>
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Phone Number
									</label>
									<input
										type="tel"
										name="phone"
										placeholder="(555) 123-4567"
										value={form.phone}
										onChange={handleChange}
										className={inputClass}
									/>
								</div>
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Subject *
									</label>
									<select
										name="subject"
										required
										value={form.subject}
										onChange={handleChange}
										className={inputClass}
									>
										<option value="">Select a subject</option>
										<option value="general">General Inquiry</option>
										<option value="research">Research Information</option>
										<option value="donation">Donation Question</option>
										<option value="event">Event Information</option>
										<option value="volunteer">Volunteer Opportunities</option>
										<option value="partnership">Partnership Inquiry</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Message *
									</label>
									<textarea
										name="message"
										placeholder="Tell us how we can help..."
										required
										rows={5}
										value={form.message}
										onChange={handleChange}
										className={`${inputClass} resize-none`}
									/>
								</div>
								<button
									type="submit"
									disabled={status === "sending"}
									className="w-full flex items-center justify-center gap-2 bg-navy text-white py-4 rounded-full font-semibold
    hover:bg-teal transition-colors duration-300 cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{status === "sending" ? "Sending..." : "Send Message"}
									<Send size={20} />
								</button>
							</form>
							{status === "success" && (
								<p className="mt-4 text-teal font-medium text-center">
									Message sent. We'll get back to you soon.
								</p>
							)}
							{status === "error" && (
								<p className="mt-4 text-red-500 font-medium text-center">
									Something went wrong. Please try again or email us directly.
								</p>
							)}
						</div>

						{/* Contact Info */}
						<div className="flex flex-col gap-6">
							<div className="bg-[#F0F9FF] rounded-2xl p-8 flex items-start gap-6">
								<div className="w-14 h-14 bg-gradient-to-br from-navy to-teal rounded-xl flex items-center justify-center text-white flex-shrink-0">
									<Mail size={28} />
								</div>
								<div>
									<h3 className="font-heading text-navy text-xl font-bold mb-3">
										Email Us
									</h3>
									{/* Commented out until @neurosciencesforall.org email hosting is set up
                  <p className="text-gray-500 leading-relaxed">
                    General:{" "}
                    <a href="mailto:info@neurosciencesforall.org" className="text-teal no-underline hover:underline font-medium">
                      info@neurosciencesforall.org
                    </a>
                  </p>
                  <p className="text-gray-500 leading-relaxed mt-1">
                    Donations:{" "}
                    <a href="mailto:donate@neurosciencesforall.org" className="text-teal no-underline hover:underline font-medium">
                      donate@neurosciencesforall.org
                    </a>
                  </p>
                  */}
									<p className="text-gray-500 leading-relaxed">
										connect@neurosciencesforall.org
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
