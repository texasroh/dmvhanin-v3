/*
  Warnings:

  - Made the column `uuid` on table `Business` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "uuid" SET NOT NULL;
