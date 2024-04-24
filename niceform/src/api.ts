import axios from "axios";
import { NiceForm } from "./types/form";

const PORT = process.env.PORT || 3001;

const API_BASE_URL = `http://localhost:${PORT}/`;

export const getFormById = (id: string) => {
  return axios.get(API_BASE_URL + "get-form/", {
    params: {
      id: id,
    },
  });
};

export const saveFilledForm = (id: string, form: NiceForm) => {
  return axios.post(API_BASE_URL + "save-form/", JSON.stringify(form), {
    params: {
      id: id,
    },
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

export const getAllForms = () => {
  return axios.get(API_BASE_URL + "get-all-forms/");
};

export const getAllFilledForms = (id: string) => {
  return axios.get(API_BASE_URL + "get-all-filled-forms/", {
    params: {
      id: id,
    },
  });
};

export const getFilledFormById = (id: string) => {
  return axios.get(API_BASE_URL + "get-filled-form/", {
    params: {
      id: id,
    },
  });
};
