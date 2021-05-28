import firebase from '../config/firebase';

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}

export function listenToShelfsFromFirestore() {
  return db.collection('shelfs');
}

export function listenToShelfFromFirestore(shelfId) {
  return db.collection('shelfs').doc(shelfId);
}

export function addShelfToFirestore(shelf) {
  return db.collection('shelfs').add({ ...shelf });
}

export function updateShelfToFirestore(shelf) {
  return db.collection('shelfs').doc(shelf.id).update(shelf);
}

export function deleteShelfInFirestore(shelfId) {
  return db.collection('shelfs').doc(shelfId).delete();
}

export function setUserProfileData(user) {
  return db
    .collection('users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export function getUserProfile(userId) {
  return db.collection('users').doc(userId);
}

export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser;
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }
    return await db.collection('users').doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
}
