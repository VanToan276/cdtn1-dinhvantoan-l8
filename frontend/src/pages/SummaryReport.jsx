
import { useEffect, useState } from "react";
import DataState from "../components/DataState";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:3000/api";

async function fetchReport(fromDate, toDate) {
  const params = new URLSearchParams();

  if (fromDate) params.set("fromDate", fromDate);
  if (toDate) params.set("toDate", toDate);

  const response = await fetch(
    `${API_BASE_URL}/metrics/csat-nps?${params.toString()}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Không tải được báo cáo."
    );
  }

  return result.data;
}

export default function CsatNpsReport({ onBack }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function loadReport() {
    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const data = await fetchReport(fromDate, toDate);
      setReport(data);
    } catch (err) {
      setReport(null);
      setError(err.message || "Không tải được báo cáo.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReport();
  }, []);

  const centers = report?.byCenter ?? [];
  const trend = report?.trend ?? [];

  return (
    <section className="report-page">
      <button type="button" onClick={onBack}>
        Quay lại danh sách
      </button>

      <h2>THÔNG TIN PHẢN HỒI KHẢO SÁT</h2>

      <form
        className="report-filter"
        onSubmit={(event) => {
          event.preventDefault();
          loadReport();
        }}
      >
        <label>
          Khoảng thời gian

          <div className="date-range">
            <input
              type="date"
              aria-label="Từ ngày"
              value={fromDate}
              onChange={(event) =>
                setFromDate(event.target.value)
              }
            />

            <input
              type="date"
              aria-label="Đến ngày"
              value={toDate}
              onChange={(event) =>
                setToDate(event.target.value)
              }
            />
          </div>
        </label>

        <button type="submit" disabled={loading}>
          Tìm kiếm
        </button>
      </form>

      <DataState
        loading={loading}
        error={error}
        isEmpty={
          searched &&
          !loading &&
          !error &&
          (!report || Number(report.totalResponses) === 0)
        }
      >
        {report && (
          <>
            <div className="kpi-grid">
              <article className="kpi-card">
                <h3>Tổng phản hồi</h3>
                <p>{report.totalResponses ?? 0}</p>
              </article>

              <article className="kpi-card">
                <h3>CSAT</h3>
                <p>
                  {report.csat ?? 0}
                  {report.csatUnit ?? "%"}
                </p>
              </article>

              <article className="kpi-card">
                <h3>NPS</h3>
                <p>{report.nps ?? 0}</p>
              </article>

              <article className="kpi-card">
                <h3>Số trung tâm</h3>
                <p>{report.centerCount ?? 0}</p>
              </article>
            </div>

            <h3>Xu hướng CSAT/NPS theo thời gian</h3>

            {trend.length === 0 ? (
              <p>Chưa có dữ liệu xu hướng.</p>
            ) : (
              <div className="trend-table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Thời gian</th>
                      <th>CSAT</th>
                      <th>NPS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {trend.map((item, index) => (
                      <tr key={item.period ?? index}>
                        <td>{item.period}</td>
                        <td>{item.csat}</td>
                        <td>{item.nps}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <h3>TỔNG HỢP THEO TRUNG TÂM</h3>

            <div className="trend-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Trung tâm</th>
                    <th>Số phản hồi</th>
                    <th>CSAT</th>
                    <th>NPS</th>
                  </tr>
                </thead>

                <tbody>
                  {centers.map((center, index) => (
                    <tr key={center.centerId ?? index}>
                      <td>{center.centerName}</td>
                      <td>{center.totalResponses}</td>
                      <td>{center.csat}</td>
                      <td>{center.nps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </DataState>
    </section>
  );
}
