import { RadioGroup, Radio } from "@chakra-ui/react";
import React, { useState } from "react";

function Connection() {
  const [value, setValue] = useState('none')
  return (
    <div id="connection">
      <h1>Connection Method</h1>
      <form>
        <RadioGroup value={value}>
          <div className="inputgrp">
            <label htmlFor="MQQT">MQQT</label>
            <Radio name="MQQT" value="mqqt" onClick={() => {
              if(value === 'mqqt') {
                setValue('none');
              } else {
                setValue('mqqt');
              }
            }}/>
          </div>
          <div className="inputgrp">
            <label htmlFor="jsondatacollection">Json Data Collection</label>
            <Radio name="jsondatacollection" value="jsondc" onClick={() => {
              if(value === 'jsondc') {
                setValue('none');
              } else {
                setValue('jsondc');
              }
            }}/>
          </div>
          <div className="inputgrp">
            <label htmlFor="opc">OPC Server</label>
            <Radio name="opc" value="opc" onClick={() => {
              if(value === 'opc') {
                setValue('none');
              } else {
                setValue('opc');
              }
            }}/>
          </div>
          <div className="inputgrp">
            <label htmlFor="visionc">Vision C</label>
            <Radio name="visionc" value="visionc" onClick={() => {
              if(value === 'visionc') {
                setValue('none');
              } else {
                setValue('visionc');
              }
            }}/>
          </div>
          <div className="inputgrp last">
            <label htmlFor="customprotocol">Custom Protocol</label>
            <Radio name="customprotocol" value="custom" onClick={() => {
              if(value === 'custom') {
                setValue('none');
              } else {
                setValue('custom');
              }
            }}/>
          </div>
        </RadioGroup>
      </form>
      <h1>Device Configuration</h1>
      <div className="device-config">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
        esse dolorum magnam sit deserunt et. Omnis, dicta corrupti, aut
        doloribus unde voluptatum officiis esse consequuntur animi natus optio
        magni repudiandae?
      </div>
    </div>
  );
}

export default Connection;
