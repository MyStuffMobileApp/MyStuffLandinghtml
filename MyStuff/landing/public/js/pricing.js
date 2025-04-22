document.addEventListener('DOMContentLoaded', function() {
    // Pricing toggle functionality
    const billingToggle = document.getElementById('billing-toggle');
    const monthlyAmounts = document.querySelectorAll('.amount.monthly');
    const annualAmounts = document.querySelectorAll('.amount.annual');
    const saveBadge = document.querySelector('.save-badge');

    // Initialize pricing display
    monthlyAmounts.forEach(amount => amount.classList.add('active'));

    // Handle toggle changes
    billingToggle.addEventListener('change', function() {
        if (this.checked) {
            // Annual pricing
            monthlyAmounts.forEach(amount => amount.classList.remove('active'));
            annualAmounts.forEach(amount => amount.classList.add('active'));
        } else {
            // Monthly pricing
            annualAmounts.forEach(amount => amount.classList.remove('active'));
            monthlyAmounts.forEach(amount => amount.classList.add('active'));
        }
    });

    // Plan card hover effects
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('featured') 
                ? 'scale(1.05) translateY(-5px)' 
                : 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('featured') 
                ? 'scale(1.05)' 
                : 'none';
        });
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease';
            
            question.addEventListener('click', function() {
                const isOpen = answer.style.maxHeight !== '0px';
                
                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('p');
                    if (otherAnswer && otherAnswer !== answer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                });
                
                // Toggle current FAQ
                answer.style.maxHeight = isOpen ? '0' : answer.scrollHeight + 'px';
            });
        }
    });

    // Smooth scroll to pricing section when coming from other pages
    if (window.location.hash === '#pricing') {
        const pricingSection = document.querySelector('.pricing-plans');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}); 