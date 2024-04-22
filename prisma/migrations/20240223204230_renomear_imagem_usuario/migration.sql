/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "WebsiteThemeType" AS ENUM ('blue', 'red', 'yellow', 'gray', 'black', 'green', 'pink', 'violet');

-- CreateEnum
CREATE TYPE "MotionStatus" AS ENUM ('pending', 'approved', 'rejected', 'withdrawn');

-- CreateEnum
CREATE TYPE "IndicationStatus" AS ENUM ('pending', 'approved', 'rejected', 'withdrawn');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('pending', 'in_progress', 'completed');

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_websiteId_fkey";

-- AlterTable
ALTER TABLE "ChatRoom" ADD COLUMN     "reason" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "logo" TEXT NOT NULL DEFAULT 'E-Gab/Users/default';

-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "politicianPhoto" TEXT NOT NULL DEFAULT 'E-Gab/Websites/default_politician_photo',
ADD COLUMN     "theme" "WebsiteThemeType" NOT NULL DEFAULT 'blue';

-- DropTable
DROP TABLE "Project";

-- CreateTable
CREATE TABLE "PoliticianMotion" (
    "_id" TEXT NOT NULL,
    "politicianId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "MotionStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PoliticianMotion_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "LegislativeIndication" (
    "_id" TEXT NOT NULL,
    "politicianId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "proposedAction" TEXT NOT NULL,
    "status" "IndicationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegislativeIndication_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "PoliticalProject" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "objectives" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'pending',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "websiteId" TEXT NOT NULL,

    CONSTRAINT "PoliticalProject_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "PoliticalProject" ADD CONSTRAINT "PoliticalProject_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
