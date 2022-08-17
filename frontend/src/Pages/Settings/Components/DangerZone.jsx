import React from "react";
import Suspend from "./Dangerzone/Suspend";
import Delete from "./Dangerzone/Delete";
import Transfer from "./Dangerzone/Transfer";

function DangerZone() {
  return (
    <div id="dangerzone">
      <div className="danger-wrapper">
        <Suspend />
        <Delete />
        <Transfer />
      </div>
    </div>
  );
}

export default DangerZone;
