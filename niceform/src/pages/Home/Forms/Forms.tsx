import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllForms } from "../../../api";
import "./Forms.css";

function Home() {
  const [formList, setForms] = useState<Array<string>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getAllForms()
      .then((response) => {
        setLoading(false);
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
      {isLoading && <p>Fetching forms</p>}
      {!isLoading && formList.length <= 0 && <p>No forms</p>}
      {formList.length > 0 &&
        formList.map((form, index) => (
          <div className="card" key={index}>
            <Link to={"/" + form}>{form} </Link>
            <Link to={"/responses/" + form}>Responses </Link>
          </div>
        ))}
      {isLoading && <progress value={undefined} />}
    </div>
  );
}

export default Home;
