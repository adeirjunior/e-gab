"use client"

import { SearchResult } from "@/lib/types/types";
import { Card, useDisclosure } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import FilesModal from "./files-modal";

export default function ModalUploader({ resources }: { resources: SearchResult[]}) {
  const [file, setFile] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Card onPress={onOpen}>
        <CldImage alt="" width={100} height={100} src={file} />
      </Card>
      <FilesModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setFile={setFile}
        resources={resources}
      />
    </>
  );
    
  
}