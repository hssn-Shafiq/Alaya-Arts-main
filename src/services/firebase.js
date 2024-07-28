import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.storage = app.storage();
    this.db = app.firestore();
    this.auth = app.auth();
    this.firebase = app;
  }

  // AUTH ACTIONS ------------
  createAccount = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signInWithGoogle = () =>
    this.auth.signInWithPopup(new app.auth.GoogleAuthProvider());

  signInWithFacebook = () =>
    this.auth.signInWithPopup(new app.auth.FacebookAuthProvider());

  signInWithGithub = () =>
    this.auth.signInWithPopup(new app.auth.GithubAuthProvider());

  signOut = () => this.auth.signOut();

  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  addUser = (id, user) => this.db.collection("users").doc(id).set(user);

  getUser = (id) => this.db.collection("users").doc(id).get();

  getFirestore() {
    return this.db;
  }

  passwordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  changePassword = (currentPassword, newPassword) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              resolve("Password updated successfully!");
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  reauthenticate = (currentPassword) => {
    const user = this.auth.currentUser;
    const cred = app.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    return user.reauthenticateWithCredential(cred);
  };

  updateEmail = (currentPassword, newEmail) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          user
            .updateEmail(newEmail)
            .then(() => {
              resolve("Email Successfully updated");
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  updateProfile = (id, updates) =>
    this.db.collection("users").doc(id).update(updates);

  onAuthStateChanged = () =>
    new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error("Auth State Changed failed"));
        }
      });
    });

  saveBasketItems = (items, userId) =>
    this.db.collection("users").doc(userId).update({ basket: items });

  setAuthPersistence = () =>
    this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

  // PRODUCT ACTIONS --------------
  getSingleProduct = (id) => this.db.collection("products").doc(id).get();

  getProducts = (lastRefKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const query = this.db
              .collection("products")
              .orderBy(app.firestore.FieldPath.documentId())
              .startAfter(lastRefKey)
              .limit(12);

            const snapshot = await query.get();
            const products = [];
            snapshot.forEach((doc) =>
              products.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ products, lastKey });
          } catch (e) {
            reject(e?.message || ":( Failed to fetch products.");
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error("Request timeout, please try again"));
          }, 15000);

          try {
            const totalQuery = await this.db.collection("products").get();
            const total = totalQuery.docs.length;
            const query = this.db
              .collection("products")
              .orderBy(app.firestore.FieldPath.documentId())
              .limit(12);
            const snapshot = await query.get();

            clearTimeout(timeout);
            if (!didTimeout) {
              const products = [];
              snapshot.forEach((doc) =>
                products.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ products, lastKey, total });
            }
          } catch (e) {
            if (didTimeout) return;
            reject(e?.message || ":( Failed to fetch products.");
          }
        }
      })();
    });
  };

  searchProducts = (searchKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        const productsRef = this.db.collection("products");

        const timeout = setTimeout(() => {
          didTimeout = true;
          reject(new Error("Request timeout, please try again"));
        }, 15000);

        try {
          const searchedNameRef = productsRef
            .orderBy("name_lower")
            .where("name_lower", ">=", searchKey)
            .where("name_lower", "<=", `${searchKey}\uf8ff`)
            .limit(12);
          const searchedKeywordsRef = productsRef
            .orderBy("dateAdded", "desc")
            .where("keywords", "array-contains-any", searchKey.split(" "))
            .limit(12);

          const nameSnaps = await searchedNameRef.get();
          const keywordsSnaps = await searchedKeywordsRef.get();

          clearTimeout(timeout);
          if (!didTimeout) {
            const searchedNameProducts = [];
            const searchedKeywordsProducts = [];
            let lastKey = null;

            if (!nameSnaps.empty) {
              nameSnaps.forEach((doc) => {
                searchedNameProducts.push({ id: doc.id, ...doc.data() });
              });
              lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
            }

            if (!keywordsSnaps.empty) {
              keywordsSnaps.forEach((doc) => {
                searchedKeywordsProducts.push({ id: doc.id, ...doc.data() });
              });
            }

            const mergedProducts = [
              ...searchedNameProducts,
              ...searchedKeywordsProducts,
            ];
            const hash = {};

            mergedProducts.forEach((product) => {
              hash[product.id] = product;
            });

            resolve({ products: Object.values(hash), lastKey });
          }
        } catch (e) {
          if (didTimeout) return;
          reject(e);
        }
      })();
    });
  };

  getFeaturedProducts = (itemsCount = 12) =>
    this.db
      .collection("products")
      .where("isFeatured", "==", true)
      .limit(itemsCount)
      .get();

  getRecommendedProducts = (itemsCount = 12) =>
    this.db
      .collection("products")
      .where("isRecommended", "==", true)
      .limit(itemsCount)
      .get();

  getKidsProducts = (itemsCount = 12) =>
    this.db
      .collection("products")
      .where("isKids", "==", true)
      .limit(itemsCount)
      .get();

  getStichedProducts = (itemsCount = 12) =>
    this.db
      .collection("products")
      .where("isStiched", "==", true)
      .limit(itemsCount)
      .get();

  getAccessoriesProducts = (itemsCount = 12) =>
    this.db
      .collection("products")
      .where("isAccessories", "==", true)
      .limit(itemsCount)
      .get();

  getUnstichedProducts = (itemsCount = 12) =>
    this.db
      .collection("products")
      .where("isUnStiched", "==", true)
      .limit(itemsCount)
      .get();

  getProductsWithAccessoryDetails = async () => {
    try {
      // Query products collection where accessoryDetails field exists
      const querySnapshot = await this.db
        .collection("products")
        .where("accessoryDetail", "!=", null)
        .get();

      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      return products;
    } catch (error) {
      console.error("Error fetching products with accessoryDetails: ", error);
      throw new Error("Error fetching products.");
    }
  };

  getUniqueSizes = async () => {
    try {
      const querySnapshot = await this.db.collection("products").get(); // Use await to get QuerySnapshot
      const sizesSet = new Set();

      querySnapshot.forEach((doc) => {
        const product = doc.data();
        if (product.sizes) {
          product.sizes.forEach((size) => sizesSet.add(size));
        }
      });

      return Array.from(sizesSet);
    } catch (error) {
      console.error("Error fetching unique sizes: ", error);
      throw error;
    }
  };

  getUniqueKeywords = async () => {
    try {
      const querySnapshot = await this.db.collection("products").get(); // Use await to get QuerySnapshot
      const keywordsSet = new Set();

      querySnapshot.forEach((doc) => {
        const product = doc.data();
        if (product.keywords) {
          product.keywords.forEach((keyword) => keywordsSet.add(keyword));
        }
      });

      return Array.from(keywordsSet);
    } catch (error) {
      console.error("Error fetching unique keywords: ", error);
      throw error;
    }
  };

  addProduct = (id, product) =>
    this.db.collection("products").doc(id).set(product);

  generateKey = () => this.db.collection("products").doc().id;

  storeImage = async (id, folder, imageFile) => {
    const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
  };

  async storeOrderProof(id, folder, imageFile) {
    const storageRef = this.storage.ref().child(`${folder}/${id}`);
    const snapshot = await storageRef.put(imageFile);
    const downloadURL = await snapshot.ref.getDownloadURL();
    return downloadURL;
  }

  deleteImage = (id) => this.storage.ref("products").child(id).delete();

  editProduct = (id, updates) =>
    this.db.collection("products").doc(id).update(updates);

  removeProduct = (id) => this.db.collection("products").doc(id).delete();

  addPaymentDetails = (userId, paymentDetails) =>
    this.db.collection("payments").doc(userId).set(paymentDetails);

  getUserOrders = (userId) => {
    return this.db.collection("orders").where("userId", "==", userId).get();
  };

  // get all users
  getAllUsers = () => {
    return this.db.collection("users").get();
  };

  // Update the user's role
  updateUserRole = (userId, newRole) => {
    return this.db.collection("users").doc(userId).update({ role: newRole });
  };

  // Delete the user
  deleteAdminUser = (userId) => {
    return this.db.collection("users").doc(userId).delete();
  };

  getAllOrders = () => {
    return this.db.collection("orders").get();
  };
  getDeliveredOrders = () => {
    return this.db.collection("deliveredOrders").get();
  };
  deleteDeliveredOrders = (orderId) => {
    return this.db.collection("deliveredOrders").doc(orderId).delete();
  };
  getRejectedOrders = () => {
    return this.db.collection("rejectedOrders").get();
  };
  updateOrderStatus = (orderId, orderStatus) => {
    return this.db.collection("orders").doc(orderId).update({ orderStatus });
  };

  deleteOrder = (orderId) => {
    return this.db.collection("orders").doc(orderId).delete();
  };

  addOrderToCollection = async (collectionName, order) => {
    const collectionRef = this.db.collection(collectionName);
    await collectionRef.doc(order.id).set(order);
  };

  // contact form details
  addContactDetails = (id, contactDetails) =>
    this.db.collection("contact_details").doc(id).set(contactDetails);

  getContactDetails = () => {
    return this.db.collection("contact_details").get();
  };

  deleteContactDetails(id) {
    return this.db.collection("contact_details").doc(id).delete();
  }
  // for adding bank details
  addBankDetails = (bankDetails) => {
    return this.db.collection("banksDetails").add(bankDetails);
  };

  getBankDetails = () => {
    const snapshot = this.db.collection("bankDetails").get();
    const details = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return details;
  };
  
  deleteBankDetails = (id) => {
      return this.db.collection('bankDetails').doc(id).delete();
  };
  
   updateBankDetails =  (id, updatedDetail) => {
    return this.db.collection('bankDetails').doc(id).update(updatedDetail);
  };

  // Add or update images for a specific collection within the BannerImages document
  addOrUpdateCollectionImages = async (collectionName, images) => {
    const collectionRef = this.db.collection("BannerImages").doc("Images");
    const imageUrls = await this.uploadMultipleImages(images);

    const updateData = {
      [collectionName]: imageUrls,
    };

    await collectionRef.set(updateData, { merge: true });
  };

  // Update a specific image in a collection
  updateCollectionImage = async (collectionName, index, newImage) => {
    const imageUrl = await this.uploadSingleImage(newImage);
    const collectionRef = this.db.collection("BannerImages").doc("Images");
    const collectionDoc = await collectionRef.get();

    if (collectionDoc.exists) {
      const images = collectionDoc.data()[collectionName] || [];
      images[index] = imageUrl;
      const updateData = {
        [collectionName]: images,
      };
      await collectionRef.set(updateData, { merge: true });
    }
  };

  // Delete a specific image from a collection
  deleteCollectionImage = async (collectionName, index) => {
    const collectionRef = this.db.collection("BannerImages").doc("Images");
    const collectionDoc = await collectionRef.get();

    if (collectionDoc.exists) {
      const images = collectionDoc.data()[collectionName] || [];
      images.splice(index, 1);
      const updateData = {
        [collectionName]: images,
      };
      await collectionRef.set(updateData, { merge: true });
    }
  };

  // Upload images to Firebase Storage and get URLs
  uploadMultipleImages = async (images) => {
    const uploadPromises = images.map(async (image) => {
      const imageRef = this.storage.ref(`collections/${image.name}`);
      await imageRef.put(image);
      const imageUrl = await imageRef.getDownloadURL();
      return imageUrl;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls.filter((url) => url !== undefined);
  };

  // Upload a single image to Firebase Storage and get the URL
  uploadSingleImage = async (image) => {
    const imageRef = this.storage.ref(`collections/${image.name}`);
    await imageRef.put(image);
    const imageUrl = await imageRef.getDownloadURL();
    return imageUrl;
  };
  // Fetch images for a specific collection from the BannerImages document
  getCollectionImages = async (collectionName) => {
    const collectionRef = this.db.collection("BannerImages").doc("Images");
    const collectionDoc = await collectionRef.get();

    if (collectionDoc.exists) {
      return collectionDoc.data()[collectionName] || [];
    }
    return [];
  };

  // Store banner images in Firestore
  storeBannerImages = async (homeImageUrl, shopImageUrl) => {
    try {
      await this.db.collection("BannerHomeImages").doc("Images").set(
        {
          homeImageUrl: homeImageUrl,
          shopImageUrl: shopImageUrl,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error storing banner images:", error);
      throw error;
    }
  };

  // Get banner images from Firestore
  getBannerImages = async () => {
    try {
      const doc = await this.db
        .collection("BannerHomeImages")
        .doc("Images")
        .get();
      if (doc.exists) {
        return doc.data();
      } else {
        return { homeImageUrl: "", shopImageUrl: "" };
      }
    } catch (error) {
      console.error("Error fetching banner images:", error);
      throw error;
    }
  };
}

const firebaseInstance = new Firebase();

export default firebaseInstance;
