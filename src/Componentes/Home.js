import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bem-vindo à Biblioteca</h1>
      <nav>
        <ul>
          <li>
            <Link to="/emprestimo-livros">Empréstimo de Livros</Link>
          </li>
          {/* Adicione mais links aqui conforme necessário */}
        </ul>
      </nav>
    </div>
  );
}

export default Home;
