function answer(msg,type,buttons){
    this.message=new message(msg);
    this.keyboard= new keyboard(type,buttons);
  }
  
  function message(message){
    this.text = message;
  }
  
  
  function keyboard(type,buttons){
    if (type == "buttons"){
      this.type="buttons";
      this.buttons=buttons;
    }
    else if (type =="text"){
      this.type="text";
    }
  }
  
  function raiseErr(req,res){
    db.setStat(req,res,"시작하기",(err,check) => {
      var ans = new answer("오류가 발생하였습니다.","buttons",["일정 참여하기","참여한 일정 목록","입금 확인 요청","설정"]);
      res.json(ans);
    });
  }
  
  function makeMain(req,res,text){
    db.setStat(req,res,"시작하기",(err,check) => {
      var list = ["일정 참여하기","참여한 일정 목록","입금 확인 요청","설정"];
      if (auth>0) list.push("관리하기");
      var ans = new answer(text,"buttons",list);
      res.json(ans);
    });
  }