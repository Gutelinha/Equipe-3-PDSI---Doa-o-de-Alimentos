const {Client} = require('pg')
var fs = require('fs')

const client = new Client({
    host:"crud-doacoes-rotary-pdsi-equipe-3.j.aivencloud.com",
    user:"avnadmin",
    port:15804,
    password:"AVNS_h_LQ-ynGtAuYGC2d3uJ",
    database:"defaultdb",
    ssl  : {
        ca : fs.readFileSync('./res/ca.pem')
      }

})

function MyQuery(query){
    client.connect();

    client.query(query, (err, res)=>{
        if(!err){
            
            console.log(res.rows);
        }else{
            console.log(err.message);
        }
        client.end();
    })
    
}

MyQuery(`Select * from produto`);

module.exports = {MyQuery};