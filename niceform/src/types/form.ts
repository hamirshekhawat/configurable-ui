export interface TextInputField {
  validation_regex: string;
  value: string;
}

export interface MultiSelectOption {
  text: string;
  isChecked: boolean;
  id: string;
}

export interface MultiSelectField {
  minRequiredSelection: number;
  options: Array<MultiSelectOption>;
}

export interface FormField {
  label: string;
  input: TextInputField | MultiSelectField;
  required: boolean;
  error_message: string;
  id: string;
}

export interface Page {
  questions: Array<FormField>;
}

export interface NiceForm {
  pages: Array<Page>;
  timeout: number;
}

export const isTextInputField = (field: any): field is TextInputField => {
  return field.hasOwnProperty("value");
};

export const isMultiSelectField = (field: any): field is MultiSelectField => {
  return field.hasOwnProperty("options");
};
