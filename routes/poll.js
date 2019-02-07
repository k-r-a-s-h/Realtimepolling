const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const mongoose = require('mongoose');
const Vote =require('../models/Vote')
const pusher = new Pusher({
  appId: '708402',
  key: '9fc269a85c673b37875e',
  secret: '2ff17aba68b2c29683fa',
  cluster: 'ap2',
  useTLS: true
});

router.get('/',(req,res)=>{
    Vote.find().then(votes => res.json({success:true,votes:votes}))
})

router.post('/',(req,res)=>{

    const newVote={
        os:req.body.os,
        points:1

    }

    new Vote(newVote).save().then(vote =>{
        pusher.trigger('os-poll', 'os-vote', {
            points:parseInt(vote.points),
            os:vote.os
        });
        return res.json({success:true,message:'thank you for voting'})
    
    })
    

})

module.exports=router;