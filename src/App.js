import React, { useState } from 'react';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HeroSection from './components/home/HeroSection';
import Services from './components/home/Services';
import AIWorkflow from './components/home/AIWorkflow';
import AIInterface from './components/home/AIInterface';
import Benefits from './components/home/Benefits';
import SignIn from './components/auth/SignIn';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  // State to track which page to show
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'signin', or 'dashboard'

  // Function to toggle between pages
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Handle sign out from Dashboard
  const handleSignOut = () => {
    navigateTo('home');
  };

  // Render the sign-in page if currentPage is 'signin'
  if (currentPage === 'signin') {
    return <SignIn 
      onNavigateBack={() => navigateTo('home')} 
      onSignInSuccess={() => navigateTo('dashboard')} 
    />;
  }

  // Render the dashboard if currentPage is 'dashboard'
  if (currentPage === 'dashboard') {
    return <Dashboard onSignOut={handleSignOut} />;
  }

  return (
    <div className="App">
      {/* Navigation header */}
      <Header onNavigateToSignIn={() => navigateTo('signin')} />
      
      {/* Main content that should scroll */}
      <main className="main-content">
        <HeroSection />
        <AIWorkflow />
        <Services />
        <AIInterface />
        <Benefits />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
