import React, { useState } from 'react';
import  supabase  from '../supabaseClient';
import Button from './Button';

const IssueForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('issues').insert([
      {
        title,
        description,
        location: {
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        },
        votes: 0
      }
    ]);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Issue submitted successfully!');
      setTitle('');
      setDescription('');
      setLat('');
      setLng('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-6">
      <label className="block mb-2 font-semibold">Title</label>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Issue title"
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label className="block mb-2 font-semibold">Description</label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Describe the issue..."
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label className="block mb-2 font-semibold">Latitude</label>
      <input
        type="text"
        value={lat}
        onChange={e => setLat(e.target.value)}
        placeholder="e.g. 23.6102"
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label className="block mb-2 font-semibold">Longitude</label>
      <input
        type="text"
        value={lng}
        onChange={e => setLng(e.target.value)}
        placeholder="e.g. 58.5453"
        className="w-full p-2 border rounded mb-4"
        required
      />

      <Button text="Submit Issue" onClick={() => {}} />
    </form>
  );
};

export default IssueForm;
