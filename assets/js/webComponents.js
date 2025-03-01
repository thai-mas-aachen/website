class MainHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-expand-md navbar-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.html">
                <img
                    src="assets/img/logo/logo_header.png"
                    alt="Logo der Traditionellen Thaimassage Aachen - Zurück zur Startseite"
                    width="auto"
                    height="100"
                    class="d-inline-block align-top"
                />
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="team.html">Unser Team</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="galerie.html">Galerie</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="massagen.html">Massagen</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="preise.html">Preise</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="kontakt.html">Kontakt</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
        `;
        this.setActiveLink();
    }
    setActiveLink() {
        const links = this.querySelectorAll(".nav-link");
        const currentUrl = window.location.pathname.replace("/", "");
        links.forEach((link) => {
            if (currentUrl.endsWith(link.getAttribute("href"))) {
                link.classList.add("active", "fw-bold", "text-decoration-underline");
            }
        });
    }
}
customElements.define("main-header", MainHeader);

class MainFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
          .social-icon {
            width: 30px;
            height: 30px;
            transition: opacity 0.3s ease;
            display: inline-block;
            vertical-align: middle;
          }
          .social-icon:hover {
            opacity: 0.8;
          }
        </style>
        <div class="container p-4">
            <div class="row">
            <!-- Logo -->
            <div class="col-12 col-md-6 col-lg-3 mb-4 mb-md-0">
                <div class="d-flex justify-content-center">
                    <a href="index.html">
                    <img
                        src="assets/img/logo/logo_header.png"
                        alt="Traditionelle Thaimassage Aachen Logo"
                        class="img-fluid"
                    />
                    </a>
                </div> 
            </div>

            <!-- Address and Contact Information -->
            <div class="col-12 col-md-6 col-lg-3 mb-4 mb-md-0">
                <address>
                <strong>Alexanderstraße 121</strong><br />
                52062 Aachen<br />
                Telefon: <a href="tel:024194377687">0241 9437 7687</a><br />
                Whatsapp: <a href="https://wa.me/4915207070312">0152 0707 0312</a>
                </address>
            </div>

            <!-- Additional Links -->
            <div class="col-12 col-md-6 col-lg-2 mb-4 mb-md-0">
                <h5 class="text-uppercase">Links</h5>
                <ul class="list-unstyled">
                <li>
                    <a href="impressum.html" class="text-dark">Impressum</a>
                </li>
                <li>
                    <a href="datenschutz.html" class="text-dark">Datenschutz</a>
                </li>
                </ul>
            </div>

            <!-- Social Links -->
            <div class="col-12 col-md-3 col-lg-2 mb-4 mb-md-0">
                <h5 class="text-uppercase">Folgen Sie uns</h5>
                <div>
                    <a
                    href="https://www.facebook.com/people/Traditionelle-Thaimassage-Aachen/pfbid0fnNC5fuuMnZFq6NEzJ8NbzGBH1i9cBBH9R8xRTtf5bp4WxiMzCgnFoMsnKXbARHEl/"
                    class="me-4"
                    target="_blank"
                    >
                    <img src="assets/img/logo/facebook-logo.png" alt="Facebook" class="social-icon">
                    </a>
                    <a
                    href="https://www.instagram.com/traditionellethaimassageaachen/"
                    class="me-4"
                    target="_blank"
                    >
                    <img src="assets/img/logo/instagram-logo.png" alt="Instagram" class="social-icon">
                    </a>
                </div>
            </div>

            <!-- Kayak Link -->
            <div class="col-12 col-md-3 col-lg-2 mb-4 mb-md-0">
                <a href='https://www.kayak.de/Aachen.14636.guide' target='_blank'>
                    <img height='150' src='https://content.r9cdn.net/rimg/seo/badges/v1/ORANGE_LARGE_FEATURED_KAYAK.png' alt='Kayak' />
                </a>
            </div>
            </div>
        </div>

        <!-- Copyright -->
        <div class="text-center p-3 bg-light">
            © <span id="current-year"></span> Traditionelle Thaimassage Aachen
        </div>
    `;

        //Set the current year to copyright
        var yearElement = document.getElementById("current-year");
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        const structuredData = document.createElement('script');
        structuredData.type = 'application/ld+json';
        structuredData.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Traditionelle Thaimassage Aachen",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Alexanderstraße 121",
                "addressLocality": "Aachen",
                "postalCode": "52062",
                "addressCountry": "DE"
            },
            "telephone": "+4924194377687",
            "url": "https://www.thai-massage-aachen.de",
            "sameAs": [
                "https://www.facebook.com/people/Traditionelle-Thaimassage-Aachen/pfbid0fnNC5fuuMnZFq6NEzJ8NbzGBH1i9cBBH9R8xRTtf5bp4WxiMzCgnFoMsnKXbARHEl/",
                "https://www.instagram.com/traditionellethaimassageaachen/"
            ]
        });
        this.appendChild(structuredData);
    }
}
customElements.define("main-footer", MainFooter);
