import styled from "styled-components";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  fallback?: string;
}

const AvatarWrapper = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.CONTENT_BORDER};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 40, fallback }) => (
  <AvatarWrapper size={size}>
    {src ? <img src={src} alt={alt} /> : fallback?.[0] || "?"}
  </AvatarWrapper>
);

export default Avatar;
