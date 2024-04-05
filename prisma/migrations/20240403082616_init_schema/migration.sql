-- CreateTable
CREATE TABLE "QuesData" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(1000) NOT NULL,
    "input" VARCHAR(100) NOT NULL,
    "output" VARCHAR(100) NOT NULL,

    CONSTRAINT "QuesData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuesData_id_key" ON "QuesData"("id");
