"use client"

import { Card } from "@nextui-org/react";
import { ImageOffIcon, ImagePlusIcon } from "lucide-react";
import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";

const CustomDragDrop = ({
  updateFileUpload,
  removeFile,
}: {
  updateFileUpload: (file: File) => void;
  removeFile?: boolean;
}) => {
  // file input ref
  const FileInput = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLInputElement>;

  // drag state
  const [dragActive, setDragActive] = useState(false);

  // handle drag events
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragover" || e.type === "dragenter") {
      setDragActive(true);
    } else if (e.type === "dragleave" || e.type === "drop") {
      setDragActive(false);
    }
  };

  // handle drop event
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      updateFileUpload(e.dataTransfer.files[0]);
      setDragActive(false);
    }
  };

  // handle change event
  const handleChange = (
    e: FormEvent<HTMLInputElement> & { target: HTMLInputElement }
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files && e.target.files.length > 0) {
      updateFileUpload(e.target.files[0]);
    }
  };

  // remove file
  useEffect(() => {
    if (removeFile) {
      FileInput.current.value = "";
    }
  }, [removeFile]);

  return (
    <Card
      onDragEnter={() => handleDrag}
      className="custom-drag-drop rounded-lg border-2 border-dashed border-purple-600 bg-slate-50 dark:bg-gray-800 p-8 py-14 my-4"
    >
      <input
        ref={FileInput}
        type="file"
        name="file"
        id="file"
        onChange={handleChange}
        accept="image/jpeg, image/jpg, image/png"
      />
      <label className={`drag-drop-container ${dragActive ? "active" : ""}`}>
        <div className="drag-drop-content">
          <div className="img-cont">
            <ImagePlusIcon />
          </div>
          <div className="drag-drop-text">
            <p className="text-purple font-bold">
              Tap or drag and drop to upload Image
            </p>
            <span>PNG, JPEG</span>
          </div>
        </div>
      </label>
      {dragActive && (
        <div
          className="drag-file-overlay"
          onDragEnter={() => handleDrag}
          onDragLeave={() => handleDrag}
          onDragOver={() => handleDrag}
          onDrop={() => handleDrop}
        ></div>
      )}
    </Card>
  );
};

export default CustomDragDrop;