some items on properties panel – do what?

January 21, 2013 at 6:25 am
msepsis

I’m curious, what precisely do the following properties do:

Modulator does not react to value changes
Velocity mode
Keyboard trigger – velocity mode
Send MIDI from other members of the group
What’s the source type of the modulation

SWB
        
‘send midi from other members of the group’, see this reply of atom: property ‘Send MIDI from other members of the group’. 

	atom: This property is used for RADIO GROUPS (you can set a radio group for buttons of any type). The property tells ctrlr to send 	(or not) midi messages assosiated with all radio group members when one of the group changes.

dasfaker

From memory…

Modulator does not react to value changes: If you set this modulator value from LUA (maybe from a midi messgae, too), the modulator will not change it’s value.

Velocity Mode: If you activate it, the movements you make with the mouse on this modulator respond to the velocity of the mouse 	movement. (If you drag slow, the modulator almost don’t change it’s value, but with a rapid mouse dragging the modulator moves normally).

I don’t know about the others.
    

atom

Source type of modulation, refers to linking modulators, it defines the type of source, text/numeric. Numeric can affect values, text can affect contents of other modulators.
    

msepsis  

Is there any way to set modulators so they DO change values, but DO NOT send out their assigned message type when their value is changed by a lua script– and they do send their assigned value when the user rotates/slides/clicks the modulator?

SWB

@msepsis: I assume you solved this “problem”, but for other forum members with the same problem I will post (what I think is) the solution: setting the right parameters for the setModulatorValue statement. (Of course you have to use Lua.)

The Ctrlr source tells me:

setModulatorValue(const int newValue, bool vst, bool midi, bool ui)

Setting the value for ‘midi’ to false did the trick for me. I assume setting the value for ‘vst’ to false means also not sending the value to vst. The meaning of  the value for ‘ui’ is not clear for me, I saw no change in behavior.

Dunbar

I would like to turn a slider that outputs note on messages, with each slider value corresponding to a different note on the keyboard. So, when a panel is in VST mode, for example, the on screen knob will sweep across the notes of a keyboard when it is turned (all 128 of them). 

Atom

You could do that in Lua by using this single line of code (you need to attach a new method to the slider on the event “Called when the modulator value changed”), this will send a Midi message of type NoteOn with the pitch set as the value of the slider and velocity set to 01.

panel:sendMidi (CtrlrMidiMessage ({0x90, value, 0x01}),0)

BUT, it should also be possible when using the SysEx type and just typing in the message as

90 xx 01

and that should generate a series of NoteOn messages with velocity 01 and the pitch beeing the value of the slider, but there seems to be a bug where a SysEx formula needs to start with “f0” and this might be an issue within the JUCE Library i use. I promise to have a deeper look at that amd report back.

I just thought of another way without lua, you can add a MidiKeyboardComponent to the panel “Misc->uiMidiKeyboard” and link your slider to that. The procedure is dumb and i need to fix it but it will work:

– add a slider
– add a MidiKeyboard component and name it something like “midiKeyboard”
– select the slider
– set the property “If linked to a modulator property, witch modulator” to the name of the kyeboard component you created (midiKeyboard)
– select View->Refresh property lists
– re-select the slider
– set the property “Modulator linked to modulator property” to “modulatorValue”

that should be it, now your slider controls the MidiKeyboard and the value of the slider will cause the MidiKeyboard to trigger a sequence of NoteOn/NoteOff messages witht the pitch indicated by the slider. You can hide your MidiKeyboarad off screen if you like.


