import { Box } from "@chakra-ui/react";
import React from "react";
import Billing from "./components/Billing";
import { useNavigate } from "react-router-dom";
import DrawerMenu from "../../Drawer";

const App = (props) => {
  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    document.title = "Billing";
    if (localStorage.getItem("token") == null) {
      //condition if not logged in
      navigate("/auth/login");
    } // eslint-disable-next-line
  }, []);

  return (
    <Box position="absolute" h="100vh" w="100vw">
      <DrawerMenu onClose={props.onClose} isOpen={props.isOpen} />
      <Billing onOpen={props.onOpen} />
    </Box>
  );
};

export default App;
