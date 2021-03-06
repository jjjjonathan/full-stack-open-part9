import React, { useEffect } from 'react';
import axios from 'axios';

import { Entry, EntryWithoutId, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import { useStateValue, setPatientDetails, addEntry } from '../state';
import { Divider } from 'semantic-ui-react';
import AddEntryForm, {
  HealthCheckValues,
  HospitalValues,
  OccupationalValues,
} from '../AddEntryForm';

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

  const handleAddHospitalEntry = async ({
    date,
    description,
    diagnosisCodes,
    specialist,
    dischargecriteria,
    dischargedate,
  }: HospitalValues) => {
    const newEntry: EntryWithoutId = {
      type: 'Hospital',
      date,
      description,
      diagnosisCodes,
      specialist,
      discharge: {
        date: dischargedate,
        criteria: dischargecriteria,
      },
    };

    try {
      const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newEntry
      );
      dispatch(addEntry({ entry: data, id }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleOccupationalSubmitEntry = async ({
    date,
    description,
    diagnosisCodes,
    specialist,
    employerName,
    sickLeaveStart,
    sickLeaveEnd,
  }: OccupationalValues) => {
    const newEntry: EntryWithoutId = {
      type: 'OccupationalHealthcare',
      date,
      description,
      diagnosisCodes,
      specialist,
      employerName,
      sickLeave: {
        startDate: sickLeaveStart,
        endDate: sickLeaveEnd,
      },
    };

    try {
      const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newEntry
      );
      dispatch(addEntry({ entry: data, id }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleHealthCheckSubmitEntry = async (values: HealthCheckValues) => {
    const newEntry: EntryWithoutId = {
      type: 'HealthCheck',
      ...values,
    };
    try {
      const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newEntry
      );
      dispatch(addEntry({ entry: data, id }));
    } catch (error) {
      console.error(error);
    }
  };

  const renderEntries = (entries: Entry[]) => {
    if (!entries) return null;
    return entries.map((entry) => (
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
    ));
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
      {renderEntries(patient.entries)}
      <AddEntryForm
        onHospitalSubmit={handleAddHospitalEntry}
        onOccupationalSubmit={handleOccupationalSubmitEntry}
        onHealthCheckSubmit={handleHealthCheckSubmitEntry}
      />
    </div>
  );
};

export default PatientDetails;
