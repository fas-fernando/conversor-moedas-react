import React, { useState } from 'react';
import './conversor-moedas.css';
import { 
  Jumbotron, Form, Container, Col, Button, Spinner, Alert, Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import ListarMoedas from './listar-moedas';
import axios from 'axios';

function ConversorMoedas() {

  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=a246beab6c15d6b142e1b3404d0ff3f6';

  const [ valor, setValor ] = useState('1');
  const [ moedaDe, setMoedaDe ] = useState('BRL');
  const [ moedaPara, setMoedaPara ] = useState('USD');
  const [ exibirSpinner, setExibirSpinner ] = useState(false);
  const [ formValidado, setFormValidado ] = useState(false);
  const [ exibirModal, setExibirModal ] = useState(false);
  const [ resultadoConversao, setResultadoConversao ] = useState('');

  function handleValor (event) {
    setValor(event.target.value.replace(/\D/g, ''));
  }

  function handleMoedaDe (event) {
    setMoedaDe(event.target.value);
  }

  function handleMoedaPara (event) {
    setMoedaPara(event.target.value);
  }

  function handleFecharModal (event) {
    setValor('1');
    setMoedaDe('BRL');
    setMoedaPara('USD');
    setFormValidado(false);
    setExibirModal(false);
  }

  function converter (event) {
    event.preventDefault();
    setFormValidado(true);
    if (event.currentTarget.checkValidity() === true){
      setExibirSpinner(true);
      axios.get(FIXER_URL)
        .then(res => {
          const cotacao = obterCotacao(res.data);
          setResultadoConversao(`${valor} ${moedaDe} = ${cotacao} ${moedaPara}`);
          setExibirModal(true);
          setExibirSpinner(false);
        });
    }
  }

  function obterCotacao (dadosCotacao) {
    if(!dadosCotacao || dadosCotacao.success !== true) {
      return false;
    }
    const cotacaoDe = dadosCotacao.rates[moedaDe];
    const cotacaoPara = dadosCotacao.rates[moedaPara];
    const cotacao = (1 / cotacaoDe * cotacaoPara) * valor;
    return cotacao.toFixed(2);
  }

  return (
    <div>
      <h1>Conversor de Moedas</h1>
      <Alert variant="danger" show={false}>
        Erro obtendo dados de conversão. Tente novamente!
      </Alert>
      <Jumbotron fluid>
        <Container>
          <Form onSubmit={converter} noValidate validated={formValidado}>
            <Form.Row>
              <Col sm="3">
                <Form.Control 
                  placeholder="0"
                  value={valor}
                  onChange={handleValor}
                  riquired/>
              </Col>
              <Col sm="3">
                <Form.Control as="select"
                  value={moedaDe}
                  onChange={handleMoedaDe}>
                  <ListarMoedas />
                </Form.Control>
              </Col>
              <Col sm="1" 
                className="text-center"
                style={{paddingTop: '5px'}}>
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </Col>
              <Col sm="3">
                <Form.Control as="select"
                  value={moedaPara}
                  onChange={handleMoedaPara}>
                  <ListarMoedas />
                </Form.Control>
              </Col>
              <Col sm="2">
                <Button 
                  variant="success" 
                  type="submit">
                  <span className={exibirSpinner ? null : 'hidden'}>
                    <Spinner animation="border" size="sm" />
                  </span>
                  <span className={exibirSpinner ? 'hidden' : null}>
                    Converter
                  </span>
                </Button>
              </Col>
            </Form.Row>
          </Form>
          <Modal show={exibirModal} onHide={handleFecharModal}>
            <Modal.Header closeButton>
              <Modal.Title>Reasultado da Conversão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {resultadoConversao}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleFecharModal}>
                Nova Conversão
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default ConversorMoedas;
