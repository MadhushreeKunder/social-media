import { useDropzone } from "react-dropzone";
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from "../utils";
import { MdImage } from "react-icons/md";
import { Modal } from "./Modal";
import { useState } from "react";

export const UploadImage = ({ setToken, setMedia, text }) => {
  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    const file = acceptedFiles[0];
    formData.append("file", file);
    console.log(file);
    formData.append("upload_preset", CLOUDINARY_PRESET);
    const response = await fetch(`${CLOUDINARY_URL}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const res = await response.json();
    setToken(res.delete_token);
    setMedia({ fileName: res.original_filename, url: res.url });
    setIsOpen(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/gif, image/jpg",
    maxSize: 1e7,
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MdImage
        onClick={() => setIsOpen(true)}
        className="text-2xl text-mediumGray focus:border-rose-300 focus:ring-1 mr-4 cursor-pointer"
      />
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div>
            {isDragActive ? (
              <p>Drag file here...</p>
            ) : (
              <p>Drag & Drop your file here, or click to select file</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
