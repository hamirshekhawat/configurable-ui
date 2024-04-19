export interface TextInputField {
  validation_regex: string;
  value: string;
}

export interface MultiSelectOption {
  text: string;
  isChecked: boolean;
}

export interface MultiSelectField {
  min_required_selection: string;
  options: Array<MultiSelectOption>;
}

export interface FormField {
  label: string;
  field: TextInputField | MultiSelectField;
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

export interface GetFormRequestQuery {
  id: string;
}

export interface GetFormResponseBody {
  id: string;
  formJson: any;
}
