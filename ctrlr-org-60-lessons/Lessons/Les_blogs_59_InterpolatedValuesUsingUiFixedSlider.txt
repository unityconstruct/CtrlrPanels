thestudiohades  7 juni 021

Hi all,
I'm trying to design my first Vst interface for a little hardware synth i have, but i'm facing an issue regarding the modulator configuration when using uiImageSlider.

My synth have many parameters with exotic min and max values (ie. -25 to +25, -24 to +12, 0 to 255, etc.) this values are displayed on the Synth screen and all needs a 0 to 127 variation to be able to display correctly that full range whatever the min and max values are (ie. 0=0 to 127=255, 0=-24 to 127=+12, 0=-25 to 127=+25) .

The problem is that i want to use a display on the interface (uiLCDLabel) to display the modulator name and its value. That works well with the function name displayed and the value of the modulator as well but between 0 and 127 (the value sent to the synth). The question is how to get the value as shown on the synth display (ie. -24 to +12 or others) ? It is working well for an example i found with values between -63 and +63 by setting uiSliderMin to -63, uiSliderMax to 63 and modulatorvalue+64 because the total range is 128 but i'm unable to do the same with other mix max intervals.

Did i missed a point or is this impossible without using Lua code ? If so, how to do it ?

Any help is welcome...

Eric



dnaldoog

Does this example panel answer the question? It uses uiFixedSlider to display an interpolated value to screen while sending CC 0-127.

If you need help with the formula I can post the lua code for how to do this. I worked it out on Repl.it and could either share the page or give you the code to do yourself! You wouldn't need to use that lua code in your panel (although I do); just use it to calculate the interpolated values, which you would then paste into the uiFixedSlider Slider Contents field

See attached panel!

Interpolate using uiFixedSlider_0_0.zip


thestudiohades

Hi John, Thanks for your fast reply !

Yes it seem to do the job ;)

I will have a look on how it works and adapt it to my other values.

By the way, what %x means... I have never seen it before, I have already found %n, %v, %h and %s. Thinking there is maybe more but didn't find any list for that with the explanation for each, do you have something about that ?

I will be happy to get the code or the link to the page. If needed, I will use the code, i'm trying to do the all interface just using Ctrlr without using Lua ( for now at least, all I have dones work with simple functions...)

Thanks and regard

Eric

Hi Eric!

%x prints the sysex/cc message. I think that's about it.

I am at work now and thought the repli.it would have saved. Maybe I wasn't logged in, but will post when I get home. It's basically a class I wrote so you don't need to waft through the code so much.

You will create a new object say:

local x=Interpolate:new(value,1,1,-25,25)

The first argument is the modulator value:

    panel:getModulatorByName("mymod"):getValue()
    use math.floor()=1 math ceil()=0 to round down or up
    multiply result by 1 (in this case) : sometimes 0.10 for fractional values
    minimum value -25
    maximum value +25

and you can see the interpolated result using x:print()

so if you put the class though a loop, you can work out your values needed for uiFixedSlider.

for i=0,127 do
x=Interpolate:new(i,1,1,-25,25)
console(tostring(x:print())
end

Something like that!

Will post the actual code later! :)

Here is a panel that should do what you need. Was churned out in a hurry - let me know if it works. Not fully tested.

bivg

Button Interpolate Value Generator_1_0_0_2021-06-08_23-02.zip


thestudiohades


Hello John,

Thanks again, yes it works perfectly and match with the values on the synth
;)

I face now another issue that is how to use a display and make it only
display the values from a one and only modulator (by now it display any
modulators i tweak ?

Right now I'm looking for a PDF tutorial about Ctrlr, i read on a forum
that there is one made by  Goodweather... and for some solution on the
forums ;)

Cordialy,

Eric


Dnaldoog

Hi Eric!

It gets much more complex now as I see it, because you need lua, but have a look at the source code for this panel I attach and you will see how it is done (one way). The way I wrote it allows you to easily add controls or remove controls that will print to the LCDpanel by adding to a table t{} in the callback function.

Regards,

John

This is the function that runs when the value is changed
callback

uncheck (interpolate.png)
uncheckthis (interpolate02.png)

Interpolate using uiFixedSlider LUA_0_0_2021-06-10_07-34.zip

