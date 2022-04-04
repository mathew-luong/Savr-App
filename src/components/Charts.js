// Charts 
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
}   from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend,  PointElement, LineElement);


// Barchart/linechart x axis
export const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Updates the corresponding month (index of array is month) with the value
// In future, just take current month index (rather than hardcode)
// Used as onClick handler for expenses page??
export function updateBarChart(barChartData, monthInd, value) {
    // Adds value to month
    // e.g. If month is june and you made $200 -> updateBarChart(6,200)
    if(monthInd-1 >= 0 && monthInd-1 <= 12) {
        barChartData[monthInd-1] += value;
    }
}

// Updates the data for the target expenses piechart on the expenses page
export function updateExpPieChart(pieChart, expCategory, value) {
    switch(expCategory) {
        case "Transportation":
            pieChart[0] = value;
            break;
        case "Entertainment":
            pieChart[1] = value;
            break;
        case "Food":
            pieChart[2] = value;
            break;
        case "Rent":
            pieChart[3] = value;
            break;
        case "Gas":
            pieChart[4] = value;
            break;
        case "Travel":
            pieChart[5] = value;
            break;
        case "Groceries":
            pieChart[6] = value;
            break;
        case "Household":
            pieChart[7] = value;
            break;
        case "Utilities":
            pieChart[8] = value;   
            break; 
        case "Education":
            pieChart[9] = value;
            break;
        case "Family":
            pieChart[10] = value;
            break;
        case "Bills":
            pieChart[11] = value;
            break;
        case "Personal":
            pieChart[12] = value;
            break;
        case "Other":
            pieChart[13] = value;
            break;
        default:
            return;
    }
}


// Tooltip - Calculates the % change from previous month and current month 
function barGraphTooltip(barChartObj, data, monthInd) {
    // Get data array from barchartobj
    let barChartData = barChartObj.dataset.data;
    if(monthInd > 0) {
        let prevMonth = barChartData[monthInd-1];
        let currMonth = barChartData[monthInd];
        let change;
        // Check if balance increased or decreased from last month
        (prevMonth > currMonth) ? change = "Down" : change = "Up"
        // Calculate percent change from previous month
        let percent = ((currMonth - prevMonth) / (prevMonth)) * 100;
        return "$" + data + " - " + change + " " + Math.abs(Math.round(percent)) + "%";
    }
    else {
        // Month is January so no previous month data
        return "$" + data;
    }
}

// Configuration options for barchart and linechart on Dashboard/Expenses page
export const options = {
    responsive: true,
    maintainAspectRatio: false,
    // remove grid lines
    scales: {
        x: {
            grid: {
                display: false
            },
        },
        y: {
            grid: {
                display: false  
            },
            display: true        // REMOVES Y-AXIS
        }
    },
    plugins: {
        // remove legend label
        legend: {
            display: false
        },
        // remove title
        title: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    return barGraphTooltip(context, context.formattedValue,context.dataIndex);
                }
            },
            displayColors: false
        }
    },
    elements: {
        line: {
            tension: 0.25
        }
    }
};

// Tooltip for pie graph on Expenses page
// Returns $value
function pieGraphTooltip(value) {
    return "$" + value;
}

export const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: 90,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                usePointStyle: true,
                pointStyle: 'rectRounded'
            }
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    return pieGraphTooltip(context.formattedValue);
                }
            },
            displayColors: false
        }
    }
}