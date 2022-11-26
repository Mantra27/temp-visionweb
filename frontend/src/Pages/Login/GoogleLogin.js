import {GoogleLogin} from "react-google-login";
import axios from "axios"
import {useState} from "react";
import { useNavigate } from "react-router-dom";
const clientId = "1014276340059-orscm84ijkimm5vp5qkemp1kmjl4cvpe.apps.googleusercontent.com";

function Login(){
    const navigate = useNavigate();
    const onSuccess = (response) => {
        console.log('response will be sved in ls')
        axios.post("http://15.207.232.194:8080/auth/googleCallback", {
            body:response
        }).then((res)=>{
            if(res.data.status === 200){
                console.log(res.data)
                localStorage.setItem("token", res.data.token);
                navigate("/");
            }
        })
    };

    const onFailure = (response) => {
        console.log("failure response is: ", response);
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Continue with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                />
        </div>
    )
}
export default Login