import { useEffect, useState } from "react";
import { NiceFormComponent } from "./FormGenerator";
import { NiceForm } from "../../types/form";
import { getFilledFormById, getFormById } from "../../api";
import { useNavigate, useParams } from "react-router-dom";

function Form() {
  const [form, setFormData] = useState<NiceForm>();
  let { id } = useParams();
  const navigate = useNavigate();
  let timer: NodeJS.Timeout | undefined = undefined;

  function updateFormData(response: any) {
    try {
      if (response.status === 200) {
        const formJson = response.data["formJson"];
        let form: NiceForm = JSON.parse(JSON.stringify(formJson));
        console.log(form?.timeout);

        setFormData(form);

        if (form?.timeout && form?.timeout > 0) {
          if (!timer)
            timer = setTimeout(() => {
              navigate("/");
              alert("TIMEOUT!");
            }, form?.timeout);

          return () => clearTimeout(timer);
        }
      }
    } catch (error) {
      console.log("ERROR: " + error);
    }
  }

  useEffect(() => {
    if (id) {
      const page = window.location.pathname;
      const getForm = page.includes("response")
        ? getFilledFormById
        : getFormById;

      getForm(id)
        .then((response) => {
          return updateFormData(response);
        })
        .catch((error) => {
          console.log("ERROR: " + error);
        });
    }
  }, []);

  if (form && id)
    return (
      <div>
        <NiceFormComponent form={form} formId={id} />
      </div>
    );

  return <div>Form not found</div>;
}

export default Form;
