# Backlog — UniReserva

| Ordem | Id | Tipo | Item | Requisitos | Sprint |
|---|---|---|---|---|---|
| 1 | T-01 | Tarefa Técnica | Configurar estrutura base do projeto Node.js 22, ESLint 9 e workflow de CI no GitHub Actions | RNF-02, RNF-03 | Sprint 1 |
| 2 | US-01 | História de Usuário | Como administrador acadêmico, quero cadastrar e listar laboratórios, auditórios e equipamentos para disponibilizá-los para agendamento no sistema | RF-01 | Sprint 1 |
| 3 | US-02 | História de Usuário | Como professor ou estudante autorizado, quero criar uma reserva para um recurso ativo com verificação automática de conflito de horário para evitar dupla alocação | RF-03, RNF-01 | Sprint 1 |
| 4 | US-04 | História de Usuário | Como coordenador de infraestrutura, quero que o sistema aplique regras específicas de validação por categoria de recurso (Laboratório: máx. 4h; Auditório: antecedência mín. 24h; Equipamento: máx. 8h) usando o padrão *Strategy* | RF-04, RNF-04 | Sprint 2 |
| 5 | US-03 | História de Usuário | Como usuário do sistema, quero consultar quais recursos estão disponíveis em uma faixa de data e horário (filtrando opcionalmente por categoria) antes de solicitar minha reserva | RF-02 | Sprint 2 |
| 6 | US-05 | História de Usuário | Como solicitante, quero poder cancelar uma reserva confirmada que não vou mais utilizar para liberar o horário a outros membros da universidade | RF-05 | Sprint 3 |
| 7 | US-06 | História de Usuário | Como usuário ou gestor, quero consultar a agenda de reservas filtrada por recurso ou por solicitante em ordem cronológica | RF-06 | Sprint 3 |
| 8 | T-02 | Tarefa Técnica | Auditar código gerado com auxílio de IA, documentar code smells encontrados e realizar ao menos uma refatoração comprovada por testes | RNF-02, RNF-03 | Sprint 3 |
