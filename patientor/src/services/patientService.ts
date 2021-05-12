import patientData from '../../data/patients';
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

export default {
  getEntries,
  addEntry,
  getSafeEntries,
};
