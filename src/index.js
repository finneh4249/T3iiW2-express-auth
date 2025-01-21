const {connect} = require('./utils/database');
const {app} = require('./server')

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    await connect();
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})