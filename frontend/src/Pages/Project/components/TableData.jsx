import React from "react";

import table from "../../../assets/table.png";
import { MdContentCopy } from "react-icons/md";
import { FaFileExport } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import { BsPrinter } from "react-icons/bs";
import ReactTable from "react-table";  
import GR from "./gr";
import {ReactHTMLElement, useState, useEffect} from "react";

function TableData() {

  return (
    <>
      <div className="data-container">
        <div className="table-content">
          <h2 style={{ marginTop: "2vh" }}>{localStorage.getItem("parchuranheader")}</h2>
            <GR/>
          <h2>{localStorage.getItem("parchuranfooter")}</h2>
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
