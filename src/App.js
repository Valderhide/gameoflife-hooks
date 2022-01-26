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
    clearInterval(intervalId);
    var intervalId = setInterval(play, speed);
    //console.log("playbutton");
  }
  const handlePauseButton = (intervalId) => {
    clearInterval(intervalId);
    //console.log("pausebutton");
  }
  const handleSlowButton = (setSpeed, handlePlayButton) => {
    setSpeed(100);
    //handlePlayButton();
    //console.log("slowbutton")
  }
  const handleFastButton = (setSpeed, handlePlayButton) => {
    setSpeed(1000);
    //handlePlayButton();
    //console.log("fastbutton")
  }
  const handleClearButton = () => {
    console.log("clearbutton")
  }
  const handleSeedButton = () => {
    console.log("seedbutton")
  }
  const handleGridSizeSelect = (size) => {
    switch (size) {
      case "1":
        setCols(20);
        setRows(10);
        break;
      case "2":
        setCols(50);
        setRows(30);
        break;
      case"3":
        setCols(70);
        setRows(50);
        break;
    }
    //this.clear();
  
    console.log("gridSizeselect", size)
  }


  var play = (gridFull) => {
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

function arrayClone({GridFull}) {
  return JSON.parse(JSON.stringify({GridFull }));
}


export default App;
