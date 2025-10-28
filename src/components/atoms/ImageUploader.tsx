import React, { useState } from "react";
import styled from "styled-components";
import { X } from "lucide-react";

interface UploadWrapperProps {
  direction?: "row" | "column";
  inputFlex?: number;
  previewFlex?: number;
}

const UploadWrapper = styled.div<UploadWrapperProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction || "column"};
  align-items: ${({ direction }) => (direction === "row" ? "center" : "flex-start")};
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  display: block;
`;

const DropArea = styled.div<{ isDragOver?: boolean }>`
  width: 100%;
  padding: 12px;
  border: 2px dashed ${({ isDragOver }) => (isDragOver ? "#0070f3" : "#ccc")};
  border-radius: 8px;
  background-color: #fafafa;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
  &:hover {
    border-color: #0070f3;
    background-color: #f0f8ff;
  }
`;

const PreviewContainer = styled.div<{ flex?: number }>`
  flex: ${({ flex }) => flex || "0 0 auto"};
  position: relative;
  display: inline-block;
`;

const PreviewImage = styled.img`
  height: 60px;
  width: 100%;
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid #ddd;
  object-fit: contain;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ff4d4f;
  border: none;
  border-radius: 50%;
  color: white;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

interface ImageUploaderProps {
  label?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  direction?: "row" | "column";
  inputFlex?: number; // e.g., 8
  previewFlex?: number; // e.g., 2
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label = "Upload Image",
  value,
  onChange,
  accept = "image/png,image/jpeg",
  direction = "row",
  inputFlex = 8,
  previewFlex = 2,
}) => {
  const [preview, setPreview] = useState<string | null>(value ? URL.createObjectURL(value) : null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (file: File | null) => {
    onChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  return (
    <UploadWrapper direction={direction} inputFlex={inputFlex} previewFlex={previewFlex}>
      <DropArea
        isDragOver={isDragOver}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
        style={{ flex: inputFlex }}
      >
        {preview ? "Click to change or drag & drop" : "Drag & drop image here, or click to select"}
        <input
          id="file-input"
          type="file"
          accept={accept}
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />
      </DropArea>

      {preview && (
        <PreviewContainer flex={previewFlex}>
          <PreviewImage src={preview} alt="Preview" />
          <RemoveButton onClick={() => handleFileChange(null)}>
            <X size={12} />
          </RemoveButton>
        </PreviewContainer>
      )}
    </UploadWrapper>
  );
};

export default ImageUploader;
