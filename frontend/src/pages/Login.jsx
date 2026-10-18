// import { useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import { Mail, Lock, Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";
// import { HOSPITAL } from "../data/dummyData";

// // 👉 Change these to your real file names (files must be inside the /public folder)
// const IMAGE_SRC = "/login-illustration.png";
// const LOGO_SRC = "/logo.png";

// export default function Login() {
//   const { login, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [show, setShow] = useState(false);
//   const [remember] = useState(true);

//   if (isAuthenticated) return <Navigate to="/dashboard" replace />;

//   // Demo login: any email / password (even empty) is accepted.
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(email, remember);
//     navigate("/dashboard", { replace: true });
//   };

//   return (
//     <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fdf9e9] px-4 py-10">
//       <style>{`
//         @property --glow-angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
//         @keyframes glow-spin { to { --glow-angle: 360deg; } }

//         .glow-card,
//         .glow-card::before {
//           background: conic-gradient(from var(--glow-angle),
//             #25d366, #d9f99d 18%, #0f8a52 40%, #86efac 62%, #25d366 80%, #bbf7d0);
//           animation: glow-spin 7s linear infinite;
//         }
//         .glow-card { position: relative; isolation: isolate; }
//         .glow-card::before {
//           content: "";
//           position: absolute;
//           inset: -4px;
//           border-radius: inherit;
//           filter: blur(16px);
//           opacity: 0.6;
//           z-index: -1;
//         }
//         .login-field:focus-within {
//           border-color: #17a862;
//           box-shadow: 0 0 0 3px rgba(23, 168, 98, 0.18), 0 0 14px rgba(37, 211, 102, 0.35);
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .glow-card, .glow-card::before { animation: none; }
//         }
//       `}</style>

//       {/* soft background wash */}
//       <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.9),rgba(253,249,233,0))]" />

//       {/* Glowing card */}
//       <div className="glow-card w-full max-w-[400px] rounded-[30px] p-[2px] lg:max-w-[760px]">
//         <div className="flex min-h-[440px] overflow-hidden rounded-[28px] bg-[#fdfbf2]">
//           {/* LEFT: image with smooth semicircle right edge (hidden on mobile) */}
//           <div className="hidden w-[50%] shrink-0 lg:block">
//             <img
//               src={IMAGE_SRC}
//               alt="City Care Hospital"
//               className="h-full w-full rounded-r-full object-cover object-center"
//             />
//           </div>

//           {/* RIGHT: compact form */}
//           <section className="flex flex-1 flex-col justify-center px-7 py-8 lg:pl-5 lg:pr-9">
//             <div className="flex items-center gap-3">
//               <img
//                 src={LOGO_SRC}
//                 alt={`${HOSPITAL.name} logo`}
//                 className="h-12 w-12 shrink-0 object-contain"
//               />
//               <div>
//                 <h1 className="text-lg font-bold leading-tight text-[#0b5a3c]">{HOSPITAL.name}</h1>
//                 <p className="text-[11px] font-medium text-[#0b5a3c]">{HOSPITAL.tagline}</p>
//               </div>
//             </div>
//             <div className="mt-2 h-[3px] w-14 rounded bg-gradient-to-r from-[#17a862] to-transparent" />

//             <h2 className="mt-5 text-lg font-bold text-[#0b5a3c]">Login to Your Account</h2>
//             <p className="mt-0.5 text-xs text-[#2f6a56]">Enter your credentials to continue</p>

//             <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
//               <label className="login-field flex items-center gap-2.5 rounded-full border border-[#9fd5bd] bg-white/70 px-4 py-2 transition">
//                 <Mail size={16} className="text-[#0b5a3c]" />
//                 <input
//                   type="text"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Email Address"
//                   autoComplete="username"
//                   className="w-full bg-transparent text-xs text-[#0b5a3c] outline-none placeholder:text-[#6f8f84]"
//                 />
//               </label>

//               <label className="login-field flex items-center gap-2.5 rounded-full border border-[#9fd5bd] bg-white/70 px-4 py-2 transition">
//                 <Lock size={16} className="text-[#0b5a3c]" />
//                 <input
//                   type={show ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Password"
//                   autoComplete="current-password"
//                   className="w-full bg-transparent text-xs text-[#0b5a3c] outline-none placeholder:text-[#6f8f84]"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShow((s) => !s)}
//                   aria-label={show ? "Hide password" : "Show password"}
//                   className="text-[#4b6b61] hover:text-[#0b5a3c]"
//                 >
//                   {show ? <Eye size={16} /> : <EyeOff size={16} />}
//                 </button>
//               </label>

//               <button
//                 type="submit"
//                 className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#12a460] to-[#08744a] py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(15,138,82,0.35)] transition hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#17a862]/40"
//               >
//                 <LogIn size={16} /> Login
//               </button>
//             </form>

