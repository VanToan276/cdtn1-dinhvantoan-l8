
CREATE TABLE IF NOT EXISTS customer (
    customer_id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(120)
);

CREATE TABLE IF NOT EXISTS service_center (
    center_id BIGSERIAL PRIMARY KEY,
    center_name VARCHAR(120) NOT NULL,
    address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS technician (
    technician_id BIGSERIAL PRIMARY KEY,
    center_id BIGINT NOT NULL
        REFERENCES service_center(center_id),
    full_name VARCHAR(120) NOT NULL
);

CREATE TABLE IF NOT EXISTS ticket (
    ticket_id BIGSERIAL PRIMARY KEY,
    ticket_code VARCHAR(20) NOT NULL UNIQUE,
    customer_id BIGINT NOT NULL
        REFERENCES customer(customer_id),
    center_id BIGINT NOT NULL
        REFERENCES service_center(center_id),
    technician_id BIGINT
        REFERENCES technician(technician_id),
    status VARCHAR(20) NOT NULL,
    closed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS survey (
    survey_id BIGSERIAL PRIMARY KEY,
    ticket_id BIGINT NOT NULL UNIQUE
        REFERENCES ticket(ticket_id),
    survey_token VARCHAR(100) NOT NULL UNIQUE,
    sent_at TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL
        CHECK (status IN ('SENT', 'RESPONDED', 'EXPIRED')),
    CHECK (expires_at > sent_at)
);

CREATE TABLE IF NOT EXISTS survey_response (
    response_id BIGSERIAL PRIMARY KEY,
    survey_id BIGINT NOT NULL UNIQUE
        REFERENCES survey(survey_id),
    csat_score SMALLINT NOT NULL
        CHECK (csat_score BETWEEN 1 AND 5),
    nps_score SMALLINT NOT NULL
        CHECK (nps_score BETWEEN 0 AND 10),
    comment TEXT,
    responded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ticket_center
    ON ticket(center_id);

CREATE INDEX IF NOT EXISTS idx_ticket_technician
    ON ticket(technician_id);

CREATE INDEX IF NOT EXISTS idx_survey_response_responded_at
    ON survey_response(responded_at);
