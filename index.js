var express = require("express")
var app = express()
var session = require("express-session")


// post 통신 방식 데이터를 받기 위한 초기 설정
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// 뷰 파일(html)을 어느 곳에서 가지고 올지 설정
app.set('views', __dirname+"/views")

// 뷰 엔진 설정
app.set("view engine", "ejs")

//세션을 설정
app.use(
    session({
        secret : "nsajofnjasfos",
        resave : false,
        saveUninitialized:true
    })
)


// contract에 접속 설정


// localhost:3000에 접속시 세션이 존재하면 main
// 세션이 존재하지 않으면 로그인 페이지
app.get("/", function(req, res){
    if(req.session.login){
        res.redirect("/contract")
    }else{
        res.redirect("/login")
    }
})



// api(url) 구성
// index.js에서 그냥 주소를 다 만드는 방법
// route를 이용하여 파일을 분할 관리
// route를 통해서 로그인 part, 
// 안전점검표
// 계약서
// 티켓팅
// DID - decentralized identifier
// 로그인 -> ID, PASS, 이름, 생년월일, 전화번호
// 계약서 -> 문서번호(기본키), 계약내용, 갑, 을, 날짜

//route 로그인, 계약
//routes -> login.js, contract.js

var login = require("./routes/login.js")
app.use("/login", login)


var sign = require("./routes/sign.js")
app.use("/contract", sign)        //주소

var smart = require("./routes/contract.js")
app.use("/smart", smart)

var port = 3000
app.listen(port, function(){
    console.log("서버 시작")
})







