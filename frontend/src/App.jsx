
import { useState } from "react";
import ResponseList from "./pages/ResponseList";
import ResponseIntake from "./pages/ResponseIntake";
import SummaryReport from "./pages/SummaryReport";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("list");
  const [refreshKey, setRefreshKey] = useState(0);

  function handleSuccess() {
    setRefreshKey((value) => value + 1);
    setScreen("list");
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <div>	
          <h1>SMART CRM — MEKONG MOBILE</h1>
          <p>Khảo sát hài lòng khách hàng CSAT/NPS</p>
        </div>

        <nav className="app-navigation">
          <button type="button" onClick={() => setScreen("list")}>
            Danh sách phản hồi
          </button>
          <button type="button" onClick={() => setScreen("survey")}>
            Gửi phản hồi
          </button>
          <button type="button" onClick={() => setScreen("report")}>
            Báo cáo CSAT/NPS
          </button>
        </nav>
      </header>

      {screen === "list" && <ResponseList key={refreshKey} />}

      {screen === "survey" && (
        <ResponseIntake
          onBack={() => setScreen("list")}
          onSuccess={handleSuccess}
        />
      )}

      {screen === "report" && (
        <SummaryReport onBack={() => setScreen("list")} />
      )}

      <footer className="app-footer">
        Smart CRM L8 — Khảo sát hài lòng sau bảo hành
      </footer>
    </main>
  );
}
