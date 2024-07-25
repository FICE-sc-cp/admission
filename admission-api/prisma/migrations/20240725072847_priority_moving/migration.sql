/*
  Warnings:

  - The primary key for the `priorities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `priorityId` on the `priorities` table. All the data in the column will be lost.
  - You are about to drop the `users_priorities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contract_id` to the `priorities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "priorities" DROP CONSTRAINT "priorities_priorityId_fkey";

-- DropForeignKey
ALTER TABLE "users_priorities" DROP CONSTRAINT "users_priorities_user_id_fkey";

-- AlterTable
ALTER TABLE "contracts" ADD COLUMN     "priority_date" TEXT,
ADD COLUMN     "priority_state" "DocumentState";

-- AlterTable
ALTER TABLE "priorities" DROP CONSTRAINT "priorities_pkey",
DROP COLUMN "priorityId",
ADD COLUMN     "contract_id" TEXT NOT NULL,
ADD CONSTRAINT "priorities_pkey" PRIMARY KEY ("contract_id", "number");

-- DropTable
DROP TABLE "users_priorities";

-- AddForeignKey
ALTER TABLE "priorities" ADD CONSTRAINT "priorities_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
