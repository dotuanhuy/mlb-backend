// const {google} = require('googleapis')
const firebase = require('firebase/app')
let { getStorage, ref, getDownloadURL, listAll, uploadBytesResumable, deleteObject } = require('firebase/storage')
// const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SERCET, process.env.REDIREACT_URI)
// oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN}) 

// const drive = google.drive({
//     version: 'v3',
//     auth: oauth2Client
// })


module.exports = {
    getSize: async () => {
        const app1 = firebase.getApp('app1')
        const storage = getStorage(app1);
        const listRef = ref(storage, '');
        let results = []
        await listAll(listRef)  
            .then((res) => {
                const promise = res.items.map(async (itemRef, index) => {
                    let url = await getDownloadURL(itemRef)
                    let name = itemRef.name
                    return { name, url }
                });
                return Promise.all(promise)
            })
            .then((res) => {
                results = {
                    errCode: 0,
                    data: res
                }
            })
            .catch((error) => {
                console.log(error)
                results = {
                    errCode: 1,
                    data
                }
            });
        return results
    },
    uploadImage: async(file, quantity) => {
        const app2 = firebase.getApp('app2')
        const storageFB = getStorage(app2);
    
        // await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH)
    
        if (quantity === 'single') {
            const dateTime = Date.now();
            const fileName = `images/${dateTime}`
            const storageRef = ref(storageFB, fileName)
            const metadata = {
                contentType: file.type,
            }
            await uploadBytesResumable(storageRef, file.buffer, metadata);
            const imageUrl = await getDownloadURL(storageRef)
            return imageUrl
        }
    
        if (quantity === 'multiple') {
            const imageUrls = [];
            for(let i=0; i < file?.images?.length; i++) {
                const dateTime = Date.now();
                const fileName = `images/${dateTime}`
                const storageRef = ref(storageFB, fileName)
                const metadata = {
                    contentType: file.images[i].mimetype,
                }
                await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);
                const imageUrl = await getDownloadURL(storageRef);
                imageUrls.push(imageUrl);
            }
            return imageUrls
        }
    
    },
    delete: (imageUrl, type) => {
        const app2 = firebase.getApp('app2')
        const storage = getStorage(app2);
        if (type === 'single') {
            const desertRef = ref(storage, imageUrl);
            // Delete the a file
            return new Promise((resolve, reject) => {
                deleteObject(desertRef)
                .then(() => {
                    resolve({
                        errCode: 0,
                        errMessage: 'Delete image in firebase success'
                    })
                })
                .catch((error) => {
                    reject(error)
                });
            })
        }
        else if (type === 'multiple') {
            Promise.all(
                imageUrl.map(async item => {
                    const desertRef = ref(storage, item)
                    await deleteObject(desertRef)
                })
            )
            .catch((error) => {
                return Promise.reject(error);
            })
            return { errCode: 0 }
        }
    }
}