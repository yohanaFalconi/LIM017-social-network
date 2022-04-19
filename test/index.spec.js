// importamos la funcion que vamos a testear
import { onNavigate } from '../src/main.js';

describe('onNavigate', () => {
  it('debería ser una función', () => {
    expect(typeof onNavigate).toBe('function');
  });
});
