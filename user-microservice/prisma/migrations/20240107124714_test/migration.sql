-- DropForeignKey
ALTER TABLE "UserOrganisation" DROP CONSTRAINT "UserOrganisation_organisationId_fkey";

-- DropForeignKey
ALTER TABLE "UserOrganisation" DROP CONSTRAINT "UserOrganisation_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserOrganisation" ADD CONSTRAINT "UserOrganisation_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserOrganisation" ADD CONSTRAINT "UserOrganisation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
