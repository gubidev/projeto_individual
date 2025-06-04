-- init.sql

-- Criar extensão para suportar UUIDs, se ainda não estiver ativada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela de usuários com UUID como chave primária
CREATE TABLE IF NOT EXISTS "medicos" (
  "id" SERIAL PRIMARY KEY,
  "nome" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "senha" VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS "horarios_disponiveis" (
  "id" SERIAL PRIMARY KEY,
  "medico_id" INTEGER NOT NULL,
  "data" DATE NOT NULL,
  "hora" TIME NOT NULL,
  "criado_em" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS "pacientes" (
  "id" SERIAL PRIMARY KEY,
  "nome" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "senha" VARCHAR(100) NOT NULL,
  "telefone" VARCHAR(20),
  "cpf" VARCHAR(20) UNIQUE NOT NULL,
  "data_nascimento" DATE NOT NULL,
  "criado_em" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS "reservas" (
  "id" SERIAL PRIMARY KEY,
  "paciente_id" INTEGER NOT NULL,
  "horario_id" INTEGER NOT NULL,
  "criado_em" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS "anotacoes" (
  "id" SERIAL PRIMARY KEY,
  "paciente_id" INTEGER NOT NULL,
  "medico_id" INTEGER NOT NULL,
  "titulo" VARCHAR(100),
  "conteudo" TEXT NOT NULL,
  "criado_em" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE UNIQUE INDEX "horario_unico" ON "horarios_disponiveis" ("data", "hora", "medico_id");

CREATE UNIQUE INDEX "reserva_unica_por_horario" ON "reservas" ("horario_id");

ALTER TABLE "horarios_disponiveis" ADD CONSTRAINT "fk_horario_medico" FOREIGN KEY ("medico_id") REFERENCES "medicos" ("id") ON DELETE CASCADE;

ALTER TABLE "reservas" ADD CONSTRAINT "fk_paciente" FOREIGN KEY ("paciente_id") REFERENCES "pacientes" ("id") ON DELETE CASCADE;

ALTER TABLE "reservas" ADD CONSTRAINT "fk_horario" FOREIGN KEY ("horario_id") REFERENCES "horarios_disponiveis" ("id") ON DELETE CASCADE;

ALTER TABLE "anotacoes" ADD CONSTRAINT "fk_anotacoes_paciente" FOREIGN KEY ("paciente_id") REFERENCES "pacientes" ("id") ON DELETE CASCADE;

ALTER TABLE "anotacoes" ADD CONSTRAINT "fk_anotacoes_medico" FOREIGN KEY ("medico_id") REFERENCES "medicos" ("id") ON DELETE CASCADE;

