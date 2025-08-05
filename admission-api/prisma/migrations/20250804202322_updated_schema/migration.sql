/*
  Warnings:

  - The values [ISRS] on the enum `EducationProgram` will be removed. If these variants are still used in the database, this will fail.
  - The values [QUARTERLY] on the enum `PaymentType` will be removed. If these variants are still used in the database, this will fail.
  - The `educational_program` column on the `contracts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `specialty` on the `contracts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Specialty" AS ENUM ('F2', 'F6', 'F7');

-- AlterEnum
BEGIN;
CREATE TYPE "EducationProgram_new" AS ENUM ('CSSE', 'ISSE', 'CGP', 'DRS', 'CSN', 'IIS', 'IMST');
ALTER TABLE "contracts" ALTER COLUMN "educational_program" TYPE "EducationProgram_new" USING ("educational_program"::text::"EducationProgram_new");
ALTER TABLE "priorities" ALTER COLUMN "program" TYPE "EducationProgram_new" USING ("program"::text::"EducationProgram_new");
ALTER TYPE "EducationProgram" RENAME TO "EducationProgram_old";
ALTER TYPE "EducationProgram_new" RENAME TO "EducationProgram";
DROP TYPE "EducationProgram_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentType_new" AS ENUM ('MONTHLY', 'ANNUALLY', 'SEMESTERLY');
ALTER TABLE "contracts" ALTER COLUMN "payment_type" TYPE "PaymentType_new" USING ("payment_type"::text::"PaymentType_new");
ALTER TYPE "PaymentType" RENAME TO "PaymentType_old";
ALTER TYPE "PaymentType_new" RENAME TO "PaymentType";
DROP TYPE "PaymentType_old";
COMMIT;

-- AlterEnum
ALTER TYPE "StudyForm" ADD VALUE 'REMOTE';

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "educational_program",
ADD COLUMN     "educational_program" "EducationProgram",
DROP COLUMN "specialty",
ADD COLUMN     "specialty" "Specialty" NOT NULL;
