const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

// Auth
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//ME
router.use(authController.protect); // A PARTIR DE ESTE CONTROLADOR, SIGUIENTES RUTAS PROTEGIDAS (REQUIEREN LOGIN)
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// Users
router.use(authController.restrictTo('admin')); // A PARTIR DE ESTE CONTROLADOR, SIGUIENTES RUTAS RESTRINGIDAS (REQUIEREN EL 'role' ASIGNADO)
router.route('/:id').get(userController.getUser);
router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
