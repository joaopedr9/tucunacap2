import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import Navbar from './Navbar.js';

function DevolucaoLivros() {
  const [livros, setLivros] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [termoPesquisa, setTermoPesquisa] = useState('');

  // Função para obter os dados dos livros do Firestore
  const getLivros = async () => {
    const livrosCollection = collection(db, 'livros');
    const livrosSnapshot = await getDocs(livrosCollection);
    const livrosData = livrosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLivros(livrosData);
  };

  useEffect(() => {
    getLivros();
  }, []);

  const handleDevolver = async (id) => {
    try {
      const livroDoc = doc(db, 'livros', id);
      await updateDoc(livroDoc, {
        emprestado: false,
        emprestadoPara: '',
        dataEmprestimo: ''
      });
      console.log('Livro devolvido com sucesso: ', id);
      setMensagem('Livro devolvido com sucesso!');
      getLivros(); // Atualiza a lista de livros após a devolução

      setTimeout(() => setMensagem(''), 3000);
    } catch (error) {
      console.error('Erro ao devolver livro: ', error);
      setMensagem('Erro ao devolver livro. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
          <Navbar />
      <h2>Devolução de Livro</h2>
      {mensagem && <p>{mensagem}</p>}
      <h2>Livros Emprestados</h2>
      <input
        type="text"
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
        placeholder="Pesquisar por título do livro"
      />
      <ul>
        {livros
          .filter((livro) =>
            livro.emprestado &&
            livro.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
          )
          .map((livro) => (
            <li key={livro.id}>
              <strong>{livro.titulo}</strong> - {livro.autor}, {livro.genero}
              <br />
              Emprestado para: {livro.emprestadoPara} em{' '}
              {new Date(livro.dataEmprestimo).toLocaleDateString()}
              <button onClick={() => handleDevolver(livro.id)}>Devolver</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DevolucaoLivros;
