let c = document.getElementById("my-canvas");
let ctx = c.getContext("2d");


let progress = document.getElementById("progress");   //HealthBar
function updateValue() {
    progress.style.width = perc+'%';
    if (perc <= 0){
     alert("You have finished Ninja Training"); 
     perc = 100;   
    };
};



let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};

document.getElementById("my-canvas").style.backgroundImage = "url('images/background.jpg')"; 


let imagePath = (framenumber, animation) => {
  return "images/" + animation + "/" + framenumber +".png";
};

let frames = {
    idle: [1, 2, 3, 4, 5, 6, 7, 8],
    kick: [1, 2, 3, 4, 5, 6, 7],
    punch: [1, 2, 3, 4, 5, 6, 7],
    block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    forward: [1, 2, 3, 4, 5, 6],
    backward: [1, 2, 3, 4, 5, 6],
    punchflame: [1, 2, 3, 4, 5, 6, 7],
    kickflame: [1, 2, 3, 4, 5, 6, 7],
};

let loadImages = (callback) => {
    let images = { idle: [], kick: [], punch: [], block: [], forward: [], backward: [], punchflame: [], kickflame: [], };
    let imagesToload = 0;

    ["idle", "kick", "punch", "block", "forward", "backward", "punchflame", "kickflame"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToload = imagesToload + animationFrames.length;


        animationFrames.forEach((framenumber) => {
            let path =imagePath(framenumber, animation);

            loadImage(path, (image) => {
                images[animation][framenumber - 1] = image;
                imagesToload = imagesToload - 1;
                
                if (imagesToload === 0) {
                    callback(images);
                }
            });   
        });
        
    });
};

let xposition = 0;
let perc = 100;
updateValue();

let animate = (ctx, images, animation, callback)=> {
   
   if (xposition === 150){
   
     if (animation === "punch"){
        animation = "punchflame";
        perc = perc - 10;
     };
     if (animation === "kick"){
         animation = "kickflame";
         perc = perc - 20;
     };
};

    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, 700, 700);
            ctx.drawImage(image, xposition, 0, 500, 500);
         }, index*100);
    });
    setTimeout(callback, images[animation].length * 100);

if (animation === "punchflame" || animation ==="kickflame"){
    updateValue();
}

 if (animation === "forward") {    
    xposition = xposition + 75;
    };

 if (animation === "backward") {    
    xposition = xposition - 75;
    };   

};

loadImages((images) => {
    let queuedAnimations = [];

    let aux = () => {
        let selectedAnimation;

    if (queuedAnimations.length === 0) {
        selectedAnimation = "idle";
    }else{
        selectedAnimation = queuedAnimations.shift();
    }

    animate(ctx, images, selectedAnimation, aux);
    };

aux();


document.getElementById("kick").onclick = () =>{
    queuedAnimations.push("kick");
};

document.getElementById("punch").onclick = () =>{
    queuedAnimations.push("punch");    
};

document.getElementById("block").onclick = () =>{
    queuedAnimations.push("block");
};  

document.getElementById("forward").onclick = () =>{
    queuedAnimations.push("forward");
};

document.getElementById("backward").onclick = () =>{
    queuedAnimations.push("backward");
};  

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "ArrowLeft"){
        queuedAnimations.push("backward");  
    }else if (key === "ArrowRight"){
        queuedAnimations.push("forward");
    }else if (key === "ArrowDown"){
        queuedAnimations.push("kick");
    }else if (key === "ArrowUp"){
        queuedAnimations.push("punch");  
    }else if (key === " "){
        queuedAnimations.push("block");
    }
})
});

