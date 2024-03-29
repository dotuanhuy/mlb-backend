const firebaseConfigImageSize = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PRODUCT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

const firebaseConfigImageMlb = {
    apiKey: process.env.API_KEY_IMAGE_MLB,
    authDomain: process.env.AUTH_DOMAIN_IMAGE_MLB,
    projectId: process.env.PRODUCT_ID_IMAGE_MLB,
    storageBucket: process.env.STORAGE_BUCKET_IMAGE_MLB,
    messagingSenderId: process.env.MESSAGING_SENDER_ID_IMAGE_MLB,
    appId: process.env.APP_ID_IMAGE_MLB,
    measurementId: process.env.MEASUREMENT_ID_IMAGE_MLB
};
// const analytics = getAnalytics(app);

module.exports = {
    firebaseConfigImageSize,
    firebaseConfigImageMlb
}
