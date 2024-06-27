import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import Navbar from './Navbar.js';

function ListaPessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [mensagem, setMensagem] = useState('');

  // Função para obter os dados do Firestore
  const getPessoas = async () => {
    const pessoasCollection = collection(db, 'alunos');
    const pessoasSnapshot = await getDocs(pessoasCollection);
    const pessoasData = pessoasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPessoas(pessoasData);
  };

  useEffect(() => {
    getPessoas();
  }, []); // Irá executar apenas uma vez após a montagem do componente

  const handleExcluir = async (id) => {
    try {
      const docRef = doc(db, 'alunos', id);
      await deleteDoc(docRef);
      console.log('Documento excluído com sucesso: ', id);
      setMensagem('Cadastro excluído com sucesso!');

      // Remove o item excluído da lista de pessoas no estado
      setPessoas(pessoas.filter(pessoa => pessoa.id !== id));

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
      <h2>Cadastros Realizados</h2>
      {mensagem && <p>{mensagem}</p>}
      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            <strong>{pessoa.nome} {pessoa.sobrenome}</strong> - {pessoa.endereco}
            <button onClick={() => handleExcluir(pessoa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPessoas;
