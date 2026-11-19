# ADR-002: Aplicação do Padrão de Projeto Strategy para Políticas de Validação de Reserva

- **Status:** Aceito
- **Data:** 19/11/2026

## Contexto

No sistema **UniReserva**, diferentes categorias de recursos universitários possuem regras de negócio e restrições distintas para permitir uma reserva (`RF-04`):

- **Laboratórios (`LABORATORIO`):** Duração máxima de 4 horas por reserva e número de participantes limitado à capacidade física da sala.
- **Auditórios (`AUDITORIO`):** Solicitação com antecedência mínima obrigatória de 24 horas em relação ao horário de início e número de participantes limitado à capacidade do auditório.
- **Equipamentos (`EQUIPAMENTO`):** Duração máxima de 8 horas por empréstimo/reserva e alocação individual (capacidade/participantes = 1).

Se essas regras fossem implementadas diretamente dentro de `ReservaService` por meio de blocos condicionais (`if/else` ou `switch (recurso.tipo)`), a classe de serviço acumularia múltiplas responsabilidades, violaria o Princípio Aberto-Fechado (OCP) e se tornaria um foco clássico de *code smells* (como *Long Method* e *Switch Statements*) à medida que novas categorias de recursos (ex.: Quadra Esportiva, Sala de Reunião) fossem adicionadas.

## Decisão

Aplicaremos o padrão de projeto comportamental **Strategy** (GoF) para encapsular as políticas de validação de cada categoria de recurso em classes independentes dentro de `src/strategies/`:

- `LaboratorioReservaStrategy`: Valida duração máxima de 4h e capacidade do laboratório.
- `AuditorioReservaStrategy`: Valida antecedência mínima de 24h e capacidade do auditório.
- `EquipamentoReservaStrategy`: Valida duração máxima de 8h e limite individual do equipamento.

O serviço `ReservaService` manterá um mapa de estratégias indexado pelo tipo de recurso (permitindo também o registro ou injeção de novas estratégias em tempo de execução, conforme `RNF-04`) e delegará a validação chamando `strategy.validar(reserva, recurso)` antes de confirmar o agendamento.

Esta regra foi espelhada em `.github/copilot-instructions.md`: é proibido utilizar `switch` ou cadeias de `if/else` baseadas em `recurso.tipo` dentro de `ReservaService` para validar regras específicas de categoria.

## Consequências

- **Positivas:**
  - **Coesão e Testabilidade:** Cada regra de categoria pode ser testada isoladamente em `test/strategy.test.js` com casos de borda específicos (ex.: 4h exatas vs. 4h01min).
  - **Extensibilidade (`RNF-04`):** Para adicionar uma nova categoria de recurso (ou quando o professor solicitar a "mudança surpresa" na fase final), basta criar uma nova classe Strategy sem alterar a lógica de agendamento em `ReservaService`.
  - **Prevenção de Code Smells:** Evita métodos longos e alta complexidade ciclomática no serviço principal.
- **Negativas / trade-offs:**
  - Aumenta o número de arquivos/classes na camada `src/strategies/` (uma classe por categoria de recurso), o que é amplamente compensado pela clareza e isolamento de cada política.

## Alternativas descartadas

- **Condicionais (`if/else` ou `switch`) diretamente em `ReservaService`:** Descartado por violar o Princípio Aberto-Fechado (OCP), dificultar testes isolados e gerar o code smell *Switch Statements / Long Method*.
- **Herança com subclasses de `Reserva` (`ReservaLaboratorio`, `ReservaAuditorio`):** Descartado porque a variação de comportamento pertence à política de validação do **recurso** sendo reservado, e não à estrutura de dados da reserva em si; o uso de composição via *Strategy* é mais flexível do que acoplar a validação à hierarquia de herança da reserva.
