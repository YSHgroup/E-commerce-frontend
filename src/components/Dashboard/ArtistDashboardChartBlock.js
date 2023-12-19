import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const ArtistDashboardChartBlock = ({ chartData, totalEarnings, totalSales }) => {
    const [data, setData] = useState([]);
    const [chartOptions, setChartOptions] = useState([]);

    useEffect(() => {
        setData({
            labels: chartData.salesLabels,
            datasets: [{
                data: chartData.salesData,
                backgroundColor: fillArray('rgba(133, 79, 255, 0.2)', 60),
                borderWidth: 0,
                borderColor: 'transparent',
                hoverBorderColor: 'transparent',
                borderSkipped: 'bottom',
                barPercentage: .7,
                categoryPercentage: .7
            }]
        });
        setChartOptions({
            plugins: {
                legend: {
                    display: false,
                    rtl: false,
                    labels: {
                        boxWidth: 30,
                        padding: 20,
                        fontColor: '#6783b8'
                    }
                },
                tooltip: {
                    enabled: true,
                    rtl: false,
                    callbacks: {
                        title: function title(tooltipItem, data) {
                            return false;
                        },
                        label: function label(context) {
                            return context.label + ': ' + context.dataset.data[context.dataIndex];
                        }
                    },
                    backgroundColor: '#1c2b46',
                    titleFontSize: 11,
                    titleFontColor: '#fff',
                    titleMarginBottom: 4,
                    bodyFontColor: '#fff',
                    bodyFontSize: 10,
                    bodySpacing: 3,
                    yPadding: 8,
                    xPadding: 8,
                    footerMarginTop: 0,
                    displayColors: false
                },
            },
            maintainAspectRatio: false,
            animation: false,
            scales: {
                y: {
                    display: false,
                    stacked: false,
                    ticks: {
                        beginAtZero: true
                    }
                },
                x: {
                    display: false,
                    stacked: false,
                    ticks: {
                        reverse: false
                    }
                }
            }
        });
    }, [chartData]);

    const fillArray = (value, len) => {
        var arr = [];
        for (var i = 0; i < len; i++) {
            arr.push(value);
        }
        return arr;
    }

    return (
        <div className="nk-block">
            <div className="card">
                <div className="card-inner">
                    <div className="card-title-group align-start mb-2">
                        <div className="card-title">
                            <h6 className="title">Earnings &amp; Downloads</h6>
                        </div>
                    </div>
                    <div className="align-end gy-3 gx-5 flex-wrap flex-md-nowrap flex-lg-wrap flex-xxl-nowrap">
                        <div className="nk-sale-data-group flex-md-nowrap g-4">
                            <div className="nk-sale-data">
                                <span className="amount">${ totalEarnings.toFixed(2) }</span>
                                <span className="sub-title">Earnings</span>
                            </div>
                            <div className="nk-sale-data">
                                <span className="amount">{ totalSales }</span>
                                <span className="sub-title">Downloads</span>
                            </div>
                        </div>
                        <div className="nk-sales-ck sales-revenue">
                            <Bar
                                className="sales-bar-chart"
                                data={ data }
                                options={ chartOptions }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistDashboardChartBlock;
