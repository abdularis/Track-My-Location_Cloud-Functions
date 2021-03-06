const functions = require('firebase-functions');
const admin = require('firebase-admin')
const shortid = require('shortid')

admin.initializeApp(functions.config().firebase)

exports.onNewAccountCreated = functions.auth.user().onCreate(event => {

    const user = {
        name: event.displayName || 'Noname',
        devId: shortid.generate(),
        photoUrl: event.photoURL || null
    }

    return admin.firestore().collection('users').doc(event.uid).set(user)
})