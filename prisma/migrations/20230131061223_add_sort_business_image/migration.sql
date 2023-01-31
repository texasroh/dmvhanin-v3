/*
  Warnings:

  - A unique constraint covering the columns `[businessId,sort]` on the table `BusinessImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sort` to the `BusinessImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessImage" ADD COLUMN     "sort" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BusinessImage_businessId_sort_key" ON "BusinessImage"("businessId", "sort");
