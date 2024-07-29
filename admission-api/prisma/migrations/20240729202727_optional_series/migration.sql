-- AlterTable
ALTER TABLE "customer_data" ALTER COLUMN "passport_series" DROP NOT NULL;

-- AlterTable
ALTER TABLE "entrant_data" ALTER COLUMN "passport_series" DROP NOT NULL;

-- AlterTable
ALTER TABLE "representative_data" ALTER COLUMN "passport_series" DROP NOT NULL;
