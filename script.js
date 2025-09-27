const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Background properties

canvas.width = 1024
canvas.height = 576 
const gravity = 0.5

// Render Background Canvas
function renderBackground(c){
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

}

// Player Class Properties
class Player {
    constructor(){
        this.position = {
            x:0, y:0
        }
        this.velocity = {
            x:0, y:1
        }
        this.height = 100;
    }
    
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 100,this.height)
    }
    
    update(){
        this.draw()
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity < canvas.height){
            this.velocity.y += gravity
        }else this.velocity.y = 0
    }
    
}

// Initialize a new Player
const player = new Player()

function animate() {
    
    window.requestAnimationFrame(animate)
    renderBackground(c)
    player.update()
}
renderBackground(c)
player.draw()
animate()

