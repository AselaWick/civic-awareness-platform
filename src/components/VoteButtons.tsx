import React from 'react';
import { supabase } from '../supabaseClient';

interface VoteButtonsProps {
  issueId: string;
  currentUpvotes: number;
  currentDownvotes: number;
  onVoteUpdate?: () => void;
}

const VoteButtons = ({
  issueId,
  currentUpvotes,
  currentDownvotes,
  onVoteUpdate
}: VoteButtonsProps) => {
  const handleUpvote = async () => {
    const { error } = await supabase
      .from('issues')
      .update({ upvotes: currentUpvotes + 1 })
      .eq('id', issueId);

    if (error) {
      console.error('❌ Upvote error:', error.message);
    } else {
      console.log(`👍 Upvoted issue ${issueId}`);
      if (onVoteUpdate) onVoteUpdate();
    }
  };

  const handleDownvote = async () => {
    const { error } = await supabase
      .from('issues')
      .update({ downvotes: currentDownvotes + 1 })
      .eq('id', issueId);

    if (error) {
      console.error('❌ Downvote error:', error.message);
    } else {
      console.log(`👎 Downvoted issue ${issueId}`);
      if (onVoteUpdate) onVoteUpdate();
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <button onClick={handleUpvote}>
          <img src="/icons/like.svg" alt="Upvote" className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium">{currentUpvotes}</span>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={handleDownvote}>
          <img src="/icons/dislike.svg" alt="Downvote" className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium">{currentDownvotes}</span>
      </div>
    </div>
  );
};

export default VoteButtons;
