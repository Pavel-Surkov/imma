import React, { useState, useEffect } from 'react';
import { tableData } from '../helpers/nftTableData';
import { ProductMoreNft } from './ProductMoreNft';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/*const data = [
  {
    name: '1/13',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '1/14',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '1/15',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '1/16',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '1/17',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '1/18',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '1/19',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];*/

const CustomizedAxisTick = (props) => {
	const { x, y, stroke, payload, dx, dy, vertical } = props;
	return (
		<g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dx={dx} dy={dy} textAnchor="end" fill="#EBEBEB">
        {payload.value}
      </text>
			</g>
	);
}

export const OriginalNftGraphic = (props) => {
	const data = [];
	const inft = props.inft;
	const priceHistoryNfta = inft.nfta.price_history;
	const priceHistoryInft = inft.inft.price_history;
	let avgPrice = 0;
	if (priceHistoryNfta.length === 0) {
		const today = new Date();
		const currentMonth = today.getMonth()+1;
		const currentYear = today.getFullYear();
		for (let i = currentMonth-6; i <= currentMonth; i++) {
			let month;
			if (String(i + 1).length === 1) {
				month = '0' + (i + 1);
			} else {
				month = i + 1;
			}
			const dataElem = {
				date: month + '/' + 2022,
				dateLabel: month + '/' + 2022,
				nftaPrice: 0,
			}
			data.push(dataElem);
		}
	} else {
		priceHistoryNfta.sort(function (a, b) {
		  if (a.timestamp > b.timestamp) {
		    return 1;
		  }
		  if (a.timestamp < b.timestamp) {
		    return -1;
		  }
		  return 0;
		});
		let prevElem = null;
		priceHistoryNfta.map((elem, i) => {
			//i = i - removedElements;
			const a = new Date(elem.timestamp * 1000);
	  	let month = String(a.getMonth() + 1);
			if (month.length === 1) {
				month = '0' + month;
			}
			let date = String(a.getDate());
			if (date.length === 1) {
				date = '0' + date;
			}
			const year = String(a.getFullYear());
			const dataElem = {
				date: month + '/' + year,
				dateLabel: month + '/' + year,
				nftaPrice: elem.priceEth,
			}
			if (prevElem) {
				if (prevElem.date === dataElem.date) {
					data.pop();
				}
			}
			data.push(dataElem);
			prevElem = dataElem;
		});
	}
	if (priceHistoryInft.length === 0) {
		for (let i = 0; i < 6; i++) {
			let month;
			if (String(i + 1).length === 1) {
				month = '0' + (i + 1);
			} else {
				month = i + 1;
			}
			const dataElem = {
				date: month + '/' + 2022,
				dateLabel: month + '/' + 2022,
				inftPrice: 0,
			}
			const index = data.findIndex(x => x.date === (month + '/' + 2022));
			if (index === -1) {
				data.push(dataElem);
			} else {
				data[index].inftPrice = 0;
			}
		}
	} else {
		priceHistoryInft.sort(function (a, b) {
		  if (a.timestamp > b.timestamp) {
		    return 1;
		  }
		  if (a.timestamp < b.timestamp) {
		    return -1;
		  }
		  return 0;
		});
		let prevElem = null;
		priceHistoryInft.map((elem, i) => {
			const a = new Date(elem.timestamp * 1000);
	  	let month = String(a.getMonth() + 1);
			if (month.length === 1) {
				month = '0' + month;
			}
			let date = String(a.getDate());
			if (date.length === 1) {
				date = '0' + date;
			}
			const year = String(a.getFullYear());
			const fullDate = month + '/' + year;
			const dataElem = {
				date: fullDate,
				dateLabel: month + '/' + year,
				inftPrice: elem.priceEth,
			}
			const index = data.findIndex(x => x.date === fullDate);
			if (index === -1) {
				if (prevElem) {
					if (prevElem.date === dataElem.date) {
						data.pop();
					}
				}
				prevElem = dataElem;
				data.push(dataElem);
			} else {
				data[index].inftPrice = elem.priceEth;
			}
		});
	}

	let lastInftPrice = -1;
	let lastNftaPrice = -1;
	/* set both price values for all time points */
	data.map((elem, i) => {
		if (('nftaPrice' in elem) && !('inftPrice' in elem)) {
			data[i].inftPrice = lastInftPrice;
			lastNftaPrice = elem.nftaPrice;
		} else {
			if (!('nftaPrice' in elem) && ('inftPrice' in elem)) {
				data[i].nftaPrice = lastNftaPrice;
				lastNftaPrice = elem.inftPrice;
			} else {
				lastInftPrice = elem.inftPrice;
				lastNftaPrice = elem.nftaPrice;
			}
		}
	});
	lastInftPrice = -1;
	lastNftaPrice = -1;
	data.slice(0).reverse().map((elem, i) => {
		if ((elem.nftaPrice != -1) && !(elem.inftPrice != -1)) {
			data[data.length-1-i].inftPrice = lastInftPrice;
			lastNftaPrice = elem.nftaPrice;
		} else {
			if (!(elem.nftaPrice != -1) && (elem.inftPrice != -1)) {
				data[data.length-1-i].nftaPrice = lastInftPrice;
				lastNftaPrice = elem.inftPrice;
			} else {
				lastInftPrice = elem.inftPrice;
				lastNftaPrice = elem.nftaPrice;
			}
		}
	});
	/* averege price */
	data.map((elem, i) => {
		avgPrice += elem.nftaPrice;
	});
	avgPrice /= data.length;
	console.log(data);
	return (
		<div className="price-graphic">
			<div className="price-graphic__title">
				All Time Avg. Price
			</div>
			<div className="price-graphic__number">
				<svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
					<line x1="0.501953" y1="1.2074" x2="9.73203" y2="1.2074" stroke="#D6FF7E" strokeWidth="2"/>
					<line x1="0.501953" y1="6.2074" x2="9.73203" y2="6.2074" stroke="#D6FF7E" strokeWidth="2"/>
					<line x1="0.501953" y1="11.2074" x2="9.73203" y2="11.2074" stroke="#D6FF7E" strokeWidth="2"/>
				</svg>
				<span>{avgPrice}</span>
			</div>
			<ResponsiveContainer width="100%">
        <LineChart width={300} height={100} data={data}>
					<CartesianGrid x1={5000} stroke={'rgba(255, 255, 255, 0.2)'} vertical={false} />
					<YAxis tick={<CustomizedAxisTick dy={5} dx={-30} vertical={true} />} tickLine={false} axisLine={false} />
					<XAxis tick={<CustomizedAxisTick dy={19} dx={20} />} tickLine={false} axisLine={false} dataKey="dateLabel" />
          <Line type="monotone" dataKey="nftaPrice" stroke="#FF7EA5" strokeWidth={2} dot={null} />
          <Line type="monotone" dataKey="inftPrice" stroke="#D6FF7E" strokeWidth={2} dot={null} />
        </LineChart>
      </ResponsiveContainer>
		</div>
	);
};
