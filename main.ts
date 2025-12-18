namespace SpriteKind {
    export const npc = SpriteKind.create()
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (nena.overlapsWith(npc2)) {
        myMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("abc")
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
let myMenu: miniMenu.MenuSprite = null
let nena: Sprite = null
let npc2: Sprite = null
scene.setBackgroundImage(assets.image`Fondillo`)
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
forever(function () {
    if (nena.x < 85) {
        npc2.sayText("Hola!", 500)
    } else {
        myMenu.close()
    }
})
