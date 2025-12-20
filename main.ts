namespace SpriteKind {
    export const npc = SpriteKind.create()
    export const arbre = SpriteKind.create()
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.npc, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    nena.sayText("A per vendre", 200)
})
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
        arbol_tocado = null
    } else if (nena.overlapsWith(npc2) && seleccio_menu == 0) {
        seleccio_menu = 1
        controller.moveSprite(nena, 0, 0)
        myMenu = miniMenu.createMenu(miniMenu.createMenuItem("Cabra (5 llenya)"), miniMenu.createMenuItem("Gallina (6 llenya)"), miniMenu.createMenuItem("Patates (2 llenya)"), miniMenu.createMenuItem("Dotzena d'ous (3 llenya)"), miniMenu.createMenuItem("Caball (12 llenya)"), miniMenu.createMenuItem("Tancar menú"))
        myMenu.setTitle("mercat de trueque!")
        myMenu.onButtonPressed(controller.A, on_menu_selection)
    }
    
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    
    if (seleccio_menu > 0) {
        if (myMenu) {
            myMenu.close()
        }
        
        controller.moveSprite(nena, 100, 100)
        seleccio_menu = 0
    }
    
})
function mostrar_menu_cantidad(nombre: string, precio: number) {
    
    item_nombre_temp = nombre
    item_precio_temp = precio
    seleccio_menu = 2
    myMenu = miniMenu.createMenu(miniMenu.createMenuItem("1"), miniMenu.createMenuItem("2"), miniMenu.createMenuItem("3"), miniMenu.createMenuItem("4"), miniMenu.createMenuItem("5"), miniMenu.createMenuItem("Tornar enrere"))
    myMenu.setTitle("Quants/es " + nombre + "s?")
    myMenu.onButtonPressed(controller.A, function on_button_pressed(selection: any, selectedIndex: any) {
        let cantidad: number;
        let costo_total: number;
        
        if (myMenu) {
            myMenu.close()
        }
        
        if (selectedIndex == 5) {
            seleccio_menu = 1
            myMenu = miniMenu.createMenu(miniMenu.createMenuItem("Cabra (5 llenya)"), miniMenu.createMenuItem("Gallina (6 llenya)"), miniMenu.createMenuItem("Patates (2 llenya)"), miniMenu.createMenuItem("Dotzena d'ous (3 llenya)"), miniMenu.createMenuItem("Caball (12 llenya)"), miniMenu.createMenuItem("Tancar menú"))
            myMenu.setTitle("mercat de trueque!")
            myMenu.onButtonPressed(controller.A, on_menu_selection)
        } else {
            cantidad = selectedIndex + 1
            costo_total = item_precio_temp * cantidad
            if (llenya_actual >= costo_total) {
                llenya_actual += 0 - costo_total
                info.setScore(llenya_actual)
                game.splash("Has comprat " + ("" + ("" + cantidad)) + " " + item_nombre_temp)
                game.splash("Cost: " + ("" + ("" + costo_total)) + " llenya")
                controller.moveSprite(nena, 100, 100)
                seleccio_menu = 0
            } else {
                controller.moveSprite(nena, 100, 100)
                seleccio_menu = 0
                npc2.sayText("Necessites " + ("" + ("" + costo_total)) + " llenya!", 3000)
            }
            
        }
        
    })
}

controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-up
            `, 500, false)
})
function on_menu_selection(selection2: string, selectedIndex2: number) {
    
    if (myMenu) {
        myMenu.close()
    }
    
    if (selectedIndex2 == 5) {
        controller.moveSprite(nena, 100, 100)
        seleccio_menu = 0
    } else if (selectedIndex2 == 0) {
        mostrar_menu_cantidad("Cabra", 5)
    } else if (selectedIndex2 == 1) {
        mostrar_menu_cantidad("Gallina", 6)
    } else if (selectedIndex2 == 2) {
        mostrar_menu_cantidad("Patates", 2)
    } else if (selectedIndex2 == 3) {
        mostrar_menu_cantidad("Dotzena d'ous", 3)
    } else if (selectedIndex2 == 4) {
        mostrar_menu_cantidad("Caball", 12)
    }
    
}

sprites.onDestroyed(SpriteKind.arbre, function on_on_destroyed(sprite2: Sprite) {
    
    llenya_actual += 3
    info.changeScoreBy(3)
})
let ha_saludat = false
let llenya_actual = 0
let item_precio_temp = 0
let item_nombre_temp = ""
let seleccio_menu = 0
let arbol_tocado : Sprite = null
let posicion_y = 0
let posicion_x = 0
let arbol2 : Sprite = null
let index = 0
let numero_arboles = 0
let nena : Sprite = null
let npc2 : Sprite = null
let myMenu : miniMenu.MenuSprite = null
let pot_vendre = false
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
    
    if (nena.x < 85 && !ha_saludat) {
        npc2.sayText("Hola!", 1000)
        ha_saludat = true
    } else if (nena.x >= 85) {
        ha_saludat = false
        if (myMenu) {
            myMenu.close()
        }
        
    }
    
})
