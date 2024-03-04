import Postgres from 'pg';
import Express from 'express';
import Axios from 'axios';

// #### Configs
const REST_CONFIG = {
    port: 3000
};

const DB_CONFIG = {
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432
}

const app = Express();
const client = new Postgres.Client(DB_CONFIG);


// #### Endpoints
app.get('/', async (req, res) => {
    try {
        const res = await client.query('SELECT * FROM USERS;');
        console.log(JSON.stringify(res.rows));
    } catch(err) {
        console.log(err);
    } 

    res.send('Works!');
});


// #### Main
async function start() {
    // Connect db
    await client.connect();
    // Start REST API
    app.listen(REST_CONFIG.port, () => {
        console.log('Started on port ' + REST_CONFIG.port);
    });



    // Axios (Request)
    Axios.defaults.baseURL = 'https://cat-fact.herokuapp.com/facts/';

    try {
        let res = await Axios.get('/');
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }

}

await start();
