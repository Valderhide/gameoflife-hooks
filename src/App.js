import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { ButtonToolbar, DropdownButton, Dropdown, Button } from 'react-bootstrap';

function Box (props){
  let selectBox = () => {
    props.selectBox(props.row, props.col);
  }

  return(
    <div
        className={props.boxClass}
        id={props.id}
        onClick={selectBox}
      />
  )
}

function Grid(props){
  const width = (props.Cols * 14);
    var rowsArr = [];

    var boxClass = "";
    for (var i = 0; i < props.Rows; i++) {
      for (var j = 0; j < props.Cols; j++) {
        let boxId = i + "_" + j;

        boxClass = props.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }
  return(
    <div className="grid" style={{ width: width }}>
        {rowsArr}
      </div>
  )

}

function Buttons(props) {
  return (
    <div className="center">
      <ButtonToolbar>
        <Button variant="primary" onClick={props.playButton}>
          Play
        </Button>
        <Button variant="primary" onClick={props.pauseButton}>
          Pause
        </Button>
        <Button variant="primary" onClick={props.clear}>
          Clear
        </Button>
        <Button variant="primary" onClick={props.slow}>
          Slow
        </Button>
        <Button variant="primary" onClick={props.fast}>
          Fast
        </Button>
        <Button variant="primary" onClick={props.seed}>
          Seed
        </Button>
        <DropdownButton
          title="Grid Size"
          id="size-menu"
          onSelect={props.gridSize}
        >
          <Dropdown.Item eventKey="1">20x10</Dropdown.Item>
          <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
          <Dropdown.Item eventKey="3">70x50</Dropdown.Item>
        </DropdownButton>
      </ButtonToolbar>
    </div>
  )

}

function App(selectBox) {
  var Speed = 100;
  var Rows = 30;
  var Cols = 50;

  const [Generation, setGeneration] = useState(0);
  const [GridFull, setGridFull] = useState(
    Array(Rows).fill().map(() => Array(Cols).fill(false)))



  const handlePlayButton = () => {
    console.log("playbutton")
  }
  const handlePauseButton = () => console.log("pausebutton")
  const handleSlowButton = () => console.log("slowbutton")
  const handleFastButton = () => console.log("fastbutton")
  const handleClearButton = () => console.log("clearbutton")
  const handleSeedButton = () => console.log("seedbutton")
  const handleGridSizeSelect = (item) => console.log("gridSizeselect", item)
  return (
    <div className="App">
      <Buttons
        playButton={handlePlayButton}
        pauseButton={handlePauseButton}
        slow={handleSlowButton}
        fast={handleFastButton}
        clear={handleClearButton}
        seed={handleSeedButton}
        gridSize={handleGridSizeSelect}
      />
<Grid>
          gridFull={GridFull}
          rows={Rows}
          cols={Cols}
          selectBox={selectBox}
          </Grid>
    </div>
  );
}

export default App;
