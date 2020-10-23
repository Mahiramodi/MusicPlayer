const play=document.getElementById("play");
      const img=document.getElementById("cover");
      const music= document.querySelector("audio");
      let progress = document.getElementById("progress");
      let current_time=document.getElementById("current_time");
      let final_time=document.getElementById("final")
      let isPlaying=false;

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
       let total_time =`${min_time}:${sec_time}`;
       if(total_time){
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
