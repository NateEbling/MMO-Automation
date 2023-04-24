import customtkinter as ctk
import tkinter as tk
from PIL import Image

import random
from datetime import datetime

import Scripts.process as process


class App(ctk.CTk):

    RESOLUTION_X = 400
    RESOLUTION_Y = 500

    total_gear = 0
    shared_inventory_slots = 0

    is_running = False

    messages = ["Message 1",
                "Message 2"
                ]

    def __init__(self):
        super().__init__()

        self.title("GW2 Automatic Processing")
        self.geometry(f"{self.RESOLUTION_X}x{self.RESOLUTION_Y}")
        self.resizable(False, False)
        self.iconbitmap("Assets/Images/Moon.ico")

        self.background_image = ctk.CTkImage(Image.open("Assets/Images/background.jpg"), size=(self.RESOLUTION_X, 
                                                                                            self.RESOLUTION_Y))
        # The image is added as a label
        self.background = ctk.CTkLabel(self, image=self.background_image, text="")
        self.background.place(x=0, y=0)

        # Add window components
        # Entries
        self.gear_entry = ctk.CTkEntry(self, width=150, placeholder_text="Gear")
        self.gear_entry.place(x=10, y=10)

        self.shared_inventory_slots_entry = ctk.CTkEntry(self, width=150, placeholder_text="Shared Inventory Slots")
        self.shared_inventory_slots_entry.place(x=10, y=45)

        # Buttons
        self.go_button = ctk.CTkButton(self, text="Go!", width=70, text_color="#36c95e", command=self.start)
        self.go_button.place(x=10, y=80)

        self.stop_button = ctk.CTkButton(self, text="Stop!", width=70, text_color="red", command=self.stop)
        self.stop_button.place(x=85, y=80)
        self.stop_button.configure(state="disabled")

        # Text areas
        self.output_text = ctk.CTkTextbox(self, width=150, height=85)
        self.output_text.place(x=230, y=10)
        self.output_text.configure(state="disabled", wrap="word")

        self.message = ctk.CTkTextbox(self, width=375, height=15, font=ctk.CTkFont(size=12))
        self.message.place(x=10, y=465)
        self.set_message()
        self.message.configure(state="disabled")
        

    def start(self):
        # Check to make sure the input values are valid (integers)
        try: 
            self.total_gear = int(self.gear_entry.get())
            self.shared_inventory_slots = int(self.shared_inventory_slots_entry.get())
        except ValueError:
            self.set_output_text("Invalid input, please enter new values for gear and shared inventory slots")
            return

        if self.shared_inventory_slots % 2 != 0:
            self.set_output_text("Invalid number of shared inventory slots, please pick something divisible by 2")
            return

        # Clear the entry boxes and disable them
        self.gear_entry.delete(0, tk.END)
        self.gear_entry.configure(state="disabled")

        self.shared_inventory_slots_entry.delete(0, tk.END)
        self.shared_inventory_slots_entry.configure(state="disabled")

        # Configure the buttons
        self.go_button.configure(state="disabled")
        self.stop_button.configure(state="normal")

        self.is_running = True
        self.run()

    def stop(self):
        # Make the buttons active
        self.go_button.configure(state="normal")
        self.stop_button.configure(state="disabled")

        # Make the input boxes active and display the placeholder text
        self.gear_entry.configure(state="normal")
        self.shared_inventory_slots_entry.configure(state="normal")

        self.is_running = False

    def set_output_text(self, text):
        self.output_text.configure(state="normal")
        self.output_text.insert("0.0", "\n\n")
        self.now = datetime.now().strftime("%H:%M")
        self.output_text.insert("0.0", f"{self.now}: {text}")
        self.output_text.configure(state="disabled")
        
    def set_message(self):
        self.message.insert("0.0", random.choice(self.messages))

    def run(self):
        self.set_output_text(f"Queuing process with {self.total_gear} gear and {self.shared_inventory_slots} shared \
                             inventory slots!")
        process_ = process.Process(self, self.total_gear, self.shared_inventory_slots)

if __name__ == "__main__":
    app = App()
    app.mainloop()