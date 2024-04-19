import { useEffect, useState } from "react";
import {
  FormField,
  MultiSelectField,
  NiceForm,
  Page,
  isMultiSelectField,
  isTextInputField,
} from "../../types/form";
import {
  checkPageDataValid,
  getFormDataFromField,
} from "../../utils/form_utils";
import { saveFilledForm } from "../../api";
import "./FormGenerator.css";
import { useNavigate } from "react-router-dom";

interface IFormFieldProps {
  formField: FormField;
  onDataChange: (newFormData: any) => void;
  isFormFieldValid: boolean;
}

export const FormFieldComponent = (formFieldData: IFormFieldProps) => {
  const {
    formField,
    onDataChange: setFormData,
    isFormFieldValid,
  } = formFieldData;

  const { label, input, required, id } = formField;
  const [isInputValid, setIsInputValid] = useState(isFormFieldValid);

  useEffect(() => {
    setIsInputValid(isFormFieldValid);
  }, [isFormFieldValid]);

  let inputElement = <></>;

  if (isTextInputField(input)) {
    inputElement = (
      <div key={id}>
        <label>{label} </label>
        <input
          type="text"
          required={required}
          value={input.value}
          onChange={(e) => {
            input.value = e.target.value;
            let match = isInputValid;
            if (input.validation_regex) {
              let regex = new RegExp(input.validation_regex);
              match = regex.test(input.value);
              setIsInputValid(match);
            }
            if (match) {
              const data = getFormDataFromField(formField);
              setFormData(data);
            } else {
              setFormData({ [formField.id]: "" });
            }
          }}
        />
      </div>
    );
  }

  if (isMultiSelectField(input)) {
    inputElement = (
      <div key={id}>
        <label>{label}</label>
        {input.options.map((option, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={option.isChecked}
              onChange={(e) => {
                input.options[index].isChecked = e.target.checked;
                const data = getFormDataFromField(formField);
                if (data) {
                  setIsInputValid(
                    !(
                      data[formField.id].length <
                      (formField.input as MultiSelectField).minRequiredSelection
                    )
                  );
                }
                setFormData(data);
              }}
            />
            {option.text}
          </label>
        ))}
      </div>
    );
  }

  return (
    <div className="question">
      {inputElement}
      {!isInputValid && <div className="error">{formField.error_message}</div>}
    </div>
  );
};

interface IPageProps {
  page: Page;
  isLastPage: boolean;
  showPreviousBtn: boolean;
  setFormData: (newFormData: any) => void;
  onPageSuccess: () => void;
  onPrevious: () => void;
}

const PageComponent = (pageData: IPageProps) => {
  const {
    page,
    isLastPage,
    setFormData,
    onPageSuccess,
    onPrevious,
    showPreviousBtn,
  } = pageData;

  const [inValidPages, setInvalidPages] = useState(new Set<String>());

  return (
    <div style={{ overflowY: "scroll" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const invalidPagesSet = checkPageDataValid(page);
          setInvalidPages(invalidPagesSet);
          if (invalidPagesSet.size === 0) onPageSuccess();
        }}
      >
        {page.questions.map((formField, index) => {
          return (
            <span>
              <FormFieldComponent
                formField={formField}
                onDataChange={setFormData}
                isFormFieldValid={!inValidPages.has(formField.id)}
              />
            </span>
          );
        })}
        <div>
          {showPreviousBtn && <button onClick={onPrevious}>Previous</button>}
          <button type="submit">{isLastPage ? "Submit" : "Next"}</button>
        </div>
      </form>
    </div>
  );
};

interface IFormProps {
  formId: string;
  form: NiceForm;
}

export const NiceFormComponent = (props: IFormProps) => {
  const { formId, form } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentPage + 1 < form.pages.length) setCurrentPage(currentPage + 1);
    else {
      saveFilledForm(formId, form);
      navigate("/");
    }
  };
  const handlePrevious = () => {
    if (currentPage >= 0) setCurrentPage(currentPage - 1);
  };
  const updateFormData = (newFormData: any) => {
    setFormData({ ...formData, ...newFormData });
  };

  return (
    <div>
      <PageComponent
        page={form.pages[currentPage]}
        isLastPage={currentPage == form.pages.length - 1}
        showPreviousBtn={currentPage > 0}
        setFormData={updateFormData}
        onPageSuccess={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};
