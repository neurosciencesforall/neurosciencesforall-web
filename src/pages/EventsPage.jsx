import { MapPin, Clock } from "lucide-react";
import bannerImg from "../assets/NFA_Evening_of_Impact_Cover_Banner.png";

const EVENTBRITE_URL = "https://www.eventbrite.com/e/neurosciences-for-all-an-evening-of-impact-tickets-1993761877446?aff=oddtdtcreator";

export default function EventsPage() {
  const events = [
    {
      date: "NOV 30 – DEC 4, 2026",
      title: "Neuroscience Bootcamp for Medical Students",
      desc: "Join leading neuroscientists for a full day of interactive learning sessions.",
      location: "Phnom Penh, Cambodia",
      time: "8:00 AM – 12:00 PM",
    },
    {
      date: "NOV 30 – DEC 4, 2026",
      title: "EMG Bootcamp",
      desc: "Join the EMG bootcamp training.",
      location: "Phnom Penh, Cambodia",
      time: "8:00 AM – 5:00 PM",
    },
    {
      date: "NOV 30 – DEC 4, 2026",
      title: "Neurology Resident Education",
      desc: "Clinical, comprehensive education on treatment of neurological disorders.",
      location: "Phnom Penh, Cambodia",
      time: "1:00 PM – 5:00 PM",
    },
  ];

  return (
    <main className="pt-[90px]">

      {/* Upcoming Fundraiser — Spotlight */}
      <div className="py-20 bg-[#F0F9FF]">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[2px] w-10 bg-teal" />
            <span className="text-teal text-sm font-semibold uppercase tracking-widest">
              Upcoming Fundraiser
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden shadow-md aspect-2/1">
              <img
                src={bannerImg}
                alt="An Evening of Impact — Neurosciences For All fundraiser gala"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading text-[#C8930A] text-3xl font-bold mb-4">
                An Evening of Impact
              </h2>
              <div className="flex flex-col gap-2 mb-6">
                <span className="flex items-center gap-2 text-gray-500 text-sm">
                  <Clock size={18} className="text-teal" />
                  Saturday, August 8, 2026 · 6:00 – 10:00 PM
                </span>
                <span className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin size={18} className="text-teal" />
                  DerWolf Pasadena, 72 N Fair Oaks Ave, Pasadena, CA
                </span>
              </div>
              <p className="text-gray-500 leading-relaxed mb-8 text-xl">
              Cocktails, dinner, and a program to support neuroscience education in Cambodia. <br />
              </p>
              <a
                href={EVENTBRITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-full font-semibold no-underline
                hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Reserve Your Seat
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="text-center mb-14">
            <h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">
              Events & Programs
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Join us for educational webinars, fundraising events, and community gatherings
            </p>
          </div>

          <h3 className="font-heading text-navy text-2xl font-bold mb-8">Upcoming Events</h3>

          <div className="space-y-6">
            {events.map(({ date, title, desc, location, time }) => (
              <div
                key={title}
                className="flex flex-col md:flex-row gap-6 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300 bg-white"
              >
                {/* Date Badge */}
                <div className="flex-shrink-0 bg-gradient-to-br from-navy to-teal rounded-xl px-6 py-4 text-white text-center flex items-center justify-center min-w-[160px]">
                  <span className="font-bold text-sm leading-snug">{date}</span>
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <h3 className="font-heading text-navy text-xl font-bold mb-2">{title}</h3>
                  <p className="text-gray-500 mb-4 leading-relaxed">{desc}</p>
                  <div className="flex flex-wrap gap-6">
                    <span className="flex items-center gap-2 text-gray-500 text-sm">
                      <MapPin size={18} className="text-teal" />
                      {location}
                    </span>
                    <span className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock size={18} className="text-teal" />
                      {time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fundraising */}
      <div className="py-20 bg-[#F0F9FF]">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="text-center mb-14">
            <h2 className="font-heading text-navy text-3xl md:text-5xl font-bold mb-4">Fundraising</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&auto=format&fit=crop"
                alt="Conference"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-heading text-navy text-2xl font-bold mb-4">
                How You Make a Difference
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Hands-on clinical experience is irreplaceable in medical education. NeuroSciences For All
                is actively raising funds to acquire essential learning equipment — including portable EEG,
                EMG, and digital ophthalmoscope devices — bridging the gap between theoretical knowledge and
                practical neurological assessment skills for students and professionals at every level of training.
              </p>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
