/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `FleaMarketProduct` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `FleaMarketProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FleaMarketProduct" ADD COLUMN     "uuid" VARCHAR(32) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FleaMarketProduct_uuid_key" ON "FleaMarketProduct"("uuid");
