// App.js
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Componentes/Navbar';
import CadastroPessoa from './Componentes/CadastroPessoa';
import CadastrarLivros from './Componentes/CadastrarLivros';
import EmprestarLivros from './Componentes/EmprestarLivros';
import DevolverLivros from './Componentes/DevolverLivros';
import RelatoriodeAlunos from './Componentes/RelatoriodeAlunos';
import RelatoriodeLivros from './Componentes/RelatoriodeLivros';
import RelatoriodeLivrosEmprestados from './Componentes/RelatoriodeLivrosEmprestados';
import Login from './Componentes/Login';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Component {...rest} /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
      
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute element={CadastroPessoa} />} />
            <Route path="/CadastrarLivros" element={<PrivateRoute element={CadastrarLivros} />} />
            <Route path="/EmprestarLivros" element={<PrivateRoute element={EmprestarLivros} />} />
            <Route path="/DevolverLivros" element={<PrivateRoute element={DevolverLivros} />} />
            <Route path="/RelatoriodeAlunos" element={<PrivateRoute element={RelatoriodeAlunos} />} />
            <Route path="/RelatoriodeLivros" element={<PrivateRoute element={RelatoriodeLivros} />} />
            <Route path="/RelatoriodeLivrosEmprestados" element={<PrivateRoute element={RelatoriodeLivrosEmprestados} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
