import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import VoteButtons from './VoteButtons';

interface Issue {
  id: string;
  title: string;
  description: string;
  location: { lat: number; lng: number };
  timestamp: string;
  upvotes: number;
  downvotes: number;
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
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'issues'
        },
        payload => {
          const updatedIssue = payload.new as Issue;
          console.log('🔄 Realtime update received:', updatedIssue);
          setIssues(prev =>
            prev.map(issue =>
              issue.id === updatedIssue.id ? updatedIssue : issue
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="bg-gray-200 p-4 rounded shadow-md mb-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Live Issues</h2>
      {loading ? (
        <p className="text-sm text-gray-600">Loading issues...</p>
      ) : issues.length === 0 ? (
        <p className="text-sm text-gray-600">No issues reported yet.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Latitude</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Longitude</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Votes</th>
            </tr>
          </thead>
          <tbody>
            {issues.map(issue => (
              <tr key={issue.id} className="border-t border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-800">{issue.title}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{issue.description}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{issue.location?.lat}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{issue.location?.lng}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  <VoteButtons
                    issueId={issue.id}
                    currentUpvotes={issue.upvotes}
                    currentDownvotes={issue.downvotes}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LiveIssues;
