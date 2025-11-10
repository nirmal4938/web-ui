import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Edit2, Trash2, Users, BarChart2 } from "lucide-react";

interface ActionsMenuProps {
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onAssign?: () => void;
  onViewStats?: () => void;
  position?: { top: number; left: number };
}

const MenuWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background: ${({ theme }) => theme.CONTENT_SURFACE || "#fff"};
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER || "#e5e7eb"};
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 0.25rem 0;
  min-width: 180px;
  z-index: 100;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.6rem 1rem;
  border: none;
  background: transparent;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.TEXT_PRIMARY || "#111827"};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.CONTENT_BG || "#f3f4f6"};
  }

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.TEXT_MUTED || "#6b7280"};
  }
`;

const ActionsMenu: React.FC<ActionsMenuProps> = ({
  onClose,
  onEdit,
  onDelete,
  onAssign,
  onViewStats,
  position = { top: 0, left: 0 },
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <MenuWrapper ref={ref} top={position.top} left={position.left}>
      <MenuItem onClick={onEdit}>
        <Edit2 /> Edit Player
      </MenuItem>
      <MenuItem onClick={onAssign}>
        <Users /> Assign to Team
      </MenuItem>
      <MenuItem onClick={onViewStats}>
        <BarChart2 /> View Stats
      </MenuItem>
      <MenuItem onClick={onDelete} style={{ color: "#dc2626" }}>
        <Trash2 /> Delete
      </MenuItem>
    </MenuWrapper>
  );
};

export default ActionsMenu;
