// ========= ADAPTER LES LIGNES 240-241-327 (pour le vocal) ========= \\
// 1) Créer le conteneur et l'ajouter au body
const widgetContainer = document.createElement('div');
document.body.appendChild(widgetContainer);

// 2) Attacher le shadow root
const shadowRoot = widgetContainer.attachShadow({ mode: 'open' });

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
        height: 100px;
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
        padding-left: 10px;
    }

    /* Texte "Questions ..." en gras */
    .popup-text {
        font-family: Arial, sans-serif;
        font-weight: bold;
        font-size: 22px;
        margin-top: 0px;
        margin-bottom: -5px;
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
        all: unset;
        font-family: Arial, sans-serif !important;
        color: #007bff !important;
        font-weight: bold !important;
        font-size: 12px !important;
        cursor: pointer !important;
        margin-right: 5px;
    }
    /* Conteneur des avatars */
    .avatar-container {
        display: flex;
        align-items: center;
        margin-left: -8px;
        margin-top: 5px;
    }

    .avatar {
        width: 24px !important;
        height: 24px !important;
        border-radius: 50%;
        border: 1px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        object-fit: cover;
        position: relative;
        margin-left: -13px;
    }
    
    .avatar:first-child {
        margin-left: -60px;
    }

    /* Bouton de fermeture (croix X) */
    .popup-close {
        position: absolute;
        top: -3px;
        right: 0px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        color: black;
    }
    .popup-close:hover {
        color: red;
    }
    #close-chatbot {
        right: auto;
        left: 395px;
        font-size: 24px; /* ou la taille souhaitée */
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
        width: 38px !important;
        height: 38px !important;
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
shadowRoot.appendChild(styleSheet);


// Sélection aléatoire des avatars
const utilisateurs = [
    'utilisateur1.jpeg', 'utilisateur2.jpeg', 'utilisateur3.jpeg', 'utilisateur4.jpg', 'utilisateur5.jpeg',
    'utilisateur10.jpeg', 'utilisateur20.jpeg', 'utilisateur30.jpeg', 'utilisateur40.jpeg', 'utilisateur50.png',
    'utilisateur11.jpeg', 'utilisateur21.jpeg', 'utilisateur31.jpeg', 'utilisateur41.jpeg', 'utilisateur51.png',
    'utilisateur12.jpeg', 'utilisateur22.jpeg', 'utilisateur32.jpeg', 'utilisateur42.jpeg', 'utilisateur6.jpeg',
    'utilisateur13.jpeg', 'utilisateur23.jpeg', 'utilisateur33.jpeg', 'utilisateur43.jpeg', 'utilisateur7.jpeg',
    'utilisateur14.jpeg', 'utilisateur24.jpeg', 'utilisateur34.jpeg', 'utilisateur44.jpeg', 'utilisateur8.jpeg',
    'utilisateur15.jpeg', 'utilisateur25.jpeg', 'utilisateur35.jpeg', 'utilisateur45.jpeg', 'utilisateur9.jpeg'
];

const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());
const BASE_URL = "https://pjbrx.github.io/mon-widget/public/utilisateurs/";
const selectedAvatars = shuffleArray(utilisateurs).slice(0, 3);

