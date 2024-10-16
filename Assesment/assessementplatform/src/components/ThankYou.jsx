import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ThankYouSvg from "../assets/ThankYou.svg"
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
    const navigate = useNavigate()

    const toggleFullScreen = () => {
        const element = document.documentElement;
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
          // If not in full screen, enter full screen
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
        } else {
          // If in full screen, exit full screen
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      };

    const handleBack = () => {
        navigate('/');
        localStorage.removeItem("userEmail");
    };

    useEffect(() => {
        toggleFullScreen();
    }, []);

    return (
        <div className='w-full h-[90vh] content-center'>
            <div className='w-full h-[60vh] content-center'>
                <Box sx={{ width: { xs: "95%", md: "80%" }, margin: "auto", alignContent: "start", borderRadius: "16px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.16)" }}>
                    <TabContext value="1">
                        <Box sx={{ background: "#EFEFEF", borderRadius: "16px 16px 0px 0px" }}>
                            <TabList aria-label="lab API tabs example">
                                <Tab label="Wellbeing Assessment" sx={{ background: "#EFEFEF", borderRadius: "16px 0px 0px 0px", fontSize: "16px", textTransform: "capitalize", fontWeight: "600", padding: "0px 70px", color: "#614298" }} />
                            </TabList>
                        </Box>
                        <TabPanel value="1" sx={{ background: "#fff", height: "100%", borderRadius: "16px", padding:{ xs: "10px", md: "16px" } }}>
                            <div className='flex flex-col justify-center items-center'>
                                <img src={ThankYouSvg} className='w-[100px]' />
                                <div className="w-full sm:w-[50%] p-6 content-center">
                                    <h1 className="h6-sem text-black mb-0 sm:mb-6 ml-0 sm:ml-8 text-center">
                                        Thank you for submitting your assessment, we will share your report via email within the next 24 hours
                                    </h1>
                                    <div className='flex justify-center mt-4'>
                                        <button
                                            className={`bg-[#614298] ml-4 h-[40px] w-[150px] p1-sem text-white py-2 px-4 rounded-lg`}
                                            onClick={handleBack}
                                        >
                                            Go Back
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}

export default ThankYou
