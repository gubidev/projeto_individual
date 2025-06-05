-- Habilita extensão de UUID (opcional neste caso pois usamos SERIAL)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de médicos
CREATE TABLE IF NOT EXISTS "medicos" (
  "id" SERIAL PRIMARY KEY,
  "nome" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "senha" VARCHAR(100) NOT NULL
);

-- Tabela de pacientes
CREATE TABLE IF NOT EXISTS "pacientes" (
  "id" SERIAL PRIMARY KEY,
  "nome" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "senha" VARCHAR(100) NOT NULL,
  "telefone" VARCHAR(20),
  "cpf" VARCHAR(20) UNIQUE NOT NULL,
  "data_nascimento" DATE NOT NULL,
  "criado_em" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de horários disponíveis (relaciona com médicos e pacientes)
CREATE TABLE IF NOT EXISTS "horarios_disponiveis" (
  "id" SERIAL PRIMARY KEY,
  "medico_id" INTEGER NOT NULL,
  "data" DATE NOT NULL,
  "hora" TIME NOT NULL,
  "paciente_id" INTEGER, -- novo: para agendar diretamente
  "anotacoes" TEXT,       -- novo: para salvar observações do médico
  "criado_em" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "fk_horario_medico" FOREIGN KEY ("medico_id") REFERENCES "medicos" ("id") ON DELETE CASCADE,
  CONSTRAINT "fk_horario_paciente" FOREIGN KEY ("paciente_id") REFERENCES "pacientes" ("id") ON DELETE SET NULL
);

-- Índice único para evitar horários duplicados por médico
CREATE UNIQUE INDEX IF NOT EXISTS "horario_unico" 
ON "horarios_disponiveis" ("data", "hora", "medico_id");

-- Tabela de reservas (relaciona paciente com horário)
CREATE TABLE IF NOT EXISTS "reservas" (
  "id" SERIAL PRIMARY KEY,
  "paciente_id" INTEGER NOT NULL,
  "horario_id" INTEGER NOT NULL,
  "criado_em" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "fk_reserva_paciente" FOREIGN KEY ("paciente_id") REFERENCES "pacientes" ("id") ON DELETE CASCADE,
  CONSTRAINT "fk_reserva_horario" FOREIGN KEY ("horario_id") REFERENCES "horarios_disponiveis" ("id") ON DELETE CASCADE
);

-- Índice para garantir 1 reserva por horário
CREATE UNIQUE INDEX IF NOT EXISTS "reserva_unica_por_horario" 
ON "reservas" ("horario_id");

-- Tabela de anotações médicas
CREATE TABLE IF NOT EXISTS "anotacoes" (
  "id" SERIAL PRIMARY KEY,
  "paciente_id" INTEGER NOT NULL,
  "medico_id" INTEGER NOT NULL,
  "titulo" VARCHAR(100),
  "conteudo" TEXT NOT NULL,
  "criado_em" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "fk_anotacoes_paciente" FOREIGN KEY ("paciente_id") REFERENCES "pacientes" ("id") ON DELETE CASCADE,
  CONSTRAINT "fk_anotacoes_medico" FOREIGN KEY ("medico_id") REFERENCES "medicos" ("id") ON DELETE CASCADE
);

