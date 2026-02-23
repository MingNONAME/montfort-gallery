const subjects = [
"math","science","thai","english","social",
"history","physics","chemistry","biology","computer"
];

let currentUser = null;
const app = document.getElementById("app");

function switchPage(html){
app.classList.remove("show");
setTimeout(()=>{
app.innerHTML = html;
app.classList.add("show");
},200);
}

function renderLogin(){
switchPage(`
<div class="container">
<h2 style="color:white;">เข้าสู่ระบบ</h2>
<input id="username" placeholder="Username"><br>
<input id="password" type="password" placeholder="Password"><br><br>
<button class="btn" onclick="login()">Login</button>
</div>
`);
}

function login(){
let u=username.value;
let p=password.value;

if(u.startsWith("student") && p==="456"){
let room=u.replace("student","");
if(room>=1 && room<=10){
currentUser={role:"student",room};
showSubjects();
}
}
else if(u.startsWith("teacher")){
let subject=u.replace("teacher","");
if(subjects.includes(subject)){
currentUser={role:"teacher",subject};
showRooms();
}
}
}

function logout(){
currentUser=null;
renderLogin();
}

function showSubjects(){
let html='<div class="container"><h2 style="color:white;">เลือกวิชา</h2>';
subjects.forEach(sub=>{
html+=`
<div class="card">
<h3>${sub.toUpperCase()}</h3>
<button class="btn" onclick="showGallery('${sub}')">เข้า</button>
</div>`;
});
html+='</div>';
switchPage(html);
}

function showRooms(){
let html='<div class="container"><h2 style="color:white;">เลือกห้อง</h2>';
for(let i=1;i<=10;i++){
html+=`
<div class="card">
<h3>ROOM ${i}</h3>
<button class="btn" onclick="showTeacherRoom(${i})">เข้า</button>
</div>`;
}
html+='</div>';
switchPage(html);
}

function getKey(subject,room){
return subject+"_room"+room;
}

function showGallery(subject){
let key=getKey(subject,currentUser.room);
let images=JSON.parse(localStorage.getItem(key))||[];

let html=`<div class="container">
<h2 style="color:white;">${subject.toUpperCase()} - ROOM ${currentUser.room}</h2>
<div class="gallery">`;

images.forEach(img=>{
html+=`<div class="gallery-item"><img src="${img}"></div>`;
});

html+=`</div><br>
<button class="btn" onclick="showSubjects()">ย้อนกลับ</button>
</div>`;

switchPage(html);
}

function showTeacherRoom(room){
let key=getKey(currentUser.subject,room);
let images=JSON.parse(localStorage.getItem(key))||[];

let html=`<div class="container">
<h2 style="color:white;">${currentUser.subject.toUpperCase()} - ROOM ${room}</h2>

<input type="file" onchange="uploadImage(event,'${currentUser.subject}',${room})">

<div class="gallery">`;

images.forEach((img,index)=>{
html+=`
<div class="gallery-item">
<img src="${img}">
<button class="btn delete-btn" onclick="deleteImage('${currentUser.subject}',${room},${index})">ลบรูป</button>
</div>`;
});

html+=`</div><br>
<button class="btn" onclick="showRooms()">ย้อนกลับ</button>
</div>`;

switchPage(html);
}

function uploadImage(event,subject,room){
let file=event.target.files[0];
let reader=new FileReader();
reader.onload=function(e){
let key=getKey(subject,room);
let images=JSON.parse(localStorage.getItem(key))||[];
images.push(e.target.result);
localStorage.setItem(key,JSON.stringify(images));
showTeacherRoom(room);
};
reader.readAsDataURL(file);
}

function deleteImage(subject,room,index){
let key=getKey(subject,room);
let images=JSON.parse(localStorage.getItem(key))||[];
images.splice(index,1);
localStorage.setItem(key,JSON.stringify(images));
showTeacherRoom(room);
}

/* -------- Animated Background -------- */

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<60;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
radius:Math.random()*2+1,
dx:(Math.random()-0.5)*0.5,
dy:(Math.random()-0.5)*0.5
});
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
ctx.beginPath();
ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
ctx.fillStyle="rgba(212,175,55,0.7)";
ctx.fill();

p.x+=p.dx;
p.y+=p.dy;

if(p.x<0||p.x>canvas.width) p.dx*=-1;
if(p.y<0||p.y>canvas.height) p.dy*=-1;
});

requestAnimationFrame(animate);
}

animate();
renderLogin();