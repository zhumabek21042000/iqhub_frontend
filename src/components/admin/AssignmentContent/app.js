import React from "react";

import UploadFiles from "./UploadFiles";

function Apps() {
  return (
    <div className="container" style={{ width: "600px" }}>
      <div style={{ margin: "20px" }}>
        <h3>aaa.com</h3>
        <h4>React upload Files</h4>
      </div>

      <UploadFiles />
    </div>
  );
}

export default Apps;
