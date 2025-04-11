const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const { swaggerUi, specs } = require('./swagger');

const app = express();
const corsOptions = {
    origin: ['http://localhost:5001', 'http://127.0.0.1:5001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
};
app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('🎯 Task Manager API is running');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use(errorMiddleware);

module.exports = app;
