-- +goose Up
-- +goose StatementBegin
ALTER TABLE favorites ADD IF NOT EXISTS user_id VARCHAR(100)
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE favorites DROP COLUMN user_id
-- +goose StatementEnd