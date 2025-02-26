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
        right: 32px;
        background-color: rgb(255,255,255);
        color: black;
        font-family: Arial, sans-serif;
        font-size: 12px;
        padding: 12px 15px;
        border-radius: 8px;
        display: none;
        z-index: 1002;
        box-shadow: 
        0 0 12px rgba(0, 0, 0, 0.1), /* Couche 1 : ombre très proche et légère */
        0 0 36px rgba(0, 0, 0, 0.1), /* Couche 2 : ombre un peu plus large */
        0 0 72px rgba(0, 0, 0, 0.1); /* Couche 3 : ombre plus diffuse et douce */
        width: 195px; /* Réduit la largeur du popup */
        border: none;
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
        justify-content: space-between;
        width: 100%;
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
        cursor: pointer;
        margin-right: 10px;
    }
    /* Conteneur des avatars */
    .avatar-container {
        display: flex;
        align-items: center;
        margin-left: auto;
        margin-top: 5px;
    }

    .avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        object-fit: cover;
        position: relative;
        margin-left: -8px;
    }
    
    .avatar:first-child {
        margin-left: 0;
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
        top: 39.5px;
        left: 17%;
        transform: translateX(-50%);
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 0.5px solid black;
        object-fit: cover;
        z-index: 999;
    }

    /* Lien du logo */
    .widget-image-link {
        position: absolute;
        top: 13px;
        left: 13%;
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

// Sélection aléatoire des avatars
const utilisateurs = [
    'utilisateur 1.jpeg', 'utilisateur 2.jpeg', 'utilisateur 3.jpeg', 'utilisateur 4.jpg', 'utilisateur 5.jpeg',
    'utilisateur 10.jpeg', 'utilisateur 20.jpeg', 'utilisateur 30.jpeg', 'utilisateur 40.jpeg', 'utilisateur 50.png',
    'utilisateur 11.jpeg', 'utilisateur 21.jpeg', 'utilisateur 31.jpeg', 'utilisateur 41.jpeg', 'utilisateur 51.png',
    'utilisateur 12.jpeg', 'utilisateur 22.jpeg', 'utilisateur 32.jpeg', 'utilisateur 42.jpeg', 'utilisateur 6.jpeg',
    'utilisateur 13.jpeg', 'utilisateur 23.jpeg', 'utilisateur 33.jpeg', 'utilisateur 43.jpeg', 'utilisateur 7.jpeg',
    'utilisateur 14.jpeg', 'utilisateur 24.jpeg', 'utilisateur 34.jpeg', 'utilisateur 44.jpeg', 'utilisateur 8.jpeg',
    'utilisateur 15.jpeg', 'utilisateur 25.jpeg', 'utilisateur 35.jpeg', 'utilisateur 45.jpeg', 'utilisateur 9.jpeg'
];

const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());
const selectedAvatars = shuffleArray(utilisateurs).slice(0, 3);

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
                M2.5,50
                A8,8 0 0 1 10.5,42
                L219,42
                A8,8 0 0 1 227,50
                L227,117
                A8,8 0 0 1 219,125
                L10.5,125
                A8,8 0 0 1 2.5,117
                Z

                                            
                M 85,55
                L 190,55
                A 15 15 0 0 1 190,90
                L 85,90
                A 15 15 0 0 1 85,55
                Z
            " fill="rgb(255, 255, 255)" stroke="black" stroke-width="0
            " fill-rule="evenodd"/>
            <!-- Texte intégré dans le SVG -->
            <text x="45%" y="110" font-family="Arial, sans-serif" font-size="10" fill="rgba(0, 0, 0, 0.6)" text-anchor="middle" pointer-events="auto">
                Conçu avec soin par 
                <tspan font-weight="bold" fill="#007bff" text-decoration="underline">
                    <a href="https://mon-widget.vercel.app/" target="_blank" style="cursor: pointer; pointer-events: auto; text-decoration: underline; fill: #007bff;">
                        Cléa
                    </a>
                </tspan>
            </text>
        </svg>
    </div>

    <!-- Popup de message -->
    <div id="popup-message" class="popup-container">
        <div class="popup-content">
            <span id="close-popup" class="popup-close">&times;</span>
            <!-- Texte "Questions ..." en gras -->
            <p class="popup-text">Une question?</p>
            <!-- Texte "Parlez avec notre assistant !" non gras -->
            <p class="popup-text-normal">Discutez avec notre assistant IA!</p>
            <!-- Ligne "Cléa est en ligne" en dessous -->
            <div class="popup-header">
                <div>
                    <span class="online-dot"></span>
                    <a href="https://mon-widget.vercel.app/" target="_blank" class="popup-online-text">Cléa est en ligne</a>
                </div>
                        <!-- Avatars superposés -->
                <div class="avatar-container">
                ${selectedAvatars.map(img => `<img src="public/utilisateurs/${img}" class="avatar" alt="Utilisateur">`).join('')}
                </div>
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