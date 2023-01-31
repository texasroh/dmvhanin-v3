/*
  Warnings:

  - You are about to alter the column `avgRating` on the `Business` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(3,2)`.

*/
-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "avgRating" SET DATA TYPE DECIMAL(3,2);