// Injecter le HTML dans le document
const widgetHTML = `
    <!-- Conteneur du widget avec SVG -->
    <div class="floating-widget-container">
        <a href="https://www.rentiteasy.be/fr" class="widget-image-link">
            <img src="https://pjbrx.github.io/Clea_agent_conversationnel/Rentiteasy/logo_rentiteasy.png" alt="Logo Rentiteasy" class="widget-image">
        </a>
        <svg class="widget-shape" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
            <!-- Forme principale avec trou circulaire -->
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

                M 117,72.5
                m -17.5,0
                a 17.5,17.5 0 1,0 35,0
                a 17.5,17.5 0 1,0 -35,0

            " fill="rgb(255, 255, 255)" stroke="black" stroke-width="0
            " fill-rule="evenodd"/>

            <!-- Bordure décorative en forme de pilule -->
            <path d="
                M85,73
                A22.5,22 0 0 1 107.5,50
                L182.5,51
                A22.5,22 0 0 1 205,72
                L205,73
                A22.5,22 0 0 1 182.5,95
                L107.5,95
                A22.5,22 0 0 1 85,73
                Z
            " fill="none" stroke="black" stroke-width="1"/>
            <text x="48%" y="115" font-family="Arial, sans-serif" font-size="10" fill="rgba(0, 0, 0, 0.6)" text-anchor="middle" pointer-events="auto">
                Conçu avec soin par 
                <tspan font-weight="bold" fill="#007bff" text-decoration="underline">
                    <a href="https://www.linkedin.com/company/clea.assistant/posts/?feedView=all" target="_blank" style="cursor: pointer; pointer-events: auto; text-decoration: underline; fill: #007bff;">
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
            <p class="popup-text">Une Question ?</p>
            <p class="popup-text-normal">Discutez avec notre assistant IA</p>
            <div class="popup-header">
                <div>
                    <span class="online-dot"></span>
                    <a href="https://www.linkedin.com/company/clea.assistant/posts/?feedView=all" target="_blank" class="popup-online-text">Cléa est en ligne</a>
                </div>
                <div class="avatar-container">
                    ${selectedAvatars.map(img => `<img src="${BASE_URL}${img}" class="avatar" alt="Utilisateur">`).join('')}
                </div>
            </div>
        </div>
    </div>
`;


// Injecter le HTML dans le body
// ❌ Retirer cette ligne (ou commenter)
// document.body.insertAdjacentHTML("beforeend", widgetHTML);

// ✅ Ajouter :
const widgetWrapper = document.createElement('div');
widgetWrapper.innerHTML = widgetHTML;
shadowRoot.appendChild(widgetWrapper);

// Script pour gérer le popup
setTimeout(function() {
    shadowRoot.getElementById("popup-message").style.display = "block";
}, 5000); // Afficher le popup après 5 secondes

shadowRoot.getElementById("close-popup").addEventListener("click", function() {
    shadowRoot.getElementById("popup-message").style.display = "none";
});

// Widget ElevenLabs
const elevenLabsWidget = document.createElement("elevenlabs-convai");
elevenLabsWidget.setAttribute("agent-id", "vAVWpiIxaI6uJPpPzRy4");
document.body.appendChild(elevenLabsWidget);

const script = document.createElement("script");
script.src = "https://elevenlabs.io/convai-widget/index.js";
script.async = true;
script.type = "text/javascript";
document.body.appendChild(script);

