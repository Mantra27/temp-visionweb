import React from "react";
import Suspend from "../Components/Dangerzone/Suspend";
import Delete from "../Components/Dangerzone/Delete";
import Transfer from "../Components/Dangerzone/Transfer";

function DangerZone({ setPage }) {
  React.useEffect(() => {
    return () => {
      setPage("Danger Zone");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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
