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
  
let customers = [
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

let invoices = [
  {
    id: 'd6e15627-9fe1-4961-8c5b-ea44a9bd81aa',
    customer_id: customers[0].id,
    amount: 5795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    id: '3958dc3e-712f-4377-85e9-fec4b6a6442a',
    customer_id: customers[1].id,
    amount: 2348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    id: '3958dc9e-142f-4377-85e9-fec4b6a6442a',
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    id: '76d25c26-f784-44a2-kc19-586678f7c2f2',
    customer_id: customers[3].id,
    amount: 4800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    id: 'CC24C14A-0ACF-4F4A-A6C1-D45682C144B9',
    customer_id: customers[5].id,
    amount: 4577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    id: '76d25c26-f784-44a2-kc19-586678fxc2b2',
    customer_id: customers[2].id,
    amount: 5246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    id: '13D07535-C52E-4157-A011-F1D2EF4E8CBB',
    customer_id: customers[0].id,
    amount: 2666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    id: '13E07535-C59E-4157-A911-F8D2EF4E0CBB',
    customer_id: customers[3].id,
    amount: 3545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    id: '13D47930-G59E-9154-A011-F8D2EX4E0CBB',
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    id: '13D07536-C59E-4157-A061-F8D2EF4E0CBB',
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    id: '13T07535-H59E-4157-A011-F8D2EF4E0CBB',
    customer_id: customers[1].id,
    amount: 4500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    id: '13T07535-H29E-7357-A011-F8D2EF4E0MMB',
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    id: '13T07839-BH59E-4157-A011-F8D2EF4E0CGG',
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

app.use(express.json());
app.use(cors(corsOptions));
app.use('/customers', express.static(path.join(__dirname, 'public/customers')));

app.get('/customers', (req, res) => {
    res.status(201).json(customers);
});

app.get('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    const customer = customers.find((c) => c.id === customerId);

    if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
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

app.delete('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    const customerIndex = customers.findIndex((c) => c.id === customerId);

    if (customerIndex === -1) {
        return res.status(404).json({ message: 'Customer not found' });
    }
    
    customers.splice(customerIndex, 1);
    invoices = invoices.filter((i) => i.customer_id !== customerId);

    res.status(200).json({ message: 'Customer deleted successfully' });
});

app.post('/customers', (req, res) => {
    try {
      const newCustomer = req.body;

    customers.push(newCustomer);

    res.status(201).json({
        message: 'Customer added successfully',
        customer: newCustomer,
    });
    } catch(error) {
        res.status(400).json({ message: 'Invalid customer data' });
    }
});

app.post('/invoices', (req,res) => {
  const newInvoice = req.body;

  invoices.push(newInvoice);

  res.status(201).json({
    message: 'Invoice added successfully',
    invoice: newInvoice,
  });
});

app.put('/invoices/:id', (req, res) => {
  const invoiceID = req.params.id;
  const updatedInvoice = req.body;

  const invoiceIndex = invoices.findIndex((i) => i.id === invoiceID);

  if (invoiceIndex === -1) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  invoices[invoiceIndex] = { ...invoices[invoiceIndex], ...updatedInvoice };

  res.status(200).json({
    message: 'Invoice updated successfully',
    invoice: invoices[invoiceIndex],
  });
});

app.delete('/invoices/:id', (req, res) => {
  const invoiceID = req.params.id;
  const invoiceIndex = invoices.findIndex((i) => i.id === invoiceID);

  if (invoiceIndex === -1) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  invoices.splice(invoiceIndex, 1);

  res.status(200).json({ message: 'Invoice deleted successfully' });
});

app.get('/invoices', (req, res) => {
    res.send(invoices);
    res.status(201).json(invoices);
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});