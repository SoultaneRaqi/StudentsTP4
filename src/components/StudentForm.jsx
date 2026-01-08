import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addStudent, updateStudent } from '../features/students/studentsSlice';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('S1'); // Valeur par défaut
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID si on est en mode édition
  
  // Récupérer l'étudiant si on est en mode modification
  const studentToEdit = useSelector((state) => 
    id ? state.students.find((s) => s.id === id) : null
  );

  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name);
      setLevel(studentToEdit.level);
    }
  }, [studentToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // --- Validation ---
    if (name.length < 3) {
      setError("Le nom doit contenir au moins 3 caractères.");
      return;
    }
    if (!['S1', 'S2', 'S3'].includes(level)) {
      setError("Le niveau doit être S1, S2 ou S3.");
      return;
    }

    const studentData = {
      id: id || Date.now().toString(), // Garde l'ID existant ou en crée un nouveau
      name,
      level
    };

    if (id) {
      dispatch(updateStudent(studentData));
    } else {
      dispatch(addStudent(studentData));
    }

    navigate('/'); // Retour à la liste
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '400px' }}>
      <h2>{id ? "Modifier l'étudiant" : "Ajouter un étudiant"}</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nom : </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Ex: John Doe"
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Niveau : </label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
          </select>
        </div>

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default StudentForm;