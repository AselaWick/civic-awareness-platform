import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
const MyMapButton = ({ user }) => {
    const [pageId, setPageId] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrCreatePage = async () => {
            if (!user?.id)
                return;
            try {
                const { data, error } = await supabase
                    .from('user_pages')
                    .select('id')
                    .eq('owner_id', user.id)
                    .single();
                if (data) {
                    setPageId(data.id);
                }
                else if (error?.code === 'PGRST116') {
                    const { data: newPage, error: createError } = await supabase
                        .from('user_pages')
                        .insert([
                        {
                            owner_id: user.id,
                            title: 'My Civic Page',
                            description: '',
                            map_center: { lat: 23.6, lng: 58.5 }, // Muscat region
                            visibility: 'public',
                        },
                    ])
                        .select()
                        .single();
                    if (newPage)
                        setPageId(newPage.id);
                    if (createError)
                        console.error('Error creating page:', createError);
                }
                else {
                    console.error('Unexpected error fetching page:', error);
                }
            }
            catch (err) {
                console.error('Error in fetchOrCreatePage:', err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchOrCreatePage();
    }, [user]);
    if (!user || loading || !pageId)
        return null;
    return (_jsx("button", { className: "bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700", onClick: () => navigate(`/user/${user.id}/page/${pageId}`), children: "\uD83D\uDDFA\uFE0F My Map" }));
};
export default MyMapButton;
