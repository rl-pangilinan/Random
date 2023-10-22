# Random
I'll just add a bunch of things I think I can put on a website.
IDK just for fun.



https://github.com/Baggette/Baggette-site/blob/main/js/script.js#L44-L94//peaches secret 

 function peaches(){ 
         let sequence = ['p', 'e', 'a', 'c', 'h', 'e', 's'] // Defines the keys that have to be pressed 
                 let index = 0 
                 window.addEventListener("keydown", async event => { 
  
                         if(index == -1)return; // Secret has already been activated, ignore further key presses 
  
                         // If the pressed key is the next one in the sequence, go further up the sequence. Otherwise, reset. 
                         if(event.key == sequence[index]){ 
                                 index += 1; 
                         }else{ 
                                 index = 0; 
                         } 
  
                         // Check if sequence has been entered 
                         if(index >= sequence.length){ 
                                 index = -1; // Prevent further key presses from activating the secret 
  
                                 const name = document.getElementById("name"); 
                                 const text = document.getElementById("paragraph"); 
                                 alert("Bowser mode activated"); 
                                 changefavicon();1 
                                 name.innerHTML = "Bowser"; 
                                 text.innerHTML = ` 
                                 This one is for my one and only true love 
                                 Princess Peach 
                                 Peach, you're so cool 
                                 And with my star, we're gonna rule 
                                 Peach, understand 
                                 I'm gonna love you 'til the very end 
                                 Peaches, Peaches, Peaches, Peaches, Peaches 
                                 Peaches, Peaches, Peaches, Peaches, Peaches 
                                 I love you, oh 
                                 Peaches, Peaches, Peaches, Peaches, Peaches 
                                 Peaches, Peaches, Peaches, Peaches, Peaches 
                                 I love you, oh 
                                 Mario, Luigi, and a Donkey Kong too 
                                 A thousand troops of Koopas couldn't keep me from you 
                                 Princess Peach, at the end of the line 
                                 I'll make you mine, oh 
                                 Peaches, Peaches, Peaches, Peaches, Peaches 
                                 Peaches, Peaches, Peaches, Peaches, Peaches 
                                 I love you, oh 
                                 Peaches, Peaches, Peach, Peach`; 
                                 var audio = new Audio("../assets/peaches.mp3"); 
                                 audio.play(); 
                         }}); 
 } 
 nyan() 
 peaches()
