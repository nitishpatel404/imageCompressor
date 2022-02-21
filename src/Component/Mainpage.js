import React, { useState } from "react";
import Button from "./Button";
import upload from "../image/upload.png";
import download from "../image/download.png"
import "./mainpage.css";
import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";

const MainPage = () => {
  const [originalImage, setOriginalImage] = useState("");
  const [originalImageFile, setOriginalImageFile] = useState("");
  const [compressedImage, setCompressedImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [orignalImageSize, setOrignalImageSize] = useState(0);
  const [compressedImageSize, setCompressedImageSize] = useState(0);

  let output;

  // targeting file input from upload button-------------------------------------------------------------------------->>
  const uploadImageHandler = () => {
    document.getElementById("select-file").click();
  };

  // handler for uploading file ---------------------------------------------------------------------------------------->>
  const handle = (e) => {
    const imageFile = e.target.files[0];

    let uploadImgSize = Math.ceil(imageFile.size / 1024);
    setOrignalImageSize(uploadImgSize);
    setOriginalImage(imageFile);
    setOriginalImageFile(URL.createObjectURL(imageFile));
    setFileName(imageFile.name);
  };
  //handler for compressed image----------------------------------------------------------------->>
  const handleCompressImage = (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    //Check for very small size image---------------------------->>
    if (options.maxSizeMB >= originalImage / 1024) {
      alert("Image is too small, cant be compressed");
      return 0;
    }
    //function for compressing image----------------------------------------->>

    imageCompression(originalImage, options).then((x) => {
      output = x;
      let outImgSize = Math.ceil(output.size / 1024);

      setCompressedImageSize(outImgSize);
      const downloadLink = URL.createObjectURL(output); //Generating blob file--->
      setOriginalImageFile(false);
      setCompressedImage(downloadLink);
    });
  };

  // Download the imamge------------------------------------------------------------>>
  const downloadImage = () => {
    saveAs(compressedImage, "Compressed_" + fileName);
  };

  return (
    <div className="container">
      {/* Checking for Uploaded file------------------------------------------------------>> */}
      {originalImageFile ? (
        <>
          <div className="upload-container">
            
            <img className="uploaded" src={originalImageFile} alt="Uploaded" />
          </div>
          <Button
            name="Compress Image"
            onClick={(e) => {
              handleCompressImage(e);
            }}
          />
          <p>Your image size is {orignalImageSize}kb</p>
        </>
      ) : // Checking for compressed file--------------------------------------------------------------->>
      compressedImage ? (
        <div className="compressed_container">
          <div className="compressed_box">
            
            <Button name="Download" onClick={downloadImage}></Button>
            <p>Your compressed image size is {compressedImageSize}kb</p>
          </div>
          <div>
            <img className="compressed_show" alt="download" src={download}/>
          </div>
        </div>
      ) : (
        // Default home page---------------------------------------------------->>
        <>
          <img className="hero" src={upload} alt="images" />
          <Button name="Upload Image" onClick={uploadImageHandler}>
            Upload Image
          </Button>
          <p>
            Compress JPG, PNG or JPEG with the best quality and compression.
           </p>
        </>
      )}

      <input
        id="select-file"
        type="file"
        style={{ display: "none" }}
        accept="image/x-png,image/gif,image/jpeg"
        onChange={(e) => handle(e)}
      />
    </div>
  );
};

export default MainPage;
