const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore({
    projectId: 'dragon-frost',
    databaseId: 'users'
});

module.exports = firestore;