import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


import api from '../../services/api';

import './styles.css';


export default function Login() {
  const [id, setId] = useState('');
  const [senha, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    localStorage.setItem('ongId', id);

    history.push('/profile');
    try {
      const response = await api.post('sessions', { id, senha });
      

      localStorage.setItem('nameId', id);  
      localStorage.setItem('userName', response.data.id);
      
      history.push('/profile');
    } catch (err) {
      alert('Usuário não cadastrado/existe. Tente de novo!!');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        

        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <input 
            placeholder="Id"
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <input 
            placeholder="Senha"
            type='password'
            value={senha}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>
        </form>
      </section>

    </div>
  );
}
