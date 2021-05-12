import { State } from './state';
import { Patient, Diagnosis } from '../types';

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
