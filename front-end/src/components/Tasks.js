import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Tasks() {

    const clickedCateg = useSelector(data=>data.categ)

    const [tasks , setTasks] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/tasks/category/${clickedCateg}`)
        .then(res=>setTasks(res.data.task))
        .catch(err=>setTasks('error'))
    } , [clickedCateg])

  return (
    <div>
        {
            tasks !== undefined && (
                tasks !== 'error' ?
                tasks.map((task , i)=>
                    <div key={i}>
                        <p>task : {task.description}</p>
                    </div>
                )
                :
                <div>
                    <p className='text-body-secondary'>No tasks asigned to this category</p>
                </div>
            )
        }
    </div>
  )
}
