# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._**

## Nome do Projeto

#### Felipe Caiafa Alvim Soares

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

O sistema proposto é uma aplicação web de reserva de horários para consultas médicas, voltado tanto para profissionais da saúde quanto para seus pacientes. A ideia central é permitir que o médico possa cadastrar seus horários disponíveis ao longo da semana, e que os pacientes possam visualizar esses horários e realizar agendamentos conforme sua conveniência.

A plataforma será simples, acessível e eficaz, com uma interface intuitiva para ambos os tipos de usuários. O médico terá acesso a um painel para gerenciar a disponibilidade, visualizar consultas já marcadas e realizar eventuais alterações. Os pacientes, por sua vez, poderão visualizar os horários livres e confirmar a reserva de uma consulta, recebendo feedback imediato sobre a disponibilidade. O objetivo do projeto é oferecer uma solução digital prática e funcional que facilite a organização da rotina médica, evitando conflitos de horário e otimizando o tempo de todos os envolvidos.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

<td align="center"><a href="https://www.figma.com/design/lvM7DggvbcJU1FawKxpL2j/Untitled?node-id=1-2&t=qpPqvuLusTfCnXtJ-1"><img style="border-radius: 100%;" src="/assets/WAD/persona.png" width="1000px;" alt="Persona 1 Imagem"/>



### 2.2. User Stories (Semana 01)

US01 | Como médico, quero cadastrar meus horários disponíveis, para que os pacientes possam visualizar quando posso atendê-los.

US02 | Como paciente, quero visualizar os horários livres do médico, para que eu possa agendar uma consulta com facilidade.

US03 | Como médico, quero visualizar a lista de consultas marcadas por dia, para que eu possa me organizar com antecedência.

#### Análise INVEST da US01

I – Independente: Esta US pode ser implementada separadamente de outras funcionalidades, como a visualização das reservas.

N – Negociável: A forma como os horários são cadastrados pode ser ajustada conforme feedback, por exemplo, por intervalo ou por agenda semanal.

V – Valiosa: Permite que o sistema funcione corretamente e possibilita o agendamento por parte dos pacientes.

E – Estimável: Pode ser estimada com clareza, pois envolve formulários de entrada e controle de dados no banco.

S – Pequena: A tarefa é limitada e pode ser dividida facilmente em subcomponentes (interface, lógica, banco).

T – Testável: É possível testar se os horários estão sendo cadastrados corretamente e salvos no banco de dados.

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

<td align="center"><img style="border-radius: 100%;" src="/assets/WAD/diagrama.png" width="1000px;" alt="Diagrama Imagem"/>

```
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

CREATE TABLE "anotacoes" (
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


```

### 3.1.1 BD e Models (Semana 5)

1. Model: Horario.js
Responsável por interagir com a tabela horarios_disponiveis. Esse model permite:

Criar um novo horário disponível para um médico já cadastrado.

### 3.2. Arquitetura (Semana 5)

<td align="center"><img style="border-radius: 100%;" src="/assets/WAD/diagrama_mvc.png" width="1000px;" alt="Diagrama MVC Imagem"/>

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

<td align="center"><a href="https://www.figma.com/design/utkNtl7oMYC0zAjiixhWez/Untitled?node-id=0-1&t=z2hIJHQdGXZ6pIuR-1"><img style="border-radius: 100%;" src="/assets/WAD/wireframe_login.png" width="1000px;" alt="Wireframe Tela Login"/>

<td align="center"><a href="https://www.figma.com/design/utkNtl7oMYC0zAjiixhWez/Untitled?node-id=0-1&t=z2hIJHQdGXZ6pIuR-1"><img style="border-radius: 100%;" src="/assets/WAD/wireframe_bemvindo_dr.png" width="1000px;" alt="Wireframe Tela Bemvindo Doutor"/>

<td align="center"><a href="https://www.figma.com/design/utkNtl7oMYC0zAjiixhWez/Untitled?node-id=0-1&t=z2hIJHQdGXZ6pIuR-1"><img style="border-radius: 100%;" src="/assets/WAD/wireframe_pacientes_dia.png" width="1000px;" alt="Wireframe Pacientes do dia"/>

<td align="center"><a href="https://www.figma.com/design/utkNtl7oMYC0zAjiixhWez/Untitled?node-id=0-1&t=z2hIJHQdGXZ6pIuR-1"><img style="border-radius: 100%;" src="/assets/WAD/wireframe_anotações.png" width="1000px;" alt="Wireframe Anotações do paciente"/>

<td align="center"><a href="https://www.figma.com/design/utkNtl7oMYC0zAjiixhWez/Untitled?node-id=0-1&t=z2hIJHQdGXZ6pIuR-1"><img style="border-radius: 100%;" src="/assets/WAD/wireframe_bemvindo.png" width="1000px;" alt="Wireframe Tela Bemvindo Paciente"/>

<td align="center"><a href="https://www.figma.com/design/utkNtl7oMYC0zAjiixhWez/Untitled?node-id=0-1&t=z2hIJHQdGXZ6pIuR-1"><img style="border-radius: 100%;" src="/assets/WAD/wireframe_horario.png" width="1000px;" alt="Wireframe Tela Marcar Horario"/>

### 3.4. Guia de estilos (Semana 05)

<td align="center"><img style="border-radius: 100%;" src="/assets/WAD/guia_estilo.png" width="1000px;" alt="Wireframe Tela Login"/>


### 3.5. Protótipo de alta fidelidade (Semana 05)

link: https://www.figma.com/design/utkNtl7oMYC0zAjiixhWez/Untitled?node-id=0-1&t=iBE5LQLBOCClMPOX-1 

<td align="center"><img style="border-radius: 100%;" src="/assets/WAD/anotacoes_pacientes2.png" width="1000px;" alt="Wireframe Tela Login"/>

<td align="center"><img style="border-radius: 100%;" src="/assets/WAD/horarios_disponiveis2.png" width="1000px;" alt="Wireframe Tela Login"/>

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---
