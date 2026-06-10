import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Briefcase, Gift, Users, ArrowRight } from "lucide-react";

export default function DonatePage() {
  const [form, setForm] = useState({
    amount: "",
    type: "",
    name: "",
    email: "",
    inHonor: false,
    newsletter: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const equipment = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
        </svg>
      ),
      iconBg: "bg-blue-50",
      barColor: "bg-blue-500",
      badgeColor: "bg-blue-50 text-blue-700",
      title: "Portable EMG",
      desc: "Clinical-grade electromyography system (e.g., Cadwell, Natus, or similar handheld unit)",
      cost: "$12,000",
      badge: "0% of goal",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      iconBg: "bg-emerald-50",
      barColor: "bg-emerald-500",
      badgeColor: "bg-emerald-50 text-emerald-700",
      title: "Portable EEG",
      desc: "Ambulatory/portable EEG recorder with laptop interface for real-time neural monitoring",
      cost: "$8,500",
      badge: "0% of goal",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
          <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
        </svg>
      ),
      iconBg: "bg-amber-50",
      barColor: "bg-amber-500",
      badgeColor: "bg-amber-50 text-amber-700",
      title: "Digital Ophthalmoscope",
      desc: "High-resolution digital fundus camera/scope (e.g., Welch Allyn) for ocular examination",
      cost: "$1,500",
      badge: "0% of goal",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M9 9h6M9 13h6M9 17h4"/>
        </svg>
      ),
      iconBg: "bg-gray-100",
      barColor: "bg-gray-400",
      badgeColor: "bg-gray-100 text-gray-600",
      title: "Consumables",
      desc: "EEG paste, electrodes, EMG needles, alcohol pads, and disposable gloves",
      cost: "$2,000",
      badge: "Ongoing supply",
    },
  ];

  const otherWays = [
    { icon: <Briefcase size={40} />, title: "Corporate Partnerships", desc: "Partner with us to advance neuroscience while demonstrating your commitment to community health", label: "Learn More" },
    { icon: <Gift size={40} />, title: "Planned Giving", desc: "Create a lasting legacy through bequests, trusts, and other estate planning options", label: "Learn More" },
    { icon: <Users size={40} />, title: "Volunteer", desc: "Donate your time and talents to support our events, programs, and mission", label: "Get Started" },
  ];

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 outline-none focus:border-teal transition-colors duration-200 text-base";

  return (
    <main className="pt-[90px]">

      {/* Hero */}
      <div className="py-20 bg-gradient-to-br from-navy to-teal text-white text-center px-[5%]">
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">Your Gift Transforms Lives</h2>
        <p className="text-white/95 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Every contribution directly advances innovative neuroscience education — equipping learners
          and professionals worldwide with the cutting-edge tools and resources that drive the future
          of neurological medicine.
        </p>
      </div>

      {/* Donation Form */}
      <div className="py-20 bg-white">
        <div className="max-w-[600px] mx-auto px-[5%]">
          <div className="text-center mb-10">
            <h2 className="font-heading text-navy text-3xl font-bold mb-3">Choose Your Impact</h2>
            <p className="text-gray-500">Select an amount below or enter a custom donation</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h3 className="font-heading text-navy text-xl font-bold mb-6 text-center">Complete Your Donation</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Donation Amount</label>
                <input type="number" name="amount" placeholder="Enter amount" required value={form.amount} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Donation Type</label>
                <select name="type" required value={form.type} onChange={handleChange} className={inputClass}>
                  <option value="">Select type</option>
                  <option value="one-time">One-Time Gift</option>
                  <option value="monthly">Monthly Recurring</option>
                  <option value="annual">Annual Gift</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input type="text" name="name" placeholder="Your name" required value={form.name} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input type="email" name="email" placeholder="your@email.com" required value={form.email} onChange={handleChange} className={inputClass} />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="inHonor" checked={form.inHonor} onChange={handleChange} className="w-4 h-4 accent-teal" />
                  <span className="text-gray-600 text-sm">Make this donation in honor/memory of someone</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} className="w-4 h-4 accent-teal" />
                  <span className="text-gray-600 text-sm">Subscribe to our newsletter</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-navy text-white py-4 rounded-full font-semibold
                  hover:bg-teal transition-colors duration-300 cursor-pointer border-none mt-2"
              >
                Complete Donation
                <Heart size={20} />
              </button>
              <p className="text-center text-gray-400 text-sm">Your donation is tax-deductible. EIN: XX-XXXXXXX</p>
            </form>
          </div>
        </div>
      </div>

      {/* Other Ways to Give */}
      <div className="py-20 bg-[#F0F9FF]">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="text-center mb-14">
            <h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">Other Ways to Support</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherWays.map(({ icon, title, desc, label }) => (
              <div key={title} className="bg-white rounded-2xl p-8 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-navy to-teal rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  {icon}
                </div>
                <h3 className="font-heading text-navy text-xl font-bold mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed mb-4">{desc}</p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-teal font-semibold no-underline hover:gap-3 transition-all duration-200">
                  {label} <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment Fundraising */}
      <div className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="text-center mb-4">
            <p className="text-teal font-semibold uppercase tracking-widest text-sm mb-2">Fundraising Priorities</p>
            <h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">Medical Equipment</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Program expense funding supports the acquisition of essential hands-on diagnostic tools,
              grounding our curriculum in authentic neurological education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {equipment.map(({ icon, iconBg, barColor, badgeColor, title, desc, cost, badge }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>{icon}</div>
                  <span className="font-bold text-navy text-lg">{cost}</span>
                </div>
                <h3 className="font-heading text-navy text-lg font-bold mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div className={`${barColor} h-2 rounded-full`} style={{ width: "3%" }} />
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor}`}>{badge}</span>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="mt-10 bg-[#F0F9FF] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-1">Subtotal — Medical Equipment</p>
              <p className="font-heading text-navy text-3xl font-bold">$24,000</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
              <span>4 items</span>
              <span className="w-px h-4 bg-gray-300" />
              <span>Program funding priority</span>
              <span className="w-px h-4 bg-gray-300" />
              <span className="text-gray-400">0% raised</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-lg mb-6 max-w-2xl mx-auto">
              Your generosity directly funds the tools that transform how neuroscience is learned, practiced, and advanced.
            </p>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 bg-navy text-white px-10 py-4 rounded-full font-semibold no-underline
                hover:bg-teal hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              Donate Today <Heart size={20} />
            </a>
          </div>
        </div>
      </div>

    </main>
  );
}
