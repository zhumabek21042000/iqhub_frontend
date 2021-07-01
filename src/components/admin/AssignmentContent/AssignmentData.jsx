import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import UploadService from "./UploadFilesService";
import CourseService from "../../../services/spring-service";
import UploadFilesService from './UploadFilesService';


const AssignmentData = ({assignmentlist, loading}) => {
    
    const [assignments, setAssignments] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const api = "http://springbootiqhub-env.eba-sbutpkbr.us-east-2.elasticbeanstalk.com/api/file/";

    let history = useHistory();

    useEffect(() => {
        setLoading1(true);
       setAssignments(assignmentlist);
        setLoading1(false);
    },[assignmentlist]);

    async function deleteFile(id){
        setLoading1(true);
          UploadService.deleteFile(id).then((response)=>{
            setLoading1(false);
            alert("Файл был успешно удален!");
            window.location.reload();
          })
      }
    
  
    if(loading){
        return CourseService.loadingGif();
    }
    return(
        <>
        {!loading1 ?
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Название</th>
                        <th scope="col">Курс</th>
                        <th scope="col">Тип файла</th>
                        <th scope="col">Ссылка</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    assignments.length>0 ?
                    assignments.map((assignment) => {
                        console.log(assignment.course.name+"DSDSDS");
                        
                        return (
                            
                            <tr>
                                <th scope="row">{assignment.id}</th>
                                <td>{assignment.name}</td>
                                <td>{CourseService.getCourseName(assignment.course)}</td>
                                <td>{assignment.type}</td>
                                {/* <td>{assignment.url}</td> */}
                                {/* <td><a href={"http://localhost:5000/api/file/"+assignment.id} download="dasasd.docx">Скачать</a></td> */}
                                {/* <td><a onClick={()=>download(assignment.id, assignment.name, assignment.url)}>Скачать</a></td> */}
                                <td><a href={assignment.url}>Скачать</a></td>
                                <td><button className="btn btn-danger" onClick={e =>
        window.confirm("Вы уверены что хотите удалить этот файл?") &&
        deleteFile(assignment.id)
    } >Удалить</button></td>
                                
                                
                            </tr>
                        )
                    } )
                
                :<h1>Ничего не найдено :(</h1>}
                    </tbody>
                </table>
            </div>
            :
            CourseService.loadingGif()
                }
                </>
    )
}

export default AssignmentData;