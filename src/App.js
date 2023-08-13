import HomeBuyer from "./pages/HomeBuyer";
import React,{useEffect, useState} from "react";
import {customMessage} from "./components/Message/Message";
import RegisterPage from "./pages/Register";
import Loading from "./components/Loading/Loading";
import HomeSeller from "./pages/HomeSeller";
import {useNavigate} from "react-router";


function App() {
    const [success, setSuccess] = useState(false);
    const [userData, setUserData] = useState();
    const navigate = useNavigate();
    const [userRole,setUserRole] = useState();
    const mobileNumber = {
        MobileNumber: localStorage.getItem('authUserMobileNumber'),
    }

    useEffect(() => {
        if (mobileNumber){
            fetch(process.env.REACT_APP_LOGIN_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:  JSON.stringify(mobileNumber) })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'error'){
                        console.log(data);
                        navigate('/register');
                        // customMessage(`${data.status}`, `This number is not registered`);
                    } else {
                        setUserData(data);
                        setSuccess(true);
                        setUserRole(data.user.Role)
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        }else {
            navigate('/register');
        }

    },[])

    return (
   <>
       {
           !success ? <Loading /> : <> {userRole === "Buyer" ? <HomeBuyer /> : <HomeSeller/>} </>
       }
   </>
  );
}

export default App;
