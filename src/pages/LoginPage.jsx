import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Brain } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
	const { login, isAuthenticated, loginError } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	// Where to send the user after login — back to where they came from, or /dashboard
	const from = location.state?.from?.pathname || "/dashboard";

	// Already logged in — redirect immediately
	useEffect(() => {
		if (isAuthenticated) navigate(from, { replace: true });
	}, [isAuthenticated, navigate, from]);

	return (
		<main className="min-h-screen bg-gradient-to-br from-navy to-teal flex items-center justify-center px-4 pt-24 pb-12">
			<div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
				{/* Logo mark */}
				<div className="flex justify-center mb-5">
					<div className="w-[64px] h-[64px] bg-gradient-to-br from-navy to-teal rounded-xl flex items-center justify-center text-white shadow-lg">
						<Brain size={32} />
					</div>
				</div>

				{/* Heading */}
				<h1 className="font-heading text-3xl font-bold text-navy mb-2">
					Welcome Back
				</h1>
				<p className="text-gray-500 text-sm mb-8">
					Sign in to access member resources, your dashboard, and more.
				</p>

				{/* Google Sign-In button */}
				<div className="flex justify-center mb-6">
					<GoogleLogin
						onSuccess={login}
						onError={() => console.error("Google login failed")}
						useOneTap
						shape="rectangular"
						theme="outline"
						size="large"
						text="signin_with_google"
					/>
				</div>

				{loginError && (
					<div
						className="mb-6 px-4 py-3 bg-red-50 border border-red-200 
                  rounded-lg text-red-600 text-sm text-center"
					>
						{loginError}
					</div>
				)}

				<div className="border-t border-gray-100 pt-6">
					<p className="text-xs text-gray-400">
						By signing in you agree to our{" "}
						<Link
							to="/contact"
							className="underline hover:text-teal transition-colors duration-300"
						>
							Privacy Policy
						</Link>
						.
					</p>
					<p className="text-xs text-gray-400 mt-2">
						Just browsing?{" "}
						<Link
							to="/"
							className="underline hover:text-teal transition-colors duration-300"
						>
							Return to home
						</Link>
						.
					</p>
				</div>
			</div>
		</main>
	);
}
