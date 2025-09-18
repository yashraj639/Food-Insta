import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <AppRoutes />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
