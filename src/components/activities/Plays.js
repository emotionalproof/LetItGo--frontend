import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import SoundfontPlayer from 'soundfont-player';
import 'react-piano/dist/styles.css';
import { Dimensions } from 'react-dimensions';
import SoundfontProvider from '../../SoundfontProvider';

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
      const instruments = ["acoustic_grand_piano", "clavinet", "seashore", "violin", "breathe", "soundscape", "atmosphere"]
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
    let selectedInstrument = this.state.selectedInstrument
    if (selectedInstrument === "acoustic_grand_piano") {
      return "acoustic_grand_piano"
    } else if (selectedInstrument === "clavinet") {
      return "clavinet"
    } else if (selectedInstrument === "violin") {
      return "violin"
    } else if (selectedInstrument === "seashore") {
      return "seashore"
    } else if (selectedInstrument === "breathe") {
      return "breath_noise"
    } else if (selectedInstrument === "soundscape") {
      return "fx_2_soundtrack"
    } else if (selectedInstrument === "atmosphere") {
      return "fx_4_atmosphere"
    } else {
      return "acoustic_grand_piano"
    }
  }
  
  render() {
    // console.log(this.state)
    return (
      <>
       {/* <DimensionsProvider>
        {({ containerWidth, containerHeight }) => ( */}
          <SoundfontProvider
            instrumentName={this.pickInstrument()}
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({ isLoading, playNote, stopNote }) => (
              <Piano
                noteRange={noteRange}
                // width={containerWidth}
                playNote={playNote}
                stopNote={stopNote}
                disabled={isLoading}
                keyboardShortcuts={keyboardShortcuts}
              />
            )}
          />
        )}
        <h1 className="play-title">Play</h1>
       {/* </DimensionsProvider> */}
       {this.renderInstrumentDropdown()}
    </>
       
      );
   }
 }

export default PlayPiano;
