
window.onload = function(){
    Chart.defaults.global.plugins.datalabels.display = false;
    var ctx = document.getElementById("chart");
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ['Juan Mendoza', 'José Pérez', 'Adonis Méndez', 'Yared Mendoza', 'Freddy Ventura'],
            datasets: [
                {
                    label: 'Empleados',
                    data: [2, 5, 9, 7, 10],
                    backgroundColor: 'rgba(227, 126, 52, 0.5)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Valoracion',
                    data: [
                            parseFloat(10 - 2).toFixed(2), 
                            parseFloat(10 - 5).toFixed(2), 
                            parseFloat(10 - 9).toFixed(2), 
                            parseFloat(10 - 7).toFixed(2),
                            parseFloat(10 - 10).toFixed(2)
                    ],
                    backgroundColor: 'rgba(138,221,45,0)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            tooltips: { enabled: false },
            hover: { animationDuration: 0 },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 10,
                    },
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
    Chart.plugins.register({
        afterDatasetsDraw: function (chart, easing) {
            var ctx = chart.ctx;
            chart.data.datasets.forEach(function (dataset, i) {
                if (i === 0) {
                    var meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element, index) {
                            // Draw the text in black, with the specified font
                            ctx.fillStyle = '#000';
                            var fontSize = 12;
                            var fontStyle = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
                            ctx.font = Chart.helpers.fontString(fontSize, fontStyle);
                            // Just naively convert to string for now
                            var dataString = dataset.data[index].toString();
                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            var padding = -10;
                            var position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x - (fontSize / 2) - 20, position.y - (fontSize / 2) - padding);
                        });
                    }
                }
            });
        }
    });
}