const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config();

const app = express();

console.log("Backend booting...");


app.use(express.json());
app.use(cors({
  origin: '*',
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

const mainRoute = require('./routes/index');
app.use('/api/v1', mainRoute);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on ${process.env.PORT}`);
});

// app.get("/health", (req, res) => {
//   res.send("Backend is alive");
// });
