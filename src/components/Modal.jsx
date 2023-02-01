const Modal = ({ data }) => {
  const {
    image,
    title,
    content,
    buttonText,
    buttonFunc,
    typeDanger,
    showConfirmaionBox,
  } = data;

  return (
    <div className="Modal" style={{ display: "flex" }}>
      <div className="bgOverlay"></div>
      <div className="main">
        <button
          className="topButton nobutton textDanger"
          onClick={(e) => {
            showConfirmaionBox(false);
          }}
        >
          &#10006;
        </button>
        <img className="image" src={image} alt="" />
        <h3 className="title">{title}</h3>
        <p className="content" id="content">
          {content}
        </p>
        <button
          className={typeDanger ? "btn-danger" : "btn-primary"}
          onClick={() => {
            showConfirmaionBox(false);
            buttonFunc();
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
