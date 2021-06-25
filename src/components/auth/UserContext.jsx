import React from "react";

const UserContext = React.createContext({
  email: "",
  username:"",
  auth: false,
  jwtToken: "",
});

export default UserContext;