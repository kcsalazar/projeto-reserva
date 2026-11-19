# Especificação de requisitos — UniReserva

## Objetivo e escopo

- **Para quem:** Professores, coordenadores de curso, técnicos de laboratório e estudantes autorizados da universidade (UEPG) que necessitam agendar espaços físicos e equipamentos acadêmicos.
- **Problema:** O controle manual de reservas por planilhas ou mensagens gera conflitos de horário (dupla alocação do mesmo laboratório ou projetor), ausência de validação automática das regras de uso de cada espaço (capacidade máxima, duração máxima e antecedência mínima) e falta de histórico confiável de solicitações.
- **O que não entra:** Autenticação institucional externa via SSO/LDAP, cobrança financeira ou emissão de boletos, integração com fechaduras eletrônicas/catracas físicas, envio de e-mails/SMS por servidores externos e aplicativo mobile nativo.

## Requisitos funcionais

| Id | Requisito | Entrada | Saída e exceções | Critérios de aceitação |
|---|---|---|---|---|
| RF-01 | Cadastrar e listar recursos reserváveis da universidade | `codigo` (string única), `nome` (string), `tipo` (`LABORATORIO`, `AUDITORIO` ou `EQUIPAMENTO`), `capacidade` (inteiro >= 1), `ativo` (booleano) | **Saída:** Recurso cadastrado e listado com seus dados.<br>**Exceções:** Erro se `codigo` já existir, `nome` for vazio, `tipo` for inválido ou `capacidade` < 1. | 1. Dado um recurso válido com código inédito, quando cadastrado, deve ser retornado na listagem.<br>2. Dado um código já cadastrado, quando tentar cadastrar outro recurso igual, o sistema deve lançar erro `"Recurso com este código já existe"`. |
| RF-02 | Consultar disponibilidade de recursos por período e tipo | `inicio` (data/hora ISO), `fim` (data/hora ISO), `tipo` (opcional) | **Saída:** Lista de recursos ativos que não possuem reserva `CONFIRMADA` sobreposta ao intervalo `[inicio, fim)`.<br>**Exceções:** Erro se `fim <= inicio` ou datas inválidas. | 1. Dado que o Laboratório L1 possui reserva das 14h às 16h e o L2 está livre, quando consultar disponibilidade das 15h às 17h, apenas L2 deve aparecer.<br>2. Recursos marcados como inativos (`ativo: false`) nunca aparecem como disponíveis. |
| RF-03 | Realizar reserva de recurso com detecção de conflito de horário | `idReserva`, `codigoRecurso`, `solicitante`, `inicio` (Date/ISO), `fim` (Date/ISO), `participantes` (inteiro) | **Saída:** Objeto de reserva criado com status `CONFIRMADA`.<br>**Exceções:** Erro se o recurso não existir, estiver inativo, `fim <= inicio` ou houver sobreposição de horário com reserva ativa existente no mesmo recurso. | 1. Dado um recurso ativo e livre no horário, quando solicitar reserva válida, ela é criada com status `CONFIRMADA`.<br>2. Dada uma reserva ativa das 08h às 10h no recurso `LAB-01`, qualquer tentativa de reserva para `LAB-01` das 09h às 11h, 07h às 09h ou 08h às 10h deve ser rejeitada com erro de conflito de horário. |
| RF-04 | Validar políticas específicas de reserva por categoria de recurso (Padrão *Strategy*) | Dados da reserva (`inicio`, `fim`, `participantes`, `dataSolicitacao`) e recurso alvo (`tipo`, `capacidade`) | **Saída:** Aprovação da validação específica da categoria.<br>**Exceções:**<br>- `LABORATORIO`: duração > 4 horas ou `participantes > capacidade`.<br>- `AUDITORIO`: antecedência < 24 horas em relação a `dataSolicitacao` ou `participantes > capacidade`.<br>- `EQUIPAMENTO`: duração > 8 horas ou `participantes > 1`. | 1. Reserva de `LABORATORIO` com duração de 5h deve ser rejeitada com erro de duração máxima (4h).<br>2. Reserva de `AUDITORIO` solicitada com apenas 6h de antecedência deve ser rejeitada exigindo mínimo de 24h.<br>3. Reserva de `EQUIPAMENTO` com duração de até 8h deve ser aceita; acima de 8h deve ser rejeitada. |
| RF-05 | Cancelar reserva ativa | `idReserva` (string), `solicitante` (string) | **Saída:** Reserva atualizada para status `CANCELADA` e horário liberado para novas reservas.<br>**Exceções:** Erro se a reserva não existir, já estiver cancelada ou se o solicitante não for o titular da reserva. | 1. Dada uma reserva `CONFIRMADA`, quando cancelada pelo seu solicitante, seu status muda para `CANCELADA`.<br>2. Após o cancelamento, uma nova reserva para o mesmo recurso e mesmo horário deve ser permitida sem acusar conflito. |
| RF-06 | Consultar agenda de reservas por recurso ou solicitante | `codigoRecurso` (opcional) ou `solicitante` (opcional) | **Saída:** Lista de reservas ordenadas cronologicamente por horário de início.<br>**Exceções:** Lista vazia caso não existam reservas para o filtro informado. | 1. Dado que um solicitante possui 2 reservas em datas distintas, ao filtrar pelo seu nome/identificador, o sistema retorna exatamente as 2 reservas em ordem cronológica de início. |

