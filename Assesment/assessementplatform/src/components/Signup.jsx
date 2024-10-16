import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    InputAdornment,
    IconButton,
    InputLabel
} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom'
import styled from "@emotion/styled";
import { API_URL } from "../constant/ApiConstant";
import toast from "react-hot-toast";
import LoginImg from '../assets/Login.svg'
import Visibility from '../assets/Visibility.svg'
import VisibilityOff from '../assets/VisibilityOff.svg'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #06030D;
`;

const Signup = () => {
    const initialValue = {
        name: '',
        email: '',
        password: '',
    };
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [signup, setSignup] = useState(initialValue);
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorMessageName, setErrorMessageName] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [loader, setLoader] = useState(false);
    const [errorData, setErrorData] = useState("");
    const navigate = useNavigate();
    const dynamicColorName = errorName ? `${theme.palette.error.main}` : `${theme.palette.secondary.main}`;
    const dynamicColorEmail = errorEmail ? `${theme.palette.error.main}` : `${theme.palette.secondary.main}`;
    const dynamicColorPassword = errorPassword ? `${theme.palette.error.main}` : `${theme.palette.secondary.main}`;

    const handleChange = (e) => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        });
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/")
        axios.post(`${API_URL}/signup`, signup)
            .then((res) => {
                if (res.data.success) {
                    toast.success(
                        <div>
                            <span style={{ fontWeight: 'bold' }}>Successfully Signed up!</span>
                            <br />
                            <span style={{ fontWeight: 'lighter' }}>Employee Signed up Successfully</span>
                        </div>,
                        {
                            duration: 2000
                        }
                    );
                    localStorage.setItem("user" , res.data.data)
                    navigate('/instruction');
                } else {
                    toast.error(
                        <div>
                            <span style={{ fontWeight: 'bold' }}>Failed!</span>
                            <br />
                            <span style={{ fontWeight: 'lighter' }}>{res.data.message}</span>
                        </div>,
                        {
                            duration: 2000
                        }
                    );
                }
            })
            .catch((err) => {
                console.error('Error:', err);
                if (err.response) {
                    setErrorEmail(true);
                    setErrorMessageEmail('Email already exists.');
                } else {
                    console.error('Unexpected error:', err);
                }
            });
    };

    return (
        <>
            <div className="w-full h-[70vh] mt-[20%] sm:mt-0 sm:h-[90vh] flex justify-center items-center flex-wrap gap-[10px] sm:gap-[50px]">
                <div className="flex-col w-[80%] sm:w-[25%] justify-center">
                    <img src={LoginImg} className="w-full" alt="" />
                </div>
                <div className="flex-col w-[80%] sm:w-[25%] justify-center">
                    <h5 className='h5-bold text-black mb-4'>User Signup</h5>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <InputLabel className="p2-sem" style={{ marginBottom: '4px' }}>Name</InputLabel>
                            <TextField
                                id="outlined-name-input"
                                placeholder="Sage Turtle"
                                fullWidth
                                type="text"
                                required
                                name="name"
                                value={signup.name}
                                onChange={handleChange}
                                error={errorName}
                                helperText={errorMessageName}
                                InputProps={{
                                    sx: {
                                        height: '48px',
                                        fontSize: "16px",
                                        color: `${theme.palette.gray.gray9}`,
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: `#D5D2D9`,
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: `${theme.palette.primary.main}`,
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: `${theme.palette.primary.main}`,
                                        },
                                        "& input::placeholder": {
                                            color: `${theme.palette.gray.gray9}`,
                                        },
                                    },
                                }}
                            />
                        </div>
                        <div>
                            <InputLabel className="p2-sem" style={{ marginBottom: '4px' }}>Email</InputLabel>
                            <TextField
                                id="outlined-email-input"
                                placeholder="example@example.com"
                                fullWidth
                                type="email"
                                required
                                name="email"
                                value={signup.email}
                                onChange={handleChange}
                                error={errorEmail}
                                helperText={errorMessageEmail}
                                InputProps={{
                                    sx: {
                                        height: '48px',
                                        fontSize: "16px",
                                        color: `${theme.palette.gray.gray9}`,
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: `#D5D2D9`,
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: `${theme.palette.primary.main}`,
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: `${theme.palette.primary.main}`,
                                        },
                                        "& input::placeholder": {
                                            color: `${theme.palette.gray.gray9}`,
                                        },
                                    },
                                }}
                            />
                        </div>
                        <div>
                            <InputLabel className="p2-sem" style={{ marginBottom: '4px' }}>Password</InputLabel>
                            <TextField
                                id="outlined-password-input"
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                required
                                name="password"
                                value={signup.password}
                                onChange={handleChange}
                                error={errorPassword}
                                helperText={errorMessagePassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <img src={VisibilityOff} className="w-full" alt="" />
                                                ) : (
                                                    <img src={Visibility} className="w-full" alt="" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        height: '48px',
                                        fontSize: "16px",
                                        color: `${theme.palette.gray.gray9}`,
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: `#D5D2D9`,
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: `${theme.palette.primary.main}`,
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: `${theme.palette.primary.main}`,
                                        },
                                        "& input::placeholder": {
                                            color: `${theme.palette.gray.gray9}`,
                                        },
                                    },
                                }}
                            />
                        </div>
                        <p className="mt-8 text-[red] font-bold text-[12px]">{errorData}</p>
                        <div className="mt-8">
                            <Button type="submit" className="w-full px-10 py-20 h-16 btn1" style={{ background: `${theme.palette.primary.main}`, color: `${theme.palette.common.white}` }}>Signup</Button>
                        </div>
                        <p className="p3-bold mt-6 w-fit cursor-pointer" style={{ color: `${theme.palette.primary.main}` }} onClick={() => navigate("/")}>Already have an account? Login</p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;