import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StudentDetail = () => {
  const { id } = useParams();
  const student = useSelector((state) => 
    state.students.find((s) => s.id === id)
  );

  if (!student) {
    return <div>Étudiant non trouvé ! <Link to="/">Retour</Link></div>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #333' }}>
      <h2>Détails de l'étudiant</h2>
      <p><strong>ID :</strong> {student.id}</p>
      <p><strong>Nom :</strong> {student.name}</p>
      <p><strong>Niveau :</strong> {student.level}</p>
      <br />
      <Link to="/">Retour à la liste</Link>
    </div>
  );
};

export default StudentDetail;