import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login_page from '../page/Login_page';
import Datacontainer from './Datacontainer';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './Authcontext'; 

export default function DataRoute() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login_page />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Datacontainer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
                <SignUpForm />
              
            }
          />
          <Route
            path="/forgot-password"
            element={
             
                <ForgotPasswordForm />
             
            }
          />
          <Route
            path="/reset-password"
            element={
             
                <ResetPasswordForm />
              
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
