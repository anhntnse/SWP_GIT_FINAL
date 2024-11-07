import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import { Select, Table } from 'antd';

const RevenueSummary = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('weekly'); // 'weekly' or 'monthly'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SummaryApi.revenueSummary.url}/${period}`, {
          method: SummaryApi.revenueSummary.method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log("Revenue Summary: ", data);
        setData(data);
      } catch (error) {
        console.error('Failed to fetch revenue data:', error);
      }
    };

    fetchData();
  }, [period]);

  // Format date based on period
  const formatDate = (dateString) => {
    if (period === 'weekly') {
      // Assuming format "YYYY-WW" for weekly data
      const [year, week] = dateString.split('-');
      return `Tuần ${week}, ${year}`;
    } else if (period === 'monthly') {
      // Assuming format "YYYY-MM" for monthly data
      const [year, month] = dateString.split('-');
      return `Tháng ${parseInt(month, 10)} ${year}`;
    }
    return dateString;
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: '_id',
      key: '_id',
      render: (dateString) => formatDate(dateString), // Use the format function here
    },
    {
      title: 'Total Revenue',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      render: (value) => displayINRCurrency(value),
    },
    {
      title: 'Order Count',
      dataIndex: 'orderCount',
      key: 'orderCount',
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Revenue Summary</h2>

      <Select defaultValue="weekly" onChange={(value) => setPeriod(value)} className="mb-4">
        <Select.Option value="weekly">Weekly</Select.Option>
        <Select.Option value="monthly">Monthly</Select.Option>
      </Select>

      <div className="my-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" tickFormatter={formatDate} /> {/* Format on X-axis */}
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Table dataSource={data} columns={columns} pagination={false} rowKey="_id" className="mt-6" />
    </div>
  );
};

export default RevenueSummary;
