import React, { Component } from "react";
import { useHistory, Redirect, withRouter } from "react-router-dom";
import UploadService from "./UploadFilesService";

function PaisForm (){
  const history = useHistory();

   return history.push('/adminpanel/assignments');
}

export default class UploadFiles extends Component {
  
    constructor(props) {
      super(props);
      
      this.selectFile = this.selectFile.bind(this);
      this.upload = this.upload.bind(this);
      
      this.state = {
        selectedFile: undefined,
        redirectTo:"",
        currentFile: undefined,
        progress: 0,
        message: "",
        course_id:this.props.location.state.id,
        fileInfos: [],
      };
      // alert(this.props.location.state.id)
    }
    selectFile(event) {
      // alert(event.target.files[0].name)
      // alert(this.props.location.state.id)
        this.setState({
          selectedFile: event.target.files[0],
        });
    }
   
    upload() {
        let currentFile = this.state.selectedFile;
    
        this.setState({
          progress: 0,
          currentFile: currentFile,
        });
    
        UploadService.upload(this.state.course_id,currentFile, (event) => {
          this.setState({
            progress: Math.round((100 * event.loaded) / event.total),
          });
        })
          .then((response) => {
            this.setState({
              message: "Dobavleno",
              redirectTo:"/adminpanel/assignments"
            });
           
          })
          .then((files) => {
            this.setState({
              fileInfos: files.data,
            });
          })
          .catch(() => {
            this.setState({
              progress: 0,
              message: "s!",
              redirectTo:"/adminpanel/assignments",
              currentFile: undefined,
            });
          });
    
        this.setState({
          selectedFiles: undefined,
        });
    }
    componentDidMount() {
        UploadService.getFiles().then((response) => {
          this.setState({
            fileInfos: response.data,
          });
        });
      }
      render() {
        const {
          selectedFile: selectedFiles,
          currentFile,
          progress,
          message,
          fileInfos,
        } = this.state;
    
        return (
          <>
          {!this.state.redirectTo.length > 0 ?
          <div className="container mt-4">
            {currentFile && (
              <div className="progress">
                <div
                  className="progress-bar progress-bar-info progress-bar-striped"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: progress + "%" }}
                >
                  {progress}%
                </div>
              </div>
            )}
    
            <label className="btn btn-default">
              <input type="file" onChange={this.selectFile} />
            </label>
    
            <button className="btn btn-success"
              disabled={!selectedFiles}
              onClick={this.upload}
            >
              Загрузить
            </button>
    
            <div className="alert alert-light" role="alert">
              {message}
            </div>
          </div>
        :
        <Redirect to={this.state.redirectTo}></Redirect>}
          </>
        );
      }
  }
  