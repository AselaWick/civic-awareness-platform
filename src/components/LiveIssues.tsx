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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('❌ Fetch error:', error.message);
      } else {
        console.log('✅ Fetched issues:', data);
        setIssues(data || []);
      }
      setLoading(false);
    };

    fetchIssues();

    const subscription = supabase
      .channel('public:issues')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'issues' },
        payload => {
          console.log('📡 New issue received:', payload.new);
          if (payload.new) {
            setIssues(prev => [payload.new as Issue, ...prev]);
          }
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
      {loading ? (
        <p className="text-sm text-gray-600">Loading issues...</p>
      ) : issues.length === 0 ? (
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
