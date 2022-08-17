import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import {
  Accordion,
  Button,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

function ManageMembers({ setPage }) {
  React.useEffect(() => {
    return () => {
      setPage("Manage Members");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div className="manage-members">
      <h1>Member Roles</h1>
      <button>
        <Link to={"/settings/admin"} className="link">
          <p>Admin</p>
          <IoIosArrowForward />
        </Link>
      </button>
      <button>
        <Link to={"/settings/supervisor"} className="link">
          <p>Supervisor</p>
          <IoIosArrowForward />
        </Link>
      </button>
      <button>
        <Link to={"/settings/operator"} className="link">
          <p>Operator</p>
          <IoIosArrowForward />
        </Link>
      </button>
      <div className="section accordion">
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <p>Invite Members</p>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <p className="p">
                Enter below the Email Address of the member you want to invite:
              </p>
              <div className="invite-member-mobile">
                <input type="email" placeholder="Enter Email address" />
                <button>Invite</button>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <div className=" accordion-mobile">
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <p>Create Custom Role</p>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <p className="p">
                Enter the name of the role you want to create:
              </p>
              <div className="invite-member-mobile">
                <input type="text" placeholder="Role name" />
                <button>Create Role</button>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <input
        className="discard-changes"
        type="button"
        value="Discard Changes"
      />
      <input className="save-changes" type="submit" value="Save Changes" />
    </div>
  );
}

export default ManageMembers;
