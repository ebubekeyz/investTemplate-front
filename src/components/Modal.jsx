const Modal = ({ header, text, id }) => {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id={id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{header}</h3>
          <p className="py-4">{text}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default Modal;
