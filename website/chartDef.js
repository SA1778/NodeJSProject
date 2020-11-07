//Variables
let factor = 10;
let data = [Math.floor(Math.random()*factor), Math.floor(Math.random()*factor), Math.floor(Math.random()*factor), Math.floor(Math.random()*factor), Math.floor(Math.random()*factor)];
let ctx = document.getElementById('myChart').getContext('2d');

//Create Chart
let chartA = new Chart(ctx, {
    type: 'line',
    data: {
        labels:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets:[{
            data: data,
            label: "Data",
            borderColor: "#000be4",
            backgroundColor: "#000be44f",
            fill: true
        }]
    },
    options: {
        duration: 1000,
        aspectRatio: 2.5,
        title: {
            display: true,
            text: "Javascript Chart",
            fontFamily: "times"
        },
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
    }
});

//Function Definitions
function randomizeData(){
    let newData = data.map(x => Math.floor(Math.random()*factor));
    chartA.data.datasets[0].data = newData;
    chartA.update();
}