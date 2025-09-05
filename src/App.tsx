import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 font-sans">
      <header className="bg-blue-900 text-white p-6 text-center text-2xl font-bold">
        See the world. Change the world.
      </header>

      <main className="p-6">
        <div className="text-center mb-6">
          <button className="bg-blue-700 text-white px-4 py-2 rounded mr-2">Submit Query</button>
          <button className="bg-blue-700 text-white px-4 py-2 rounded mr-2">Report an Issue</button>
          <button className="bg-blue-700 text-white px-4 py-2 rounded">View Petitions</button>
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Trending Issues</h2>
          <ul>
            <li className="border-b py-2">
              <strong>Incident Reported:</strong> Disease found in city...
            </li>
            <li className="border-b py-2">
              <strong>News Headline:</strong> Environmental alert...
            </li>
            <li className="border-b py-2">
              <strong>Breaking Event:</strong> Flooding in region...
            </li>
            <li className="py-2">
              <strong>Social Issue:</strong> Resident protests...
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
