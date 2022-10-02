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

function SecurityAndData({ setPage }) {
  React.useEffect(() => {
    return () => {
      setPage("Security and Data");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="securityanddata">
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
             <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
        </div>
        <div className="security-item security-switch">
          <label>Data Collection by DICOT</label>
             <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
        </div>
        <div className="security-item security-switch">
          <label>VPN</label>
             <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
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
                   <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
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
      <input
        className="discard-changes"
        type="button"
        value="Discard Changes"
      />
      <input className="save-changes" type="submit" value="Save Changes" />
    </div>
  );
}

export default SecurityAndData;
