import http from "./http-common";
import React from 'react';

class UploadFilesService extends React.Component  {
    constructor(props) {
        super(props);
     
      }
  upload(id,file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/upload/"+id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files");
  }
  getFilesOfCourse(id){
    return http.get("/files/"+id);
  }
  getFile(id){
    return http.get("/file/"+id);
  }
  deleteFile(id){
    return http.delete("/file/"+id);
  }
}

export default new UploadFilesService();
