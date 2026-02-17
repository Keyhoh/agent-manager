/*
  Warnings:

  - You are about to drop the column `projectId` on the `sprints` table. All the data in the column will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `sprints` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BacklogItemStatus" AS ENUM ('BACKLOG', 'SPRINT_BACKLOG', 'IN_PROGRESS', 'REVIEW', 'DONE');

-- CreateEnum
CREATE TYPE "BacklogItemPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- DropForeignKey
ALTER TABLE "sprints" DROP CONSTRAINT "sprints_projectId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_parentTaskId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_projectId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_sprintId_fkey";

-- DropIndex
DROP INDEX "sprints_projectId_idx";

-- AlterTable
ALTER TABLE "sprints" DROP COLUMN "projectId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "projects";

-- DropTable
DROP TABLE "tasks";

-- DropEnum
DROP TYPE "ProjectStatus";

-- DropEnum
DROP TYPE "TaskPriority";

-- DropEnum
DROP TYPE "TaskStatus";

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "repositoryUrl" TEXT NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backlog_items" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sprintId" TEXT,
    "parentBacklogItemId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" "BacklogItemPriority" NOT NULL DEFAULT 'MEDIUM',
    "status" "BacklogItemStatus" NOT NULL DEFAULT 'BACKLOG',
    "assignedAgentId" TEXT,
    "storyPoint" INTEGER,
    "artifactPath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "backlog_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "backlog_items_productId_idx" ON "backlog_items"("productId");

-- CreateIndex
CREATE INDEX "backlog_items_sprintId_idx" ON "backlog_items"("sprintId");

-- CreateIndex
CREATE INDEX "backlog_items_status_idx" ON "backlog_items"("status");

-- CreateIndex
CREATE INDEX "sprints_productId_idx" ON "sprints"("productId");

-- AddForeignKey
ALTER TABLE "backlog_items" ADD CONSTRAINT "backlog_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backlog_items" ADD CONSTRAINT "backlog_items_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "sprints"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backlog_items" ADD CONSTRAINT "backlog_items_parentBacklogItemId_fkey" FOREIGN KEY ("parentBacklogItemId") REFERENCES "backlog_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sprints" ADD CONSTRAINT "sprints_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
