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

function Suspend() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
      <button onClick={onOpen}>Suspend Project</button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Suspend Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to suspend the project?
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
                Suspend
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default Suspend;
