/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Business` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Business_uuid_key" ON "Business"("uuid");
