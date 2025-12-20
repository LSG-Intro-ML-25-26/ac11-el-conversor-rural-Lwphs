namespace SpriteKind {
    export const npc = SpriteKind.create()
    export const arbre = SpriteKind.create()
}
function crearArbres () {
    numero_arboles = randint(20, 25)
    while (index <= numero_arboles - 1) {
        arbol2 = sprites.create(assets.image`arbre_pi`, SpriteKind.arbre)
        posicion_x = randint(index * 7, index * 7 + 15)
        posicion_y = randint(20, 55)
        arbol2.setPosition(posicion_x, posicion_y)
        index += 1
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-down`,
    500,
    false
    )
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-right`,
    500,
    false
    )
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-left`,
    500,
    false
    )
})
// Primero verificar si está tocando un árbol
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let arbol of sprites.allOfKind(SpriteKind.arbre)) {
        if (nena.overlapsWith(arbol)) {
            arbol_tocado = arbol
            break;
        }
    }
    if (arbol_tocado) {
        sprites.destroy(arbol_tocado)
        nena.sayText("He recollit llenya!", 1000)
    } else if (nena.overlapsWith(npc2)) {
        myMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Benvingut al mercat!")
        )
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
})
sprites.onDestroyed(SpriteKind.arbre, function (sprite) {
    info.changeScoreBy(1)
})
let arbol_tocado: Sprite = null
let posicion_y = 0
let posicion_x = 0
let arbol2: Sprite = null
let index = 0
let numero_arboles = 0
let myMenu: miniMenu.MenuSprite = null
let nena: Sprite = null
let npc2: Sprite = null
scene.setBackgroundImage(assets.image`Fondillo`)
crearArbres()
npc2 = sprites.create(assets.image`monillo`, SpriteKind.npc)
npc2.setPosition(27, 99)
nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
nena.setPosition(131, 99)
nena.setStayInScreen(true)
controller.moveSprite(nena)
animation.runImageAnimation(
npc2,
assets.animation`monillo_animacio`,
200,
true
)
myMenu = miniMenu.createMenu(
miniMenu.createMenuItem("abc")
)
myMenu.close()
info.setScore(0)
forever(function () {
    if (nena.x < 85) {
        npc2.sayText("Hola!", 500)
    } else {
        myMenu.close()
    }
})
