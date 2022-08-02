import styles from "styles/Modal.module.css"

type Props = {
    modalVisible: boolean,
    closeModal: () => void,
    params: any
}
import React, {useEffect, useRef } from 'react'

const Modal = (props: Props) => {
    const modalRef = useRef(null)
    console.log(props.params)
    useOnClickOutside(modalRef, () => props.closeModal());

    function useOnClickOutside(ref, handler) {
        useEffect(
          () => {
            const listener = (event) => {
              // Do nothing if clicking ref's element or descendent elements
              if (!ref.current || ref.current.contains(event.target)) {
                return
              }
              handler(event)
            }
            document.addEventListener("mousedown", listener)
            document.addEventListener("touchstart", listener)
            return () => {
              document.removeEventListener("mousedown", listener)
              document.removeEventListener("touchstart", listener)
            }
          },
          [ref, handler]
        )
      }

    const listenForEscKey = event => {
        const { keyCode } = event;
    
        if (keyCode === 27) {
          props.closeModal();
        }
      };
    
      useEffect(() => {
        window.addEventListener('keydown', listenForEscKey);
    
        return () => {
          window.removeEventListener('keydown', listenForEscKey);
        }
      })


    if (!props.modalVisible) {
        return null
    }
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent} ref={modalRef}>
                <span className={styles.close} onClick={props.closeModal}>X</span>
                <h1>Hieno modaali!</h1>
            </div>
        </div>
    )
}

export default Modal