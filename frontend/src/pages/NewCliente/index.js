import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import InputMask from 'react-input-mask';
import { Formik } from 'formik';

import api from '../../services/api';

import './styles.css';


export default function NewIncident() {
  const [nome, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [cep, setCep] = useState('');    
  const [logradouro, setLogradouro] = useState('');   
  const [bairro, setBairro] = useState('');   
  const [cidade, setCidade] = useState(''); 
  const [uf, setUf] = useState(''); 
  const [telefone, setNumber] = useState('');  
  const [email, setEmail] = useState('');

  const history = useHistory();

  const userId = localStorage.getItem('userId');

  async function handleNewCliente(e) {
    e.preventDefault();

    const data = {
      nome,
      cpf,
      cep,
      logradouro,
      bairro,
      cidade,
      uf,
      telefone,
      email,
    };

    try {
      await api.post('clientes', data, {
        headers: {
          Authorization: userId,
        }
      })

      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar cliente, tente novamente.');
    }
  }

   function onBlurCep(ev, setFieldValue) {
    const { value } = ev.target;

    const cep = value?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue('logradouro', data.logradouro);
        setFieldValue('bairro', data.bairro);
        setFieldValue('cidade', data.localidade);
        setFieldValue('uf', data.uf);
      });
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <h1>Cadastrar novo cliente</h1>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <Formik
          validateOnMount
          initialValues={{
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: '',
          }}
          render={({ isValid, setFieldValue }) => (

        <form onSubmit={handleNewCliente}>

          <input 
            placeholder="Nome: "
            value={nome}
            minLength="3"
            maxLength="100"
            pattern="[AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYySs  0123456789]"
            onChange={e => setName(e.target.value)}
            required="true"
          />

          <InputMask 
            placeholder="CPF: "
            mask="999.999.999-99"
            value={cpf}
            onChange={e => setCPF(e.target.value)}
            required="true"
          />

          <InputMask 
            placeholder="CEP: "
            marsk="99999-99"
            onBlur={(ev) => onBlurCep(ev, setFieldValue)}
            name="cep"
            value={cep}
            onChange={e => setCep(e.target.value)}
            required="true"
          />

          <input 
            placeholder="UF: "
            value={uf}
            onChange={e => setUf(e.target.value)}
            required="true"
          />
          

          <input 
            placeholder="Logradouro: "
            name="logradouro"
            value={logradouro}
            onChange={e => setLogradouro(e.target.value)}
            required="true"
          />

          <input 
            placeholder="Bairro: "
            name="bairro"
            value={bairro}
            onChange={e => setBairro(e.target.value)}
            required="true"
          />

          <input 
            placeholder="Cidade: "
            name="cidade"
            value={cidade}
            onChange={e => setCidade(e.target.value)}
            required="true"
          />          

          <input 
            placeholder="Telefone: "
            value={telefone}
            onChange={e => setNumber(e.target.value)}
            required="true"
          />

          <input 
            placeholder="Email: "
            value={email}
            onChange={e => setEmail(e.target.value)}
            required="true"
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>

        )}
        />
      </div>
    </div>
  )
}