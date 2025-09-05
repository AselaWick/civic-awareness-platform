import './App.css';
import Button from './components/Button';
import Report from './components/Report';
import IssueForm from './components/IssueForm';
import { useState } from 'react';
import LiveIssues from './components/LiveIssues';

function App() {
  const [showIssueForm, setShowIssueForm] = useState(false);

  const handleSubmit = () => {
    alert('Query submitted!');
  };

  const handleSubmitQuery = () => {
    setShowIssueForm(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 font-sans">
      <header className="bg-blue-900 text-white p-6 text-center text-2xl font-bold">
        Civic Awareness Platform
      </header>

      <main className="p-6">
        <div className="text-center mb-6">
          <Button text="Submit Query" onClick={handleSubmit} />
          <Button text="Report an Issue" onClick={() => alert('Issue reported!')} />
          <Button text="View Petitions" onClick={() => alert('Viewing petitions...')} />
        </div>

        <form className="bg-white p-4 rounded shadow-md mb-6">
          <label className="block mb-2 font-semibold">Your Query</label>
          <input
            type="text"
            placeholder="Type your concern..."
            className="w-full p-2 border rounded mb-4"
          />
          <Button text="Submit" onClick={handleSubmit} />
        </form>

        {showIssueForm && <IssueForm />}
        <LiveIssues /> {/* Real-time feed replaces static reports */}

        <div className="bg-white p-4 rounded shadow-md">
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
