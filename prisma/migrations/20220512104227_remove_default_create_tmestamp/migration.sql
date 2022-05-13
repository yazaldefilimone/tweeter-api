/*
  Warnings:

  - Added the required column `content` to the `post_comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post_comments" ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "localization" TEXT,
ADD COLUMN     "website_url" TEXT,
ALTER COLUMN "created_at" DROP DEFAULT;
