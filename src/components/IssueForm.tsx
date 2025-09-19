import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import Button from './Button';

// Define a shorthand for your enum type
type IssueType = 'news' | 'emergency' | 'sport' | 'conflicts' | 'other';

const IssueForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  // Allow '' in the union so useState('') is legal
  const [issueType, setIssueType] = useState<IssueType | ''>('');
  const [lat, setLat] = useState<string>('');
  const [lng, setLng] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!title || !description || !issueType || !lat || !lng) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    setLoading(true);

    const newIssue = {
      title,
      description,
      type: issueType,               // ← matches your `type` enum column
      location: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      upvotes: 0,
      downvotes: 0,
    };

    console.log('Inserting payload:', newIssue);

    const { data, error } = await supabase
      .from('map_issues')           // ← your exact table name
      .insert([newIssue])
      .select();                    // ← return the inserted row

    setLoading(false);

    if (error) {
      console.error('❌ Submission error:', error.message);
      alert('Submission failed: ' + error.message);
      return;
    }

    console.log('✅ Inserted row:', data?.[0]);
    alert('Issue submitted!');

    // Reset form
    setTitle('');
    setDescription('');
    setIssueType('');
    setLat('');
    setLng('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 p-4 rounded shadow-md mb-6"
    >
      <label htmlFor="issue-title" className="block mb-2 font-semibold">
        Title
      </label>
      <input
        id="issue-title"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Issue title"
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label htmlFor="issue-description" className="block mb-2 font-semibold">
        Description
      </label>
      <textarea
        id="issue-description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Describe the issue..."
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label htmlFor="issue-type" className="block mb-2 font-semibold">
        Type
      </label>
      <select
        id="issue-type"
        value={issueType}
        onChange={e =>
          setIssueType(e.target.value as IssueType)
        }
        className="w-full p-2 border rounded mb-4 bg-white"
        required
      >
        <option value="" disabled>
          — Select a type —
        </option>
        <option value="news">News</option>
        <option value="emergency">Emergency</option>
        <option value="sport">Sport</option>
        <option value="conflicts">Conflicts</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="issue-lat" className="block mb-2 font-semibold">
        Latitude
      </label>
      <input
        id="issue-lat"
        type="number"
        value={lat}
        onChange={e => setLat(e.target.value)}
        placeholder="e.g. 23.6102"
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label htmlFor="issue-lng" className="block mb-2 font-semibold">
        Longitude
      </label>
      <input
        id="issue-lng"
        type="number"
        value={lng}
        onChange={e => setLng(e.target.value)}
        placeholder="e.g. 58.5453"
        className="w-full p-2 border rounded mb-4"
        required
      />

      <Button
        text={loading ? 'Submitting...' : 'Submit Issue'}
        type="submit" // no extra onClick
        onClick={function (): void {
          throw new Error('Function not implemented.');
        } }      />
    </form>
  );
};

export default IssueForm;
