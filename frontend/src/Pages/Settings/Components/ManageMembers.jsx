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
              <th className="role admin">Admin</th>
              <th className="role supervisor">Supervisor</th>
              <th className="role operator">Operator</th>
            </tr>
            <tr>
              <td className="permission">Edit Connection Setting</td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
            </tr>
            <tr>
              <td className="permission">Edit Device Setting</td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
            </tr>
            <tr>
              <td className="permission">Manipulate Devices</td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
            </tr>
            <tr>
              <td className="permission">View and Manipulate Devices</td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
            </tr>
            <tr>
              <td className="permission">Export and Prints</td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
            </tr>
            <tr className="last">
              <td className="permission">Danger Zone</td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
              </td>
              <td>
                  <label className="switch">
            <input type="checkbox"/>
              <span className="slider"></span>
          </label>
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
