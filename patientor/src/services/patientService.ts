import patientData from '../../data/patients';
import { Patient, Entry } from '../types';

let patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const addEntry = (entry: Patient) => {
  patients.push(entry);
  return patients;
};

const getSafeEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addEntryToPatient = (id: string, entry: Entry) => {
  patients = patients.map((patient) => {
    if (patient.id === id) {
      return {
        ...patient,
        entries: [...patient.entries, entry],
      };
    } else {
      return patient;
    }
  });
};

export default {
  getEntries,
  addEntry,
  getSafeEntries,
  addEntryToPatient,
};
