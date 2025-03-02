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
            background-color: #007bff;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .custom-popup-button.red {
            background-color: #ff3030;
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

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .custom-popup-header {
            background: #007bff;
            color: white;
            padding: 10px;
            text-align: center;
            font-weight: bold;
        }

        .custom-popup-body {
            flex: 1;
            overflow-y: auto;
            padding-bottom: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-height: 400px;
        }

        .custom-popup-footer {
            display: flex;
            gap: 10px;
        }

        .custom-popup-textarea {
            width: 100%;
            height: 40px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            font-size: 14px;
            resize: none;
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
        }

        .message.bot {
            background: #f1f1f1;
            color: black;
            align-self: flex-start;
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
                <textarea id="custom-popup-textarea" class="custom-popup-textarea" placeholder="Écrivez ici..."></textarea>
                <button id="custom-popup-send" class="custom-popup-send">Envoyer</button>
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

        toggleButton.addEventListener("click", function() {
            popup.style.display = popup.style.display === "block" ? "none" : "block";
            toggleButton.classList.toggle("red");
            toggleIcon.textContent = popup.style.display === "block" ? "×" : "+";
        });

        async function sendMessage() {
            const messageText = textarea.value.trim();
            if (!messageText) {
                return;
            }
        
            const userMessage = document.createElement("div");
            userMessage.className = "message user";
            userMessage.textContent = messageText;
            chatBody.appendChild(userMessage);
            chatBody.scrollTop = chatBody.scrollHeight;

            textarea.value = "";

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
                const botMessage = document.createElement("div");
                botMessage.className = "message bot";
                botMessage.textContent = data[0].output || "Je n'ai pas compris.";
                chatBody.appendChild(botMessage);
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