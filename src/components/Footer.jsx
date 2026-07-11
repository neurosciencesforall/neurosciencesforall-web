import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-[1400px] mx-auto px-[5%] py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Brain size={22} className="text-white" />
            </div>
            <h3 className="font-heading text-xl text-white m-0">
              NeuroSciences For All
            </h3>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            Advancing neuroscience through education.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading text-lg text-white mb-4">Quick Links</h3>
          <ul className="list-none space-y-2">
            {[
              { label: "About Us",  to: "/about" },
              { label: "Resources", to: "/resources" },
              { label: "Events",    to: "/events" },
              { label: "Donate",    to: "/donate" },
            ].map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-white/70 hover:text-white text-sm no-underline transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-heading text-lg text-white mb-4">Resources</h3>
          <ul className="list-none space-y-2">
            {["Education", "Clinical Guidelines", "Support Groups", "Publications"].map((item) => (
              <li key={item}>
                <Link
                  to="/resources"
                  className="text-white/70 hover:text-white text-sm no-underline transition-colors duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-heading text-lg text-white mb-4">Contact</h3>
          <ul className="list-none space-y-2">
            <li>
              <a
                href="mailto:info@neurosciencesforall.org"
                className="text-white/70 hover:text-white text-sm no-underline transition-colors duration-200"
              >
                info@neurosciencesforall.org
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10 py-6 text-center text-white/60 text-sm px-[5%]">
        <p>
          &copy; 2026 NeuroSciences For All. All rights reserved.{" "}
          <Link to="#" className="text-white/60 hover:text-white no-underline transition-colors duration-200">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link to="#" className="text-white/60 hover:text-white no-underline transition-colors duration-200">
            Terms of Use
          </Link>{" "}
          | EIN: 42-2302289
        </p>
      </div>
    </footer>
  );
}
