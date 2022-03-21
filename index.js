const dotenv = require("dotenv");
const express = require('express');
const cors = require('cors')
const app = express();

dotenv.config({ path: './config.env' });

const sequelize = require('./db/conn');
// require('./models')
app.use(cors({
  credentials: true, origin: true
}));
// app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/create', require('./routes/createmail'))
app.use('/send', require('./routes/sendmail'))

const PORT = process.env.PORT || 3000;

app.get("/demo", (req, res) => {
  res.send(`Hello from the server`);
});

sequelize.sync({force:false})
.then(result=>{
  // console.log(result);
  app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
  })
})
.catch(err => {
  console.log(err);
});