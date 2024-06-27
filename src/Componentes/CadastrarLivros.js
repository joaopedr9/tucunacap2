import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import Navbar from './Navbar.js';

function CadastroLivros() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'livros'), {
        titulo,
        autor,
        genero
      });
      console.log('Documento adicionado com ID: ', docRef.id);
      setTitulo('');
      setAutor('');
      setGenero('');
      setMensagem('Cadastro realizado com sucesso!');
      setTimeout(() => {
        setMensagem('');
      }, 3000); // Limpa a mensagem após 3 segundos
    } catch (error) {
      console.error('Erro ao adicionar documento: ', error);
      setMensagem('Erro ao cadastrar. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
          <Navbar />
      <h2>Cadastro de Livro</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            id="autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="genero">Gênero:</label>
          <input
            type="text"
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />
        </div>
        <button type="submit" className="cadastro-button">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroLivros;
