const db = require('../models/index')

module.exports = {
    getReviewProduct: (productId) => {
        return new Promise((resolve, reject) => {
            db.Review.findAll({
                where: {
                    productId,
                    status: 1
                },
                include: [
                    {
                        model: db.User, as: 'dataReviewUser',
                        attributes: ['id', 'firstName', 'lastName', 'avatar']
                    },
                    {
                        model: db.Feedback, as: 'dataFeedbackReview',
                        // where: {
                        //     status: 1
                        // }
                    }
                ],
                order: [['id', 'DESC']]
            })
            .then(resolve)
            .catch(reject)
        })
    },
    getFeedbackByReviewId: (reviewId) => {
        return new Promise((resolve, reject) => {
            db.Feedback.findAll({
                where: {
                    reviewId
                },
                attributes: ['id'],
                raw: true
            })
            .then(resolve)
            .catch(reject)
        })
    },
    createFeebback: ({userId, reviewId, content}) => {
        return new Promise((resolve, reject) => {
            db.Feedback.create({
                reviewId, 
                userId, 
                content
            })
            .then(resolve)
            .catch(reject)
        })
    },
    updateFeebback: ({userId, id, content}) => {
        return new Promise((resolve, reject) => {
            db.Feedback.update({
                content
            }, {
                where: {
                    id,
                    userId
                }
            })
            .then(resolve)
            .catch(reject)
        })
    },
    deleteFeedback: (id) => {
        return new Promise((resolve, reject) => {
            // db.Feedback.destroy({ 
            //     where: { id }
            // })
            db.Feedback.destroy(
            { 
                where: {
                    id
                }
            })
            .then(resolve)
            .catch(reject)
        })
    },
    deleteFeedbackByReviewId: ({id}) => {
        return new Promise((resolve, reject) => {
            // db.Feedback.destroy({ 
            //     where: { id }
            // })
            db.Feedback.update({
               status: 0 
            },
            { 
                where: { id }
            })
            .then(resolve)
            .catch(reject)
        })
    },
    updateReview: ({id, content, rate}) => {
        return new Promise((resolve, reject) => {
            db.Review.update({
                content,
                rate
            }, {
                where: {
                    id,
                }
            })
            .then(resolve)
            .catch(reject)
        })
    },
    deleteReview: ({id}) => {
        return new Promise((resolve, reject) => {
            // db.Review.destroy({ 
            //     where: { id }
            // })
            db.Review.update({
                status: 0
            },
            { 
                where: { id }
            })
            .then(resolve)
            .catch(reject)
        })
    },
}
