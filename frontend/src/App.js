import React from "react";

import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/App";
import Billing from "./Pages/Billing/App";
import Feedback from "./Pages/Feedback/App";
import Notifications from "./Pages/Notifications/App";
import Profile from "./Pages/Profile/App";
import Settings from "./Pages/Settings/App";
import Project from "./Pages/Project/Project";
import { useDisclosure } from "@chakra-ui/react";
import Setting from "./Pages/Settings/Setting";
import FP from "./Pages/fp/App";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <Dashboard onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
        }
      />
      <Route path="/auth/login" exact element={<Login />} />
      <Route path="/auth/fp" exact element={<FP />} />
      <Route path="/auth/register" exact element={<Register />} />
      <Route
        path="/billing"
        exact
        element={<Billing onOpen={onOpen} isOpen={isOpen} onClose={onClose} />}
      />
      <Route
        path="/feedback"
        exact
        element={<Feedback onOpen={onOpen} isOpen={isOpen} onClose={onClose} />}
      />
      <Route path="/notifications" exact element={<Notifications />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/project" exact element={<Project />} />
      <Route path="/settings/*" exact element={<Settings />} />
    </Routes>
  );
}

export default App;
