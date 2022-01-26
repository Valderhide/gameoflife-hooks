import './App.css';
import React, { useState } from 'react';
import { ButtonToolbar, DropdownButton, Dropdown, Button } from 'react-bootstrap';

function Box(props) {
  let selectBox = () => {
    props.selectBox(props.row, props.col);
  }

  return (
    <div
      className={props.boxClass}
      id={props.id}
      onClick={selectBox}
    />
  )
}

function Grid({ cols, rows, gridFull, selectBox }) {
  const width = (cols * 14);
  var rowsArr = [];

  var boxClass = "";
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      let boxId = i + "_" + j;

      boxClass = gridFull[i][j] ? "box on" : "box off";
      rowsArr.push(
        <Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={i}
          col={j}
          selectBox={selectBox}
        />
      );
    }
  }
  return (
    <div className="grid" style={{ width: width }}>
      {rowsArr}
    </div>
  )

}

function Buttons({ playButton, pauseButton, clear, slow, fast, seed, gridSize }) {
  return (
    <div className="center">
      <ButtonToolbar>
        <Button variant="primary" onClick={playButton}>
          Play
        </Button>
        <Button variant="primary" onClick={pauseButton}>
          Pause
        </Button>
        <Button variant="primary" onClick={clear}>
          Clear
        </Button>
        <Button variant="primary" onClick={slow}>
          Slow
        </Button>
        <Button variant="primary" onClick={fast}>
          Fast
        </Button>
        <Button variant="primary" onClick={seed}>
          Seed
        </Button>
        <DropdownButton
          title="Grid Size"
          id="size-menu"
          onSelect={gridSize}
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
  const [speed, setSpeed] = useState(100);
  const [rows, setRows] = useState(30);
  const [cols, setCols] = useState(50);

  const [Generation, setGeneration] = useState(0);
  const [GridFull, setGridFull] = useState(
    Array(rows).fill().map(() => Array(cols).fill(false)))


  selectBox = (row, col, gridFull) => {
    let gridCopy = arrayClone(gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    });
  }


  const handlePlayButton = () => {
    console.log("playbutton")
  }
  const handlePauseButton = () => {
    console.log("pausebutton")
  }
  const handleSlowButton = () => {
    console.log("slowbutton")
  }
  const handleFastButton = () => {
    console.log("fastbutton")
  }
  const handleClearButton = () => {
    console.log("clearbutton")
  }
  const handleSeedButton = () => {
    console.log("seedbutton")
  }
  const handleGridSizeSelect = (item) => {
    console.log("gridSizeselect", item)
  }



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
      <Grid
        gridFull={GridFull}
        rows={rows}
        cols={cols}
        selectBox={selectBox}>
      </Grid>
    </div>
  );
}

function arrayClone({ GridFull }) {
  return JSON.parse(JSON.stringify({ GridFull }));
}


export default App;
