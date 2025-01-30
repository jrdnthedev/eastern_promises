const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

const users = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      name: 'User',
      email: 'user@nextmail.com',
      password: '123456',
    },
  ];
  
  const customers = [
    {
      id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
      name: 'Evil Rabbit',
      email: 'evil@rabbit.com',
      image_url: '/customers/evil-rabbit.png',
    },
    {
      id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
      name: 'Delba de Oliveira',
      email: 'delba@oliveira.com',
      image_url: '/customers/delba-de-oliveira.png',
    },
    {
      id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
      name: 'Lee Robinson',
      email: 'lee@robinson.com',
      image_url: '/customers/lee-robinson.png',
    },
    {
      id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
      name: 'Michael Novotny',
      email: 'michael@novotny.com',
      image_url: '/customers/michael-novotny.png',
    },
    {
      id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
      name: 'Amy Burns',
      email: 'amy@burns.com',
      image_url: '/customers/amy-burns.png',
    },
    {
      id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
      name: 'Balazs Orban',
      email: 'balazs@orban.com',
      image_url: '/customers/balazs-orban.png',
    },
  ];
  
  const invoices = [
    {
      customer_id: customers[0].id,
      amount: 15795,
      status: 'pending',
      date: '2022-12-06',
    },
    {
      customer_id: customers[1].id,
      amount: 20348,
      status: 'pending',
      date: '2022-11-14',
    },
    {
      customer_id: customers[4].id,
      amount: 3040,
      status: 'paid',
      date: '2022-10-29',
    },
    {
      customer_id: customers[3].id,
      amount: 44800,
      status: 'paid',
      date: '2023-09-10',
    },
    {
      customer_id: customers[5].id,
      amount: 34577,
      status: 'pending',
      date: '2023-08-05',
    },
    {
      customer_id: customers[2].id,
      amount: 54246,
      status: 'pending',
      date: '2023-07-16',
    },
    {
      customer_id: customers[0].id,
      amount: 666,
      status: 'pending',
      date: '2023-06-27',
    },
    {
      customer_id: customers[3].id,
      amount: 32545,
      status: 'paid',
      date: '2023-06-09',
    },
    {
      customer_id: customers[4].id,
      amount: 1250,
      status: 'paid',
      date: '2023-06-17',
    },
    {
      customer_id: customers[5].id,
      amount: 8546,
      status: 'paid',
      date: '2023-06-07',
    },
    {
      customer_id: customers[1].id,
      amount: 500,
      status: 'paid',
      date: '2023-08-19',
    },
    {
      customer_id: customers[5].id,
      amount: 8945,
      status: 'paid',
      date: '2023-06-03',
    },
    {
      customer_id: customers[2].id,
      amount: 1000,
      status: 'paid',
      date: '2022-06-05',
    },
  ];
  
  const revenue = [
    { month: 'Jan', revenue: 2000 },
    { month: 'Feb', revenue: 1800 },
    { month: 'Mar', revenue: 2200 },
    { month: 'Apr', revenue: 2500 },
    { month: 'May', revenue: 2300 },
    { month: 'Jun', revenue: 3200 },
    { month: 'Jul', revenue: 3500 },
    { month: 'Aug', revenue: 3700 },
    { month: 'Sep', revenue: 2500 },
    { month: 'Oct', revenue: 2800 },
    { month: 'Nov', revenue: 3000 },
    { month: 'Dec', revenue: 4800 },
  ];

app.use(express.json());
app.use(cors(corsOptions));
app.use('/customers', express.static(path.join(__dirname, 'public/customers')));

app.get('/customers', (req, res) => {
    res.status(201).json(customers);
});

app.put('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    const updatedCustomer = req.body;

    const customerIndex = customers.findIndex((c) => c.id === customerId);

    if (customerIndex === -1) {
        return res.status(404).json({ message: 'Customer not found' });
    }

    // Update the existing customer data
    customers[customerIndex] = { ...customers[customerIndex], ...updatedCustomer };

    res.status(200).json({
        message: 'Customer updated successfully',
        customer: customers[customerIndex],
    });
});

app.post('/customers', (req, res) => {
    const newCustomer = req.body;

    customers.push(newCustomer);

    res.status(201).json({
        message: 'Customer added successfully',
        customer: newCustomer,
    });
});

app.get('/invoices', (req, res) => {
    res.send(invoices);
    res.status(201).json(invoices);
});

app.get('/revenue', (req, res) => {
    res.send(revenue);
    res.status(201).json(revenue);
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});