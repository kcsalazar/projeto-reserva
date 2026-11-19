# ADR-001: Adoção de Node.js 22 (ESM) e Arquitetura em Camadas com Persistência em Memória

- **Status:** Aceito
- **Data:** 19/11/2026

## Contexto

O projeto **UniReserva** precisa implementar um núcleo de regras de negócio confiável e altamente testável para agendamento de laboratórios, auditórios e equipamentos da universidade. A disciplina exige escolha entre Node.js (v22+) ou Java (17 + Maven), configuração de Integração Contínua (CI) com análise estática (lint) e execução de testes automatizados (TDD), além de uso controlado da cota de 200 créditos mensais do GitHub Copilot.

Precisamos de uma estrutura arquitetural que separe claramente as entidades de domínio, as estratégias de validação, o armazenamento de dados e os serviços de aplicação, sem introduzir dependências pesadas de infraestrutura (como bancos de dados relacionais externos ou frameworks web complexos) que dificultem os testes unitários e consumam tokens desnecessários nas sessões do agente.

## Decisão

Adotaremos **Node.js 22 (com módulos ES — ESM)** utilizando exclusivamente o **executor de testes nativo (`node --test`)** e o **ESLint 9** para análise estática, organizando o código em quatro camadas dentro de `src/`:

1. `src/domain/`: Entidades e objetos de valor do domínio (`Recurso`, `Reserva`).
2. `src/strategies/`: Políticas de validação por tipo de recurso aplicando o padrão *Strategy* (detalhado no `ADR-002`).
3. `src/repositories/`: Repositórios de persistência em memória (`RecursoRepository`, `ReservaRepository`) com interface bem definida.
4. `src/services/`: Casos de uso e orquestração das regras de negócio (`RecursoService`, `ReservaService`).

Esta decisão estabelece também como regra obrigatória em `.github/copilot-instructions.md` que o agente não deve instalar bibliotecas externas de teste (como Jest ou Mocha) nem bancos de dados externos, mantendo o foco no domínio e na velocidade do CI.

## Consequências

- **Positivas:**
  - Zero dependências de runtime externas: instalação e execução no GitHub Actions ocorrem em poucos segundos.
  - O runner nativo `node --test` e `node:assert/strict` do Node.js 22 eliminam problemas de configuração de transpiladores.
  - A separação entre `services`, `strategies`, `domain` e `repositories` facilita o desenvolvimento guiado por testes (TDD) e permite que cada integrante trabalhe em histórias distintas com baixo risco de conflito de merge.
  - Contexto enxuto e previsível para o GitHub Copilot, reduzindo o gasto de créditos de IA.
- **Negativas / trade-offs:**
  - Os dados ficam armazenados em memória durante o ciclo de vida da execução/teste, não persistindo em disco após o encerramento do processo (o que é adequado ao escopo acadêmico do projeto e aos testes automatizados).

## Alternativas descartadas

- **Java 17 com Maven e JUnit 5:** Embora suportado pelo template da disciplina, a equipe possui maior familiaridade e agilidade com JavaScript/Node.js, que requer menos código boilerplate para configuração inicial e execução rápida de testes.
- **Node.js com Banco de Dados SQLite/PostgreSQL e ORM (Prisma/Sequelize):** Descartado porque adicionaria complexidade de migrações e I/O assíncrono que não agregam valor à avaliação das regras de negócio, padrões de projeto e testes unitários do UniReserva.
