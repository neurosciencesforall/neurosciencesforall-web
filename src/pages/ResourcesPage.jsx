import { BookOpen, FileText, Calendar, Award, ClipboardCheck, Download, ArrowRight } from "lucide-react";

export default function ResourcesPage() {
  const resourceItems = [
    {
      icon: <FileText size={24} className="text-teal" />,
      title: "Understanding Migraine: A Complete Guide",
      desc: "Comprehensive resource covering migraine types, triggers, treatment options, and prevention strategies. Includes patient stories and expert insights.",
      linkLabel: "Download PDF",
    },
    {
      icon: <FileText size={24} className="text-teal" />,
      title: "Cluster Headache Management",
      desc: "Evidence-based approaches to managing cluster headaches, including acute treatments, preventive medications, and lifestyle modifications.",
      linkLabel: "Download PDF",
    },
    {
      icon: <FileText size={24} className="text-teal" />,
      title: "Brain Health & Aging",
      desc: "Tips and strategies for maintaining cognitive health throughout life, including nutrition, exercise, mental stimulation, and social engagement.",
      linkLabel: "Download PDF",
    },
    {
      icon: <Calendar size={24} className="text-teal" />,
      title: "Headache Diary Template",
      desc: "Track your headaches effectively with our comprehensive diary template. Monitor frequency, triggers, symptoms, and medication use.",
      linkLabel: "Download Template",
    },
  ];

  const professionalCards = [
    {
      icon: <Award size={40} />,
      title: "CME Opportunities",
      desc: "Earn continuing medical education credits through our webinar series and online courses on latest neurological research and treatments.",
      linkLabel: "View CME Calendar",
    },
    {
      icon: <ClipboardCheck size={40} />,
      title: "Clinical Guidelines",
      desc: "Access evidence-based treatment protocols and diagnostic criteria for common neurological conditions.",
      linkLabel: "Download Guidelines",
    },
  ];

  return (
    <main className="pt-[90px]">

      {/* Patient Resources */}
      <div className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="text-center mb-14">
            <h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
              Patient & Professional Resources
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Evidence-based information and tools to support your neurological health journey
            </p>
          </div>

          {/* Educational Materials Card */}
          <div className="bg-[#F0F9FF] rounded-2xl p-8 text-center mb-14 max-w-sm mx-auto hover:-translate-y-1 transition-transform duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-navy to-teal rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
              <BookOpen size={40} />
            </div>
            <h3 className="font-heading text-navy text-xl font-bold mb-3">Educational Materials</h3>
            <p className="text-gray-500 leading-relaxed">
              Comprehensive guides on neurological conditions, treatments, and brain health
            </p>
          </div>

          {/* Resource Items */}
          <div>
            <h2 className="font-heading text-navy text-2xl md:text-3xl font-bold mb-8">
              Understanding Neurological Conditions
            </h2>
            <div className="space-y-6">
              {resourceItems.map(({ icon, title, desc, linkLabel }) => (
                <div
                  key={title}
                  className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300 bg-white"
                >
                  <h3 className="font-heading text-navy text-xl font-bold mb-2 flex items-center gap-3">
                    {icon}
                    {title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-3">{desc}</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-teal font-semibold no-underline hover:gap-3 transition-all duration-200"
                  >
                    {linkLabel}
                    <Download size={18} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Resources */}
      <div className="py-20 bg-[#ECFEFF]">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="text-center mb-14">
            <h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
              For Healthcare Professionals
            </h2>
            <p className="text-gray-500 text-lg">Clinical resources and continuing education opportunities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {professionalCards.map(({ icon, title, desc, linkLabel }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-navy to-teal rounded-2xl flex items-center justify-center text-white mb-6">
                  {icon}
                </div>
                <h3 className="font-heading text-navy text-xl font-bold mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed mb-4">{desc}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-teal font-semibold no-underline hover:gap-3 transition-all duration-200"
                >
                  {linkLabel}
                  <ArrowRight size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Testimonials */}
      <div className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="text-center mb-14">
            <h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">Student Testimonials</h2>
            <p className="text-gray-500 text-lg">You're not alone in your journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&auto=format&fit=crop"
                alt="Support Group"
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h3 className="font-heading text-navy text-2xl md:text-3xl font-bold mb-6">
                Connect With Students and Mentors
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Connect with our global health warriors, advocates, and mentors.
              </p>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
