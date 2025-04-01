import { Link } from 'react-router-dom';

export default function Home() {
    return (
    <div>
        <h1>Accueil</h1>
        <Link to="/about">Aller à la page "À propos"</Link>
    </div>
    );
}