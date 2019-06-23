FlowRouter.route('/register',{
    action : function(){
      BlazeLayout.render('second')
    }
  });
  
  FlowRouter.route('/',{
    action : function(){
      BlazeLayout.render('signin')
    }
  });
   
  FlowRouter.route('/blog',{
    action : function(){
      BlazeLayout.render('hello')
    }
  });
  FlowRouter.route('/login',{
    action : function(){
      BlazeLayout.render('login')
    }
  });

  FlowRouter.route('/edit/',{
    action : function(){
      BlazeLayout.render('edit')
    }
  });
  FlowRouter.route('/details/',{
    action : function(){
      BlazeLayout.render('detail')
    }
  });