"use client";
import React, { useState } from "react";
import CustomDragDrop from "./CustomDragDrop";
import {
  Image,
  Card,
  CardHeader,
  Button,
  CardFooter,
  CardBody,
} from "@nextui-org/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ExampleForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState("");

  const [removeFile, setRemoveFile] = useState(false);

  const generatePreview = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewURL(reader.result as string);
    };
  };

  const handleUpdateFile = (file: File) => {
    const isValid = file.type === "image/png" || file.type === "image/jpeg";
    if (!isValid) {
      alert("Please upload a valid image file");
      return;
    }
    generatePreview(file);
    setFile(file);
    setRemoveFile(false);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewURL("");
    setRemoveFile(true);
  };

  return (
    <Card className="wrapper className=mb-6 mb-6 rounded border border-slate-200 p-6 dark:border-slate-500">
      <CardHeader className="form-step-header">
        <h3>Faça upload de um novo arquivo</h3>
      </CardHeader>

      <CardBody className="form-body">
        {!file && (
          <CustomDragDrop
            updateFileUpload={handleUpdateFile}
            removeFile={removeFile}
          />
        )}

        <div className="uploaded-images-cont">
          {file && (
            <div className="uploaded-image img-cont">
              <Card className="wrapper">
                {previewURL && (
                  <>
                    <CardHeader className="absolute top-1 z-10 flex-col !items-start">
                      <p className="text-tiny font-bold uppercase text-white/60">
                        Nome do Arquivo
                      </p>
                      <h4 className="truncate text-large font-medium text-white">
                        {file.name}
                      </h4>
                    </CardHeader>
                    <Image
                      src={previewURL}
                      removeWrapper
                      className="z-0 h-full w-full object-cover"
                      alt={"preview image"}
                    />
                  </>
                )}
                {previewURL && (
                  <div className="uploaded-image-overlay">
                    <Button
                      onClick={handleRemoveFile}
                      type="button"
                      variant="flat"
                      className="cta w-icon"
                    >
                      <XMarkIcon color="white" className="icon" />
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="action-cont">
        <Button className="cta">Enviar</Button>
      </CardFooter>
    </Card>
  );
};

export default ExampleForm;
