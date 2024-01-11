-- DropForeignKey
ALTER TABLE "_AdminsPolitician" DROP CONSTRAINT "_AdminsPolitician_B_fkey";

-- DropForeignKey
ALTER TABLE "_SecretariesPolitician" DROP CONSTRAINT "_SecretariesPolitician_B_fkey";

-- AlterTable
ALTER TABLE "Site" ALTER COLUMN "message404" SET DEFAULT 'Parabéns! Você encontrou uma página que não existe.';

-- CreateTable
CREATE TABLE "UserPolitician" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "politicianId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPolitician_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPolitician_userId_key" ON "UserPolitician"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPolitician_userId_politicianId_key" ON "UserPolitician"("userId", "politicianId");

-- AddForeignKey
ALTER TABLE "UserPolitician" ADD CONSTRAINT "UserPolitician_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPolitician" ADD CONSTRAINT "UserPolitician_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminsPolitician" ADD CONSTRAINT "_AdminsPolitician_B_fkey" FOREIGN KEY ("B") REFERENCES "UserPolitician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SecretariesPolitician" ADD CONSTRAINT "_SecretariesPolitician_B_fkey" FOREIGN KEY ("B") REFERENCES "UserPolitician"("id") ON DELETE CASCADE ON UPDATE CASCADE;
