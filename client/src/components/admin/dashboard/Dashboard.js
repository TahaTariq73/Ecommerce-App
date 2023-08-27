import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Divider from '@mui/material/Divider';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { getDashboardStats } from "../../../actions/productAction";
import { setAlert } from "../../../alert/alertAction";
import Loader from "../../layout/loader/Loader";
import "./dashboard.css";

function getRecentMonths () {
    const labels = [];

    let months = [
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December'
    ]

    if (window.innerWidth < 640) {
        months = months.map((e) => e.slice(0, 2));
    }

    const currentMonth = new Date().getMonth();
    const remain = 11 - currentMonth;

    for (let i = currentMonth; i < months.length; i--) {
        labels.unshift(months[i]);
        
        if (i === 0) break;
    }

    for (let i = 11; i > remain; i--) {
        labels.unshift(months[i]);
        
        if (i === currentMonth) break;
    }

    labels.splice(0, 1);
    return labels;
}

const Dashboard = () => {
    const dispatch = useDispatch();

    const {
        loading,
        stats,
        error
    } = useSelector((state) => state.stats);

    useEffect(() => {
        if (error) {
            return dispatch(setAlert(true, "error", error));
        }

        dispatch(getDashboardStats());
    }, [dispatch, error])

    let upperStats = [];
    upperStats = loading || Object.keys(stats).length === 0 ? [] : [
        {
            title: "PRODUCTS",
            totalValue: stats.productsCount,
            recentValue: stats.statsData[11].products
        },
        {
            title: "USERS",
            totalValue: stats.usersCount,
            recentValue: "NO CAL"
        },
        {
            title: "ORDERS",
            totalValue: stats.ordersCount,
            recentValue: stats.statsData[11].orders
        }
    ]

    let monthlySales = [];
    monthlySales = loading || Object.keys(stats).length === 0 ? 
        [] : stats.statsData.map((item) => item["sales"]);

    return (
        <Fragment>
            {loading || Object.keys(stats).length === 0 ? (
                <Loader />
            ) : (
                <div className="dashboard-body">
                    <div className="dashboard-stats-grids">
                        {upperStats && upperStats.map((item, index) => (
                            <div className="dashboard-stat" key={index}>
                                <h4> {item.title} </h4>
                                <Divider />

                                <div className="stat">
                                    <h3> {item.totalValue}.000 </h3> 
                                    <h3 className="month-stat"> {item.recentValue} of recent month </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                
                    <BarChart
                        xAxis={[{
                            data: getRecentMonths(),
                            scaleType: 'band',
                        }]}
                        series={[{
                            data: monthlySales,
                        },
                        ]}
                        sx={{ width: '100%' }}
                        height={400}
                    />

                    <div className="pie-charts-container">
                        <PieChart
                            series={[
                                {
                                data: [
                                    { id: 0, value: stats.deliveredOrders, label: `${stats.deliveredOrders} Delivered Orders` },
                                    { id: 1, value: stats.shippedOrders, label: `${stats.shippedOrders} Shipped Orders` },
                                    { id: 2, value: stats.processingOrders, label: `${stats.processingOrders} Processing Orders` },
                                ],
                                },
                            ]}
                            width={400}
                            height={200}
                        />

                        <PieChart
                            series={[{
                                data: [
                                    { id: 0, value: stats.productsInStock, label: `${stats.productsInStock} InStock` },
                                    { id: 1, value: stats.productsOutOfStock, label: `${stats.productsOutOfStock} OutOfStock` },
                                ],
                                innerRadius: 40,
                                outerRadius: 80,
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default Dashboard;