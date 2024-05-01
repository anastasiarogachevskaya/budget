import React from 'react';
import { PurchaseProvider } from './context/PurchaseContext';
import PurchaseList from './components/Purchase/PurchaseList';
import PurchaseForm from './components/PurchaseForm';

function App() {
  return (
    <PurchaseProvider>
      <PurchaseForm />
      <PurchaseList />
    </PurchaseProvider>
  );
}

export default App;