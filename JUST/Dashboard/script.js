const toggleLink = document.querySelector('.toggle');
const dropdown = document.querySelector('.dropdown');

// Toggle dropdown when clicking on the "Maintenance" link
toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown.classList.toggle('active');
});

// Hide dropdown if clicking outside
document.addEventListener('click', (e) => {
  // If the click is outside the toggle link and dropdown, retract it
  if (!dropdown.contains(e.target) && !toggleLink.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});



window.onload = function () {
    fetch('data.php')
        .then(response => response.json())
        .then(data => {
            // Aggregate data for Bar, Line, and Pie Charts
            const aggregatedData = aggregateDataByMonth(data);

            const labels = aggregatedData.labels; // Use aggregated labels
            const values = aggregatedData.values; // Use aggregated values

            // Bar Chart
            const barCtx = document.getElementById('barChart').getContext('2d');
            new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Bar Chart Data',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Line Chart
            const lineCtx = document.getElementById('lineChart').getContext('2d');
            new Chart(lineCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Line Chart Data',
                        data: values,
                        fill: false,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Pie Chart with 3D-like effect
            const pieCtx = document.getElementById('pieChart').getContext('2d');
            const gradient = pieCtx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(255, 99, 132, 0.8)');
            gradient.addColorStop(1, 'rgba(54, 162, 235, 0.8)');

            new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: labels, // Use aggregated labels
                    datasets: [{
                        label: 'Pie Chart Data',
                        data: values, // Use aggregated values
                        backgroundColor: [
                            gradient,  // Simulate 3D look with gradient
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)',
                            'rgba(255, 159, 64, 0.8)',
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)',
                            'rgba(255, 159, 64, 0.8)'
                        ],
                        borderColor: 'rgba(255, 255, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'left'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return tooltipItem.label + ': ' + tooltipItem.raw;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.log(error));
};

// Function to aggregate values for the same month
function aggregateDataByMonth(data) {
    const monthData = {};

    data.forEach(item => {
        const month = item.label;
        const value = parseInt(item.value, 10);

        if (monthData[month]) {
            monthData[month] += value;  // Sum values for the same month
        } else {
            monthData[month] = value;
        }
    });

    const labels = Object.keys(monthData);
    const values = Object.values(monthData);

    return { labels, values };
}


