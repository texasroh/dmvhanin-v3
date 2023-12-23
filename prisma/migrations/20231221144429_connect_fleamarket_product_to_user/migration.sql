/*
  Warnings:

  - Added the required column `userId` to the `FleaMarketProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FleaMarketProduct" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FleaMarketProduct" ADD CONSTRAINT "FleaMarketProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
