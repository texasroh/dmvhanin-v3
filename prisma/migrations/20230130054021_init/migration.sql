-- CreateTable
CREATE TABLE "BusinessCategory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "BusinessCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessSubcategory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "businessCategoryId" INTEGER NOT NULL,

    CONSTRAINT "BusinessSubcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "businessId" INTEGER NOT NULL,

    CONSTRAINT "BusinessImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "businessSubcategoryId" INTEGER NOT NULL,
    "titleKor" VARCHAR(100) NOT NULL,
    "titleEng" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "address" VARCHAR(100),
    "city" VARCHAR(30),
    "state" CHAR(2),
    "zipcode" CHAR(5),
    "googleMap" TEXT,
    "phone" VARCHAR(10),
    "email" VARCHAR(100),
    "website" VARCHAR(100),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessSubcategory" ADD CONSTRAINT "BusinessSubcategory_businessCategoryId_fkey" FOREIGN KEY ("businessCategoryId") REFERENCES "BusinessCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessImage" ADD CONSTRAINT "BusinessImage_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_businessSubcategoryId_fkey" FOREIGN KEY ("businessSubcategoryId") REFERENCES "BusinessSubcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
