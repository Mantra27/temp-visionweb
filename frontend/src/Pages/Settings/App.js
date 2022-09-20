import React from "react";
import { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./settings.css";

import Navbar from "./Components/Navbar";
import Connection from "./ComponentsMobile/Connection";
import ManageMembers from "./ComponentsMobile/ManageMembers";
import SecurityAndData from "./ComponentsMobile/SecurityAndData";
import DangerZone from "./ComponentsMobile/DangerZone";
import NavbarMobile from "./ComponentsMobile/NavbarMobile";
import Admin from "./ComponentsMobile/ManageMembers/Admin";
import Supervisor from "./ComponentsMobile/ManageMembers/Supervisor";
import Operator from "./ComponentsMobile/ManageMembers/Operator";
import { useNavigate, useSearchParams } from "react-router-dom";

const Setting = lazy(() => import("./Setting"));
const SettingMobile = lazy(() => import("./SettingMobile"));

function App() {

  const [searchParams, setSearchParams] = useSearchParams();
  const ProjectID = searchParams.get("graphId");

  React.useLayoutEffect(() => {
    document.title = "Settings";
  }, []);
   
  const [graphId, setGraphId] = useState(ProjectID);
  const [page, setpage] = useState("");

  return (
    <div className="app">
      <Suspense fallback="please wait..">
        {window.innerWidth > 900 ? (
          <>
            <Navbar />
            <Setting />
          </>
        ) : (
          <>
            <NavbarMobile page={page} />
            <Routes>
              <Route path="/" element={<SettingMobile setPage={setpage} />} />
              <Route
                path="/connection"
                element={<Connection setPage={setpage} />}
              />
              <Route
                path="/managemembers"
                element={<ManageMembers setPage={setpage} />}
              />
              <Route path="/admin" element={<Admin setPage={setpage} />} />
              <Route
                path="/supervisor"
                element={<Supervisor setPage={setpage} />}
              />
              <Route
                path="/operator"
                element={<Operator setPage={setpage} />}
              />
              <Route
                path="/securityanddata"
                element={<SecurityAndData setPage={setpage} />}
              />
              <Route
                path="/dangerzone"
                element={<DangerZone setPage={setpage} />}
              />
            </Routes>
          </>
        )}
      </Suspense>
    </div>
  );
}

export default App;
