var express=require('express');
var router=express.Router();
var pool=require('./pool');
var upload =require('./multer');

router.get('/fetch_all_stateid',function(req,res,next){
    pool.query("select * from state",function(error,result){
if(error)
{
    res.status(500).json([])
}
else
{
   
    res.status(200).json({stateid:result}) 
}
    })
   
});

//  fetch city   //

router.get('/fetch_all_cityid',function(req,res,next){
    pool.query("select * from city where stateid=?",[req.query.stateid],function(error,result){
if(error)
{
    res.status(500).json([])
}
else
{
  
    res.status(200).json({cityid:result}) 
}
    })
   
});

//     fetch bustype   //

router.get('/fetch_all_bustypeid',function(req,res,next){
    pool.query("select * from bustype",function(error,result){
if(error)
{
    res.status(500).json([])
}
else
{
  
    res.status(200).json({bustypeid:result}) 
}
    })
   
});

//     fetch busname   //

router.get('/fetch_all_busnames',function(req,res,next){
    pool.query("select * from bus",function(error,result){
if(error)
{
    res.status(500).json([])
}
else
{
  
    res.status(200).json({busnames:result}) 
}
    })
   
});

//     fetch busMODEL   //

router.get('/fetch_all_busmodel',function(req,res,next){
    pool.query("select * from busmodel where busnameid=?",[req.query.busnameid],function(error,result){
    
if(error)
{  
    res.status(500).json([])
}
else
{
    
    res.status(200).json({busmodel:result}) 
}
    })
   
});

//     fetch sourcestate   //

router.get('/fetch_all_sourcestate',function(req,res,next){
    pool.query("select * from state",function(error,result){
if(error)
{
    res.status(500).json([])
}
else
{
   
    res.status(200).json({sourcestate:result}) 
}
    })
   
});


//  fetch source city   //

router.get('/fetch_all_sourcecity',function(req,res,next){
    pool.query("select * from city where stateid=?",[req.query.stateid],function(error,result){
        
if(error)
{
    res.status(500).json([])
}
else
{
  
    res.status(200).json({sourcecity:result}) 
}
    })
   
});

//     fetch destination state   //

router.get('/fetch_all_destinationstate',function(req,res,next){
    pool.query("select * from state",function(error,result){
if(error)
{
    res.status(500).json([])
}
else
{
   
    res.status(200).json({destinationstate:result}) 
}
    })
   
});


//  fetch destination city   //

router.get('/fetch_all_destinationcity',function(req,res,next){
    pool.query("select * from city where stateid=?",[req.query.stateid],function(error,result){
        
if(error)
{
    res.status(500).json([])
}
else
{
  
    res.status(200).json({destinationcity:result}) 
}
    })
   
});



router.get('/bus',function(req,res,next){
    res.render("businterface",{'message':''})
});

//  Display All Buses   //


router.get('/display_all_bus',function(req,res,next){
    // pool.query('select * from redbus',function(error,result){   // for get a data 
    pool.query('select R.*,(select B.busname from bus B where B.busnameid=R.busnameid) as busname, (select M.busmodelname from busmodel M where M.busmodelid=R.busmodelid) as busmodelname, (select S.statename from state S where S.sourcestateid=R.sourcestateid) as sourcestatename, (select C.cityname from city C where C.cityid=R.sourcecityid) as sourcecityname, (select S.statename from state S where S.destinationstateid=R.destinationstateid) as destinationstatename, (select C.cityname from city C where C.cityid=R.destinationcityid) as destinationcityname, (select B.bustypename from bustype B where B.bustypeid=R.bustypeid) as bustypename from redbus R',function(error,result){     
    if(error)
         {     
             res.render("displayallbus",{status:false,data:'Server Error ...'})
         }
         else
         {
             if(result.length==0)
             {     
                 res.render("displayallbus",{status:false,data:'No Record Found ...'})
             }
             else
             {   console.log('Result:',result)
                 res.render("displayallbus",{status:true,data:result})
             }
         }
     })
    
 });

    //  Update All Buses  //

    router.get('/update_all_bus',function(req,res,next){
        // pool.query('select * from redbus',function(error,result){   // for get a data 
        pool.query('select R.*,(select B.busname from bus B where B.busnameid=R.busnameid) as busname, (select M.busmodelname from busmodel M where M.busmodelid=R.busmodelid) as busmodelname, (select S.statename from state S where S.sourcestateid=R.sourcestateid) as sourcestatename, (select C.cityname from city C where C.cityid=R.sourcecityid) as sourcecityname, (select S.statename from state S where S.destinationstateid=R.destinationstateid) as destinationstatename, (select C.cityname from city C where C.cityid=R.destinationcityid) as destinationcityname, (select B.bustypename from bustype B where B.bustypeid=R.bustypeid) as bustypename from redbus R',function(error,result){     
        if(error)
             {     
                 res.render("updateallbus",{status:false,data:'Server Error ...'})
             }
             else
             {
                 if(result.length==0)
                 {    
                     res.render("updateallbus",{status:false,data:'No Record Found ...'})
                 }
                 else
                 {
                     res.render("updateallbus",{status:true,data:result})
                 }
             }
         })
        
     });

     

      //      //


     //            Form Sumbit                //

