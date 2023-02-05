/*
  Warnings:

  - You are about to drop the column `url` on the `BusinessImage` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `BusinessImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "logoImageId" TEXT;

-- AlterTable
ALTER TABLE "BusinessImage" DROP COLUMN "url",
ADD COLUMN     "imageId" TEXT NOT NULL;
