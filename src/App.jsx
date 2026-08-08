import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ResourcesPage from "./pages/ResourcesPage";
import EventsPage from "./pages/EventsPage";
import DonatePage from "./pages/DonatePage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CommunityPage from "./pages/CommunityPage";
import SponsorshipPage from "./pages/SponsorshipPage";
import LectureCategoryPage from "./pages/LectureCategoryPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import GalleryPage from "./pages/GalleryPage";
// import BlogPage from './pages/BlogPage'
// import BlogPostPage from './pages/BlogPostPage'
// import VideoPage from './pages/VideoPage'
// import VideoPlayerPage from './pages/VideoPlayerPage'
// import ChatPage from './pages/ChatPage'

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				{/* ── Public ─────────────────────────────────── */}
				<Route path="/" element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/events" element={<EventsPage />} />
				<Route path="/donate" element={<DonatePage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/resources" element={<ResourcesPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/resources/:category" element={<LectureCategoryPage />} />
                <Route path="/sponsorship" element={<SponsorshipPage />} />
                <Route path="/news/:slug" element={<NewsDetailPage />} />
				<Route path="/login" element={<LoginPage />} />

				{/* ── Protected ──────────────────────────────── */}
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/community"
					element={
						<ProtectedRoute>
							<CommunityPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/community/:channelId"
					element={
						<ProtectedRoute>
							<CommunityPage />
						</ProtectedRoute>
					}
				/>

				{/* ── Future protected (uncomment when ready) ── */}
				{/* <Route path="/blog" element={
          <ProtectedRoute><BlogPage /></ProtectedRoute>
        } /> */}
				{/* <Route path="/blog/:slug" element={
          <ProtectedRoute><BlogPostPage /></ProtectedRoute>
        } /> */}
				{/* <Route path="/videos" element={
          <ProtectedRoute><VideoPage /></ProtectedRoute>
        } /> */}
				{/* <Route path="/videos/:id" element={
          <ProtectedRoute><VideoPlayerPage /></ProtectedRoute>
        } /> */}
				{/* <Route path="/chat" element={
          <ProtectedRoute><ChatPage /></ProtectedRoute>
        } /> */}
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
