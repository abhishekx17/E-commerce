import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "context/ShopContext";
import { Link } from "react-router-dom";

const T = {
  primary:  "#1A1A1A",
  accent:   "#8C7355",
  accentL:  "#A08560",
  border:   "#EBEBEB",
  borderM:  "#E0DDD8",
  bg:       "#FAF9F7",
  bgCard:   "#FFFFFF",
  textSub:  "#888888",
  textMid:  "#555555",
};

const css = {
  page: {
    minHeight: "100vh",
    background: "#FAF9F7",
    paddingTop: "48px",
    paddingBottom: "80px",
    fontFamily: "'Outfit', sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 20px",
  },
  card: {
    background: "#FFFFFF",
    border: "1px solid #EBEBEB",
    borderRadius: "16px",
    overflow: "hidden",
  },
};


const Icon = {
  user: (s=20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  lock: (s=20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="11" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>
    </svg>
  ),
  orders: (s=20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="1"/>
      <path d="M9 12h6M9 16h4"/>
    </svg>
  ),
  cart: (s=20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  ),
  logout: (s=20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  pen: (s=15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  check: (s=15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  x: (s=15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  shield: (s=17) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  chevRight: (s=15) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  star: (s=12) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};


const Spinner = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.35)" strokeWidth="3"/>
    <path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
);


const Field = ({ label, type = "text", value, onChange, placeholder, required, disabled, note }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
    <label style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: T.textSub }}>
      {label}
    </label>
    <input
      type={type}
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      style={{
        height: "44px",
        padding: "0 14px",
        background: disabled ? "#F5F4F2" : "#FFFFFF",
        border: "1px solid #E0DDD8",
        borderRadius: "8px",
        fontSize: "14px",
        color: disabled ? "#ABABAB" : T.primary,
        outline: "none",
        transition: "border 0.18s, box-shadow 0.18s",
        cursor: disabled ? "not-allowed" : "text",
        fontFamily: "'Outfit', sans-serif",
      }}
      onFocus={e => { if (!disabled) { e.target.style.borderColor = T.accent; e.target.style.boxShadow = `0 0 0 3px rgba(140,115,85,0.10)`; }}}
      onBlur={e  => { e.target.style.borderColor = "#E0DDD8"; e.target.style.boxShadow = "none"; }}
    />
    {note && <p style={{ fontSize: "11px", color: T.textSub, marginTop: "2px" }}>{note}</p>}
  </div>
);


const PrimaryBtn = ({ children, type = "button", onClick, loading, full }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={loading}
    style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "7px",
      padding: "0 22px", height: "42px",
      background: loading ? "#555" : T.primary,
      border: "none", borderRadius: "8px",
      fontSize: "12px", fontWeight: 500,
      letterSpacing: "0.12em", textTransform: "uppercase",
      color: "#fff",
      cursor: loading ? "not-allowed" : "pointer",
      transition: "background 0.25s",
      width: full ? "100%" : "auto",
      fontFamily: "'Outfit', sans-serif",
    }}
    onMouseEnter={e => { if (!loading) e.currentTarget.style.background = T.accent; }}
    onMouseLeave={e => { if (!loading) e.currentTarget.style.background = T.primary; }}
  >
    {loading ? <Spinner /> : children}
  </button>
);

const GhostBtn = ({ children, type = "button", onClick }) => (
  <button
    type={type}
    onClick={onClick}
    style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "7px",
      padding: "0 18px", height: "42px",
      background: "transparent",
      border: "1px solid #E0DDD8",
      borderRadius: "8px", fontSize: "12px", fontWeight: 500,
      letterSpacing: "0.12em", textTransform: "uppercase",
      color: T.textSub, cursor: "pointer", transition: "all 0.2s",
      fontFamily: "'Outfit', sans-serif",
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = T.primary; e.currentTarget.style.color = T.primary; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "#E0DDD8"; e.currentTarget.style.color = T.textSub; }}
  >
    {children}
  </button>
);

