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

export function fetchShelfsFromFirestore(limit, lastDocSnapshot = null) {
  return db
    .collection('shelfs')
    .orderBy('createdAt')
    .startAfter(lastDocSnapshot)
    .limit(limit);
}

export function listenToShelfFromFirestore(shelfId) {
  return db.collection('shelfs').doc(shelfId);
}

export function addShelfToFirestore(shelf) {
  const user = firebase.auth().currentUser;
  return db.collection('shelfs').add({
    ...shelf,
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
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
  const shelfDocQuery = db.collection('shelfs');
  const userFollowingRef = db
    .collection('following')
    .doc(user.uid)
    .collection('userFollowing');

  const batch = db.batch();

  batch.update(db.collection('users').doc(user.uid), {
    displayName: profile.displayName,
  });

  try {
    const shelfsQuerySnap = await shelfDocQuery.get();
    for (let i = 0; i < shelfsQuerySnap.docs.length; i++) {
      let shelfDoc = shelfsQuerySnap.docs[i];
      if (shelfDoc.data().uid === user.uid) {
        batch.update(shelfsQuerySnap.docs[i].ref, {
          displayName: profile.displayName,
        });
      }
    }
    const userFollowingSnap = await userFollowingRef.get();
    userFollowingSnap.docs.forEach((docRef) => {
      let followingDocRef = db
        .collection('following')
        .doc(docRef.id)
        .collection('userFollowers')
        .doc(user.uid);
      batch.update(followingDocRef, {
        displayName: profile.displayName,
      });
    });

    await batch.commit();
    return await user.updateProfile({
      displayName: profile.displayName,
    });
  } catch (error) {
    throw error;
  }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection('users').doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection('users').doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await db.collection('users').doc(user.uid).collection('photos').add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
}

export function getUserPhotos(userUid) {
  return db.collection('users').doc(userUid).collection('photos');
}

export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser;
  const shelfDocQuery = db.collection('shelfs');
  const userFollowingRef = db
    .collection('following')
    .doc(user.uid)
    .collection('userFollowing');

  const batch = db.batch();

  batch.update(db.collection('users').doc(user.uid), {
    photoURL: photo.url,
  });

  try {
    const shelfsQuerySnap = await shelfDocQuery.get();
    for (let i = 0; i < shelfsQuerySnap.docs.length; i++) {
      let shelfDoc = shelfsQuerySnap.docs[i];
      if (shelfDoc.data().uid === user.uid) {
        batch.update(shelfsQuerySnap.docs[i].ref, {
          photoURL: photo.url,
        });
      }
    }
    const userFollowingSnap = await userFollowingRef.get();
    userFollowingSnap.docs.forEach((docRef) => {
      let followingDocRef = db
        .collection('following')
        .doc(docRef.id)
        .collection('userFollowers')
        .doc(user.uid);
      batch.update(followingDocRef, {
        photoURL: photo.url,
      });
    });

    await batch.commit();
    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
}

export function deletePhotoFromCollection(photoId) {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection('users')
    .doc(userUid)
    .collection('photos')
    .doc(photoId)
    .delete();
}

export async function followUser(profile) {
  const user = firebase.auth().currentUser;
  const batch = db.batch();
  try {
    batch.set(
      db
        .collection('following')
        .doc(user.uid)
        .collection('userFollowing')
        .doc(profile.id),
      {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        uid: profile.id,
      }
    );
    batch.set(
      db
        .collection('following')
        .doc(profile.id)
        .collection('userFollowers')
        .doc(user.uid),
      {
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      }
    );
    batch.update(db.collection('users').doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(1),
    });
    batch.update(db.collection('users').doc(profile.id), {
      followerCount: firebase.firestore.FieldValue.increment(1),
    });
    return await batch.commit();
  } catch (error) {
    throw error;
  }
}

export async function unfollowUser(profile) {
  const user = firebase.auth().currentUser;
  const batch = db.batch();
  try {
    batch.delete(
      db
        .collection('following')
        .doc(user.uid)
        .collection('userFollowing')
        .doc(profile.id)
    );
    batch.delete(
      db
        .collection('following')
        .doc(profile.id)
        .collection('userFollowers')
        .doc(user.uid)
    );
    batch.update(db.collection('users').doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(-1),
    });
    batch.update(db.collection('users').doc(profile.id), {
      followerCount: firebase.firestore.FieldValue.increment(-1),
    });
    return await batch.commit();
  } catch (error) {
    throw error;
  }
}

export function getFollowersCollection(profileId) {
  return db.collection('following').doc(profileId).collection('userFollowers');
}

export function getFollowingCollection(profileId) {
  return db.collection('following').doc(profileId).collection('userFollowing');
}

export function getFollowingDoc(profileId) {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection('following')
    .doc(userUid)
    .collection('userFollowing')
    .doc(profileId)
    .get();
}
