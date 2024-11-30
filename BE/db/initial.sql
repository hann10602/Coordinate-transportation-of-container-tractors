CREATE TABLE user (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    status VARCHAR(10) NOT NULL,
    created_at DATETIME(3),
    updated_at DATETIME(3)
);

CREATE TABLE dump (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) UNIQUE NOT NULL,
    latitude DECIMAL(19,17) NOT NULL,
    longitude DECIMAL(20,17) NOT NULL,
    status VARCHAR(10),
    type VARCHAR(10),
    created_at DATETIME(3),
    updated_at DATETIME(3)
);
