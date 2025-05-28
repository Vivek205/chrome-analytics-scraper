-- CreateTable
CREATE TABLE "Extension" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "url" VARCHAR(1024) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Extension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtensionMetric" (
    "id" TEXT NOT NULL,
    "extension_id" TEXT NOT NULL,
    "active_users" INTEGER,
    "ratings_count" INTEGER,
    "ratings_value" DOUBLE PRECISION,
    "scraped_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExtensionMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExtensionMetric_extension_id_idx" ON "ExtensionMetric"("extension_id");

-- CreateIndex
CREATE INDEX "ExtensionMetric_scraped_at_idx" ON "ExtensionMetric"("scraped_at");

-- CreateIndex
CREATE UNIQUE INDEX "ExtensionMetric_extension_id_scraped_at_key" ON "ExtensionMetric"("extension_id", "scraped_at");

-- AddForeignKey
ALTER TABLE "ExtensionMetric" ADD CONSTRAINT "ExtensionMetric_extension_id_fkey" FOREIGN KEY ("extension_id") REFERENCES "Extension"("id") ON DELETE CASCADE ON UPDATE CASCADE;
