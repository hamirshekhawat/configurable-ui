import { useCallback, useEffect, useState, useRef } from "react";
import { NiceFormComponent } from "./FormGenerator";
import { NiceForm } from "../../types/form";
import { getFilledFormById, getFormById } from "../../api";
import { useParams } from "react-router-dom";
import { clearForm } from "../../utils/form_utils";

const Form = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [form, setFormData] = useState<NiceForm | null>();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { id } = useParams();

  const alertAndClearData = useCallback((form: NiceForm) => {
    alert("TIMEOUT!");
    const clearedForm = clearForm(form);
    setFormData(clearedForm);
  }, []);

  const startTimer = useCallback(
    (timeout: number, form: NiceForm) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        alertAndClearData(form);
        startTimer(timeout, form);
      }, timeout);
    },
    [alertAndClearData]
  );

  const updateFormData = useCallback(
    (response: any) => {
      if (response.status === 200) {
        const { formJson } = response.data;
        let form: NiceForm = JSON.parse(JSON.stringify(formJson));
        setFormData(form);
        setLoading(false);

        if (form?.timeout > 0) {
          startTimer(form.timeout, form);
        }
      }
    },
    [startTimer]
  );

  useEffect(() => {
    if (id) {
      setLoading(true);

      const getForm = window.location.pathname.includes("response")
        ? getFilledFormById
        : getFormById;
      getForm(id)
        .then(updateFormData)
        .catch((error: Error) => console.error(`ERROR:  ${error.message}`));
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [id, updateFormData]);

  return form && id ? (
    <NiceFormComponent key={Math.random()} form={form} formId={id} />
  ) : (
    <div className="home-container">
      <p>{isLoading ? `Fetching form  ${id}` : "Form not found"}</p>
      {isLoading && <progress value={undefined} />}
    </div>
  );
};

export default Form;
