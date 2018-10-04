var Models = require("../models");
var sequelize = require('sequelize');

exports.signup = (req,res,callback) => {
  Models.User.findOne({where : {username : req.body.content }}).then( (info) => {
    if(!info){
      Models.User.findOne({where : {user_key : req.body.user_key}}).then( (info) => {
        if(!info){
          Models.User.create({user_key: req.body.user_key, username: req.body.content , status:"시작하기" });
          return callback(null,info);
        }
        else{
          Models.User.update({username:req.body.content , status:"시작하기"},{where : {user_key: req.body.user_key}});
          return callback(null,info);
        }
      });
    }
    else{
      return callback(true,null)
    }
  });
}

exports.signupSchedule = (req,res,callback) => {
  Models.User.findOne({where:{user_key:req.body.user_key}}).then( (user) => {
    Models.Schedule.findOne({where:{what:user.storysaver}}).then( (info) => {
      var list = info.member +user.user_key+" "; 
      Models.Schedule.update({member:list},{where: {what:user.storysaver}});
      return callback(null,true);
    });
  });
}

exports.getUser = (req,res,callback) => {
  Models.User.findOne({where:{user_key:req.body.user_key}}).then( (info) => {
    if (!info) return callback(true,null);
    else{
      return callback(null,info);
    }
  });
}

exports.getUsername = (req,res,callback) => {
  Models.User.findOne({where:{user_key:req.body.user_key}}).then( (info) =>{
    if (!info) return callback(true,null);
    else{
      return callback(null,info.username);
    }
  });
}

exports.getSchedule = (req,res,callback) => {
  Models.Schedule.findAll().then(function(list){
    if(list.length==0) return callback(true,null);
    else {
      return callback(null,list);
    }
  });
}

exports.getScheduleDetail = (req,res,callback) => {
  Models.Schedule.findOne({where:{what:req.body.content}}).then( (info) => {
    if(!info) return callback(true,null);
    else{
      return callback(null,info);
    }
  });
}

exports.pantyrunSchedule = (req,res,callback) => {
  Models.User.findOne({where:{user_key:req.body.user_key}}).then( (user) => {
    Models.Schedule.findOne({where:{what:user.storysaver}}).then( (info) => {
      var list = info.member.split(req.body.user_key+" "); 
      Models.Schedule.update({member:list[0]+list[1]},{where: {what:user.storysaver}});
      return callback(null,true);
    });
  });
}

exports.saveStory = (req,res,story,callback) => {
  Models.User.update({storysaver:story},{where: {user_key:req.body.user_key}});
  return callback(null,true);
}

exports.saveSchedule = (req,res,callback) => {
  Models.Schedule.create({when: "오늘", place: "학교" , what: "밥" ,price:"2000",member:" "});
  return callback(null,true);
}

exports.setStat = (req,res,stat,callback) => {
  Models.User.update({status:stat},{where: {user_key:req.body.user_key}});
  return callback(null,true);
}
