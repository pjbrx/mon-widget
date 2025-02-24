// Injecter le CSS dans le document
const styles = `
    /* Animation de pulse */
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.015); }
        100% { transform: scale(1); }
    }

    /* Conteneur du popup */
    .popup-container {
        position: fixed;
        bottom: 120px;
        right: 20px;
        background-color: white;
        color: black;
        font-family: Arial, sans-serif;
        font-size: 12px;
        padding: 12px 15px;
        border-radius: 8px;
        display: none;
        z-index: 1000;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        width: 220px;
        border: 1px solid #ddd;
        animation: fadeIn 0.5s ease-in-out;
    }

    /* Pointe de la bulle */
    .popup-container::after {
        content: "";
        position: absolute;
        bottom: -10px;
        right: 20px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid white;
    }

    /* Animation d'apparition */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Contenu du popup */
    .popup-content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }

    /* Texte "Questions ..." en gras */
    .popup-text {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 4px;
    }

    /* Texte "Parlez avec notre assistant !" non gras */
    .popup-text-normal {
        font-weight: normal;
        font-size: 12px;
        margin-bottom: 8px;
    }

    /* Ligne Cléa est en ligne */
    .popup-header {
        display: flex;
        align-items: center;
        align-self: flex-start;
    }

    /* Point vert indiquant que Cléa est en ligne */
    .online-dot {
        width: 8px;
        height: 8px;
        background-color: green;
        border-radius: 50%;
        display: inline-block;
        margin-right: 6px;
    }

    /* Texte "Cléa est en ligne" en bleu */
    .popup-online-text {
        color: #007bff;
        font-weight: bold;
        font-size: 12px;
    }

    /* Bouton de fermeture (croix X) */
    .popup-close {
        position: absolute;
        top: 5px;
        right: 10px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        color: black;
    }
    .popup-close:hover {
        color: red;
    }

    /* Conteneur principal du widget */
    .floating-widget-container {
        position: fixed;
        bottom: -12px;
        right: -40px;
        width: 300px;
        height: 150px;
        pointer-events: none;
        z-index: 1001;
        animation: pulse 2s infinite;
    }

    /* SVG - Widget avec trou rectangulaire */
    .widget-shape {
        width: 100%;
        height: 100%;
    }

    /* Permettre les interactions uniquement sur la partie colorée du SVG */
    .widget-shape path {
        pointer-events: auto;
    }

    /* Style pour le texte */
    .widget-text {
        position: fixed;
        bottom: 104px;
        right: 20px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: white;
        background-color: rgba(0, 0, 0, 0.15);
        padding: 8px 12px;
        border-radius: 5px;
        pointer-events: auto;
    }

    /* Style pour l'image ronde */
    .widget-image {
        position: absolute;
        top: 54px;
        left: 17%;
        transform: translateX(-50%);
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 0px solid white;
        object-fit: cover;
        z-index: 999;
    }

    /* Lien du logo */
    .widget-image-link {
        position: absolute;
        top: 0px;
        left: 14%;
        transform: translateX(-50%);
        z-index: 999;
        pointer-events: auto;
    }
`;

// Injecter le CSS dans le document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Injecter le HTML dans le document
const widgetHTML = `
    <!-- Conteneur du widget avec SVG -->
    <div class="floating-widget-container">
        <a href="https://mon-widget.vercel.app/" class="widget-image-link">
            <img src="logo_cléa.jpg" alt="Logo Cléa" class="widget-image">
        </a>
        <svg class="widget-shape" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
            <!-- Forme du widget avec un trou réellement traversable -->
            <path d="
                M 32,40
                L 208,40
                A 35 33 0 0 1 208,105
                L 32,105
                A 35 33 0 0 1 32,40
                Z
                
                M 85,55
                L 190,55
                A 15 15 0 0 1 190,90
                L 85,90
                A 15 15 0 0 1 85,55
                Z
            " fill="rgb(0, 128, 255)" stroke="white" stroke-width="0" fill-rule="evenodd"/>
        </svg>
    </div>

    <!-- Popup de message -->
    <div id="popup-message" class="popup-container">
        <div class="popup-content">
            <span id="close-popup" class="popup-close">&times;</span>
            <!-- Texte "Questions ..." en gras -->
            <p class="popup-text">Questions ?</p>
            <!-- Texte "Parlez avec notre assistant !" non gras -->
            <p class="popup-text-normal">Parlez avec notre assistant IA !</p>
            <!-- Ligne "Cléa est en ligne" en dessous -->
            <div class="popup-header">
                <span class="online-dot"></span>
                <span class="popup-online-text">Cléa est en ligne</span>
            </div>
        </div>
    </div>
`;

// Injecter le HTML dans le body
document.body.insertAdjacentHTML("beforeend", widgetHTML);

// Script pour gérer le popup
setTimeout(function() {
    document.getElementById("popup-message").style.display = "block";
}, 5000); // Afficher le popup après 5 secondes

document.getElementById("close-popup").addEventListener("click", function() {
    document.getElementById("popup-message").style.display = "none";
});

// Widget ElevenLabs
const elevenLabsWidget = document.createElement("elevenlabs-convai");
elevenLabsWidget.setAttribute("agent-id", "uY98U5YsfR4bGJgXlAKE");
document.body.appendChild(elevenLabsWidget);

const script = document.createElement("script");
script.src = "https://elevenlabs.io/convai-widget/index.js";
script.async = true;
script.type = "text/javascript";
document.body.appendChild(script);