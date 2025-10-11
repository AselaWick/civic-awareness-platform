import './App.css';
import { useState } from 'react';
import Button from './components/Button';
import Report from './components/Report';
import IssueForm from './components/IssueForm';
import LiveIssues from './components/LiveIssues';
import 'leaflet/dist/leaflet.css';
import MapView from './components/MapView';
//import { createBrowserSupabaseClient } from '@supabase/auth-helpers-react';
//import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './supabaseClient';
//import custom page loading buttion

import MyMapButton from './components/MyMapButton';
import { useUser } from '@supabase/auth-helpers-react';




function App() {

  const [showIssueForm, setShowIssueForm] = useState(false);
  const user = useUser();
  console.log('Logged-in user', user);

  const handleSubmit = () => {
    alert('Query submitted!');
  };

  const toggleIssueForm = () => {
    setShowIssueForm(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-blue-500 text-black font-sans">
      <header className="bg-blue-900 text-white p-6 text-center text-2xl font-bold">
        Civic Awareness Platform
      </header>
      
      <main className="p-6">
        {user && (
    <div className="text-center mb-6">
      <MyMapButton user={user} />
    </div>
        )}
        <div className="text-center mb-6">
          <Button text="Submit Query" onClick={handleSubmit} />
          <Button text={showIssueForm ? 'Hide Issue Form' : 'Report an Issue'} onClick={toggleIssueForm} />
          <Button text="View Petitions" onClick={() => alert('Viewing petitions...')} />
        </div>

        <form className="bg-gray-200 p-4 rounded shadow-md mb-6">
          <label className="block mb-2 font-semibold">Your Query</label>
          <input
            type="text"
            placeholder="Type your concern..."
            className="w-full p-2 border rounded mb-4"
          />
          <Button text="Submit" onClick={handleSubmit} />
        </form>

        {showIssueForm && <IssueForm />}
        <LiveIssues />

        <div className="bg-gray-200 p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Trending Issues</h2>
          <Report title="Flood Alert" description="Heavy rains in region..." />
          <Report title="Disease Outbreak" description="Cases rising in urban zones..." />
          <Report title="Protest Movement" description="Citizens demand clean water..." />
        </div>
      </main>
    </div>
  );
}

export default App;
