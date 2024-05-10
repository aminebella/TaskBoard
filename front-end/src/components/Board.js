import { SignedIn, useUser } from "@clerk/clerk-react";
import Tasks from "./Tasks";
import Menu from "./Menu";

export default function Board() {

  const {user} = useUser()

  if(user){
    return (
      <SignedIn>
        <Menu/>
        <Tasks />
      </SignedIn>
    );

  }
  else{
    return <p>Error</p>
  }
  

}
