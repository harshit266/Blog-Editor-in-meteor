import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {blog} from '../../collections/collections'
import {signin} from '../../collections/collections'
import {validateEmail} from '../../utils'
import { Session } from 'meteor/session'


var z;

Template.login.onCreated(function() { 
  this.subscribe('signin');
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      // FlowRouter.go('', signin.findOne());
    }
  });
});



Template.login.onRendered(function(){
  var x =signin.find({}).fetch();
  // console.log(x)
})

Template.login.helpers({
 
});

Template.login.events({
  'submit .data':function(event, instance) {      
    event.preventDefault();
     var email =  $("#email").val();
     var password =  $("#password").val();
    
     if(!validateEmail(email)){
        alert('invalid email') 
        return false
  }
      let Data = {
        email: email,
        password :password
    };
    
    Meteor.call('login',  Data, function(error, result){
      if(error){
          console.log(error.reason);
      }else{
        console.log(result.value)
         alert(result.msg)
         if(result.value==1){
           console.log(result.userid + "ssssss")
          Session.update("key",result.userid)
          FlowRouter.go('/blog')
         }
         else
         FlowRouter.go('/login')
      }
  }); 
  },  
 
});

