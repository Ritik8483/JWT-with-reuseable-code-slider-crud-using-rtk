import React from "react";
import Modal from "react-bootstrap/Modal";

export interface ChartModalType{
    modal:boolean,
    modalType:string,
    onHide:()=>void,
}

const ChartModal = ({ modal,modalType, onHide }: ChartModalType) => {
    console.log('modalType');
    
  return (
    <div>
      <Modal show={modal} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType==="TopTagModal" ? "Top Tag Modal" : modalType==="TopIntelModal" ? "Top Intel Modal" : "Top Searched Modal"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!Top Tag Modal</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChartModal;
