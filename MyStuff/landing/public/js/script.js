/**
 * Main JavaScript file for MyStuff website
 * Contains common functionality used across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdowns
    initializeDropdowns();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize language selector
    initializeLanguageSelector();
});

function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (trigger && menu) {
            trigger.addEventListener('mouseenter', () => {
                menu.style.display = 'block';
                menu.style.opacity = '1';
            });
            
            dropdown.addEventListener('mouseleave', () => {
                menu.style.display = 'none';
                menu.style.opacity = '0';
            });
        }
    });
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                // TODO: Implement search functionality
                console.log('Searching for:', query);
            }
        });
        
        // Enable search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    // TODO: Implement search functionality
                    console.log('Searching for:', query);
                }
            }
        });
    }
}

function initializeLanguageSelector() {
    const languageSelect = document.querySelector('.language-select select');
    
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const selectedLanguage = e.target.value;
            // TODO: Implement language switching
            console.log('Switching language to:', selectedLanguage);
        });
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 