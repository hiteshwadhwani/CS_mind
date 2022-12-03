import React, { useState } from "react";
import { Form, ProgressBar, Image as Imgcomp } from "react-bootstrap";
import Message from "./Message";
import { storage } from "../firebase/index";

const ImageUpload = ({ label, setFileHandler }) => {
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState("");
  const [uploadError, setUploadError] = useState(null);
  const [url,setUrl]=useState('');

  const handleChange = (e) => {
    setError("");
    const img = e.target.files[0];
    console.log(img);
    let err = "";
    if (!img.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      err = "image should be in jpg,jpeg,png format";
    }
    setError(err);
    setFile(e.target.files[0]);
  };
  const uploadFileHandler = async () => {
    setUploading(true);
    setUploadError("");
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
        console.error(error);
        setUploadError(error);
        setUploading(false);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            setImage(url);
      setFileHandler(url, label);
      setUploading(false);
            
          });
      }
    );
   /* const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload progress :" +
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
          setProgress(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setFileHandler(data, label);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploadError(error);
      setUploading(false);
    }
   */ 
  };
  return (
    <Form.Group>
      {uploadError && (
        <Message variant="danger">couldn't upload the image</Message>
      )}
      <Form.Label> {label}: </Form.Label>
      {uploading ? (
        <ProgressBar animated now={progress} />
      ) : (
        <>
          <input type="file" onChange={handleChange} />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}

      <button
        className="btn btn-primary"
        onClick={uploadFileHandler}
        disabled={uploading}
        style={{ marginBottom: "3px" }}
      >
        upload
      </button>
      <br />
      {image && <Imgcomp src={image} />}
    </Form.Group>
  );
};

export default ImageUpload;
