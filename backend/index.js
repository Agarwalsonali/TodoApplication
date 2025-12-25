const express = require('express');
// const cors = require('cors');
const app = express();
const PORT = 3030;
app.use(express.json());//

// app.use(cors({
//     allowedHeaders: ['Authorization', 'Content-Type'],
//     origin: '*', // Or specify your frontend's domain here
// }));

const mainRoute =require('./routes/index')
app.use('/api/v1',mainRoute);



app.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`);
})

    
