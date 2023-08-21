import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RegistrationPage } from 'pages/registartionPage';
import { LoginPage } from 'pages/loginPage';
import ContactsPage from 'pages/contactsPage';
import Navigation from 'components/navigation/Navigation';
import { ChakraProvider } from '@chakra-ui/react';

export const App = () => {
  return (
    <ChakraProvider>
      <div>
        <Navigation />
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
};
