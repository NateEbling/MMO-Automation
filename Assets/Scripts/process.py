
import time
import threading
import pyautogui
import pydirectinput
from python_imagesearch.imagesearch import imagesearch
from python_imagesearch.imagesearch import imagesearcharea
from datetime import datetime


class Process:

    a = None
    total_gear = 0
    shared_inventory_slots = 0

    open_gear_delay = 2.5
    copper_fed_delay = 24
    runecrafters_delay = 5
    silver_fed_delay = 2
    deposit_materials_delay = 0.5
    compact_inventory_delay = 0.5
    move_luck_delay = 0
    move_materials_delay = 0
    move_remainder_delay = 0
    refill_shared_inventory_delay = 0.5
    check_for_gear_in_inventory_delay = 0.5

    stacks_before_extra_processes = 5

    inventory_x = 0
    inventory_y = 0
    inventory_end_x = 0
    inventory_end_y = 0
    inventory_width = 0  # calculated in calculate_inventory_width\
    inventory_width_offset = 30
    inventory_height = 900  # can be variable, but this will cover most ranges
    
    shared_inventory_height = 300

    bank_x = 0
    bank_y = 0
    bank_width = 860  # bank w and h never change
    bank_height = 670  

    # Offsets to get approximately the center of each image
    compact_inventory_offset_x = 10
    compact_inventory_offset_y = 10

    copper_fed_offset_x = 15
    copper_fed_offset_y = 20

    deposit_materials_offset_x = 10
    deposit_materials_offset_y = 10

    elder_wood_offset_x = 20
    elder_wood_offset_y = 10

    gear_offset_x = 20
    gear_offset_y = 20

    lucent_mote_offset_x = 20
    lucent_mote_offset_y = 10

    luck_offset_x = 20
    luck_offset_y = 10

    mithril_offset_x = 20
    mithril_offset_y = 10

    runecraftes_offset_x = 20
    runecrafters_offset_y = 20

    silk_offset_x = 20
    silk_offset_y = 10

    silver_fed_offset_x = 20
    silver_fed_offset_y = 20

    thick_leather_offset_x = 20
    thick_leather_offset_y = 10

    # Lists for the move functions
    luck = ["Luck10.PNG", "Luck50.PNG", "Luck100.PNG", "Luck200.PNG"]
    materials = ["Mithril.PNG", "ElderWood.PNG", "ThickLeather.PNG", "Silk.PNG", "LucentMote.PNG"]

    def __init__(self, app, total_gear, shared_inventory_slots):
        self.a = app
        self.total_gear = total_gear
        self.shared_inventory_slots = shared_inventory_slots

        self.get_inventory_coordinates()
        self.get_bank_coordinates()
        self.get_static_coordinates()

        p = threading.Thread(target=self.run, daemon=True)
        p.start()

    def run(self):
        time.sleep(5)  # wait five seconds before starting
        while self.a.is_running:
            # process here

            i = 0
            for i in range(self.total_gear / (250 * self.shared_inventory_slots)):
                for j in range(self.shared_inventory_slots):
                    self.open_gear()
                    time.sleep(self.open_gear_delay)

                    self.copper_fed()
                    time.sleep(self.copper_fed_delay)

                    self.runecrafters()
                    time.sleep(self.runecrafters_delay)

                    self.silver_fed()
                    time.sleep(self.silver_fed_delay)

                    if j % self.stacks_before_extra_processes == 0:
                        self.deposit_materials()
                        time.sleep(self.deposit_materials_delay)

                        self.compact_inventory()
                        time.sleep(self.compact_inventory_delay)

                        self.move_luck()
                        time.sleep(self.move_luck_delay)

                        self.move_materials()
                        time.sleep(self.move_materials_delay)

                        self.move_remainder()
                        time.sleep(self.move_remainder_delay)

                    j += 1
                
                self.refill_shared_inventory()
                time.sleep(self.refill_shared_inventory_delay)

                self.check_for_gear_in_inventory()
                time.sleep(self.check_for_gear_in_inventory_delay)
            
                i += 1

    def set_output_text(self, text):
        self.a.output_text.configure(state="normal")
        self.a.output_text.insert("0.0", "\n\n")
        self.now = datetime.now().strftime("%H:%M")
        self.a.output_text.insert("0.0", f"{self.now}: {text}")
        self.a.output_text.configure(state="disabled")

    def get_inventory_coordinates(self):
        inventory_xy = imagesearch("Assets/Images/Inventory.PNG")
        if inventory_xy != -1:
            self.inventory_x = inventory_xy[0]
            self.inventory_y = inventory_xy[1]
        else:
            self.set_output_text("Your inventory could not be located")

    def calculate_inventory_width(self):
        inventory_end_xy = imagesearch("Assets/Images/InventoryEnd.PNG")
        if inventory_end_xy != -1:
            self.inventory_end_x = inventory_end_xy[0]

            self.inventory_width = (self.inventory_end_x + self.inventory_width_offset) - self.inventory_x 
        else:
            self.set_output_text("Your inventory cog on the right side could not be found")

    def get_bank_coordinates(self):
        bank_xy = imagesearch("Assets/Images/Bank.PNG")
        if bank_xy[0] != -1:
            self.bank_x = bank_xy[0]
            self.bank_y = bank_xy[1]
        else:
            self.set_output_text("Your bank could not be located")

    def get_static_coordinates(self):
        try:
            self.copper_fed_xy = imagesearcharea("Assets/Images/CopperFed.PNG", self.inventory_x, self.inventory_y, 
                                                 self.inventory_end_x + self.inventory_width_offset,
                                                 self.inventory_y + self.shared_inventory_height)
    
            self.runecrafters_xy = imagesearcharea("Assets/Images/Runecrafters.PNG", self.inventory_x, self.inventory_y, 
                                                   self.inventory_end_x + self.inventory_width_offset,
                                                   self.inventory_y + self.shared_inventory_height)

            self.silver_fed_xy = imagesearcharea("Assets/Images/SilverFed.PNG", self.inventory_x, self.inventory_y, 
                                                 self.inventory_end_x + self.inventory_width_offset,
                                                 self.inventory_y + self.shared_inventory_height)

            self.deposit_materials_xy = imagesearcharea("Assets/Images/DepositMaterials.PNG", self.inventory_x, 
                                                        self.inventory_y, 
                                                        self.inventory_end_x + self.inventory_width_offset,
                                                        self.inventory_y + self.shared_inventory_height)

            self.compact_inventory_xy = imagesearch("Assets/Images/CompactInventory.PNG", self.inventory_x, self.inventory_y, 
                                                    self.inventory_end_x + self.inventory_width_offset,
                                                    self.inventory_y + self.shared_inventory_height)                                            

        except Exception:
            self.set_output_text(f"{self.copper_fed_xy[0]}, {self.runecrafters_xy[0]}, {self.silver_fed_xy[0]}" +
                                 f"{self.deposit_materials_xy[0]}, {self.compact_inventory_xy[0]}")
        
    
    def open_gear(self):
        # Only want to search the shared inventory for gear
        # The search area below is the width of the inventory and the height of the top of the inventory to the bottom
        # of the shared inventory
        gear_xy = imagesearcharea("Assets/Images/Gear.PNG", self.inventory_x, self.inventory_y, 
                                  self.inventory_end_x + self.inventory_width_offset, 
                                  self.inventory_y + self.shared_inventory_height)

        if gear_xy != -1:
            pyautogui.click(self.gear_xy[0] + self.gear_offset_x, self.gear_xy[1] + self.gear_offset_y, clicks=500, 
                            interval=0)
        else:
            self.set_output_text("A stack of gear was not found")

    def check_for_gear_in_inventory(self):
        pass

    def copper_fed(self):
        pyautogui.click(self.copper_fed_xy[0] + self.copper_fed_offset_x, self.copper_fed_xy[1] + 
                        self.copper_fed_offset_y, button="right")
        pyautogui.moveRel(47, 30)
        pyautogui.click()
        pydirectinput.press("enter")
        pyautogui.moveTo(900, 1)  # move the cursor out of the way

    def runecrafters(self):
        pyautogui.click(self.runecrafters_xy[0] + self.runecraftes_offset_x, self.runecrafters_xy[1] + 
                         self.runecrafters_offset_y, button="right")
        pyautogui.moveRel(47, 52)
        pyautogui.click()
        pydirectinput.press("enter")
        pyautogui.moveTo(900, 1)

    def silver_fed(self):
        pyautogui.click(self.silver_fed_xy[0] + self.silver_fed_offset_x, self.silver_fed_xy[1] + 
                         self.silver_fed_offset_y, button="right")
        pyautogui.moveRel(47, 75)
        pyautogui.click()
        pydirectinput.press("enter")
        pyautogui.moveTo(900, 1)                 

    def deposit_materials(self):
        pyautogui.click(self.deposit_materials_xy[0] + self.deposit_materials_offset_x, self.deposit_materials_xy[1] + 
                        self.deposit_materials_offset_y, button="left")
        

    def compact_inventory(self):
        pyautogui.click(self.compact_inventory_xy[0] + self.compact_inventory_offset_x, self.compact_inventory_xy[1] + 
                        self.compact_inventory_offset_y, button="left")

    def move_luck(self):
        pass

    def move_materials(self):
        pass

    def move_remainder(self):
        pass

    def refill_shared_inventory(self):
        pass
