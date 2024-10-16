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
import LoginImg from '../assets/Login.svg'
import Visibility from '../assets/Visibility.svg'
import VisibilityOff from '../assets/VisibilityOff.svg'
import styled from "@emotion/styled";
import { API_URL } from "../constant/ApiConstant";
import toast from "react-hot-toast";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #06030D;
`;

const Login = () => {
    const initialValue = {
        email: '',
        password: '',
    };
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState(initialValue);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [errorData, setErrorData] = useState("");
    const navigate = useNavigate();
    const dynamicColorEmail = errorEmail ? `${theme.palette.error.main}` : `${theme.palette.secondary.main}`;
    const dynamicColorPassword = errorPassword ? `${theme.palette.error.main}` : `${theme.palette.secondary.main}`;

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/login`, login)
          .then((res) => {
            if (res.data.success) {
              toast.success(
                <div>
                  <span style={{ fontWeight: 'bold' }}>Successfully Loggedin!</span>
                  <br />
                  <span style={{ fontWeight: 'lighter' }}>Employee Loggedin Successfully</span>
                </div>,
                {
                  duration: 2000
                }
              );
              localStorage.setItem("userEmail" , res.data.data.email)
              navigate('/instruction');
            } else {
              toast.error(
                <div>
                  <span style={{ fontWeight: 'bold' }}>Failed!</span>
                  <br />
                  <span style={{ fontWeight: 'lighter' }}>{res.data.success}</span>
                </div>,
                {
                  duration: 2000
                }
              );
            }
          })
          .catch((err) => {
            console.error('Error:', err);
            toast.error(
                <div>
                  <span style={{ fontWeight: 'bold' }}>{err.response.data.data}</span>
                </div>,
                {
                  duration: 2000
                }
              );
          });
    };

    return (
        <>
            <div className="w-full h-[70vh] mt-[20%] sm:mt-0 sm:h-[90vh] flex justify-center items-center flex-wrap gap-[10px] sm:gap-[50px]">
                <div className="flex-col w-[80%] sm:w-[25%] justify-center">
                    <img src={LoginImg} className="w-full" alt="" />
                </div>
                <div className="flex-col w-[80%] sm:w-[25%] justify-center">
                    <h5 className='h5-bold text-black mb-4'>User login</h5>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <InputLabel className="p2-sem" style={{ marginBottom: '4px' }}>Email</InputLabel>
                            <TextField
                                id="outlined-email-input"
                                placeholder="Sage Turtle"
                                fullWidth
                                type="text"
                                required
                                name="email"
                                value={login.email}
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
                                value={login.password}
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
                        <p className="p3-bold mt-6 w-fit cursor-pointer" style={{ color: `${theme.palette.primary.main}` }} onClick={() => navigate("/reset-password")}>Forgot password?</p>
                        <div className="mt-8">
                            <Button type="submit" className="w-full px-10 py-20 h-16 btn1" style={{ background: `${theme.palette.primary.main}`, color: `${theme.palette.common.white}` }}>Login</Button>
                        </div>
                        <p className="p3-bold mt-6 w-fit cursor-pointer" style={{ color: `${theme.palette.primary.main}` }} onClick={() => navigate("/signup")}>Don't have an account? SignUp</p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;