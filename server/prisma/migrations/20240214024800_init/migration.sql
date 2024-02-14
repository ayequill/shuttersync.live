/*
  Warnings:

  - You are about to drop the column `hashed_password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `User` table. All the data in the column will be lost.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashed_password",
DROP COLUMN "salt",
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "verified" SET DEFAULT false;
