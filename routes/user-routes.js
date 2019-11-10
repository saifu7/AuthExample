const router = require('express').Router();
const checkAuth = require('../auth/check-auth');

const UserController = require('../controllers/users');

// signup user
router.get('/register', UserController.showSignup);
router.get('/login', UserController.showLogin);
router.post('/register', UserController.userSignUp);
router.post('/login', UserController.userLogin);
router.get('/dashboard',  UserController.showDashboard);
router.get('/logout', checkAuth, UserController.userLogout);






module.exports = router;
