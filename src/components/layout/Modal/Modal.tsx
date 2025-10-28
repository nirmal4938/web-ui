import React from "react";
import type { ReactNode } from "react";
import { Overlay, ModalContainer, CloseButton } from "./Modal.styles";
import { X } from "lucide-react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title = "" , children }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <div className="modal-header">
            <h2>{title}</h2>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </div>
        <div className="modal-content">{children}</div>
      </ModalContainer>
    </Overlay>

  );
};

export default Modal;