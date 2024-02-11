DnaldeT 28 februari 2021


Inside a custom component, I can differentiate the left and mouse buttons by doing: event.mods:isLeftButtonDown() and event.mods:isRightButtonDown() respectively in the mouseDown method.

In the "drag" method, I can use event:getDistanceFromDragStartX(). But it seems to fire at both mouse buttons. Even when I use an if/ else statement to get the left or right mouse button, it still seems to pass on the distance to another method regardless of which button is pressed.

So, the question is, is there a way to differentiate the drag distance of the left mouse button from the right mouse button?


dobo365

Hi @DnaldeT!
strange you cannot make the diff between left and right in the Drag method... It should work as in the mouseDown method.
If you don't find the issue, one way could be to set a flag bLeft=true/false in the onMouseDown then use that flag in the Drag method then reset the flag in onMouseUp method.
Definitively not clean but I guess it should work.
If you are looking for a way to simulate the turn of a mod when moving the mouse up/down (as on normal RotaryVerticalDrag) then I'm interested because when putting a custom component on top of uiImageSliders prevents reaching those and so it is needed to handle that in the custom component.
This is on my table to be looked at. Maybe that just a movetoback /movetofront or using layers may do the trick. Maybe there is a way to make a custom component transparent to mouse clicks at some moments. I dont know.


dnaldoog

Hi @dobo365 I was mucking around with something like that a while back. I was testing SVG images in a uiComponent and made a button. To rotate it using a mouse wheel I just put a uiImageImageSlider filled with a transparent png above it!

SVGUISLIDERclass_1_0_Hell-O-Kitty_2021-02-28_21-21_1.zip


DnaldeT

Without having the chance to look at the code: Do you use the invisible uiImageSlider to control the SVG underneath?


dnaldoog

Yes, the callback attached to the invisible uiSlider just does a repaint on the component!


dobo365

So in my case, I would have my actual uiImageSlider at bottom, my uiCustomComponent above it and then another transparent uiImageSlider on top. This transparent uiImageSlider would then call the OnModulatorValueChange of the underlying actual uiImageSlider.
Great idea! Will try it.
My other idea was to implement some handling in the uiCustomComponent. I have already done it for buttons (I create zones corresponding to the buttons so I know which button should change) but for uiSlider it is more tricky due to the mouse drag feeling.

I have now tried the transparent uiImageSlider on top of the uiCustomComponent which is on top of the actual uiImageSlider and it works great!!!
Thanks a lot @dnaldoog !!!

Dnaldoog

@DnaldeT and I discovered that you can also create a Slider() object through LookAndFeel that can be triggered by uiSlider, but maybe this is a hack? Next step is to find out how to create Slider() within uiComponent that doesn't need the external uiSlider. I am sure it will be possible. That would mean we could create custom vector Sliders, within uiComponent. Probably easy for someone who knows how to do this, but to me it's pretty confusing right now.


DnaldeT

I put my thinking cap on and I don't think it's a hack. L&F is applied to "all" modulators. Since we "override" the L&F in the customComponent for the uiSlider, it gets applied to "all" sliders. But I'm still going over the process of why we don't see the uiSlider in the customComponent without L&F.

But we have a nicely rotating png in the uiCustomComponent now, without applying L&F. Wouldn't the process for importing an SVG and do the AffineTransform be the same?

dnaldoog

This is how I did it. I use lua to detect whether right or left button clicked and then plot the x,y separately. Maybe there's a better way?

In this panel x,y coordinates are limited to the comp:getHeight() and comp:getWidth() with my new friend jlimit()!

Tedjuh distance travelled_1_1_1_2021-02-28_21-38.zip

constructor = function()
    myMeta={
        leftDragDistance = 0,
        rightDragDistance = 0,
        leftDragDistance = 0,
        rightDragDistance = 0,
        left={enterX = 0,enterY = 0,leaveX = 0,leaveY = 0},
        right={enterX = 0,enterY = 0,leaveX = 0,leaveY = 0},
		--engagedButton="left"
    }
    coords = setmetatable({},{__index=myMeta})
end

mouseDown = function(--[[ CtrlrComponent --]] comp --[[ MouseEvent --]], event)
    if event.mods:isLeftButtonDown() then
        coords.left.enterX = jlimit(0, comp:getWidth(), event.x)
        coords.left.enterY = jlimit(0, comp:getHeight(), event.y)
    end
    if event.mods:isRightButtonDown() then
        coords.right.enterX = jlimit(0, comp:getWidth(), event.x)
        coords.right.enterY = jlimit(0, comp:getHeight(), event.y)
    end
