import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function SettingsMobile({ setPage }) {
  React.useEffect(() => {
    return () => {
      setPage("Settings");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div id="settings-mobile">
      <button>
        <Link to={"/settings/connection"} className="link">
          <p>Connection</p>
          <IoIosArrowForward />
        </Link>
      </button>
      <button>
        <Link to={"/settings/managemembers"} className="link">
          <p>Manage Members</p>
          <IoIosArrowForward />
        </Link>
      </button>
      <button>
        <Link to={"/settings/securityanddata"} className="link">
          <p>Security and Data</p>
          <IoIosArrowForward />
        </Link>
      </button>
      <button>
        <Link to={"/settings/dangerzone"} className="link">
          <p>Danger Zone</p>
          <IoIosArrowForward />
        </Link>
      </button>
    </div>
  );
}

export default SettingsMobile;
