import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {blog} from '../collections/collections'
import {signin} from '../collections/collections'
import { Session } from 'meteor/session'

Meteor.startup(() => {
  Meteor.methods({
    'sign': function (Data) {
      try {
          var result ={}
          if(signin.find({email:Data.email}).count()){
            result.msg="This Email already exist"
            result.value=0;
            return result;
          }
          signin.insert(Data);
          result.msg="Congratulations You SignUp Perfectly"
          result.value=1;
          console.log("data saved")
          return result;
          
      } catch (error) {
              throw new Meteor.Error('bad-thing', 'A bad thing happened.')
      }
  },
  'login': function (Data) {
    try {
        var result ={}
        var temp={}
      
        if(signin.find({email:Data.email}))
        { 

          temp = signin.find({email:Data.email}).fetch()
          // console.log(temp[0].password);
          if(temp[0].password==Data.password){
          result.msg ="Succesfully logged in"
          result.value=1
          result.userid=temp[0].userid
          return result
          }
        }
        result.msg ="Wrong Email or Password"
        result.value=0
        return result
      
    } catch (error) {
            throw new Meteor.Error('bad-thing', 'A bad thing happened.')
    }
},
    'SubscribeNow': function (Data) {
      try { 
            var result={}
            if(blog.findOne({title:Data.title})){
              
              result.msg="title exist"
              return result
            }
            result.msg="Data saved"
            blog.insert(Data);
            return result
            console.log("data saved")
        } catch (error) {
                // console.log("qqqqqqqqq")
                throw new Meteor.Error('bad-thing', 'A bad thing happened.');
            
        }
    },
   
  'inactive': function (id,is_active) {
    try {
      if(blog.findOne({_id :id })){
        // console.log(Data.name)
        blog.update({_id:id}, {$set: {is_active: is_active}})
         
    }
      } catch (error) {
              // console.log("qqqqqqqqq")
              throw new Meteor.Error('bad-thing', 'A bad thing happened.');
          
      }
  },
  'active': function (id,is_active) {
    try {
      if(blog.findOne({_id :id })){
        // console.log(Data.name)
        blog.update({_id:id}, {$set: {is_active: is_active}})
         
    }
      } catch (error) {
              // console.log("qqqqqqqqq")
              throw new Meteor.Error('bad-thing', 'A bad thing happened.');
          
      }
  },
  'editNow': function(id){
        
    if(blog.findOne({_id :id })){
        console.log("it exist");
    }
    else {
        console.log("it does not exist")
    }
 
},
'finaleditNow' : function(Data){
  // console.log(Data)
  if(blog.findOne({_id :Data.id })){
    var result={}
    if(blog.findOne({title:Data.title})){
      
      result.msg="title exist"
      return result
    }
    result.msg="Data saved"
      blog.update({_id: Data.id}, {$set: {type: Data.type ,title : Data.title , author:Data.author ,des:Data.des}})
     return result
      console.log("data Saved")
  }
 
},
'details': function(id){
        
  if(blog.findOne({_id :id })){
    var result={}
    result=blog.find({_id :id }).fetch()
      console.log("it exist");
      return result;
  }
  else {
      console.log("it does not exist")
  }

},
  })
});
Meteor.publish("hello" , function (){
  return blog.find({});
});