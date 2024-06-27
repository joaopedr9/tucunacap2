import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import Select from 'react-select';
import Navbar from './Navbar.js';

function EmprestimoLivros() {
  const [livros, setLivros] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [pesquisa, setPesquisa] = useState('');

  // Função para obter os dados dos livros do Firestore
  const getLivros = async () => {
    const livrosCollection = collection(db, 'livros');
    const livrosSnapshot = await getDocs(livrosCollection);
    const livrosData = livrosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLivros(livrosData);
  };

  // Função para obter os dados dos alunos do Firestore
  const getAlunos = async () => {
    const alunosCollection = collection(db, 'alunos');
    const alunosSnapshot = await getDocs(alunosCollection);
    const alunosData = alunosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAlunos(alunosData);
  };

  useEffect(() => {
    getLivros();
    getAlunos();
  }, []);

  const handleEmprestar = async (id) => {
    if (!selectedAluno) {
      setMensagem('Por favor, selecione um aluno para o empréstimo.');
      setTimeout(() => setMensagem(''), 3000);
      return;
    }

    try {
      const livroDoc = doc(db, 'livros', id);
      const dataEmprestimo = new Date().toISOString();
      await updateDoc(livroDoc, {
        emprestado: true,
        emprestadoPara: selectedAluno.value,
        dataEmprestimo: dataEmprestimo
      });
      console.log('Livro emprestado com sucesso: ', id);
      setMensagem('Livro emprestado com sucesso!');
      getLivros(); // Atualiza a lista de livros após o empréstimo

      setTimeout(() => setMensagem(''), 3000);
    } catch (error) {
      console.error('Erro ao emprestar livro: ', error);
      setMensagem('Erro ao emprestar livro. Tente novamente mais tarde.');
    }
  };

  const handleSearchChange = (e) => {
    setPesquisa(e.target.value);
  };

  const livrosFiltrados = livros.filter(livro =>
    livro.titulo.toLowerCase().includes(pesquisa.toLowerCase()) && !livro.emprestado
  );

  const alunoOptions = alunos.map(aluno => ({
    value: `${aluno.nome} ${aluno.sobrenome}`,
    label: `${aluno.nome} ${aluno.sobrenome}`
  }));

  return (
    <div>
          <Navbar />
      <h2>Empréstimo de Livro</h2>
      {mensagem && <p>{mensagem}</p>}
      <div>
        <label htmlFor="pesquisa">Pesquisar Livro:</label>
        <input
          type="text"
          id="pesquisa"
          value={pesquisa}
          onChange={handleSearchChange}
          placeholder="Digite o título do livro"
        />
      </div>
      <h2>Livros Disponíveis para Empréstimo</h2>
      <ul>
        {livrosFiltrados.map((livro) => (
          <li key={livro.id}>
            <strong>{livro.titulo}</strong> - {livro.autor}, {livro.genero}
            <br />
            <label htmlFor="aluno">Selecionar Aluno:</label>
            <Select
              id="aluno"
              value={selectedAluno}
              onChange={setSelectedAluno}
              options={alunoOptions}
              placeholder="Digite para buscar..."
              isClearable
            />
            <button onClick={() => handleEmprestar(livro.id)}>Emprestar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmprestimoLivros;
