import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';

import api from '../../services/api';

import './styles.css';


export default function NewIncident() {

  const {register, handleSubmit, setValue, setFocus} = useForm();

  const [nome, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [cep, setCep] = useState('');    
  const [logradouro, setLogradouro] = useState('');   
  const [bairro, setBairro] = useState('');   
  const [cidade, setCidade] = useState(''); 
  const [uf, setUf] = useState(''); 
  const [complemento, setComplemento] = useState('');
  const [telefone, setNumber] = useState([]);  
  const [email, setEmail] = useState([]);

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

   function checkCEP(e) {
     
      const cep = e.target.value.replace(/\D/g, '');
      console.log(cep);
    

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue('address', data.logradouro);
        setValue('neighborhood', data.bairro);
        setValue('city', data.localidade);
        setValue('uf', data.uf); 
      });
  }

  const addPhoneBtn = (e) => {
    e.preventDefault()

    setNumber([ ...telefone, '']);
  }

  const addEmailBtn = (e) => {
    e.preventDefault()

    setEmail([ ...email, '']);
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
            minLength="3"
            maxLength="100"
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
            mask="999999-99"
            onBlur={checkCEP}
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
            {...register("uf" )}
          />
          

          <input 
            placeholder="Logradouro: "
            name="logradouro"
            value={logradouro}
            onChange={e => setLogradouro(e.target.value)}
            required="true"
            {...register("address" )}
          />

          <input 
            placeholder="Bairro: "
            name="bairro"
            value={bairro}
            onChange={e => setBairro(e.target.value)}
            required="true"
            {...register("neighborhood" )}
          />

          <input 
            placeholder="Cidade: "
            name="cidade"
            value={cidade}
            onChange={e => setCidade(e.target.value)}
            required="true"
            {...register("city" )}
          />    

          <input 
            placeholder="Complemento (opcional):  "
            name="complemento"
            value={complemento}
            onChange={e => setComplemento(e.target.value)}
          />

          <input 
              placeholder="Telefone: "
              value={telefone}
              onChange={e => setNumber(e.target.value)}
              required="true"            
          />          
          
          {telefone.map((telefone, index) => (
            
              <input key={index}
              placeholder="Telefone: "
              value={telefone}
              onChange={e => setNumber(e.target.value)}
              required="true"        
              />  

          ))}       
          

          <input 
            placeholder="Email: "
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required="true"
          />

          {email.map((email, index) => (
            
            <input key={index}
            placeholder="Email: "
            value={email}
            onChange={e => setEmail(e.target.value)}
            required="true"        
            />  

        ))}  

          <div className='btnadd'>

            <Link className='overlay' onClick={addPhoneBtn}>
              <FiPlus size={16} />      
              Add Phone
            </Link>

            <Link className='overlay' onClick={addEmailBtn}>                    
              Add Email
              <FiPlus size={16} />
            </Link>

          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>

      </div>
    </div>
  )
}