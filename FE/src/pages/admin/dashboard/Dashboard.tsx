import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const orderData = [
  { month: 'January', orders: 65, income: 1000 },
  { month: 'February', orders: 59, income: 1200 },
  { month: 'March', orders: 80, income: 1500 },
  { month: 'April', orders: 81, income: 1700 },
  { month: 'May', orders: 56, income: 1100 },
  { month: 'June', orders: 55, income: 1300 },
  { month: 'July', orders: 40, income: 900 }
];

export const Dashboard = () => {
  return (
    <div>
      <h2>Order Statistics</h2>
      <LineChart width={600} height={300} data={orderData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      <h2>Order Quantity and Total Income</h2>
      <BarChart width={600} height={300} data={orderData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" fill="#8884d8" />
        <Bar dataKey="income" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};
