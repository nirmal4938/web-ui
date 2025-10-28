// // components/CreateLabelDialog.tsx
// import { useEffect, useRef, useState, useCallback } from "react";
// import {
//   Overlay,
//   DialogBox,
//   Title,
//   LabelInput,
//   ButtonGroup,
//   Button,
// } from "./CreateLabelDialog.styled";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onCreate: (label: string) => void;
// }

// const CreateLabelDialog = ({ open, onClose, onCreate }: Props) => {
//   const [label, setLabel] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleCreate = useCallback(() => {
//     const trimmed = label.trim();
//     if (trimmed) {
//       onCreate(trimmed);
//       setLabel("");
//       onClose();
//     }
//   }, [label, onCreate, onClose]);

//   const handleKeyDown = useCallback((e: KeyboardEvent) => {
//     if (e.key === "Escape") onClose();
//     if (e.key === "Enter") handleCreate();
//   }, [handleCreate, onClose]);

//   useEffect(() => {
//     if (open) {
//       document.addEventListener("keydown", handleKeyDown);
//       inputRef.current?.focus();
//     }
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [open, handleKeyDown]);

//   return (
//     <Overlay open={open} role="dialog" aria-modal="true">
//       <DialogBox>
//         <Title>Create New Label</Title>
//         <LabelInput
//           ref={inputRef}
//           placeholder="Label name"
//           value={label}
//           onChange={(e) => setLabel(e.target.value)}
//         />
//         <ButtonGroup>
//           <Button variant="secondary" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleCreate}>
//             Create
//           </Button>
//         </ButtonGroup>
//       </DialogBox>
//     </Overlay>
//   );
// };

// export default CreateLabelDialog;
