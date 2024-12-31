const express = require('express');
const router = express.Router();
const recipientController=require('../controller/recipientController')
const templateController=require('../controller/templateController')

//recipient routes
router.post('/addRecipient',recipientController.recipientUpload)
router.post('/bulkUpload',recipientController.uploadCSV)
router.get('/getRecipients',recipientController.getAllRecipients)

//template routes

router.get('/getTemplates',templateController.getAllTemplates)
router.get('/getTemplate/:id',templateController.getTemplateById)
router.get('/getTemplate/:id',templateController.getTemplateById)
router.patch('/updateTemplate/:id',templateController.updateTempalte)
router.delete('/deleteTemplate/:id',templateController.deleteTemplate)
router.get('/templates/category/:category', templateController.getCategoryTemplates);
router.get('/recipients/group/:group', recipientController.getRecipientsByCategory);
router.post('/sendEmail', recipientController.sendEmailToRecipient);
router.post('/sendEmails', recipientController.sendEmailToGroup);

router.post('/upload-image', templateController.uploadImage);
router.get('/uploads/:filename', templateController.getImage);
router.post('/addTemplate',templateController.createTemplate)
// router.post('/sendGroup', recipientController.sendGroupEmails)
module.exports=router
