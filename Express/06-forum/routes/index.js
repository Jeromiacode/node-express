const categoryRoute = require('./category-route');
const messageRoute = require('./message-route');
const subjectRoute = require('./subject-route');
const userRoute = require('./user-route');
const router = require('express').Router();

router.use('/category', categoryRoute);
router.use('/subject', subjectRoute);
router.use('/message', messageRoute);
router.use('/user', userRoute);

module.exports = router;
