import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { VegBadge } from "../../components/VegBadge";
import { Lock, Mail, ArrowLeft, AlertCircle } from "lucide-react";

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState("admin@classiccrush.cafe");
  const [password, setPassword] = useState("admin123");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/admin/dashboard";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const res = login(email, password);
      setIsSubmitting(false);

      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.error || "Authentication failed.");
      }
    }, 400);
  };

  const fillDemo = () => {
    setEmail("admin@classiccrush.cafe");
    setPassword("admin123");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col justify-center items-center p-4 antialiased selection:bg-[#E5DBCA] selection:text-[#1C241E]">
      {/* Back to customer website link */}
      <div className="mb-6 w-full max-w-sm">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#755546] hover:text-[#1C241E] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to website</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl border border-[#E5DFD5] shadow-sm p-7 sm:p-8">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-serif text-2xl font-bold tracking-[0.16em] uppercase text-[#1C241E]">
              THE CLASSIC CRUSH
            </span>
            <VegBadge size="sm" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C59F54]">
            ADMIN PORTAL
          </span>
          <div className="w-8 h-0.5 bg-[#C59F54] mx-auto mt-2.5 mb-2" />
          <p className="text-xs text-[#767E7A] font-light">
            Sign in to manage menu, orders, and cafe details
          </p>
        </div>

        {/* Error message if any */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E4340] mb-1.5">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@classiccrush.cafe"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#FCFAF7] border border-[#E5DFD5] rounded-xl text-sm text-[#1C241E] placeholder-[#A0A5A2] focus:outline-none focus:ring-1 focus:ring-[#26332A] focus:border-[#26332A] transition-all"
              />
              <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E4340] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#FCFAF7] border border-[#E5DFD5] rounded-xl text-sm text-[#1C241E] placeholder-[#A0A5A2] focus:outline-none focus:ring-1 focus:ring-[#26332A] focus:border-[#26332A] transition-all"
              />
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <label className="flex items-center gap-2 text-[#575E5B] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#D5C7B5] text-[#26332A] focus:ring-[#26332A]"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={fillDemo}
              className="text-[#755546] hover:text-[#1C241E] underline cursor-pointer text-[11px]"
            >
              Fill Credentials
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 bg-[#26332A] hover:bg-[#1C241E] text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.2em] rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Demo Helper Hint */}
        <div className="mt-6 pt-5 border-t border-[#EFE9DE] text-center">
          <p className="text-[11px] text-[#767E7A] font-light">
            Demo Credentials: <span className="font-mono font-medium text-[#1C241E]">admin@classiccrush.cafe</span> / <span className="font-mono font-medium text-[#1C241E]">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};
