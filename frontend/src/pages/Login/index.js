import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';


import api from '../../services/api';

import './styles.css';


export default function Login() {
  const [user, setUser] = useState('');
  const [senha, setPassword] = useState('');
  const history = useHistory();


  async function handleLogin(e) {
    e.preventDefault();

    
      try {
        const response = await api.post('sessions', { user, senha });
        

        localStorage.setItem('nameId', user);  
        localStorage.setItem('userName', response.data.user);
        
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
            value={user}
            onChange={e => setUser(e.target.value)}
          />

          <input 
            placeholder="Senha"
            type='password'
            value={senha}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

    </div>
  );
}
