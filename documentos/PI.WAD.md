# Documento da Aplicação Web - Projeto Individual - Módulo 2 - Inteli

## Site para medico

#### Felipe Caiafa Alvim Soares

## Sumário

1.  [Introdução](https://www.google.com/search?q=%23introducao)
2.  [Visão Geral da Aplicação Web](https://www.google.com/search?q=%23visao-geral)
3.  [Projeto Técnico da Aplicação Web](https://www.google.com/search?q=%23projeto-tecnico)
4.  [Desenvolvimento da Aplicação Web](https://www.google.com/search?q=%23desenvolvimento)
5.  [Referências](https://www.google.com/search?q=%23referencias)

-----

## 1. Introdução

O sistema proposto é uma aplicação web de reserva de horários para consultas médicas, voltado tanto para profissionais da saúde quanto para seus pacientes. A ideia central é permitir que o médico possa cadastrar seus horários disponíveis ao longo da semana, e que os pacientes possam visualizar esses horários e realizar agendamentos conforme sua conveniência.

A plataforma será simples, acessível e eficaz, com uma interface intuitiva para ambos os tipos de usuários. O médico terá acesso a um painel para gerenciar a disponibilidade, visualizar consultas já marcadas e realizar eventuais alterações. Os pacientes, por sua vez, poderão visualizar os horários livres e confirmar a reserva de uma consulta, recebendo feedback imediato sobre a disponibilidade. O objetivo do projeto é oferecer uma solução digital prática e funcional que facilite a organização da rotina médica, evitando conflitos de horário e otimizando o tempo de todos os envolvidos.

-----

## 2. Visão Geral da Aplicação Web

### 2.1. Personas

\<p align="center"\>
\<a href="[link suspeito removido]"\>
\<img src="/assets/WAD/persona.png" width="1000px;" alt="Persona 1 Imagem" style="border-radius: 8px;"/\>
\</a\>
\</p\>

### 2.2. User Stories

| ID    | Como...                                             | Quero...                                                               | Para que...                                                                 |
| :---- | :-------------------------------------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| US01  | Como médico                                         | cadastrar meus horários disponíveis                                    | os pacientes possam visualizar quando posso atendê-los.                     |
| US02  | Como paciente                                       | visualizar os horários livres do médico                                | eu possa agendar uma consulta com facilidade.                               |
| US03  | Como médico                                         | visualizar a lista de consultas marcadas por dia                       | eu possa me organizar com antecedência.                                     |

#### Análise INVEST da US01

  * **I – Independente:** Esta User Story pode ser implementada separadamente de outras funcionalidades, como a visualização das reservas.
  * **N – Negociável:** A forma como os horários são cadastrados pode ser ajustada conforme feedback, por exemplo, por intervalo ou por agenda semanal.
  * **V – Valiosa:** Permite que o sistema funcione corretamente e possibilita o agendamento por parte dos pacientes.
  * **E – Estimável:** Pode ser estimada com clareza, pois envolve formulários de entrada e controle de dados no banco.
  * **S – Pequena:** A tarefa é limitada e pode ser dividida facilmente em subcomponentes (interface, lógica, banco).
  * **T – Testável:** É possível testar se os horários estão sendo cadastrados corretamente e salvos no banco de dados.

-----

## 3. Projeto Técnico da Aplicação Web

### 3.1. Modelagem do Banco de Dados

\<p align="center"\>
\<img src="/assets/WAD/diagrama.png" width="1000px;" alt="Diagrama do Banco de Dados" style="border-radius: 8px;"/\>
\</p\>

```sql
CREATE TABLE "medicos" (
  "id" SERIAL PRIMARY KEY,
  "nome" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "senha" VARCHAR(100) NOT NULL
);

CREATE TABLE "horarios_disponiveis" (
  "id" SERIAL PRIMARY KEY,
  "medico_id" INTEGER NOT NULL,
  "data" DATE NOT NULL,
  "hora" TIME NOT NULL,
  "criado_em" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "pacientes" (
  "id" SERIAL PRIMARY KEY,
  "nome" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "senha" VARCHAR(100) NOT NULL,
  "telefone" VARCHAR(20),
  "criado_em" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "reservas" (
  "id" SERIAL PRIMARY KEY,
  "paciente_id" INTEGER NOT NULL,
  "horario_id" INTEGER NOT NULL,
  "criado_em" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE UNIQUE INDEX "horario_unico" ON "horarios_disponiveis" ("data", "hora", "medico_id");

CREATE UNIQUE INDEX "reserva_unica_por_horario" ON "reservas" ("horario_id");

ALTER TABLE "horarios_disponiveis" ADD CONSTRAINT "fk_horario_medico" FOREIGN KEY ("medico_id") REFERENCES "medicos" ("id") ON DELETE CASCADE;

ALTER TABLE "reservas" ADD CONSTRAINT "fk_paciente" FOREIGN KEY ("paciente_id") REFERENCES "pacientes" ("id") ON DELETE CASCADE;

ALTER TABLE "reservas" ADD CONSTRAINT "fk_horario" FOREIGN KEY ("horario_id") REFERENCES "horarios_disponiveis" ("id") ON DELETE CASCADE;
```

### 3.1.1. Modelos do Banco de Dados

1.  **Modelo:** `Horario.js`
      * **Responsabilidade:** Interage com a tabela `horarios_disponiveis`.
      * **Funcionalidade:** Permite criar um novo horário disponível para um médico já cadastrado.

### 3.2. Arquitetura (MVC)

\<p align="center"\>
\<img src="/assets/WAD/diagrama\_mvc.png" width="1000px;" alt="Diagrama de Arquitetura MVC" style="border-radius: 8px;"/\>
\</p\>

  * **Model:** A camada que lida com a lógica de negócios e interage com o banco de dados.
  * **View:** A camada responsável pela interface de usuário.
  * **Controller:** A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.

### 3.3. Wireframes

\<p align="center"\>
\<a href="[link suspeito removido]"\>
\<img src="/assets/WAD/wireframe\_login.png" width="1000px;" alt="Wireframe Tela de Login" style="border-radius: 8px;"/\>
\</a\>
\</p\>
\<p align="center"\>
\<a href="[link suspeito removido]"\>
\<img src="/assets/WAD/wireframe\_bemvindo\_dr.png" width="1000px;" alt="Wireframe Tela Bem-vindo Doutor" style="border-radius: 8px;"/\>
\</a\>
\</p\>
\<p align="center"\>
\<a href="[link suspeito removido]"\>
\<img src="/assets/WAD/wireframe\_pacientes\_dia.png" width="1000px;" alt="Wireframe Pacientes do Dia" style="border-radius: 8px;"/\>
\</a\>
\</p\>
\<p align="center"\>
\<a href="[link suspeito removido]"\>
\<img src="/assets/WAD/wireframe\_bemvindo.png" width="1000px;" alt="Wireframe Tela Bem-vindo Paciente" style="border-radius: 8px;"/\>
\</a\>
\</p\>
\<p align="center"\>
\<a href="[link suspeito removido]"\>
\<img src="/assets/WAD/wireframe\_horario.png" width="1000px;" alt="Wireframe Tela Marcar Horário" style="border-radius: 8px;"/\>
\</a\>
\</p\>

### 3.4. Guia de Estilos

\<p align="center"\>
\<img src="/assets/WAD/guia\_estilo.png" width="1000px;" alt="Guia de Estilos" style="border-radius: 8px;"/\>
\</p\>

### 3.5. Protótipo de Alta Fidelidade

**Link:** [https://www.figma.com/design/utkNtl7oMYC0zAjiixhWez/Untitled?node-id=0-1\&t=iBE5LQLBOCClMPOX-1](https://www.figma.com/design/utkNtl7oMYC0zAjiixhWez/Untitled?node-id=0-1&t=iBE5LQLBOCClMPOX-1)

\<p align="center"\>
\<img src="/assets/WAD/horarios\_disponiveis2.png" width="1000px;" alt="Protótipo Tela Horários Disponíveis" style="border-radius: 8px;"/\>
\</p\>

### 3.6. WebAPI e Endpoints

[**Documentação Completa dos Endpoints**](https://www.google.com/search?q=LINK_PARA_SUA_DOCUMENTACAO_DE_API_AQUI)

### 3.7. Interface e Navegação

\<p align="center"\>
\<img src="/assets/WAD/tela1.png" width="1000px;" alt="Tela 1 da Aplicação" style="border-radius: 8px;"/\>
\</p\>
\<p align="center"\>
\<img src="/assets/WAD/tela2.png" width="1000px;" alt="Tela 2 da Aplicação" style="border-radius: 8px;"/\>
\</p\>
\<p align="center"\>
\<img src="/assets/WAD/tela3.png" width="1000px;" alt="Tela 3 da Aplicação" style="border-radius: 8px;"/\>
\</p\>
\<p align="center"\>
\<img src="/assets/WAD/tela4.png" width="1000px;" alt="Tela 4 da Aplicação" style="border-radius: 8px;"/\>
\</p\>

-----

## 4. Desenvolvimento da Aplicação Web

### 4.1. Demonstração do Sistema Web

**Vídeo:** Não tem

O desenvolvimento do sistema web completo focou na implementação das funcionalidades essenciais de cadastro de horários por parte dos médicos e agendamento por parte dos pacientes, conforme as User Stories definidas. A arquitetura MVC foi aplicada para organizar o código, separando a lógica de negócios, a interface do usuário e o controle de requisições. O banco de dados PostgreSQL foi utilizado para persistir as informações de médicos, pacientes, horários e reservas.

### 4.2. Conclusões e Trabalhos Futuros

**Pontos Fortes:**

  * Interface intuitiva e focada na experiência do usuário para agendamentos e gerenciamento.
  * Utilização de um banco de dados relacional robusto para garantir a integridade dos dados.
  * Estrutura de código organizada seguindo o padrão MVC, facilitando a manutenção e futuras expansões.

**Pontos a Melhorar:**

  * Implementação de um sistema de notificações (e-mail/SMS) para confirmar agendamentos e lembretes.
  * Desenvolvimento de uma funcionalidade de cancelamento ou reagendamento de consultas pelos usuários.
  * Melhorias na validação de entrada de dados para garantir a robustez do sistema.

**Ideias para Melhorias Futuras:**

  * Funcionalidade de perfil completo para médicos e pacientes, com histórico de consultas.
  * Integração com sistemas de calendário (Google Calendar, Outlook) para sincronização automática.
  * Relatórios e dashboards para médicos visualizarem estatísticas de agendamentos.
  * Criação de um sistema de avaliação de consultas para pacientes.

-----

## 5. Referências

  * 

-----
