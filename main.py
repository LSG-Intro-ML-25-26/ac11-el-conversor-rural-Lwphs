@namespace
class SpriteKind:
    npc = SpriteKind.create()
    arbre = SpriteKind.create()
def crearArbres():
    global numero_arboles, arbol2, posicion_x, posicion_y, index
    numero_arboles = randint(20, 25)
    while index <= numero_arboles - 1:
        arbol2 = sprites.create(assets.image("""
            arbre_pi
            """), SpriteKind.arbre)
        posicion_x = randint(index * 7, index * 7 + 15)
        posicion_y = randint(20, 55)
        arbol2.set_position(posicion_x, posicion_y)
        index += 1

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

def on_a_pressed():
    global arbol_tocado, seleccio_menu, myMenu
    arbol_tocado = None
    for arbol in sprites.all_of_kind(SpriteKind.arbre):
        if nena.overlaps_with(arbol):
            arbol_tocado = arbol
            break
    if arbol_tocado:
        sprites.destroy(arbol_tocado)
        nena.say_text("He recollit llenya!", 1000)
    elif nena.overlaps_with(npc2) and seleccio_menu == 0:
        seleccio_menu = 1
        controller.move_sprite(nena, 0, 0)
        
        myMenu = miniMenu.create_menu(miniMenu.create_menu_item("Gallina"),
            miniMenu.create_menu_item("Gallina"),
            miniMenu.create_menu_item("Patates"),
            miniMenu.create_menu_item("Dotzena"),
            miniMenu.create_menu_item("Caball"),
            miniMenu.create_menu_item("Tancar menú"))
        
        myMenu.set_title("mercat de trueque!")
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_b_pressed():
    global seleccio_menu
    myMenu.close()
    controller.move_sprite(nena, 100, 100)
    seleccio_menu = 0
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_on_destroyed(sprite):
    info.change_score_by(1)
sprites.on_destroyed(SpriteKind.arbre, on_on_destroyed)

seleccio_menu = 0
posicion_y = 0
posicion_x = 0
arbol2: Sprite = None
index = 0
numero_arboles = 0
myMenu: miniMenu.MenuSprite = None
nena: Sprite = None
npc2: Sprite = None
seleccio_menu2 = 0
arbol_tocado: Sprite = None
scene.set_background_image(assets.image("""
    Fondillo
    """))
crearArbres()
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
myMenu = miniMenu.create_menu(miniMenu.create_menu_item("abc"))
myMenu.close()
info.set_score(0)

def on_forever():
    if nena.x < 85:
        npc2.say_text("Hola!", 500)
    else:
        myMenu.close()
forever(on_forever)
