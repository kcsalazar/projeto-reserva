# Plano de teste — UniReserva

> Estratégia de verificação e validação (V&V) do sistema UniReserva aplicando TDD e Integração Contínua.

## 1. O que será testado

Serão testados todos os requisitos funcionais (`RF-01` a `RF-06`) e não funcionais (`RNF-01` a `RNF-04`) especificados em [`specs/requisitos.md`](../specs/requisitos.md), abrangendo:
- **Gerenciamento de Recursos (`RF-01`):** Cadastro válido de laboratórios, auditórios e equipamentos, listagem geral e rejeição de códigos duplicados, capacidades inválidas ou tipos inexistentes.
- **Detecção de Conflitos e Disponibilidade (`RF-02`, `RF-03`):** Criação de reservas sem sobreposição, bloqueio de reservas com sobreposição total ou parcial de horário no mesmo recurso, rejeição de recursos inativos e consulta de recursos livres por janela de tempo.
- **Políticas de Validação via Padrão *Strategy* (`RF-04`, `RNF-04`):**
  - `LaboratorioReservaStrategy`: Limite de duração de até 4h e respeito à capacidade máxima da sala.
  - `AuditorioReservaStrategy`: Antecedência mínima de 24h entre solicitação e início do evento, além da capacidade máxima.
  - `EquipamentoReservaStrategy`: Limite de duração de até 8h e uso individual (1 participante).
  - Extensibilidade do `ReservaService` ao receber uma nova estratégia sem alterar seu código interno.
- **Cancelamento e Histórico (`RF-05`, `RF-06`):** Mudança de status para `CANCELADA`, liberação imediata do horário para novo agendamento, bloqueio de cancelamento por usuário não titular e ordenação cronológica da agenda.
- **Desempenho (`RNF-01`):** Tempo de resposta inferior a `50 ms` para validação e inserção de reserva em base com 1.000 reservas ativas em memória.

## 2. Níveis

| Nível | Onde | Quem escreve |
|---|---|---|
| **Unidade** | `test/strategy.test.js` e `test/recurso.test.js` (testando entidades de domínio, repositórios e cada classe *Strategy* isoladamente com `node --test`) | Integrante responsável pela história (humano), antes de pedir a implementação ao agente |
| **Aceitação / Integração de Serviços** | `test/reserva.test.js` (testando os fluxos completos de `ReservaService` e `RecursoService` contra os critérios de aceitação de `RF-01` a `RF-06` e `RNF-01`) | Integrante responsável pela história em conjunto com o QA/PO, antes da codificação |
| **Análise estática (lint)** | Configurado em `eslint.config.js` e executado sobre `src/**/*.js` e `test/**/*.js` via `npm run lint` e no GitHub Actions (`.github/workflows/ci.yml`) | Configurado pelo Arquiteto Técnico na Sprint 1 e verificado automaticamente a cada commit/PR |

## 3. TDD (Desenvolvimento Guiado por Testes)

- **Como o grupo vai aplicar:**
  1. **Red (Humano escreve o teste):** Antes de acionar o agente `Implementador` do GitHub Copilot para qualquer história de usuário (`US-01` a `US-06`), o integrante responsável cria ou atualiza o arquivo de teste correspondente em `test/`, traduzindo os critérios de aceitação de `specs/requisitos.md` em asserções `node:assert/strict`, e confirma que o teste falha.
  2. **Green (Agente propõe a implementação):** O integrante invoca o agente `Implementador` em sessão curta informando apenas a história, o requisito e o teste que precisa passar. O código proposto é avaliado e ajustado até que `npm test` passe integralmente.
  3. **Refactor (Revisão e limpeza):** O integrante (com apoio opcional do agente `Revisor`) verifica *code smells*, executa `npm run lint` e registra eventuais refatorações em `docs/relatorio-smells.md` garantindo que todos os testes continuem passando.

## 4. Como registrar

- **Onde:**
  - Os casos de teste executáveis ficam versionados na pasta `test/` e mapeados na tabela de **Rastreabilidade** em [`specs/requisitos.md`](../specs/requisitos.md).
  - O histórico de execução pública de cada commit e Pull Request fica registrado na aba **Actions** do repositório GitHub (`.github/workflows/ci.yml`) e referenciado no checklist de cada Pull Request.

## 5. Cronograma previsto

| Etapa / Sprint | Atividades de Teste e Verificação |
|---|---|
| **Entrega Parcial 01 (Planejamento)** | Definição do plano de testes, ativação do pipeline de CI (`.github/workflows/ci.yml`) com ESLint + smoke test em Node.js 22. |
| **Sprint 1** | Escrita prévia (TDD) e execução dos testes de `RF-01` (Cadastro de recursos) e `RF-03` (Criação de reserva e conflito de horário). |
| **Sprint 2** | Escrita prévia (TDD) e execução dos testes de `RF-04` / `RNF-04` (Padrão *Strategy* por tipo de recurso), `RF-02` (Consulta de disponibilidade) e `RNF-01` (Teste de desempenho < 50 ms com 1.000 reservas). |
| **Sprint 3** | Escrita prévia (TDD) e execução dos testes de `RF-05` (Cancelamento), `RF-06` (Agenda por recurso/solicitante), regressão completa e validação após refatoração de *code smells*. |

## 6. Critério para encerrar

A fase de testes de cada história e da entrega final só é considerada encerrada quando:
1. Todos os requisitos funcionais (`RF-01` a `RF-06`) e não funcionais (`RNF-01` a `RNF-04`) estiverem cobertos por testes automatizados listados na matriz de rastreabilidade de `specs/requisitos.md`.
2. `100%` dos testes automatizados (`npm test`) passarem sem falhas ou testes ignorados (`skip`).
3. A análise estática (`npm run lint`) retornar `0` erros e `0` avisos.
4. O workflow de CI no GitHub Actions estiver aprovado (verde) na branch principal (`main`) e na branch de entrega.

 ## 7. Critérios de aceitação das histórias prioritárias

| História | Requisito | Critério de aceitação | Automatizável? |
| --- | --- | --- | --- |
| US-01 | RF-01 | Ao cadastrar um laboratório válido com código inédito, ele deve aparecer na listagem de recursos. | Sim |
| US-01 | RF-01 | Se já existe um recurso com o código `LAB-01`, uma nova tentativa com esse código deve ser rejeitada com a mensagem `Recurso com este código já existe`. | Sim |
| US-02 | RF-03 | Um pedido válido para um recurso ativo e livre no intervalo solicitado deve criar uma reserva com status `CONFIRMADA`. | Sim |
| US-02 | RF-03 | Se o `LAB-01` já tem uma reserva confirmada das 08h às 10h, um pedido para o mesmo laboratório das 09h às 11h deve ser recusado por conflito de horário. | Sim |
| US-02 | RNF-01 | Com 1.000 reservas cadastradas em memória, a verificação de conflito e a criação de uma nova reserva devem levar menos de 50 ms no total. | Sim |
| US-04 | RF-04 | Um pedido válido nos demais aspectos para usar um laboratório por 5 horas deve ser recusado porque ultrapassa o limite de 4 horas. | Sim |
| US-04 | RF-04 | Um pedido válido nos demais aspectos para usar um auditório com apenas 6 horas de antecedência deve ser recusado porque a antecedência mínima é de 24 horas. | Sim |