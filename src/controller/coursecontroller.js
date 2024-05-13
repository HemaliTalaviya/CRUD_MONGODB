
const course = require('../models/coursemodel');

module.exports = {

    createCourse: async (req, res) => {
        const { name, author, tags, isPublished, price } = req.body;
        try {

            const data = new course({
                name,
                author,
                tags,
                isPublished,
                price
            })
            await data.save();
            return res.status(200).json({
                success: true,
                message: 'created',
                data
            })

        } catch (error) {
            console.log(error);
        }
    },
    getCourse: async (req, res) => {
        try {

            const data = await course.find().limit(3)
            .sort({author : 1}).select({name : 1,tags:1})
            const data1 = await course.find().or([{author:'admin'},{isPublished:false}])

            //START WITH ADMIN
            const data2 = await course.find({author:/^admin/});

            //ENDS WITH TESTING
            const data3 = await course.find({author:/testing$/i});

            //contains with mosh
            const data4 = await course.find({author:/.*admin.*/i});


            const data5 = await course.find({author:'admin'}).count();
           
            const data6 = await course.find().skip((pageNumber -1) * pageSize).limit(pageSize);
          
            //====================exercise 2============================
            const data7 = await course.find({tags: {$in :['frontend','backend']}})
            const data8 = await course.find().and([{tags:'frontend'},{tags:'frontend'}])


            //====================exercise 3============================
        const data9 = await course.find().and([{price : {$gt:15 }},{name: /.*hello3.*/i}])

            return res.status(200).json({  
                success: true,
                message: 'selected',
                data
            })

        } catch (error) {
            console.log(error);
        }
    },
    updateCourse : async (req,res) =>{
        try {
            // ===================SECOND METHOD===============
            const data = await course.findByIdAndUpdate(req.params.id,
                {  $set :{
                author : req.body.author,
                isPublished:req.body.isPublished
            } },{new:true});


            // ==================FIRST METHOD================
            const data1 = await course.findById(req.params.id);
            console.log(data1);
            if(!data1){
                return res.status(404).json({
                    success:false,
                    message:'id not found'
                })
            }
            data1.author = req.body.author,
            data1.isPublished = req.body.isPublished
            await data1.save();
            return res.status(200).json({  
                success: true,
                message: 'updated',
                data1
            })
        } catch (error) {
            console.log(error);
        }
    },
    deleteCourse : async (req,res) =>{
        try {
            const data = await course.findByIdAndDelete(req.params.id)
            return res.status(200).json({  
                success: true,
                message: 'deleted'
            })
        } catch (error) {
           console.log(error); 
        }
    }


}