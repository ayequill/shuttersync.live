-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "coverPhoto" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "locked" BOOLEAN DEFAULT false,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "published" BOOLEAN DEFAULT false,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "views" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "name" TEXT,
ADD COLUMN     "publicId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3);
