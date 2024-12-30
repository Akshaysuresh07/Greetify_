const Template=require('../Model/templates')
const multer = require('multer');
const path = require('path');
const fs=require('fs')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the original filename
    }
});

// Initialize upload
const upload = multer({ storage: storage });

// Create a new template
exports.createTemplate = [   upload.single('image'), async (req, res) => {
        try {
            const { name, subject, content, category } = req.body;
            console.log(req.body);
            console.log("file ---->" ,req.files);

            const image = req.file ? `/uploads/${req.file.filename}` : null;            console.log("images ---->",image);
            

            const existingTemplate = await Template.findOne({ name: name });
            if (existingTemplate) {
                return res.status(400).json({ message: 'Template already exists' });
            }

            const template = new Template({
                name: name,
                subject: subject,
                content: content,
                category: category,
                image: image // Save image paths in the template
            });

            const newTemplate = await template.save();
            res.status(201).json({ code: 201, message: 'Template created', data: template });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }]




// Get all templates
exports.getAllTemplates=async(req,res)=>{
    try {
        const { page = 1, limit = 10 } = req.query; 

        const templates = await Template.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalTemplates = await Template.countDocuments();

        res.status(200).json({
            totalTemplates,
            totalPages: Math.ceil(totalTemplates / limit),
            currentPage: parseInt(page),
            templates
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get a single template
exports.getTemplateById=async(req,res)=>{
try {
    
    const template=await Template.findById(req.params.id)
    if(!template){
        return res.status(404).json({message:'Template not found'})
    }
    res.status(200).json(template)

} catch (error) {
    res.status(400).json({message:error.message})
    
}
}


//update template
exports.updateTempalte=async(req,res)=>{
    try {
        const {name,subject,content,category}=req.body
        const template=await Template.findById(req.params.id)
        if(!template){
            return res.status(404).json({message:'Template not found'})
        }
        template.name=name
        template.subject=subject
        template.content=content
        template.category=category
        const updatedTemplate=await template.save()
        res.status(200).json(updatedTemplate)
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//delete template
exports.deleteTemplate=async(req,res)=>{
    try {
        const template=await Template.findById(req.params.id)
        if(!template){
            return res.status(404).json({message:'Template not found'})
        }
        await template.remove()
        res.status(200).json({message:'Template deleted'})

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//Category wise templates 
exports.getCategoryTemplates=async(req,res)=>{
    try {
        const category=req.params.category
        const templates=await Template.find({category:category})
        if(templates.length===0){
            return res.status(404).json({message:'No templates found'})
        }
        res.status(200).json(templates)
        
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
}


exports.uploadImage = [
    upload.single('image'),
    async (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ message: 'Please upload a file' });
            }
            res.status(200).json({ message: 'Image uploaded', data: file });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
];
exports.getImage = async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '../uploads', filename);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// attachments: [{
//     filename: 'imagename.png',
//     path: path.resolve(__dirname +'/../../image/imagename.png'),
//     cid: 'imagename' //my mistake was putting "cid:logo@cid" here! 
// }],
