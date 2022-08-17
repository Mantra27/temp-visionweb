import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Switch,
} from "@chakra-ui/react";
import React from "react";

function SecurityAndData() {
  return (
    <div id="securityanddata">
      <div className="security-wrapper">
        <Accordion allowMultiple>
          <AccordionItem className="security-item">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <p>Encryption</p>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              fuga facere optio ab nostrum aperiam culpa blanditiis commodi
              aspernatur numquam officia inventore cum ipsa, esse, ratione
              obcaecati et consectetur dolores.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem className="security-item">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <p>Webhooks</p>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              rem earum placeat cum fuga nobis modi consequuntur maiores, ad
              quos aperiam, ullam assumenda. Laudantium, nobis a iusto ipsum
              architecto et.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <div className="security-item security-switch">
          <label>Redundancy</label>
          <Switch className="switch" />
        </div>
        <div className="security-item security-switch">
          <label>Data Collection by DICOT</label>
          <Switch className="switch" />
        </div>
        <div className="security-item security-switch">
          <label>VPN</label>
          <Switch className="switch" />
        </div>
        <Accordion className="security-item" allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <p>Logging</p>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <div className="log-item">
                <p>Enable All Logs</p>
                <Switch className="switch" />
              </div>
              <div className="log-item">
                <p>Connection Settings</p>
              </div>
              <div className="log-item">
                <p>Device Settings</p>
              </div>
              <div className="log-item">
                <p>Device Manipulation</p>
              </div>
              <div className="log-item">
                <p>Export and Prints</p>
              </div>
              <div className="log-item">
                <p>Roles</p>
              </div>
              <div className="log-item">
                <p>Role Changes</p>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default SecurityAndData;
