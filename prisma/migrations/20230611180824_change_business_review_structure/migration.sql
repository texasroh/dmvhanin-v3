/*
  Warnings:

  - You are about to drop the column `review` on the `BusinessReview` table. All the data in the column will be lost.
  - Added the required column `RawContent` to the `BusinessReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewHTML` to the `BusinessReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessReview" DROP COLUMN "review",
ADD COLUMN     "rawContent" TEXT NOT NULL,
ADD COLUMN     "reviewHTML" TEXT NOT NULL;
