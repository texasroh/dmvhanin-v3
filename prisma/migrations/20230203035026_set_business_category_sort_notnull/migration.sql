/*
  Warnings:

  - Made the column `sort` on table `BusinessCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BusinessCategory" ALTER COLUMN "sort" SET NOT NULL;
