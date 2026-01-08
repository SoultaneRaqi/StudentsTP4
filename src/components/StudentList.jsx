import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent } from '../features/students/studentsSlice';

const StudentList = () => {
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if(window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <div>
      <h2>Liste des étudiants</h2>
      <Link to="/add">
        <button style={{ marginBottom: '20px' }}>+ Nouvel Étudiant</button>
      </Link>

      {students.length === 0 ? (
        <p>Aucun étudiant enregistré.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Niveau</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.level}</td>
                <td>
                  {/* Lien vers le détail */}
                  <Link to={`/student/${student.id}`} style={{ marginRight: '10px' }}>
                    Voir
                  </Link>
                  
                  {/* Lien vers la modification (On réutilise le composant Form) */}
                  <Link to={`/edit/${student.id}`} style={{ marginRight: '10px' }}>
                    Modifier
                  </Link>

                  <button className="btn-delete" onClick={() => handleDelete(student.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;