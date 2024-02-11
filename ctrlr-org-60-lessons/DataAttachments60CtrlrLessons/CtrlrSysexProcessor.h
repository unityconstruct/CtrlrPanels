#ifndef __CTRLR_SYSEX_PROCESSOR__
#define __CTRLR_SYSEX_PROCESSOR__

#include "CtrlrSysexToken.h"

class CtrlrManager;
class CtrlrMidiMessage;
class MidiMessageEx;
class CtrlrPanel;

//==============================================================================
/** A processor class that deals with SysEx messages. Each panel gets it's own 
	instance, and all sysex messages received and sent from the panel go through
	this processor.

*/
class CtrlrSysexProcessor : public Expression::Scope
{
	public:
		/** @brief Creates the processor with a owning panel

		*/
		CtrlrSysexProcessor(CtrlrPanel *_owner);

		/** @brief Creates the processor without an owner, used for normal MIDI messages not assosiated with a panel

		*/
		CtrlrSysexProcessor();

		/** @brief Destructor

		*/
		~CtrlrSysexProcessor();

		String getScopeUID() const;
		Expression getSymbolValue (const String& symbol) const;
		double evaluateFunction (const String& functionName, const double* parameters, int numParameters) const;
		void setValue (const int newValue);
		Array <int,CriticalSection> &getGlobalVariables();

		/** @brief Creates a MidiMessageEx instance from a string describing it, assignes the value and channel
					according to the describing string

					@param	formula	String formula that represents the new MidiMessageEx
					@param	value	Numeric value to assign to the new MidiMessageEx
					@param	channel MIDI Channel to assign to the new MidiMessageEx
					@return	a new MidiMessageEx
		*/
		static const MidiMessageEx sysexMessageFromString (const String &formula, const int value, const int channel);

		/** @brief Parses a string representing a SysEx message and breaks it up into usable tokens

					@param	formula	String formula that represents the SysEx 
					@return	An array of tokens found in the formula
		*/
		static const Array<CtrlrSysexToken> sysExToTokenArray (const String &formula);

		/** @brief Identifies a single token based on it's string representation (usualy within the formula string)

					@param	tokenString	a string that represents a SysEx token
					@return	a value of CtrlrSysExFormulaToken type
		*/
		static const CtrlrSysExFormulaToken sysExIdentifyToken(const String &tokenString);

		/** @brief Parses a string that represents a SysEx formula and assignes the resulting data
					to a CtrlrMidiMessage. This method is here to make the CtrlrMidiMessage class smaller.

					@param	message			A reference to a CtrlrMidiMessage instance to modify
					@param	formulaString	String that represents the SysEx formula
		*/
		void setSysExFormula(CtrlrMidiMessage &message, const String &formulaString);

		/** @brief Parses a string that represents a multi MIDI message and assigns the resulting data
					to a CtrlrMidiMessage. This method is here to make the CtrlrMidiMessage class smaller.

					@param	message			A reference to a CtrlrMidiMessage instance to modify
					@param	savedState		String that represents the Multi Message state
		*/
		void setMultiMessageFromString(CtrlrMidiMessage &message, const String &savedState);

		/** @brief Once all the tokens other then checksum token are processed, the actual checksums can be
					calculated and assigned. This has to happen after all the data operation to get accurate results

					@param	tokens			Checksum tokens
					@param	midiMessage		The midi message to modify
		*/
		void sysexProcessChecksums(const Array<CtrlrSysexToken> &tokens, MidiMessage &midiMessage);

		/** @brief Process a single token in a SysEx message

					@param	token			The token to process
					@param	byte			A poitner to the data to process
					@param	value			A value that should be used for any calculations assosiated with modulator values
					@param	channel			The MIDI channel that should be used
		*/
		void sysExProcessToken (const CtrlrSysexToken token, uint8 *byte, const int value, const int channel);

		/** @brief Process all tokens in a midi message

					@param	tokens			An array of tokens to process
					@param	byte			A reference to a MidiMessage that should be modified
					@param	value			A value that should be used for any calculations assosiated with modulator values
					@param	channel			The MIDI channel that should be used
		*/
		void sysExProcess (const Array<CtrlrSysexToken> &tokens, MidiMessage &m, const int value, const int channel);

		/** @brief A tricky function. Tries to determine a value carried by a SysEx MidiMessage. This is a dumb function
					but it really can't get any smarted. It sums up all the possible variables, processing them accrording
					to the formula

		*/
		const int getValueFromSysExData (const Array<CtrlrSysexToken> &tokens, const MidiMessageEx &message);

		/** @brief This methods prepares templates for Multi Messages

					@return	A StringArray with all the remplate names
		*/
		const StringArray templatesPrepare();

		/** @brief Calculates a checksum for a MidiMessage using the JP8080 algorithm

					@param	token	The token witch represents the checksum
					@param	message	The MidiMessage to modify
		*/
		void checksumRolandJp8080(const CtrlrSysexToken token, MidiMessage &m);

		/** @brief Calculates a bytes value for a token that should represent a split value, using the JP8080 algorithm

					@param	value	The numeric value to split
					@param	byteNum	Witch byte of the split numeric value to calculate
					@return	the calculated byte
		*/
		const uint8 getRolandSplit (const int value, const int byteNum);
		
		/** @brief Calculates a checksum for Waldorf RackAttack (and possibly other)

		*/
		void checksumWaldorfRackAttack(const CtrlrSysexToken token, MidiMessage &m);

		JUCE_LEAK_DETECTOR(CtrlrSysexProcessor)

	private:
		CtrlrPanel *owner;
		Array <int,CriticalSection> unknownGlobalVariables;
};

#endif