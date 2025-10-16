const {Client} = require('pg');


const client = new Client( {
    host: 'localhost',
    user: 'postgres',
    password: process.env.dbpwd,
    database: 'mabase',
    port: '5432'
})

async function main() {
    try {
        await client.connect();
        console.log('connecté !');

        const res = await client.query('SELECT * FROM users');
        console.log(res.rows);
    }
    catch(err) {
        console.error('Erreur', err);
    }
    finally {
        await client.end();
        console.log('connexion fermée');
    }
}

function getConnection(username, password, database) {
    const client = new Client( {
        host: 'localhost',
        user: username,
        password: password,
        database: database,
        port: '5432'
    })
    
    return client;
}

function getUsers(callback) {
  const client = getConnection('postgres', process.env.dbpwd, 'mabase');

  client.connect()
    .then(() => {
      console.log('Connecté à PostgreSQL');
      return client.query('SELECT * FROM users');
    })
    .then((res) => {
      callback(null, res.rows);  
    })
    .catch((err) => {
      callback(err, null);       
    })
    .finally(() => {
      client.end();              
    });
}

getUsers((err, users) => {
  if (err) {
    console.error('Erreur :', err);
  } else {
    console.log('Utilisateurs :', users);
  }
});

async function insert_user(user) {
  const client = getConnection('postgres', process.env.dbpwd, 'mabase');

  try {
    await client.connect();
    console.log('Connecté à PostgreSQL');

    const query = 'INSERT INTO users (email) VALUES ($1) RETURNING *';
    const values = [user.email]; 

    const res = await client.query(query, values);

    console.log('Utilisateur inséré :', res.rows[0]);
    return res.rows[0];

  } catch (err) {
    console.error('Erreur lors de l’insertion :', err);
  } finally {
    await client.end();
    console.log('Connexion fermée');
  }
}



module.exports = { getConnection, getUsers, insert_user };

(async () => {
  await insert_user({ email: 'nouveau@test.com' });
})();