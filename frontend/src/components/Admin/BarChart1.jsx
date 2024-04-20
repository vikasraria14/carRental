import CanvasJSReact from './canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function BarChart({ data, heading, title, legend }) {
    let dataP1 = [];  
    data?.map((element,index) => { 
        let datapoint = {
            y: Number(element.value),
            label: element.label ,
            color:"blue"    
        }
        dataP1.push(datapoint);
        return "";
    });

    const options = {
        backgroundColor: "transparent",
        animationEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        axisY: {
            title: title,
            includeZero: true,
            suffix: "",
            minimum:0,
            lineThickness: 2,
        },
        toolTip: {
            shared: true
        },
        data: [
            {
                type: "column", 
                name: title,
                showInLegend: true,
                markerType : "circle",
                xValueFormatString:'MMM-YYYY',
                yValueFormatString : "####0.## ",
                legendText: legend,
                markerSize : 1,
                fillOpacity: .8,
                dataPoints: dataP1
            }
        ],
    };
  
    return (
        <>
            <h1 className="text-3xl font-bold">{heading}</h1>
            <CanvasJSChart
                className="text-black dark:text-white"
                containerProps={{ width: '100%', height: '80%'}}
                options={options}
            /> 
        </>
    );
};
