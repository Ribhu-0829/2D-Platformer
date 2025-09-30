const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./Assets/battleBackground.png";

const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

let draggle, emby, renderedSprites;
let queue, battleAnimationId;

// This will initilize all the initial Battle Thingies
function initBattle() {

  document.querySelector('#userInterface').style.display = 'block'
  document.querySelector('#dialogueBox').style.display = 'none'
  document.querySelector('#enemyHealthBar').style.width = '100%'
  document.querySelector('#playerHealthBar').style.width = '100%'
  document.querySelector('#attacksBox').replaceChildren()

  // Assigning Values
  queue = [];
  draggle = new Monster(monsters.Draggle);
  emby = new Monster(monsters.Emby);
  renderedSprites = [draggle, emby];

  // Filling the Attack Box for the User Player
  emby.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    document.querySelector("#attacksBox").append(button);
  });

  // Assigining all Button with Attacks
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      emby.attack({
        attack: selectedAttack,
        recipient: draggle,
        renderedSprites
      });
      // Checks if Enemy's Health is zero or not
      if (draggle.health <= 0) {
        queue.push(() => {
          draggle.faint();
        });

        // If the Enemy dies returns Back to main Map Again
        queue.push(() => {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate();
              document.querySelector("#userInterface").style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });

              battle.initiated = false
              audio.Battle.stop()
              audio.Map.play()

            },
          });
        });
      }

      // Choosing a Random Attack Player for Enemy
      const randomAttack = Math.floor(Math.random() * draggle.attacks.length);
      queue.push(() => {
        draggle.attack({
          attack: draggle.attacks[randomAttack],
          recipient: emby,renderedSprites
        });

        // Checks if Player Health is Ok or not if Dies
        // Send Back to Main Screen

        if (emby.health <= 0) {

          queue.push(() => {
            emby.faint();
          });
          
          queue.push(() => {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate();
              document.querySelector("#userInterface").style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });
              battle.initiated = false
            },
          });
        });
        }
        
      });
    });
    //This Changes the Attack Name for the Selected Attack
    button.addEventListener("mouseenter", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      document.querySelector("#attackType").innerHTML = selectedAttack.type;
      document.querySelector("#attackType").style.color = selectedAttack.color;
    });
  });
}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();
  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
  
}
//This is for the Dialogue for Attack Used
document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});

animate()
