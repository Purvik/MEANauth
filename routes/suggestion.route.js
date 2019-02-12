const express = require('express');
const router = express.Router();
const suggestionModel = require('../models/suggestion.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');

    //suggestion Route Home API Call
    router.get('/',(req,res)=>{
            res.send('suggestion Home Page')
    });

    //Add suggestion API Call
    router.post('/add', passport.authenticate('jwt', { session: false }),
        (req,res)=>{
            newSuggestion = new suggestionModel(req.body)
            newSuggestion.save((error,response)=>{
            if (error) {
                res.send({status:false, mesg:'Something Wrong happen',errorCode: 101})
            } else {
                res.send({status:true, mesg:'New Suggestion Added to Database',suggestionDetails: response })
            }
        });
    });

    //Get All suggestion API Call
    router.get('/getAll',passport.authenticate('jwt', { session: false }),
        (req,res)=>{
        suggestionModel.find((error,response) =>{
            if (error) {
                res.send(error);
            } else {
                res.send(response);
            }
        });
    });

    //Update suggestion API Call
    router.put('/update',(req,res)=>{
        suggestionModel.updateOne(
            {/* condition */},
            {
                set:{
                },
            },
            (err, response ) => {
                if ( response == 1)
                    res.send(err)
                else if (response.nModified == 0)
                    res.send({status:false, msg: 'Not Modified or Already Exist.'})
                else
                    res.send({status:true, mesg:'suggestion Details Updated.',suggestionDetails: response});
            });
    });

    //Delete suggestion API Call
    router.delete('/delete',(req,res) => {
        suggestionModel.remove(
            {/*condition*/},
            (err, response) => {
                if (response.n == 0) res.json({status:false, msg: 'suggestion Details Not Removed.', result: response })
                else res.json({status:true, msg: 'suggestion Details Removed.', result: response })
            });
    });


module.exports = router;