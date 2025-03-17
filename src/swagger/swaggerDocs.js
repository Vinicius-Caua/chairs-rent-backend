/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         provider:
 *           type: boolean
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     Chair:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         location:
 *           type: string
 *         status:
 *           type: string
 *           enum: ["available", "occupied", "maintenance"]
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     Rent:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         chair_id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         start_date:
 *           type: string
 *           format: date-time
 *         end_date:
 *           type: string
 *           format: date-time
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Create a new session
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /chairs:
 *   get:
 *     summary: Get all chairs
 *     tags: [Chairs]
 *     responses:
 *       200:
 *         description: List of all chairs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chair'
 */

/**
 * @swagger
 * /chairs:
 *   post:
 *     summary: Create a new chair
 *     tags: [Chairs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chair'
 *     responses:
 *       200:
 *         description: Chair created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chair'
 */

/**
 * @swagger
 * /chairs/{id}:
 *   put:
 *     summary: Update a chair
 *     tags: [Chairs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chair'
 *     responses:
 *       200:
 *         description: Chair updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chair'
 */

/**
 * @swagger
 * /chairs/destroy/{id}:
 *   delete:
 *     summary: Delete a chair
 *     tags: [Chairs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chair deleted successfully
 */

/**
 * @swagger
 * /rents:
 *   post:
 *     summary: Create a new rent
 *     tags: [Rents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rent'
 *     responses:
 *       200:
 *         description: Rent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 */

/**
 * @swagger
 * /rents/{id}/return:
 *   put:
 *     summary: Return a rented chair
 *     tags: [Rents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chair returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 */

/**
 * @swagger
 * /rents:
 *   get:
 *     summary: Get all rents
 *     tags: [Rents]
 *     responses:
 *       200:
 *         description: List of all rents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rent'
 */

/**
 * @swagger
 * /rents/{id}:
 *   put:
 *     summary: Update a rent
 *     tags: [Rents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rent'
 *     responses:
 *       200:
 *         description: Rent updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 */

/**
 * @swagger
 * /rents/destroy/{id}:
 *   delete:
 *     summary: Delete a rent
 *     tags: [Rents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rent deleted successfully
 */

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
