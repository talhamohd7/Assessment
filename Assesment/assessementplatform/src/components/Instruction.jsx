import { useTheme } from '@emotion/react';
import { Button, Checkbox, Dialog, DialogActions, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InstructionImg from "../assets/Instruction.svg"
import axios from 'axios';
import { API_URL } from '../constant/ApiConstant';

const ExamInstruction = () => {
  const theme = useTheme();
  const [isChecked, setIsChecked] = useState(false);
  const [consent, setConsent] = useState(true);
  const navigate = useNavigate();

  const handleCloseView = () => {
    navigate("/");
    setConsent(false);
    localStorage.removeItem("userEmail")
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConsent(false)
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const enterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const testGiven = () =>{
    axios
    .patch(`${API_URL}/testGiven`, { email: localStorage.getItem("userEmail") })
    .then((res) => {
        if (res.data.success === true) {
            console.log("test started");
        }
    })
    .catch((err) => {
        console.error("Error:", err);
    });
  }

  const handleStartExam = () => {
    if (isChecked) {
      navigate('/form');
      testGiven()
      enterFullScreen();
    } else {
      alert('Please confirm that you have read and understood the instructions.');
    }
  };

  return (
    <>
      <Dialog
        open={consent}
        onClose={handleCloseView}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ padding: "16px" }}>
          <div>
            <h5
              style={{ marginBottom: "24px", textAlign: "center" }}
              className="h5-bold"
            >
              We need your consent
            </h5>
          </div>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            action=""
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 39px",
              gap: 12,
            }}
          >
            <div>
              <p className="p2-sem" style={{ color: "#4A4159" }}>
                <strong>1.</strong> I hereby agree and consent to participate in the assessment conducted by Rashtriya Fertilisers and Chemicals Ltd.<br/>
                <strong>2.</strong> I understand that my participation is optional, and I reserve the right to withdraw at any time without consequence.<br/>
                <strong>3.</strong> I understand that my identity will remain confidential.<br/>
                <strong>4.</strong> I acknowledge that all data collected will be used solely for developmental purposes and will be handled with strict confidentiality.<br/>
              </p>
            </div>
            <DialogActions>
              <Button
                variant="outlined"
                sx={{
                  width: { xs: "125px", md: "160px" },
                  height: "48px",
                  borderRadius: "8px",
                  border: "1px solid #614298",
                  textTransform: "capitalize",
                }}
                onClick={handleCloseView}
                autoFocus
              >
                <span className="btn1">Deny</span>
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: { xs: "125px", md: "160px" },
                  height: "48px",
                  borderRadius: "8px",
                  border: "1px solid #614298",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "#614298",
                  },
                }}
                autoFocus
              >
                <span className="btn1">Accept</span>
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
      <div className='w-full h-[90vh] sm:h-[80vh] content-center'>
        <Box sx={{ width: '80%', margin: "auto", alignContent: "start", borderRadius: "16px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.16)" }}>
          <TabContext value="1">
            <Box sx={{ background: "#EFEFEF", borderRadius: "16px 16px 0px 0px" }}>
              <TabList aria-label="lab API tabs example">
                <Tab label="Wellbeing Assessment" sx={{ background: "#EFEFEF", borderRadius: "16px 0px 0px 0px", fontSize: "16px", textTransform: "capitalize", fontWeight: "600", padding: "0px 70px", color: "#614298" }} />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ width: "100%", background: "#fff", height: "100%", borderRadius: "16px", padding: { xs: "10px", md: "16px" } }}>
              <div className='flex-col sm:flex-row md:flex justify-center gap-2 sm:gap-2'>
                <div className='sm:w-[18%] w-[100%] flex justify-center'>
                  <img src={InstructionImg} className='sm:w-[100%] w-[40%] flex' />
                </div>
                <div className="w-[100%] sm:w-[50%] p-6 content-center">
                  <h1 className="p4-bold sm:h5-bold text-black mb-6 ml-8">Instructions</h1>
                  <p className="p3-bold sm:p1-bold text-black mb-4 ml-8">Please read each statement and check the option which indicates how much the statement applied to you over the past week. There no right or wrong answers. Do not spend too much time on any statement.</p>
                  <div className="mb-4 ml-8">
                    <h2 className="p4-bold text-black mb-4">The rating scale is as follows:</h2>
                    <ol className="list-decimal pl-5">
                      <li className="p3-sem sm:ovr1-sem text-black mb-4"><strong>Never:</strong> Did not apply to me at all</li>
                      <li className="p3-sem sm:ovr1-sem text-black mb-4"><strong>Sometimes:</strong> Applied to me to some degree, or some of the time</li>
                      <li className="p3-sem sm:ovr1-sem text-black mb-4"><strong>Often:</strong> Applied to me to a considerable degree or a good part of time</li>
                      <li className="p3-sem sm:ovr1-sem text-black mb-4"><strong>Almost Always:</strong> Applied to me very much or most of the time</li>
                    </ol>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Checkbox
                      className='checkbox'
                      size="large"
                      sx={{ borderRadius: "6px" }}
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <h3 className="answerOptions sm:text-[13px] text-[10px]">I confirm that I have read and understood the instructions.</h3>
                  </div>
                  <button
                    className={`bg-[#614298] ml-4 h-[40px] w-[150px] p1-sem text-white py-2 px-4 rounded-lg ${isChecked ? '' : 'opacity-50 cursor-not-allowed'}`}
                    onClick={handleStartExam}
                    disabled={!isChecked}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
};

export default ExamInstruction;