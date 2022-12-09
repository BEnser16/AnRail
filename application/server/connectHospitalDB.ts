//  使用 node-couch 連至couch DB
const nodeCouch = require('node-couch')

export const _couchDb = new nodeCouch.Client().initialize({
    credentials: {
        userName: 'admin',
        password: 'adminpw'
    },
    database: 'node-couch',
    timeout: 30000,
    url: {
        hostName: 'localhost',
        port: 2984
    }
});