end

mouseUp = function(--[[ CtrlrComponent --]] comp --[[ MouseEvent --]], event)
    if event.mods:isLeftButtonDown() then
        coords.left.leaveX = jlimit(0, comp:getWidth(), event.x)
        coords.left.leaveY = jlimit(0, comp:getHeight(), event.y)
    end
    if event.mods:isRightButtonDown() then
        coords.right.leaveX = jlimit(0, comp:getWidth(), event.x)
        coords.right.leaveY = jlimit(0, comp:getHeight(), event.y)
    end
    panel:getComponent("myComp"):repaint()
end

mouseDrag = function(--[[ CtrlrComponent --]] comp --[[ MouseEvent --]], event)
    if event.mods:isLeftButtonDown() then
        coords.leftDragDistance = event:getDistanceFromDragStartX()
        panel:getLabel("d"):setText("Left drag distance = " .. event:getDistanceFromDragStartX())
    end
    if event.mods:isRightButtonDown() then
        coords.rightDragDistance = event:getDistanceFromDragStartX()
        panel:getLabel("d"):setText("Right drag distance = " .. event:getDistanceFromDragStartX())
    end
end

myPaint = function(--[[ CtrlrComponent --]] comp --[[ CtrlrComponent --]], g)
    if blockFunction then
        return
    end
    g:fillAll(Colour(0xff99ccff))

    local leftColour = 0xff0000ff 
    local rightColour = 0xffff0000

    g:setColour(Colour(leftColour))
    myLineL = Line(coords.left.enterX, coords.left.enterY, coords.left.leaveX, coords.left.leaveY)
    g:drawLine(myLineL, 2)

    g:setColour(Colour(rightColour))
    myLineR = Line(coords.right.enterX, coords.right.enterY, coords.right.leaveX, coords.right.leaveY)
    g:drawLine(myLineR, 2)

end


dobo365

Just for my info, what do you want to achieve?
For the distance stuff, I would just store the starting point X and Y, whatever right or left then use drag to calculate the distance from that point and as distance calc is piece of cake, just do the calc yourself between the start point and the current event.x, event.y position that you get in mouseDrag.
Use right/left click detection in onMouseDown to set the color
So, much less code than what you did and same code for both right and left.
If you want to keep previous lines then you need to store their start and end X,Y + color in a table then draw that table separately in your Paint method.
With a button you could set to draw existing stuff or not.

Dnaldoog

@dobo365 Is this a comment on my code?

What you are saying sounds exactly like what I did?

Setting some type of global variable on mouseDown to determine whether the right button or left button was clicked and then passing this variable to each subsequent mouse function so we can know where to store the mouseUp mouseDrag values in a table (memory) (either left/right coordinates) is admittedly a better idea. (See below)

Here is better code, agreed somewhat ' less code', but I was rather offering a strategy than a fully considered optimized solution :)

constructor = function()
    myMeta={
        leftDragDistance = 0,
        drag={left = 0,right = 0},
        left={enterX = 0,enterY = 0,leaveX = 0,leaveY = 0},
        right={enterX = 0,enterY = 0,leaveX = 0,leaveY = 0},
		engagedButton="left"
    }
    coords = setmetatable({},{__index=myMeta})
end

mouseDown = function(--[[ CtrlrComponent --]] comp --[[ MouseEvent --]], event)
    if event.mods:isLeftButtonDown() then coords.engagedButton="left" else coords.engagedButton="right" end
        coords[coords.engagedButton].enterX = jlimit(0, comp:getWidth(), event.x)
        coords[coords.engagedButton].enterY = jlimit(0, comp:getHeight(), event.y)
end
-----------------------

mouseDrag = function(--[[ CtrlrComponent --]] comp --[[ MouseEvent --]], event)
		coords.drag[coords.engagedButton]= event:getDistanceFromDragStartX()
        panel:getLabel("d"):setText(string.format("tdrag distance = %s",coords.drag[coords.engagedButton]))
end

---------------------

mouseUp = function(--[[ CtrlrComponent --]] comp --[[ MouseEvent --]], event)
        coords[coords.engagedButton].leaveX = jlimit(0, comp:getWidth(), event.x)
        coords[coords.engagedButton].leaveY = jlimit(0, comp:getHeight(), event.y)
    	panel:getComponent("myComp"):repaint()
end