//             <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#4b6b61]">
//               <ShieldCheck size={14} className="text-[#0f8a52]" /> Secure Login
//             </p>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { ORGANIZATIONS } from "../data/dummyData";

// 👉 Change these to your real file names (files must be inside the /public folder)
const IMAGE_SRC = "/login-illustration.png";
const LOGO_SRC = "/logo.png";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [organizationId, setOrganizationId] = useState(ORGANIZATIONS[0].id);
  const [remember] = useState(true);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  // Demo login: any email / password (even empty) is accepted.
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, remember, organizationId);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fdf9e9] px-4 py-10">
      <style>{`
        @property --glow-angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
        @keyframes glow-spin { to { --glow-angle: 360deg; } }

        .glow-card,
        .glow-card::before {
          background: conic-gradient(from var(--glow-angle),
            #25d366, #d9f99d 18%, #0f8a52 40%, #86efac 62%, #25d366 80%, #bbf7d0);
          animation: glow-spin 7s linear infinite;
        }
        .glow-card { position: relative; isolation: isolate; }
        .glow-card::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: inherit;
          filter: blur(16px);
          opacity: 0.6;
          z-index: -1;
        }
        .login-field:focus-within {
          border-color: #17a862;
          box-shadow: 0 0 0 3px rgba(23, 168, 98, 0.18), 0 0 14px rgba(37, 211, 102, 0.35);
        }
        @media (prefers-reduced-motion: reduce) {
          .glow-card, .glow-card::before { animation: none; }
        }
      `}</style>

      {/* soft background wash */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.9),rgba(253,249,233,0))]" />

      {/* Glowing card */}
      <div className="glow-card w-full max-w-[400px] rounded-[30px] p-[2px] lg:max-w-[760px]">
        <div className="flex min-h-[440px] overflow-hidden rounded-[28px] bg-[#fdfbf2]">
          {/* LEFT: image with smooth semicircle right edge (hidden on mobile) */}
          <div className="hidden w-[50%] shrink-0 lg:block">
            <img
              src={IMAGE_SRC}
              alt="City Care Hospital"
              className="h-full w-full rounded-r-full object-cover object-center"
            />
          </div>

          {/* RIGHT: compact form */}
          <section className="flex flex-1 flex-col justify-center px-7 py-8 lg:pl-5 lg:pr-9">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_SRC}
                alt="Organization logo"
                className="h-12 w-12 shrink-0 object-contain"
              />
              <div>
                <h1 className="text-lg font-bold leading-tight text-[#0b5a3c]">WhatsApp Messaging</h1>
                <p className="text-[11px] font-medium text-[#0b5a3c]">One platform. Multiple organizations.</p>
              </div>
            </div>
            <div className="mt-2 h-[3px] w-14 rounded bg-gradient-to-r from-[#17a862] to-transparent" />

            <h2 className="mt-5 text-lg font-bold text-[#0b5a3c]">Login to Your Account</h2>
            <p className="mt-0.5 text-xs text-[#2f6a56]">Enter your credentials to continue</p>

            <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
              <label className="block space-y-1.5 text-xs font-semibold text-[#0b5a3c]">
                Select organization
                <select value={organizationId} onChange={(e) => setOrganizationId(e.target.value)} className="login-field w-full rounded-full border border-[#9fd5bd] bg-white/90 px-4 py-2.5 text-xs font-medium text-[#0b5a3c] outline-none transition">
                  {ORGANIZATIONS.map((org) => <option key={org.id} value={org.id}>{org.name} · {org.type}</option>)}
                </select>
              </label>

              <label className="login-field flex items-center gap-2.5 rounded-full border border-[#9fd5bd] bg-white/70 px-4 py-2 transition">
                <Mail size={16} className="text-[#0b5a3c]" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  autoComplete="username"
                  className="w-full bg-transparent text-xs text-[#0b5a3c] outline-none placeholder:text-[#6f8f84]"
                />
              </label>

              <label className="login-field flex items-center gap-2.5 rounded-full border border-[#9fd5bd] bg-white/70 px-4 py-2 transition">
                <Lock size={16} className="text-[#0b5a3c]" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full bg-transparent text-xs text-[#0b5a3c] outline-none placeholder:text-[#6f8f84]"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="text-[#4b6b61] hover:text-[#0b5a3c]"
                >
                  {show ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </label>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#12a460] to-[#08744a] py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(15,138,82,0.35)] transition hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#17a862]/40"
              >
                <LogIn size={16} /> Login
              </button>
            </form>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#4b6b61]">
              <ShieldCheck size={14} className="text-[#0f8a52]" /> Secure Login
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}