import React, { useState, useEffect } from "react";
import axios from "axios";

const FileList = ({ itemId }) => {
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/fms/api/v0/item/${itemId}`
        );
        //console.log(response.data);
        setItemDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch item details:", error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  if (!itemDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Files for Item: {itemDetails.data.itemNum}</h2>
      <ul>
        {itemDetails.data.files.map((file, index) => (
          <li key={index}>
            <a
              href={`http://localhost:5050${file.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.fileName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FileUpload = ({ itemId }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(
        `http://localhost:5050/fms/api/v0/item/6765a22849b0f297a4c58593/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted); // Update progress state
          },
        }
      );
      console.log("Upload successful:", response.data);
      setUploadProgress(0); // Reset progress bar after successful upload
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      setUploadProgress(0); // Reset progress bar in case of error
    }
  };

  return (
    <>
      <div>
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>

        {/* Display Progress */}
        {uploadProgress > 0 && (
          <div style={{ marginTop: "10px" }}>
            <div
              style={{
                width: `${uploadProgress}%`,
                height: "10px",
                backgroundColor: "blue",
                transition: "width 0.3s",
              }}
            ></div>
            <p>{uploadProgress}%</p>
          </div>
        )}
      </div>
      <div>
        <FileList itemId={`6765a22849b0f297a4c58593`} />
      </div>
    </>
  );
};

export default FileUpload;