myPaint = function(--[[ CtrlrComponent --]] comp --[[ CtrlrComponent --]], g)
    if blockFunction then
        return
    end
    g:fillAll(Colour(0xff99ccff))

    local leftColour = 0xff0000ff -- set default to left color
    local rightColour = 0xffff0000

    g:setColour(Colour(leftColour))
    myLineL = Line(coords.left.enterX, coords.left.enterY, coords.left.leaveX, coords.left.leaveY)
    g:drawLine(myLineL, 2)

    g:setColour(Colour(rightColour))
    myLineR = Line(coords.right.enterX, coords.right.enterY, coords.right.leaveX, coords.right.leaveY)
    g:drawLine(myLineR, 2)
end

Tedjuh distance travelled_1_2_2_2021-03-01_13-14.zip

DnaldeT

Lots to go through, thank you all for the valuable input. But first to answer some questions:

What am I trying to achieve? A slider consisting of 2 arcs (or pie segments?). The inner arc is the value to control the modulator. The outer arc is to set a minimum or maximum for the inner arc. I got a "sort of" working example but it takes the arcs themselves as mouse focus.

To calculate which arc I'm on I do: (cX and cY are centre of X/Y of the component)
distX = event.x - cX
distY = event.y - cY
distMC = math.sqrt((distXdistX)+(distYdistY))

That results in:   DnaldT_2arcsSlider.png

So, dragging the red arc controls the red arc (yes, really), and dragging the blue arc on the left or right side controls the start or end angle of the blue arc. But this was all done with the left mouse button and the way Goodweather describes it.

F.y.i.
blueMouseDown is passed on from the mouseDown script.
custBlueDragX = event.x on the mouseDrag Script.
/ 482 is to get a value from 0 - 1 because the radians is calculated from 3.84 startAngle to 8.74 endAngle.

totalBlueDragX = (blueMouseDown +(custBlueDragX - blueMouseDown)) - blueMouseDown) / 482 -- to get a value of 0 to whatever.
seems a bit unnecessary when you got event:getDistanceFromStartX().

But the way of handling the start/ end angle of the blue arc gets harder when the slider is quite small. So I figured, why not throw the right-mouse button in the mix to control the blue arc?. Easily said, not so easily done. Because in some way, the drag script sends a value on either mouse button no matter how many true or false statements I throw at it from the MouseDown script to prevent the left-mouse from sending a value when dragging the right-mouse button.

I even already wrote a mouseDrag method almost exactly the same as yours, Dnaldoog. But the red arc still changes value when dragging the arc. And that is weird because all properties of the red or blue arc are defined in redSomething/ blueSomething. So I really don't get where the red arc gets the value from when dragging the blue arc.

And to my knowledge, MouseUp comes "after" the drag. So shouldn't matter, right? "confused look".

See example panel.

test1.zip


dobo365

OK!
I will look at your panel later.
Did you try to make it "speak"? Add console outputs to your variables to see their values in the Drag method.
Did you also try to use booleans to activate blue/red behavior?

    In onMouseDown, you check red or blue area and activate a boolean
    The boolean is used in onMouseDrag to move the slider and calls the Repaint method repeatedly to repaint the pie
    the boolean is reset when you perform a onMouseUp which is obliged to happen


DnaldeT

I use a lot of console messages to see what's happening in the code. But I delete or out-comment them when a function or mathematical problem behaves like it's supposed to. Those console messages can slow down CTRLR tremendously. Especially with a drag function when a console command gets fired every 10ms or something.

In the drag function of the test1 panel I sent in the last message, there is a "leftButtonDown" and "rightButtonDown" console message. The function acts as it should. But when you add console("tRDX = "..tRDX) after the "rightButtonDown", it still reports a value of 0.00419377593361, which it shouldn't.

