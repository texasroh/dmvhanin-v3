-- CreateEnum
CREATE TYPE "FleaMarketStatus" AS ENUM ('OPEN', 'PENDING', 'SOLD', 'CLOSE');

-- CreateTable
CREATE TABLE "FleaMarketCategory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "FleaMarketCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FleaMarketProduct" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "description" JSONB NOT NULL,
    "status" "FleaMarketStatus" NOT NULL,

    CONSTRAINT "FleaMarketProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FleaMarketImage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "url" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "FleaMarketImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatRoom" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "fleaMarketProductId" INTEGER,

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersInChatRooms" (
    "joinedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatRoomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UsersInChatRooms_pkey" PRIMARY KEY ("chatRoomId","userId")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "chatRoomId" INTEGER NOT NULL,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FleaMarketProduct" ADD CONSTRAINT "FleaMarketProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FleaMarketCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FleaMarketImage" ADD CONSTRAINT "FleaMarketImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "FleaMarketProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_fleaMarketProductId_fkey" FOREIGN KEY ("fleaMarketProductId") REFERENCES "FleaMarketProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersInChatRooms" ADD CONSTRAINT "UsersInChatRooms_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersInChatRooms" ADD CONSTRAINT "UsersInChatRooms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
