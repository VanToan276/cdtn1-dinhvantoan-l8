
import requests

BASE_URL = "http://localhost:3000"


def test_api_health():
    """TC-API-01: Kiểm tra trạng thái hoạt động của API."""
    response = requests.get(
        f"{BASE_URL}/health",
        timeout=5
    )

    assert response.status_code == 200

    result = response.json()

    assert result["success"] is True
    assert "đang hoạt động" in result["message"]

    print("TC-API-01: PASS - API hoạt động")


def test_get_survey_responses():
    """TC-API-02: Kiểm tra API lấy danh sách phản hồi."""
    response = requests.get(
        f"{BASE_URL}/api/survey-responses",
        timeout=5
    )

    assert response.status_code == 200

    result = response.json()

    assert result["success"] is True
    assert "data" in result
    assert isinstance(result["data"], list)

    print("TC-API-02: PASS - Lấy danh sách phản hồi")


def test_get_survey_response_by_id():
    """TC-API-03: Lấy chi tiết phản hồi hợp lệ."""

    # Lấy danh sách phản hồi
    list_response = requests.get(
        f"{BASE_URL}/api/survey-responses",
        timeout=5
    )

    assert list_response.status_code == 200

    responses = list_response.json()["data"]

    # Tìm phản hồi test, không dùng ID cố định
    test_response = next(
        (
            item for item in responses
            if item["ticket_code"] == "TKT-L8-TEST-001"
        ),
        None
    )

    assert test_response is not None, (
        "Không tìm thấy phản hồi test TKT-L8-TEST-001"
    )

    response_id = test_response["response_id"]

    # Lấy chi tiết phản hồi
    response = requests.get(
        f"{BASE_URL}/api/survey-responses/{response_id}",
        timeout=5
    )

    assert response.status_code == 200

    result = response.json()

    assert result["success"] is True
    assert str(result["data"]["response_id"]) == str(response_id)

    print(f"TC-API-03: PASS - Lấy chi tiết phản hồi ID {response_id}")


def test_get_survey_response_invalid_id():
    """TC-API-04: Truy vấn ID không hợp lệ."""

    response = requests.get(
        f"{BASE_URL}/api/survey-responses/abc",
        timeout=5
    )

    assert response.status_code in [400, 404]

    print("TC-API-04: PASS - Từ chối ID không hợp lệ")


def test_create_response_invalid_csatscore():
    """TC-API-05: Từ chối CSAT không hợp lệ."""

    payload = {
        "ticket_code": "TKT-L8-0002",
        "csat_score": 0,
        "nps_score": 8,
        "comment": "Test dữ liệu không hợp lệ"
    }

    response = requests.post(
        f"{BASE_URL}/api/survey-responses",
        json=payload,
        timeout=5
    )

    assert response.status_code in [400, 422]

    print("TC-API-05: PASS - Từ chối CSAT không hợp lệ")


def test_create_response_invalid_nps():
    """TC-API-06: Từ chối NPS không hợp lệ."""

    payload = {
        "ticket_code": "TKT-L8-0002",
        "csat_score": 4,
        "nps_score": 11,
        "comment": "Test dữ liệu không hợp lệ"
    }

    response = requests.post(
        f"{BASE_URL}/api/survey-responses",
        json=payload,
        timeout=5
    )

    assert response.status_code in [400, 422]

    print("TC-API-06: PASS - Từ chối NPS không hợp lệ")

