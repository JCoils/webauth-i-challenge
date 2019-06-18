const express = require( 'express' );
const morgan = require( 'morgan' );
const helmet = require( 'helmet' );
const cors = require( 'cors' );
const db = require( '../data/dbConfig' );
const session = require( 'express-session' );
const KnexSessionStore = require( 'connect-session-knex' )( session );
const server = express();

const authenticate = require( '../auth/authenticate' );
const userModel = require( '../users/userModel' );


const sessionConfig = {
    name: 'The Mothership',
    secret: 'Take me to your leader',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore ({
        knex: db,
        tableName: 'sessions',
        createtable: true,
        clearInterval: 1000 * 60 * 60 
    })
}


server.use( helmet());
server.use( express.json());
server.use( morgan( 'common' ));
server.use( cors() );
server.use( session( sessionConfig ));


server.use( '/api/auth' , authenticate );
server.use( '/api/users' , userModel );



server.get( '/' , ( req , res ) => {
    return res.status( 200 ).json({ Greetings: " WECOME TO THE VOID 🌙 "})
})

module.exports = server;