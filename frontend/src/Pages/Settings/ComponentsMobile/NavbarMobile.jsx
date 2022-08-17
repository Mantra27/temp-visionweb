import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

function Navbar({ page }) {
  const [path, setPath] = React.useState("/");
  React.useEffect(() => {
    if (page !== "Settings") {
      if (page === "Admin" || page === "Operator" || page === "Supervisor") {
        setPath("/settings/managemembers");
      } else {
        setPath("/settings");
      }
    } else {
      setPath("/");
    }
  }, [page]);
  return (
    <nav id="navbar" className="navbar">
      <div className="container">
        <Link to={path}>
          <BsArrowLeftCircle
            className="back"
            style={{ width: "15vw", marginTop: "2vh" }}
          />
        </Link>
        <h1>{page}</h1>
      </div>
    </nav>
  );
}

export default Navbar;
