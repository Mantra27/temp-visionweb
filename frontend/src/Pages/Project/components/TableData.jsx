import React from "react";

import table from "../../../assets/table.png";
import { MdContentCopy } from "react-icons/md";
import { FaFileExport } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import { BsPrinter } from "react-icons/bs";
import ReactTable from "react-table";  
import TABLE from "./table.jsx"

function TableData() {
  return (
    <>
      <div className="data-container">
        <div className="table-content">
          <h2 style={{ marginTop: "2vh" }}>Header</h2>
            <TABLE/>
          <h2>Footer</h2>
        </div>
      </div>

      {/* left tool panel */}

      <div className="tools">
        <div className="tools-grp">
          <MdContentCopy />
          <FaFileExport />
          <BiSearchAlt />
          <FaFilter />
          <BsPrinter />
        </div>
      </div>
    </>
  );
}

export default TableData;
