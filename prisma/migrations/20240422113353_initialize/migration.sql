/*
  Warnings:

  - You are about to drop the column `endTime` on the `UserData` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `UserData` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserData_username_key";

-- AlterTable
ALTER TABLE "UserData" DROP COLUMN "endTime",
DROP COLUMN "startTime";
