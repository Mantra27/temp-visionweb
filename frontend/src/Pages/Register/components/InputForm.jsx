import {
  Box,
  Text,
  FormControl,
  Input,
  Select,
  Button,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InputForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  

    // const username = document.getElementById("username").value,
    // email = document.getElementById("email").value,
    // contactNumber = document.getElementById("contactNumber").value,
    // country = document.getElementById("country").value,
    // password = document.getElementById("password").value;
    const [error, setError] = useState("");
    const [data, setData] = useState({
      email: "",
      password: "",
    });

    const handleChange = ({ currentTarget: input }) => {
      setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const url = "http://192.168.64.32:8080/auth/register";
        const Data = await
        axios.post(url, data);
        console.log(Data.data);

        if(Data.data.status == 404){
          toast({
            title: "Oops 🤖",
            description: Data.data.message,
            status: "error",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
        }

        else if(!Data.data.token){
          toast({
            title: "Something bad happened!",
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
    <Box
      position="absolute"
      top={["25%", "28%", "12%"]}
      left={["10%", "15%", "52.5%"]}
      h={["67%", "66%", "75%"]}
      right={["10%", "20%", "14.5%"]}
      bg="#f1faee"
      mix-blend-mode="normal"
      boxShadow="10px 15px 70px"
      borderRadius={[21, 30, 40]}
    >
      <Box mx="25%" w="50%" display="flex" justifyContent="center">
        <Text
          position="absolute"
          top="5%"
          fontSize={["2vh", "2.5vh"]}
          fontFamily="Roboto"
          fontWeight="700"
        >
          Vision Web Register
        </Text>
      </Box>
      <Box w="65%" mx="17%" display="flex" justifyContent="center">
        <FormControl
          position="absolute"
          top={["10%", "13%", "14%"]}
          w="65%"
          mx="17%"
        >
          <Input
          onChange={handleChange}
            id="username"
            variant="flushed"
            name="username"
            placeholder="Name..."
          />
          <Input
          onChange={handleChange}
            id="email"
            variant="flushed"
            name="email"
            placeholder="Email..."
          />
          <Input
          onChange={handleChange}
            id="password"
            variant="flushed"
            type="password"
            name="password"
            placeholder="Password..."
          />
          <Input
          onChange={handleChange}
            id="country"
            variant="flushed"
            name="country"
            placeholder="Country..."
        />
          <Input
          onChange={handleChange}
            id="contactNumber"
            variant="flushed"
            name="contactNumber"
            placeholder="Contact No."
          />
          <Box display="flex" mt={["0","0","2%"]} justifyContent="end">
            <Button
              bg="brand.50"
              borderRadius={["2.8vh", "3vh"]}
              size={["sm"]}
              colorScheme="brand"
              color="white"
              type="submit" 
              _hover={{
                background: "white",
                color: "black",
                border: "2px solid #555555",
              }}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Box>
          <Box position="absolute" mt={["0","0","2%"]} h="100%" w="110%">
            <Text fontSize="2vh">
              By signing up, you agree{" "}
              <Link textDecoration="underline">to our Terms</Link> of use and
              Privacy Policy.
            </Text>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export default InputForm;