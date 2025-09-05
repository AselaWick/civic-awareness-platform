import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Report from './Report';

interface Issue {
  id: string;
  title: string;
  description: string;
  location: { lat: number; lng: number };
  timestamp: string;
  votes: number;
}

const LiveIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('Fetch error:', error);
      } else {
        console.log('Fetched issues:', data);
        setIssues(data || []);
      }
    };

    fetchIssues();

    const subscription = supabase
      .channel('public:issues')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'issues' },
        payload => {
          setIssues(prev => [payload.new as Issue, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="bg-gray-200 p-4 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">Live Issues</h2>
      {issues.length === 0 ? (
        <p className="text-sm text-gray-600">No issues reported yet.</p>
      ) : (
        issues.map(issue => (
          <Report key={issue.id} title={issue.title} description={issue.description} />
        ))
      )}
    </div>
  );
};

export default LiveIssues;
