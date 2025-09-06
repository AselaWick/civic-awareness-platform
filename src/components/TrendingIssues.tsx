import React from 'react';

const TrendingIssues = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Trending Issues</h2>
      <ul className="list-disc pl-5 text-sm text-gray-700">
        <li>Flood Alert: Heavy rains in region causing road blockages</li>
        <li>Disease Outbreak: Cases rising in urban zones</li>
        <li>Protest Movement: Citizens demand clean water</li>
      </ul>
    </div>
  );
};

export default TrendingIssues;
