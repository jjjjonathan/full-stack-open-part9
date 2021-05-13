import React, { useEffect } from 'react';
import axios from 'axios';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import { useStateValue, setPatientDetails } from '../state';
import { Divider } from 'semantic-ui-react';

const PatientDetails = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
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

  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === code);
    if (diagnosis) return diagnosis.name;
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'HealthCheck':
        return 'Health Check';
      case 'OccupationalHealthcare':
        return 'Occupational Healthcare';
      case 'Hospital':
        return 'Hospital';
      default:
        return null;
    }
  };

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
      <h3>entries</h3>
      <Divider />
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <h4>{entry.date}</h4>
          <h5>Type: {getTypeName(entry.type)}</h5>
          <p>{entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code}: {getDiagnosisName(code)}
              </li>
            ))}
          </ul>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default PatientDetails;
