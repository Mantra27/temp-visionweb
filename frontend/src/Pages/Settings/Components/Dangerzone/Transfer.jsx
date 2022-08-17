import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

function Transfer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
      <button onClick={onOpen}>Transfer Project</button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Transfer Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Enter the Email Address to transfer the project?
              <input
                type="email"
                className="transfer-email"
                placeholder="Enter Email Address"
              />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                className="cancel-button"
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button className="confirm-button" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default Transfer;