const DangerBtn = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "7px",
      padding: "0 18px", height: "42px",
      background: "transparent", border: "1px solid #E8D5D5",
      borderRadius: "8px", fontSize: "12px", fontWeight: 500,
      letterSpacing: "0.12em", textTransform: "uppercase",
      color: "#C0655A", cursor: "pointer", transition: "all 0.2s",
      width: "100%", fontFamily: "'Outfit', sans-serif",
    }}
    onMouseEnter={e => { e.currentTarget.style.background = "#FEF2F2"; e.currentTarget.style.borderColor = "#FECACA"; e.currentTarget.style.color = "#B91C1C"; }}
    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#E8D5D5"; e.currentTarget.style.color = "#C0655A"; }}
  >
    {children}
  </button>
);

const NavItem = ({ icon, label, active, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "11px",
        padding: "10px 14px", borderRadius: "8px",
        fontSize: "13px", fontWeight: active ? 600 : 400,
        cursor: "pointer", transition: "all 0.18s", width: "100%", textAlign: "left",
        border: "none",
        background: active ? "#F5F4F2" : hovered ? "#FAF9F7" : "transparent",
        color: active ? T.primary : hovered ? T.primary : T.textSub,
        fontFamily: "'Outfit', sans-serif",
        letterSpacing: "0.01em",
      }}
    >
      <span style={{ color: active ? T.accent : T.textSub, transition: "color 0.18s", flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {active && (
        <span style={{ color: T.accent, opacity: 0.7 }}>{Icon.chevRight()}</span>
      )}
    </button>
  );
};

const NavLink = ({ icon, label, to }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "11px",
        padding: "10px 14px", borderRadius: "8px",
        fontSize: "13px", fontWeight: 400, cursor: "pointer",
        transition: "all 0.18s", width: "100%", textAlign: "left",
        background: hovered ? "#FAF9F7" : "transparent",
        color: hovered ? T.primary : T.textSub,
        textDecoration: "none",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <span style={{ color: hovered ? T.accent : T.textSub, transition: "color 0.18s", flexShrink: 0 }}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
};


const PwStrength = ({ password }) => {
  const score = !password ? 0 : Math.min(4, Math.floor(password.length / 3));
  const configs = [
    { color: "#E5E5E5" },
    { color: "#ef4444", label: "Weak" },
    { color: "#f97316", label: "Fair" },
    { color: "#eab308", label: "Good" },
    { color: "#22c55e", label: "Strong" },
  ];
  return (
    <div style={{ marginTop: "6px" }}>
      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
        {[1, 2, 3, 4].map(n => (
          <div key={n} style={{
            height: "3px", flex: 1, borderRadius: "99px",
            background: n <= score ? configs[score].color : "#EBEBEB",
            transition: "background 0.3s",
          }} />
        ))}
      </div>
      {score > 0 && <p style={{ fontSize: "11px", color: configs[score].color, fontWeight: 500 }}>{configs[score].label}</p>}
    </div>
  );
};


