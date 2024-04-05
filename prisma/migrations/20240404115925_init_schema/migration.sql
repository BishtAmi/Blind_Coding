/*
  Warnings:

  - Added the required column `qid` to the `QuesData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuesData" ADD COLUMN     "qid" INTEGER NOT NULL;