## Requisitos não funcionais

| Id | Tipo | Requisito mensurável | Como verificar |
|---|---|---|---|
| RNF-01 | Desempenho | A verificação de conflito de horário e criação de uma nova reserva sobre um repositório em memória contendo 1.000 reservas cadastradas deve ser concluída em tempo inferior a `50 ms` por operação. | Teste automatizado em `test/` que popula 1.000 reservas e mede o tempo de execução de uma nova reserva com `performance.now()`, asserindo `< 50` ms. |
| RNF-02 | Manutenibilidade e Padronização | `100%` dos arquivos de código-fonte (`src/`) e testes (`test/`) devem apresentar `0` erros e `0` avisos na verificação estática do ESLint. | Execução automatizada do comando `npm run lint` localmente e na etapa de lint do GitHub Actions (`.github/workflows/ci.yml`). |
| RNF-03 | Confiabilidade e Cobertura Funcional | `100%` dos requisitos funcionais (`RF-01` a `RF-06`) devem possuir ao menos 1 teste automatizado de caminho feliz e 1 teste de caso de erro/exceção executados na pipeline de CI. | Execução do comando `npm test` (`node --test`) no GitHub Actions validando a passagem de todos os casos listados na matriz de rastreabilidade. |
| RNF-04 | Extensibilidade (Arquitetura / Padrão Strategy) | A inclusão de uma nova política de validação para um novo tipo de recurso deve exigir `0` linhas modificadas no método de agendamento da classe `ReservaService`, bastando registrar uma nova classe Strategy. | Teste unitário em `test/strategy.test.js` injetando uma estratégia customizada de teste no `ReservaService` sem alterar o código do serviço. |

## Rastreabilidade

| Requisito | História | Testes | Pull request |
|---|---|---|---|
| RF-01 | US-01 | `test/recurso.test.js` | Planejado (Sprint 1) |
| RF-02 | US-03 | `test/reserva.test.js` | Planejado (Sprint 2) |
| RF-03 | US-02 | `test/reserva.test.js` | Planejado (Sprint 1) |
| RF-04 | US-04 | `test/strategy.test.js` | Planejado (Sprint 2) |
| RF-05 | US-05 | `test/reserva.test.js` | Planejado (Sprint 3) |
| RF-06 | US-06 | `test/reserva.test.js` | Planejado (Sprint 3) |
| RNF-01 | US-02 | `test/reserva.test.js` | Planejado (Sprint 2) |
| RNF-02 | T-01 | `npm run lint` (CI) | Planejado (Sprint 1) |
| RNF-03 | T-01, US-01 a US-06 | `npm test` (CI) | Planejado (Sprints 1 a 3) |
| RNF-04 | US-04 | `test/strategy.test.js` | Planejado (Sprint 2) |
