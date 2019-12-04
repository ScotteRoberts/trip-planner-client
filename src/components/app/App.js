import React from 'react';
import './App.css';
import DetailPanel from '../detail-panel';
import ListingPanel from '../listing-panel';
import ReminderPanel from '../reminder-modal';

function App() {
  return (
    <main>
      <DetailPanel />
      <ListingPanel />
      <ReminderPanel />
    </main>
  );
}

export default App;
