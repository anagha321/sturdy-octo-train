import React, { useState } from 'react';
import "../styles/master.css";
import "../styles/receptionist.css";
import { ReactDialogBox } from 'react-js-dialog-box';
import 'react-js-dialog-box/dist/index.css';

const ReceptionistPage = () => {
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState({ id: 0, name: '', age: '', gender: '', contact: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogBox, setDialogBox] = useState(false);

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
    setDialogBox(false);
  };

  const handleEdit = (patient) => {
    setCurrentPatient(patient);
    setIsEditing(true);
  };

  const handleDialogBox = () => {
    setDialogBox(!isDialogBox);
  };

  const handleDelete = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  return (
    <div className="receptionist-page">
      <header>
        <h1>ABC Hospital - Receptionist Dashboard</h1>
      </header>
      <button className="add-patient-button" onClick={handleDialogBox}>
        +
      </button>
      <main>
        {isDialogBox &&
      <ReactDialogBox
              closeBox={handleDialogBox}
              modalWidth='50%'
              headerBackgroundColor='black'
              headerTextColor='white'
              headerHeight='65'
              closeButtonColor='white'
              bodyBackgroundColor='white'
              bodyTextColor='black'
              bodyHeight='65vh'
              headerText='New patient'>
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
        </ReactDialogBox>}
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
    </div>
  );
};

export default ReceptionistPage;
