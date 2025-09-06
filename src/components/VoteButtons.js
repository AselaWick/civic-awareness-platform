import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { supabase } from '../supabaseClient';
const VoteButtons = ({ issueId, currentUpvotes, currentDownvotes, onVoteUpdate }) => {
    const handleUpvote = async () => {
        const { error } = await supabase
            .from('issues')
            .update({ upvotes: currentUpvotes + 1 })
            .eq('id', issueId);
        if (error) {
            console.error('❌ Upvote error:', error.message);
        }
        else {
            console.log(`👍 Upvoted issue ${issueId}`);
            if (onVoteUpdate)
                onVoteUpdate();
        }
    };
    const handleDownvote = async () => {
        const { error } = await supabase
            .from('issues')
            .update({ downvotes: currentDownvotes + 1 })
            .eq('id', issueId);
        if (error) {
            console.error('❌ Downvote error:', error.message);
        }
        else {
            console.log(`👎 Downvoted issue ${issueId}`);
            if (onVoteUpdate)
                onVoteUpdate();
        }
    };
    return (_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: handleUpvote, children: _jsx("img", { src: "/icons/like.svg", alt: "Upvote", className: "w-1 h-1" }) }), _jsx("span", { className: "text-sm font-medium", children: currentUpvotes })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: handleDownvote, children: _jsx("img", { src: "/icons/dislike.svg", alt: "Downvote", className: "w-1 h-1" }) }), _jsx("span", { className: "text-sm font-medium", children: currentDownvotes })] })] }));
};
export default VoteButtons;
