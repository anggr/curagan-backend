/*
  Warnings:

  - The `rejectionReason` column on the `AppointmentPatientDoctor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `specialization` column on the `Doctor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RejectionReason" AS ENUM ('FULL_BOOKED', 'NOT_ON_DUTY', 'OUT_OF_EXPERTISE', 'UNAVAILABLE');

-- AlterTable
ALTER TABLE "AppointmentPatientDoctor" DROP COLUMN "rejectionReason",
ADD COLUMN     "rejectionReason" "RejectionReason";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "specialization",
ADD COLUMN     "specialization" "Specialization" NOT NULL DEFAULT 'Umum';
