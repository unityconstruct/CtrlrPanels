#ifndef __CTRLR_MIDI_MESSAGE__
#define __CTRLR_MIDI_MESSAGE__

#include "CtrlrLuaMemoryBlock.h"
#include "CtrlrLuaObject.h"
#include "CtrlrMacros.h"
#include "MidiMessageEx.h"

class CtrlrLuaObjectWrapper;

static const uint8 MidiStartStatus		= 0xFA;
static const uint8 MidiStopStatus		= 0xFC;
static const uint8 MidiTickStatus		= 0xF9;
static const uint8 MidiContinueStatus	= 0xFB;
static const uint8 MidiSysexData[]		= {0xF0, 00, 0xF7 };

enum CtrlrMidiMessageType
{
	CC,
	Aftertouch,
	ChannelPressure,
	NoteOn,
	NoteOff,
	SysEx,
	Multi,
	ProgramChange,
	PitchWheel,
	None,
	kMidiMessageType,
};

class TimestampComparator
{
	public:
		int compareElements (MidiMessageEx first, MidiMessageEx second)
		{
			return (first.m.getTimeStamp() < second.m.getTimeStamp()) ? -1 : ((second.m.getTimeStamp() < first.m.getTimeStamp()) ? 1 : 0);
		}
};
//==============================================================================
/** @brief Class that represents a MIDI message

*/
class CtrlrMidiMessage : public ValueTree::Listener, public CtrlrLuaObject
{
	public:
		CtrlrMidiMessage();
		CtrlrMidiMessage (const MidiMessage& other);
		CtrlrMidiMessage (MemoryBlock& other);
		CtrlrMidiMessage (const String& hexData);
		CtrlrMidiMessage (const std::string &hexData);
		CtrlrMidiMessage (const CtrlrLuaObjectWrapper& other);
		CtrlrMidiMessage (CtrlrLuaMemoryBlock& other);
		CtrlrMidiMessage (const luabind::object &hexData);

		virtual ~CtrlrMidiMessage();
		const String toString() const;

		const CtrlrMidiMessageType getMidiMessageType() const;
		virtual void setMidiMessageType (const CtrlrMidiMessageType newType);
				
		void copyFrom (CtrlrMidiMessage &other);

		/** @brief Set the number of the MIDI message

			@param number	 the number to set
		*/
		virtual void setNumber(const int number);

		/** @brief Get the number of the MIDI message

			@return the number of the MIDI message
		*/
		int getNumber() const;
		
		/** @brief Set the value of the MIDI message

			@param value	 the value to set
		*/
		void setValue (const int value);

		/** @brief Get the value of the MIDI message

			@return the value of the MIDI Message
		*/
		int getValue();

		/** @brief Set the MIDI channel of the message

			@param midiChannel	 the MIDI channel to set
		*/
		void setChannel(const int midiChannel);

		/** @brief Get the MIDI channel of the message

			@return the MIDI channel of this message
		*/
		int getChannel() const ;

		/** @brief Get the number of MIDI messages that make this one

			@return the number of sub-MIDI messages inside this one
		*/
		int getNumMessages() const																		{ return (messageArray.size()); }
		const MidiMessageEx &getMidiMessageEx(const int index) const									{ return (messageArray.getReference(index)); }

		/** @brief Set the SysEx formula for this MIDI message

			@param	formula	the new formula to set
		*/
		void setSysExFormula (const String &formula);
		void restoreState (const ValueTree &stateTree);
		ValueTree &getMidiTree()																		{ return (midiTree); }

		void setProperty (const Identifier& name, const var &newValue, const bool isUndoable=false)		{ midiTree.setProperty (name, newValue, 0); }
		const var &getProperty (const Identifier& name) const											{ return midiTree.getProperty (name); }
		const var getProperty (const Identifier& name, const var &defaultReturnValue) const				{ return midiTree.getProperty (name, defaultReturnValue); }
		virtual void valueTreePropertyChanged (ValueTree &treeWhosePropertyHasChanged, const Identifier &property);
		void valueTreeChildrenChanged (ValueTree &treeWhoseChildHasChanged){}
		void valueTreeParentChanged (ValueTree &treeWhoseParentHasChanged){}
		void valueTreeChildAdded (ValueTree& parentTree, ValueTree& childWhichHasBeenAdded){}
		void valueTreeChildRemoved (ValueTree& parentTree, ValueTree& childWhichHasBeenRemoved){}
		void valueTreeChildOrderChanged (ValueTree& parentTreeWhoseChildrenHaveMoved){}
		void setNumberToSingle (const int index, const int number);
		void setValueToSingle (const int index, const int value);
		void setNumberToMulti (const int number);
		void setValueToMulti (const int value);
		void setMultiMessageFromString (const String &savedState);
		void addMidiMessage (const MidiMessage &message);
		void sortMidiArray() { messageArray.sort(timestampComparator); }
		MidiBuffer getMidiBuffer(const int startSample=1);
		void clear();
		virtual void patternChanged();
		void memoryMerge (const CtrlrMidiMessage &otherMessage);
		const MemoryBlock &getMidiPattern()	const;
		const MemoryBlock getData() const;
		const int getSize() const;
		const CtrlrLuaMemoryBlock getLuaData() const;
		const std::string toLuaString() const;
		MidiMessageEx &getReference(const int messageIndex) const;
		static void wrapForLua (lua_State *L);
		void fillMessageProperties();
		Array <MidiMessageEx> &getMidiMessageArray();
		virtual const Array<int,CriticalSection> &getGlobalVariables()													
		{
			return (emptyGlobals); 
		}

		virtual CtrlrSysexProcessor &getSysexProcessor();
		ValueTree &getObjectTree() { return (midiTree); }

		JUCE_LEAK_DETECTOR(CtrlrMidiMessage)

	protected:
		ValueTree midiTree;
		Array <MidiMessageEx> messageArray;

	private:
		Array<int,CriticalSection> emptyGlobals;
		StringPairArray multiTemplates;
		CtrlrMidiMessageType messageType;
		String messageTypeFromTemplate;
		String sysExFormula;
		int multiMasterValue, multiMasterNumber;
		MidiBuffer midiBuffer;
		MemoryBlock messagePattern;
		TimestampComparator timestampComparator;
};

#endif