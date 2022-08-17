import React from "react";

import graph from "../../../assets/graph.png";
import { BsDownload } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { IoIosColorPalette } from "react-icons/io";
import scaleIcon from "../../../assets/scale-icon.png";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import Bar from './bar';

function GraphData() {
  return (
    <>
      <div className="data-container">
        <div className="graph-content">
          <h2 style={{ marginTop: "2vh" }}>Header</h2>
          <Bar/>
          <h2>Footer</h2>
        </div>
      </div>

      {/* left tool panel */}

      <div className="tools">
        <div className="tools-grp">
          <Menu placement={window.innerWidth < 700 ? "top" : "right"}>
            <MenuButton as={Button} className="tools-icon">
              <BsDownload />
            </MenuButton>
            <MenuList>
              <MenuItem>PDF</MenuItem>
                <MenuItem>PNG</MenuItem>
                <MenuItem>Print</MenuItem>
            </MenuList>
          </Menu>
          <FiEdit2 />
          <Menu placement="right">
            <MenuButton as={Button} className="tools-icon">
              <IoIosColorPalette />
            </MenuButton>
            <MenuList>
              <MenuItem>Manual</MenuItem>
              <MenuItem>Auto</MenuItem>
            </MenuList>
          </Menu>
          <img src={scaleIcon} alt="..." />
        </div>
      </div>
    </>
  );
}

export default GraphData;