Investigating the values of tRDX on the blue arc (or right mouse button that shouldn't be sent) further: It seems it's taking the last increment or decrement of the left mouse button as tRDX.

Example1 : when dragging the red arc with the left mouse button from 0 - 127 and then use the right mouse button, it results in a value of around 1.0.

Example2: when dragging the red arc with the left mouse button from let's say 63 to 64, tRDX returns 0.0083 on the right mouse button.

Oh wait, I think I have an idea what's going on. On mouseDrag, the rAnDec and rAn in the custComp method are being calculated/ fired no matter which left or mouse button I use. That's resulting in weird behaviour. Those are outside any if/else statements.

tries to find the nearest wall to bang his head at..

Ok, one problem down, lots to go. First I have to rewrite the drag script with the rAn and rAnDec calculations included in the if/ else statements and see how that works out.


Godlike-Productions

I'm following this with great interest. I'll need to do this very soon, and I've been running over in my head how to do it.
I've never used a custom component before. Has anyone got any info on how to get into them?


dnaldoog

@Godlike-Productions A uiComponent has parameters comp and g.

comp is the uiComponent itself, much like mod in value change callbacks functions, so you can get information like comp:getHeight() and comp:getWidth().

g is the JUCE graphics class, so you can do things like g:drawLine(0,comp:getWidth()) (pseudo code!).

The component needs to be repainted; for example if you had uiSlider, you could set a value that will be picked up by the uiComponent.

At the end of the uiSlider function, you would run panel:getComponent("nameofuiComponent):repaint().

In the uiComponent() you could do panel:getModulatorByName("uiSliderName"):getModulatorValue() and do stuff.

You can also send mouse event information to the uiComponent. The code above gives you an idea or look at the uiComponents in my JD-990 panel.



DnaldeT

The custom component is a very powerful tool. But you start with a blank canvas and it's up to you to come up with all the code for painting, mouseclicks and so on. Therefore it has quite a steep learning curve but once you get the hang of it, its possibilities are endless.

dobo365

@DnaldeT I had some fun with your challenge and I built it "my way" but re-using some stuff from you.
test1 goodweather.zip

Please look at the methods under the group "goodweather"
As you will see, they are much more simplified than yours.
The only thing to improve is to avoid the drawing without the highlighted circle after a click. To be honest I didn't look for this and it must be some stupid thing I didn't pay attention to.
After some reflection, I think that your code is not recognizing left and right because you are using the event of the Drag method which is may be different than the one of the Mouse down method. But I'm unsure.
Also, the Paint method, is painting the whole component each time so you don't need all the "if...then".

Please have a look at my code and re-use!

@Godlike-Productions : study my code and the uiCustomComponent I attached the 4 methods to.
So:

    the Paint method is called at each mouse movement or action. Thus a lot of times! It redraws the complete component
    OnMouseDown: use this one to identify where the user clicked in your component and set some variables that you will use in the Paint method
    OnMouseDrag: use this one if you plan to do something while dragging. Otherwise not needed
    OnMouseUp: not needed in this example but you may need that one to reset some variables after a drag or ...
    OnMouseMove: I would say that this one is mandatory to always register the current position of the mouse

As @dnaldoog mentioned, look at the Graphics class in Juce to learn about drawing line, pies (this example), using the path object...
Start simple then imagine something and have fun coding, debugging and progressing :-)

DnaldeT

Thank you for looking into it. Interesting how you do the ModOnMouseDown/ Drag script. You can see I do kind of the same thing in the "dropped code" to calculate in which circle you click. But, as I said earlier in this thread, I stepped away from clicking the blue or right angle to control it. Because, while it works ok with a modulator of 300x300 in size, it gets harder to control the blue angle the smaller it gets.

The only thing to improve is to avoid the drawing without the highlighted circle after a click. To be honest I didn't look for this and it must be some stupid thing I didn't pay attention to.

I resolved that by putting the values of the start/ end angle in a memoryBlock. It avoids the disappearing angle and takes the right angles instead of jumping to the x-mouseDown value. Most noticeable with the Red Angle. If you drag your slider, the Red Angle jumps to the value of the mouseDown. Mine takes the value from the memoryBlock and starts dragging from the right value instead of doing the "sudden" jump.

My code "is" recognizing left from right mouse button and dragging though. In the picture you'll see "Red click, Red Drag, Blue Left Half Click, Blue Drag, Blue Right Half Click, Blue Drag.
mouseclicksanddrags

I guess you are right about the "if.. then" statements. And yes I tend to overcomplicate things. Bad habit :).


dobo365

I forgot to mention that all the manipulation is done only with the left mouse click.
Clicking anywhere in red gets red movement; in blue right gets right angle movement and blue left gets left angle change.
But you have probably seen that.

Thx for the explanation about the memoryblock, I didn't understand why you were doing that.
In fact you can just keep the value in a global variable as well.
But that will only work with one mod and I guess you are using a memoryblock to save many modulators in the future, right?

In a different area, I'm doing the same but with a table containing tables.
Each row in the main table contains a table with several elements: the mod variable for direct access, some label, center x, center Y, diameter. You can just add current red angle, current left angle, current right angle and you are done.

