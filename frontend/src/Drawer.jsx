import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useToast
} from "@chakra-ui/react";
import { BsBellFill, BsFillQuestionCircleFill } from "react-icons/bs";
import { FiArrowLeftCircle } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineLogout, HiDatabase, HiOutlineSupport } from "react-icons/hi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import axios from "axios"; 
import {useState, useEffect} from "react";

function DrawerMenu(props) {
  const toast = useToast();
  const [name, setName] = useState("Hello User");
  const [profile, setProfile] = useState("profile.jpg");

      if(!localStorage.getItem("username") || !localStorage.getItem("avatarURL")){

        axios.post("http://localhost:8080/api/get-user-info", {token: localStorage.getItem("token"), requestedFor:"username"}).then(async (results)=>{
          if(results.data.status == 200){
            console.log(results.data);
            setName(results.data.data.username);
            setProfile(results.data.data.avatar);
            localStorage.setItem("avatarURL", results.data.data.avatar);
            localStorage.setItem("username", results.data.data.username);
          }
        }).catch((error)=>{
          console.log(error)
        })
      }
      else{
        setTimeout(()=>{
          setName(localStorage.getItem("username"));
          setProfile(localStorage.getItem("avatarURL"));
        }, 500)
      }


  const navigate = useNavigate();

  return (
    <Drawer placement={"left"} onClose={props.onClose} isOpen={props.isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader className="drawer-header" borderBottomWidth="1px">
          <div className="top-bar">
            <FiArrowLeftCircle
              className="drawer-back-icon"
              onClick={props.onClose}
            />
            <BsBellFill
              className="drawer-icon"
              onClick={(e) => {
                e.preventDefault();
                navigate("/notifications");
                props.onClose();
              }}
            />
            <AiOutlineSetting
              className="drawer-icon"
              onClick={(e) => {
                e.preventDefault();
                navigate("/settings");
                props.onClose();
              }}
            />
            <HiOutlineLogout
              className="drawer-icon"
              onClick={async (e) => {
                // e.preventDefault();
                if(window.confirm("Are you sure you want to logout? (unsaved data might be lost)")){

                  localStorage.clear("token");
                  localStorage.clear("username");
                  localStorage.clear("avatarURL");
                  localStorage.clear("projects");
                  
                  //axios.get("http://localhost:8080/auth/logout");
                  navigate("/auth/login");
                }
              }}
            />
          </div>
          <div className="hello-user">
            <img src={"https://avatars.dicebear.com/api/bottts/d7cd5d40-d318-4bc4.svg"} alt="..." />
            {name}
          </div>
        </DrawerHeader>
        <DrawerBody className="drawer-body">
          <div className="drawer-nav-item"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              props.onClose();
            }}>
            <div className="drawer-nav-item-icon">
              <HiDatabase />
            </div>
            <div className="drawer-nav-item-text">Data</div>
          </div>
          <div className="drawer-nav-item">
            <div className="drawer-nav-item-icon">
              <SiDatabricks />
            </div>
            <div className="drawer-nav-item-text">Logs</div>
          </div>
          <div
            className="drawer-nav-item"
            onClick={(e) => {
              e.preventDefault();
              navigate("/billing");
              props.onClose();
            }}
          >
            <div className="drawer-nav-item-icon">
              <FaRegMoneyBillAlt />
            </div>
            <div className="drawer-nav-item-text">Billing</div>
          </div>
          <div className="drawer-nav-item">
            <div className="drawer-nav-item-icon">
              <BsFillQuestionCircleFill />
            </div>
            <div className="drawer-nav-item-text">FAQ</div>
          </div>
          <div
            className="drawer-nav-item"
            onClick={(e) => {
              e.preventDefault();
              navigate("/feedback");
              props.onClose();
            }}
          >
            <div className="drawer-nav-item-icon">
              <HiOutlineSupport />
            </div>
            <div className="drawer-nav-item-text">Feedback & Support</div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerMenu;
