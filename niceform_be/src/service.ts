import { readFileSync, writeFileSync } from "fs";
import { NiceForm } from "./types";
import { v4 } from "uuid";

const FORM_CONFIG_LOCAL_FS_LOCATION = "./src/data/form_configs.json";
const FORM_FILLED_LOCAL_FS_LOCATION = "./src/data/form_filled.json";

const getFormById = async (id: string): Promise<any> => {
  try {
    const formsJson = JSON.parse(
      readFileSync(FORM_CONFIG_LOCAL_FS_LOCATION, "utf-8")
    );
    const form = formsJson[id];
    return form;
  } catch (error) {
    console.error(error);
  }
};

const saveFilledForm = (id: string, filledFormJson: any) => {
  try {
    const formsJson = JSON.parse(
      readFileSync(FORM_FILLED_LOCAL_FS_LOCATION, "utf-8")
    );
    const form: NiceForm = JSON.parse(filledFormJson);

    const allFormIds = new Set(getAllFilledFormIds());

    const formResId = allFormIds.has(id) ? id : v4() + "~" + id;

    formsJson[formResId] = form;

    writeFileSync(FORM_FILLED_LOCAL_FS_LOCATION, JSON.stringify(formsJson));
  } catch (error) {
    console.error(error);
  }
};

const getAllForms = () => {
  try {
    const formsJson = JSON.parse(
      readFileSync(FORM_CONFIG_LOCAL_FS_LOCATION, "utf-8")
    );
    return formsJson;
  } catch (error) {
    console.error(error);
  }
};

const getAllFormId = (): Array<string> => {
  const formJson = getAllForms();
  return Object.keys(formJson);
};

const getAllFilledForms = () => {
  try {
    const formsJson = JSON.parse(
      readFileSync(FORM_FILLED_LOCAL_FS_LOCATION, "utf-8")
    );
    return formsJson;
  } catch (error) {
    console.error(error);
  }
};

const getAllFilledFormIds = (): Array<string> => {
  const formJson = getAllFilledForms();
  return Object.keys(formJson);
};

const getFilledFormById = (id: string) => {
  try {
    const formsJson = JSON.parse(
      readFileSync(FORM_FILLED_LOCAL_FS_LOCATION, "utf-8")
    );
    const filledForm = formsJson[id];
    return filledForm;
  } catch (error) {
    console.error(error);
  }
};

const getAllFilledFormsById = (formId: string) => {
  const allFilledFormIds = getAllFilledFormIds();
  const filledFormsForId = [];

  allFilledFormIds.forEach((f) => {
    const templateId = f.split("~")[1];
    if (formId === templateId) {
      filledFormsForId.push(f);
    }
  });
  return filledFormsForId;
};

export const fileService = {
  getFormById,
  saveFilledForm,
  getAllForms,
  getAllFormId,
  getFilledFormById,
  getAllFilledFormsById,
};
