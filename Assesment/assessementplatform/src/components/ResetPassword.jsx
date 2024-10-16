import { useState } from "react";
import axios from "axios";
import {
    Box,
    TextField,
    Button,
    Typography,
    InputLabel,
} from "@mui/material";
import { API_URL } from "../constant/ApiConstant";
import toast from "react-hot-toast";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [resetData, setResetData] = useState({
        email: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const dynamicColorEmail = errorEmail ? `${theme.palette.error.main}` : `${theme.palette.secondary.main}`;
    const [errorNewPassword, setErrorNewPassword] = useState(false);
    const [errorMessageNewPassword, setErrorMessageNewPassword] = useState('');
    const dynamicColorNewPassword = errorNewPassword ? `${theme.palette.error.main}` : `${theme.palette.secondary.main}`;
    const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState(false);
    const [errorMessageConfirmNewPassword, setErrorMessageConfirmNewPassword] = useState('');
    const dynamicColorConfirmNewPassword = errorConfirmNewPassword ? `${theme.palette.error.main}` : `${theme.palette.secondary.main}`;
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setResetData({
            ...resetData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(`${API_URL}/resetPassword`, resetData)
            .then((res) => {
                setLoading(false);
                if (res.data.success) {
                    toast.success(
                        <div>
                          <span style={{ fontWeight: 'bold' }}>Password Reset Successfully</span>
                        </div>,
                        {
                          duration: 2000
                        }
                      );
                } else {
                    setError(res.data.message);
                }
                navigate("/")
            })
            .catch((err) => {
                setLoading(false);
                console.error("Error:", err);
                setError("An unexpected error occurred.");
            });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh",
            }}
        >
            <Box
                sx={{
                    width: { xs: "85%", md: "30%" },
                    padding: "20px",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                }}
            >
                <h5 className='h5-bold text-black mb-4'>Reset Password</h5>
                {error && (
                    <Typography variant="body2" color="error" align="center">
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <InputLabel className="p2-sem" style={{ marginBottom: '4px' }}>Email</InputLabel>
                        <TextField
                            id="outlined-email-input"
                            placeholder="Sage Turtle"
                            fullWidth
                            type="text"
                            required
                            name="email"
                            value={resetData.email}
                            onChange={handleChange}
                            error={errorEmail}
                            helperText={errorMessageEmail}
                            InputProps={{
                                sx: {
                                    height: '48px',
                                    fontSize: "16px",
                                    color: `${theme.palette.gray.gray9}`,
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: `${dynamicColorEmail}`,
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
                        <InputLabel className="p2-sem" style={{ marginBottom: '4px' }}>New Password</InputLabel>
                        <TextField
                            id="outlined-newPassword-input"
                            placeholder="Sage Turtle"
                            fullWidth
                            type="password"
                            required
                            name="newPassword"
                            value={resetData.newPassword}
                            onChange={handleChange}
                            error={errorNewPassword}
                            helperText={errorMessageNewPassword}
                            InputProps={{
                                sx: {
                                    height: '48px',
                                    fontSize: "16px",
                                    color: `${theme.palette.gray.gray9}`,
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: `${dynamicColorNewPassword}`,
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
                        <InputLabel className="p2-sem" style={{ marginBottom: '4px' }}>New Password</InputLabel>
                        <TextField
                            id="outlined-newPassword-input"
                            placeholder="Sage Turtle"
                            fullWidth
                            type="password"
                            required
                            name="confirmNewPassword"
                            value={resetData.confirmNewPassword}
                            onChange={handleChange}
                            error={errorConfirmNewPassword}
                            helperText={errorMessageConfirmNewPassword}
                            InputProps={{
                                sx: {
                                    height: '48px',
                                    fontSize: "16px",
                                    color: `${theme.palette.gray.gray9}`,
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: `${dynamicColorConfirmNewPassword}`,
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{
                            '&:hover': {
                                background: "#614298",
                            },
                        }}
                    >
                        {loading ? "Loading..." : "Reset Password"}
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default ResetPassword;