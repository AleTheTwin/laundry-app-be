-- CreateEnum
CREATE TYPE "ColorType" AS ENUM ('WHITE', 'DARK', 'LIGHT', 'COLOR');

-- CreateEnum
CREATE TYPE "Dirtyness" AS ENUM ('CLEAN', 'SOMEWHAT_DIRTY', 'DIRTY', 'NEEDS_TREATMENT');

-- CreateEnum
CREATE TYPE "CareType" AS ENUM ('TEMPERATURE', 'BEACH', 'DRYER', 'SPIN');

-- CreateTable
CREATE TABLE "CareInstruction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "careType" "CareType" NOT NULL,
    "value" BOOLEAN NOT NULL,

    CONSTRAINT "CareInstruction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothCareInstruction" (
    "clothId" TEXT NOT NULL,
    "careInstructionId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "ClothCareInstruction_pkey" PRIMARY KEY ("clothId","careInstructionId")
);

-- CreateTable
CREATE TABLE "Cloth" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "colorType" "ColorType" NOT NULL,
    "closetId" TEXT,
    "laundryBatchId" TEXT,

    CONSTRAINT "Cloth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Closet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Closet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WashingMachine" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "maxSupportedWeight" DOUBLE PRECISION NOT NULL,
    "hasDryer" BOOLEAN NOT NULL,
    "maxSupportedWeightForDry" DOUBLE PRECISION,

    CONSTRAINT "WashingMachine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WashingInstruccions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "maxTemperature" DOUBLE PRECISION NOT NULL,
    "washingTime" DOUBLE PRECISION NOT NULL,
    "useDryer" BOOLEAN NOT NULL,
    "useSpin" BOOLEAN NOT NULL,
    "spinRPM" INTEGER NOT NULL,
    "spinTime" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WashingInstruccions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaundryBatch" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "washingInstruccionsId" TEXT NOT NULL,
    "washingMachineId" TEXT NOT NULL,

    CONSTRAINT "LaundryBatch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClothCareInstruction" ADD CONSTRAINT "ClothCareInstruction_clothId_fkey" FOREIGN KEY ("clothId") REFERENCES "Cloth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothCareInstruction" ADD CONSTRAINT "ClothCareInstruction_careInstructionId_fkey" FOREIGN KEY ("careInstructionId") REFERENCES "CareInstruction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cloth" ADD CONSTRAINT "Cloth_closetId_fkey" FOREIGN KEY ("closetId") REFERENCES "Closet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cloth" ADD CONSTRAINT "Cloth_laundryBatchId_fkey" FOREIGN KEY ("laundryBatchId") REFERENCES "LaundryBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaundryBatch" ADD CONSTRAINT "LaundryBatch_washingInstruccionsId_fkey" FOREIGN KEY ("washingInstruccionsId") REFERENCES "WashingInstruccions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaundryBatch" ADD CONSTRAINT "LaundryBatch_washingMachineId_fkey" FOREIGN KEY ("washingMachineId") REFERENCES "WashingMachine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
