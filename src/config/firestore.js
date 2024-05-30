const { Firestore } = require('@google-cloud/firestore');

const fs_users = new Firestore({
    projectId: 'dragon-frost',
    databaseId: 'users'
});

const fs_food = new Firestore({
    projectId: 'dragon-frost',
    databaseId: 'food-nutrition'
})

module.exports = { fs_users, fs_food };