// Animation utilities
const createAnimatedElement = (className, container, duration) => {
    const element = document.createElement('div');
    element.className = className;
    container.appendChild(element);
    
    setTimeout(() => element.remove(), duration);
    return element;
};

// Particle Animation
function createParticle() {
    const container = document.querySelector('.particle-container');
    if (!container) return;

    const particle = createAnimatedElement('particle', container, 4000);
    const size = 3 + Math.random() * 3;
    const xMove = (Math.random() - 0.5) * 200;
    
    Object.assign(particle.style, {
        left: `${Math.random() * window.innerWidth}px`,
        top: '0',
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0.7 + Math.random() * 0.2
    });
    
    particle.style.setProperty('--x-move', `${xMove}px`);
}

// Sparkle Effect
function createSparkle(e, button) {
    const container = button.querySelector('.sparkle-container');
    if (!container) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (let i = 0; i < 3; i++) {
        const sparkle = createAnimatedElement('sparkle', container, 1000);
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 30;
        
        Object.assign(sparkle.style, {
            left: `${x}px`,
            top: `${y}px`
        });
        
        sparkle.style.setProperty('--x-move', `${Math.cos(angle) * distance}px`);
        sparkle.style.setProperty('--y-move', `${Math.sin(angle) * distance}px`);
    }
}

// Counter Animation
function animateCounter(counter) {
    if (!counter?.hasAttribute('data-animated')) {
    const target = parseInt(counter.getAttribute('data-target'), 10);
        if (!isNaN(target)) {
            counter.setAttribute('data-animated', 'true');
    let current = 0;

    const updateCounter = () => {
                current += target / 60;
        if (current >= target) {
            counter.textContent = target.toLocaleString();
            return;
        }
        counter.textContent = Math.round(current).toLocaleString();
        requestAnimationFrame(updateCounter);
    };
    requestAnimationFrame(updateCounter);
}
    }
}

// Calculator Tool
function initializeCalculator() {
    const formSlide = document.querySelector('.calculator-slide[data-slide="form"]');
    const resultsSlide = document.querySelector('.calculator-slide[data-slide="results"]');
    const backBtn = document.querySelector('.back-btn');
    const inputs = {
        homeSize: document.getElementById('home-size'),
        highValue: document.getElementById('high-value'),
        zipCode: document.getElementById('zip-code')
    };
    const outputs = {
        totalLoss: document.getElementById('total-loss'),
        insuranceCoverage: document.getElementById('insurance-coverage'),
        mystuffLoss: document.getElementById('mystuff-loss'),
        wildfireRisk: document.getElementById('wildfire-risk'),
        floodRisk: document.getElementById('flood-risk'),
        earthquakeRisk: document.getElementById('earthquake-risk')
    };

    // Show slide
    const showSlide = (slide) => {
        document.querySelectorAll('.calculator-slide').forEach(s => s.classList.remove('active'));
        slide.classList.add('active');
    };

    // Initialize with form slide
    showSlide(formSlide);

    // Financial calculations
    const calculateFinancialLoss = (homeSize, highValue, replacementCost = 200) => {
        const totalLoss = (homeSize * replacementCost) + highValue;
        const insuranceCoverage = totalLoss * 0.70;
        const mystuffLoss = totalLoss * 0.30;
        return { totalLoss, insuranceCoverage, mystuffLoss };
    };

    // Risk assessment (mock data - replace with actual API calls)
    const assessDisasterRisk = async (zipCode) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const risks = {
            '90210': { wildfire: 'High', flood: 'Low', earthquake: 'Moderate' },
            '90001': { wildfire: 'Moderate', flood: 'Low', earthquake: 'High' },
            'default': { wildfire: 'Moderate', flood: 'Low', earthquake: 'Moderate' }
        };
        return risks[zipCode] || risks.default;
    };

    // Update risk display with animation
    const updateRiskDisplay = (risks) => {
        const riskClasses = {
            'High': 'high',
            'Moderate': 'moderate',
            'Low': 'low'
        };

        // Animate each risk item
        Object.entries(risks).forEach(([type, level], index) => {
            const element = outputs[`${type}Risk`];
            if (element) {
                setTimeout(() => {
                    element.textContent = level;
                    element.className = `risk-value ${riskClasses[level]}`;
                    element.style.opacity = 0;
                    element.style.transform = 'translateX(20px)';
                    requestAnimationFrame(() => {
                        element.style.transition = 'all 0.3s ease';
                        element.style.opacity = 1;
                        element.style.transform = 'translateX(0)';
                    });
                }, index * 200);
            }
        });

        drawRiskMeter(risks);
    };

    // Draw risk meter with animation
    const drawRiskMeter = (risks) => {
        const canvas = document.getElementById('risk-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const riskLevels = { 'High': 0.9, 'Moderate': 0.5, 'Low': 0.2 };
        
        // Set canvas size with proper scaling
        const containerWidth = canvas.parentElement.offsetWidth;
        const containerHeight = canvas.parentElement.offsetHeight;
        canvas.width = containerWidth * 2;
        canvas.height = containerHeight * 2;
        canvas.style.width = containerWidth + 'px';
        canvas.style.height = containerHeight + 'px';
        ctx.scale(2, 2);

        // Calculate center point and radius
        const centerX = containerWidth / 2;
        const centerY = containerHeight - 20;
        const radius = Math.min(containerWidth / 3, containerHeight / 2);

        // Calculate overall risk score
        const riskScore = Object.values(risks).reduce((acc, level) => 
            acc + riskLevels[level], 0) / Object.keys(risks).length;

        // Animate the meter
        let progress = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw background arc
            ctx.beginPath();
            ctx.lineWidth = radius / 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#e0e0e0';
            ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
            ctx.stroke();

            // Create gradient
            const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
            gradient.addColorStop(0, '#28a745');
            gradient.addColorStop(0.5, '#f6c445');
            gradient.addColorStop(1, '#e45f2b');

            // Draw animated risk level arc
            ctx.beginPath();
            ctx.lineWidth = radius / 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = gradient;
            ctx.arc(centerX, centerY, radius, Math.PI, Math.PI * (1 - (progress * riskScore)), false);
            ctx.stroke();

            // Draw center point
            ctx.beginPath();
            ctx.fillStyle = '#303030';
            ctx.arc(centerX, centerY, radius / 10, 0, Math.PI * 2);
            ctx.fill();

            // Add risk level text
            ctx.fillStyle = '#303030';
            ctx.font = 'bold 14px var(--font-body)';
            ctx.textAlign = 'center';
            ctx.fillText('Risk Level', centerX, centerY - radius - 10);

            if (progress < 1) {
                progress += 0.05;
                requestAnimationFrame(animate);
            }
        };

        animate();
    };

    // Format currency with animation
    const animateValue = (element, start, end, duration = 1000) => {
        const startTime = performance.now();
        const formatter = new Intl.NumberFormat('en-US');
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const value = Math.floor(start + (end - start) * progress);
            element.textContent = formatter.format(value);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    };

    // Handle calculation with animations
    const handleCalculation = async () => {
        const homeSize = parseInt(inputs.homeSize.value) || 0;
        const highValue = parseInt(inputs.highValue.value) || 0;
        const zipCode = inputs.zipCode.value;

        if (homeSize > 0) {
            // Switch to results slide
            showSlide(resultsSlide);

            // Calculate and animate financial results
            const { totalLoss, insuranceCoverage, mystuffLoss } = calculateFinancialLoss(homeSize, highValue);
            
            // Animate the numbers counting up
            animateValue(outputs.totalLoss, 0, totalLoss);
            setTimeout(() => animateValue(outputs.insuranceCoverage, 0, insuranceCoverage), 200);
            setTimeout(() => animateValue(outputs.mystuffLoss, 0, mystuffLoss), 400);

            // Assess and display risks with animation
            const risks = await assessDisasterRisk(zipCode);
            updateRiskDisplay(risks);
        }
    };

    // Handle back button
    const handleBack = () => {
        showSlide(formSlide);
    };

    // Event listeners
    document.querySelector('.calculate-btn').addEventListener('click', handleCalculation);
    backBtn.addEventListener('click', handleBack);
    
    // Input validation and enter key handling
    Object.values(inputs).forEach(input => {
        if (input.type === 'number') {
            input.addEventListener('input', () => {
                input.value = input.value.replace(/[^\d]/g, '');
                if (parseInt(input.value) > 50000000) {
                    input.value = '50000000';
                }
            });
        }
        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') handleCalculation();
        });
    });

    // Handle window resize for canvas
    window.addEventListener('resize', () => {
        const risks = {
            wildfire: outputs.wildfireRisk.textContent,
            flood: outputs.floodRisk.textContent,
            earthquake: outputs.earthquakeRisk.textContent
        };
        drawRiskMeter(risks);
    });
}

