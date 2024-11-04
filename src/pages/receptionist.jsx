import React, { useState, useEffect } from 'react';
import "../styles/master.css";
import "../styles/receptionist.css";
import { ReactDialogBox } from 'react-js-dialog-box';
import 'react-js-dialog-box/dist/index.css';
import db from "../firebase_config.jsx";
import { collection, doc, setDoc, getDocs, getCountFromServer, deleteDoc } from 'firebase/firestore';

const ReceptionistPage = () => {
  var docRef = collection(db, "patients");

  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState({ id: 0, name: '', age: '', gender: '', contact: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogBox, setDialogBox] = useState(false);

  const getPatientsFromDb = async () => {
    var patients = [];
    try {
      const docs = await getDocs(docRef);
      docs.forEach(function (doc) {
        patients = [...patients, {
          id: doc.id,
          name: doc.data().patient_name,
          age: Math.floor(Math.abs(doc.data().patient_dob.seconds * 1000 - Date.now()) / (1000 * 3600 * 24 * 365.25)).toString(),
          gender: doc.data().patient_sex.charAt(0).toUpperCase(),
          contact: doc.data().patient_contact || ''
        }];
      });
      setPatients(patients);
    } catch (e) {
      console.error("Firestore error:", e);
    }
  }

  useEffect(() => {
    getPatientsFromDb();
  }, []);

  const modifyPatientInDb = async () => {
    let docid;
    if (isEditing) {
      docid = currentPatient.id;
    } else {
      const snapshot = await getCountFromServer(docRef);
      docid = (snapshot.data().count + 1).toString();
    }
    await setDoc(doc(db, "patients", docid), {
      patient_date_registration: Date.now(),
      patient_name: currentPatient.name,
      patient_dob: 'January 1, 2005 at 12:00:00 AM UTC+5:30',
      patient_sex: currentPatient.gender.charAt(0).toLowerCase(),
      patient_contact: currentPatient.contact
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await modifyPatientInDb();
    setCurrentPatient({ id: 0, name: '', age: '', gender: '', contact: '' });
    setIsEditing(false);
    setDialogBox(false);
    getPatientsFromDb();
  };

  const handleEdit = (patient) => {
    setCurrentPatient({
      ...patient,
      gender: patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'
    });
    setDialogBox(true);
    setIsEditing(true);
  };

  const handleDialogBox = () => {
    if (!isDialogBox) {
      setCurrentPatient({ id: 0, name: '', age: '', gender: '', contact: '' });
      setIsEditing(false);
    }
    setDialogBox(!isDialogBox);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "patients", id));
      setPatients(patients.filter(p => p.id !== id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <div className="receptionist-page">
      <header className="receptionist-header">
        <h1>ABC Hospital — Receptionist Dashboard</h1>
      </header>
      <button className="add-patient-button" onClick={() => {
        setCurrentPatient({ id: 0, name: '', age: '', gender: '', contact: '' });
        setIsEditing(false);
        setDialogBox(true);
      }}>
        +
      </button>
      <main>
        {isDialogBox &&
          <ReactDialogBox
            closeBox={handleDialogBox}
            modalWidth='50%'
            headerHeight='0'
            bodyBackgroundColor=''
            bodyTextColor='black'
            bodyHeight='82vh'
            headerText=''>
            <section className="patient-form">
              <h2>{isEditing ? 'Edit Patient' : 'Add New Patient'}</h2>
              <button className="close-dialog-button" onClick={handleDialogBox}>Close</button>
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
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
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