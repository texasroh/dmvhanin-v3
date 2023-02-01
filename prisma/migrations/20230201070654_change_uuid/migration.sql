/*
  Warnings:

  - You are about to alter the column `uuid` on the `Business` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.

*/
-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "uuid" SET DATA TYPE VARCHAR(32);
