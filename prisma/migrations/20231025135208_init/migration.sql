-- AlterTable
ALTER TABLE "AppointmentPatientDoctor" ADD COLUMN     "rejectionReason" TEXT,
ALTER COLUMN "status" SET DEFAULT 'Pending';
