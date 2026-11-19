# Entrega Parcial 01 — UniReserva

Este documento serve como **índice oficial da Entrega Parcial 01** do projeto **UniReserva** (Disciplina de Engenharia de Software — UEPG, 2026), apontando para a localização exata de todos os entregáveis de planejamento e configuração exigidos na Seção 1, elaborados **pelo grupo antes da geração de código por agente**.

---

## 👥 Equipe e Papéis

| Integrante | Usuário GitHub | Papel Principal |
| :--- | :--- | :--- |
| **Karoline Carvalho Salazar** | [@kcsalazar](https://github.com/kcsalazar) | Product Owner (PO) e Desenvolvedora |
| **Fernando Miguel Lewitzki Stoppa** | [@B1plos](https://github.com/B1plos) | Arquiteto Técnico e Desenvolvedor |
| **Eduardo Marcelo Plovas** | [@EduardoMarceloPlovas](https://github.com/EduardoMarceloPlovas) | Scrum Master e Desenvolvedor |
| **Felipe Vieira da Rosa** | [@FAVirConta2](https://github.com/FAVirConta2) | Engenheiro de Qualidade (QA) e Desenvolvedor |
| **Nickolas Rodrigues Cabral** | [@NickolasRC](https://github.com/NickolasRC) | DevOps / CI, Auditoria de IA e Desenvolvedor |

---

## 🗂️ Índice dos Entregáveis (Seção 1 — Planejamento e Configuração)

| # | Entregável | Arquivo no Repositório | Status |
| :-: | :--- | :--- | :-: |
| **1** | **Visão Geral, Equipe, Execução e Definição de Pronto (DoD)** | [`README.md`](./README.md) | ✅ Concluído |
| **2** | **Especificação de Requisitos (RF, RNF mensuráveis, Critérios de Aceitação e Rastreabilidade)** | [`specs/requisitos.md`](./specs/requisitos.md) | ✅ Concluído |
| **E4** | **Mini-spec — Fazer reserva de recurso** | [`specs/mini-spec.md`](./specs/mini-spec.md) | ✅ Concluído |
| **3** | **Backlog do Produto Priorizado (Histórias de Usuário e Sprints)** | [`specs/backlog.md`](./specs/backlog.md) | ✅ Concluído |
| **4** | **Arquitetura do Sistema e Diagrama de Componentes (Mermaid)** | [`docs/arquitetura.md`](./docs/arquitetura.md) | ✅ Concluído |
| **5** | **ADR-001: Adoção de Node.js 22 e Arquitetura em Camadas** | [`docs/adr/ADR-001-arquitetura-nodejs.md`](./docs/adr/ADR-001-arquitetura-nodejs.md) | ✅ Concluído |
| **6** | **ADR-002: Padrão de Projeto *Strategy* para Políticas de Validação de Reserva** | [`docs/adr/ADR-002-padrao-strategy-validacao-reservas.md`](./docs/adr/ADR-002-padrao-strategy-validacao-reservas.md) | ✅ Concluído |
| **7** | **Plano de Testes (Unidade, Aceitação, Lint, TDD e Critérios de Encerramento)** | [`docs/plano-de-teste.md`](./docs/plano-de-teste.md) | ✅ Concluído |
| **8** | **Pipeline de Integração Contínua (GitHub Actions — Node.js + ESLint + Testes)** | [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) | ✅ Concluído |
| **9** | **Convenção de Versionamento, Branches, Commits e Revisão Humana** | [`docs/convencao-versionamento.md`](./docs/convencao-versionamento.md) | ✅ Concluído |
| **10** | **Template de Pull Request com Checklist de Revisão Humana e Uso de IA** | [`.github/pull_request_template.md`](./.github/pull_request_template.md) | ✅ Concluído |
| **11** | **Instruções Globais do Agente (GitHub Copilot Instructions)** | [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) | ✅ Concluído |
| **12** | **Configuração do Agente Implementador** | [`.github/agents/implementador.agent.md`](./.github/agents/implementador.agent.md) | ✅ Concluído |
| **13** | **Configuração do Agente Revisor** | [`.github/agents/revisor.agent.md`](./.github/agents/revisor.agent.md) | ✅ Concluído |
| **14** | **Registro de Uso de IA e Controle de Créditos (200 créditos/mês)** | [`docs/registro-ia.md`](./docs/registro-ia.md) | ✅ Concluído |
| **15** | **Estrutura do Relatório de Code Smells e Refatoração** | [`docs/relatorio-smells.md`](./docs/relatorio-smells.md) | ✅ Concluído |

---

## 📌 Resumo do Sistema: UniReserva

O **UniReserva** é um sistema para agendamento e controle de reservas de espaços e recursos acadêmicos da universidade (**Laboratórios**, **Auditórios** e **Equipamentos**).

* **Linguagem e Runtime:** Node.js v22+ (JavaScript ESM), com executor de testes nativo (`node --test`) e análise estática via ESLint v9.
* **Padrão de Projeto Aplicado:** **Strategy** ([`ADR-002`](./docs/adr/ADR-002-padrao-strategy-validacao-reservas.md)), responsável por isolar as regras de negócio e limites de reserva específicos de cada categoria de recurso (`LaboratorioReservaStrategy`, `AuditorioReservaStrategy` e `EquipamentoReservaStrategy`).
* **Uso de Agentes nesta Etapa:** Em conformidade com as regras da disciplina, todo o planejamento, especificação (`specs/`), decisões arquiteturais (`docs/adr/`), plano de testes e instruções de agentes (`.github/`) foram redigidos e revisados pela equipe, **sem consumo de créditos de codificação do GitHub Copilot**.

*Revisado pela equipe UniReserva para a Entrega Parcial 01.*
