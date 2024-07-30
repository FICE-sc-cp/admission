/*
  Warnings:

  - The primary key for the `customer_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `customer_data` table. All the data in the column will be lost.
  - The primary key for the `representative_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `representative_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer_data" DROP CONSTRAINT "customer_data_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "customer_data_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "entrant_data" ADD CONSTRAINT "entrant_data_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "representative_data" DROP CONSTRAINT "representative_data_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "representative_data_pkey" PRIMARY KEY ("user_id");
