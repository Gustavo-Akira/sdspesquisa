import React, { useEffect, useState } from 'react';
import Filter from '../../components/Filter';
import Chart from 'react-apexcharts';
import { barOptions, pieOptions } from './chart-options';
import './style.css';
import Axios from 'axios';
import {BASE_URL} from '../Records';
import { buildBarSeries, getGenderChartData, getPlatformChartData } from '../../helpers/helperChart';
type PieChartData = {
    labels:string[];
    series: number[];
}
type BarChartData={
    x:string;
    y:number;
}
const initialPieData = {
    labels:[],
    series:[]
}
const Charts =()=>{
    const [barChartData, setBarChartData] = useState<BarChartData[]>();
    const [platformData, setPlatformData] = useState<PieChartData>(initialPieData);
    const [genderData, setGenderData] = useState<PieChartData>(initialPieData);
    useEffect(()=>{
        async function getData(){
            const recordsResponse = await Axios.get(`${BASE_URL}records`);
            const gamesResponse = await Axios.get(`${BASE_URL}games/`);
            const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
            setBarChartData(barData);
            const platformChartData = getPlatformChartData(recordsResponse.data.content);
            setPlatformData(platformChartData);
            const genderChartData = getGenderChartData(recordsResponse.data.content);
            setGenderData(genderChartData);
        }
        getData();
    },[]);
    return(
        <div className="page-container">
            <Filter link="/records" linkText="See records"/>
            <div className="chart-container">
                <div className="top-related">
                    <h1 className="top-related-title">
                        Most voted Games
                    </h1>
                    <div className="games-container">
                        <Chart 
                            options={barOptions}
                            type="bar"
                            width="500"
                            height="650"
                            series={[{data:barChartData}]}
                        />
                    </div>
                </div>
                <div className="charts">
                    <div className="platform-chart">
                        <h2 className="chart-title">Plataforms</h2>
                        <Chart 
                            options={{...pieOptions,labels:platformData.labels}}
                            type="donut"
                            series={platformData.series}
                            width="350"

                        />
                    </div>
                    <div className="gender-chart">
                        <h2 className="chart-title">
                            Genders
                        </h2>
                        <Chart 
                            options={{...pieOptions,labels:genderData.labels}} 
                            type="donut"
                            series={genderData.series}
                            width="350"
                            
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Charts;