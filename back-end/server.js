const express = require("express");
const cors = require("cors");

const app = express();
const pool = require("./database");


app.use(express.json());
app.use(cors());

app.post("/adduser", (req, res) => {
    const table = req.body["table"];



    const SelectSTMT = `SELECT ${table}
                        FROM information_schema.tables
                        WHERE table_schema='public'
                        AND table_type='BASE TABLE';`

    pool.query(SelectSTMT).then((res)=>{
        console.log(res.rows[0].table_name);
    })
    .catch((err)=>{
        console.log(err);
    })

    //console.log(req.body);
    res.send(res.rows);
});

app.listen(4000, () => console.log("localhost:4000"));