import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
  } from "@clerk/clerk-react";
  import { Navigate } from "react-router-dom";
  import  App from "./App.css"; // Ensure this path is correct
   import React , {useEffect} from "react";
   import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import 'animate.css';
const features = [
  { title: 'Track Expenses', description: 'Keep track of your spending and manage your budget effectively.' },
  { title: 'Set Budgets', description: 'Set budgets and receive notifications when you are close to your limits.' },
  { title: 'Recurring Transactions', description: 'Manage recurring expenses and incomes easily.' },
  { title: 'Visual Reports', description: 'Generate visual reports to better understand your financial health.' },
];



  
  export const Auth = () => {
    

    return (
      <div className="auth-page">
      <div className="sign-in-container">
        <SignedOut>
          <div className="auth-illustration">
            <img src = "src/images/image.svg" alt="Finance Illustration" />
          </div>
          <div className="auth-content">
            <h1>Welcome to SmartSpend!</h1>
            <h2>Manage Money Matters</h2>
            <p>Sign in or sign up to start tracking your finances effectively.</p>
            <SignUpButton mode="modal" />
            <SignInButton mode="modal" />
          </div>
          
        </SignedOut>
        <SignedIn>
          <Navigate to="/" />
        </SignedIn>
        
      </div>
      <div className="features-section">
        <h2>Features</h2>
        <div className="feature-list">
          {features.map((feature, index) => (
            <FeatureCard key={index} title={feature.title} description={feature.description} index={index} />
          ))}
        </div>
      </div>


      <footer className="footer">
        <div className="footer-content">
          <a href="https://www.linkedin.com/in/harshita-sachdev15/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a href="https://github.com/HarshitaaSachdev" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </div>
        <p>&copy; 2024 SmartSpend. All rights reserved.</p>
      </footer>
    </div>
    
    );
  };
  const FeatureCard = ({ title, description, index }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: false });
  
    useEffect(() => {
      if (inView) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.3 },
        });
      } else {
        controls.start({ opacity: 0, y: 20 });
      }
    }, [controls, inView, index]);
  
    return (
      <div ref={ref} className="timeline-container">
        <div className="timeline-icon" />
        <motion.div
          className="feature-card"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          <h3>{title}</h3>
          <p>{description}</p>
        </motion.div>
      </div>
    );
  };