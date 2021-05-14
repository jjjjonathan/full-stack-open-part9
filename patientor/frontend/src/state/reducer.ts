import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

interface EntryPayload {
  entry: Entry;
  id: string;
}

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'SET_DIAGNOSES';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_PATIENT_DETAILS';
      payload: Patient;
    }
  | {
      type: 'ADD_ENTRY';
      payload: EntryPayload;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'SET_DIAGNOSES':
      return {
        ...state,
        diagnoses: action.payload,
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_PATIENT_DETAILS':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'ADD_ENTRY':
      const patient = state.patients[action.payload.id];
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...patient,
            entries: [...patient.entries, action.payload.entry],
          },
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]) => {
  const action: Action = {
    type: 'SET_PATIENT_LIST',
    payload,
  };
  return action;
};

export const setDiagnoses = (payload: Diagnosis[]) => {
  const action: Action = {
    type: 'SET_DIAGNOSES',
    payload,
  };
  return action;
};

export const addPatient = (payload: Patient) => {
  const action: Action = {
    type: 'ADD_PATIENT',
    payload,
  };
  return action;
};

export const setPatientDetails = (payload: Patient) => {
  const action: Action = {
    type: 'SET_PATIENT_DETAILS',
    payload,
  };
  return action;
};

export const addEntry = (payload: EntryPayload) => {
  const action: Action = {
    type: 'ADD_ENTRY',
    payload,
  };
  return action;
};
