import axios from "axios";

export default axios.create({
  // baseURL: "http://springbootiqhub-env.eba-sbutpkbr.us-east-2.elasticbeanstalk.com/api",
  baseURL:"baseURL:'http://localhost:5000/api",
  headers: {
    "Content-type": "application/json"
  }
});
