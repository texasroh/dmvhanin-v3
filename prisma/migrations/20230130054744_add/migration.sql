/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `BusinessCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `BusinessCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessCategory" ADD COLUMN     "key" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCategory_key_key" ON "BusinessCategory"("key");
