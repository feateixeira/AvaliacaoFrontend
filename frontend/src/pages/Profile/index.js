import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';


export default function Profile() {
  const [clientes, setClients] = useState([]);

  const history = useHistory();

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: userId,
      }
    } ).then(response => {
      setClients(response.data);
    })
  }, [userId]);

  async function handleDeleteIncident(user_id) {
    try {
      await api.delete(`clientes/${user_id}`, {
        headers: {
          Authorization: userId,
        }
      });

      setClients(clientes.filter(client => client.userId !== userId));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <span>Bem vindo, {userId}</span>

        <Link className="button" to="/cliente/new">Cadastrar novo cliente</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Clientes cadastrados</h1>

      <ul>
          {clientes.map(client => (
            <li key={client.id}>
              <strong>Nome:</strong>
              <p>{client.nome}</p>

              <strong>CPF:</strong>
              <p>{client.cpf}</p>

              <strong>CEP: </strong>
              <p>{client.cep}</p>

              <strong>Logradouro: </strong>
              <p>{client.logradouro}</p>

              <strong>Bairro: </strong>
              <p>{client.bairro}</p>

              <strong>Cidade: </strong>
              <p>{client.endereco}</p>

              <strong>UF: </strong>
              <p>{client.endereco}</p>

              <strong>Email: </strong>
              <p>{client.email}</p>

              <button onClick={() => handleDeleteIncident(client.id)} type="button">
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          ))}
        </ul>
    </div>
  );
}