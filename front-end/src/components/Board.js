import {
    SignedIn,
    UserButton,
    useAuth,
    useUser
} from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import GetUsers from '../hooks/GetUsers';
import axios from 'axios';

export default function Board() {

    const navigate = useNavigate()

    const {isSignedIn , userId} = useAuth()

    const {user} = useUser()

    const AllUsers = GetUsers()

    if(isSignedIn){

        function StoreUserData(){
            const fullName = user.fullName
            const email = user.primaryEmailAddress.emailAddress 
            axios.post("http://localhost:8000/api/users", {userId , fullName , email});
            window.location.reload()
        }   
        
        if(AllUsers === 'load'){
            <div className="loader"></div>
        }
        else{
            return (
              <div>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  {
                    AllUsers.filter(user=>user.userId === userId).length === 0 &&
                    <button className="btn btn-dark" onClick={StoreUserData}>Store your infos</button>
                  }
              </div>
            )
        }
    }
    else{
        navigate('/')
    }

}
