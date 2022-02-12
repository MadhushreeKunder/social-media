import { useDropzone } from "react-dropzone";
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from "../utils";

export const UploadImage = ({ setToken, setMedia }) => {
  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    const file = acceptedFiles[0];
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);
    const response = await fetch(`${CLOUDINARY_URL}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const res = await response.json();
    setToken(res.delete_token);
    setMedia({ fileName: res.original_filename, url: res.url });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/gif, image/jpg",
    maxSize: 1e7,
  });

  return (
      <>
      </>
  )
};
