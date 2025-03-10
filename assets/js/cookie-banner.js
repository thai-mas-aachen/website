class CookieBanner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.translations = {
            'en': {
                message: 'This website uses cookies to improve your browsing experience and provide personalized content.',
                accept: 'Accept',
                reject: 'Reject'
            },
            'de': {
                message: 'Diese Website verwendet Cookies, um Ihr Browsererlebnis zu verbessern und personalisierte Inhalte bereitzustellen.',
                accept: 'Akzeptieren',
                reject: 'Ablehnen'
            },
            'fr': {
                message: 'Ce site utilise des cookies pour améliorer votre expérience de navigation et fournir du contenu personnalisé.',
                accept: 'Accepter',
                reject: 'Refuser'
            }
        };
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    getLanguage() {
        const htmlLang = document.documentElement.lang;
        return this.translations[htmlLang] ? htmlLang : 'de';
    }

    render() {
        const lang = this.getLanguage();
        const t = this.translations[lang];

        this.shadowRoot.innerHTML = `
            <style>
                .cookie-banner {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: #f1f1f1;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                }
                .cookie-text {
                    margin-right: 1rem;
                }
                .cookie-buttons {
                    display: flex;
                    gap: 0.5rem;
                }
                button {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: opacity 0.2s;
                }
                button:hover {
                    opacity: 0.9;
                }
                .accept {
                    background-color: #4CAF50;
                    color: white;
                }
                .reject {
                    background-color: #f44336;
                    color: white;
                }
            </style>
            <div class="cookie-banner">
                <div class="cookie-text">
                    ${t.message}
                </div>
                <div class="cookie-buttons">
                    <button class="accept">${t.accept}</button>
                    <button class="reject">${t.reject}</button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const acceptButton = this.shadowRoot.querySelector('.accept');
        const rejectButton = this.shadowRoot.querySelector('.reject');

        acceptButton.addEventListener('click', () => this.handleAccept());
        rejectButton.addEventListener('click', () => this.handleReject());
    }

    handleAccept() {
        this.setCookie('cookies_accepted', 'true', 365);
        this.remove();
    }

    handleReject() {
        this.setCookie('cookies_accepted', 'false', 365);
        this.remove();
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
}

customElements.define('cookie-banner', CookieBanner);

function checkCookieConsent() {
    const cookiesAccepted = getCookie('cookies_accepted');
    if (cookiesAccepted === '') {
        const cookieBanner = document.createElement('cookie-banner');
        document.body.appendChild(cookieBanner);
    }
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return '';
}

window.addEventListener('load', checkCookieConsent);
