import './App.css';
import React, { useState, useEffect } from 'react';
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

function generate(gridFull, rows, cols) {
  let g = gridFull;
  let g2 = arrayClone(gridFull);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let count = 0;
      if (i > 0) if (g[i - 1][j]) count++;
      if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
      if (i > 0 && j < cols - 1) if (g[i - 1][j + 1]) count++;
      if (j < cols - 1) if (g[i][j + 1]) count++;
      if (j > 0) if (g[i][j - 1]) count++;
      if (i < rows - 1) if (g[i + 1][j]) count++;
      if (i < rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
      if (i < rows - 1 && j < cols - 1) if (g[i + 1][j + 1]) count++;
      if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
      if (!g[i][j] && count === 3) g2[i][j] = true;
    }
  }
  return g2
}



function App() {
  const [speed, setSpeed] = useState(100);
  const [rows, setRows] = useState(30);
  const [cols, setCols] = useState(50);
  const [intervalId, setIntervalId] = useState(100)
  const [Generation, setGeneration] = useState(0);
  const [GridFull, setGridFull] = useState(
    Array(rows).fill().map(() => Array(cols).fill(false)))
  const gridUpdate = (rows, cols) => {
    setGridFull(Array(rows).fill().map(() => Array(cols).fill(false)))
  }

  //console.log(GridFull)

  const selectBox = (row, col) => {
    let gridCopy = arrayClone(GridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    setGridFull(
      gridCopy
    );
  }


  const handlePlayButton = () => {
    clearInterval(intervalId);
    var newIntervalId = setInterval(play, speed);
    setIntervalId(newIntervalId)
    //console.log("playbutton");
  }
  const handlePauseButton = () => {
    clearInterval(intervalId);
    //console.log("pausebutton");
  }
  const handleSlowButton = () => {
    clearInterval(intervalId);
    setSpeed(1000);
    //console.log("slowbutton")
  }
  const handleFastButton = () => {
    clearInterval(intervalId);
    setSpeed(100);
    //handlePlayButton();
    //console.log("fastbutton")
  }
  const handleClearButton = () => {
    console.log("clearbutton")
  }
  const handleSeedButton = () => {
    let gridCopy = arrayClone(GridFull);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    setGridFull(
      gridCopy
    );
    //console.log("seedbutton")
  }
  const handleGridSizeSelect = (size) => {
    switch (size) {
      case "1":
        setCols(20);
        setRows(10);
        gridUpdate(10, 20);
        break;
      case "2":
        setCols(50);
        setRows(30);
        gridUpdate(30, 50);
        break;
      case "3":
        setCols(70);
        setRows(50);
        gridUpdate(50, 70);
        break;
    }
    //this.clear();
  }


  var play = () => {

    setGridFull(
      (lastGridFull) => generate(lastGridFull, rows, cols)
    );
    setGeneration(
      (lastGeneration) => lastGeneration + 1
    );

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
      <h2>Generations:{Generation}</h2>
    </div>
  );
}

function arrayClone(GridFull) {
  return [...GridFull];
}


export default App;
