import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { supabase } from '../supabaseClient';
const VoteButtons = ({ issueId, currentVotes, onVoteUpdate }) => {
    const handleVote = async (delta) => {
        const { error } = await supabase
            .from('issues')
            .update({ votes: currentVotes + delta })
            .eq('id', issueId);
        if (error) {
            console.error('❌ Vote error:', error.message);
        }
        else {
            console.log(`✅ Vote ${delta > 0 ? 'upvoted' : 'downvoted'} for issue ${issueId}`);
            if (onVoteUpdate)
                onVoteUpdate();
        }
    };
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => handleVote(1), children: _jsx("img", { src: "/icons/like.svg", alt: "Upvote", className: "w-5 h-5" }) }), _jsx("span", { className: "text-sm font-medium", children: currentVotes }), _jsx("button", { onClick: () => handleVote(-1), children: _jsx("img", { src: "/icons/dislike.svg", alt: "Downvote", className: "w-5 h-5" }) })] }));
};
export default VoteButtons;
