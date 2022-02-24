import './App.css';
import React, { useState } from 'react';
import { ButtonToolbar, DropdownButton, Dropdown, Button } from 'react-bootstrap';

function Box({ row, col, boxClass, id }) {
  const selectBox = () => {
    var stop = 0
    if(stop = 1){return}
    selectBox(row, col);
    var stop = 0
  }

  return (
    <div
      className={boxClass}
      id={id}
      onClick={selectBox}
    />
  )
}

function Grid({ cols, rows, gridFull, selectBox }) {
  const width = (cols * 14);
  const rowsArr = [];

  let boxClass = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
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

function SimulationControl({ onPlayClick, onPauseClick, onClearClick, onSlowClick, onFastClick, onSeedClick, ongridSizeClick }) {
  return (
    <div className="center">
      <ButtonToolbar>
        <Button variant="primary" onClick={onPlayClick}>
          Play
        </Button>
        <Button variant="primary" onClick={onPauseClick}>
          Pause
        </Button>
        <Button variant="primary" onClick={onClearClick}>
          Clear
        </Button>
        <Button variant="primary" onClick={onSlowClick}>
          Slow
        </Button>
        <Button variant="primary" onClick={onFastClick}>
          Fast
        </Button>
        <Button variant="primary" onClick={onSeedClick}>
          Seed
        </Button>
        <DropdownButton
          title="Grid Size"
          id="size-menu"
          onSelect={ongridSizeClick}
        >
          <Dropdown.Item eventKey="1">20x10</Dropdown.Item>
          <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
          <Dropdown.Item eventKey="3">70x50</Dropdown.Item>
        </DropdownButton>
      </ButtonToolbar>
    </div>
  )

}

const makeGrid = (rows, cols, fillValue) => Array(rows).fill().map(() => Array(cols).fill(fillValue))

function generate(gridFull, rows, cols) {
  let g = gridFull;
  let g2 = [...gridFull];

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
  const [generation, setGeneration] = useState(0);

  const [gridFull, setGridFull] = useState(
    makeGrid(rows, cols, false))

  const gridUpdate = (rows, cols) => {
    setRows(rows);
    setCols(cols);
    setGridFull(makeGrid(rows, cols, false))
  }

  const selectBox = (row, col) => {
    let gridCopy = [...gridFull];
    gridCopy[row][col] = !gridCopy[row][col];
    setGridFull(
      gridCopy
    );
  }

  const handlePlayButton = () => {
    clearInterval(intervalId);
    startSim(speed);
  }

  const startSim = (newSpeed) => {
    const newIntervalId = setInterval(simulation, newSpeed);
    setIntervalId(newIntervalId)
    setSpeed(newSpeed);
  }

  const simulation = () => {
    setGridFull(
      (lastgridFull) => generate(lastgridFull, rows, cols)
    );
    setGeneration(
      (lastGeneration) => lastGeneration + 1
    );
  }

  const handlePauseButton = () => {
    clearInterval(intervalId);
  }

  const handleSlowButton = () => {
    clearInterval(intervalId);
    startSim(1000);
  }

  const handleFastButton = () => {
    clearInterval(intervalId);
    startSim(100);
  }

  const handleClearButton = () => {
    clearInterval(intervalId);
    const grid = makeGrid(rows, cols, false)
    setGridFull(
      grid
    );
    setGeneration(0)
  }

  const handleSeedButton = () => {
    let gridCopy = [...gridFull];
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
  }

  const handleGridSizeSelect = (size) => {
    handleClearButton();
    switch (size) {
      case "1":
        gridUpdate(10, 20);
        break;
      case "2":
        gridUpdate(30, 50);
        break;
      case "3":
        gridUpdate(50, 70);
        break;
      default:
        throw new Error(`The size # ${size} is not handled in this switch.`);
    }
  }


  return (
    <div className="App">
      <SimulationControl
        onPlayClick={handlePlayButton}
        onPauseClick={handlePauseButton}
        onSlowClick={handleSlowButton}
        onFastClick={handleFastButton}
        onClearClick={handleClearButton}
        onSeedClick={handleSeedButton}
        ongridSizeClick={handleGridSizeSelect}
      />
      <Grid
        gridFull={gridFull}
        rows={rows}
        cols={cols}
        selectBox={selectBox}>
      </Grid>
      <h2>Generations:{generation}</h2>
    </div>
  );
}


export default App;
