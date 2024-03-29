import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute.jsx";

import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <div className="app">
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
