// const {google} = require('googleapis')
let { getStorage, ref, getDownloadURL, listAll } = require('firebase/storage')
// const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SERCET, process.env.REDIREACT_URI)
// oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN}) 

// const drive = google.drive({
//     version: 'v3',
//     auth: oauth2Client
// })

module.exports = {
    getSize: async () => {
        const storage = getStorage();
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
    }
}