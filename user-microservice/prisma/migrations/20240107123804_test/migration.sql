-- DropForeignKey
ALTER TABLE "Organisation" DROP CONSTRAINT "Organisation_createdBy_fkey";

-- AddForeignKey
ALTER TABLE "Organisation" ADD CONSTRAINT "Organisation_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
