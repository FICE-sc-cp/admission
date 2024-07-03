-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ENTRANT', 'ADMIN');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('OTP', 'SESSION');

-- CreateEnum
CREATE TYPE "DocumentState" AS ENUM ('PENDING', 'APPROVED');

-- CreateEnum
CREATE TYPE "EducationProgram" AS ENUM ('CSSE', 'ISSE', 'IIS', 'ISRS', 'IMST');

-- CreateEnum
CREATE TYPE "EducationalDegree" AS ENUM ('BACHELOR', 'MASTER', 'PHD');

-- CreateEnum
CREATE TYPE "EducationalProgramType" AS ENUM ('PROFESSIONAL', 'SCIENTIFIC');

-- CreateEnum
CREATE TYPE "StudyForm" AS ENUM ('FULL_TIME', 'PART_TIME');

-- CreateEnum
CREATE TYPE "StudyType" AS ENUM ('BUDGET', 'CONTRACT');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('MONTHLY', 'QUARTERLY', 'SEMESTERLY');

-- CreateEnum
CREATE TYPE "QueuePositionStatus" AS ENUM ('WAITING', 'GOING', 'PROCESSING');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ENTRANT',
    "benefit" BOOLEAN NOT NULL DEFAULT false,
    "competitive_point" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "value" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "entrant_data" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "passport_series" TEXT NOT NULL,
    "passport_number" TEXT NOT NULL,
    "passport_institute" TEXT NOT NULL,
    "passport_date" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "id_code" TEXT,
    "region" TEXT NOT NULL,
    "settlement" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entrant_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "representative_data" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passport_series" TEXT NOT NULL,
    "passport_number" TEXT NOT NULL,
    "passport_institute" TEXT NOT NULL,
    "passport_date" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "id_code" TEXT,
    "region" TEXT NOT NULL,
    "settlement" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "representative_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_data" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passport_series" TEXT NOT NULL,
    "passport_number" TEXT NOT NULL,
    "passport_institute" TEXT NOT NULL,
    "passport_date" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "id_code" TEXT,
    "region" TEXT NOT NULL,
    "settlement" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" TEXT NOT NULL,
    "state" "DocumentState" NOT NULL DEFAULT 'PENDING',
    "number" TEXT,
    "date" TEXT,
    "educational_degree" "EducationalDegree" NOT NULL DEFAULT 'BACHELOR',
    "educational_program" TEXT NOT NULL,
    "program_type" "EducationalProgramType" NOT NULL DEFAULT 'PROFESSIONAL',
    "payment_type" "PaymentType" NOT NULL,
    "specialty" TEXT NOT NULL,
    "study_form" "StudyForm" NOT NULL DEFAULT 'FULL_TIME',
    "study_type" "StudyType" NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entrant_priorities" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "state" "DocumentState" NOT NULL DEFAULT 'PENDING',
    "date" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entrant_priorities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "priorities" (
    "priorityId" TEXT NOT NULL,
    "state" "DocumentState" NOT NULL DEFAULT 'PENDING',
    "number" INTEGER NOT NULL,
    "program" "EducationProgram" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "priorities_pkey" PRIMARY KEY ("priorityId","number")
);

-- CreateTable
CREATE TABLE "queue_users" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "user_id" TEXT,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "telegram_id" BIGINT,
    "email" TEXT,
    "phone" TEXT,
    "specialty" TEXT NOT NULL,
    "is_dorm" BOOLEAN,
    "printed_edbo" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "queue_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "queue_positions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "queue_id" INTEGER NOT NULL,
    "code" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "status" "QueuePositionStatus" NOT NULL DEFAULT 'WAITING',
    "last_notified_position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "queue_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "queues" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "open" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "queues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_value_key" ON "tokens"("value");

-- CreateIndex
CREATE UNIQUE INDEX "entrant_data_user_id_key" ON "entrant_data"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "representative_data_user_id_key" ON "representative_data"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_data_user_id_key" ON "customer_data"("user_id");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrant_data" ADD CONSTRAINT "entrant_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "representative_data" ADD CONSTRAINT "representative_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_data" ADD CONSTRAINT "customer_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrant_priorities" ADD CONSTRAINT "entrant_priorities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "priorities" ADD CONSTRAINT "priorities_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "entrant_priorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue_users" ADD CONSTRAINT "queue_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue_positions" ADD CONSTRAINT "queue_positions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "queue_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue_positions" ADD CONSTRAINT "queue_positions_queue_id_fkey" FOREIGN KEY ("queue_id") REFERENCES "queues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
