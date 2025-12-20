namespace SpriteKind {
    export const npc = SpriteKind.create()
    export const arbre = SpriteKind.create()
}

function crearArbres() {
    
    numero_arboles = randint(20, 25)
    while (index <= numero_arboles - 1) {
        arbol2 = sprites.create(assets.image`
            arbre_pi
            `, SpriteKind.arbre)
        posicion_x = randint(index * 7, index * 7 + 15)
        posicion_y = randint(20, 55)
        arbol2.setPosition(posicion_x, posicion_y)
        index += 1
    }
}

controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-down
            `, 500, false)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-right
            `, 500, false)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-left
            `, 500, false)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    arbol_tocado = null
    for (let arbol of sprites.allOfKind(SpriteKind.arbre)) {
        if (nena.overlapsWith(arbol)) {
            arbol_tocado = arbol
            break
        }
        
    }
    if (arbol_tocado) {
        sprites.destroy(arbol_tocado)
        nena.sayText("He recollit llenya!", 1000)
    } else if (nena.overlapsWith(npc2) && seleccio_menu == 0) {
        seleccio_menu = 1
        controller.moveSprite(nena, 0, 0)
        myMenu = miniMenu.createMenu(miniMenu.createMenuItem("Gallina"), miniMenu.createMenuItem("Gallina"), miniMenu.createMenuItem("Patates"), miniMenu.createMenuItem("Dotzena"), miniMenu.createMenuItem("Caball"), miniMenu.createMenuItem("Tancar menú"))
        myMenu.setTitle("mercat de trueque!")
    }
    
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    
    myMenu.close()
    controller.moveSprite(nena, 100, 100)
    seleccio_menu = 0
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-up
            `, 500, false)
})
sprites.onDestroyed(SpriteKind.arbre, function on_on_destroyed(sprite: Sprite) {
    info.changeScoreBy(1)
})
let seleccio_menu = 0
let posicion_y = 0
let posicion_x = 0
let arbol2 : Sprite = null
let index = 0
let numero_arboles = 0
let myMenu : miniMenu.MenuSprite = null
let nena : Sprite = null
let npc2 : Sprite = null
let seleccio_menu2 = 0
let arbol_tocado : Sprite = null
scene.setBackgroundImage(assets.image`
    Fondillo
    `)
crearArbres()
npc2 = sprites.create(assets.image`
    monillo
    `, SpriteKind.npc)
npc2.setPosition(27, 99)
nena = sprites.create(assets.image`
    nena-front
    `, SpriteKind.Player)
nena.setPosition(131, 99)
nena.setStayInScreen(true)
controller.moveSprite(nena)
animation.runImageAnimation(npc2, assets.animation`
        monillo_animacio
        `, 200, true)
myMenu = miniMenu.createMenu(miniMenu.createMenuItem("abc"))
myMenu.close()
info.setScore(0)
forever(function on_forever() {
    if (nena.x < 85) {
        npc2.sayText("Hola!", 500)
    } else {
        myMenu.close()
    }
    
})
