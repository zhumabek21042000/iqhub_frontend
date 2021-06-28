import axios from "axios";

export default axios.create({
  // baseURL: "http://springbootiqhub-env.eba-sbutpkbr.us-east-2.elasticbeanstalk.com/api",
  baseURL:"https://iqhub-springboot.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
