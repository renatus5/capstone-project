const e = require("express");
const express = require("express");
const app = express();


const { initializeApp , cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var serviceAccount = require("./finalkey.json");
initializeApp({
	credential: cert(serviceAccount),
});

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true })
app.set("view engine","ejs");
app.use(express.static('public'));

app.get("/",(req,res)=>{
	res.send("Hello World!!");
});

app.get("/main",(req,res)=>{
	res.render("main");
})

app.get("/login",(req,res)=>{
	res.render("login1");
});
app.get("/loginnav", (req,res) => {
	res.render("login1");
})
app.get("/loginsubmit",(req,res)=>{
	const Email=req.query.Email;
	const password=req.query.password;
	db.collection("Users")
	.where("Email","==",Email)
	.where("password","==",password)
	.get()
	.then((docs) => {
		if(docs.size > 0){
			res.render("music");
		}
		
		else{
			res.send("Login unsuccessful");
		}
	});
});

app.get("/signup",(req,res)=>{
	res.render("signup1");
});
app.get("/signupnav", (req,res) => {
	res.render("signup1");
})
app.get("/signupsubmit",(req,res)=>{
	//const name=req.query.name;
	const Email=req.query.Email;
	const password=req.query.password;
    const pwcode=req.query.pwcode;
	db.collection("Users").add({
		//Name : name,
		Email : Email,
		password: password,
        pwcode : pwcode
	}).then(()=>{
		res.render("login1")
	});
});
app.get("/music",(req,res)=>{
	res.render("music");
});
app.get("/trending",(req,res)=>{
	res.render("Trending");
});
app.get("/indian",(req,res)=>{
	res.render("Indian");
});
app.get("/disney",(req,res)=>{
	res.render("Disney");
});
app.get("/pop",(req,res)=>{
	res.render("Pop");
});
app.get("/CCM",(req,res)=>{
	res.render("CCM");
});
app.get("/kpop",(req,res)=>{
	res.render("KPop");
});
app.listen(3000, function () {  
    console.log('Example app listening on port 3000!')  
    });