import { useEffect, useState } from "react";
import imgPlaceholder from "../assets/img/img-placeholder.jpg";
import styles from "./PostForm.module.css";

export default function PostForm({ savePost, post }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [min_players, setMinPlayers] = useState("");
  const [max_players, setMaxPlayers] = useState("");
  const [age, setAge] = useState("");
  const [duration, setDuration] = useState("");
  const [languages, setLanguages] = useState([]); // Array to store multiple languages
  const [genre, setGenre] = useState("");

  const [locationVestergade, setLocationVestergade] = useState("");
  const [locationFredensgade, setLocationFredensgade] = useState("");
  const [locationAalborg, setLocationAalborg] = useState("");
  const [locationKolding, setLocationKolding] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (post) {
      // if post, set the states with values from the post object.
      // The post object is a prop, passed from UpdatePage
      setTitle(post.title);
      setBody(post.body);
      setDifficulty(post.difficulty);
      setImageFile(post.image);
      setVideoFile(post.video);
      setMinPlayers(post.min_players);
      setMaxPlayers(post.max_players);
      setAge(post.age);
      setDuration(post.duration);
      setLanguages(post.languages || []); // Initialize languages as an array
      setGenre(post.genre);
      setLocationVestergade(post.locationVestergade);
      setLocationFredensgade(post.locationFredensgade);
      setLocationFredensgade(post.locationFredensgade);
      setLocationAalborg(post.locationAalborg);
      setLocationKolding(post.locationKolding);
    }
  }, [post]); // useEffect is called every time post changes.

  // Handle language selection
  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setLanguages([...languages, value]); // Add language to the array
    } else {
      setLanguages(languages.filter((lang) => lang !== value)); // Remove language from the array
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      // create a new object to store the value from states / input fields
      title: title,
      image: imageFile,
      video: videoFile,
      body: body,
      difficulty: difficulty,
      min_players: min_players,
      max_players: max_players,
      age: age,
      duration: duration,
      languages: languages, // Store multiple languages as an array
      genre: genre,
      locationVestergade: locationVestergade,
      locationFredensgade: locationFredensgade,
      locationAalborg: locationAalborg,
      locationKolding: locationKolding,
    };

    const validForm = formData.title && formData.body && formData.image; // will return false if one of the properties doesn't have a value
    if (validForm) {
      // if all fields/ properties are filled, then call savePost
      savePost(formData);
    } else {
      // if not, set errorMessage state.
      setErrorMessage("Please, fill in all fields.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Board Game Name
        <input
          type="text"
          value={title}
          placeholder="Type a title"
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          maxLength="100"
        />
      </label>
      <label>
        Difficulty level <br />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <label>
        Genre
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select genre</option>
          <option value="deck-building">Deck-building</option>
          <option value="strategy">Strategy</option>
          <option value="family">Family</option>
          <option value="party">Party</option>
          <option value="thematic">Thematic</option>
          <option value="abstract">Abstract</option>
          <option value="cooperation">Cooperation</option>
          <option value="card">Card</option>
          <option value="team">Team</option>
        </select>
      </label>
      <h4> Number of Players</h4>
      <div className={styles.players}>
        <label>
          From
          <input
            value={min_players}
            type="number"
            onChange={(e) => setMinPlayers(e.target.value)}
            placeholder="Minimum"
            className={styles.inputSmall}
            min="1"
          />
        </label>
        <label>
          To
          <input
            value={max_players}
            type="number"
            onChange={(e) => setMaxPlayers(e.target.value)}
            placeholder="Maximum"
            className={styles.inputSmall}
            max="20"
          />
        </label>
      </div>

      <label>
        Mininimum age
        <input
          type="number"
          value={age}
          placeholder="Type a body text"
          onChange={(e) => setAge(e.target.value)}
          className={styles.input}
          max="99"
        />
      </label>

      <label>
        Avegare game duration
        <input
          type="number"
          value={duration}
          placeholder="Type a body text"
          onChange={(e) => setDuration(e.target.value)}
          className={styles.input}
          max="999"
        />
      </label>

      <label>
        Game languages
        <br />
        <div className={styles.languageCheckboxes}>
          <label>
            <input
              type="checkbox"
              value="english"
              checked={languages.includes("english")}
              onChange={handleLanguageChange}
            />{" "}
            English
          </label>
          <label>
            <input
              type="checkbox"
              value="danish"
              checked={languages.includes("danish")}
              onChange={handleLanguageChange}
            />{" "}
            Danish
          </label>
        </div>
      </label>

      <label>
        Description
        <textarea
          value={body}
          placeholder="Type a body text"
          onChange={(e) => setBody(e.target.value)}
          className={styles.input}
          rows={6}
        />
      </label>

      <label>
        Image URL
        <input
          type="text"
          value={imageFile}
          onChange={(e) => setImageFile(e.target.value)}
          className={styles.input}
        />
        <img
          className={styles.imagePreview}
          src={imageFile}
          alt="Choose"
          onError={(event) => (event.target.src = imgPlaceholder)}
        />
      </label>
      <label>
        Video tutorial URL
        <input
          type="text"
          value={videoFile}
          onChange={(e) => setVideoFile(e.target.value)}
          className={styles.input}
        />
      </label>
      <h4>Location on shelves:</h4>
      <div className={styles.locationContainer}>
        <label>
          In Vestergade
          <input
            type="text"
            value={locationVestergade}
            placeholder="Shelf index"
            onChange={(e) => setLocationVestergade(e.target.value)}
            className={styles.inputSmall}
            maxLength="4"
          />
        </label>
        <label>
          In Fredensgade
          <input
            type="text"
            value={locationFredensgade}
            placeholder="Shelf index"
            onChange={(e) => setLocationFredensgade(e.target.value)}
            className={styles.inputSmall}
            maxLength="4"
          />
        </label>
        <label>
          In Aalborg
          <input
            type="text"
            value={locationAalborg}
            placeholder="Shelf index"
            onChange={(e) => setLocationAalborg(e.target.value)}
            className={styles.inputSmall}
            maxLength="4"
          />
        </label>
        <label>
          In Kolding
          <input
            type="text"
            value={locationKolding}
            placeholder="Shelf index"
            onChange={(e) => setLocationKolding(e.target.value)}
            className={styles.inputSmall}
            maxLength="4"
          />
        </label>
      </div>
      <p className={styles.textError}>{errorMessage}</p>
      <button type="submit">Save</button>
    </form>
  );
}
