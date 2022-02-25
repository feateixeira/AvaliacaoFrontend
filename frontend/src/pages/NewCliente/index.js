import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import InputMask from 'react-input-mask';

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
      alert('Erro ao cadastrar caso, tente novamente.');
    }
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

        <form onSubmit={handleNewCliente}>
          <input 
            placeholder="Nome: "
            value={nome}
            onChange={e => setName(e.target.value)}
          />

          <InputMask 
            placeholder="CPF: "
            mask="999.999.999-99"
            value={cpf}
            onChange={e => setCPF(e.target.value)}
          />

          <InputMask 
            placeholder="CEP: "
            marsk="99999-99"
            style={{ width: 389 }}
            value={cep}
            onChange={e => setCep(e.target.value)}
          />

          <input 
            placeholder="UF: "
            style={{ width: 389 }}
            value={uf}
            onChange={e => setUf(e.target.value)}
          />
          

          <input 
            placeholder="Logradouro: "
            value={logradouro}
            onChange={e => setLogradouro(e.target.value)}
          />

          <input 
            placeholder="Bairro: "
            value={bairro}
            onChange={e => setBairro(e.target.value)}
          />

          <input 
            placeholder="Cidade: "
            value={cidade}
            onChange={e => setCidade(e.target.value)}
          />

          

          <input 
            placeholder="Telefone: "
            value={telefone}
            onChange={e => setNumber(e.target.value)}
          />

          <input 
            placeholder="Email: "
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}