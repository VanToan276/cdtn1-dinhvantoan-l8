import { useState } from "react";
import ResponseList from "./pages/ResponseList";
import ResponseIntake from "./pages/ResponseIntake";
import SummaryReport from "./pages/SummaryReport";
import "./App.css";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "123123";

const adminPages = [
  {
    id: "list",
    number: "01",
    title: "Danh sách phản hồi",
    description: "Theo dõi và xem chi tiết phản hồi khảo sát của khách hàng.",
    icon: "▤",
  },
  {
    id: "survey",
    number: "02",
    title: "Gửi phản hồi",
    description: "Ghi nhận đánh giá CSAT, NPS và ý kiến của khách hàng.",
    icon: "✎",
  },
  {
    id: "report",
    number: "03",
    title: "Báo cáo CSAT/NPS",
    description: "Xem tổng quan mức độ hài lòng và chỉ số khách hàng.",
    icon: "▥",
  },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [screen, setScreen] = useState("home");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  function handleLogin(event) {
    event.preventDefault();
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setScreen("home");
      setLoginError("");
      setPassword("");
      return;
    }
    setLoginError("Email hoặc mật khẩu không chính xác. Vui lòng thử lại.");
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setScreen("home");
    setEmail("");
    setPassword("");
    setLoginError("");
  }

  function handleSuccess() {
    setRefreshKey((value) => value + 1);
    setScreen("list");
  }

  if (!isAuthenticated) {
    return (
      <main className="auth-shell">
        <section className="login-card">
          <div className="login-brand-mark">M</div>
          <p className="eyebrow">MEKONG MOBILE · SMART CRM L8</p>
          <h1>Chào mừng trở lại</h1>
          <p className="login-subtitle">Đăng nhập tài khoản quản trị để tiếp tục.</p>

          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="admin-email">Email quản trị</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="admin-password">Mật khẩu</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            {loginError && <p className="login-error" role="alert">{loginError}</p>}
            <button className="login-submit" type="submit">Đăng nhập quản trị <span>→</span></button>
          </form>
          <p className="login-footnote">Hệ thống quản lý khảo sát hài lòng khách hàng</p>
        </section>
        <div className="auth-decoration auth-decoration-one" />
        <div className="auth-decoration auth-decoration-two" />
      </main>
    );
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="app-header-top">
          <div>
            <p className="admin-kicker">KHU VỰC QUẢN TRỊ</p>
            <h1>SMART CRM — MEKONG MOBILE</h1>
            <p>Khảo sát hài lòng khách hàng CSAT/NPS</p>
          </div>
          <div className="admin-account">
            <span className="admin-avatar">A</span>
            <span className="admin-email">{ADMIN_EMAIL}</span>
            <button type="button" className="logout-button" onClick={handleLogout}>Đăng xuất</button>
          </div>
        </div>
        {screen !== "home" && (
          <nav className="app-navigation">
            <button type="button" onClick={() => setScreen("home")}>← Chọn trang khác</button>
            {adminPages.map((page) => (
              <button
                type="button"
                className={screen === page.id ? "nav-active" : ""}
                key={page.id}
                onClick={() => setScreen(page.id)}
              >
                {page.title}
              </button>
            ))}
          </nav>
        )}
      </header>

      {screen === "home" && (
        <section className="admin-home">
          <div className="admin-home-heading">
            <div>
              <p className="eyebrow">ADMIN DASHBOARD</p>
              <h2>Xin chào, Quản trị viên!</h2>
              <p>Vui lòng chọn chức năng bạn muốn truy cập.</p>
            </div>
            <span className="dashboard-status"><i /> Hệ thống sẵn sàng</span>
          </div>
          <div className="admin-page-grid">
            {adminPages.map((page) => (
              <button className="admin-page-card" type="button" key={page.id} onClick={() => setScreen(page.id)}>
                <span className="page-card-top"><span className="page-card-icon">{page.icon}</span><span className="page-card-number">{page.number}</span></span>
                <span className="page-card-title">{page.title}</span>
                <span className="page-card-description">{page.description}</span>
                <span className="page-card-action">Truy cập chức năng <b>→</b></span>
              </button>
            ))}
          </div>
        </section>
      )}

      {screen === "list" && <ResponseList key={refreshKey} />}
      {screen === "survey" && (
        <ResponseIntake onBack={() => setScreen("home")} onSuccess={handleSuccess} />
      )}
      {screen === "report" && <SummaryReport onBack={() => setScreen("home")} />}

      <footer className="app-footer">Smart CRM L8 — Khảo sát hài lòng sau bảo hành</footer>
    </main>
  );
}
