import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <Link to="">Board games</Link>
            <Link to="create">Add board game</Link>
        </nav>
    );
}
