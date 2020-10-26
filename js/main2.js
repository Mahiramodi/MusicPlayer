
     
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
//-----------------all songs-----------------------..//
  db.collection("songs").onSnapshot(function(querySnapshot)
  {
   
    querySnapshot.docChanges().forEach(function(change) //update database
    {
      if(change.type="added")
      {
          songList.push(change.doc.data());
      }
    })
  })

  const play=document.getElementById("play");
  const img=document.getElementById("cover");
  const music= document.querySelector("audio");
  let progress = document.getElementById("progress");
  let current_time=document.getElementById("current_time");
  let final_time=document.getElementById("final");
  let artist =document.getElementById("artist_name");
  let song = document.getElementById("song");
  let previous= document.getElementById("previous");
  let next = document.getElementById("next");
  let isPlaying=false;

///-----------------------play and pause---------------------------////////////////
        const  playMusic = () =>{
         isPlaying=true;
        music.play();
        console.log("clicked");
        play.classList.replace('fa-play-circle',"fa-pause-circle");
        img.classList.add("anime");
         
     };
     const pauseMusic= () =>{
         isPlaying=false;
        music.pause();
        console.log("clicked");
        play.classList.replace('fa-pause-circle',"fa-play-circle");
        img.classList.remove("anime");
         
     };

     play.addEventListener('click',()=> {
         if(isPlaying){
             pauseMusic();
         }
         else{
             playMusic();
         }
         
     });
  
     ////=======================progress Bar====================//////////
     music.addEventListener("timeupdate",(event) => {
      const{ currentTime,duration} = event.srcElement;
      console.log(currentTime);
      let progress_duration = (currentTime/duration)*100;
       progress.style.width =`${progress_duration}%`;

       //---------------------final time measured---------------------/////
       let min_time = Math.floor(duration/60);
       let sec_time = Math.floor(duration%60);
       console.log(min_time);
       console.log(sec_time);
       if(sec_time<10){
           sec_time=`0${sec_time}`;
       }
       let total_time =`${min_time}:${sec_time}`;
       if(duration){
        final_time.textContent = `${total_time}`;
       }
       
       ///-------------------current time ------------------------------/////
       let current_min = Math.floor(currentTime/60);
       let current_sec = Math.floor(currentTime%60);
        
       if(current_sec<10){
           current_sec=`0${current_sec}`;
       }
       current_time.textContent =`${current_min}:${current_sec}`;
     });

     ////----------------next and previous ----------------------///////////
     var index=0;

     

     const loadSongs = (songList) =>
     {
         song.textContent=songList.name;
         artist.textContent=songList.artist;
         music.src=songList.url;
     }

     
     

     const nextSong = () =>
     {
         index = (index+1)%songList.length;
         loadSongs(songList[index]);
         playMusic();
     }
     const prevSong = () =>
     {
         index = (index-1)%songList.length;
         loadSongs(songList[index]);
         playMusic();
     }

     next.addEventListener("click",nextSong);
     previous.addEventListener("click",prevSong);