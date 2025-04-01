import { useNavigate } from 'react-router-dom';

function AboutButton() {
    const navigate = useNavigate();

    return (
    <button onClick={() => navigate('/about')} className="about-btn">
        Aller à la page "À propos"
    </button>
    );
}

export default AboutButton;