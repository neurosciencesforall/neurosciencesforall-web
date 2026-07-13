import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	Menu,
	X,
	LogOut,
	LayoutDashboard,
	UserCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logoIcon from "../assets/nfa_logo_icon.png";

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const location = useLocation();
	const { user, logout, isAuthenticated } = useAuth();

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// useEffect(() => {
	// 	setMenuOpen(false);
    //     window.scrollTo(0, 0);
	// }, [location.pathname]);

	const navLinks = [
		{ label: "Home", to: "/" },
		{ label: "About", to: "/about" },
		{ label: "Resources", to: "/resources" },
		{ label: "Events", to: "/events" },
        ...(isAuthenticated ? [{ label: "Community", to: "/community" }] : []),
		{ label: "Contact", to: "/contact" },
	];

	const isActive = (to) => location.pathname === to;

	return (
		<header
			className={`fixed top-0 w-full bg-white/98 backdrop-blur-md z-50 transition-all duration-300 ${
				scrolled ? "shadow-lg" : "shadow-sm"
			}`}
		>
			<nav className="flex justify-between items-center px-[5%] py-4 max-w-[1400px] mx-auto">
				{/* Logo */}
				<Link
					to="/"
					className="flex items-center gap-3 shrink-0 group transition-transform duration-300 hover:-translate-y-0.5"
				>
					<img
						src={logoIcon}
						alt="NeuroSciences For All logo"
						className="w-14 h-14 object-contain shrink-0"
					/>
					{/* Full name — only above 1024px */}
					<div className="hidden lg:block">
						<p className="text-[1.2rem] font-bold font-heading text-navy leading-tight m-0 whitespace-nowrap">
							NeuroSciences For All
						</p>
						<p className="text-[0.7rem] text-gray-500 m-0 whitespace-nowrap">
							Advancing Neuroscience Education
						</p>
					</div>
					{/* Short name — below 1024px */}
					<p className="lg:hidden text-[1.1rem] font-bold font-heading text-navy leading-tight m-0 whitespace-nowrap">
						NFA
					</p>
				</Link>

				{/* Desktop Nav — only above 1024px */}
				<ul className="hidden lg:flex items-center list-none m-0 p-0 gap-6 xl:gap-8">
					{navLinks.map(({ label, to }) => (
						<li key={to} className="shrink-0">
							<Link
								to={to}
								className={`relative text-[0.9rem] font-medium no-underline pb-1.5 transition-colors duration-300
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-teal
                  after:transition-all after:duration-300
                  ${
										isActive(to)
											? "text-teal after:w-full"
											: "text-gray-800 after:w-0 hover:text-teal hover:after:w-full"
									}`}
							>
								{label}
							</Link>
						</li>
					))}

					{/* Donate */}
					<li className="shrink-0">
						<Link
							to="/donate"
							className={`inline-flex items-center bg-gold text-white px-5 py-2 rounded-full 
                font-semibold no-underline text-[0.9rem] transition-all duration-300 
                shadow-[0_4px_15px_rgba(245,158,11,0.3)]
                hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(245,158,11,0.4)]
                ${isActive("/donate") ? "opacity-90" : ""}`}
						>
							Donate Now
						</Link>
					</li>

					{/* Auth */}
					<li className="shrink-0">
						{isAuthenticated ? (
							<div className="flex items-center gap-3">
								<Link
									to="/dashboard"
									className="flex items-center gap-1.5 text-[0.88rem] font-medium text-gray-700 
                    hover:text-teal transition-colors duration-300 no-underline whitespace-nowrap"
								>
									<LayoutDashboard size={15} />
									Dashboard
								</Link>

								{/* Avatar */}
								{user.picture ? (
									<img
										src={user.picture}
										alt={user.name}
										className="w-9 h-9 rounded-full border-2 border-gold object-cover shrink-0"
									/>
								) : (
									<UserCircle
										size={34}
										strokeWidth={1.5}
										className="text-teal shrink-0"
									/>
								)}

								<button
									onClick={logout}
									className="flex items-center gap-1 text-[0.85rem] text-gray-400 hover:text-navy
                    transition-colors duration-300 bg-transparent border-none cursor-pointer 
                    whitespace-nowrap p-0"
								>
									<LogOut size={15} />
									Sign out
								</button>
							</div>
						) : (
							<Link
								to="/login"
								className="text-[0.9rem] font-medium text-navy hover:text-teal 
                  transition-colors duration-300 no-underline whitespace-nowrap"
							>
								Sign In
							</Link>
						)}
					</li>
				</ul>

				{/* Hamburger — only below 1024px */}
				<button
					className="lg:hidden bg-transparent border-none cursor-pointer text-navy p-1"
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle menu"
				>
					{menuOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</nav>

			{/* Mobile Menu — only below 1024px */}
			{menuOpen && (
				<div className="lg:hidden bg-white border-t border-gray-100 px-[5%] py-4 flex flex-col gap-4">
					{navLinks.map(({ label, to }) => (
						<Link
							key={to}
							to={to}
                            onClick={() => {
                                setMenuOpen(false);
                                window.scrollTo(0, 0);
                            }}
							className={`text-[0.95rem] font-medium no-underline transition-colors duration-300 ${
								isActive(to) ? "text-teal" : "text-gray-800 hover:text-teal"
							}`}
						>
							{label}
						</Link>
					))}

					<Link
						to="/donate"
                        onClick={() => {
                            setMenuOpen(false);
                            window.scrollTo(0, 0);
                        }}
						className="bg-gold text-white px-6 py-2.5 rounded-full font-semibold no-underline 
              text-center shadow-[0_4px_15px_rgba(245,158,11,0.3)] 
              hover:shadow-[0_6px_25px_rgba(245,158,11,0.4)]"
					>
						Donate Now
					</Link>

					{/* Mobile Auth */}
					{isAuthenticated ? (
						<>
							<div className="flex items-center gap-3 pt-2 border-t border-gray-100">
								{user.picture ? (
									<img
										src={user.picture}
										alt={user.name}
										className="w-8 h-8 rounded-full border-2 border-gold"
									/>
								) : (
									<UserCircle
										size={32}
										strokeWidth={1.5}
										className="text-teal"
									/>
								)}
								<span className="text-[0.9rem] text-gray-600">{user.name}</span>
							</div>
							<Link
								to="/dashboard"
                                onClick={() => {
                                    setMenuOpen(false);
                                    window.scrollTo(0, 0);
                                }}
								className="flex items-center gap-2 text-[0.95rem] font-medium text-gray-800 
                  hover:text-teal no-underline transition-colors duration-300"
							>
								<LayoutDashboard size={16} />
								Dashboard
							</Link>
							<button
								onClick={() => {
                                    logout();
                                    setMenuOpen(false);
                                    window.scrollTo(0, 0);
                                }}
								className="flex items-center gap-2 text-[0.95rem] text-gray-500 hover:text-navy
                  transition-colors duration-300 bg-transparent border-none cursor-pointer text-left p-0"
							>
								<LogOut size={16} />
								Sign out
							</button>
						</>
					) : (
						<Link
							to="/login"
							className="text-[0.95rem] font-medium text-navy hover:text-teal 
                no-underline transition-colors duration-300"
						>
							Sign In
						</Link>
					)}
				</div>
			)}
		</header>
	);
}
