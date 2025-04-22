/**
 * Simple Template Loading System
 * Loads and injects navigation and footer templates into pages
 */

class TemplateLoader {
    constructor() {
        // Get the path to template.html based on current page location
        const pathToRoot = this.calculatePathToRoot();
        this.templatePath = `${pathToRoot}/src/pages/template.html`;
        
        // Define template and placeholder pairs
        this.templates = [
            { id: 'nav-template', placeholder: 'nav-placeholder' },
            { id: 'footer-template', placeholder: 'footer-placeholder' }
        ];
    }

    // Calculate relative path to root based on current page location
    calculatePathToRoot() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);
        const pagesIndex = segments.indexOf('pages');
        
        if (pagesIndex === -1) return '.';
        
        const depth = segments.length - pagesIndex;
        return '../'.repeat(depth) || '.';
    }

    // Fix relative paths in template content
    fixPaths(content, pathToRoot) {
        const selectors = {
            'img[src^="../../public/"]': (el) => {
                el.src = el.src.replace('../../public/', `${pathToRoot}/public/`);
            },
            'a[href^="pages/"]': (el) => {
                el.href = `${pathToRoot}/src/pages/${el.getAttribute('href')}`;
            },
            'a[href^="/"]': (el) => {
                el.href = `${pathToRoot}${el.getAttribute('href').substring(1)}`;
            },
            'a[href^="/#"]': (el) => {
                el.href = `${pathToRoot}${el.getAttribute('href').substring(2)}`;
            }
        };

        Object.entries(selectors).forEach(([selector, fix]) => {
            content.querySelectorAll(selector).forEach(fix);
        });

        return content;
    }

    // Load and inject templates
    async loadTemplates() {
        try {
            // Fetch template file
            const response = await fetch(this.templatePath);
            if (!response.ok) throw new Error('Failed to load template file');
            
            // Parse template HTML
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Process each template
            for (const { id, placeholder } of this.templates) {
                const template = doc.getElementById(id);
                const target = document.getElementById(placeholder);
                
                if (!template || !target) {
                    console.error(`Missing template or placeholder for ${id}`);
                    continue;
                }

                // Clone and fix paths
                const content = template.content.cloneNode(true);
                this.fixPaths(content, this.calculatePathToRoot());
                
                // Insert into page
                target.appendChild(content);
            }

            // Initialize mobile menu
            this.initMobileMenu();

        } catch (error) {
            console.error('Template loading failed:', error);
            this.showError(error);
        }
    }

    // Initialize mobile menu functionality
    initMobileMenu() {
        const btn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('.nav-container');
        
        if (btn && nav) {
            btn.addEventListener('click', () => nav.classList.toggle('mobile-open'));
        }
    }

    // Show error message if template loading fails
    showError(error) {
        const style = 'color: red; padding: 20px; border: 1px solid red; margin: 10px;';
        const message = `<div style="${style}"><strong>Error loading template:</strong><br>${error.message}</div>`;
        
        this.templates.forEach(({ placeholder }) => {
            const el = document.getElementById(placeholder);
            if (el) el.innerHTML = message;
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TemplateLoader().loadTemplates();
}); 