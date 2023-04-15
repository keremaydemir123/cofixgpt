"use client";

import CloseIcon from "@/icons/CloseIcon";
import { useState } from "react";
import toast from "react-hot-toast";
import { readFileAsText } from "@/utils/readFiles";
import NewChatButton from "./Sidebar/NewChatButton";
import Image from "next/image";

//! Fix: Prevent duplicate files from being uploaded
//! Fix: Prevent more than 3 files from being uploaded
//! Fix: Prevent files with invalid types from being uploaded
//! Fix: Prevent files with same name from being uploaded

const MAX_FILES = 3;
const allowedTypes: string[] = ["css", "js", "html"];

const FileUploadField: React.FC = () => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [dragging, setDragging] = useState(false);

  const readFilesAndSet = async (files: File[]) => {
    for (const file of files) {
      try {
        const fileContent = await readFileAsText(file);
        const fileName = file.name;
        const split = fileName.split(".");
        const fileType = split[split.length - 1] as FileType;

        if (!allowedTypes.includes(fileType)) {
          toast.error("Only CSS, HTML, and JS files are allowed");
          continue;
        }

        if (!fileContent) {
          toast.error(`Failed to read file "${fileName}"`);
          continue;
        }

        setFiles((prev) => [
          ...prev,
          { name: fileName, content: fileContent, type: fileType },
        ]);
      } catch (err: any) {
        toast.error(`Failed to read file "${file.name}": ${err.message}`);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const newFiles = Array.from(e.dataTransfer.files).slice(0, MAX_FILES);
    validateFiles(newFiles);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const validateFiles = (newFiles: File[]) => {
    console.log("newFiles: ", newFiles);

    newFiles.forEach((newFile) => {
      const split = newFile.name.split(".");
      const fileType = split[split.length - 1] as FileType;
      if (!allowedTypes.includes(fileType)) {
        toast.error("Only CSS, HTML, and JS files are allowed");
        return;
      }

      if (files.some((file) => file.name === newFile.name)) {
        toast.error(`File with name "${newFile.name}" already exists`);
        return;
      }

      if (files.some((file) => file.type === fileType)) {
        toast.error(`File with type "${fileType}" already exists`);
        return;
      }

      if (files.length + newFiles.length > MAX_FILES) {
        toast.error("You can only upload 3 files");
        return;
      }

      readFilesAndSet([newFile]);
    });
  };

  const removeFile = (file: IFile) => {
    setFiles((prev) => prev.filter((f) => f.name !== file.name));
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed w-full rounded-lg h-64 p-4 mb-4 ${
        files.length === 3 ? "border-accent" : "border-primary"
      }`}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {files.length === 0 ? (
        <div className="text-base-content text-center text-lg">
          Drag and drop your files here or click to browse
        </div>
      ) : (
        <div className="flex gap-2 w-full">
          {files.map((file) => (
            <div
              key={file.name}
              className="bg-base-300 text-success-content rounded-md p-2 px-3 relative flex w-1/3"
            >
              <div className="flex-1 flex items-center gap-2 font-semibold text-base-content px-2">
                <Image
                  src={`${file.type}.svg`}
                  alt={file.type}
                  width={30}
                  height={30}
                />
                <div>{file.name}</div>
              </div>
              <CloseIcon
                onClick={() => removeFile(file)}
                className="absolute -top-1 -right-1 w-7 h-7 bg-secondary-content rounded-full text-error cursor-pointer hover:text-red-500"
              />
            </div>
          ))}
        </div>
      )}
      <input
        type="file"
        className="hidden"
        multiple
        onChange={(e) => {
          const newFiles = Array.from(e.target.files!);
          validateFiles(newFiles);
        }}
      />
      {files.length < MAX_FILES ? (
        <button
          className={`mt-4 btn btn-block ${
            files.length === 3 ? "btn-accent" : "btn-primary"
          }`}
          onClick={() => {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.multiple = true;
            fileInput.accept = allowedTypes.join(",");
            fileInput.addEventListener("change", (e) => {
              const newFiles = Array.from(
                (e.target as HTMLInputElement).files!
              );

              validateFiles(newFiles);
            });
            fileInput.click();
          }}
        >
          {files.length === 3 ? "Ready" : "Upload Files"}
        </button>
      ) : (
        <NewChatButton files={files} />
      )}
    </div>
  );
};

export default FileUploadField;
