/*
  Warnings:

  - You are about to drop the column `countryId` on the `Poll` table. All the data in the column will be lost.
  - Added the required column `organisationId` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "countryId",
ADD COLUMN     "organisationId" INTEGER NOT NULL;
