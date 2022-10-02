import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import React, { useState } from "react";

function SettingsMobile({ setPage }) {

  const [searchParams, setSearchParams] = useSearchParams();
  const projectId = searchParams.get("project");

  React.useEffect(() => {
    return () => {
      setPage("Settings");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div id="settings-mobile">
      <button>
        <Link to={`/settings/connection?project=${projectId}`} className="link">
          <p>Connection</p>
          <IoIosArrowForward />
        </Link>
      </button>
      <button>
        <Link to={`/settings/managemembers?project?=${projectId}`} className="link">
          <p>Manage Members</p>
          <IoIosArrowForward />
        </Link>
      </button>
      <button>
        <Link to={`/settings/securityanddata?project=${projectId}`} className="link">
          <p>Security and Data</p>
          <IoIosArrowForward />
        </Link>
      </button>
      <button>
        <Link to={`/settings/dangerzone?project?=${projectId}`} className="link">
          <p>Danger Zone</p>
          <IoIosArrowForward />
        </Link>
      </button>
    </div>
  );
}

export default SettingsMobile;
