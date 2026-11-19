# Instruções do Projeto para o GitHub Copilot — UniReserva

**Sistema:** **UniReserva**
**Resumo:** Sistema universitário em Node.js 22 (ESM) para cadastro de recursos acadêmicos (Laboratórios, Auditórios e Equipamentos) e agendamento de reservas com detecção de conflitos de horário e políticas de 
> Regra central: o agente propõe; o grupo decide, revisa e responde.validação específicas por categoria via padrão de projeto **Strategy**.

---

## 1. Antes de codar

1. Leia o requisito funcional (`RF`) e não funcional (`RNF`) correspondente em `specs/requisitos.md` e a história em `specs/backlog.md`.
2. Verifique os testes já escritos pela equipe em `test/` (seguimos TDD: o teste humano já existe e define o contrato esperado).
3. Consulte `docs/arquitetura.md`, `docs/adr/ADR-001-arquitetura-nodejs.md` e `docs/adr/ADR-002-padrao-strategy-validacao-reservas.md`.

## 2. Arquitetura e Organização de Pastas

Respeite estritamente a separação em 4 camadas dentro de `src/` (`ADR-001` e `ADR-002`):
- `src/domain/`: Entidades de domínio (`Recurso.js`, `Reserva.js`) com validações básicas de invariantes.
- `src/strategies/`: Implementações do padrão **Strategy** (`LaboratorioReservaStrategy.js`, `AuditorioReservaStrategy.js`, `EquipamentoReservaStrategy.js`). Cada estratégia expõe o método `validar(dadosReserva, recurso)`.
- `src/repositories/`: Persistência em memória (`RecursoRepository.js`, `ReservaRepository.js`) usando `Map`.
- `src/services/`: Serviços de aplicação (`RecursoService.js`, `ReservaService.js`) que orquestram repositórios e estratégias.
- `src/index.js`: Exporta as classes públicas do sistema para consumo pelos testes e clientes.

## 3. Comandos do Projeto

- **Instalar dependências:** `npm ci`
- **Rodar todos os testes automatizados:** `npm test` (executa `node --test`)
- **Rodar análise estática (lint):** `npm run lint` (executa `npx eslint .`)

## 4. Convenções de Código

- **Linguagem e Módulos:** JavaScript moderno (Node.js 22+) com ES Modules (`import` / `export`). Sempre inclua a extensão `.js` nos imports locais (ex.: `import { Recurso } from '../domain/Recurso.js';`).
- **Estilo (ESLint):** Sem variáveis não utilizadas (`no-unused-vars: error`), usar sempre `===` e `!==` (`eqeqeq: error`), usar `const` para referências que não mudam (`prefer-const: error`) e evitar números mágicos (extrair constantes nomeadas como `MAX_HORAS_LABORATORIO = 4`).
- **Mensagens de Erro:** Lance objetos `Error` padrão do JavaScript com mensagens claras em português compatíveis com os critérios de aceitação de `specs/requisitos.md`.

## 5. Proibido

- **PROIBIDO** usar `switch (recurso.tipo)` ou cadeias de `if/else` dentro de `ReservaService` para validar regras específicas de Laboratório, Auditório ou Equipamento — utilize obrigatoriamente o padrão **Strategy** (`ADR-002`).
- **PROIBIDO** alterar, apagar ou enfraquecer os testes escritos pela equipe em `test/` para forçar um build verde.
- **PROIBIDO** instalar dependências externas de runtime ou frameworks de teste (como Jest, Mocha, Express ou bancos externos) sem autorização explícita em um novo ADR.
- **PROIBIDO** implementar funcionalidades fora do escopo da história solicitada na sessão atual.
