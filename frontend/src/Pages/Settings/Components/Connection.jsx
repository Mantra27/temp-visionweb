import { RadioGroup, Radio } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Connection() {
  const [value, setValue] = useState('none')
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const ProjectID = searchParams.get("project");
  
  if(ProjectID == "nullish"){
    setTimeout(()=>{
      navigate("/");
    }, 200)
  }
  return (
    <div id="connection">
      <h1>Connection Method</h1>
      <form>
      <RadioGroup value={value}>
          <div className="inputgrp">
            <label htmlFor="MQQT">MQQT</label>
            <Radio name="MQQT" value="mqqt" onClick={() => {
              if (value === 'mqqt') {
                setValue('none');
              } else {
                setValue('mqqt');
              }
            }} />
          </div>
          <div className="inputgrp">
            <label htmlFor="jsondatacollection">Json Data Collection</label>
            <Radio name="jsondatacollection" value="jsondc" onClick={() => {
              if (value === 'jsondc') {
                setValue('none');
              } else {
                setValue('jsondc');
              }
            }} />
          </div>
          <div className="inputgrp">
            <label htmlFor="opc">OPC Server</label>
            <Radio name="opc" value="opc" onClick={() => {
              if (value === 'opc') {
                setValue('none');
              } else {
                setValue('opc');
              }
            }} />
          </div>
          <div className="inputgrp">
            <label htmlFor="visionc">Vision C</label>
            <Radio name="visionc" value="visionc" onClick={() => {
              if (value === 'visionc') {
                setValue('none');
              } else {
                setValue('visionc');
              }
            }} />
          </div>
          <div className="inputgrp last">
            <label htmlFor="customprotocol">Custom Protocol</label>
            <Radio name="customprotocol" value="custom" onClick={() => {
              if (value === 'custom') {
                setValue('none');
              } else {
                setValue('custom');
              }
            }} />
          </div>
        </RadioGroup>
      </form>
      <h1>Device Configuration</h1>
      <div className="device-config">
        Project Id: {ProjectID}
      <Button onClick={() =>  navigator.clipboard.writeText(ProjectID)}
      variant="danger">copy</Button>{' '}
      </div>
    </div>
  );
}

export default Connection;
