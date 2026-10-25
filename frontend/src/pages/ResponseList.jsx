
import { useEffect, useMemo, useState } from "react";
import DataState from "../components/DataState";
import {
  getSurveyResponses,
  getSurveyResponseById,
} from "../services/surveyResponseApi";

const PAGE_SIZE = 3;

function getDateValue(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString("vi-VN");
}

export default function ResponseList() {
  const [responses, setResponses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Bộ lọc
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [selectedTechnician, setSelectedTechnician] = useState("");

  // Bộ lọc đã áp dụng
  const [appliedFilters, setAppliedFilters] = useState({
    fromDate: "",
    toDate: "",
    center: "",
    technician: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Trạng thái xem chi tiết
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  // Tải danh sách phản hồi từ API
  async function loadResponses() {
    setLoading(true);
    setError("");

    try {
      const result = await getSurveyResponses();

      if (!Array.isArray(result?.data)) {
        throw new Error(
          "Dữ liệu API danh sách không đúng định dạng mong đợi."
        );
      }

      setResponses(result.data);
      setCurrentPage(1);
    } catch (err) {
      setResponses([]);
      setError(
        err.message || "Không thể tải danh sách phản hồi."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadResponses();
  }, []);

  // Danh sách trung tâm lấy từ dữ liệu API
  const centers = useMemo(() => {
    return [
      ...new Set(
        responses
          .map((item) => item.center_name)
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b, "vi"));
  }, [responses]);

  // Danh sách kỹ thuật viên lấy từ dữ liệu API
  const technicians = useMemo(() => {
    return [
      ...new Set(
        responses
          .map((item) => item.technician_name)
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b, "vi"));
  }, [responses]);

  // Lọc dữ liệu đã nhận từ backend
  const filteredResponses = useMemo(() => {
    return responses.filter((item) => {
      const responseDate = getDateValue(item.responded_at);

      if (
        appliedFilters.fromDate &&
        (!responseDate ||
          responseDate < appliedFilters.fromDate)
      ) {
        return false;
      }

      if (
        appliedFilters.toDate &&
        (!responseDate ||
          responseDate > appliedFilters.toDate)
      ) {
        return false;
      }

      if (
        appliedFilters.center &&
        item.center_name !== appliedFilters.center
      ) {
        return false;
      }

      if (
        appliedFilters.technician &&
        item.technician_name !== appliedFilters.technician
      ) {
        return false;
      }

      return true;
    });
  }, [responses, appliedFilters]);

  // Phân trang
  const totalPages = Math.max(
    1,
    Math.ceil(filteredResponses.length / PAGE_SIZE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedResponses = filteredResponses.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  // Áp dụng bộ lọc
  function handleSearch(event) {
    event.preventDefault();

    if (fromDate && toDate && fromDate > toDate) {
      setError(
        "Ngày bắt đầu không được sau ngày kết thúc."
      );
      return;
    }

    setError("");

    setAppliedFilters({
      fromDate,
      toDate,
      center: selectedCenter,
      technician: selectedTechnician,
    });

    setCurrentPage(1);
  }

  // Xóa bộ lọc
  function handleReset() {
    setFromDate("");
    setToDate("");
    setSelectedCenter("");
    setSelectedTechnician("");

    setAppliedFilters({
      fromDate: "",
      toDate: "",
      center: "",
      technician: "",
    });

    setCurrentPage(1);
    setError("");
  }

  // Tải chi tiết từ API
  async function handleViewDetail(responseId) {
    setSelectedResponse(null);
    setDetailError("");
    setDetailLoading(true);

    try {
      const result = await getSurveyResponseById(responseId);

      if (!result?.data) {
        throw new Error(
          "Không tìm thấy dữ liệu phản hồi."
        );
      }

      setSelectedResponse(result.data);
    } catch (err) {
      setDetailError(
        err.message || "Không thể tải chi tiết phản hồi."
      );
    } finally {
      setDetailLoading(false);
    }
  }

  // Đóng cửa sổ chi tiết
  function handleCloseDetail() {
    setSelectedResponse(null);
    setDetailError("");
    setDetailLoading(false);
  }

  // Chuyển trang
  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  return (
    <section className="response-list-page">
      <div className="response-list-heading">
        <h2>DANH SÁCH PHẢN HỒI KHẢO SÁT</h2>

        <p>
          Quản lý phản hồi hài lòng khách hàng CSAT/NPS
        </p>
      </div>

      <h3 className="filter-title">
        Bộ lọc phản hồi
      </h3>

      <form
        className="response-filter"
        onSubmit={handleSearch}
      >
        <label>
          Từ ngày
          <input
            type="date"
            value={fromDate}
            onChange={(event) =>
              setFromDate(event.target.value)
            }
          />
        </label>

        <label>
          Đến ngày
          <input
            type="date"
            value={toDate}
            onChange={(event) =>
              setToDate(event.target.value)
            }
          />
        </label>

        <label>
          Trung tâm
          <select
            value={selectedCenter}
            onChange={(event) =>
              setSelectedCenter(event.target.value)
            }
          >
            <option value="">Tất cả trung tâm</option>

            {centers.map((center) => (
              <option key={center} value={center}>
                {center}
              </option>
            ))}
          </select>
        </label>

        <label>
          Kỹ thuật viên
          <select
            value={selectedTechnician}
            onChange={(event) =>
              setSelectedTechnician(event.target.value)
            }
          >
            <option value="">Tất cả kỹ thuật viên</option>

            {technicians.map((technician) => (
              <option key={technician} value={technician}>
                {technician}
              </option>
            ))}
          </select>
        </label>

        <div className="filter-actions">
          <button type="submit">
            Tìm kiếm
          </button>

          <button
            type="button"
            onClick={handleReset}
          >
            Xóa bộ lọc
          </button>

          <button
            type="button"
            onClick={loadResponses}
            disabled={loading}
          >
            Tải lại dữ liệu
          </button>
        </div>
      </form>

      <div className="response-table-wrapper">
        <DataState
          loading={loading}
          error={error}
          isEmpty={
            !loading &&
            !error &&
            filteredResponses.length === 0
          }
        >
          <>
            <table className="response-table">
              <thead>
                <tr>
                  <th>Mã phiếu bảo hành</th>
                  <th>Trung tâm</th>
                  <th>Kỹ thuật viên</th>
                  <th>CSAT</th>
                  <th>NPS</th>
                  <th>Nhận xét</th>
                  <th>Thời gian phản hồi</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {paginatedResponses.map((item) => (
                  <tr key={item.response_id}>
                    <td>{item.ticket_code || "—"}</td>

                    <td>{item.center_name || "—"}</td>

                    <td>{item.technician_name || "—"}</td>

                    <td>
                      {item.csat_score ?? "—"}/5
                    </td>

                    <td>
                      {item.nps_score ?? "—"}/10
                    </td>

                    <td>
                      {item.comment || "Không có nhận xét"}
                    </td>

                    <td>
                      {formatDate(item.responded_at)}
                    </td>

                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          handleViewDetail(item.response_id)
                        }
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="response-pagination">
              <button
                type="button"
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage <= 1}
              >
                Trước
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={
                    page === safePage
                      ? "active-page"
                      : ""
                  }
                  aria-current={
                    page === safePage ? "page" : undefined
                  }
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage >= totalPages}
              >
                Sau
              </button>
            </div>

            <p className="response-count">
              Hiển thị {paginatedResponses.length} trong{" "}
              {filteredResponses.length} phản hồi.
            </p>
          </>
        </DataState>
      </div>

      <p className="response-list-note">
        Dữ liệu được tải từ API backend.
      </p>

      {/* Cửa sổ xem chi tiết phản hồi */}
      {(detailLoading ||
        detailError ||
        selectedResponse) && (
        <div className="detail-overlay">
          <section
            className="detail-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
          >
            <div className="detail-header">
              <h3 id="detail-title">
                CHI TIẾT PHẢN HỒI
              </h3>

              <button
                type="button"
                onClick={handleCloseDetail}
              >
                Đóng
              </button>
            </div>

            {detailLoading && (
              <p role="status">
                Đang tải chi tiết...
              </p>
            )}

            {detailError && (
              <p
                role="alert"
                className="error-message"
              >
                {detailError}
              </p>
            )}

            {selectedResponse && (
              <dl className="detail-fields">
                <dt>Mã phiếu bảo hành</dt>
                <dd>
                  {selectedResponse.ticket_code || "—"}
                </dd>

                <dt>Trung tâm</dt>
                <dd>
                  {selectedResponse.center_name || "—"}
                </dd>

                <dt>Kỹ thuật viên</dt>
                <dd>
                  {selectedResponse.technician_name || "—"}
                </dd>

                <dt>Điểm CSAT</dt>
                <dd>
                  {selectedResponse.csat_score ?? "—"}/5
                </dd>

                <dt>Điểm NPS</dt>
                <dd>
                  {selectedResponse.nps_score ?? "—"}/10
                </dd>

                <dt>Nhận xét</dt>
                <dd>
                  {selectedResponse.comment ||
                    "Không có nhận xét"}
                </dd>

                <dt>Thời gian phản hồi</dt>
                <dd>
                  {formatDate(
                    selectedResponse.responded_at
                  )}
                </dd>
              </dl>
            )}
          </section>
        </div>
      )}
    </section>
  );
}
