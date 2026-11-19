import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { SISTEMA, obterInfoSistema } from '../src/index.js';

describe('UniReserva — Smoke Test', () => {
  it('deve exportar as informações básicas do sistema', () => {
    const info = obterInfoSistema();
    assert.equal(SISTEMA, 'UniReserva');
    assert.equal(info.nome, 'UniReserva');
    assert.equal(info.versao, '0.1.0');
  });
});
