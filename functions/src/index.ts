import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

export const priceCheck = functions.pubsub

    .schedule('0 */12 * * *').onRun(context => {
        
    });