This, in the philosophy of having 30 mods at different places in your panel.
The next question will be: would you use 30 separate custom components OR one custom component containing 30 drawings?
I took the last one but I have now issue to reach the underlying mods that are under the custom component (my question above in beginning of this thread - will try layers).
About resolution, I don't see the point, the resolution is at pixel level. I guess that the smallest usable circle would be around 15 in diameter. Then it is only a matter to click anywhere in the correct zone.
You can give a bit more freedom by increasing the blue areas by taking a rectangle (minus the red part) instead of the arc.

Have a good continuation!



DnaldeT

The "Clicking in the correct Zone" is indeed the problem with using small diameters. Just try a component size of 50x50 and you'll see that the mouse-handling is easier by using left/ right Mouse Button than trying to click a very small blue angle.

I use MemoryBlock over a table because the "Byte" value is what needs to be sent to the Synth anyway. But yes, tables would work as well. I was a little bit afraid of getting too many global variables so I kept them in a MemoryBlock instead of being a global value.

The Idea is to create a uiImageSlider, with this behaviour, that mimics and looks like the slider of my panel. Then only a few sliders will use this method, or make it an option to set them to a custom component with this behavior. So yes, it's going to be custom components on itself, not one custom component with lots of sliders.

In a convo with Dnaldoog he showed me I could write my own classes. Maybe I can write my own class and create sliders that way without all the code that is needed now for every custom component. I don't know, this CTRLR thing can go deep, way deep.

But first make it work, then on to the next step.

DnaldeT

Probably not the right way to do it, too much code and the code could be easier but for now the mouse-handling of the component and how the component deals with the drawing part is "almost" spot-on.

Left Mouse Button controls the Red Angle. Right Mouse Button controls the Blue Angle, Click and Drag on the Left Half controls StartAngle, Click and Drag on the Right Half controls EndAngle.

Now on to setting the "min-max" angles of the red Angle to the Blue Angle at mouseUp.


dnaldoog

The code's got me bamboozled and I haven't looked deeply yet at it all, but this panel seems to work very well! Well done all!


DnaldeT

I'll take that as a compliment because I learned a lot going over your panels and the solutions you bring to problems that I encounter in my own panels. We both know going over someone else's code is difficult, but your panels make me wish I didn't drop out of High School or at least paid some attention during the computing/ programming lessons back in the days.

But to make reading the code somewhat easier. It's all basically the Juce Slider class recreated with the Graphics class inside a custom component. It's probably a totally unnecessary "exercise" in how to use the uiCustomComponent because, looking at the Juce demo, a Slider of which its start/ end Angle can be set manually already exists but isn't implemented in Ctrlr, yet. Well, not entirely true. My example is a rotary slider whereas Juce only provides ThreeValueHorizontal or ThreeValueVertical.

The next step, after I get to set the Start/ EndAngle of the Red Circle to be set to the Min/ Max Value of the Blue Circle, will be importing a picture for the Knob. (I saw in one of your panels how to get it from the resources.) Then to make it work as a "rotatable" sliderKnob which is probably done with "affineTransform".

Ok, going over the panel that you posted in this topic, it is indeed done with affineTransform. But the zipfile is missing from the panel you posted. It results in an error message but that's no big deal. I can import my own. And if you ask me, affineTransform is a better way to handle the movement of the knob than a filmstrip to keep the filesize down.


dobo365

By reading your reply I had some doubts...
In fact setting the start angle/value is standard; just set the Minimum value to a different value bigger than 0
Setting the end angle with max value is not possible because it is always the...max value.
Now, why not simply adding in the OnChange method a control of the value of the mod and prevent it to go below/above some values? So, add 2 sliders, one to set a min value, the other to set the max one. Use them for all mods.
Once you click on a mod, the min and max sliders are indicating the min and max values that you can adjust.
Then the OnChange method of the mod is controlling you are not going below or above those values.
Of course, less visual, but probably easier... (and we wouldn't have got your challenge ;-) )


DnaldeT

I like the way you think. The "two sliders" method crossed my mind, for sure. But I wanted the "blue angle" anyway to give a direct readout of a modulator's min/ max settings. One thing lead to another and here I am now.

I think I decided against the "two slider" method because of the "long distance" mouse movements I had to make with a panel that is almost full screen at 1080p. I even considered just adding 2 increment/ decrement buttons inside the component.

But yes, the "two slider" method is a lot less hassle. But what's the fun in that ;-).
