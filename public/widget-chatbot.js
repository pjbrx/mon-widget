(function() {
    // Vérification pour éviter les doublons si le script est chargé plusieurs fois
    if (document.querySelector('.custom-popup-container')) {
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
            bottom: 20px;
            right: 20px;
            z-index: 1005;
        }

        .custom-popup-button {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background-color:rgb(0, 0, 0);
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .custom-popup-button.red {
            background-color:rgb(247, 247, 247);
            color: black
        }

        .custom-popup-window {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 320px;
            height: 500px;
            background: white;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            display: none;
            padding: 20px;
            z-index: 1006;
            animation: fadeIn 0.3s ease-in-out;
            flex-direction: column;
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
            bottom: 10px;
            right: 0px;
        }

        .custom-popup-send:hover .send-icon {
            opacity: 0.8;  /* Effet visuel au survol */
        }


        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .custom-popup-header {
            background:rgb(0, 0, 0);
            color: white;
            padding: 10px;
            text-align: center;
            font-weight: bold;
        }

        .custom-popup-body {
            flex: 1;
            overflow-y: auto;
            padding-bottom: 18px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-height: 370px;
        }

        .custom-popup-footer {
            position: absolute;
            bottom: 6px;
            left: 2px;
            width: 90%;
            background: white;
            padding: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            flex-direction: column;
        }

        .custom-popup-divider {
            width: 90%; /* Modifiable */
            height: 1px;
            background-color: rgba(0, 0, 0, 0.08); /* Couleur avec opacité */
            margin-bottom: 5px;
        }

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
            overflow-y: auto; /* Active le scroll vertical quand la limite est atteinte */
        }

        .message {
            padding: 8px;
            border-radius: 5px;
            max-width: 80%;
            word-wrap: break-word;
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
            max-width: 80%;
            position: relative;
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
            color: #333;
            margin-left: 60px; /* Alignement avec le logo */
            margin-bottom: -20px; /* Espacement entre le nom et la bulle */
        }



        /* Style du message du bot */
        .message.bot {
            background: #f1f1f1;
            color: black;
            padding: 12px;
            border-radius: 10px;
            max-width: 100%;
            word-wrap: break-word;
            display: flex;
            flex-direction: column;
            position: relative;
        }



    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'custom-popup-container';
    
    widgetContainer.innerHTML = `
        <button id="custom-popup-toggle" class="custom-popup-button"><span>+</span></button>
        <div id="custom-popup-window" class="custom-popup-window">
            <div class="custom-popup-header">Chat</div>
            <div class="custom-popup-body" id="custom-popup-body">
                <div class="message bot">Bonjour ! Comment puis-je vous aider ?</div>
            </div>
        <div class="custom-popup-footer">
            <div class="custom-popup-divider"></div> <!-- Ligne de séparation -->
            <div style="display: flex; width: 100%; align-items: center; gap: 10px;">
                <textarea id="custom-popup-textarea" class="custom-popup-textarea" placeholder="Écrivez ici..."></textarea>
                <button id="custom-popup-send" class="custom-popup-send" style="display: none;">
                    <img src="/sendbutton.png" alt="Envoyer" class="send-icon">
                </button>
            </div>
        </div>


        </div>
    `;
    
    document.body.appendChild(widgetContainer);

    function setupWidgetEvents() {
        const toggleButton = document.getElementById("custom-popup-toggle");
        const popup = document.getElementById("custom-popup-window");
        const toggleIcon = toggleButton.querySelector("span");
        const textarea = document.getElementById("custom-popup-textarea");
        const sendButton = document.getElementById("custom-popup-send");
        const chatBody = document.getElementById("custom-popup-body");

        // Récupérer l'ID de conversation stocké
        const currentConversationId = sessionStorage.getItem('chatConversationId');

        textarea.addEventListener("input", function () {
            // Réinitialise la hauteur pour éviter l'agrandissement infini
            textarea.style.height = "auto";
            
            // Ajuste la hauteur selon le contenu sans dépasser la limite
            textarea.style.height = Math.min(textarea.scrollHeight, 100) + "px";
        
            // Gère l'affichage du bouton d'envoi
            if (textarea.value.trim().length > 0) {
                sendButton.style.display = "block"; // Affiche le bouton si du texte est saisi
            } else {
                sendButton.style.display = "none"; // Cache le bouton si le champ est vide
            }
        });
        
        toggleButton.addEventListener("click", function() {
            popup.style.display = popup.style.display === "block" ? "none" : "block";
            toggleButton.classList.toggle("red");
            toggleIcon.textContent = popup.style.display === "block" ? "×" : "+";

                // Cacher le bouton d'envoi à l'ouverture du popup
            if (popup.style.display === "block") {
                sendButton.style.display = "none";
                textarea.value = ""; // Réinitialise aussi le champ texte
            }
        });

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
            sendButton.style.display = "none";
        
            try {
                const response = await fetch(WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        message: messageText,
                        conversationId: currentConversationId,
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
        
                // Conteneur du message du bot
                const botMessageWrapper = document.createElement("div");
                botMessageWrapper.className = "message bot-container"; // Ne touche pas aux messages utilisateurs
        
                // Texte "Cléa" au-dessus
                const botName = document.createElement("div");
                botName.className = "bot-name";
                botName.textContent = "Cléa";
        
                // Logo du bot
                const botLogo = document.createElement("img");
                botLogo.src = "/logo_cléa.png";
                botLogo.alt = "Logo Cléa";
                botLogo.className = "bot-logo";
        
                // Bulle de message
                const botMessageContainer = document.createElement("div");
                botMessageContainer.className = "message bot";
                const botMessageText = document.createElement("span");
                botMessageText.textContent = data[0]?.output || "Je n'ai pas compris.";
        
                // Ajout des éléments au conteneur du message du bot
                botMessageContainer.appendChild(botMessageText);
                botMessageWrapper.appendChild(botLogo);
                botMessageWrapper.appendChild(botMessageContainer);
        
                // Ajout au chat (en gardant l'ordre correct)
                chatBody.appendChild(botName);
                chatBody.appendChild(botMessageWrapper);
                chatBody.scrollTop = chatBody.scrollHeight;
        
            } catch (error) {
                console.error("Erreur Webhook:", error);
                const errorMessage = document.createElement("div");
                errorMessage.className = "message bot";
                errorMessage.textContent = "Désolé, une erreur est survenue lors de la communication avec le serveur.";
                chatBody.appendChild(errorMessage);
                chatBody.scrollTop = chatBody.scrollHeight;
            }
        }
        
        

        sendButton.addEventListener("click", sendMessage);
        textarea.addEventListener("keydown", function(event) {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });

        textarea.addEventListener("input", function () {
            if (textarea.value.trim().length > 0) {
                sendButton.style.display = "block"; // Affiche le bouton si du texte est saisi
            } else {
                sendButton.style.display = "none"; // Cache le bouton si le champ est vide
            }
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