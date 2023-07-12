/*
  Warnings:

  - Added the required column `rating` to the `BusinessReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessReview" ADD COLUMN     "rating" INTEGER NOT NULL;
