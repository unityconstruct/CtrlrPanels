Damien (april 2020)


 I had to organise my GUI with several layers, one with the graphic (backgroun image) with deeper index and the one upppon the other (dynamic label).

It’s like using z-index in CSS.

First create a new layer in the Ctrlr Layer editor : Panel > Layer Editor.

Save then, you open your file with a text editor.

Check the “iPanelCanvasLayerUid” values of your different layers. They show up early (around line 150) in the “uiPanelEditor” tag.

<uiPanelCanvasLayer uiPanelCanvasLayerName="LayerAlwaysBehind" uiPanelCanvasLayerUid="LayerUid0"
uiPanelCanvasLayerColour="0x000000" uiPanelCanvasLayerVisibility="1" uiPanelCanvasLayerIndex="0"/>
<uiPanelCanvasLayer uiPanelCanvasLayerName="LayerOnTopOfTheOther" uiPanelCanvasLayerUid="LayerUid1" uiPanelCanvasLayerColour="0x000000" uiPanelCanvasLayerVisibility="1" uiPanelCanvasLayerIndex="1"/>

Then for the modulator you want to be always on top (visible)
Replace the following value of your component :

componentLayerUid="LayerOnTopOfTheOther" uiType=""/>

cheers

---------------------------------
atom (august 2013)



You can use the property, or you can just set the visibility flag directly

c = panel:getModulatorByName("blah"):getComponent()
c:setVisible (true) -- visible
c:setVisible (false) -- invisible


aurIcle

Well I’m stuck. I can’t get it to work – I must be missing something. Would someone please take a look and tell me where I’m going wrong?

There are three layers. The Base layer which is static and two other layers which should be switched depending on whether ID 1 or 2 is selected (ID 0 should switch them both off). The combo box with the script is called Osc1Mode.

Any help would be great.



atom



I fixed it for you, you had some type-os and most important stuff, if you rename your modulators (and you did rename the combo that switches the layers) you need to remember that in the code, if you reference something by name

panel:getCombo(NAME)

the NAME is the actual name of the combo you want to fetch
Attachments:

    Solaris_2.panel

-------------------------


Dnaldoog (october 2019)



Hi Arcangeli – I think your script must work (??), but it could get complicated if you have to change other elements like buttons and labels and even layout to tie in with each ‘engine’ setting, so I would recommend possibly designing your panel using layers.
To create a new layer go:
MENU (Panel -> Layer Editor -> Edit -> Add Layer)

Please see attached panel 🙂


changeLayer = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)
if value == 0 then
 showLayer("PULSE") 
 elseif value == 1 then
showLayer("FM")
 elseif value == 2 then
showLayer("WAVE")
 else 
showLayer("NOISE")
end
end

showLayer=function(LAYER)
for k in pairs(layers) do
panel:getCanvas():getLayerByName(k):setVisible(false)
end -- loop
panel:getCanvas():getLayerByName(LAYER):setVisible(true)
end --function

layers={PULSE=true,FM=true,WAVE=true,NOISE=true}

    This reply was modified 10 months, 1 week ago by dnaldoogdnaldoog.

Attachments:

    LAYERS_EXAMPLE_1_0_Hell-O-Kitty_2019-10-08_09-06.panel

------------------------

dasfaker (february 2013)


    Bomma72 wrote:

    I am trying to have a separate control change images on the panel. My question is what is the best way to do this? Do I have to use layers or can I just use a property on the image control and change this property from the code behind?

If you want to change the image of a uiImage component just use
panel:getModulatorByName(“your uiImage modulator”):getComponent():setPropertyString(“uiImageResource”,”the new image you want to put”)



-------------------------
