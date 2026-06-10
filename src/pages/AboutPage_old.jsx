import { Link } from "react-router-dom";
import { Mail, Users, Lightbulb } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="pt-[90px]">

      {/* Vision */}
      <div className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="text-center mb-14">
            <h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
              About NeuroSciences For All
            </h2>
            <p className="text-gray-500 text-lg">
              Dedicated to advancing neuroscience through innovative educational tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-navy text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
              <p className="font-bold text-gray-800 mb-4">
                Universal access to neurological care, regardless of geography.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                NeuroSciences For All was founded on a simple but powerful belief — that world-class neuroscience
                education should be within reach of every learner. Through cutting-edge tools and innovative
                methodologies, we bridge the gap between foundational study and specialized clinical expertise,
                empowering medical students and professionals at every stage of their journey.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-full font-semibold
                  no-underline hover:-translate-y-1 hover:bg-teal transition-all duration-300 shadow-lg"
              >
                Get In Touch
                <Mail size={20} />
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?w=900&auto=format&fit=crop"
                alt="Research Team"
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="py-20 bg-[#F0F9FF]">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="text-center mb-14">
            <h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">Leadership Team</h2>
            <p className="text-gray-500 text-lg">Meet the dedicated professionals guiding our mission</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "/images/soma-sahai-srivastava.jpeg",
                alt: "Dr. Sahai-Srivastava",
                name: "Soma Sahai-Srivastava, MD",
                role: "Founder & CEO",
                bio: "A neurologist, medical educator, and physician-leader with a deep commitment to global health equity.",
              },
              {
                img: "/images/leigh-ramos-platt.jpeg",
                alt: "Leigh Ramos Platt",
                name: "Leigh Ramos Platt, MD",
                role: "President",
                bio: "Neurologist with special qualification in child neurology.",
              },
              {
                img: "/images/jennifer_hui.jpeg",
                alt: "Jennifer Hui",
                name: "Jennifer Hui, MD",
                role: "Vice-President",
                bio: "Neurologist specializing in Parkinson disease and medical educator.",
              },
            ].map(({ img, alt, name, role, bio }) => (
              <div
                key={name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-center"
              >
                <img
                  src={img}
                  alt={alt}
                //   className="w-full object-contain bg-gray-50"
                //   className="w-full h-72 object-cover object-center"
                  className="w-full h-80 object-cover object-top"
                />
                <div className="p-6">
                  <h3 className="font-heading text-navy text-xl font-bold mb-1">{name}</h3>
                  <p className="text-teal font-semibold text-sm mb-3">{role}</p>
                  <p className="text-gray-500 leading-relaxed text-sm">{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="text-center mb-14">
            <h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                icon: <Users size={40} />,
                title: "Accessibility",
                desc: "Making neuroscience education and resources available to medical professionals worldwide.",
              },
              {
                icon: <Lightbulb size={40} />,
                title: "Educational Innovation",
                desc: "Embracing cutting-edge educational tools and approaches to advance understanding.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-[#F0F9FF] rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-navy to-teal rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  {icon}
                </div>
                <h3 className="font-heading text-navy text-xl font-bold mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </main>
  );
}
