/*
  Warnings:

  - The values [GOING] on the enum `QueuePositionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `queue_id` on the `queue_positions` table. All the data in the column will be lost.
  - You are about to drop the `queues` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QueuePositionStatus_new" AS ENUM ('WAITING', 'PROCESSING');
ALTER TABLE "queue_positions" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "queue_positions" ALTER COLUMN "status" TYPE "QueuePositionStatus_new" USING ("status"::text::"QueuePositionStatus_new");
ALTER TYPE "QueuePositionStatus" RENAME TO "QueuePositionStatus_old";
ALTER TYPE "QueuePositionStatus_new" RENAME TO "QueuePositionStatus";
DROP TYPE "QueuePositionStatus_old";
ALTER TABLE "queue_positions" ALTER COLUMN "status" SET DEFAULT 'WAITING';
COMMIT;

-- DropForeignKey
ALTER TABLE "queue_positions" DROP CONSTRAINT "queue_positions_queue_id_fkey";

-- AlterTable
ALTER TABLE "queue_positions" DROP COLUMN "queue_id";

-- DropTable
DROP TABLE "queues";
