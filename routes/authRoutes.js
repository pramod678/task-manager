const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const router = express.Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: pkc
 *               email:
 *                 type: string
 *                 format: email
 *                 example: pkc@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: pkc123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User registered
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             example:
 *               errors:
 *                 - msg: Invalid value
 *                   param: email
 *                   location: body
 */
router.post('/register', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ], register);
  
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: pkc@example.com
 *               password:
 *                 type: string
 *                 example: pkc123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid credentials
 */
router.post('/login', login);

module.exports = router;
