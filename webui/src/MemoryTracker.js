import React, {Component} from "react";
import {LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Label} from 'recharts'


class MemoryTracker extends Component{
    constructor() {
        super();
        const memoryData = [];
        for(let i = 0; i < 120; i++) {
            memoryData.push({
                time: 0,
                memory: 0
            })
        }
        this.state = {memoryData: memoryData};
        this.counter = 0;

        setInterval(this.insertMemoryUsage.bind(this), 300);
    }

    insertMemoryUsage() {
        const memory = window.performance.memory.usedJSHeapSize;
        this.counter ++;
        let memoryData = [...this.state.memoryData];
        if (memoryData.length == 120) {
            memoryData.shift();
        }
        memoryData.push({
            time: this.counter,
            memory: memory/1024/1024
        })
        this.setState({memoryData: memoryData})
    }

    render() {
        return (<div style={{position: "fixed", left: "30px", top: "70px"}}>
            <LineChart
                width={400}
                height={400}
                data={this.state.memoryData}
                margin={{ top: 50, right: 20, left:20, bottom: 35 }}
            >
                <XAxis dataKey="time">
                    <Label value="Time since start" offset={0} position="bottom" />
                </XAxis>
                <YAxis dataKey={"memory"}>
                    <Label value="Memory(MB)" offset={0} position="top" />
                </YAxis>
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="memory" stroke="#ff7300" yAxisId={0} />
            </LineChart>
        </div>)
    }

}

export default MemoryTracker;