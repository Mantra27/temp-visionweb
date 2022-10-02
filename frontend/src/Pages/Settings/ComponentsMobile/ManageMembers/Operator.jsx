import { Switch } from "@chakra-ui/react";
import React from "react";

function Operator({ setPage }) {
  React.useEffect(() => setPage("Operator"), []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="section">
      <h1>Role Permissions</h1>
      <div className="security-item security-switch">
        <label>Edit Connection Settings</label>
           <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
      </div>
      <div className="security-item security-switch">
        <label>Edit Device Setting</label>
           <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
      </div>
      <div className="security-item security-switch">
        <label>Manipulate Devices</label>
           <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
      </div>
      <div className="security-item security-switch">
        <label>View and Manipulate Data</label>
           <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
      </div>
      <div className="security-item security-switch">
        <label>Export and Prints</label>
           <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
      </div>
      <div className="security-item security-switch">
        <label>Danger Zone</label>
           <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
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

export default Operator;
