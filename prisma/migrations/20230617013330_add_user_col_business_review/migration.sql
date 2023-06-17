/*
  Warnings:

  - You are about to drop the column `uid` on the `BusinessReview` table. All the data in the column will be lost.
  - Added the required column `userId` to the `BusinessReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessReview" DROP COLUMN "uid",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uid" VARCHAR(50) NOT NULL,
    "displayName" VARCHAR(50) NOT NULL,
    "photoURL" VARCHAR(250) NOT NULL,
    "email" VARCHAR(50) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- AddForeignKey
ALTER TABLE "BusinessReview" ADD CONSTRAINT "BusinessReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
