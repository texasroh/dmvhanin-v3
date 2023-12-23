/*
  Warnings:

  - Added the required column `sort` to the `FleaMarketImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FleaMarketImage" ADD COLUMN     "sort" INTEGER NOT NULL;
