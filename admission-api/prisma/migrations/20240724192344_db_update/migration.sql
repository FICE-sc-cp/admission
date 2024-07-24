/*
  Warnings:

  - You are about to drop the column `study_type` on the `contracts` table. All the data in the column will be lost.
  - The primary key for the `entrant_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `entrant_data` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `priorities` table. All the data in the column will be lost.
  - You are about to drop the `entrant_priorities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `queue_users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `funding_source` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `entrant_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expected_specialities` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_dorm` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `printed_edbo` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FundingSource" AS ENUM ('BUDGET', 'CONTRACT');

-- DropForeignKey
ALTER TABLE "entrant_priorities" DROP CONSTRAINT "entrant_priorities_user_id_fkey";

-- DropForeignKey
ALTER TABLE "priorities" DROP CONSTRAINT "priorities_priorityId_fkey";

-- DropForeignKey
ALTER TABLE "queue_positions" DROP CONSTRAINT "queue_positions_queue_id_fkey";

-- DropForeignKey
ALTER TABLE "queue_positions" DROP CONSTRAINT "queue_positions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "queue_users" DROP CONSTRAINT "queue_users_user_id_fkey";

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "study_type",
ADD COLUMN     "funding_source" "FundingSource" NOT NULL,
ALTER COLUMN "educational_program" DROP NOT NULL,
ALTER COLUMN "program_type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "entrant_data" DROP CONSTRAINT "entrant_data_pkey",
DROP COLUMN "id",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "priorities" DROP COLUMN "state";

-- AlterTable
ALTER TABLE "queue_positions" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "expected_specialities" TEXT NOT NULL,
ADD COLUMN     "is_dorm" BOOLEAN NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "printed_edbo" BOOLEAN NOT NULL,
ADD COLUMN     "telegram_id" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "entrant_priorities";

-- DropTable
DROP TABLE "queue_users";

-- DropEnum
DROP TYPE "StudyType";

-- CreateTable
CREATE TABLE "users_priorities" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "state" "DocumentState" NOT NULL DEFAULT 'PENDING',
    "date" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_priorities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_priorities" ADD CONSTRAINT "users_priorities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "priorities" ADD CONSTRAINT "priorities_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "users_priorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue_positions" ADD CONSTRAINT "queue_positions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue_positions" ADD CONSTRAINT "queue_positions_queue_id_fkey" FOREIGN KEY ("queue_id") REFERENCES "queues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
