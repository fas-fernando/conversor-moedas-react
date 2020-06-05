import React from 'react';
import ReactDOM from 'react-dom';
import ConversorMoedas from './conversor-moedas';

it('Deve renderizar o componente sem erros', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConversorMoedas />, div);
  ReactDOM.unmountComponentAtNode(div);
});
