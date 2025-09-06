// VoteButtons.tsx
import React from 'react';
import { supabase } from '../supabaseClient';

interface VoteButtonsProps {
  issueId: string;
  currentVotes: number;
  onVoteUpdate?: () => void;
}

const VoteButtons = ({ issueId, currentVotes, onVoteUpdate }: VoteButtonsProps) => {
  const handleVote = async (delta: number) => {
    const { error } = await supabase
      .from('issues')
      .update({ votes: currentVotes + delta })
      .eq('id', issueId);

    if (error) {
      console.error('❌ Vote error:', error.message);
    } else {
      console.log(`✅ Vote ${delta > 0 ? 'upvoted' : 'downvoted'} for issue ${issueId}`);
      if (onVoteUpdate) onVoteUpdate();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => handleVote(1)}>
        <img src="/icons/like.svg" alt="Upvote" className="w-5 h-5" />
      </button>
      <span className="text-sm font-medium">{currentVotes}</span>
      <button onClick={() => handleVote(-1)}>
        <img src="/icons/dislike.svg" alt="Downvote" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default VoteButtons;
