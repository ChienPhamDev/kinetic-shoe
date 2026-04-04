-- =============================================================
-- Shoe eCommerce — PostgreSQL Schema
-- =============================================================
-- Convention:
--   • All PKs are UUID (gen_random_uuid())
--   • Monetary values are NUMERIC(12,2) — never FLOAT
--   • Soft-delete via is_active; hard-delete only for GDPR
--   • All timestamps are TIMESTAMPTZ (UTC-aware)
-- =============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()

-- =============================================================
-- 1. Reference / lookup tables
-- =============================================================

CREATE TABLE brands (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name         VARCHAR(120)  NOT NULL UNIQUE,
    description  TEXT,
    logo_url     VARCHAR(500),
    created_at   TIMESTAMPTZ   NOT NULL DEFAULT now()
);

-- Self-referencing for sub-categories (e.g. Footwear > Running > Trail)
CREATE TABLE categories (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id     UUID REFERENCES categories(id) ON DELETE SET NULL,
    name          VARCHAR(120) NOT NULL,
    slug          VARCHAR(120) NOT NULL UNIQUE,
    display_order INT          NOT NULL DEFAULT 0
);

CREATE TABLE colors (
    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name      VARCHAR(80)  NOT NULL UNIQUE,      -- "Midnight Black"
    hex_code  CHAR(7)      NOT NULL              -- "#1A1A1A"
);

-- Region-aware sizing: EU 42 = US 9 = UK 8.5
CREATE TABLE sizes (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region        VARCHAR(10)  NOT NULL,          -- 'EU','US','UK','CM'
    value         NUMERIC(4,1) NOT NULL,          -- 42.0, 9.0, 27.5
    display_label VARCHAR(20)  NOT NULL,          -- "EU 42" shown to customer
    UNIQUE (region, value)
);

-- =============================================================
-- 2. Master product (not directly purchasable)
-- =============================================================

