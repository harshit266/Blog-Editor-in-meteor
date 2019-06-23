import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {blog} from '../../collections/collections'
import {signin} from '../../collections/collections'
import {validateEmail} from '../../utils'
import { Session } from 'meteor/session'


var z;

Template.signin.onCreated(function() { 
  this.subscribe('signin');
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      FlowRouter.go('', signin.findOne());
    }
  });
});



Template.signin.onRendered(function(){
  var x =signin.find({}).fetch();
  console.log(x)
})

Template.signin.helpers({
 
});

Template.signin.events({
  'submit .data':function(event, instance) {      
    event.preventDefault();
     var user =  $("#user").val();
     var email =  $("#email").val();
     var password =  $("#password").val();
     var userid =Math.random().toString(36).substr(2, 9);
    //  console.log("aa");
    Session.setPersistent('key',userid);
    //  console.log("bb")
    //  console.log(Session.get('key'))
     if(!validateEmail(email)){
        alert('invalid email') 
        return false
  }
      let Data = {
        name: user,
        email: email,
        password :password,
        userid : userid,
        createdAt: new Date()
    };
    
    Meteor.call('sign',  Data, function(error, result){
      if(error){
          console.log(error.reason);
      }else{
        if(result.value==1){
          alert(result.msg)
          FlowRouter.go('/login')
        }
        else{
          alert(result.msg)
          FlowRouter.go('/')
        }
      }
  }); 
  },  
 
});

