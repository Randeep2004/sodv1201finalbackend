const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController');

// POST request to add a workspace
router.post('/createw', workspaceController.addWorkspace);
router.get('/user/workspaces', workspaceController.getUserWorkspaces);
router.delete('/dworkspace/:id', workspaceController.deleteWorkspace);

module.exports = router;
