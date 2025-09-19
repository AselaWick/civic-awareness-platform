import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import VoteButtons from './VoteButtons';
import MapView from './MapView';

interface Issue {
  id: string;
  title: string;
  description: string;
  location: { lat: number; lng: number };
  type: 'news' | 'emergency' | 'sport' | 'conflicts' | 'other';
  timestamp: string;
  upvotes: number;
  downvotes: number;
  location_name?: string;
}

const LiveIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<Issue['type'] | ''>('');

  useEffect(() => {
    const fetchIssues = async () => {
      const { data, error } = await supabase
        .from('map_issues')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('❌ Fetch error:', error.message);
      } else {
        setIssues(data || []);
      }
      setLoading(false);
    };

    fetchIssues();

    const subscription = supabase
      .channel('public:map_issues')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'map_issues' },
        payload => {
          const updated = payload.new as Issue;
          setIssues(prev =>
            prev.map(i => (i.id === updated.id ? updated : i))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // 1. Apply search + type filter
  const filteredIssues = issues.filter(issue => {
    const q = searchQuery.toLowerCase();
    const matchesText =
      issue.title.toLowerCase().includes(q) ||
      issue.description.toLowerCase().includes(q) ||
      (issue.location_name || '')
        .toLowerCase()
        .includes(q);

    const matchesType = filterType === '' || issue.type === filterType;
    return matchesText && matchesType;
  });

  // 2. Issues for the map (strong feedback)
  const mapEligibleIssues = issues.filter(
    issue => issue.upvotes >= 5 || issue.downvotes >= 5
  );

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Live Issues</h2>

      {loading ? (
        <p className="text-sm text-gray-600">Loading issues...</p>
      ) : issues.length === 0 ? (
        <p className="text-sm text-gray-600">No issues reported yet.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search + Filter */}
          <div className="lg:w-1/2 flex flex-wrap gap-4 mb-4">
            <input
              type="text"
              placeholder="Search title, description or location…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded shadow-sm text-sm"
            />
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value as Issue['type'] | '')}
              className="px-4 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="">All Types</option>
              <option value="news">News</option>
              <option value="emergency">Emergency</option>
              <option value="sport">Sport</option>
              <option value="conflicts">Conflicts</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Table Section */}
          <div className="lg:w-1/2 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Upvotes
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Downvotes
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredIssues.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-2 text-sm text-gray-500 text-center"
                    >
                      No matching issues found.
                    </td>
                  </tr>
                ) : (
                  filteredIssues.map(issue => {
                    const isMapVisible =
                      issue.upvotes >= 5 || issue.downvotes >= 5;
                    const displayLocation =
                      issue.location_name ||
                      `${issue.location.lat.toFixed(4)}, ${issue.location.lng.toFixed(
                        4
                      )}`;

                    return (
                      <tr
                        key={issue.id}
                        className={`border-t border-gray-200 ${
                          isMapVisible ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {issue.title}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {issue.description}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {issue.type}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {displayLocation}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {issue.upvotes}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {issue.downvotes}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          <VoteButtons
                            issueId={issue.id}
                            currentUpvotes={issue.upvotes}
                            currentDownvotes={issue.downvotes}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Map Section */}
          <div className="lg:w-1/2">
            <MapView issues={mapEligibleIssues} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveIssues;
