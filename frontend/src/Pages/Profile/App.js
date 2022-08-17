import React from "react";

import { Box } from "@chakra-ui/react";

import PersonalInfo from "./components/PersonalInfo";
import CompanyInfo from "./components/CompanyInfo";
import ChangePassword from "./components/ChangePassword";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    document.title = "Profile";
    if (localStorage.getItem("token") == null) {
      //condition if not logged in
      navigate("/auth/login");
    } // eslint-disable-next-line
  }, []);
  const [changePassword, setChangePassword] = React.useState(false);

  return (
    <Box position="absolute" h="100vh" w="100vw">
      {!changePassword && <PersonalInfo />}
      {!changePassword && <CompanyInfo setChangePassword={setChangePassword} />}
      {changePassword && (
        <ChangePassword setChangePassword={setChangePassword} />
      )}
    </Box>
  );
};

export default App;
