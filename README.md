# Projeto do 2º bimestre: Engenharia de Software — UniReserva

> **Índice da Entrega Parcial 01:** Consulte o arquivo [`ENTREGAPARCIAL01.md`](./ENTREGAPARCIAL01.md) para o sumário completo e links diretos de todos os entregáveis de planejamento.

**Regra do projeto:** *o agente propõe; o grupo decide e responde.* Agentes são a ferramenta do processo, não o produto.

---

## Sobre o nosso sistema

**Sistema:** **UniReserva** — Sistema para gestão e agendamento de laboratórios, auditórios e equipamentos da universidade (UEPG), com detecção automática de conflitos de horário, validação de regras específicas por categoria de recurso (via padrão de projeto *Strategy*) e histórico auditável de reservas.

**Grupo e papéis:**
- **Karoline Carvalho Salazar** ([@kcsalazar](https://github.com/kcsalazar)) — **Product Owner (PO)** e Desenvolvedora
- **Fernando Miguel Lewitzki Stoppa** ([@B1plos](https://github.com/B1plos)) — **Arquiteto Técnico** e Desenvolvedor
- **Eduardo Marcelo Plovas** ([@EduardoMarceloPlovas](https://github.com/EduardoMarceloPlovas)) — **Scrum Master** e Desenvolvedor
- **Felipe Vieira da Rosa** ([@FAVirConta2](https://github.com/FAVirConta2)) — **Engenheiro de Qualidade (QA)** e Desenvolvedor

**Como executar:**
```bash
# 1. Instalar as dependências (requer Node.js v22+)
npm ci

# 2. Executar a análise estática de código (ESLint)
npm run lint

# 3. Executar a suíte de testes automatizados (Unidade e Aceitação)
npm test
```

**Definição de pronto (Definition of Done - DoD):**
1. A história de usuário está vinculada a pelo menos um requisito funcional (`RF`) ou não funcional (`RNF`) na matriz de rastreabilidade em `specs/requisitos.md`.
2. Os testes automatizados (unidade e aceitação, cobrindo caminho feliz e exceções) foram escritos antes da implementação (TDD) e passam integralmente via `npm test`.
3. O código segue a arquitetura em camadas (`domain`, `strategies`, `repositories`, `services`) definida em `docs/arquitetura.md` e nos ADRs em `docs/adr/`.
4. A verificação estática com ESLint (`npm run lint`) executa com zero erros e zero avisos.
5. O pipeline de Integração Contínua (`.github/workflows/ci.yml`) no GitHub Actions está verde na branch do Pull Request.
6. Caso o agente GitHub Copilot tenha sido utilizado na tarefa, a sessão, a decisão humana (aceito/ajustado/rejeitado) e o consumo de créditos foram registrados em `docs/registro-ia.md`.
7. O Pull Request foi aberto em branch dedicada, preencheu o checklist de `.github/pull_request_template.md` e recebeu revisão e aprovação humana de pelo menos um integrante do grupo diferente do autor.

---

## Entregáveis

| # | Entregável | Onde fica |
|---|---|---|
| 0 | Índice da Entrega Parcial 01 | [`ENTREGAPARCIAL01.md`](./ENTREGAPARCIAL01.md) |
| 1 | Repositório com histórico, branches e PRs de revisão humana | Git e [`docs/convencao-versionamento.md`](./docs/convencao-versionamento.md) |
| 2 | Spec com RF, RNF, critérios de aceitação e backlog priorizado | [`specs/requisitos.md`](./specs/requisitos.md) e [`specs/backlog.md`](./specs/backlog.md) |
| 3 | ADR(s) e diagrama de arquitetura | [`docs/adr/`](./docs/adr/) e [`docs/arquitetura.md`](./docs/arquitetura.md) |
| 4 | Ao menos um padrão de projeto aplicado e justificado (*Strategy*) | [`docs/adr/ADR-002-padrao-strategy-validacao-reservas.md`](./docs/adr/ADR-002-padrao-strategy-validacao-reservas.md) |
| 5 | Plano de teste, testes automatizados e lint no CI | [`docs/plano-de-teste.md`](./docs/plano-de-teste.md), `test/` e [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) |
| 6 | Configuração dos agentes: instruções e ao menos 2 agentes | [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) e [`.github/agents/`](./.github/agents/) |
| 7 | Registro de uso de IA | [`docs/registro-ia.md`](./docs/registro-ia.md) |
| 8 | Relatório de smells com ao menos uma refatoração de código da IA | [`docs/relatorio-smells.md`](./docs/relatorio-smells.md) |
| 9 | `README.md` com comandos de execução e definição de pronto | Este arquivo (`README.md`) |

*Documentação revisada pela equipe UniReserva para a Entrega Parcial 01.*
