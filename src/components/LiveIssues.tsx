import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import Report from './Report';

interface Issue {
  id: string;
  title: string;
  description: string;
  location: any;
  timestamp: string;
  votes: number;
}

const LiveIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    // Initial fetch
    const fetchIssues = async () => {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('timestamp', { ascending: false });

      if (!error && data) setIssues(data);
    };

    fetchIssues();

    // Realtime subscription
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
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Live Issues</h2>
      {issues.map(issue => (
        <Report key={issue.id} title={issue.title} description={issue.description} />
      ))}
    </div>
  );
};

export default LiveIssues;
