
from python_imagesearch.imagesearch import imagesearch
from python_imagesearch.imagesearch import imagesearcharea
import pyautogui
import time

import Assets.Scripts.process as process

images = [
        "Bank.PNG",
        "CompactInventory.PNG",
        "CopperFed.PNG",
        "DepositMaterials.PNG",
        "ElderWood.PNG",
        "Gear.PNG",
        "Inventory.PNG",
        "LucentMote.PNG",
        "Luck10.PNG",
        "Luck50.PNG",
        "Luck100.PNG",
        "Luck200.PNG",
        "Mithril.PNG",
        "Runecrafters.PNG",
        "Silk.PNG",
        "SilverFed.PNG",
        "ThickLeather.PNG",
        "InventoryEnd.PNG"
    ]

luck = {"Luck10": "Luck10.PNG", 
        "Luck50": "Luck50.PNG", 
        "Luck100": "Luck100.PNG", 
        "Luck200": "Luck200.PNG"}

materials = {"Mithril": "Mithril.PNG", 
             "Elder": "ElderWood.PNG", 
             "Thick": "ThickLeather.PNG", 
             "Silk": "Silk.PNG", 
             "Lucent": "LucentMote.PNG"}


def get_inventory_coordinates():
        inventory_xy = imagesearch("Assets/Images/Inventory.PNG")
        if inventory_xy != -1:
            inventory_x = inventory_xy[0]
            inventory_y = inventory_xy[1]
        else:
            print("Couldn't get inv coords")

        return inventory_x, inventory_y


def calculate_inventory_width(inv_x):
    inventory_end_xy = imagesearch("Assets/Images/InventoryEnd.PNG")
    if inventory_end_xy != -1:
        inventory_end_x = inventory_end_xy[0]

        inventory_width = (inventory_end_x + 30) - inv_x 
    else:
        print("Couldn't calculate inventory width")


def get_bank_coordinates():
    bank_xy = imagesearch("Assets/Images/Bank.PNG")
    if bank_xy[0] != -1:
        bank_x = bank_xy[0]
        bank_y = bank_xy[1]
    else:
        print("Couldn't find bank")

    return bank_x, bank_y


def move_luck():
    for luck_type in luck:
        image_xy = imagesearch(f"Assets/Images")


x, y = get_bank_coordinates()
print(x, y)


# move_luck()
 
