import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

admin.initializeApp();
const db = admin.firestore();

function getUrls() {
    db.collection('stores').doc()
}

function getPrices() {
    
}

function updateDB() {
    
}

export const priceCheck = functions.pubsub

    .schedule('0 */12 * * *').onRun(context => {
        

    });