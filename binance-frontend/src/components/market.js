import {useState} from "react";
import {Line} from "react-chartjs-2";
import io from "socket.io-client";

export default function Market(props){
    let [trades, setTrades] = useState([]);
    let [movingAveragePrices, setMovingAveragePrices] = useState([]);
    let [monitoring, setMonitoring] = useState(false);
    let [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
            label: 'BTC-USDT',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        },
            {
                label: 'BTC-USDT (Moving Average)',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(0,0,200,0.6)',
                borderColor: 'rgba(0,0,200,0.5)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(0,0,200,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(0,0,200,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }
            ]
    });
    let socket = io("ws://localhost:5555");
    socket.on('ticker', (trade) => {
        console.log(trade);
    });

    let monitoringButton = <button onClick={() => setMonitoring(false)}
        className="btn btn-danger">Stop Monitoring</button>;
    if (!monitoring)
       monitoringButton = <button onClick={() => setMonitoring(true)}
                                  className="btn btn-success">Start Monitoring</button>;
    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <div className="card-title"><h3>Market Data</h3></div>
                    {monitoringButton}
                </div>
                <div className="card-body">
                    <Line redraw
                          data={chartData}
                          width={640}
                          height={480}
                          options={{animation: false}}></Line>
                </div>
            </div>
        </div>
    );
}