import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {blog} from '../../collections/collections'

var z;

Template.detail.onCreated(function() { 
  this.subscribe('hello');
  this.autorun(() => {
    if (this.subscriptionsReady()) {
    }
  });
});



Template.detail.onRendered(function(){
  console.log(" hey onRendered is working ")
  var x =blog.find({}).fetch();
})




Template.detail.helpers({
 
  dt() {
    console.log(FlowRouter.getQueryParam('id'))
    // console.log(FlowRouter.getQueryParam('title'))
    var post=  blog.find({ _id: FlowRouter.getQueryParam('id') }).fetch()
    return post;
  },
 
})



Template.detail.events({
   
  
    
});

