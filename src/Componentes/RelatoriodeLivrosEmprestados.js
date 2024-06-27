import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import Navbar from './Navbar.js';

function ListaLivrosEmprestados() {
  const [livros, setLivros] = useState([]);
  const [mensagem, setMensagem] = useState('');

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

  return (
    <div>
          <Navbar />
      <h2>Livros Emprestados</h2>
      {mensagem && <p>{mensagem}</p>}
      <ul>
        {livros.map((livro) => (
          livro.emprestado && (
            <li key={livro.id}>
              <strong>{livro.titulo}</strong> - {livro.autor}, {livro.genero}
              <br />
              Emprestado para: {livro.emprestadoPara} em {new Date(livro.dataEmprestimo).toLocaleDateString()}
            </li>
          )
        ))}
      </ul>
    </div>
  );
}

export default ListaLivrosEmprestados;
