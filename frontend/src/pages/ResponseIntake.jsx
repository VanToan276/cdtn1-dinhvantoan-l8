
import { useState } from "react";
import DataState from "../components/DataState";
import {
  createSurveyResponse,
} from "../services/surveyResponseApi";

export default function ResponseDetail({ onBack, onSuccess }) {
  const [ticketCode, setTicketCode] = useState("");
  const [csatScore, setCsatScore] = useState("");
  const [npsScore, setNpsScore] = useState("");
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!ticketCode.trim()) {
      setError("Vui lòng nhập mã phiếu bảo hành.");
      return;
    }

    const csat = Number(csatScore);
    const nps = Number(npsScore);

    if (
      csatScore === "" ||
      !Number.isInteger(csat) ||
      csat < 1 ||
      csat > 5
    ) {
      setError("Vui lòng chọn điểm CSAT từ 1 đến 5.");
      return;
    }

    if (
      npsScore === "" ||
      !Number.isInteger(nps) ||
      nps < 0 ||
      nps > 10
    ) {
      setError("Vui lòng chọn điểm NPS từ 0 đến 10.");
      return;
    }

    setLoading(true);

    try {
      // API hiện tại nhận survey_id, không nhận ticket_code.
      // Chỉ gửi request sau khi backend hỗ trợ tra cứu mã phiếu
      // bảo hành và xác định survey_id tương ứng.
      const result = await createSurveyResponse({
        ticket_code: ticketCode.trim(),
        csat_score: csat,
        nps_score: nps,
        comment: comment.trim() || null,
      });

      setSuccess(
        result?.message || "Gửi phản hồi thành công."
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(
        err.message || "Không thể gửi phản hồi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="survey-page">
      <button type="button" onClick={onBack}>
        Quay lại danh sách
      </button>

      <div className="survey-heading">
        <h2>KHẢO SÁT HÀI LÒNG SAU BẢO HÀNH</h2>
        <p>Vui lòng đánh giá trải nghiệm dịch vụ của bạn.</p>
      </div>

      <DataState
        loading={loading}
        error={error}
        isEmpty={false}
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="ticketCode">
            Mã phiếu bảo hành
          </label>

          <input
            id="ticketCode"
            type="text"
            placeholder="Ví dụ: BH-0001"
            value={ticketCode}
            onChange={(event) =>
              setTicketCode(event.target.value)
            }
            required
          />

          <fieldset className="score-fieldset">
            <legend>
              Bạn đánh giá dịch vụ như thế nào? *
            </legend>

            <div className="score-options">
              {[1, 2, 3, 4, 5].map((score) => (
                <label key={score}>
                  <input
                    type="radio"
                    name="csatScore"
                    value={score}
                    checked={csatScore === String(score)}
                    onChange={(event) =>
                      setCsatScore(event.target.value)
                    }
                  />
                  {score}
                </label>
              ))}
            </div>

            <p className="score-hint">
              1 = Rất không hài lòng; 5 = Rất hài lòng
            </p>
          </fieldset>

          <fieldset className="score-fieldset">
            <legend>
              Bạn có sẵn sàng giới thiệu dịch vụ bảo hành
              cho bạn bè hoặc người thân không? *
            </legend>

            <div className="nps-options">
              {Array.from(
                { length: 11 },
                (_, index) => index
              ).map((score) => (
                <label key={score}>
                  <input
                    type="radio"
                    name="npsScore"
                    value={score}
                    checked={npsScore === String(score)}
                    onChange={(event) =>
                      setNpsScore(event.target.value)
                    }
                  />
                  {score}
                </label>
              ))}
            </div>

            <p className="score-hint">
              0 = Hoàn toàn không sẵn sàng; 10 = Rất sẵn sàng
            </p>
          </fieldset>

          <label htmlFor="comment">
            Ý kiến góp ý (không bắt buộc)
          </label>

          <textarea
            id="comment"
            rows={5}
            placeholder="Nhập ý kiến của bạn..."
            value={comment}
            onChange={(event) =>
              setComment(event.target.value)
            }
          />

          {success && (
            <p role="status">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="submit-survey"
          >
            {loading ? "ĐANG GỬI..." : "GỬI PHẢN HỒI"}
          </button>

          <div className="survey-notice">
            Sau khi gửi, hệ thống hiển thị thông báo
            gửi thành công. Nếu thiếu điểm hoặc khảo sát
            đã được phản hồi, hệ thống hiển thị thông báo lỗi.
          </div>

          <p className="survey-footer">
            Trung tâm và kỹ thuật viên được liên kết qua
            phiếu bảo hành; không cần nhập lại trên biểu mẫu.
          </p>
        </form>
      </DataState>
    </section>
  );
}
