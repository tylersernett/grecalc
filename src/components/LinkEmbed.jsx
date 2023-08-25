import { useState, useEffect, } from "react";
import LinkInstructions from "./LinkInstructions";

const LinkEmbed = () => {
  const [urlInput, setUrlInput] = useState('');
  const [iframeSrc, setIframeSrc] = useState('');
  const [instructionsIsOpen, setInstructionsIsOpen] = useState(false);

  useEffect(() => {
    setIframeSrc(`https://docs.google.com/presentation/d/1p4Eb57bOcfGdhoQu4OpuH0slvldGnJOHSPrzz8U251k/preview`);
  }, []);

  const loadUrl = (e) => {
    e.preventDefault();
    setIframeSrc(urlInput);
  };

  const clear = () => {
    setUrlInput('');
    setIframeSrc('');
  };

  return (
    <div style={{ marginLeft: '5px', marginTop: '-39px' }}>
      <form onSubmit={(e) => loadUrl(e)}>
        <input
          className='embed-form'
          // style={{ width: '460px' }}
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter URL to load"
        />
        <button className='timer-btn calc-toggle-btn' style={{marginRight:'0px'}} type="submit" >
          Load URL
        </button>
        <button className='timer-btn calc-toggle-btn' style={{marginRight:'0px'}} type="button" onClick={clear}>
          Clear
        </button>
        <button className='timer-btn calc-toggle-btn' style={{marginRight:'0px'}} type="button" onClick={() => setInstructionsIsOpen(!instructionsIsOpen)}>
          Help
        </button>
        <LinkInstructions instructionsIsOpen={instructionsIsOpen} setInstructionsIsOpen={setInstructionsIsOpen} />
      </form>
      <iframe
      style={{marginTop:'5px'}}
        title="link-embed"
        src={iframeSrc}
        width="816"
        height="650"
        allowFullScreen
      />
    </div>
  );
};

export default LinkEmbed;