(function() {
    // Vérification pour éviter les doublons si le script est chargé plusieurs fois
    if (shadowRoot.querySelector('.custom-popup-container')) {
        return;
    }

    const WEBHOOK_URL = "https://clea.app.n8n.cloud/webhook/create-response-chatbot"; // URL du webhook n8n

    // Générer un ID unique pour cette conversation
    const generateConversationId = () => {
        // Combine l'horodatage, un nombre aléatoire et des identifiants utilisateur si disponibles
        const timestamp = new Date().getTime();
        const randomPart = Math.random().toString(36).substring(2, 15);
        
        // On peut ajouter des informations du navigateur pour plus d'unicité
        const browserInfo = navigator.userAgent.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
        
        // Combinaison de ces éléments pour créer un ID unique
        return `conv_${timestamp}_${randomPart}_${browserInfo}`;
    };

    // Créer et stocker l'ID de conversation
    const conversationId = generateConversationId();
    
    // Stocker l'ID dans sessionStorage pour le conserver pendant la session de navigation
    sessionStorage.setItem('chatConversationId', conversationId);
    
    // Log pour vérification (à supprimer en production)
    console.log("ID de conversation:", conversationId);

    const styles = `
        .custom-popup-container {
            position: fixed;
            bottom: 60px;
            right: 20px;
            z-index: 1005;
        }

        .custom-popup-button {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #000;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease;
            padding: 0;
            overflow: hidden;    
        }

        .custom-popup-button:hover {
            transform: scale(1.05);
        }

        .custom-popup-button img {
            width: 50%;
            height: 50%;
            object-fit: contain;
        }


        .custom-popup-button.red {
            background-color:rgb(247, 247, 247);
            color: black
        }

        .custom-popup-button-position {
            position: fixed;
            bottom: 48px;
            right: 70px;
            z-index: 1005;
        }


        .custom-popup-window {
            position: fixed;
            bottom: 100px; /* Ajustement éventuel */
            right: 20px;
            width: 380px;
            height: 550px;
            background: white;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            display: flex;              /* Passer en flex */
            flex-direction: column;     /* Disposer verticalement */
            padding: 20px;
            z-index: 1006;
            animation: fadeIn 0.3s ease-in-out;
        }

        .custom-popup-send {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
        }

        .custom-popup-send .send-icon {
            width: 35px;  /* Ajuste la taille */
            height: 35px;
            transition: opacity 0.3s ease;
            position: absolute;
            bottom: 7px;
            right: 10px;
        }

        .custom-popup-send:hover .send-icon {
            opacity: 0.5;  /* Effet visuel au survol */
        }

        /* Nouvelle classe pour l'animation de "Réflexion en cours" sans altérer la police */
        .animated-reflection {
        display: inline-block;
        }
        .animated-reflection span {
        animation: blink 1.4s infinite both;
        /* On ne définit pas font-size ni font-weight ici pour laisser hériter la police par défaut */
        }

        /* Styles pour l'animation des points */
        .animated-dots {
        display: inline-block;
        }
        .animated-dots span {
        animation: blink 1.4s infinite both;
        display: inline-block;
        font-weight: bold;
        font-size: 18px;
        }
        .animated-dots span:nth-child(2) {
        animation-delay: 0.2s;
        }
        .animated-dots span:nth-child(3) {
        animation-delay: 0.4s;
        }
        @keyframes blink {
        0% { opacity: 0.2; }
        20% { opacity: 1; }
        100% { opacity: 0.2; }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .custom-popup-header {
            background: rgb(0, 0, 0, 0.34);
            color:rgb(255, 255, 255);
            padding: 25px 20px 25px; /* Augmente l'espace en haut ET en bas */
            text-align: center;
            font-weight: bold;
            height: 50px; /* Augmente la hauteur */
            width: calc(100%);
            margin-left: -20px;
            margin-right: -20px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            position: relative;
            top: -20px;
        }

        /* Styles pour les avatars et statut en ligne - MODIFIÉ */
        .avatar-container {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            margin-right: 10px;
            margin-left: -5px; /* au lieu de -10px pour équilibrer si besoin */
        }


        .avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 1px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            object-fit: cover;
            margin-left: -8px; /* Superposition des avatars */
        }

        .avatar:first-child {
            margin-left: 0; /* Pas de marge pour le premier avatar */
        }

        /* Styles pour la bulle verte "Cléa est en ligne" - MODIFIÉ */
        .online-status {
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            margin-top: 10px;
            margin-right: 15px; /* ➕ ajoute de l’espace à droite */
            margin-left: -10px; /* tu peux conserver ou ajuster */
        }


        .online-dot {
            width: 8px;
            height: 8px;
            background-color: green;
            border-radius: 50%;
            margin-right: 5px;
        }

        .online-text {
            color: #007bff;
            cursor: pointer;
            margin-right: 5px;
            font-size: 12px;
            font-weight: bold;
        }

        .custom-popup-body {
            flex: 1;                /* Occupe tout l'espace disponible */
            overflow-y: auto;
            padding-bottom: 10px;   /* Marge si besoin */
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-height: calc(100% - 130px); /* Ajustement pour laisser de l'espace pour le footer */
            margin-bottom: 10px;    /* Espace entre le body et le footer */
        }

        /* NOUVELLES MODIFICATIONS: Footer toujours fixé en bas */
        .custom-popup-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            padding: 12px 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            flex-direction: column;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            box-sizing: border-box;
        }

        .clea-powered-text {
            font-size: 10px; /* Petite taille */
            font-weight: normal; /* Pas trop gras */
            color: rgba(0, 0, 0, 0.3); /* Très discret */
            position: absolute;
            bottom: 0px; /* Bien aligné en bas */
            right: 6px; /* Positionné à droite */
            text-decoration: none; /* Supprime le soulignement */
            transition: opacity 0.2s ease-in-out; /* Animation de l'effet de survol */
        }

        /* Effet au survol : Légèrement plus visible */
        .clea-powered-text:hover {
            opacity: 0.6;
            color: rgba(0, 0, 0, 1); /* Devient un peu plus visible */
        }

        .custom-popup-divider {
            width: 90%; /* Modifiable */
            height: 1px;
            background-color: rgba(0, 0, 0, 0.08); /* Couleur avec opacité */
            margin-bottom: 5px;
        }

        /* MODIFICATION: Zone de texte maintenant fixée en bas et s'agrandit vers le haut */
        .custom-popup-textarea {
            width: 100%;
            min-height: 23px; /* Hauteur initiale */
            max-height: 100px; /* Hauteur maximale avant de scroller */
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
            font-size: 14px;
            resize: none;
            outline: none;
            height: auto;
            transition: height 0.2s ease;
            overflow-y: auto; /* Active le scroll vertical quand la limite est atteinte */
            box-sizing: border-box; /* Important pour le calcul correct des dimensions */
        }

        .custom-popup-textarea::placeholder {
            font-family: 'Arial', sans-serif;
            font-size: 14px;
            font-weight: bold;
            color: #333;
            opacity: 0.45;
            transition: opacity 0.3s ease-in-out;
        }


        .message {
            padding: 8px;
            border-radius: 5px;
            max-width: 80%;
            word-wrap: break-word;
            font-family: 'Arial', sans-serif;
        }

        .message.user {
            background: #007bff;
            color: white;
            align-self: flex-end;
            margin-bottom: 2px; /* Augmenter l'espace sous le message */
            padding: 10px;
            border-radius: 8px;
            max-width: 70%;
            word-wrap: break-word;
            position: relative;
        }

        /* Conteneur général du message de l'agent */
        .message.bot-container {
            display: flex;
            align-items: flex-start; /* Aligne en haut */
            gap: 10px; /* Espacement entre le logo et le message */
            max-width: 100%; /* Passe de 80% à 100% pour occuper toute la largeur */
            position: relative;
        }
        
        .custom-popup-body .message.bot-container:first-child {
            margin-top: 15px; /* Ajuste selon le besoin */
        }

        /* Style du logo Cléa */
        .bot-logo {
            width: 30px; /* Ajuste la taille du logo */
            height: 30px;
            border-radius: 50%; /* Rend le logo bien rond */
            flex-shrink: 0; /* Empêche le logo de se déformer */
            position: relative;
            top: -18px; /* Remonte le logo */
            border: 1px solid black
        }
        .bot-name {
            font-size: 12px;
            font-weight: bold;
            margin-left: 60px; /* Alignement avec le logo */
            margin-bottom: -20px; /* Espacement entre le nom et la bulle */
            opacity: 0.45;
        }

        /* Style du message du bot */
        .message.bot {
            background: #f1f1f1;
            color: black;
            padding: 12px;
            border-radius: 10px;
            /* max-width: 100%; déjà défini par le container */
            word-wrap: break-word;
            display: flex;
            flex-direction: column;
            position: relative;
            flex: 1; /* Prend toute la largeur restante */
        }

        /* Nouvelle classe pour le conteneur du textarea et du bouton d'envoi */
        .textarea-container {
            display: flex;
            width: 100%;
            align-items: flex-end; /* Aligne les éléments en bas */
            gap: 10px;
            position: relative;
        }

        /* Styles pour la mise en forme en paragraphes */
        .paragraph-container {
            margin: 10px 0;
            line-height: 1.5;
            font-size: 14px;
        }
        .paragraph-container a {
            text-decoration: underline;
            color: #007bff;
        }


    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    shadowRoot.appendChild(styleSheet);

    // Liste des avatars disponibles
    const utilisateurs = [
        'utilisateur1.jpeg', 'utilisateur2.jpeg', 'utilisateur3.jpeg', 'utilisateur4.jpg', 'utilisateur5.jpeg',
        'utilisateur10.jpeg', 'utilisateur20.jpeg', 'utilisateur30.jpeg', 'utilisateur40.jpeg', 'utilisateur50.png',
        'utilisateur11.jpeg', 'utilisateur21.jpeg', 'utilisateur31.jpeg', 'utilisateur41.jpeg', 'utilisateur51.png',
        'utilisateur12.jpeg', 'utilisateur22.jpeg', 'utilisateur32.jpeg', 'utilisateur42.jpeg', 'utilisateur6.jpeg',
        'utilisateur13.jpeg', 'utilisateur23.jpeg', 'utilisateur33.jpeg', 'utilisateur43.jpeg', 'utilisateur7.jpeg',
        'utilisateur14.jpeg', 'utilisateur24.jpeg', 'utilisateur34.jpeg', 'utilisateur44.jpeg', 'utilisateur8.jpeg',
        'utilisateur15.jpeg', 'utilisateur25.jpeg', 'utilisateur35.jpeg', 'utilisateur45.jpeg', 'utilisateur9.jpeg'
    ];

    // URL de base pour les avatars
    const BASE_URL = "https://pjbrx.github.io/mon-widget/public/utilisateurs/";

    // Fonction pour mélanger un tableau
    const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());

    // Sélectionner 4 avatars aléatoires
    const selectedAvatars = shuffleArray(utilisateurs).slice(0, 4);
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'custom-popup-container';
    
    widgetContainer.innerHTML = `
    <button id="custom-popup-toggle" class="custom-popup-button custom-popup-button-position" aria-label="Ouvrir le chat Cléa">
        <img id="toggle-icon" src="https://pjbrx.github.io/Clea_agent_conversationnel/logo_chat_final.webp" alt="Icône Cléa">
    </button>
        <div id="custom-popup-window" class="custom-popup-window">
            <div class="custom-popup-header">
                Des Questions ? Discutons !
                    <span id="close-chatbot" class="popup-close">&times;</span>
                <div style="display: flex; justify-content: center; align-items: center;">
                    <div class="online-status">
                        <span class="online-dot"></span>
                        <a href="https://www.linkedin.com/company/clea.assistant/posts/?feedView=all" 
                            class="online-text" 
                            target="_blank" 
                            rel="noopener noreferrer">Cléa est en ligne
                        </a>
                    </div>
                    <div class="avatar-container">
                        ${selectedAvatars.map(img => `<img src="${BASE_URL}${img}" class="avatar" alt="Avatar">`).join('')}
                    </div>
                </div>

            </div>
            <div class="custom-popup-body" id="custom-popup-body">
                <div style="height: -30px;"></div> <!-- Espace vide pour descendre le premier message -->
                
                <!-- Nom du bot -->
                <div class="bot-name">Cléa</div>
                
                <div class="message bot-container">
                    <img src="https://pjbrx.github.io/Clea_agent_conversationnel/Rentiteasy/logo_rentiteasy.png" alt="Logo Rentiteasy" class="bot-logo">
                    <div class="message bot">
                        <span>Bonjour ! Comment puis-je vous aider ?</span>
                    </div>
                </div>
            </div>

            <div class="custom-popup-footer">
                <div class="custom-popup-divider"></div> <!-- Ligne de séparation -->
                <div class="textarea-container">
                    <textarea id="custom-popup-textarea" class="custom-popup-textarea" placeholder="Écrivez ici..."></textarea>
                    <button id="custom-popup-send" class="custom-popup-send" style="display: none;">
                        <img src="https://pjbrx.github.io/Clea_agent_conversationnel/send_button.png" alt="Envoyer" class="send-icon">
                    </button>
                </div>
                <a href="https://www.linkedin.com/company/clea.assistant/posts/?feedView=all" 
                class="clea-powered-text" 
                target="_blank" 
                rel="noopener noreferrer">
                    Fonctionne avec Cléa
                </a>
            </div>
        </div>
    `;
    
    shadowRoot.appendChild(widgetContainer);

    function setupWidgetEvents() {
        const toggleButton = shadowRoot.getElementById("custom-popup-toggle");
        const popup = shadowRoot.getElementById("custom-popup-window");
        // Fermer le popup au démarrage
        popup.style.display = "none";

        const toggleIcon = shadowRoot.getElementById("toggle-icon");
        const textarea = shadowRoot.getElementById("custom-popup-textarea");
        const sendButton = shadowRoot.getElementById("custom-popup-send");
        const chatBody = shadowRoot.getElementById("custom-popup-body");

        // Récupérer l'ID de conversation stocké
        const currentConversationId = sessionStorage.getItem('chatConversationId');

        // MODIFICATION: Ajustement du textarea pour qu'il s'agrandisse vers le haut
        textarea.addEventListener("input", function () {
            // Sauvegarde de la position de défilement actuelle
            const scrollPos = chatBody.scrollTop;
            
            // Réinitialise la hauteur puis ajuste en fonction du contenu
            textarea.style.height = "auto";
            const newHeight = Math.min(textarea.scrollHeight, 100); // Limite à max-height
            textarea.style.height = newHeight + "px";
            
            // Ajuste le scroll du body pour compenser l'agrandissement vers le haut
            if (textarea.scrollHeight > 23 && chatBody.scrollHeight > chatBody.clientHeight) {
                chatBody.scrollTop = scrollPos + (newHeight - 23);
            }
            
            if (textarea.value.trim().length > 0) {
                sendButton.style.display = "block";
            } else {
                sendButton.style.display = "none";
            }
        });
        
        toggleButton.addEventListener("click", function() {
            popup.style.display = popup.style.display === "block" ? "none" : "block";
            toggleButton.classList.toggle("red");
            toggleIcon.src = popup.style.display === "block"
            ? "https://pjbrx.github.io/Clea_agent_conversationnel/logo_chat_final.webp" // même logo ou autre version pour "fermé"
            : "https://pjbrx.github.io/Clea_agent_conversationnel/logo_chat_final.webp";
            // Cacher le bouton d'envoi à l'ouverture du popup
            if (popup.style.display === "block") {
                sendButton.style.display = "none";
                textarea.value = ""; // Réinitialise aussi le champ texte
                textarea.style.height = "23px"; // Réinitialiser la hauteur
            }
        });

        function linkify(text) {
            // Regex simple pour capturer http/https ou "www." suivi de caractères non-espace
            const urlRegex = /((https?:\/\/|www\.)[^\s]+)/g;
            return text.replace(urlRegex, (match) => {
                // Au cas où le lien ne commence pas par http
                let url = match.startsWith('http') ? match : 'https://' + match;
                return `<a href="${url}" target="_blank" rel="noopener noreferrer">${match}</a>`;
            });
        }

        function formatResponse(text) {
            // Utilise le délimiteur "|||"" pour séparer les paragraphes
            let paragraphs = text.split("|||").map(p => p.trim()).filter(p => p.length > 0);
            // Pour chaque paragraphe, on remplace le contenu entre crochets par du HTML en gras
            paragraphs = paragraphs.map(p => p.replace(/\[([^\]]+)\]/g, "<strong>$1</strong>"));
            // Retourne le HTML avec chaque paragraphe enveloppé dans <p class="paragraph-container">
            return paragraphs.map(p => `<p class="paragraph-container">${p}</p>`).join("");
        }
        
        
        

        async function sendMessage() {
            const messageText = textarea.value.trim();
            if (!messageText) {
                return;
            }
            
            // Message utilisateur (NE PAS TOUCHER)
            const userMessage = document.createElement("div");
            userMessage.className = "message user";
            userMessage.textContent = messageText;
            chatBody.appendChild(userMessage);
            chatBody.scrollTop = chatBody.scrollHeight;
            
            textarea.value = "";
            textarea.style.height = "23px"; // Réinitialise la hauteur
            chatBody.style.maxHeight = "calc(100% - 180px)";
            sendButton.style.display = "none";
            
            // Création du message d'attente du bot avec "Réflexion en cours"
            const placeholderBotMessageWrapper = document.createElement("div");
            placeholderBotMessageWrapper.className = "message bot-container";
            
            const botLogoPlaceholder = document.createElement("img");
            botLogoPlaceholder.src = "https://pjbrx.github.io/Clea_agent_conversationnel/Rentiteasy/logo_rentiteasy.png";
            botLogoPlaceholder.alt = "Logo Rentiteasy";
            botLogoPlaceholder.className = "bot-logo";
            
            const placeholderBotMessageContainer = document.createElement("div");
            placeholderBotMessageContainer.className = "message bot";
            
            // Création du placeholder avec "Réflexion en cours" animé lettre par lettre
            const placeholderText = document.createElement("span");
            placeholderText.className = "animated-reflection"; // Nouvelle classe pour conserver la police d'origine
            const reflectionText = "Réflexion en cours";
            placeholderText.innerHTML = ""; // S'assurer qu'il est vide
            for (let i = 0; i < reflectionText.length; i++) {
                const letterSpan = document.createElement("span");
                letterSpan.textContent = reflectionText[i];
                // Ajustement de l'animation sur chaque lettre (délai progressif)
                letterSpan.style.animationDelay = `${i * 0.1}s`;
                placeholderText.appendChild(letterSpan);
            }
            
            placeholderBotMessageContainer.appendChild(placeholderText);
            placeholderBotMessageWrapper.appendChild(botLogoPlaceholder);
            placeholderBotMessageWrapper.appendChild(placeholderBotMessageContainer);
            
            chatBody.appendChild(placeholderBotMessageWrapper);
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Après 2.5 secondes, si la réponse n'est toujours pas reçue, remplacer le texte par l'animation des 3 points
            let placeholderTimer = setTimeout(() => {
                // Remplacer la classe pour activer l'animation des points
                placeholderText.className = "animated-dots";
                placeholderText.innerHTML = `<span>.</span><span>.</span><span>.</span>`;
            }, 2500);
            
            try {
                const agentId = elevenLabsWidget.getAttribute("agent-id");
                const response = await fetch(WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        message: messageText,
                        conversationId: currentConversationId,
                        agentId: agentId,
                        timestamp: new Date().toISOString(),
                        userInfo: {
                            browser: navigator.userAgent,
                            language: navigator.language,
                            screenSize: `${window.innerWidth}x${window.innerHeight}`,
                            referrer: document.referrer || 'direct',
                            url: window.location.href
                        }
                    })
                });
                
                const data = await response.json();
                
                // Dès que la réponse est reçue, annuler le timer si toujours actif
                clearTimeout(placeholderTimer);
                
                // Supprimer le message d'attente une fois la réponse reçue
                chatBody.removeChild(placeholderBotMessageWrapper);
                
                // Conteneur du message du bot
                const botMessageWrapper = document.createElement("div");
                botMessageWrapper.className = "message bot-container";
                
                // Texte "Cléa" au-dessus
                const botName = document.createElement("div");
                botName.className = "bot-name";
                botName.textContent = "Cléa";
                
                // Logo du bot
                const botLogo = document.createElement("img");
                botLogo.src = "https://pjbrx.github.io/Clea_agent_conversationnel/Rentiteasy/logo_rentiteasy.png";
                botLogo.alt = "Logo Rentiteasy";
                botLogo.className = "bot-logo";
                
                // Bulle de message avec la réponse
                const botMessageContainer = document.createElement("div");
                botMessageContainer.className = "message bot";
                const botMessageText = document.createElement("span");
                botMessageText.textContent = "";
                // Lancer l'animation avec le texte retourné par l'IA
                animateText(botMessageText, data[0]?.output || "Je n'ai pas compris.", 10);
                
                botMessageContainer.appendChild(botMessageText);
                botMessageWrapper.appendChild(botLogo);
                botMessageWrapper.appendChild(botMessageContainer);
                
                // Ajout au chat (en gardant l'ordre correct)
                chatBody.appendChild(botName);
                chatBody.appendChild(botMessageWrapper);
                chatBody.scrollTop = chatBody.scrollHeight;
            
            } catch (error) {
                console.error("Erreur Webhook:", error);
                clearTimeout(placeholderTimer);
                placeholderBotMessageContainer.textContent = "Désolé, une erreur est survenue lors de la communication avec le serveur.";
                chatBody.scrollTop = chatBody.scrollHeight;
            }
        }

        function animateText(element, text, interval = 15, callback) {
            let index = 0;
            let finalText = '';
            const timer = setInterval(() => {
                finalText += text.charAt(index);
                // On met à jour le texte brut pour l'effet de frappe
                element.textContent = finalText;
                index++;
                chatBody.scrollTop = chatBody.scrollHeight;
                if (index === text.length) {
                    clearInterval(timer);
                    // On transforme d'abord le texte pour rendre les liens cliquables
                    const linkified = linkify(finalText);
                    // Puis on applique la mise en forme en paragraphes
                    const formatted = formatResponse(linkified);
                    element.innerHTML = formatted;
                }
            }, interval);
        }
        
        
        
        
        
        
        

        
        

        sendButton.addEventListener("click", sendMessage);
        textarea.addEventListener("keydown", function(event) {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });

        textarea.addEventListener("input", function () {
            // Réinitialise la hauteur puis ajuste en fonction du contenu
            textarea.style.height = "auto";
            const newHeight = Math.min(textarea.scrollHeight, 100); // Limite à max-height
            textarea.style.height = newHeight + "px";
            
            // Calculer la différence de hauteur pour ajuster le body
            const heightDifference = newHeight - 23; // 23px est la hauteur initiale
            
            // Ajuster la hauteur maximale du body en fonction de la taille du textarea
            chatBody.style.maxHeight = `calc(100% - ${180 + heightDifference}px)`;
            
            // Faire défiler jusqu'au dernier message
            chatBody.scrollTop = chatBody.scrollHeight;
            
            if (textarea.value.trim().length > 0) {
                sendButton.style.display = "block";
            } else {
                sendButton.style.display = "none";
            }
        });

        shadowRoot.getElementById("close-chatbot").addEventListener("click", function() {
            shadowRoot.getElementById("custom-popup-window").style.display = "none";
        });
        shadowRoot.getElementById("close-chatbot").addEventListener("click", function() {
            shadowRoot.getElementById("custom-popup-window").style.display = "none";
            // Rétablir l'état du bouton de chat
            const toggleButton = shadowRoot.getElementById("custom-popup-toggle");
            toggleButton.classList.remove("red");
            // Vous pouvez aussi modifier l'image si besoin, de la même manière que dans l'événement "click" du toggleButton
            const toggleIcon = shadowRoot.getElementById("toggle-icon");
            toggleIcon.src = "https://pjbrx.github.io/Clea_agent_conversationnel/logo_chat_final.webp";
        });
        
        
    }

    // Fonction qui vérifie si le DOM est prêt
    function checkDOMReady() {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setupWidgetEvents();
        } else {
            window.setTimeout(checkDOMReady, 100);
        }
    }

    // Lancer la vérification
    checkDOMReady();
})();