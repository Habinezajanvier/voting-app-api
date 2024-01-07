-- DropIndex
DROP INDEX "Organisation_createdBy_key";

-- CreateIndex
CREATE INDEX "Organisation_createdBy_idx" ON "Organisation"("createdBy");
