import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { userService } from "../services/user.service";
import { ReadBy } from "../types/Message";

export const  ReadByModal = 
({isOpen, onOpen, onClose, users}: {isOpen: boolean, onClose: () => void, onOpen: () => void, users?: ReadBy[] }) => {

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Message Seen By</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {users?.map((user) => user?.username)}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }