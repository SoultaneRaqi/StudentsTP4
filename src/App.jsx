import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetail from './components/StudentDetail';

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <nav style={{ padding: '10px', background: '#f4f4f4', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Accueil</Link>
        <Link to="/add">Ajouter Étudiant</Link>
      </nav>

      <Routes>
        {/* Route liste par défaut */}
        <Route path="/" element={<StudentList />} />
        
        {/* Route ajout */}
        <Route path="/add" element={<StudentForm />} />
        
        {/* Route modification (Bonus pour l'UX, réutilise le form) */}
        <Route path="/edit/:id" element={<StudentForm />} />
        
        {/* Route détails étudiant */}
        <Route path="/student/:id" element={<StudentDetail />} />
      </Routes>
    </div>
  );
}

export default App;