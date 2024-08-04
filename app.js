const express = require('express');
const app = express();
const cacheRoutes = require('./routes/cacheRoutes');
app.use(express.json());
app.use('/api/cache', cacheRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
