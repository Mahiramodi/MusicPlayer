//FIREBASE SETUP
var firebaseConfig = {
    apiKey: "AIzaSyCWp3rwSjLRaCOuKSO6SY14t82VHs5agy0",
    authDomain: "my-melodies.firebaseapp.com",
    databaseURL: "https://my-melodies.firebaseio.com",
    projectId: "my-melodies",
    storageBucket: "my-melodies.appspot.com",
    messagingSenderId: "922740731452",
    appId: "1:922740731452:web:2890075ad67852fff75d39",
    measurementId: "G-KXTX3KYHE2"
  };
//Usable variables
var colorString= ["#d0c9c8","#add8e6","#d7ebf2","#b5dedd"];
var i=0;

//end
  //FIREBASE INITIALIZE
  firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
const db = firebase.firestore();
var songNum=0;
db.collection("songs").get().then(function(querySnapshot) {      
  console.log(querySnapshot.size); 
  songNum=querySnapshot.size;
});
var playlists=[];
var songList=[];

db.collection("artists").orderBy("flag","desc").limit(4).onSnapshot(function(querySnapshot){
  querySnapshot.docChanges().forEach(function(change){
      if(change.type=="added"){
         
        
          document.querySelector(".row3").innerHTML += `<div class='artistContainer' style=background-color:${colorString[Math.floor(Math.random()*4)]}><h5 class="artistName">` + change.doc.data().artist_name + "</h5></div>"    
      }
    })
  });
  db.collection("genres").orderBy("flag","desc").limit(5).onSnapshot(function(querySnapshot){
    querySnapshot.docChanges().forEach(function(change){
        if(change.type=="added"){
           
          
            document.querySelector(".row4").innerHTML += `<div class='genreContainer' style=background-color:${colorString[Math.floor(Math.random()*4)]}><h5 class="artistName">` + change.doc.data().genre_name + "</h5></div>"    
        }
      })
    });
  db.collection("songs").limit(1).onSnapshot(function(querySnapshot)
  {
    querySnapshot.docChanges().forEach(function(change)
    {
      if(change.type=="added"){
       document.querySelector('#song_title').innerHTML= change.doc.data().name;
       document.querySelector('#artist_name').innerHTML= change.doc.data().artist;
       document.querySelector('audio').src= change.doc.data().url;
      }
    });
  });
  db.collection("songs").onSnapshot(function(querySnapshot)
  {
   
    querySnapshot.docChanges().forEach(function(change)
    {
      if(change.type="added"){
        
          songList.push(change.doc.data());
          // songList[i].artistName=change.doc.data().artist;
          // songList[i].songLink=change.doc.data().url;

        
        
      }
    })
  })
  //Music player code
  const play = document.getElementById("play");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const music = document.querySelector("audio");
  const img = document.querySelector("#recordImage");
  const title = document.getElementById("#song_title");
  const artist  = document.getElementById("#artist_name");
  const playlist = document.getElementById("playlistButton");                                                                  
  let isplaying = 0;
  var a=0;
  const playMusic = function()
  {
    isplaying = 1;
    music.play();
    play.classList.replace("fa-play","fa-pause");
    img.classList.add("anime");
  }
  const pauseMusic= function()
  {
    isplaying = 0;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    img.classList.remove("anime");
  }
  play.addEventListener("click",function()
  {
    if(isplaying==0)
    {
      playMusic();
    }
    else
    {
      pauseMusic();
    }
  });
  var index=0;
   const playlistSongs =async  function()
  {
    console.log("clicked")
    songList=[];
     await db.collection("songs").orderBy("artist").onSnapshot( function(querySnapshot)
  {
   
     querySnapshot.docChanges().forEach(function(change)
    {
      if(change.type="added"){
        
          songList.push(change.doc.data());      
        
      }
    })
  })
  console.log(songList);
  loadsongs(songList);
  playMusic();
  }
  const loadsongs = function(songList)
  {
    document.querySelector('#song_title').innerHTML=songList.name;
    document.querySelector('#artist_name').innerHTML=songList.artist;
    document.querySelector('audio').src=songList.url;
  }
  const prevSong = function()
  {
    index = (index-1 + songList.length)%songList.length;
    
      loadsongs(songList[index]);
    playMusic();
  }
  const nextSong = function()
  {
    index = (index+1)%songList.length;
    
      loadsongs(songList[index]);
    
    playMusic();
  }
  const autosong = function()
  {
  
    index = (index+1)%songList.length;
   
      loadsongs(songList[index]);
   
    playMusic();
  }
  
prev.addEventListener("click",prevSong);
next.addEventListener("click",nextSong);
music.addEventListener("ended",autosong);
playlist.addEventListener("click",playlistSongs);