const Profile = () => {
  const { backendUrl, token, navigate, setToken, setCartItems } = useContext(ShopContext);

  const [tab, setTab]           = useState("profile");
  const [user, setUser]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [stats, setStats]       = useState({ total: 0, delivered: 0, pending: 0 });

  /* profile edit */
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [saving, setSaving]     = useState(false);

  /* password */
  const [curPw, setCurPw]       = useState("");
  const [newPw, setNewPw]       = useState("");
  const [conPw, setConPw]       = useState("");
  const [savingPw, setSavingPw] = useState(false);

  /* ── redirect ── */
  useEffect(() => {
    if (!token && !localStorage.getItem("token")) navigate("/login");
  }, [token]);

  /* ── fetch profile ── */
  useEffect(() => {
    if (!token) return;
    axios.post(backendUrl + "/api/user/profile", {}, { headers: { token } })
      .then(({ data }) => {
        if (data.success) { setUser(data.user); setEditName(data.user.name); }
        else toast.error(data.message);
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, [token]);

  /* ── fetch order stats ── */
  useEffect(() => {
    if (!token) return;
    axios.post(backendUrl + "/api/order/userorders", {}, { headers: { token } })
      .then(({ data }) => {
        if (data.success) {
          const o = data.orders;
          setStats({
            total: o.length,
            delivered: o.filter(x => x.status === "Delivered").length,
            pending: o.filter(x => x.status !== "Delivered").length,
          });
        }
      }).catch(() => {});
  }, [token]);

  /* ── save name ── */
  const saveName = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await axios.post(backendUrl + "/api/user/update-profile", { name: editName }, { headers: { token } });
      if (data.success) { setUser(p => ({ ...p, name: editName.trim() })); toast.success("Name updated"); setEditMode(false); }
      else toast.error(data.message);
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  };

  /* ── change password ── */
  const changePw = async (e) => {
    e.preventDefault();
    if (newPw !== conPw) return toast.error("Passwords don't match");
    setSavingPw(true);
    try {
      const { data } = await axios.post(backendUrl + "/api/user/change-password", { currentPassword: curPw, newPassword: newPw }, { headers: { token } });
      if (data.success) { toast.success("Password changed"); setCurPw(""); setNewPw(""); setConPw(""); }
      else toast.error(data.message);
    } catch { toast.error("Failed to change password"); }
    finally { setSavingPw(false); }
  };

  /* ── logout ── */
  const logout = () => { localStorage.removeItem("token"); setToken(""); setCartItems({}); navigate("/login"); };

  /* initials */
  const initials = user?.name
    ? user.name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div style={{ ...css.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@keyframes pulse{0%,100%{opacity:.3}50%{opacity:.7}}`}</style>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#EBEBEB", animation: "pulse 1.4s infinite" }} />
          <div style={{ width: "130px", height: "10px", borderRadius: "6px", background: "#EBEBEB", animation: "pulse 1.4s infinite 0.15s" }} />
          <div style={{ width: "180px", height: "8px", borderRadius: "6px", background: "#F0EFED", animation: "pulse 1.4s infinite 0.3s" }} />
        </div>
      </div>
    );
  }

  return (
    <div style={css.page}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:.7} }
        body { background: #FAF9F7 !important; }
        .prof-layout { display:flex; gap:24px; align-items:flex-start; }
        .prof-sidebar { width:268px; flex-shrink:0; }
        .prof-main { flex:1; min-width:0; }
        @media(max-width:900px){
          .prof-layout{flex-direction:column;}
          .prof-sidebar{width:100%;}
        }
        @media(max-width:600px){
          .info-grid{grid-template-columns:1fr !important;}
          .pw-grid{grid-template-columns:1fr !important;}
          .edit-grid{grid-template-columns:1fr !important;}
        }
        input::placeholder{color:#BBBBBB !important;}
      `}</style>

      <div style={css.container}>

        {/* ── Page Header ── */}
        <div style={{ marginBottom: "32px", animation: "fadeIn 0.35s ease" }}>
          <div style={{ height: "1px", background: "linear-gradient(to right, #1A1A1A18, #8C735520, transparent)", marginBottom: "28px" }} />
          <h1 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 600, color: T.primary, letterSpacing: "-0.01em", lineHeight: 1.2, margin: "0 0 6px" }}>
            My Account
          </h1>
          <p style={{ color: T.textSub, fontSize: "13px", margin: 0, letterSpacing: "0.01em" }}>
            Manage your profile, password and preferences
          </p>
        </div>

        <div className="prof-layout">

          {/* ════════════════════ SIDEBAR ════════════════════ */}
          <aside className="prof-sidebar">
            <div style={{ ...css.card, animation: "fadeIn 0.4s ease" }}>

              {/* Avatar section */}
              <div style={{
                padding: "28px 20px 20px",
                borderBottom: "1px solid #EBEBEB",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "14px",
              }}>
                {/* Avatar circle */}
                <div style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  background: T.primary,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px", fontWeight: 600, color: "#fff", letterSpacing: "1px",
                  userSelect: "none", flexShrink: 0,
                }}>
                  {initials}
                </div>

                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: T.primary, margin: "0 0 3px" }}>{user?.name}</p>
                  <p style={{ fontSize: "12px", color: T.textSub, wordBreak: "break-all", margin: 0 }}>{user?.email}</p>
                </div>

                {/* Member badge */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  padding: "4px 12px",
                  background: "#F5F4F2",
                  border: "1px solid #E0DDD8",
                  borderRadius: "99px",
                  color: T.accent, fontSize: "10px", fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                }}>
                  {Icon.star(10)} Member
                </div>
              </div>

              {/* Stats */}
              <div style={{ padding: "16px", borderBottom: "1px solid #EBEBEB" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                  {[
                    { value: stats.total,     label: "Orders",  color: T.primary },
                    { value: stats.delivered, label: "Done",    color: "#22c55e" },
                    { value: stats.pending,   label: "Active",  color: "#f97316" },
                  ].map(({ value, label, color }) => (
                    <div key={label} style={{
                      textAlign: "center", padding: "12px 6px",
                      background: "#FAF9F7",
                      borderRadius: "10px",
                      border: "1px solid #EBEBEB",
                    }}>
                      <p style={{ fontSize: "22px", fontWeight: 700, color, letterSpacing: "-1px", margin: "0 0 2px" }}>{value}</p>
                      <p style={{ fontSize: "10px", color: T.textSub, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nav */}
              <div style={{ padding: "12px 10px 10px", display: "flex", flexDirection: "column", gap: "2px" }}>
                <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: T.textSub, fontWeight: 600, padding: "6px 6px 4px", margin: 0 }}>Account</p>
                <NavItem icon={Icon.user()} label="Personal Info" active={tab === "profile"} onClick={() => setTab("profile")} />
                <NavItem icon={Icon.lock()} label="Password" active={tab === "password"} onClick={() => setTab("password")} />

                <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: T.textSub, fontWeight: 600, padding: "12px 6px 4px", margin: 0 }}>Shopping</p>
                <NavLink icon={Icon.orders()} label="My Orders" to="/orders" />
                <NavLink icon={Icon.cart()} label="My Cart" to="/cart" />

                <div style={{ height: "1px", background: "#EBEBEB", margin: "12px 0 8px" }} />
                <DangerBtn onClick={logout}>
                  {Icon.logout(15)} Sign Out
                </DangerBtn>
                <div style={{ height: "8px" }} />
              </div>
            </div>
          </aside>

          {/* ════════════════════ MAIN CONTENT ════════════════════ */}
          <main className="prof-main">

            {/* ── Tab: Personal Info ── */}
            {tab === "profile" && (
              <div style={{ animation: "fadeIn 0.3s ease", display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* Info card */}
                <div style={css.card}>
                  {/* Card header */}
                  <div style={{
                    padding: "22px 28px 18px",
                    borderBottom: "1px solid #EBEBEB",
                    display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px",
                  }}>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: T.primary, margin: "0 0 3px" }}>Personal Information</p>
                      <p style={{ fontSize: "12px", color: T.textSub, margin: 0 }}>Manage your name and contact details</p>
                    </div>
                    {!editMode && (
                      <GhostBtn onClick={() => setEditMode(true)}>
                        {Icon.pen()} Edit
                      </GhostBtn>
                    )}
                  </div>

                  <div style={{ padding: "28px" }}>
                    {!editMode ? (
                      <div className="info-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #EBEBEB", borderRadius: "10px", overflow: "hidden" }}>
                        {[
                          { label: "Full Name", value: user?.name, icon: Icon.user(14) },
                          { label: "Email Address", value: user?.email, note: "Cannot be changed", icon: null },
                        ].map((item, i) => (
                          <div key={i} style={{
                            padding: "20px 24px",
                            borderRight: i === 0 ? "1px solid #EBEBEB" : "none",
                            background: i === 0 ? "#FAFAF9" : "#FFFFFF",
                          }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
                              <span style={{ color: T.accent }}>{item.icon}</span>
                              <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: T.textSub, margin: 0 }}>{item.label}</p>
                            </div>
                            <p style={{ fontSize: "14px", fontWeight: 600, color: T.primary, wordBreak: "break-all", margin: "0 0 3px" }}>{item.value}</p>
                            {item.note && <p style={{ fontSize: "11px", color: T.textSub, margin: 0 }}>{item.note}</p>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <form onSubmit={saveName} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                        <div className="edit-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                          <Field label="Full Name" value={editName} onChange={e => setEditName(e.target.value)} placeholder="Your full name" required />
                          <Field label="Email Address" value={user?.email} disabled note="Email cannot be changed" />
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <PrimaryBtn type="submit" loading={saving}>{Icon.check()} Save Changes</PrimaryBtn>
                          <GhostBtn onClick={() => { setEditMode(false); setEditName(user?.name); }}>Cancel</GhostBtn>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

                {/* Security status */}
                <div style={{ ...css.card, padding: "18px 24px", display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{
                    width: "38px", height: "38px", borderRadius: "8px", flexShrink: 0,
                    background: "#F5F4F2",
                    border: "1px solid #E0DDD8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: T.accent,
                  }}>
                    {Icon.shield()}
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: T.primary, margin: "0 0 2px" }}>Account Secured</p>
                    <p style={{ fontSize: "12px", color: T.textSub, margin: 0 }}>Your data and orders are safely stored and encrypted.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab: Password ── */}
            {tab === "password" && (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                <div style={css.card}>
                  {/* Card header */}
                  <div style={{
                    padding: "22px 28px 18px",
                    borderBottom: "1px solid #EBEBEB",
                    display: "flex", alignItems: "center", gap: "14px",
                  }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "8px", flexShrink: 0,
                      background: "#F5F4F2",
                      border: "1px solid #E0DDD8",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: T.accent,
                    }}>
                      {Icon.lock(18)}
                    </div>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: T.primary, margin: "0 0 3px" }}>Change Password</p>
                      <p style={{ fontSize: "12px", color: T.textSub, margin: 0 }}>Use a strong password with at least 8 characters</p>
                    </div>
                  </div>

                  <form onSubmit={changePw} style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "18px" }}>
                    <Field
                      label="Current Password"
                      type="password"
                      value={curPw}
                      onChange={e => setCurPw(e.target.value)}
                      placeholder="Enter your current password"
                      required
                    />
                    <div className="pw-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                      <div>
                        <Field label="New Password" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Min. 8 characters" required />
                        {newPw.length > 0 && <PwStrength password={newPw} />}
                      </div>
                      <div>
                        <Field label="Confirm New Password" type="password" value={conPw} onChange={e => setConPw(e.target.value)} placeholder="Repeat new password" required />
                        {conPw.length > 0 && (
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px", fontSize: "12px", fontWeight: 500, color: newPw === conPw ? "#22c55e" : "#ef4444" }}>
                            {newPw === conPw ? Icon.check() : Icon.x()}
                            {newPw === conPw ? "Passwords match" : "Passwords don't match"}
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
                      <PrimaryBtn type="submit" loading={savingPw}>{Icon.check()} Update Password</PrimaryBtn>
                      <GhostBtn onClick={() => { setCurPw(""); setNewPw(""); setConPw(""); }}>Clear</GhostBtn>
                    </div>
                  </form>

                  <div style={{
                    padding: "14px 28px",
                    borderTop: "1px solid #EBEBEB",
                    background: "#FAF9F7",
                    display: "flex", alignItems: "center", gap: "10px",
                  }}>
                    <span style={{ color: T.accent, flexShrink: 0 }}>{Icon.shield(15)}</span>
                    <p style={{ fontSize: "12px", color: T.textSub, margin: 0 }}>
                      After changing your password, you'll remain logged in on this device.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
