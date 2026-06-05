-- CreateTable
CREATE TABLE "favoriteRestaurant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "favoriteRestaurant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favoriteRestaurant_userId_restaurantId_key" ON "favoriteRestaurant"("userId", "restaurantId");

-- AddForeignKey
ALTER TABLE "favoriteRestaurant" ADD CONSTRAINT "favoriteRestaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriteRestaurant" ADD CONSTRAINT "favoriteRestaurant_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
