import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search by title, description, genre
  const [languageFilter, setLanguageFilter] = useState(""); // Filter by language
  const [genreFilter, setGenreFilter] = useState(""); // Filter by genre
  const [difficultyFilter, setDifficultyFilter] = useState(""); // Filter by difficulty
  const [cafeFilter, setCafeFilter] = useState(""); // Filter by cafe location

  useEffect(() => {
    async function getPosts() {
      const url =
        "https://baaa-spilcafeen-default-rtdb.europe-west1.firebasedatabase.app/posts.json";
      const response = await fetch(url);
      const data = await response.json();
      const postsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })); // from object to array
      setPosts(postsArray);
    }
    getPosts();
  }, []);

  // Filter posts based on search query and filters
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      (post.title?.toLowerCase().includes(searchQuery.toLowerCase()) || // Null check for title
        post.body?.toLowerCase().includes(searchQuery.toLowerCase()) || // Null check for body
        post.genre?.toLowerCase().includes(searchQuery.toLowerCase())) ??
      false; // Null check for genre

    const matchesLanguage = languageFilter
      ? post.language === languageFilter
      : true;

    const matchesGenre = genreFilter ? post.genre === genreFilter : true;

    const matchesDifficulty = difficultyFilter
      ? post.difficulty === difficultyFilter
      : true;

    const matchesCafe = cafeFilter
      ? post[`location${cafeFilter}`] // Check if the selected cafe location has a value
      : true;

    return (
      matchesSearch &&
      matchesLanguage &&
      matchesGenre &&
      matchesDifficulty &&
      matchesCafe
    );
  });

  // Get unique values for filters (language, genre, difficulty, cafes)
  const uniqueLanguages = [...new Set(posts.map((post) => post.language))];
  const uniqueGenres = [...new Set(posts.map((post) => post.genre))];
  const uniqueDifficulties = [...new Set(posts.map((post) => post.difficulty))];
  const cafes = ["Vestergade", "Fredensgade", "Aalborg", "Kolding"]; // List of cafes

  return (
    <section className="page">
      {/* Search Bar */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by title, description, or genre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        {/* Filter by Language */}
        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Languages</option>
          {uniqueLanguages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>

        {/* Filter by Genre */}
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Genres</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        {/* Filter by Difficulty */}
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Difficulties</option>
          {uniqueDifficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>

        {/* Filter by Cafe Location */}
        <select
          value={cafeFilter}
          onChange={(e) => setCafeFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Cafes</option>
          {cafes.map((cafe) => (
            <option key={cafe} value={cafe}>
              {cafe}
            </option>
          ))}
        </select>
      </div>

      {/* Display Filtered Posts */}
      {filteredPosts.length > 0 ? (
        <section className="flex-container">
          {filteredPosts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </section>
      ) : (
        <p>No matching games found.</p>
      )}
    </section>
  );
}
