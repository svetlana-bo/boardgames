import { useNavigate } from "react-router-dom";
import placeholder from "../assets/img/img-placeholder.jpg";
import styles from "./PostCard.module.css";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`posts/${post.id}`);
  }

  return (
    <article className={styles.card} onClick={handleClick}>
      <div className={styles.imageContainer}>
        {post.image && (
          <img
            src={post.image.includes("undefined") ? placeholder : post.image}
            alt={post.title}
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{post.title}</h2>
        <div className={styles.details}>
          <p className={styles.difficulty}>
            <strong>Difficulty:</strong> {post.difficulty}
          </p>
          <p className={styles.players}>
            <strong>Players:</strong> {post.min_players} - {post.max_players}
          </p>
          <p className={styles.age}>
            <strong>Age:</strong> {post.age}+
          </p>
          <p className={styles.duration}>
            <strong>Duration:</strong> {post.duration} minutes
          </p>
          <p className={styles.language}>
            <strong>Language:</strong> {post.language}
          </p>
          <p className={styles.genre}>
            <strong>Genre:</strong> {post.genre}
          </p>
        </div>
        <p className={styles.description}>{post.body}</p>
      </div>
      <div className={styles.locations}>
        <h4>Locations:</h4>
        <div className={styles.locationGrid}>
          <p>Vestergade: {post.locationVestergade}</p>
          <p>Fredensgade: {post.locationFredensgade}</p>
          <p>Aalborg: {post.locationAalborg}</p>
          <p>Kolding: {post.locationKolding}</p>
        </div>
      </div>
    </article>
  );
}
