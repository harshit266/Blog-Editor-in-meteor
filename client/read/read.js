import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {blog} from '../../collections/collections'
import { Session } from 'meteor/session';

var z;

Template.second.onCreated(function() { 
  this.subscribe('hello');
  this.autorun(() => {
    if (this.subscriptionsReady()) {
    }
  });
});



Template.second.onRendered(function(){
  console.log(" hey onRendered is working ")
  var temp=Session.get("key")
  var x =blog.find({userid:temp}).fetch();
})

Template.second.helpers({
 
  cclist() {
    var temp1=Session.get("key")
    var q =blog.find({is_active:'true' , userid:temp1}).fetch();
    console.log(q)
		return q;
  },
  cc1list() {
    var temp2=Session.get("key")
    var qq =blog.find({is_active:'false', userid:temp2}).fetch();
    console.log(qq)
		return qq;
}
})



Template.second.events({
  
  'click .inactive':function(event, instance) {      
    event.preventDefault();
    // console.log(this._id);
    var id = this._id;
    var is_active='false';
    Meteor.call('inactive', id,is_active, function(error, result){
      if(error){
          console.log(error.reason);
      }else{
         FlowRouter.go('/register' );
      }
  }); 
   
  }, 
  'click .active':function(event, instance) {      
    event.preventDefault();
    // console.log(this._id);
    var id = this._id;
    var is_active='true';
    Meteor.call('active', id,is_active, function(error, result){
      if(error){
          console.log(error.reason);
      }else{
         FlowRouter.go('/register' );
      }
  }); 
   
  }, 
  'click .edit':function(event, instance) {      
    event.preventDefault();
    // console.log(this._id);
    var id= this._id ;

    Meteor.call('editNow', id, function(error, result){
      if(error){
          console.log(error.reason);
      }else{
         FlowRouter.go('/edit/?id=' + id );
      }
  }); 
  }, 
  'click .detail':function(event, instance) {      
    event.preventDefault();
    // console.log(this._id);
    var id= this._id ;

    Meteor.call('details', id, function(error, result){
      if(error){
          console.log(error.reason);
      }else{
        // console.log(result[0].title)
         FlowRouter.go('/details/?id=' + id +'&&title='+result[0] .title );
      }
  }); 
  }, 
    
});

