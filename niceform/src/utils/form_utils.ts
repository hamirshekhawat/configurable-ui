import {
  FormField,
  Page,
  isMultiSelectField,
  isTextInputField,
} from "../types/form";

export const getFormDataFromField = (formField: FormField) => {
  const formFieldId = formField.id;
  if (isTextInputField(formField.input)) {
    return { [formFieldId]: formField.input.value };
  }

  if (isMultiSelectField(formField.input)) {
    const selectedOptions: string[] = [];
    formField.input.options.forEach((option) => {
      if (option.isChecked) {
        selectedOptions.push(option.id);
      }
    });
    return { [formFieldId]: selectedOptions };
  }
};

export const checkPageDataValid = (formPage: Page): Set<string> => {
  const invalidFormFields: Set<string> = new Set();
  formPage.questions.forEach((formField) => {
    if (isTextInputField(formField.input)) {
      const regex = new RegExp(formField.input.validation_regex);
      const match = regex.test(formField.input.value);
      if (!match) {
        invalidFormFields.add(formField.id);
      }
    }

    if (isMultiSelectField(formField.input)) {
      let selectedOptionCount = 0;

      formField.input.options.forEach((option) => {
        if (option.isChecked) {
          selectedOptionCount += 1;
        }
      });
      if (selectedOptionCount < formField.input.minRequiredSelection) {
        invalidFormFields.add(formField.id);
      }
    }
  });
  return invalidFormFields;
};
