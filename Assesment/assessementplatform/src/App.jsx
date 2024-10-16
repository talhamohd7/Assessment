/* eslint-disable react/prop-types */
import { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { ThemeProvider, LinearProgress } from "@mui/material";
import theme from "./customTheme/Theme";
import ToasterProvider from "./components/ToasterProvider"
import "./App.css";
import axios from "axios";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import ExamInstruction from "./components/Instruction";
import MultiForm from "./components/MultiForm";
import Navbar from "./components/Navbar";
import ThankYou from "./components/ThankYou";

axios.defaults.withCredentials = true;

const PrivateRoute = () => {
  const email = localStorage.getItem("userEmail");
  return email ? <Outlet /> : <Navigate to="/" />;
};

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ToasterProvider />
          <Suspense fallback={<LinearProgress />}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route element={<PrivateRoute />}>
                <Route path="/instruction" element={<ExamInstruction />} />
                <Route path="/form" element={<MultiForm />} />
                <Route path="/thank" element={<ThankYou />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;