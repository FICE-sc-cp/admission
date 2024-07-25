-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "customer_data" DROP CONSTRAINT "customer_data_user_id_fkey";

-- DropForeignKey
ALTER TABLE "entrant_data" DROP CONSTRAINT "entrant_data_user_id_fkey";

-- DropForeignKey
ALTER TABLE "priorities" DROP CONSTRAINT "priorities_contract_id_fkey";

-- DropForeignKey
ALTER TABLE "queue_positions" DROP CONSTRAINT "queue_positions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "representative_data" DROP CONSTRAINT "representative_data_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_user_id_fkey";

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrant_data" ADD CONSTRAINT "entrant_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "representative_data" ADD CONSTRAINT "representative_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_data" ADD CONSTRAINT "customer_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "priorities" ADD CONSTRAINT "priorities_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue_positions" ADD CONSTRAINT "queue_positions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
