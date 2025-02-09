const API_BASE_URL = "https://gamesrecord.onrender.com"; // Replace with your actual Render URL

const handleSearch = async () => {
    if (!searchQuery.trim()) return; // Prevent empty searches
    setLoading(true);
    setError(null);

    try {
        const response = await axios.get(`${API_BASE_URL}/api/games`, {
            params: { search: searchQuery },
        });

        setGames(response.data);
    } catch (err) {
        setError("Failed to fetch games");
        console.error(err);
    } finally {
        setLoading(false);
    }
};
