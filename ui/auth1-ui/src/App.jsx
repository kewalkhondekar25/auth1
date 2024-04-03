import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import ErrorFallback from "./components/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";

const LogIn = React.lazy(() => import("./components/LogIn"));
const SignUp = React.lazy(() => import("./components/SignUp"));
const Profile = React.lazy(() => import("./components/Profile"));
const ForgetPassword = React.lazy(() => import("./components/ForgetPassword"));
const Error = React.lazy(() => import("./components/Error"));

function App() {
  return (
    <div className="bg-[#131315] text-white h-screen">
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}
          onReset={() => { }}>
          <Suspense
            fallback={<div className="flex justify-center items-center h-screen">
              <svg className="w-60 h-60" viewBox="0 0 200 200">
                <defs>
                  <radialGradient id="a10" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                    <stop offset="0" stopColor="#DB1A5A"></stop>
                    <stop offset=".3" stopColor="#DB1A5A" stopOpacity=".9"></stop>
                    <stop offset=".6" stopColor="#DB1A5A" stopOpacity=".6"></stop>
                    <stop offset=".8" stopColor="#DB1A5A" stopOpacity=".3"></stop>
                    <stop offset="1" stopColor="#DB1A5A" stopOpacity="0"></stop>
                  </radialGradient>
                </defs>
                <circle stroke="url(#a10)" strokeWidth="5" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="35">
                  <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
                </circle>
                <circle stroke="#DB1A5A" strokeWidth="5" strokeLinecap="round" cx="100" cy="100" r="35"></circle>
              </svg>
            </div>}>
            <Toaster />
            <Header />
            <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </div>
  )
}

export default App
