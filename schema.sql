-- Enable uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  customer_id VARCHAR(255) UNIQUE,
  price_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- pdf summaries table for storing pdf processed results
CREATE TABLE pdf_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255) NOT NULL,
  original_file_url TEXT NOT NULL,
  summary_text TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'completed',
  title TEXT,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  amount INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  stripe_payment_id VARCHAR(255) UNIQUE NOT NULL,
  price_id VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL REFERENCES users(email),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- add triggers to update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pdf_summaries_updated_at
  BEFORE UPDATE ON pdf_summaries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();



-- ============================================
-- 1. FLASHCARDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS flashcards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    summary_id UUID NOT NULL
        REFERENCES pdf_summaries(id)
        ON DELETE CASCADE,

    user_id VARCHAR(255) NOT NULL,
    topic TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    position INTEGER NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'new'
        CHECK (status IN ('new', 'learning', 'known')),

    created_at TIMESTAMP WITH TIME ZONE
        DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS flashcards_summary_idx
    ON flashcards(summary_id);

CREATE INDEX IF NOT EXISTS flashcards_user_idx
    ON flashcards(user_id);


-- ============================================
-- 2. FLASHCARD DAILY USAGE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS flashcard_usage (
    user_id VARCHAR(255) NOT NULL,
    day DATE NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')::date,
    count INTEGER NOT NULL DEFAULT 0
        CHECK (count >= 0),

    PRIMARY KEY (user_id, day)
);


-- ============================================
-- 3. SUMMARY DAILY USAGE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS summary_usage (
    user_id VARCHAR(255) NOT NULL,
    day DATE NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')::date,
    count INTEGER NOT NULL DEFAULT 0
        CHECK (count >= 0),

    PRIMARY KEY (user_id, day)
);


CREATE INDEX IF NOT EXISTS flashcards_summary_user_position_idx
ON flashcards (summary_id, user_id, position);