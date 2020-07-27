import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import SoundfontPlayer from 'soundfont-player';
import 'react-piano/dist/styles.css';
import SoundfontProvider from '../src/SoundfontProvider';
import DimensionsProvider from '../src/DimensionsProvider';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const noteRange = {
  first: MidiNumbers.fromNote('c3'),
  last: MidiNumbers.fromNote('f4'),
};

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});



class PlayPiano extends Component {

  state ={
    selectedInstrument: null
  }

  componentDidMount() {
    this.setState({
      selectedInstrument: "acoustic_grand_piano"
    })
  }

  
  renderInstrumentDropdown = () => {
    return <select value={this.state.selectedInstrument} onChange={event=>this.handleInstrumentSelect(event)}>
            <option value="1" disabled>Pick Your Sound</option>
           {this.createInstrumentOptions()}
           </select>
  }

  createInstrumentOptions = () => {
      const instruments = ["acoustic_grand_piano", "clavinet"]
      let instrumentArray = instruments.map((instrument, index) => <option key={index}>{instrument}</option>
      )
      return instrumentArray
                        
  }
  
  handleInstrumentSelect = event => {
    this.setState({
      selectedInstrument: event.target.value
    })
  }
  
  pickInstrument() {
    if (this.state.selectedInstrument === "acoustic_grand_piano") {
      return "acoustic_grand_piano"
    } else if (this.state.selectedInstrument === "clavinet") {
      return "clavinet"
    } else {
      return "acoustic_grand_piano"
    }
  }
  
  render() {
    // console.log(this.state)
    return (
      <>
       <DimensionsProvider>
        {({ containerWidth, containerHeight }) => (
          <SoundfontProvider
            instrumentName={this.pickInstrument()}
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({ isLoading, playNote, stopNote }) => (
              <Piano
                noteRange={noteRange}
                width={containerWidth}
                playNote={playNote}
                stopNote={stopNote}
                disabled={isLoading}
                keyboardShortcuts={keyboardShortcuts}
              />
            )}
          />
        )}
       </DimensionsProvider>
       {this.renderInstrumentDropdown()}
    </>
       
      );
   }
 }

export default PlayPiano;
