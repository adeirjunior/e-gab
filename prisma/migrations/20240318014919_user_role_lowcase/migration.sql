/*
  Warnings:

  - The values [DAY,WEEK,MONTH,YEAR] on the enum `PricingPlanInterval` will be removed. If these variants are still used in the database, this will fail.
  - The values [ONE_TIME,RECURRING] on the enum `PricingType` will be removed. If these variants are still used in the database, this will fail.
  - The values [TRIALING,ACTIVE,CANCELED,INCOMPLETE,INCOMPLETE_EXPIRED,PAST_DUE,UNPAID,PAUSED] on the enum `SubscriptionStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Admin,Manager,Politician,Secretary,Client] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `tel` on table `ChatRoom` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PricingPlanInterval_new" AS ENUM ('day', 'week', 'month', 'year');
ALTER TABLE "Price" ALTER COLUMN "interval" TYPE "PricingPlanInterval_new" USING ("interval"::text::"PricingPlanInterval_new");
ALTER TYPE "PricingPlanInterval" RENAME TO "PricingPlanInterval_old";
ALTER TYPE "PricingPlanInterval_new" RENAME TO "PricingPlanInterval";
DROP TYPE "PricingPlanInterval_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PricingType_new" AS ENUM ('one_time', 'recurring');
ALTER TABLE "Price" ALTER COLUMN "pricing_type" TYPE "PricingType_new" USING ("pricing_type"::text::"PricingType_new");
ALTER TYPE "PricingType" RENAME TO "PricingType_old";
ALTER TYPE "PricingType_new" RENAME TO "PricingType";
DROP TYPE "PricingType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionStatus_new" AS ENUM ('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid', 'paused');
ALTER TABLE "Subscription" ALTER COLUMN "status" TYPE "SubscriptionStatus_new" USING ("status"::text::"SubscriptionStatus_new");
ALTER TYPE "SubscriptionStatus" RENAME TO "SubscriptionStatus_old";
ALTER TYPE "SubscriptionStatus_new" RENAME TO "SubscriptionStatus";
DROP TYPE "SubscriptionStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('admin', 'politician', 'client', 'invited');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'politician';
COMMIT;

-- AlterTable
ALTER TABLE "ChatRoom" ALTER COLUMN "tel" SET NOT NULL,
ALTER COLUMN "stars" SET DEFAULT -1;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'politician';

-- CreateTable
CREATE TABLE "AcceptedChatRoomRequest" (
    "id" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3),
    "chatRoomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcceptedChatRoomRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AcceptedChatRoomRequest_chatRoomId_key" ON "AcceptedChatRoomRequest"("chatRoomId");

-- AddForeignKey
ALTER TABLE "AcceptedChatRoomRequest" ADD CONSTRAINT "AcceptedChatRoomRequest_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
