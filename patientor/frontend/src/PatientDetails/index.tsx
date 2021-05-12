import React, { useEffect } from 'react';
import axios from 'axios';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import { useStateValue, setPatientDetails } from '../state';

const PatientDetails = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient = patients[id];

  useEffect(() => {
    const getPatientData = async () => {
      try {
        if (patient && !Object.prototype.hasOwnProperty.call(patient, 'ssn')) {
          const { data } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatientDetails(data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    void getPatientData();
  });

  if (!patient) return null;

  return (
    <div className="App">
      <h2>{patient.name}</h2>
      <p>
        gender: {patient.gender}
        <br />
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
    </div>
  );
};

export default PatientDetails;
