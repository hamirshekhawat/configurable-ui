import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllForms } from "../../../api";
import "./Forms.css";

function Home() {
  const [formList, setForms] = useState<Array<string>>([]);

  useEffect(() => {
    getAllForms()
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
  }, []);

  return (
    <div className="home-container">
      <h1 className="page-title">Forms and their responses</h1>
      {formList.length <= 0 && <p>No forms uwu</p>}
      {formList.length > 0 &&
        formList.map((form, index) => (
          <div className="card" key={index}>
            <Link to={"/" + form}>{form} </Link>
            <Link to={"/responses/" + form}>Responses </Link>
          </div>
        ))}
    </div>
  );

  return <div>Hello world</div>;
}

export default Home;
