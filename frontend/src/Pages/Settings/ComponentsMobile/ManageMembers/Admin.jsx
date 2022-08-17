import { Switch } from "@chakra-ui/react";
import React from "react";

function Admin({ setPage }) {
  React.useEffect(() => setPage("Admin"), []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="section">
      <h1>Role Permissions</h1>
      <div className="security-item security-switch">
        <label>Edit Connection Settings</label>
        <Switch className="switch" />
      </div>
      <div className="security-item security-switch">
        <label>Edit Device Setting</label>
        <Switch className="switch" />
      </div>
      <div className="security-item security-switch">
        <label>Manipulate Devices</label>
        <Switch className="switch" />
      </div>
      <div className="security-item security-switch">
        <label>View and Manipulate Data</label>
        <Switch className="switch" />
      </div>
      <div className="security-item security-switch">
        <label>Export and Prints</label>
        <Switch className="switch" />
      </div>
      <div className="security-item security-switch">
        <label>Danger Zone</label>
        <Switch className="switch" />
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

export default Admin;
