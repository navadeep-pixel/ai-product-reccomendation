import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden font-sans">
      {/* Soft decorative background radial glow */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none" />

      <Navbar />
      <Home />
    </div>
  );
}
