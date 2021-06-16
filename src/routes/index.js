const { Router } = require('express');
const express = require('express');
const router = express.Router();

const model = require('../model/task')();

router.get('/', (req,res)=>{
    model.find({},(err,tasks)=>{
        if(err) throw err;
        res.render('index',{
            title: 'CRUD',
            tasks
        });
    }); 
});

router.post('/add', (req,res)=>{
    let body = req.body;
    body.status = false;
    model.create(body,(err,task)=>{
        if (err) throw err;
        res.redirect('/');
    })

})



router.get('/turn/:id', (req,res)=>{
    let id = req.params.id;
    model.findById(id, (err,task)=>{
        if (err) throw err;
        task.status = !task.status;
        task.save()
            .then(()=> res.redirect('/'))
    })
});

router.get('/delete/:id', (req,res)=>{
    let id = req.params.id;
    model.remove({ _id:id }, (err,task)=>{
        if (err) throw err;
        res.redirect('/')
    })
});

router.get('/edit/:id', async(req,res)=>{
    const {id} = req.params;
    const task = await model.findById(id);
    res.render('edit', {task})
});

router.post('/edit/:id', async (req,res)=>{
    const {id} = req.params;
    await model.update({_id:id}, req.body);
    res.redirect('/');

})

module.exports = router;