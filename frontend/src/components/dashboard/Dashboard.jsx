import React, { useState } from 'react'
import "./Dashboard.css"
import { useLocation } from 'react-router-dom'
import axios from "axios"
export default function Dashboard() {

    const location = useLocation();
    const [data,setData] = useState(location.state ? location.state.data :[
        {
            description:"",
            duration:30,
            link:null,
            alert:true
        }
    ]);
    const [edit, setEdit] = useState(false);

    const [editedData, setEditedData] = useState({
        description: "",
        duration: 0,
        link: null,
        alert: 1
    })
    

    const handleChange = (e) => {
        setEditedData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
    const handleSave = async () => {
       
        try {
            const response = await fetch("http://localhost:8081/update_bannar", {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedData), 
            });
    
            const result = await response.json(); 
            console.log(result);
    
            if (response.ok) {
                // Handle successful update
                console.log("Data updated successfully");
                setData(result)
            } else {
                // Handle errors returned from the server
                alert("Some erro occured")
                console.error("Error updating data:", result.Error);
            }
        } catch (error) {
            // Handle network or other unexpected errors

            console.error("Error occurred while updating data:", error);
        } finally {
            setEdit(false);
        }
    }
    return (
        <div className='dashboard
        '>
            <h2>Admin</h2>
            {!edit ? <>

                <div className="container">

                    <div className='c-item duration'>
                        <label > Duration:</label>
                        <span>{data[0].duration}</span>
                    </div>
                    <div className='c-item description'>
                        <label >Description:</label>
                        <span>{data[0].description}</span>
                    </div>
                    <div className='c-item link'>
                        <label > Link:</label>
                        <span>{data[0].link ? data[0].link : "NULL"}</span>
                    </div>
                    <div className='c-item alert'>
                        <label > Alert:</label>
                        <span>{
                            data[0].alert =='true' ||data[0].alert == "True" ? 'True' : 'False'
                            }</span>
                    </div>

                    <button className="button" onClick={() => setEdit(true)}>Edit</button>
                </div>
            </>
                : (
                    <div className="container">

                        <div className='c-item duration'>
                            <label > Duration(sec):</label>
                            <input type='number' id="duration" onChange={handleChange} />
                        </div>
                        <div className='c-item description'>
                            <label >Description:</label>
                            <input type='text' id='description' onChange={handleChange} />
                        </div>
                        <div className='c-item link'>
                            <label > Link:</label>
                            <input type="url" id='link' onChange={handleChange} />
                        </div>
                        <div className='c-item alert'>
                            <label > Alert:</label>
                            <input type='text' id='alert' onChange={handleChange} />
                        </div>

                        <button className="button" onClick={handleSave}>Save</button>
                    </div>
                )
            }
        </div>
    )
}
