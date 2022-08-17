import {GoogleLogin} from "react-google-login";
import axios from "axios"
import {useState} from "react";
const clientId = "1014276340059-orscm84ijkimm5vp5qkemp1kmjl4cvpe.apps.googleusercontent.com";

function Login(){
    const onSuccess = (response) => {
            console.log('response will be sved in ls')
        axios.post("http://localhost:8080/auth/googleCallback", {
            body:response
        }).then((res)=>{
            if(res.data.status === 200){
                localStorage.setItem("token", res.data.token);
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