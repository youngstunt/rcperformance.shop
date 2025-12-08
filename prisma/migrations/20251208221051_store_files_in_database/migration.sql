/*
  Warnings:

  - You are about to drop the column `filePath` on the `TicketFile` table. All the data in the column will be lost.
  - Added the required column `data` to the `TicketFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TicketFile" DROP COLUMN "filePath",
ADD COLUMN     "data" BYTEA NOT NULL;
