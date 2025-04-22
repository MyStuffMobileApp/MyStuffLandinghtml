// Calculator module
// Financial Loss Calculator
class Calculator {
    constructor() {
        this.setupEventListeners();
        this.setupCharts();
        this.updateRiskArrow();
    }

    setupEventListeners() {
        const form = document.getElementById('calculator-form');
        const backBtn = document.querySelector('.back-btn');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateRisk();
            });
        }

        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.showForm();
            });
        }
    }

    updateRiskArrow() {
        const riskLevels = {
            'high': 90,    // Wildfire risk
            'medium': 45,  // Earthquake risk
            'low': 0       // Flood risk
        };

        // Get the highest risk level
        const highestRisk = 'high'; // Currently hardcoded to high due to wildfire risk
        const arrowRotation = riskLevels[highestRisk];
        
        const riskArrow = document.querySelector('.risk-arrow');
        if (riskArrow) {
            riskArrow.style.transform = `rotate(${arrowRotation}deg)`;
        }
    }

    setupCharts() {
        // Set up the value distribution chart
        const valueCtx = document.getElementById('value-distribution');
        if (valueCtx) {
            this.valueChart = new Chart(valueCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Insurance Coverage (70%)', 'Coverage Gap (30%)'],
                    datasets: [{
                        data: [70, 30],
                        backgroundColor: ['#6dc1e8', '#f16ceb'],
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: '70%',
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        // Set up the risk meter
        const riskCtx = document.getElementById('risk-canvas');
        if (riskCtx) {
            this.riskGauge = new Chart(riskCtx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [75, 25], // 75% = high risk
                        backgroundColor: ['#ff4444', '#f0f0f0'],
                        borderWidth: 0
                    }]
                },
                options: {
                    circumference: 180,
                    rotation: -90,
                    cutout: '80%',
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }

    calculateRisk() {
        const homeSize = parseFloat(document.getElementById('home-size').value) || 0;
        const highValue = parseFloat(document.getElementById('high-value').value) || 0;
        const zipCode = document.getElementById('zip-code').value;

        // Calculate total loss (simple example)
        const totalLoss = homeSize * 200 + highValue; // $200 per sq ft + high-value items
        const insuranceCoverage = totalLoss * 0.7; // 70% coverage
        const coverageGap = totalLoss * 0.3; // 30% gap

        // Update the display
        this.updateResults(totalLoss, insuranceCoverage, coverageGap);
        this.showResults();
    }

    updateResults(total, coverage, gap) {
        // Update monetary values
        document.getElementById('total-loss').textContent = this.formatCurrency(total);
        document.getElementById('insurance-coverage').textContent = this.formatCurrency(coverage);
        document.getElementById('mystuff-loss').textContent = this.formatCurrency(gap);

        // Animate the charts
        this.animateCharts(total, coverage, gap);

        // Update risk indicators and charts
        this.updateRiskArrow();
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 0
        }).format(value);
    }

    animateCharts(total, coverage, gap) {
        // Animate value distribution
        if (this.valueChart) {
            this.valueChart.data.datasets[0].data = [coverage, gap];
            this.valueChart.update();
        }

        // Animate risk meter (example risk calculation)
        if (this.riskGauge) {
            const riskPercentage = Math.min(((total / 1000000) * 100), 100);
            this.riskGauge.data.datasets[0].data = [riskPercentage, 100 - riskPercentage];
            this.riskGauge.update();
        }

        // Animate the risk bars
        document.querySelectorAll('.meter-fill').forEach(meter => {
            meter.style.width = meter.dataset.risk === 'high' ? '90%' : 
                              meter.dataset.risk === 'medium' ? '60%' : '20%';
        });
    }

    showResults() {
        document.querySelector('[data-slide="form"]').style.display = 'none';
        document.querySelector('[data-slide="results"]').style.display = 'block';
    }

    showForm() {
        document.querySelector('[data-slide="results"]').style.display = 'none';
        document.querySelector('[data-slide="form"]').style.display = 'block';
    }
}

// Initialize the calculator
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});

export default Calculator; 