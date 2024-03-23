// const {google} = require('googleapis')
let { getStorage, ref, getDownloadURL, listAll } = require('firebase/storage')
// const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SERCET, process.env.REDIREACT_URI)
// oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN}) 

// const drive = google.drive({
//     version: 'v3',
//     auth: oauth2Client
// })
 
let getSizeService = async () => {
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

module.exports = {
    // getFileService: async () => {
    //     try {
    //         drive.files.get(
    //             { fileId: '1GpNxMcUiYJVld6QH-GP_L8-5hYlb5kAN', alt: 'media' }, 
    //             { responseType: 'stream' }, 
    //             async (err, res) => {
    //                 console.log('check 1')
    //                 if (err) {
    //                     console.error('Lỗi khi tải file:', err);
    //                     return;
    //                 }
                
    //                 // Đọc nội dung file và chuyển thành chuỗi Base64
    //                 let base64String = '';
    //                 res.data
    //                     .on('data', chunk => {
    //                         base64String += chunk.toString('base64');
    //                     })
    //                     .on('end', () => {
    //                         // In ra thông báo
    //                         console.log('check')
    //                         return base64String
    //                     })
    //                     .on('error', err => console.error('Lỗi khi tải file:', err));
    //             }
    //         );
    //     } catch (e) {
    //         console.log('getFile error: ', e)
    //     }
    // }
    getSizeService
}