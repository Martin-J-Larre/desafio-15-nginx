const express = require ("express"); 
const app = express(); 
require('dotenv').config()

const PORT = parseInt(process.env.watch) || process.env.PORT;
// console.log(`EN EL PUERTO:${PORT}`);


//---------------Routes
const infoRouter = require('./routes/info');
const randomRouter = require('./routes/numberRandomApi');

//--------------Cluster

let cluster = require('cluster');
let numCPUs = require('os').cpus().length;
const modoCluster = process.argv[2] == 'CLUSTER'

// Master/Primary
if (modoCluster && cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let index = 0; index < numCPUs; index++) {
        cluster.fork();
    }
    cluster.on("exit", (worker) =>
        console.log(`Worker ${worker.process.pid} died`)
    );
} else {


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.set("view engine", "ejs"); 
app.set("views", "./public"); 
app.use(express.static("./public")); // Test if delete

app.get('/datos', (req, res) => {
    res.send(`<h1 style="font-size: 1.5rem; 
                        text-align: center;
                        color: darkgoldenrod; 
                        margin-top: 1rem">
                        DESAFíO EJECUTAR SERVIDORES NODE || SERVIDOR NGINX
            </h1>
            <h2 style="font-size: 1.5rem;
                    text-align: center;color:
                    darkgoldenrod;">
                    Server express NGINX on PORT ${PORT}, PID ${process.pid}
            </h2>
            `)
})

app.use("/info", infoRouter);

app.use("/api/random", randomRouter);

app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT} || PID: ${process.pid}`);
});

}

