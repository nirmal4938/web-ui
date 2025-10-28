import styled, { keyframes, css } from "styled-components";

// ✨ Fade in + scale animation for modal
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

// 🌌 Overlay background
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  backdrop-filter: blur(2px);
`;

// 🗂 Modal Container
export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.CONTENT_SURFACE};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  max-width: 1200px;
  width: 90%;
  animation: ${fadeIn} 0.25s ease-in-out;
  display: flex;
  flex-direction: column;

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing(3)};
  }

  h2 {
    font-family: ${({ theme }) => theme.fontFamily};
    font-weight: 600;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.CTA_COLOR};
    margin: 0;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(3)};
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: ${({ theme }) => theme.spacing(3)};
  }
`;

// ❌ Close Button
export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.TEXT_MUTED};
  font-size: 1.2rem;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.CTA_ERROR};
    background-color: ${({ theme }) => theme.HOVER_BG};
  }

  &:active {
    transform: scale(0.95);
  }
`;
