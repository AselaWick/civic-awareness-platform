import React from 'react';
import { supabase } from '../supabaseClient';

interface VoteButtonsProps {
  issueId: string;
  currentUpvotes: number;
  currentDownvotes: number;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
  issueId,
  currentUpvotes,
  currentDownvotes
}) => {
  const handleVote = async (field: 'upvotes' | 'downvotes') => {
    const newValue = field === 'upvotes' ? currentUpvotes + 1 : currentDownvotes + 1;

    const { error } = await supabase
      .from('map_issues') // ✅ updated table name
      .update({ [field]: newValue })
      .eq('id', issueId);

    if (error) {
      console.error(`❌ Error updating ${field}:`, error.message);
    } else {
      console.log(`✅ ${field} updated for issue ${issueId}`);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleVote('upvotes')}
        className="px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
      >
        👍 {currentUpvotes}
      </button>
      <button
        onClick={() => handleVote('downvotes')}
        className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
      >
        👎 {currentDownvotes}
      </button>
    </div>
  );
};

export default VoteButtons;
