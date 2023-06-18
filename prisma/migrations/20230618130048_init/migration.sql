-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "lastLogin" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uid" VARCHAR(50) NOT NULL,
    "displayName" VARCHAR(50) NOT NULL,
    "photoURL" VARCHAR(250) NOT NULL,
    "email" VARCHAR(50) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCategory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "key" VARCHAR(20) NOT NULL,
    "sort" INTEGER NOT NULL,

    CONSTRAINT "BusinessCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessSubcategory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "businessCategoryId" INTEGER NOT NULL,

    CONSTRAINT "BusinessSubcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessImage" (
    "id" SERIAL NOT NULL,
    "imageId" TEXT NOT NULL,
    "businessId" INTEGER NOT NULL,
    "sort" INTEGER NOT NULL,

    CONSTRAINT "BusinessImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(32),
    "logoImageId" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "businessSubcategoryId" INTEGER NOT NULL,
    "titleKor" VARCHAR(100) NOT NULL,
    "titleEng" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "address" VARCHAR(100),
    "city" VARCHAR(30),
    "state" CHAR(2),
    "zipcode" CHAR(5),
    "googleMap" TEXT,
    "phone" VARCHAR(10),
    "email" VARCHAR(100),
    "website" VARCHAR(100),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "totalRating" INTEGER NOT NULL DEFAULT 0,
    "totalReview" INTEGER NOT NULL DEFAULT 0,
    "avgRating" DECIMAL(3,2) NOT NULL DEFAULT 0,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessReview" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "businessId" INTEGER NOT NULL,
    "rawContent" TEXT NOT NULL,
    "reviewHTML" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BusinessReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCategory_key_key" ON "BusinessCategory"("key");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessImage_businessId_sort_key" ON "BusinessImage"("businessId", "sort");

-- CreateIndex
CREATE UNIQUE INDEX "Business_uuid_key" ON "Business"("uuid");

-- AddForeignKey
ALTER TABLE "BusinessSubcategory" ADD CONSTRAINT "BusinessSubcategory_businessCategoryId_fkey" FOREIGN KEY ("businessCategoryId") REFERENCES "BusinessCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessImage" ADD CONSTRAINT "BusinessImage_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_businessSubcategoryId_fkey" FOREIGN KEY ("businessSubcategoryId") REFERENCES "BusinessSubcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessReview" ADD CONSTRAINT "BusinessReview_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessReview" ADD CONSTRAINT "BusinessReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
