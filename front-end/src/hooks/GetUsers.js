import axios from 'axios';
import { useEffect, useState } from 'react'



export default function GetUsers() {

    const [allUsers, setAllUsers] = useState([]);
    const [load , setLoad] = useState(true)

    useEffect(() => {

        const fetchData = async ()=>{
            await axios.get("http://localhost:8000/api/users")
            .then(res=>setAllUsers(res.data.users))
            .catch(err=>setAllUsers('error'))
            setLoad(false)
          }

        fetchData()

    }, []);


    return load ? 'load' : allUsers
}
