import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInForm from './ui/components/auth/SignInForm';
import SignUpForm from './ui/components/auth/SignUpForm';
import Dashboard from '.ui/pages/Dashboard/Home';
import ProtectedRoute from './ui/components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SignInForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;