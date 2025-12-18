@namespace
class SpriteKind:
    npc = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    pass
sprites.on_overlap(SpriteKind.player, SpriteKind.npc, on_on_overlap)

def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_right_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-right
            """),
        500,
        False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_left_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-left
            """),
        500,
        False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

nena: Sprite = None
scene.set_background_image(assets.image("""
    Fondillo
    """))
npc2 = sprites.create(assets.image("""
    monillo
    """), SpriteKind.npc)
npc2.set_position(27, 99)
nena = sprites.create(assets.image("""
    nena-front
    """), SpriteKind.player)
nena.set_position(131, 99)
nena.set_stay_in_screen(True)
controller.move_sprite(nena)
animation.run_image_animation(npc2,
    assets.animation("""
        monillo_animacio
        """),
    200,
    True)

def on_forever():
    if nena.x < 85:
        npc2.say_text("Hola!", 500)
forever(on_forever)
