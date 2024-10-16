import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Checkbox } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../constant/ApiConstant';
import { useNavigate } from 'react-router-dom';

const MultiForm = () => {
    const navigate = useNavigate();
    const [questionsData, setQuestionData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const getAllQuestions = () => {
        axios
            .get(`${API_URL}/getAllQuestions`)
            .then((res) => {
                console.log("Questions Data:", res.data.data);
                if (res.data.success === true) {
                    setQuestionData(res.data.data);
                }
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    };

    useEffect(() => {
        getAllQuestions();
    }, []);

    const handleNext = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);

        let depressedValue = 0;
        let anxietyValue = 0;
        let stressedValue = 0;
        if (selectedOptionIndex !== null) {

            const currentQuestion = questionsData[currentQuestionIndex];
            if (currentQuestion) {
                if (currentQuestion.depressed === 1) {
                    depressedValue = selectedOptionIndex;
                }
                if (currentQuestion.anxiety === 1) {
                    anxietyValue = selectedOptionIndex;
                }
                if (currentQuestion.stressed === 1) {
                    stressedValue = selectedOptionIndex;
                }

            }
        }

        const scoreObject = {
            depressed: depressedValue,
            anxiety: anxietyValue,
            stressed: stressedValue,
            email: localStorage.getItem("userEmail")
        };

        console.log(scoreObject);

        axios
            .patch(`${API_URL}/addAnswers`, { score: scoreObject })
            .then((res) => {
                if (res.data.success === true) {
                    if (currentQuestionIndex === questionsData.length - 1) {
                        navigate("/thank");
                    }
                }
            })
            .catch((err) => {
                console.error("Error:", err);
            });
        setSelectedOptionIndex(null);
        setIsNextButtonDisabled(true);
    };

    const handleSubmit = () =>{
        handleNext();
        axios
        .patch(`${API_URL}/addScore`, { email: localStorage.getItem("userEmail") })
        .then((res) => {
            if (res.data.success === true) {
                console.log("test started");
            }
        })
        .catch((err) => {
            console.error("Error:", err);
        });
    }


    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
        setIsNextButtonDisabled(false);
    };

    const currentQuestion = questionsData[currentQuestionIndex];
    return (
        <div className='w-full h-[90vh] content-center'>
            <Box sx={{ width: { xs: "95%", md: "80%" }, margin: "auto", alignContent: "start", borderRadius: "16px", boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.16)" }}>
                <TabContext value="1">
                    <Box sx={{ background: "#EFEFEF", borderRadius: "16px 16px 0px 0px" }}>
                        <TabList aria-label="lab API tabs example">
                            <Tab label="Wellbeing Assessment" sx={{ background: "#fff", borderRadius: "16px 0px 0px 0px", fontSize: "16px", textTransform: "capitalize", fontWeight: "600", padding: "0px 70px", color: "#614298" }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ background: "#fff", height: "100%", borderRadius: "16px", padding:{ xs: "10px", md: "16px" } }}>
                        <div className='dummyBg sm:p-[40px] p-[10px]'>
                            <div className='questionCard py-[10px] px-[10px] sm:py-[51px] sm:px-[67px]'>
                                <p className='questionNumber'>{`Question ${currentQuestionIndex + 1}/${questionsData.length}`}</p>
                                <h1 className='question'>Over the past week <br/> {currentQuestion ? currentQuestion.question : ''}</h1>
                                <ul className='flex flex-col gap-[10px]'>
                                    {['Never', 'Sometimes', 'Often', 'Almost Always'].map((option, index) => (
                                        <li key={index} className='flex items-center'>
                                            <div className="flex gap-1 items-center">
                                                <Checkbox
                                                    className='checkbox'
                                                    size="large"
                                                    sx={{ borderRadius: "6px" }}
                                                    checked={selectedOptionIndex === index}
                                                    onChange={() => handleOptionSelect(index)}
                                                />

                                                <h3 className="answerOptions text-[14px]">{option}</h3>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className='flex justify-end'>
                                    {currentQuestionIndex == 20 ? (
                                        <button onClick={handleSubmit} disabled={isNextButtonDisabled} className={`questionButton ${isNextButtonDisabled ? "opacity-80" : ""}`}>
                                            Submit
                                        </button>
                                    ) : (
                                        <button onClick={handleNext} disabled={isNextButtonDisabled} className={`questionButton ${isNextButtonDisabled ? "opacity-80" : ""}`}>
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default MultiForm;
