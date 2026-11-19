# Convenção de versionamento — UniReserva

- **Repositório:** [`https://github.com/kcsalazar/projeto-reserva`](https://github.com/kcsalazar/projeto-reserva)
- **Branches:**
  - `main`: Branch principal e estável do projeto. Só recebe código via Pull Request aprovado e com CI verde.
  - `entrega-parcial-01`: Branch oficial da Entrega Parcial 01 contendo todo o planejamento, especificação, ADRs, plano de testes, CI e configuração dos agentes.
  - `feat/US-XX-descricao-curta`: Branches de desenvolvimento de histórias de usuário do backlog (ex.: `feat/US-01-cadastro-recursos`, `feat/US-04-strategy-validacao`).
  - `fix/descricao-curta` ou `refactor/descricao-curta`: Branches para correção de defeitos ou refatoração de code smells identificados na revisão.
- **Fusão (Merge):**
  - Todo código é integrado na `main` exclusivamente por **Pull Request (PR)**.
  - É obrigatória a **revisão humana** por pelo menos **1 integrante do grupo diferente do autor do PR**, preenchendo o checklist de `.github/pull_request_template.md`.
  - Nenhum integrante pode aprovar e fazer merge do próprio Pull Request sem revisão de um colega.
- **Teste e lint antes de integrar:**
  - Antes de abrir ou aprovar qualquer PR, o autor deve executar localmente `npm run lint` e `npm test`.
  - O merge só é permitido quando o workflow `.github/workflows/ci.yml` do GitHub Actions estiver com status **aprovado (verde)** no Pull Request.
- **Commits:**
  - Seguiremos o padrão **Conventional Commits** em português, com mensagens curtas e descritivas referenciando a história ou requisito quando aplicável:
    - `feat(US-01): implementa cadastro e listagem de recursos`
    - `test(US-04): adiciona testes unitarios para strategies de validacao`
    - `refactor(reserva): extrai verificacao de sobreposicao de horario`
    - `docs(adr): documenta escolha do padrao strategy no ADR-002`
    - `ci(node): configura pipeline de lint e testes no github actions`

## Resolução de problemas

- **Se duas pessoas alterarem o mesmo trecho (Conflito de Merge):**
  1. O autor do Pull Request atualiza sua branch local trazendo as alterações mais recentes da `main` (`git fetch origin` e `git merge origin/main`).
  2. Os dois integrantes que editaram o mesmo arquivo conversam para alinhar qual decisão de código deve prevalecer, mantendo a conformidade com os ADRs e com `specs/requisitos.md`.
  3. Após resolver os marcadores de conflito (`<<<<<<<`, `=======`, `>>>>>>>`), executam-se novamente `npm run lint` e `npm test` antes de enviar o commit de resolução para o PR.
- **Se o build quebrar na branch principal (`main`):**
  1. A correção da `main` passa a ser a prioridade máxima do grupo: nenhum novo PR é integrado enquanto a `main` estiver vermelha.
  2. O Scrum Master e o autor do último merge identificam imediatamente o commit causador na aba *Actions* do GitHub.
  3. Caso a correção seja simples (até 15 minutos), abre-se imediatamente uma branch `fix/corrige-build-main` com PR revisado. Caso contrário, reverte-se o PR problemático (`git revert`) para restaurar o estado verde da `main` enquanto o ajuste é feito em branch separada.
