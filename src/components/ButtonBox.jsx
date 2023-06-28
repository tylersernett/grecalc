const ButtonBox = ({ buttonMap }) => {
  return (
    <div className="button-box m-1">
      {buttonMap.map((item) =>
        <button className="calc-btn"
          id={item.name}
          key={item.name}
          aria-label={item.label}
          onClick={item.function}>
          {item.display}
        </button>
      )}
    </div>
  )
}

export default ButtonBox