Dnaldoog August 2020




This code seems to work!


paintc = function(--[[ CtrlrComponent --]] comp --[[ CtrlrComponent --]], g)
    local x, y, w, h = 20, 30, comp:getWidth(), comp:getHeight()
    backdrop = 0xff99ccff
    g:fillAll(Colour(backdrop))
    g:setColour(Colour(0xff000000))
    for i = 1, 512 do
        _G["block" .. i] = Rectangle()
    end

    g:setColour(Colour(0xff000000))

    block502:setBounds(x + 20, y + 20, (w / 2) + 20, (h / 2) + 20)
    g:setColour(Colour(0xffffff00))
    g:fillRect(block502)

    block500:setBounds(x, y, w / 2, h / 2)
    g:setColour(Colour(0xff000000))
    g:drawRect(block500, 2.5)

    block501:setBounds(x + 10, y + 10, (w / 2) + 10, (h / 2) + 10)
    g:setColour(Colour(0xff000000))
    g:drawRect(block501, 2.5)

end

example of fillRect and drawRect generated from lua loop

Attachments:
generate512Rectangles_1_0_0_2020-08-22_19-05.bpanelz




Hi Tedjuh!

_G["block" ..i]:setBounds() would work as long as you have already declared an object `_G[“block” ..i]:Rectangle(). so I guess they could be included in the same loop:


paintc = function(--[[ CtrlrComponent --]] comp --[[ CtrlrComponent --]], g)
    local x, y, w, h = 20, 30, comp:getWidth(), comp:getHeight()
    backdrop = 0xff99ccff
    g:fillAll(Colour(backdrop))
    g:setColour(Colour(0xff000000))
    for i = 1, 512 do
_G["block" .. i] = Rectangle()
_G["block"..i]:setBounds(x,y,w,h)
    end

    g:setColour(Colour(0xff000000))

   -- block502:setBounds(x + 20, y + 20, (w / 2) + 20, (h / 2) + 20)
    g:setColour(Colour(0xffffff00))
    g:fillRect(block502)

   -- block500:setBounds(x, y, w / 2, h / 2)
    g:setColour(Colour(0xff000000))
    g:drawRect(block500, 2.5)

   -- block501:setBounds(x + 10, y + 10, (w / 2) + 10, (h / 2) + 10)
    g:setColour(Colour(0xff000000))
    g:drawRect(block501, 2.5)

end

You could then dynamically change the x,y positioning within the loop

Regards,

John


Possemo

Why not generate the renctangles on the fly according to the mouse position? You have to query the mouse position anyway, don’t you? Instead of selecting a predefined rectangle when a mouse x and y is within a specific range, just draw the rectangle. You will have to calculate x and y – well I don’t know but I guess there must be an elegant way to do this. Hmm, ok when I look at your pictures you probably want to be able to shift the rectangles when you move to higher or lower note range… and you will have to be able to clear them when you click an already drawn rectangle again.. quite some coding work. Well yes, maybe it is easier to predefine all rectangles. It will be interesting to see if this works.

Dnaldoog



Hi Tedjuh,

I got to thinking that Possemo’s suggestion of on the fly mouse creation was excellent.

You can avoid those cumbersome loops and probably super complex code.

Here is a panel that creates a `fillRect’ on the grid where the mouse was clicked. Instead of generating vertical and horizontal lines, you could have a mock png image in a different layer as backdrop.

You would then have to move the image according to your scrolling modulator or alternatively redraw the graphics lines in the component and offset the mouseclick y coordinate. It’s probably not too difficult finding the new coordinates that way although I haven’t got that far yet.

Here is the code. ※ Variables mpX and mpY are mouseUp coordinates. (see below)


paintMe2 = function(--[[ CtrlrComponent --]] comp --[[ CtrlrComponent --]], g)
    g:setColour(Colour(0xff000000))
    local height = comp:getHeight()
    local width = comp:getWidth()
    local x, y = 0, 0
    local wDiv = width / 32
    local hDiv = height / 16
    --************************************
    --draw surrounding area
    g:drawVerticalLine(width - 1, 0, height)
    g:drawVerticalLine(0, 0, height)
    g:drawHorizontalLine(0, 0, width)
    g:drawHorizontalLine(height - 1, 0, width)
    -- end draw surrounding area
    --************************************
    local verticalCoords = {0}
    local horizontalCoords = {0}

    for i = 1, 32 do
        g:drawVerticalLine(wDiv * i, 0, height)
        table.insert(verticalCoords, (wDiv * i))
    end -- loop 32 horizontal

    for i = 1, 16 do
        g:drawHorizontalLine(hDiv * i, 0, width)
        table.insert(horizontalCoords, (hDiv * i))
    end -- loop 32 horizontal

    for j = 1, #verticalCoords do
        if verticalCoords[j] > mpX then
            x = verticalCoords[j - 1]
            break
        end
    end

    for j = 1, #horizontalCoords do
        if horizontalCoords[j] > mpY  then
            y = horizontalCoords[j - 1]
            break
        end
    end

    local rec = Rectangle(x, y, wDiv, hDiv)
    g:setColour(Colour(0xff0000ff))
    g:fillRect(rec)
end -- function

Other functions:


mouseUp = function(--[[ CtrlrComponent --]] comp, --[[ MouseEvent --]] event)
repaint_component()
end

mouseMove = function(--[[ CtrlrComponent --]] comp, --[[ MouseEvent --]] event)
	mpX = event.x
	mpY = event.y
end

repaint_component = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)
panel:getComponent("c"):repaint()
end

This code must be lean, because when doing debug prints of the tables to console(), it doesn’t slow down the program much!

    This reply was modified 2 days, 21 hours ago by dnaldoogdnaldoog. Reason: fixed missing [i]

Attachments:

    RECT_16x32_1_0_0_2020-08-23_18-39.bpanelz


