# Relatório de code smells e refatoração — UniReserva

> **Status na Entrega Parcial 01:** Estrutura e critérios de auditoria definidos na fase de planejamento. Conforme o roteiro da disciplina, os *code smells* identificados no código gerado pelo agente GitHub Copilot durante as Sprints 1 a 3 e a refatoração obrigatória serão consolidados neste documento à medida que as histórias `US-01` a `US-06` forem implementadas.

## Critérios de Auditoria Definidos pelo Grupo

Durante a revisão humana dos Pull Requests e com auxílio do agente `Revisor`, o grupo auditará o código proposto pelo agente `Implementador` buscando especificamente os seguintes *code smells* (catálogo de Martin Fowler):

| # | Code Smell Monitorado | Onde costuma ocorrer no UniReserva | Ação de Refatoração Prevista |
|---|---|---|---|
| 1 | **Long Method (Método Longo)** | Método `criarReserva()` em `ReservaService` acumulando validação de datas, busca de recurso, checagem de conflito e instanciação. | *Extract Method* (Extrair métodos privados semânticos como `_validarIntervaloDatas` e `_verificarConflitoHorario`). |
| 2 | **Switch Statements / Condicionais Complexas** | Uso de `if/else` ou `switch (recurso.tipo)` para validar limites de Laboratório, Auditório e Equipamento fora das classes Strategy. | *Replace Conditional with Polymorphism* (Mover a regra para a classe correspondente em `src/strategies/` conforme `ADR-002`). |
| 3 | **Magic Numbers (Números Mágicos)** | Valores literais soltos no código como `4`, `8`, `24` ou `3600000` nos cálculos de horas de duração e antecedência. | *Replace Magic Number with Symbolic Constant* (Extrair constantes nomeadas como `MAX_HORAS_LABORATORIO = 4`, `MIN_ANTECEDENCIA_AUDITORIO_HORAS = 24`, `MS_POR_HORA`). |
| 4 | **Duplicate Code (Código Duplicado)** | Cálculo repetido de diferença de horas entre `inicio` e `fim` nas diferentes classes *Strategy*. | *Extract Function / Helper* (Centralizar função utilitária pura `calcularDuracaoEmHoras(inicio, fim)`). |

---

## Smells identificados no código gerado pela IA (Registro das Sprints)

| Id | Arquivo e trecho | Code smell identificado | Impacto na qualidade | Status |
|---|---|---|---|---|
| SM-01 | `src/services/ReservaService.js` / `src/strategies/` *(a auditar nas Sprints 1 e 2)* | Monitoramento de *Long Method*, *Magic Numbers* e *Duplicate Code* nas entregas do agente `Implementador` | Dificulta leitura e manutenção das regras de agendamento | Planejado para auditoria na Sprint 2/3 (`T-02`) |

## Refatoração realizada (Estrutura preparada para a Sprint 2/3 — Tarefa `T-02`)

- **Alvo planejado:** Código gerado pelo agente para validação de reservas e cálculo de intervalos de tempo.
- **Antes:** Será registrado o snippet original gerado pelo agente `Implementador` antes da intervenção de refatoração da equipe.
- **Depois:** Será registrado o snippet refatorado aplicando extração de método/constantes e isolamento via padrão *Strategy*.
- **Por que melhorou:** Redução da complexidade ciclomática, eliminação de números mágicos e aderência estrita ao `ADR-002`.
- **Como sabemos que o comportamento não mudou:** Execução integral da suíte `npm test` (`node --test`) e `npm run lint` antes e depois da refatoração, mantendo 100% dos testes verdes no pipeline de CI.
