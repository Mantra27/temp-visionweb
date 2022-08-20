import React from "react";
import { Box, Center, Image, Text } from "@chakra-ui/react";
import "./login.css";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import dicot_img from "../../assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import axios from "axios";
import {gapi} from "gapi-script";

function Login() {
  const clientId = "https://console.cloud.google.com/apis/credentials/oauthclient/1014276340059-orscm84ijkimm5vp5qkemp1kmjl4cvpe.apps.googleusercontent.com?project=crafty-booth-339503";
  const navigate = useNavigate();
  React.useLayoutEffect(() => {
    document.title = "Login";
    if (localStorage.getItem("token")) {
      //condition if already logged in
      navigate("/");
    } // eslint-disable-next-line
  }, []);
  const toast = useToast();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //can show the occurred error to the user
  const [error, setError] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  //   const googlesignincheck = async (e) => {

  //     const url = "http://localhost:8080/api/test";
  //     const Data = await
  //     axios.post(url, {null:null});
  //     console.log(Data.data)
  //     if(Data.data.statusCode == 'ok'){navigate("/");}
  //   };

  // googlesignincheck();
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope:""
      })
    }
    gapi.load('client:auth2', start);
  });

  const handleSubmit = async (e) => {

    //temperory beta version 
    // toast({
    //   title: "Howdy User 👤",
    //   description: `Things are still under development, But don't worry, we're coming very very soon. So buckle-up your seatbelts 😉🚀`,
    //   status: "warning",
    //   position: "top-right",
    //   duration: 10000,
    //   isClosable: true,
    // });

    e.preventDefault();
    try {
      const url = "http://localhost:8080/auth/login";
      const Data = await axios.post(url, data);
      if(!Data.data.token){
        toast({
          title: "Incorrect details",
          description: "Incorrect email or password",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
      
      else{
          localStorage.setItem("token", Data.data.token)
          toast({
            title: "Logged in!",
            description: "user logged in succesfully",
            status: "success",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
      }
      navigate("/");

    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  
  return (
    <Box h="100vh" w="100vw" id="login" bgColor="#F1FAEE">
      <Box position="absolute" top="5%" className="background">
        <div className="lightblue"></div>
        <div className="darkblue"></div>
      </Box>
      <Box className="loginform">
        <Box
          position="absolute"
          bottom={["9%", "9%", "13%"]}
          left={["5%", "5%", "7%"]}
          h={["85%", "85%", "79%"]}
          w={["90%", "90%", "85%"]}
          borderRadius="6vh"
        >
          <Box
            position="absolute"
            w={["80%", "60%", "50%"]}
            h={["20%", "20%", "30%"]}
            left={["20%", "30%", "6%"]}
            top={["0%", "0%", "12%"]}
            fontSize={["5.2vw", "4.5vw", "2.5vw"]}
            fontFamily="Roboto"
            fontWeight="500"
          >
            <Center ml={["5%"]} w={["70%"]}>
              <Image w={["100%"]} src={dicot_img} />
            </Center>
            <Center
              position="absolute"
              right={["1%", "10%", "2%"]}
              w={["100%", "100%", "96%"]}
            >
              <Box w={["100%"]}>Clean. Simple. Powerful.</Box>
            </Center>
          </Box>
        </Box>
        <Box className="form">
          <Box
            className="formControl"
            h={["65%","60%","68%"]}
            w={["80%","80%","40%"]}
            top={["25%","30%","15%"]}
            position={["absolute","absolute","absolute"]}
            right={["10%", "10%", "15%"]}
            bgColor="#F1FAEE"
          >
            <form>
              <Text fontSize="1.5em" fontWeight="600">Vision Web Log In</Text>
              <GoogleLogin/>
              {/* <div className="google-oauth">
                <a href="http://localhost:8080/auth/google">
                  <img
                    alt="Google sign-in"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  />
                  <p>Login with Google</p>
                </a>
              </div> */}
              <p>OR</p>
              <input
                type="text"
                name="email"
                value={data.email}
                placeholder="email..."
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                value={data.password}
                placeholder="Password..."
                onChange={handleChange}
              />
              <input
                type="button"
                onClick={handleSubmit}
                value="Login"
                id="loginbtn"
              />
              <button className="btn" onClick={(e) => navigate("/auth/fp")}>
                Forgot Password
              </button>
              
              <p>To create new account</p>
              <Link to="/auth/register">
                <button className="btn">Register</button>
              </Link>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