router.post('/bus_interface',upload.any('picture'),function(req,res,next){
    
    
  
    pool.query("insert into redbus(stateid, cityid, busmodelid, busnameid,bustypeid, sourcestateid, sourcecityid, destinationstateid, destinationcityid, busnumber, distance, fare, days, picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [req.body.stateid,
        req.body.cityid,
        req.body.busmodel, 
        req.body.busnames, 
        req.body.bustypeid,
        req.body.sourcestate, 
        req.body.sourcecity,
        req.body.destinationstate, 
        req.body.destinationcity, 
        req.body.busnumber, 
        req.body.distance, 
        req.body.fare, 
        JSON.stringify(req.body.days),
       // days=days +',' ,
        //req.body.picture],
       // req.files[0].originalname],  // used for multer
       req.files[0].filename ],     // used for unique id
        function(error,result){
            console.log("Sanjay:",req.body.day)
        if(error)
         {  console.log("Error:",error)
            res.render("businterface",{message:'Server Error ....'})
            
         }
         else
         {
            
            res.render("businterface",{message:'Record Submitted Successfully ....'})  
            
               }
    })
})
    //  form update button in modal //

    router.get('/updatebus', function(req,res,next){
       
       alert('hi')
        pool.query("update redbus set stateid=?, cityid=?, busmodelid=?, busnameid=?,bustypeid=?, sourcestateid=?, sourcecityid=?, destinationstateid=?, destinationcityid=?, busnumber=?, distance=?, fare=?, days=?) where busid=?",
        [    
            req.query.stateid,
            req.query.cityid,
            req.query.busmodel, 
            req.query.busnames, 
            req.query.bustypeid,
            req.query.sourcestate, 
            req.query.sourcecity,
            req.query.destinationstate, 
            req.query.destinationcity, 
            req.query.busnumber, 
            req.query.distance, 
            req.query.fare, 
            req.query.days,
          //  days=days + ',' ,
          req.query.busid,  
               console.log('SANJAY:',req.query.fare)
            ],
            
            function(error,result){
            if(error)
             {  console.log("Err: ",error)
                res.status(500).json({status:false,message:'Server Error ....'})
                
             }
             else
             {
                
                res.status(200).json({status:true,message:'Record Updated Successfully ....'})  
                        
                   }
        })

});

//  form delete button in modal //

   router.get('/deletebus', function(req,res,next){
    
        
    pool.query("delete from redbus where busid=?", [ req.query.busid ],
        
        function(error,result){
        if(error)
         {  
            res.status(500).json({status:false,message:'Server Error ....'})
            
         }
         else
         {
            
            res.status(200).json({status:true,message:'Record Deleted Successfully ....'})  
            
               }
    })

});

//    Picture Update  //

router.post('/buspictureupdate',upload.any('picture'),function(req,res,next){
    
    
    pool.query("update redbus set picture=? where busid=? ",
    [
       req.files[0].filename, 
       req.body.busid],     
        function(error,result){
            
        if(error)
         {  console.log(error)
            res.status(500).json({status:false,message:'Server Error ....'})
            
         }
         else
         {
            console.log("RESULT:",result)
            res.status(200).json({status:true,message:'Picture Updated Successfully ....'})
            
               }
    })
})

// End Picture Update //



module.exports=router;
