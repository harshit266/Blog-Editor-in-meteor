import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {blog} from '../../collections/collections'
import { Session } from 'meteor/session'


var z;

Template.edit.onCreated(function() { 
  this.subscribe('hello');
  this.autorun(() => {
    if (this.subscriptionsReady()) {
    }
  });
});
var quill;
Template.edit.onRendered(function(){
  console.log(" hey onRendered is working ")
  var x =blog.find({}).fetch();
  // const editor = $('#editor-container');
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
  // quill.setHTML = (html) => {
  //   editor.root.innerHTML = '<h1>harshit</h1>';
  // };
  // quill.getHTML = () => {
  //   return editor.root.innerHTML;
  // };
  // console.log(quill.getHTML())
})


Template.edit.helpers({
  func() { 
   var post=  blog.find({ _id: FlowRouter.getQueryParam('id') }).fetch()
   return post;
   
	}
});


Template.edit.events({
  'submit .data':function(event, instance) {      
    event.preventDefault();
     var title =  $("#title").val();
     var author =  $("#author").val();
     var type = $("#type").val();
     var id = FlowRouter.getQueryParam('id');
     var check=$("#check").val();
     if(check!=true)
      check="false"
     var about = document.querySelector('input[name=about]');
     about.value = quill.root.innerHTML;
 
  
  console.log(about.value)

  var des = $("#editor-container").val();
    
  let Data = {
        id:id,
        title: title,
        author: author,
        des :about.value,
        type:type,
        check:check,
        createdAt: new Date(),
        is_active: 'true'
    };

  //  console.log(Data)


    Meteor.call('finaleditNow', Data, function(error, result){
      if(error){
          console.log(error.reason);
      }else{
        alert(result.msg)
         FlowRouter.go('/register')
      }
  }); 
  },  
});

