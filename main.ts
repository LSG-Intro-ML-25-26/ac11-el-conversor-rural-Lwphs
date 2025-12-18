namespace SpriteKind {
    export const npc = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.npc, function (sprite, otherSprite) {
	
})
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
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
})
let nena: Sprite = null
scene.setBackgroundImage(assets.image`Fondillo`)
let npc2 = sprites.create(assets.image`monillo`, SpriteKind.npc)
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
forever(function () {
    if (nena.x < 85) {
        npc2.sayText("Hola!", 500)
    }
})
