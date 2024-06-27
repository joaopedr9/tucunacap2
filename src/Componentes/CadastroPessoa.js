import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import Navbar from './Navbar.js';

function CadastroPessoa() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica se todos os campos estão preenchidos
    if (nome && sobrenome && endereco && cpf && idade) {
      try {
        const docRef = await addDoc(collection(db, 'alunos'), {
          nome,
          sobrenome,
          endereco,
          cpf,
          idade
        });
        console.log('Documento adicionado com ID: ', docRef.id);
        setNome('');
        setSobrenome('');
        setEndereco('');
        setCpf('');
        setIdade('');
        setMensagem('Cadastro realizado com sucesso!');
        setTimeout(() => {
          setMensagem('');
        }, 3000); // Limpa a mensagem após 3 segundos
      } catch (error) {
        console.error('Erro ao adicionar documento: ', error);
        setMensagem('Erro ao cadastrar. Tente novamente mais tarde.');
      }
    } else {
      setMensagem('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div>
          <Navbar />
      <h2>Cadastro de Aluno</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Aluno:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => {
              const regex = /^[a-zA-Z\s]*$/; // Apenas letras e espaços são permitidos
              if (regex.test(e.target.value) || e.target.value === '') {
                setNome(e.target.value);
              }
            }}
          />
        </div>
        <div>
          <label htmlFor="sobrenome">Sobrenome:</label>
          <input
            type="text"
            id="sobrenome"
            value={sobrenome}
            onChange={(e) => {
              const regex = /^[a-zA-Z\s]*$/; // Apenas letras e espaços são permitidos
              if (regex.test(e.target.value) || e.target.value === '') {
                setSobrenome(e.target.value);
              }
            }}
          />
        </div>
        <div>
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => {
              const regex = /^[0-9\b]+$/; // Apenas números são permitidos
              if (regex.test(e.target.value) || e.target.value === '') {
                if (e.target.value.length <= 11) {
                  setCpf(e.target.value);
                }
              }
            }}
          />
        </div>
        <div>
          <label htmlFor="idade">Idade:</label>
          <input
            type="text"
            id="idade"
            value={idade}
            onChange={(e) => {
              const regex = /^[0-9\b]+$/; // Apenas números são permitidos
              if (regex.test(e.target.value) || e.target.value === '') {
                setIdade(e.target.value);
              }
            }}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroPessoa;
