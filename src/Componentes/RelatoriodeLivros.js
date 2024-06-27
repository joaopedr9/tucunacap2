import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import Navbar from './Navbar.js';

function ListaLivros() {
  const [livros, setLivros] = useState([]);
  const [mensagem, setMensagem] = useState('');

  // Função para obter os dados do Firestore
  const getLivros = async () => {
    const livrosCollection = collection(db, 'livros');
    const livrosSnapshot = await getDocs(livrosCollection);
    const livrosData = livrosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLivros(livrosData);
  };

  useEffect(() => {
    getLivros();
  }, []); // Irá executar apenas uma vez após a montagem do componente

  const handleExcluir = async (id) => {
    try {
      const docRef = doc(db, 'livros', id);
      await deleteDoc(docRef);
      console.log('Documento excluído com sucesso: ', id);
      setMensagem('Cadastro excluído com sucesso!');

      // Remove o item excluído da lista de livros no estado
      setLivros(livros.filter(livro => livro.id !== id));

      setTimeout(() => {
        setMensagem('');
      }, 3000);
    } catch (error) {
      console.error('Erro ao excluir documento: ', error);
      setMensagem('Erro ao excluir cadastro. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
          <Navbar />
      <h2>Livros Cadastrados</h2>
      {mensagem && <p>{mensagem}</p>}
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            <strong>{livro.titulo}</strong> - {livro.autor}, {livro.genero}
            <button onClick={() => handleExcluir(livro.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaLivros;
