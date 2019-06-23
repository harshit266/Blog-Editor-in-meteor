import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {blog} from '../../collections/collections'
import { Session } from 'meteor/session'
import { ImageResize } from 'quill-image-resize-module';

Template.hello.onCreated(function helloOnCreated() {
  this.dataUrl=new ReactiveVar();
  this.subscribe('hello');
  this.autorun(() => {
    if (this.subscriptionsReady()) {
     // FlowRouter.go('', blog.findOne());
    }
  });
});

var quill;

Template.hello.onRendered(function(){
  console.log(" hey onRendered is working ")
   quill = new Quill('#editor-container', {
    modules: {
      imageResize: {
        displaySize: true
      },
     toolbar: [
       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
       ['bold', 'italic', 'underline', 'strike'],
       [{ 'color': [] }, { 'background': [] }], 
       [{ 'align': [] }],
       ['link', 'image'],
       
       ['clean']  
     ]
  },
   
    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
  });
  
})


Template.hello.helpers({
  counter() {
    
    var x =blog.find({}).fetch();
    console.log(x) 
    return x
    
  },
});

Template.hello.events({
 
  'submit .data':function(event, instance) {      
    event.preventDefault();
     var title =  $("#title").val();
     var author =  $("#author").val();
     var type = $("#type").val();
     var check=$("#check").val();
     var userid = Session.get("key")
     
     if(check!=true)
      check="false"
     var about = document.querySelector('input[name=about]');
     about.value = quill.root.innerHTML;
 
    
  console.log(about.value)

  var des = $("#editor-container").val();
    
  let Data = {
        title: title,
        author: author,
        des :about.value,
        type:type,
        check:check,
        userid : userid,
        createdAt: new Date(),
        is_active: 'true'
    };

   

    Meteor.call('SubscribeNow', Data, function(error, result){
      if(error){
          console.log(error.reason);
      }else{
        
        alert(result.msg)
        
         FlowRouter.go('/register')
      }
  }); 
  
  }
});
