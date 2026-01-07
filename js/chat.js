// AI Chat Assistant module

const ChatModule = {
    messages: [],
    
    init() {
        if (!Auth.requireAuth()) {
            return;
        }
        
        this.setupChat();
        this.addWelcomeMessage();
    },
    
    setupChat() {
        const form = document.getElementById('chatForm');
        const input = document.getElementById('chatInput');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }
        
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
        
        // Suggested replies
        this.setupSuggestedReplies();
    },
    
    addWelcomeMessage() {
        const welcomeMessage = {
            type: 'assistant',
            text: 'Salom! Men KUAF MED AI yordamchisiman. Sizga qanday yordam bera olaman?'
        };
        
        this.addMessage(welcomeMessage);
    },
    
    setupSuggestedReplies() {
        const replies = [
            'Uyqusizlikni qanday yengish mumkin?',
            'Stressni kamaytirish uchun nima qilish kerak?',
            'Bosh og\'rig\'i uchun maslahat',
            'Ko\'z charchog\'ini qanday oldini olish mumkin?'
        ];
        
        const container = document.getElementById('suggestedReplies');
        if (!container) return;
        
        container.innerHTML = '';
        replies.forEach(reply => {
            const btn = document.createElement('button');
            btn.className = 'reply-btn';
            btn.textContent = reply;
            btn.onclick = () => {
                document.getElementById('chatInput').value = reply;
                this.sendMessage();
            };
            container.appendChild(btn);
        });
    },
    
    async sendMessage() {
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        
        if (!text) return;
        
        // Add user message
        this.addMessage({ type: 'user', text });
        input.value = '';
        
        // Show loading
        const loadingId = this.addLoadingMessage();
        
        try {
            const response = await MockAPI.chat(text);
            
            // Remove loading
            this.removeMessage(loadingId);
            
            // Add assistant response
            this.addMessage({ type: 'assistant', text: response.reply });
        } catch (error) {
            this.removeMessage(loadingId);
            this.addMessage({
                type: 'assistant',
                text: 'Kechirasiz, xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.'
            });
        }
    },
    
    addMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return null;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;
        messageDiv.textContent = message.text;
        
        const id = Date.now() + Math.random();
        messageDiv.id = `msg-${id}`;
        
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        this.messages.push({ ...message, id });
        return id;
    },
    
    addLoadingMessage() {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return null;
        
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message assistant';
        loadingDiv.id = 'loading-message';
        loadingDiv.innerHTML = '<span class="loading-dots">...</span>';
        
        messagesContainer.appendChild(loadingDiv);
        this.scrollToBottom();
        
        // Animate dots
        let dots = 0;
        const interval = setInterval(() => {
            dots = (dots + 1) % 4;
            loadingDiv.innerHTML = '<span class="loading-dots">' + '.'.repeat(dots) + '</span>';
        }, 500);
        
        loadingDiv.interval = interval;
        
        return 'loading-message';
    },
    
    removeMessage(id) {
        const message = document.getElementById(id);
        if (message) {
            if (message.interval) {
                clearInterval(message.interval);
            }
            message.remove();
        }
    },
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
};

