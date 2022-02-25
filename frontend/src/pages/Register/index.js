import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import api from '../../services/api';
import './styles.css';

export default function Register() {
  const [id, setId] = useState('');
  const [senha, setPassword] = useState('');
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      id,
      senha,
    };

    try {
      const response = await api.post('users', data);

      alert(`Seu ID de acesso: ${response.data.id}`);

      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1>Cadastro de usuários</h1>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Id Usuário: "
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <input 
            type="password" 
            placeholder="Senha: "
            value={senha}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}