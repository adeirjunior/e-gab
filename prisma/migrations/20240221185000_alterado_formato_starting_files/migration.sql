/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `politicianId` on the `Event` table. All the data in the column will be lost.
  - The primary key for the `Expenditure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Expenditure` table. All the data in the column will be lost.
  - You are about to drop the column `politicianId` on the `Expenditure` table. All the data in the column will be lost.
  - The primary key for the `Law` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Law` table. All the data in the column will be lost.
  - You are about to drop the column `politicianId` on the `Law` table. All the data in the column will be lost.
  - The primary key for the `News` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `politicianId` on the `News` table. All the data in the column will be lost.
  - The primary key for the `Plan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Plan` table. All the data in the column will be lost.
  - The primary key for the `Politician` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Politician` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Politician` table. All the data in the column will be lost.
  - You are about to drop the column `siteId` on the `Politician` table. All the data in the column will be lost.
  - The primary key for the `Poll` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `politicianId` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `siteId` on the `Poll` table. All the data in the column will be lost.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `siteId` on the `Post` table. All the data in the column will be lost.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `politicianId` on the `Project` table. All the data in the column will be lost.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Session` table. All the data in the column will be lost.
  - The primary key for the `Subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `paymentAmount` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `paymentIntentId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Subscription` table. All the data in the column will be lost.
  - The primary key for the `Survey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `politicianId` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `siteId` on the `Survey` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Site` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPolitician` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AdminsPolitician` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SecretariesPolitician` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Politician` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug,websiteId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `_id` was added to the `Account` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `_id` was added to the `Event` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `websiteId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `Expenditure` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `websiteId` to the `Expenditure` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `Law` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `slug` was added to the `Law` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `websiteId` to the `Law` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `News` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `publishedAt` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteId` to the `News` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `Plan` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `_id` was added to the `Politician` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `Politician` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `Poll` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `websiteId` to the `Poll` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `Post` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `websiteId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `Project` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `slug` was added to the `Project` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `websiteId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `Session` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `_id` was added to the `Subscription` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `cancel_at_period_end` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_period_end` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_period_start` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metadata` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `_id` was added to the `Survey` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `websiteId` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.
  - The required column `_id` was added to the `VerificationToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'Manager', 'Politician', 'Secretary', 'Client');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('TRIALING', 'ACTIVE', 'CANCELED', 'INCOMPLETE', 'INCOMPLETE_EXPIRED', 'PAST_DUE', 'UNPAID', 'PAUSED');

-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('ONE_TIME', 'RECURRING');

-- CreateEnum
CREATE TYPE "PricingPlanInterval" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "SocialMediaTypes" AS ENUM ('facebook', 'twitter', 'instagram', 'youtube', 'tiktok');

-- CreateEnum
CREATE TYPE "ProposalTypes" AS ENUM ('health', 'security', 'infrastructure', 'education');

-- CreateEnum
CREATE TYPE "DonationStatus" AS ENUM ('pending', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "ChatRoomStatus" AS ENUM ('pending', 'accepted', 'denied', 'active', 'completed', 'disabled');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "Expenditure" DROP CONSTRAINT "Expenditure_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "Law" DROP CONSTRAINT "Law_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "Politician" DROP CONSTRAINT "Politician_siteId_fkey";

-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_siteId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_siteId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Site" DROP CONSTRAINT "Site_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_planId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_siteId_fkey";

-- DropForeignKey
ALTER TABLE "UserPolitician" DROP CONSTRAINT "UserPolitician_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "UserPolitician" DROP CONSTRAINT "UserPolitician_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AdminsPolitician" DROP CONSTRAINT "_AdminsPolitician_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdminsPolitician" DROP CONSTRAINT "_AdminsPolitician_B_fkey";

-- DropForeignKey
ALTER TABLE "_SecretariesPolitician" DROP CONSTRAINT "_SecretariesPolitician_A_fkey";

-- DropForeignKey
ALTER TABLE "_SecretariesPolitician" DROP CONSTRAINT "_SecretariesPolitician_B_fkey";

-- DropIndex
DROP INDEX "Post_siteId_idx";

-- DropIndex
DROP INDEX "Post_slug_siteId_key";

-- DropIndex
DROP INDEX "Post_userId_idx";

-- DropIndex
DROP INDEX "Subscription_userId_idx";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "date",
DROP COLUMN "id",
DROP COLUMN "politicianId",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "eventEnd" TIMESTAMP(3),
ADD COLUMN     "eventStart" TIMESTAMP(3),
ADD COLUMN     "websiteId" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Expenditure" DROP CONSTRAINT "Expenditure_pkey",
DROP COLUMN "id",
DROP COLUMN "politicianId",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "websiteId" TEXT NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "date" DROP NOT NULL,
ADD CONSTRAINT "Expenditure_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Law" DROP CONSTRAINT "Law_pkey",
DROP COLUMN "id",
DROP COLUMN "politicianId",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "content" TEXT,
ADD COLUMN     "image" TEXT DEFAULT 'E-Gab/Websites/default_law_image',
ADD COLUMN     "imageBlurhash" TEXT DEFAULT 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC',
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "websiteId" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ADD CONSTRAINT "Law_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "News" DROP CONSTRAINT "News_pkey",
DROP COLUMN "id",
DROP COLUMN "politicianId",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "publishedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "websiteId" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ADD CONSTRAINT "News_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD CONSTRAINT "Plan_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Politician" DROP CONSTRAINT "Politician_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "siteId",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "billingAddress" JSONB,
ADD COLUMN     "paymentMethod" JSONB,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "party" DROP NOT NULL,
ADD CONSTRAINT "Politician_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_pkey",
DROP COLUMN "id",
DROP COLUMN "politicianId",
DROP COLUMN "siteId",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "websiteId" TEXT NOT NULL,
ALTER COLUMN "question" DROP NOT NULL,
ADD CONSTRAINT "Poll_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "id",
DROP COLUMN "siteId",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "websiteId" TEXT NOT NULL,
ALTER COLUMN "image" SET DEFAULT 'E-Gab/Websites/default_post_image',
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "id",
DROP COLUMN "politicianId",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "websiteId" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "currency",
DROP COLUMN "endDate",
DROP COLUMN "id",
DROP COLUMN "paymentAmount",
DROP COLUMN "paymentIntentId",
DROP COLUMN "paymentMethod",
DROP COLUMN "paymentStatus",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "cancel_at" TIMESTAMP(3),
ADD COLUMN     "cancel_at_period_end" BOOLEAN NOT NULL,
ADD COLUMN     "canceled_at" TIMESTAMP(3),
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "current_period_end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "current_period_start" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ended_at" TIMESTAMP(3),
ADD COLUMN     "metadata" JSONB NOT NULL,
ADD COLUMN     "politicianId" TEXT,
ADD COLUMN     "price_id" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "trial_end" TIMESTAMP(3),
ADD COLUMN     "trial_start" TIMESTAMP(3),
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "planId" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "SubscriptionStatus" NOT NULL,
ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_pkey",
DROP COLUMN "id",
DROP COLUMN "politicianId",
DROP COLUMN "siteId",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "websiteId" TEXT NOT NULL,
ALTER COLUMN "question" DROP NOT NULL,
ADD CONSTRAINT "Survey_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "clientId" TEXT,
ADD COLUMN     "cloudinaryDir" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'Politician',
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "websiteId" TEXT,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT 'E-Gab/Users/default',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN     "_id" TEXT NOT NULL,
ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("_id");

-- DropTable
DROP TABLE "Site";

-- DropTable
DROP TABLE "UserPolitician";

-- DropTable
DROP TABLE "_AdminsPolitician";

-- DropTable
DROP TABLE "_SecretariesPolitician";

-- CreateTable
CREATE TABLE "Client" (
    "_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cpf" TEXT,
    "tel" TEXT,
    "address" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Secretary" (
    "_id" TEXT NOT NULL,
    "politicianId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Secretary_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Price" (
    "_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "unit_amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "pricing_type" "PricingType" NOT NULL,
    "interval" "PricingPlanInterval" NOT NULL,
    "interval_count" INTEGER NOT NULL,
    "trial_period_days" INTEGER,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Website" (
    "_id" TEXT NOT NULL,
    "politicianId" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "myHistory" TEXT,
    "logo" TEXT NOT NULL DEFAULT 'E-Gab/Websites/default_logo',
    "font" TEXT NOT NULL DEFAULT 'font-cal',
    "image" TEXT NOT NULL DEFAULT 'E-Gab/Websites/default_image',
    "imageBlurhash" TEXT NOT NULL DEFAULT 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC',
    "subdomain" TEXT,
    "customDomain" TEXT,
    "message404" TEXT NOT NULL DEFAULT 'Parabéns! Você encontrou uma página que não existe.',
    "cloudinaryDir" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "_id" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "SocialMedia" (
    "_id" TEXT NOT NULL,
    "type" "SocialMediaTypes",
    "handle" TEXT,
    "link" TEXT,
    "websiteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "_id" TEXT NOT NULL,
    "type" "ProposalTypes" NOT NULL,
    "description" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "politicianId" TEXT NOT NULL,
    "status" "DonationStatus",
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "donator" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "ChatRoom" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cep" TEXT,
    "tel" TEXT,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "startingFiles" TEXT[],
    "clientId" TEXT NOT NULL,
    "secretaryId" TEXT,
    "politicianId" TEXT,
    "websiteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "ChatRoomStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatRoomFile" (
    "id" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatRoomFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "file" TEXT,
    "chatRoomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Secretary_userId_key" ON "Secretary"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Website_politicianId_key" ON "Website"("politicianId");

-- CreateIndex
CREATE UNIQUE INDEX "Website_subdomain_key" ON "Website"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "Website_customDomain_key" ON "Website"("customDomain");

-- CreateIndex
CREATE UNIQUE INDEX "SocialMedia_type_key" ON "SocialMedia"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_type_key" ON "Proposal"("type");

-- CreateIndex
CREATE INDEX "Donation_userId_idx" ON "Donation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Politician_userId_key" ON "Politician"("userId");

-- CreateIndex
CREATE INDEX "Post_websiteId_idx" ON "Post"("websiteId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_websiteId_key" ON "Post"("slug", "websiteId");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clientId_key" ON "User"("clientId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Secretary" ADD CONSTRAINT "Secretary_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Secretary" ADD CONSTRAINT "Secretary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Politician" ADD CONSTRAINT "Politician_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "Price"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Law" ADD CONSTRAINT "Law_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenditure" ADD CONSTRAINT "Expenditure_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_secretaryId_fkey" FOREIGN KEY ("secretaryId") REFERENCES "Secretary"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
