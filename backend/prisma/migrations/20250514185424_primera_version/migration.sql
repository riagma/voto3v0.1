-- CreateTable
CREATE TABLE "Votante" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "primerApellido" TEXT NOT NULL,
    "segundoApellido" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "correo" TEXT,
    "hashContrasena" TEXT,
    "registradoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Eleccion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    "estado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Partido" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "siglas" TEXT NOT NULL,
    "logoUrl" TEXT
);

-- CreateTable
CREATE TABLE "PartidoEleccion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "partidoId" TEXT NOT NULL,
    "eleccionId" TEXT NOT NULL,
    CONSTRAINT "PartidoEleccion_partidoId_fkey" FOREIGN KEY ("partidoId") REFERENCES "Partido" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PartidoEleccion_eleccionId_fkey" FOREIGN KEY ("eleccionId") REFERENCES "Eleccion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RegistroVotanteEleccion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "votanteId" TEXT NOT NULL,
    "eleccionId" TEXT NOT NULL,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RegistroVotanteEleccion_votanteId_fkey" FOREIGN KEY ("votanteId") REFERENCES "Votante" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RegistroVotanteEleccion_eleccionId_fkey" FOREIGN KEY ("eleccionId") REFERENCES "Eleccion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Administrador" (
    "correo" TEXT NOT NULL PRIMARY KEY,
    "hashContrasena" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Votante_dni_key" ON "Votante"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Votante_correo_key" ON "Votante"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Partido_nombre_key" ON "Partido"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Partido_siglas_key" ON "Partido"("siglas");

-- CreateIndex
CREATE UNIQUE INDEX "PartidoEleccion_partidoId_eleccionId_key" ON "PartidoEleccion"("partidoId", "eleccionId");

-- CreateIndex
CREATE UNIQUE INDEX "RegistroVotanteEleccion_votanteId_eleccionId_key" ON "RegistroVotanteEleccion"("votanteId", "eleccionId");
