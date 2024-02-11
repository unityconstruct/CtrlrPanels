Lua: how do I get current MIDI Outout channel? (april 2020)

autodafe


I am writing and reading patch data from a file. so far so good.
I need to send a MIDI CC message to my synth, but I need to send it to the currenlty selected MIDI Channel on ouput.
How do I get access to MIDI out channel ? (teh one selected in MIDI->Outout->Channel) ???


proton

Simple LUA script where you check for those parameters in question, create 2 variables and assing the resulting values to them like so:

outDevice = panel:getProperty(“panelMidiOutputDevice”)
outChannel = panel:getProperty(“panelMidiOutputChannelDevice”)

console(“currentOutDevice = “..outDevice)
console(“currentOutChannel = “..outChannel)

if you use console to see what the results are you should see something like this:

LUA>> currentOutDevice = YAMAHA-CS80-OUT
LUA>> currentOutChannel = 1

