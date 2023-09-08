import { useState, } from "react";
import LinkInstructions from "./LinkInstructions";

const LinkEmbed = ({ urlInput, setUrlInput, iframeSrc, setIframeSrc, setInputIsFocused }) => {
  const [instructionsIsOpen, setInstructionsIsOpen] = useState(false);
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  const loadUrl = (e) => {
    e.preventDefault();
    if (!urlPattern.test(urlInput)) {
      alert('Please enter a valid URL beginning with http://')
    } else {
      setIframeSrc(urlInput);
    }
  };

  const clear = () => {
    setUrlInput('');
    setIframeSrc('');
  };

  const handleFocus = () => {
    setInputIsFocused(true);
  };

  const handleBlur = () => {
    setInputIsFocused(false);
  };

  return (
    <div className='embed-form' style={{ marginLeft: '5px', marginTop: '-39px', display: 'inline-block' }}>
      <form onSubmit={(e) => loadUrl(e)} >
        <input
          className='embed-input'
          // className={`embed-input ${inputIsFocused ? 'focused' : ''}`}
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Enter URL to load"
        />
        <button className='timer-btn calc-toggle-btn' style={{ marginRight: '0px' }} type="submit" >
          Load URL
        </button>
        <button className='timer-btn calc-toggle-btn' style={{ marginRight: '0px' }} type="button" onClick={clear}>
          Clear
        </button>
        <button className='timer-btn calc-toggle-btn' style={{ marginRight: '0px' }} type="button" onClick={() => setInstructionsIsOpen(!instructionsIsOpen)}>
          Help
        </button>
        <LinkInstructions instructionsIsOpen={instructionsIsOpen} setInstructionsIsOpen={setInstructionsIsOpen} />
      </form>
      <iframe
        style={{ marginTop: '5px' }}
        title="link-embed"
        src={iframeSrc}
        width="752"
        height="600"
      />
    </div>
  );
};

export default LinkEmbed;