CREATE TABLE products (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_id     UUID          NOT NULL REFERENCES brands(id),
    category_id  UUID          NOT NULL REFERENCES categories(id),
    name         VARCHAR(200)  NOT NULL,           -- "Nike Air Max 90"
    slug         VARCHAR(200)  NOT NULL UNIQUE,    -- "nike-air-max-90"
    description  TEXT,
    gender       VARCHAR(20)   CHECK (gender IN ('men','women','unisex','kids')),
    is_active    BOOLEAN       NOT NULL DEFAULT true,
    created_at   TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_brand    ON products(brand_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active   ON products(is_active);

-- =============================================================
-- 3. Product variants (the only purchasable unit)
-- =============================================================

CREATE TABLE product_variants (
    id               UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id       UUID          NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    color_id         UUID          NOT NULL REFERENCES colors(id),
    size_id          UUID          NOT NULL REFERENCES sizes(id),
    sku              VARCHAR(80)   NOT NULL UNIQUE,     -- e.g. "NK-AM90-BLK-EU42"
    price            NUMERIC(12,2) NOT NULL CHECK (price >= 0),
    compare_at_price NUMERIC(12,2) CHECK (compare_at_price >= 0),  -- original / crossed-out price
    stock_quantity   INT           NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    is_active        BOOLEAN       NOT NULL DEFAULT true,
    created_at       TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ   NOT NULL DEFAULT now(),
    UNIQUE (product_id, color_id, size_id)             -- no duplicate combos
);

CREATE INDEX idx_variants_product ON product_variants(product_id);
CREATE INDEX idx_variants_sku     ON product_variants(sku);
CREATE INDEX idx_variants_active  ON product_variants(is_active);

-- =============================================================
-- 4. Product images (tied to product + optional color filter)
-- =============================================================

CREATE TABLE product_images (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id    UUID         NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    color_id      UUID         REFERENCES colors(id) ON DELETE SET NULL,  -- NULL = shown for all colors
    url           VARCHAR(500) NOT NULL,
    alt_text      VARCHAR(250),
    is_primary    BOOLEAN      NOT NULL DEFAULT false,
    display_order INT          NOT NULL DEFAULT 0
);

CREATE INDEX idx_images_product ON product_images(product_id);
CREATE INDEX idx_images_color   ON product_images(color_id);

-- =============================================================
-- 5. Customers & addresses
-- =============================================================

CREATE TABLE customers (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email      VARCHAR(254) NOT NULL UNIQUE,
    full_name  VARCHAR(200) NOT NULL,
    phone      VARCHAR(30),
    created_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE addresses (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id  UUID         NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    label        VARCHAR(50)  NOT NULL DEFAULT 'Home',   -- "Home", "Work", etc.
    street_line1 TEXT         NOT NULL,
    street_line2 TEXT,
    city         VARCHAR(120) NOT NULL,
    state        VARCHAR(120),
    postal_code  VARCHAR(20)  NOT NULL,
    country_code CHAR(2)      NOT NULL,                 -- ISO 3166-1 alpha-2
    is_default   BOOLEAN      NOT NULL DEFAULT false
);

CREATE INDEX idx_addresses_customer ON addresses(customer_id);

-- =============================================================
-- 6. Orders
-- =============================================================

CREATE TYPE order_status AS ENUM (
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded'
);

CREATE TABLE orders (
    id                  UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id         UUID         NOT NULL REFERENCES customers(id),
    shipping_address_id UUID         NOT NULL REFERENCES addresses(id),
    status              order_status NOT NULL DEFAULT 'pending',
    subtotal            NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0),
    shipping_fee        NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (shipping_fee >= 0),
    discount_amount     NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
    total               NUMERIC(12,2) NOT NULL CHECK (total >= 0),
    currency            CHAR(3)      NOT NULL DEFAULT 'USD',   -- ISO 4217
    placed_at           TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status   ON orders(status);
CREATE INDEX idx_orders_placed   ON orders(placed_at DESC);

-- =============================================================
-- 7. Order line items
-- =============================================================

CREATE TABLE order_items (
    id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id    UUID          NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    variant_id  UUID          NOT NULL REFERENCES product_variants(id),
    quantity    INT           NOT NULL CHECK (quantity > 0),
    unit_price  NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),  -- snapshot at purchase time
    line_total  NUMERIC(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);

CREATE INDEX idx_order_items_order   ON order_items(order_id);
CREATE INDEX idx_order_items_variant ON order_items(variant_id);

-- =============================================================
-- 8. Inventory movements (audit trail for stock changes)
-- =============================================================

CREATE TYPE inventory_reason AS ENUM (
    'purchase',       -- stock deducted on order placement
    'cancellation',   -- stock restored on order cancel
    'refund',         -- stock restored on return
    'restock',        -- manual restock from warehouse
    'adjustment',     -- manual correction
    'damage'          -- write-off
);

CREATE TABLE inventory_movements (
    id            UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_id    UUID              NOT NULL REFERENCES product_variants(id),
    order_item_id UUID              REFERENCES order_items(id) ON DELETE SET NULL,
    reason        inventory_reason  NOT NULL,
    delta         INT               NOT NULL,          -- negative = deduct, positive = add
    stock_after   INT               NOT NULL,          -- running total after this movement
    created_at    TIMESTAMPTZ       NOT NULL DEFAULT now()
);

CREATE INDEX idx_inv_variant ON inventory_movements(variant_id);
CREATE INDEX idx_inv_created ON inventory_movements(created_at DESC);

-- =============================================================
-- 9. Helpers
-- =============================================================

-- Auto-update updated_at on products and variants
CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE TRIGGER trg_variants_updated_at
    BEFORE UPDATE ON product_variants
    FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE TRIGGER trg_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- Enforce at most one primary image per product+color
CREATE UNIQUE INDEX idx_primary_image_per_color
    ON product_images(product_id, color_id)
    WHERE is_primary = true;

-- Enforce at most one default address per customer
CREATE UNIQUE INDEX idx_default_address_per_customer
    ON addresses(customer_id)
    WHERE is_default = true;
