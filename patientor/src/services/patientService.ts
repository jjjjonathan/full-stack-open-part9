import patientData from '../../data/patients.json';
import { Patient } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const addEntry = (entry: Patient) => {
  patients.push(entry);
  return patients;
};

const getSafeEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
  addEntry,
  getSafeEntries,
};
