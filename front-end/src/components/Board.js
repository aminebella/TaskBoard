import { SignedIn, UserButton, useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import GetUsers from "../hooks/GetUsers";
import axios from "axios";

export default function Board() {
  const navigate = useNavigate();

  const { isSignedIn, userId } = useAuth();

  const { user } = useUser();
  
  const AllUsers = GetUsers();

  if (isSignedIn) {
    const email = user.primaryEmailAddress.emailAddress;
    function StoreUserData() {
      let fullName;

      if (user.fullName) {
        fullName = user.fullName;
      } else {
        fullName = user.username;
      }
      axios.post("http://localhost:8000/api/users", {
        userId,
        fullName,
        email,
      });
      window.location.reload();
    }

    if (AllUsers === "load") {
      <div className="loader"></div>;
    } else {
      return (
        <SignedIn>
            <div className="m-5">
                <UserButton/>
            </div>
            <p>{user.fullName}</p>
            <p>{email}</p>
          <div>
            {AllUsers.filter((user) => user.email === email).length === 0 && (
              <button className="btn btn-dark" onClick={StoreUserData}>
                Store your infos
              </button>
            )}
          </div>
        </SignedIn>
      );
    }
  } else {
    navigate("/");
  }
}
