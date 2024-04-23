import {
  FormField,
  NiceForm,
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
    if (formField.input.showCustomInput && formField.input.customInputValue) {
      selectedOptions.push(formField.input.customInputValue);
    }
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
      if (formField.input.showCustomInput && formField.input.customInputValue) {
        selectedOptionCount += 1;
      }
      if (selectedOptionCount < formField.input.minRequiredSelection) {
        invalidFormFields.add(formField.id);
      }
      if (selectedOptionCount > formField.input.maxRequiredSelection) {
        invalidFormFields.add(formField.id);
      }
    }
  });
  return invalidFormFields;
};

export const clearForm = (form: NiceForm) => {
  form.pages.forEach((page) => {
    page.questions.forEach((question) => {
      if (isTextInputField(question.input)) {
        question.input.value = "";
      }
      else if (isMultiSelectField(question.input)) {
        if(question.input.showCustomInput) {
          question.input.customInputValue = "";
        }
        question.input.options.forEach((option) => {
          option.isChecked = false;
        })
      }
    })
  });
  return {...form};
}
