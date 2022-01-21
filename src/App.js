import logo from './logo.svg';
import './App.css';
import { ButtonToolbar, DropdownButton, Dropdown, Button } from 'react-bootstrap';

function Buttons(props){
  return(
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

function App() {
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
      
    </div>
  );
}

export default App;
