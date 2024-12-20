import React, { useState, useEffect } from "react";
import axios from "axios";

const FileList = ({ itemId }) => {
  const [itemDetails, setItemDetails] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/fms/api/v0/item/${itemId}`
        );
        setItemDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch item details:", error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handlePreviewV1 = async (fileUrl) => {
    try {
      const response = await axios.get(`http://localhost:5050${fileUrl}`, {
        responseType: "blob",
      });
      const fileType = response.headers["content-type"];
      const blob = new Blob([response.data], { type: fileType });
      const url = URL.createObjectURL(blob);

      setPreviewFile({ url, type: fileType });
    } catch (error) {
      console.error("Failed to fetch file preview:", error);
    }
  };

  const handlePreview = async (fileUrl, fileName) => {
    try {
      const response = await axios.get(`http://localhost:5050${fileUrl}`, {
        responseType: "blob", // Fetch the file as binary data
      });

      const fileType = response.headers["content-type"];
      const blob = new Blob([response.data], { type: fileType });
      const url = URL.createObjectURL(blob);

      if (fileType.includes("image") || fileType.includes("pdf")) {
        setPreviewFile({ url, type: fileType });
      } else {
        // If preview is not available, fallback to download
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName; // Download with the original file name
        link.click();
        URL.revokeObjectURL(url); // Cleanup the URL
      }
    } catch (error) {
      console.error(
        "Failed to fetch file preview, downloading instead:",
        error
      );

      // Fallback to download on error
      const link = document.createElement("a");
      link.href = `http://localhost:5050${fileUrl}`;
      link.download = fileName; // Ensure the file is downloaded with the correct name
      link.click();
    }
  };

  if (!itemDetails) {
    return <p>Loading...</p>;
  }

  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/fms/api/v0/item/${itemId}`
      );
      setItemDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch item details:", error);
    }
  };

  const refreshFileList = () => {
    fetchItemDetails(); // Re-fetch the files from the server
  };

  return (
    <div>
      <h2>Files for Item: {itemDetails.data.itemNum}</h2>
      <button className="m-4" onClick={refreshFileList}>
        Refresh Files
      </button>

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
            <button
              className="text-blue-500 m-2"
              onClick={() => handlePreview(file.fileUrl, file.fileName)}
              style={{ marginRight: "10px" }}
            >
              Preview
            </button>
            <a
              href={`http://localhost:5050${file.fileUrl}`}
              download={file.fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="m-2 text-green-600"
            >
              Download
            </a>
          </li>
        ))}
      </ul>

      {previewFile && (
        <div>
          <h3>File Preview</h3>
          {previewFile.type.includes("image") ? (
            <img
              src={previewFile.url}
              alt="Preview"
              style={{ width: "100%", maxHeight: "500px" }}
            />
          ) : previewFile.type.includes("pdf") ? (
            <iframe
              src={previewFile.url}
              style={{ width: "100%", height: "500px" }}
              title="PDF Preview"
            />
          ) : (
            <p>Preview not available for this file type.</p>
          )}
          <button onClick={() => setPreviewFile(null)}>Close Preview</button>
        </div>
      )}
    </div>
  );
};

const FileUpload = ({ itemIdParam }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const itemId = "6765a22849b0f297a4c58593";

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(
        `http://localhost:5050/fms/api/v0/item/${itemId}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      console.log("Upload successful:", response.data);
      setUploadProgress(0);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      setUploadProgress(0);
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
        <FileList itemId={itemId} />
      </div>
    </>
  );
};

export default FileUpload;
