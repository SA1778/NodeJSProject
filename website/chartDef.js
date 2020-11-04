let ctx = document.getElementById('myChart').getContext('2d');
let chartA = new Chart(ctx, {
    type: 'line',
    data: {
        labels:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets:[{
            data:[10, 60, 40, 65, 20],
            label:"Temperature",
            borderColor: "#0004e4",
            backgroundColor: "#0004e42f",
            fill: true
        }]
    },
    options: {
        duration: 1500,
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
    }
});