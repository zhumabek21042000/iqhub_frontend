import axios from 'axios';
import moment from 'moment';

const instance = axios.create({
    baseURL: 'http://springbootiqhub-env.eba-sbutpkbr.us-east-2.elasticbeanstalk.com/api'
    // baseURL:'http://localhost:5000/api'
  });

const instSec = axios.create({
    baseURL: 'http://springbootiqhub-env.eba-sbutpkbr.us-east-2.elasticbeanstalk.com'
    // baseURL:'http://localhost:5000'
});

class CourseService {
     getAllCourses(){
        //  axios.get(urlApi+"/course").then(res=>{
        //     return res.data;
        //  })
        return instance.get('/course');
    }
    getAllVideos(){
        return instance.get('/videos');
    }
     addNewCourse(course){
         console.log(course);
        return instance.post('/course', course);
    }
    editCourse(course){
         return instance.put('/course', course)
    }
    deleteCourse(id){
        return instance.delete("/courses/"+id);
    }
    getCourseById(id){
        return instance.get('/courses/'+id)
    }
    addNewVideo(id,video){
        return instance.post('/video/'+id, video)
    }
    editVideo(video){
        // const form = new FormData();
        // form.append("id", video.id);
        // form.append("description", video.description);
        // form.append("course", video.course);
        return instance.put('/video', video);
    }
    deleteVideo(id){
        return instance.delete('/videos/'+id);
    }

    getVideoById(id){
         return instance.get('/video/'+id);
    }
    getVideosOfCourse(id){
        return instance.get('/videos/'+id);
    }
    register(user){
        return  instSec.post('/signup', user);
    }

    login(user) {
         return instSec.post('/auth', user).then(response => {
             if(response.data.jwtToken){
                 localStorage.setItem("token", response.data.jwtToken);
                //  alert(localStorage.getItem("token"))
             }

             return response.data;
         });
    }

    getCurrentUser(){
        return instSec.get( "/getUser/" + localStorage.getItem("token"));
    }
    getAllFiles(){
        return instance.get("/files");   
    }
    getAllUsers(){
        return instSec.get("/getUsers/"+localStorage.getItem("token"));
    }

    getUserById(id){
        return instSec.get("/getUserById/"+id);
    }

    getAllRoles(){
        return instSec.get("/roles");
    }
    getRolesNotInUser(id){
        return instSec.get("/getRestRoles/"+id+"/"+localStorage.getItem("token"));
    }

    assignrole(user_id, role_name){
        const form = new FormData();
        form.append("user_id", user_id);
        form.append("role_name", role_name);
        return instSec.post("/assignrole", form);
    }

    reassignrole(user_id, role_name){
        const form = new FormData();
        form.append("user_id", user_id);
        form.append("role_name", role_name);
        
        return instSec.post("/reassignrole",form);
    }

    logout(){
        localStorage.removeItem("token");
    }
    getCourseName(course){
        const name = course.name;
        return name;
    }
    getToken(){
        return JSON.parse(localStorage.getItem("token"));
    }
    enrollCourse(c_id, user_id){
        return instance.post('/enroll/'+c_id+'/'+user_id)
    }
    unenrollCourse(c_id, user_id){
        return instance.post(`/unenroll/${c_id}/${user_id}`)
    }
    changeName(user){
        return instance.put("/changeName", {
            id: user.id,
            email: user.email,
            usersname: user.usersname
        });
    }

    changeEmail(new_email){
        const form = new FormData();
        form.append("new_email", new_email);
        return instSec.post("/changeEmail/"+localStorage.getItem("token"), form)
    }

    changePassword(user, pass){
        return instance.put("/changePass", {
            email: user.email,
            password: user.password,
            newPassword: pass
        });
    }
    timeConverter(api_date){
        const time = new Date(api_date).getTime();
        const date = moment(time).format("DD-MM-YYYY HH:mm:ss");
        return date;
      }
    loadingGif(){
        const gif = <div class="text-center mt-5">
        <div class="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
          <span class="sr-only"></span>
        </div>
        </div>
        return gif;
    }
   

}
export default new CourseService();