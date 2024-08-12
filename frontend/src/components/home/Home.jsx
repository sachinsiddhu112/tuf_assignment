import React, { useState, useEffect } from 'react'
import "./Home.css";

import { useNavigate } from 'react-router-dom';


export default function Home() {
    const [bannar, setBannar] = useState(false);
    const [timer, setTimer] = useState(30); // Initial timer value
    const [data, setData] = useState([{
        description:"",
        duration:30,
        link:null,
        alert:true
    }]);

    
    const navigate =useNavigate()

    const startTimer = () => {
        const interval = setInterval(() => {
            setTimer((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    setBannar(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 2000);
    };

    // useEffect to handle data fetching or other side effects
   useEffect(() =>{
   
        fetchDataAndStartBanner()
    
   },[])

    // Simulate fetching data and starting the banner
    const fetchDataAndStartBanner = async () => {
        try {
            const response = await fetch("http://localhost:8081/bannar_data");
            if (!response.ok) {
                throw new Error("Network response is not ok");
            }
            const result = await response.json();
            setData(result);
             // Start the timer
             setTimer(result[0].duration);
             setBannar(true);
             startTimer()
            
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    };

    
   

    return (
        <div className='container'>
          
                    <button className='edit-bannar' onClick={()=> navigate("/dashboard",{state:{data:data}})}>dashboard</button>
                    <div className={`bannar ${bannar ? "" : "hideBannar"}`}>
                        <div className='section1'>
                            <span className='timer'>{timer}</span>
                            <button className='close' onClick={() => {
                                setTimer(0)
                                setBannar(false)}}>X</button>
                        </div>
                        <div className='section2'>
                            <p>{data[0].description.length !=0  ? data[0].description:"hi,greeting for everyone"}</p>

                        </div>
                    </div>

                    <div className="hero">
                        <p className='heading1'>Discover Your Career Opportunities</p>
                        <p className='heading2'>Find the perfect course for you and take the first step towards your dream career.</p>
                        <div className="btns">
                            <button className="btn1">Search course</button>
                            <button className="btn2">Explore Opportunities</button>
                        </div>
                    </div>
               
        </div>
    )
}