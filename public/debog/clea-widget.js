// ElevenLabs Voice Agent Integration
// Standalone implementation without external SDK dependencies

(function() {
    // Create a stylesheet
    const style = document.createElement('style');
    style.textContent = `
      .elevenlabs-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #6c5ce7;
        color: white;
        border: none;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 9999;
      }
      
      .elevenlabs-button:hover {
        background-color: #5344c7;
        transform: scale(1.05);
      }
      
      .elevenlabs-button svg {
        width: 24px;
        height: 24px;
      }
      
      .elevenlabs-button.speaking {
        background-color: #e74c3c;
        animation: pulse 1.5s infinite;
      }
      
      .elevenlabs-button.listening {
        background-color: #2ecc71;
        animation: pulse 1.5s infinite;
      }
      
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }
      
      .elevenlabs-dialog {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 300px;
        max-height: 400px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        display: none;
        flex-direction: column;
        z-index: 9998;
        overflow: hidden;
      }
      
      .elevenlabs-dialog.open {
        display: flex;
      }
      
      .elevenlabs-dialog-header {
        padding: 15px;
        background-color: #6c5ce7;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .elevenlabs-dialog-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 20px;
      }
      
      .elevenlabs-dialog-content {
        padding: 15px;
        overflow-y: auto;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 300px;
      }
      
      .elevenlabs-message {
        padding: 8px 12px;
        border-radius: 15px;
        max-width: 80%;
        word-break: break-word;
      }
      
      .elevenlabs-message.user {
        align-self: flex-end;
        background-color: #6c5ce7;
        color: white;
      }
      
      .elevenlabs-message.agent {
        align-self: flex-start;
        background-color: #f1f1f1;
        color: #333;
      }
      
      .elevenlabs-status {
        text-align: center;
        font-size: 12px;
        color: #777;
        padding: 5px;
      }
      
      .elevenlabs-volume-indicator {
        height: 30px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 2px;
        padding: 0 15px;
      }
      
      .elevenlabs-volume-bar {
        width: 4px;
        background-color: #6c5ce7;
        border-radius: 2px;
        transition: height 0.1s ease;
      }
    `;
    document.head.appendChild(style);
  
    // API-related constants
    const AGENT_ID = 'uY98U5YsfR4bGJgXlAKE';
    const API_BASE_URL = 'https://api.elevenlabs.io/v1/convai';
  
    // Execute when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeWidget);
    } else {
      initializeWidget();
    }
  
    async function initializeWidget() {
      console.log("Initializing ElevenLabs Voice Agent widget");
      
      try {
        // Create UI elements
        createUI();
      } catch (error) {
        console.error('ElevenLabs Voice Agent initialization failed:', error);
        showErrorNotification('Failed to initialize ElevenLabs Voice Agent');
      }
    }
  
    function showErrorNotification(message) {
      const errorNotification = document.createElement('div');
      errorNotification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #e74c3c;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: sans-serif;
      `;
      errorNotification.textContent = message;
      document.body.appendChild(errorNotification);
      
      // Remove after 8 seconds
      setTimeout(() => {
        if (document.body.contains(errorNotification)) {
          document.body.removeChild(errorNotification);
        }
      }, 8000);
    }
  
    function createUI() {
      // Create button
      const button = document.createElement('button');
      button.className = 'elevenlabs-button';
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      `;
      
      // Create dialog
      const dialog = document.createElement('div');
      dialog.className = 'elevenlabs-dialog';
      dialog.innerHTML = `
        <div class="elevenlabs-dialog-header">
          <span>ElevenLabs Assistant</span>
          <button class="elevenlabs-dialog-close">×</button>
        </div>
        <div class="elevenlabs-dialog-content"></div>
        <div class="elevenlabs-volume-indicator">
          ${Array(15).fill(0).map(() => '<div class="elevenlabs-volume-bar" style="height: 0px;"></div>').join('')}
        </div>
        <div class="elevenlabs-status">Click the button to start</div>
      `;
      
      document.body.appendChild(button);
      document.body.appendChild(dialog);
      
      // Add event listeners
      button.addEventListener('click', toggleConversation);
      dialog.querySelector('.elevenlabs-dialog-close').addEventListener('click', toggleDialog);
      
      // Setup conversation state
      const conversationState = {
        dialog,
        button,
        mode: 'idle', // 'idle', 'listening', 'speaking'
        isDialogOpen: false,
        isActive: false,
        recorder: null,
        audioContext: null,
        connection: null,
        volumeUpdateInterval: null,
        audioQueue: [],
        audioElement: new Audio(),
        analyserNode: null,
        dataArray: null,
        conversationId: null
      };
  
      // Handle audio element events for continuous playback
      conversationState.audioElement.addEventListener('ended', () => {
        playNextAudio(conversationState);
      });
      
      function toggleDialog() {
        conversationState.isDialogOpen = !conversationState.isDialogOpen;
        dialog.classList.toggle('open', conversationState.isDialogOpen);
      }
      
      async function toggleConversation() {
        if (conversationState.isActive) {
          await endConversation(conversationState);
        } else {
          if (!conversationState.isDialogOpen) {
            toggleDialog();
          }
          await startConversation(conversationState);
        }
      }
    }
  
    // Request a direct public conversation URL
    async function getDirectConversationUrl() {
      try {
        const url = `${API_BASE_URL}/conversation/get_direct_public_url?agent_id=${AGENT_ID}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to get direct public URL');
        }
        
        const data = await response.json();
        return data.direct_public_url;
      } catch (error) {
        console.error('Error getting conversation URL:', error);
        throw error;
      }
    }
  
    // Start conversation with the agent
    async function startConversation(state) {
      try {
        // First, ensure microphone permissions
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          setupAudioProcessing(state, stream);
        } catch (error) {
          updateStatus(state, 'Microphone access denied. Please allow microphone access.');
          console.error('Microphone access denied:', error);
          return;
        }
        
        updateStatus(state, 'Connecting...');
        
        // Get WebSocket URL
        const wsUrl = await getDirectConversationUrl();
        
        // Connect to WebSocket
        state.connection = new WebSocket(wsUrl);
        
        // Setup WebSocket event handlers
        state.connection.onopen = () => {
          console.log('WebSocket connection established');
          updateStatus(state, 'Connected');
          state.isActive = true;
          setMode(state, 'listening');
          startVolumeUpdates(state);
        };
        
        state.connection.onclose = () => {
          console.log('WebSocket connection closed');
          endConversation(state);
        };
        
        state.connection.onerror = (error) => {
          console.error('WebSocket error:', error);
          updateStatus(state, 'Connection error');
          endConversation(state);
        };
        
        state.connection.onmessage = (event) => {
          handleWebSocketMessage(state, event);
        };
        
      } catch (error) {
        console.error('Failed to start conversation:', error);
        updateStatus(state, 'Failed to start: ' + (error.message || 'Unknown error'));
      }
    }
  
    // Handle WebSocket messages
    function handleWebSocketMessage(state, event) {
      try {
        const message = JSON.parse(event.data);
        console.log('Received message:', message);
        
        // Handle different message types
        switch (message.type) {
          case 'conversation_started':
            state.conversationId = message.conversation_id;
            addMessage(state, 'Conversation started', 'agent');
            break;
            
          case 'assistant_response':
            if (message.text) {
              addMessage(state, message.text, 'agent');
            }
            break;
            
          case 'audio_chunk':
            if (message.audio_data) {
              handleAudioChunk(state, message.audio_data, message.is_final);
            }
            break;
            
          case 'status_change':
            handleStatusChange(state, message.status);
            break;
            
          case 'transcription':
            if (message.text) {
              if (message.is_final) {
                addMessage(state, message.text, 'user');
              } else {
                updateStatus(state, `You: ${message.text}`);
              }
            }
            break;
            
          default:
            console.log('Unhandled message type:', message.type);
        }
      } catch (error) {
        console.error('Error handling WebSocket message:', error);
      }
    }
  
    // Handle status changes
    function handleStatusChange(state, status) {
      switch (status) {
        case 'listening':
          setMode(state, 'listening');
          updateStatus(state, 'Listening...');
          break;
          
        case 'speaking':
          setMode(state, 'speaking');
          updateStatus(state, 'Speaking...');
          break;
          
        case 'thinking':
          updateStatus(state, 'Thinking...');
          break;
          
        default:
          console.log('Unknown status:', status);
      }
    }
  
    // Set mode (listening/speaking) and update UI
    function setMode(state, mode) {
      state.mode = mode;
      state.button.classList.remove('listening', 'speaking');
      
      if (mode === 'listening') {
        state.button.classList.add('listening');
        if (state.recorder && state.recorder.state === 'paused') {
          state.recorder.resume();
        }
      } else if (mode === 'speaking') {
        state.button.classList.add('speaking');
        if (state.recorder && state.recorder.state === 'recording') {
          state.recorder.pause();
        }
      }
    }
  
    // Setup audio processing
    function setupAudioProcessing(state, stream) {
      // Create audio context
      state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create audio analyzer for volume visualization
      state.analyserNode = state.audioContext.createAnalyser();
      state.analyserNode.fftSize = 256;
      state.dataArray = new Uint8Array(state.analyserNode.frequencyBinCount);
      
      // Create media stream source
      const source = state.audioContext.createMediaStreamSource(stream);
      source.connect(state.analyserNode);
      
      // Create media recorder
      state.recorder = new MediaRecorder(stream);
      
      state.recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0 && state.connection && state.connection.readyState === WebSocket.OPEN) {
          // Convert Blob to base64
          const reader = new FileReader();
          reader.onloadend = function() {
            const base64data = reader.result.split(',')[1];
            
            // Send audio data to the WebSocket
            state.connection.send(JSON.stringify({
              type: 'audio_data',
              audio_data: base64data,
              is_final: false
            }));
          };
          reader.readAsDataURL(event.data);
        }
      });
      
      // Start recording
      state.recorder.start(100); // Collect data every 100ms
    }
  
    // Handle audio chunks from the server
    function handleAudioChunk(state, audioData, isFinal) {
      const audioBlob = base64ToBlob(audioData, 'audio/webm');
      const audioUrl = URL.createObjectURL(audioBlob);
      
      state.audioQueue.push(audioUrl);
      
      // Start playing if not already playing
      if (state.audioElement.paused) {
        playNextAudio(state);
      }
    }
  
    // Play next audio in queue
    function playNextAudio(state) {
      if (state.audioQueue.length > 0) {
        const nextAudioUrl = state.audioQueue.shift();
        state.audioElement.src = nextAudioUrl;
        state.audioElement.play().catch(error => {
          console.error('Error playing audio:', error);
        });
        
        // Clean up old URLs
        setTimeout(() => {
          URL.revokeObjectURL(nextAudioUrl);
        }, 1000);
      }
    }
  
    // End conversation
    async function endConversation(state) {
      // Stop recorder if exists
      if (state.recorder && state.recorder.state !== 'inactive') {
        state.recorder.stop();
      }
      
      // Send end message if connection is open
      if (state.connection && state.connection.readyState === WebSocket.OPEN) {
        state.connection.send(JSON.stringify({
          type: 'end_conversation'
        }));
        state.connection.close();
      }
      
      // Stop audio playback
      state.audioElement.pause();
      state.audioQueue = [];
      
      // Clear volume indicator interval
      stopVolumeUpdates(state);
      
      // Clean up audio context
      if (state.audioContext && state.audioContext.state !== 'closed') {
        await state.audioContext.close();
      }
      
      // Reset state
      state.isActive = false;
      state.mode = 'idle';
      state.button.classList.remove('listening', 'speaking');
      state.conversationId = null;
      updateStatus(state, 'Conversation ended');
    }
  
    // Add message to the dialog
    function addMessage(state, text, sender) {
      const content = state.dialog.querySelector('.elevenlabs-dialog-content');
      const message = document.createElement('div');
      message.className = `elevenlabs-message ${sender}`;
      message.textContent = text;
      content.appendChild(message);
      content.scrollTop = content.scrollHeight;
    }
  
    // Update status text
    function updateStatus(state, text) {
      const statusElement = state.dialog.querySelector('.elevenlabs-status');
      if (statusElement) {
        statusElement.textContent = text;
      }
    }
  
    // Start volume visualization updates
    function startVolumeUpdates(state) {
      stopVolumeUpdates(state);
      state.volumeUpdateInterval = setInterval(() => {
        updateVolumeIndicator(state);
      }, 100);
    }
  
    // Stop volume visualization updates
    function stopVolumeUpdates(state) {
      if (state.volumeUpdateInterval) {
        clearInterval(state.volumeUpdateInterval);
        state.volumeUpdateInterval = null;
      }
      
      // Reset volume bars
      const volumeBars = state.dialog.querySelectorAll('.elevenlabs-volume-bar');
      volumeBars.forEach(bar => {
        bar.style.height = '0px';
      });
    }
  
    // Update volume indicator
    function updateVolumeIndicator(state) {
      if (!state.analyserNode || !state.dataArray) return;
      
      try {
        // Get volume data
        state.analyserNode.getByteFrequencyData(state.dataArray);
        
        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < state.dataArray.length; i++) {
          sum += state.dataArray[i];
        }
        const average = sum / state.dataArray.length;
        const volume = average / 255; // Normalize to 0-1
        
        // Update volume bars
        const volumeBars = state.dialog.querySelectorAll('.elevenlabs-volume-bar');
        const maxHeight = 25; // Maximum height in pixels
        
        // Create a "sound wave" effect
        volumeBars.forEach((bar, index) => {
          // Calculate height based on volume and position
          const centerIndex = Math.floor(volumeBars.length / 2);
          const distanceFromCenter = Math.abs(index - centerIndex);
          const factor = 1 - (distanceFromCenter / centerIndex) * 0.5;
          
          // Add some randomness
          const randomFactor = 0.7 + Math.random() * 0.6;
          
          // Calculate height
          let height = Math.max(1, Math.min(maxHeight, volume * maxHeight * factor * randomFactor));
          
          // Apply the height
          bar.style.height = `${height}px`;
        });
        
      } catch (error) {
        console.error('Failed to update volume:', error);
      }
    }
  
    // Helper: Convert base64 to Blob
    function base64ToBlob(base64, mimeType) {
      const byteString = atob(base64);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);
      
      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }
      
      return new Blob([arrayBuffer], { type: mimeType });
    }
  })();