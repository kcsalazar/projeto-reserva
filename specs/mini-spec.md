# Mini-spec — Fazer reserva de recurso

## Objetivo

Permitir que professores e estudantes autorizados reservem um laboratório,
auditório ou equipamento da UEPG, evitando a dupla alocação do mesmo recurso.

**História:** US-02  
**Requisitos:** RF-03 e RNF-01

## Entradas

Identificador da reserva, código do recurso, solicitante, data e hora de início,
data e hora de fim e número de participantes.

## Critérios de aceitação

1. Se o recurso estiver ativo e livre no período e os dados forem válidos,
   o sistema deve criar uma reserva com status `CONFIRMADA`.
2. Se o `LAB-01` já estiver reservado das 08h às 10h, um pedido para o mesmo
   laboratório das 09h às 11h deve ser recusado por conflito de horário.
3. Se o recurso não existir, estiver inativo ou o horário de fim for igual
   ou anterior ao de início, o sistema deve recusar o pedido.

## Requisito não funcional

A verificação de conflito e a criação de uma reserva devem levar menos de 50 ms
por operação em um repositório em memória com 1.000 reservas cadastradas.
O teste mede a operação com `performance.now()`.

## Contexto de arquitetura

O `ReservaService` coordena a validação e a criação da reserva.
O `ReservaRepository` armazena e consulta as reservas em memória.

## Armadilha — Horários encostados

O fim de um intervalo fica fora da reserva. Se o `LAB-01` estiver reservado
das 08h às 10h, um pedido das 10h às 11h pode ser aceito se estiver válido
e o horário estiver livre. Já um pedido das 09h59 às 11h deve ser recusado.