import React from "react";
import {
  Switch,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

function ManageMembers() {
  return (
    <div id="managemembers">
      <div className="section">
        <h1>Manage Members</h1>
        <table>
          <tbody>
            <tr>
              <th className="rp">Role Permissions</th>
              <th className="role">Admin</th>
              <th className="role">Supervisor</th>
              <th className="role">Operator</th>
            </tr>
            <tr>
              <td className="permission">Edit Connection Setting</td>
              <td>
                <Switch />
              </td>
              <td>
                <Switch />
              </td>
              <td>
                <Switch />
              </td>
            </tr>
            <tr>
              <td className="permission">Edit Device Setting</td>
              <td>
                <Switch />
              </td>
              <td>
                <Switch />
              </td>
              <td>
                <Switch />
              </td>
            </tr>
            <tr>
              <td className="permission">Manipulate Devices</td>
              <td>
                <Switch />
              </td>
              <td>
                <Switch />
              </td>
              <td>
                <Switch />
              </td>
            </tr>
            <tr>
              <td className="permission">View and Manipulate Devices</td>
              <td>
                <Switch />
              </td>
              <td>
                <Switch />
              </td>
              <td>
                <Switch />
              </td>
            </tr>
            <tr>
              <td className="permission">Export and Prints</td>
              <td>
                <Switch />
              </td>
              <td>
                <Switch />
              </td>
              <td>
                <Switch />
              </td>
            </tr>
            <tr className="last">
              <td className="permission">Danger Zone</td>
              <td>
                <Switch />
              </td>
              <td>
                <Switch />
              </td>
              <td>
                <Switch />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
              <div className="invite-member">
                <input type="email" placeholder="Enter Email address" />
                <button>Invite</button>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="section accordion">
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
              <div className="invite-member">
                <input type="text" placeholder="Role name" />
                <button>Create Role</button>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default ManageMembers;
