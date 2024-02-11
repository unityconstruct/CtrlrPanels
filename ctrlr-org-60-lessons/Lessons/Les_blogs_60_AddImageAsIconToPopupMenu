damiensellier 2 juni 2021

Hello everybody,

I tried to add images from the ressources as icon to pimp up my PopupMenu but I cannot figure how to call the resource from the method:

Here is a random item from my menu without defining the icon:

Algo1UnitRamUserPreset:addItem(1000, "Retrieve User Presets...", true, false, Image())

From the JUCE documentation:

std::unique_ptr<Drawable> PopupMenu::Item::image
A drawable to use as an icon, or nullptr if there isn't one. 

I tried :

MenuUpdateIconSRC = resources:getResource("Update-Icon")
MenuUpdateIcon = Image()
MenuUpdateIcon = MenuUpdateIconSRC:asImage()

I probably miss something about defining the size and position of the icon with:

drawImageAt(MenuUpdateIcon,w/2-(MenuUpdateIcon:getWidth()/2),h/2-(MenuUpdateIcon:getHeight()/2),false)

The item from my menu with the icon definition:

Algo1UnitRamUserPreset:addItem(1000, "Retrieve User Presets...", true, false, MenuUpdateIcon)

or

Algo2UnitRamUserPreset:addItem(1000, "Retrieve User Presets...", true, false, Image(MenuUpdateIcon))

But I cannot get it work this way.

Is there someone who already achieved adding icons to menus?

Thanks for your help

Damien


dnaldoog

Something like this? Does it work?

   
     local im =Image(resources:getResourceAsImage("myImage"))
     Algo1UnitRamUserPreset:addItem(1000, "Retrieve User Presets...", true, false, im)

Popup with Image_1_0_Hell-O-Kitty_2021-06-02_15-08.zip

It looks like the image can be scaled down, but not greater then the line height of the popup.

local scale=10
local im =Image(resources:getResourceAsImage("myImage")):rescaled(scale,scale,Graphics.highResamplingQuality)

     Algo1UnitRamUserPreset:addItem(1000, "Retrieve User Presets...", true, false, im)



damiensellier

Hi John,
Thanks for the help. It works perfectly !
Yes you are right about the scaling of the icon so the best way to achieve a "good quality" is to provide a H10px x W09px image from scratch.
This is a very nice feature. Thank you so much ;)
