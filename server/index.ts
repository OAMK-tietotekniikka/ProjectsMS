import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors({
    origin: 'https://pm-app-client-pm-app-deploy.2.rahtiapp.fi',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
  }));


app.get('/', (req, res) => {
    res.json({ message: 'Hello World, I am using OpenShift' });
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
    }
);