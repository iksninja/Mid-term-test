-- +goose Up
-- +goose StatementBegin
ALTER TABLE users ADD IF NOT EXISTS image_url VARCHAR(255);
ALTER TABLE users ADD IF NOT EXISTS nick_name VARCHAR(100);
-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
ALTER TABLE users
DROP COLUMN image_url;
DROP COLUMN nick_name;
-- +goose StatementEnd