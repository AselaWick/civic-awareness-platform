import { jsxs as _jsxs } from "react/jsx-runtime";
import { supabase } from '../supabaseClient';
const VoteButtons = ({ issueId, currentUpvotes, currentDownvotes }) => {
    const handleVote = async (field) => {
        const newValue = field === 'upvotes' ? currentUpvotes + 1 : currentDownvotes + 1;
        const { error } = await supabase
            .from('map_issues') // ✅ updated table name
            .update({ [field]: newValue })
            .eq('id', issueId);
        if (error) {
            console.error(`❌ Error updating ${field}:`, error.message);
        }
        else {
            console.log(`✅ ${field} updated for issue ${issueId}`);
        }
    };
    return (_jsxs("div", { className: "flex gap-2", children: [_jsxs("button", { onClick: () => handleVote('upvotes'), className: "px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700", children: ["\uD83D\uDC4D ", currentUpvotes] }), _jsxs("button", { onClick: () => handleVote('downvotes'), className: "px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700", children: ["\uD83D\uDC4E ", currentDownvotes] })] }));
};
export default VoteButtons;
