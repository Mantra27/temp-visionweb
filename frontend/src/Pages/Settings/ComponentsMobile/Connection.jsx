import { Radio, RadioGroup } from "@chakra-ui/react";
import React from "react";

function Connection({ setPage }) {
  React.useEffect(() => {
    return () => {
      setPage("Connections");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div className="connection">
      <h1>Connection Method</h1>
      <RadioGroup>
        <div className="connection-method">
          <label>MQQT</label>
          <Radio name="MQQT" value="mqqt" />
        </div>
        <div className="connection-method">
          <label>JSON Data Collection</label>
          <Radio name="jsondatacollection" value="jsondc" />
        </div>
        <div className="connection-method">
          <label>OPC Server</label>
          <Radio name="opc" value="opc" />
        </div>
        <div className="connection-method">
          <label>Vision C</label>
          <Radio name="visionc" value="visionc" />
        </div>
        <div className="connection-method">
          <label>Custom Protocol</label>
          <Radio name="customprotocol" value="custom" />
        </div>
      </RadioGroup>
      <h1>Device Configuration</h1>
      <div className="device-config">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
        esse dolorum magnam sit deserunt et. Omnis, dicta corrupti, aut
        doloribus unde voluptatum officiis esse consequuntur animi natus optio
        magni repudiandae?
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

export default Connection;