// Accordion functionality
function initializeAccordion() {
    const steps = document.querySelectorAll('.step');
    let activeStep = null;
    
    const toggleStep = (step, isActive) => {
        const btn = step.querySelector('.expand-btn i');
        if (isActive) {
            step.classList.add('active');
            btn.style.transform = 'rotate(180deg)';
            activeStep = step;
        } else {
            step.classList.remove('active');
            btn.style.transform = 'rotate(0deg)';
        }
    };

    steps.forEach(step => {
        step.addEventListener('click', e => {
            e.stopPropagation();
            if (step !== activeStep) {
                activeStep && toggleStep(activeStep, false);
                toggleStep(step, true);
            }
        });

        const content = step.querySelector('.step-content');
        content?.addEventListener('click', e => e.stopPropagation());

        const image = step.querySelector('.step-image');
        if (image) {
            step.addEventListener('mouseenter', () => {
                !step.classList.contains('active') && (image.style.transform = 'scale(1.05)');
            });
            step.addEventListener('mouseleave', () => image.style.transform = 'scale(1)');
        }
    });

    // Activate first step by default
    steps[0] && toggleStep(steps[0], true);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Start particle animation
    let particleInterval = setInterval(createParticle, 200);
    for (let i = 0; i < 15; i++) setTimeout(createParticle, i * 200);

    // Initialize components
    initializeCalculator();
    initializeAccordion();

    // Setup event listeners
    document.querySelectorAll('.cta-button').forEach(btn => 
        btn.addEventListener('mousemove', e => createSparkle(e, btn))
    );

    // Setup counter observer
    const counterObserver = new IntersectionObserver(
        entries => entries.forEach(entry => 
            entry.isIntersecting && (animateCounter(entry.target), counterObserver.unobserve(entry.target))
        ),
        { threshold: 0.5, rootMargin: '0px' }
    );

    document.querySelectorAll('.counter').forEach(counter => counterObserver.observe(counter));
}); 