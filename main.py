@namespace
class SpriteKind:
    npc = SpriteKind.create()
    arbre = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    nena.say_text("A per vendre", 200)
sprites.on_overlap(SpriteKind.player, SpriteKind.npc, on_on_overlap)

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
        arbol_tocado = None 
    elif nena.overlaps_with(npc2) and seleccio_menu == 0:
        seleccio_menu = 1
        controller.move_sprite(nena, 0, 0)
        myMenu = miniMenu.create_menu(miniMenu.create_menu_item("Cabra (5 llenya)"),
            miniMenu.create_menu_item("Gallina (6 llenya)"),
            miniMenu.create_menu_item("Patates (2 llenya)"),
            miniMenu.create_menu_item("Dotzena d'ous (3 llenya)"),
            miniMenu.create_menu_item("Caball (12 llenya)"),
            miniMenu.create_menu_item("Tancar menú"))
        myMenu.set_title("mercat de trueque!")
        myMenu.on_button_pressed(controller.A, on_menu_selection)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_b_pressed():
    global seleccio_menu
    if seleccio_menu > 0:
        if myMenu:
            myMenu.close()
        controller.move_sprite(nena, 100, 100)
        seleccio_menu = 0
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def mostrar_menu_cantidad(nombre: str, precio: number):
    global item_nombre_temp, item_precio_temp, seleccio_menu, myMenu
    item_nombre_temp = nombre
    item_precio_temp = precio
    seleccio_menu = 2
    myMenu = miniMenu.create_menu(miniMenu.create_menu_item("1"),
        miniMenu.create_menu_item("2"),
        miniMenu.create_menu_item("3"),
        miniMenu.create_menu_item("4"),
        miniMenu.create_menu_item("5"),
        miniMenu.create_menu_item("Tornar enrere"))
    myMenu.set_title("Quants/es " + nombre + "s?")
    
    def on_button_pressed(selection, selectedIndex):
        global seleccio_menu, myMenu, llenya_actual
        if myMenu:
            myMenu.close()
        if selectedIndex == 5:
            seleccio_menu = 1
            myMenu = miniMenu.create_menu(miniMenu.create_menu_item("Cabra (5 llenya)"),
                miniMenu.create_menu_item("Gallina (6 llenya)"),
                miniMenu.create_menu_item("Patates (2 llenya)"),
                miniMenu.create_menu_item("Dotzena d'ous (3 llenya)"),
                miniMenu.create_menu_item("Caball (12 llenya)"),
                miniMenu.create_menu_item("Tancar menú"))
            myMenu.set_title("mercat de trueque!")
            myMenu.on_button_pressed(controller.A, on_menu_selection)
        else:
            cantidad = selectedIndex + 1
            costo_total = item_precio_temp * cantidad
            if llenya_actual >= costo_total:
                llenya_actual += 0 - costo_total
                info.set_score(llenya_actual)
                game.splash("Has comprat " + ("" + str(cantidad)) + " " + item_nombre_temp)
                game.splash("Cost: " + ("" + str(costo_total)) + " llenya")
                controller.move_sprite(nena, 100, 100)
                seleccio_menu = 0
            else:
                controller.move_sprite(nena, 100, 100)
                seleccio_menu = 0
                npc2.say_text("Necessites " + ("" + str(costo_total)) + " llenya!", 3000)
    myMenu.on_button_pressed(controller.A, on_button_pressed)
    

def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_menu_selection(selection2: str, selectedIndex2: number):
    global seleccio_menu
    if myMenu:
        myMenu.close()
    if selectedIndex2 == 5:
        controller.move_sprite(nena, 100, 100)
        seleccio_menu = 0
    elif selectedIndex2 == 0:
        mostrar_menu_cantidad("Cabra", 5)
    elif selectedIndex2 == 1:
        mostrar_menu_cantidad("Gallina", 6)
    elif selectedIndex2 == 2:
        mostrar_menu_cantidad("Patates", 2)
    elif selectedIndex2 == 3:
        mostrar_menu_cantidad("Dotzena d'ous", 3)
    elif selectedIndex2 == 4:
        mostrar_menu_cantidad("Caball", 12)

def on_on_destroyed(sprite2):
    global llenya_actual
    llenya_actual += 3
    info.change_score_by(3)
sprites.on_destroyed(SpriteKind.arbre, on_on_destroyed)

ha_saludat = False
llenya_actual = 0
item_precio_temp = 0
item_nombre_temp = ""
seleccio_menu = 0
arbol_tocado: Sprite = None
posicion_y = 0
posicion_x = 0
arbol2: Sprite = None
index = 0
numero_arboles = 0
nena: Sprite = None
npc2: Sprite = None
myMenu: miniMenu.MenuSprite = None
pot_vendre = False
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
    global ha_saludat
    if nena.x < 85 and not (ha_saludat):
        npc2.say_text("Hola!", 1000)
        ha_saludat = True
    elif nena.x >= 85:
        ha_saludat = False
        if myMenu:
            myMenu.close()
forever(on_forever)
