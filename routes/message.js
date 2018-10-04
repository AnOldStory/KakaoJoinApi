var express = require('express');
var router = express.Router();
var db = require('./database');

/* GET users listing. */
router.post('/', (req, res, next) => {
  db.getUser(req,res,(err,info) => {
    /* 새로운 유저 */
    if (err) {
      if(req.body.content=="시작하기"){
        var ans = new answer("등록할 이름을 입력해주세요.","text");
        res.json(ans);
      }
      else{
        db.signup(req,res,(err,info) => {
          if(err){
            var ans = new answer("이미 존재하는 이름입니다.\n다른 이름을 입력해주세요.","text");
            res.json(ans);
          }
          else{
            makeMain(req,res,"이름이 "+req.body.content+"(으)로 등록되었습니다.");
          }
        });
      }
    }
    /* 기존 유저 */
    else{
      if(req.body.content=="시작하기"){
        makeMain(req,res,"안녕하세요 "+info.username+"님\nJaram 플러스 친구 입니다");
      }
      else if(req.body.content=="뒤로가기"){
        makeMain(req,res,"안녕하세요 "+info.username+"님\nJaram 플러스 친구 입니다");
      }
      /* 메인일때 */
      else if(info.status=="시작하기"){
        /* 일정 목록 */
        if(req.body.content=="일정 참여하기"){
          db.getSchedule(req,res,(err,info) => {
            if (err){
              makeMain(req,res,"참여가능한 일정이 존재하지 않습니다.");
            } 
            else{
              db.setStat(req,res,"일정 참여하기",(err,check) => {
                var list=new Array();
                var text="참여가능한 일정 목록\n";
                info.forEach( (detail) => {
                  if  (detail.member.search(" "+req.body.user_key+" ")==-1){
                    list.push(detail.what);
                    text=text+"\n-"+detail.what+"-\n시간 : "+detail.when+"  장소 : "+detail.place+"  가격 : "+detail.price;
                  }
                });
                list.push("뒤로가기");
                if (text == "참여가능한 일정 목록\n"){
                  makeMain(req,res,"참여가능한 일정이 존재하지 않습니다.")
                }
                else{
                  var ans = new answer(text,"buttons",list);
                  res.json(ans);
                }
              });
            }
          });
        }
        /* 참여한 일정목록 */
        else if(req.body.content=="참여한 일정 목록"){
          db.getSchedule(req,res,(err,info) => {
            if (err){
              makeMain(req,res,"참여한 일정이 존재하지 않습니다.");
            } 
            else{
              db.setStat(req,res,"참여한 일정 목록",(err,check) => {
                var list=new Array();
                var text="참여한 일정 목록\n";
                info.forEach( (detail) => {
                  if  (detail.member.search(" "+req.body.user_key+" ")!=-1){
                    list.push(detail.what);
                    text=text+"\n-"+detail.what+"-\n시간 : "+detail.when+"  장소 : "+detail.place+"  가격 : "+detail.price;
                  }
                });
                list.push("뒤로가기");
                if (text == "참여한 일정 목록\n"){
                  makeMain(req,res,"참여한 일정이 존재하지 않습니다.")
                }
                else{
                  var ans = new answer(text,"buttons",list);
                  res.json(ans);
                }
              });
            }
          });
        }
        /* 입금 확인 */
        else if(req.body.content=="입금 확인 요청"){
          makeMain(req,res,"아직 만들고있습니다.")
        }
        /* 설정 */
        else if(req.body.content=="설정"){
          db.setStat(req,res,"설정",(err,check) => {
            var ans = new answer("개인 설정","buttons",["이름 바꾸기","뒤로가기"]);
            res.json(ans);
          });
        }
        /* 관리 모드 */
        else if(req.body.content=="관리하기"){
          db.setStat(req,res,"관리하기",(err,check) => {
            var ans = new answer("관리자 설정입니다.","buttons",["일정 추가","일정 삭제","신청 인원 확인"]);
            res.json(ans);
          });
        }
      }
      /* 일정 참여 */
      else if(info.status=="일정 참여하기"){
        if (req.body.content=="참여하기"){
          db.signupSchedule(req,res,(err,check) => {
            makeMain(req,res,"참여가 완료되었습니다.");
          });
        }
        else{
          db.getScheduleDetail(req,res,(err,info) => {
            if (err) raiseErr(req,res);
            else{
              db.saveStory(req,res,req.body.content,(err,check) => {
                var text="일정 신청\n";
                text=text+"-"+info.what+"-\n시간 : "+info.when+"  장소 : "+info.place+"  가격 : "+info.price+"\n위 일정에 참여하시겠습니까?";
                var ans = new answer(text,"buttons",["참여하기","뒤로가기"]);
                res.json(ans);
              });
            }
          });
        }
      }
      /* 일정 취소 */
      else if(info.status=="참여한 일정 목록"){
        if (req.body.content=="취소하기"){
          db.pantyrunSchedule(req,res,(err,check) => {
            makeMain(req,res,"취소가 완료되었습니다.");
          });
        }
        else{
          db.getScheduleDetail(req,res,(err,info) => {
            if (err) raiseErr(req,res);
            else{
              db.saveStory(req,res,req.body.content,(err,check) => {
                var text="신청한 일정\n";
                text=text+"-"+info.what+"-\n시간 : "+info.when+"  장소 : "+info.place+"  가격 : "+info.price+"\n위 일정에 취소하시겠습니까?";
                var ans = new answer(text,"buttons",["취소하기","뒤로가기"]);
                res.json(ans);
              });
            }
          });
        }
      }
      /* 설정 */
      else if(info.status=="설정"){
        if(req.body.content=="이름 바꾸기"){
          var ans = new answer("등록할 이름을 입력해주세요.","text");
          res.json(ans);
        }
        else{
          db.signup(req,res,(err,info) => {
            if(err){
              var ans = new answer("이미 존재하는 이름입니다.\n 다른 이름을 입력해주세요.","text");
              res.json(ans);
            }
            else{
              makeMain(req,res,"이름이 "+req.body.content+"(으)로 등록되었습니다.");
            }
          });
        }
      }
      /* 관리 모드 */
      else if(info.status=="관리하기"){
        /* 혹시 모를 예외 처리 */
        if(auth<1){
          raiseErr(req,res);
        }
        if(req.body.content=="일정 추가"){
          
        }
      }
      else {
        raiseErr(req,res);
      }
    }
  });
});

module.exports = router;

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