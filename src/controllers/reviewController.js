const reviewSevice = require('../services/reviewService')
const jwt = require('../config/jwt')

module.exports = {
    getReviewProduct: async (req, res) => {
        try {
            const {productId} = req.query
            if (!productId) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'Missing require parameters'
                })
            } 
            const reviews = await reviewSevice.getReviewProduct(productId)
            return res.status(200).json({
                errCode: 0,
                data: reviews
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    createFeebback: async (req, res) => {
        try {
            const {reviewId, content} = req.body
            if (!reviewId || !content) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'Missing require parameters'
                })
            } 
            const token = req.cookies?.token
            if (!token) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'Token invalid'
                })
            }
            const payload = await jwt.verifyRefreshToken(token)
            const feedback = await reviewSevice.createFeebback({userId: payload?.id, reviewId, content})
            if (!feedback) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Create feedbacl faild'
                })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Create feedback success'
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    updateFeebback: async (req, res) => {
        try {
            const {id, content} = req.body
            if (!id || !content) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'Missing require parameters'
                })
            } 
            const token = req.cookies?.token
            if (!token) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'Token invalid'
                })
            }
            const payload = await jwt.verifyRefreshToken(token)
            const feedback = await reviewSevice.updateFeebback({userId: payload?.id, id, content})
            if (!feedback) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Update feedback faild'
                })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Update feedback success'
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    deleteFeebback: async (req, res) => {
        try {
            const {id} = req.params
            if (!id) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'Missing require parameters'
                })
            } 
            const feedback = await reviewSevice.deleteFeedback({id})
            // if (feedback[0] === 1) {
            //     return res.status(200).json({
            //         errCode: 1,
            //         errMessage: 'Delete feedback faild'
            //     })
            // }
            if (!feedback) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Delete feedback faild'
                })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Delete feedback success'
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    updateReview: async (req, res) => {
        try {
            const {id, userId, content, rate} = req.body
            if (!id || !userId || !content || !rate) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'Missing require parameters'
                })
            } 
            const user = req.user
            if (!user) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'User does not exists'
                })
            }
            if (user?.id !== userId && user?.roleId !== +process.env.ADMIN_ROLE) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'You do not have permission to this function'
                })
            }
            const review = await reviewSevice.updateReview({id, content, rate})
            if (!review) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Update review faild'
                })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Update review success'
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },
    deleteReview: async (req, res) => {
        try {
            const {id, userId} = req.query
            if (!id || !userId) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'Missing require parameters'
                })
            } 
            const user = req.user
            if (!user) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'User does not exists'
                })
            }
            if (user?.id !== userId && user?.roleId !== +process.env.ADMIN_ROLE) {
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'You do not have permission to this function'
                })
            }
            const arrReview = await reviewSevice.getFeedbackByReviewId(id)
            if (arrReview.lenth !== 0) {
                const arrReviewId = arrReview.map(item => item.id)
                const feedback = await reviewSevice.deleteFeedback({arrReviewId})
            }
            const review = await reviewSevice.deleteReview({id})
            // if (review[0] === 1) {
            //     return res.status(200).json({
            //         errCode: 1,
            //         errMessage: 'Delete review faild'
            //     })
            // }
            if (!review) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Delete review faild'
                })
            }
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Delete review success'
            })
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error the from server'
            })
        }
    },

    // getReviewProduct: async (req, res) => {
    //     try {
    //         const {productId} = req.query
    //         const token = req.cookies.token
    //         if (!token) {
    //             return res.status(200).json({
    //                 errCode: -1,
    //                 errMessage: 'Token invalid'
    //             })
    //         } 
    //         const payload = await jwt.verifyRefreshToken(token)
    //         console.log(payload);
    //     } catch (e) {
    //         console.log(e)
    //         return res.status(200).json({
    //             errCode: -1,
    //             errMessage: 'Error the from server'
    //         })
    //     }
    // }
}
