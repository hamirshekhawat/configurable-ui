import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import "./FilledForms.css";
import { getAllFilledForms } from "../../api";

function FilledForms() {
  const [formList, setForms] = useState<Array<string>>([]);

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      getAllFilledForms(id)
        .then((response) => {
          try {
            if (response.status === 200) {
              const formsJson = response.data;
              let forms = JSON.parse(JSON.stringify(formsJson));
              setForms(forms);
            }
          } catch (error) {}
        })
        .catch((error) => {
          console.log("ERROR: " + error);
        });
    }
  }, []);

  return (
    // <div className="home-container">
    //   {formList.length <= 0 && <p>No form responses found</p>}
    //   {formList.length > 0 && (
    //     <table>
    //       <tbody>
    //         <tr>
    //           <th> FORM RESPONSES </th>
    //         </tr>
    //         {formList.map((form, index) => {
    //           return (
    //             <tr key={index}>
    //               <td>
    //                 <Link to={"/response/" + form}>{form} </Link>
    //               </td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   )}
    // </div>
    <div className="home-container">
      <h1 className="page-title">{id} Responses</h1>
      {formList.length <= 0 && <p>No form responses found</p>}
      {formList.length > 0 &&
        formList.map((form, index) => (
          <div className="card" key={index}>
            <Link to={"/response/" + form}>{form} </Link>
          </div>
        ))}
    </div>
  );
}

export default FilledForms;
