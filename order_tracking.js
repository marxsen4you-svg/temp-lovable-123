document.addEventListener('DOMContentLoaded', () => {
    const trackingForm = document.getElementById('tracking-form');
    const orderNumberInput = document.getElementById('order-number');
    const trackingStatusDiv = document.getElementById('tracking-status');

    if (trackingForm) {
        trackingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const orderNumber = orderNumberInput.value.trim();

            if (!orderNumber) {
                trackingStatusDiv.innerHTML = `<span class="text-neon-magenta">Please enter an order number.</span>`;
                return;
            }

            trackingStatusDiv.innerHTML = `<span class="text-synthwave-blue">Searching for order...</span>`;

            setTimeout(() => {


                const statuses = [
                    'Shipped. Estimated delivery: 2-3 business days.',
                    'Out for delivery.',
                    'Delivered.',
                    'Processing at warehouse.'
                ];
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                
                trackingStatusDiv.innerHTML = `
                    <p>Order <span class="text-white">#${orderNumber}</span> found.</p>
                    <p>Status: <span class="text-bio-lume-green">${randomStatus}</span></p>
                `;
            }, 1500);
        });
    }
});
