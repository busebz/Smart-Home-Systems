import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Devices from "./pages/Devices.jsx";
import Users from "./pages/Users.jsx";
import ActivityLogs from "./pages/ActivityLogs.jsx";

import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme.jsx";

import { AuthProvider } from "./context/authContext.jsx";

import PrivateRoute from "./components/PrivateRoute.jsx";

import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <div className="app">
          <Router>
            <Routes>
              <Route
                path="/"
                element={<Login />}
              />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/devices"
                element={
                  <PrivateRoute>
                    <Devices />
                  </PrivateRoute>
                }
              />

              <Route
                path="/users"
                element={
                  <PrivateRoute>
                    <Users />
                  </PrivateRoute>
                }
              />

              <Route
                path="/activity-logs"
                element={
                  <PrivateRoute>
                    <ActivityLogs />
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