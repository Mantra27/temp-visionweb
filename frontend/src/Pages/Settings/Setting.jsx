import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import Connection from "./Components/Connection";
import ManageMembers from "./Components/ManageMembers";
import SecurityAndData from "./Components/SecurityAndData";
import DangerZone from "./Components/DangerZone";
import { useNavigate } from "react-router-dom";

function Setting() {

  return (
    
    <div style={{ marginTop: "10vh" }}>
      <Tabs orientation="vertical" >
        <TabList className="tabs">
          <Tab>Connection</Tab>
          <Tab>Manage Members</Tab>
          <Tab>Security and Data</Tab>
          <Tab>Danger zone</Tab>
        </TabList>

        <TabPanels className="panels">
          <TabPanel>
            <Connection />
          </TabPanel>
          <TabPanel>
            <ManageMembers />
          </TabPanel>
          <TabPanel>
            <SecurityAndData />
          </TabPanel>
          <TabPanel>
            <DangerZone />
          </TabPanel>
          <input
            className="discard-changes"
            type="button"
            value="Discard Changes"
          />
          <input className="save-changes" type="submit" value="Save Changes" />
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Setting;
