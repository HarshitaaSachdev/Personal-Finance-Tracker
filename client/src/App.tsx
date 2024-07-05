import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { useUser } from "@clerk/clerk-react";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { SignedIn, UserButton, useClerk } from "@clerk/clerk-react";
import ProtectedRoute from "./pages/auth/ProtectedRoute"; // Import the ProtectedRoute component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import Visualization from "./pages/dashboard/Visualization";
import FinancialManagement from "./pages/dashboard/FinancialManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut().then(() => {
      window.location.href = "/home"; // Redirect to the /auth page after signing out
    });
  };

  return (
    <Router>
    
      <div className="app-container">
      <ToastContainer 
         position="top-right"
         autoClose={2000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="dark"
         transition: Bounce
      />
        <div className="navbar">
          <div className="navbar-left">
            <div className="navbar-item-name">
            SmartSpend
            </div>
              
            
          </div>
          
          <div className="navbar-right">
            <Link to="/" className="navbar-item">
              Dashboard
            </Link>
            {user && (
              <Link to="/visualization" className="navbar-item">
              Visualization
            </Link>
            )}
             <Link to="/financial-management" className="navbar-item">
  Manage Finances
</Link>
            
            <SignedIn>
           
              <UserButton
                afterSignOutUrl="/home"
                signOutCallback={handleSignOut}
                showName
              />
            </SignedIn>
          </div>
        </div>
        <Routes>
        
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <FinancialRecordsProvider>
                  <Dashboard />
                  
                </FinancialRecordsProvider>
              </ProtectedRoute>
            }
          />
          <Route path="/home" element={<Auth />} />
          <Route
            path="/visualization"
            element={
              <FinancialRecordsProvider>
                <Visualization />
                </FinancialRecordsProvider>
            }
            />
             <Route path="/financial-management" element={<FinancialManagement />} />
        </Routes>
       
      </div>
     
    </Router>
  );
}

export default App;
