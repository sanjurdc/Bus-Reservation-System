var express=require('express');
var router=express.Router();
var pool=require('./pool');


router.get('/login',function(req,res,next){
res.render('login',{message:''});

})

router.post('/check_login',function(req,res,next){
    pool.query("select * from adminacc where (emailid=? or mobileno=?) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
        if(error)
        {  console.log(error)
            res.render('login',{message:'Server Error....'})
        }
        else
        { console.log("Result:",result)
              if(result.length==0)
              { console.log(result)
                res.redirect('/admin/dashboard');
              }
              else
              { console.log(result)
                res.render('login',{message:'Invalid Emailid/Mobileno or Password....'})
              }
        }
    })
    
    
    })

router.get('/dashboard',function(req,res,next){
    var query="select count(*) as countbus, sum(busmodel) as countbus from redbus ; select count(*) as countstate from state ; select count(*) as countcity from city ; "
    pool.query(query,function(error,result){
        if(error)
        {  console.log(error)
            res.render('dashboard',{status:'true',message:'Server Error ...',result:[]});
        }
        else
        {     console.log(result)
            res.render('dashboard',{status:'true', message:' ...', result:result});
        }
    })
    res.render('dashboard');
})



module.exports=router;