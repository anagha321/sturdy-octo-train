import React, { useState } from 'react';

const ReceptionistPage = () => {
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState({ id: 0, name: '', age: '', gender: '', contact: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setPatients(patients.map(p => p.id === currentPatient.id ? currentPatient : p));
    } else {
      setPatients([...patients, { ...currentPatient, id: Date.now() }]);
    }
    setCurrentPatient({ id: 0, name: '', age: '', gender: '', contact: '' });
    setIsEditing(false);
  };

  const handleEdit = (patient) => {
    setCurrentPatient(patient);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  return (
    <div className="receptionist-page">
      <header>
        <h1>ABC Hospital - Receptionist Dashboard</h1>
      </header>
      <main>
        <section className="patient-form">
          <h2>{isEditing ? 'Edit Patient' : 'Add New Patient'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={currentPatient.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={currentPatient.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={currentPatient.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact:</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={currentPatient.contact}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">{isEditing ? 'Update Patient' : 'Add Patient'}</button>
          </form>
        </section>
        <section className="patient-list">
          <h2>Patient List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.contact}</td>
                  <td>
                    <button onClick={() => handleEdit(patient)}>Edit</button>
                    <button onClick={() => handleDelete(patient.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      <style jsx>{`
        .receptionist-page {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        header {
          background-color: #2563eb;
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        h1 {
          margin: 0;
        }
        main {
          display: flex;
          gap: 20px;
        }
        .patient-form, .patient-list {
          flex: 1;
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 8px;
        }
        h2 {
          margin-top: 0;
          color: #2563eb;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input, select {
          width: 100%;
          padding: 8px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
        }
        button {
          background-color: #2563eb;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #1d4ed8;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #d1d5db;
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #e5e7eb;
        }
        .patient-list button {
          margin-right: 5px;
        }
        @media (max-width: 768px) {
          main {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ReceptionistPage;
