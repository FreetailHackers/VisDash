import React from 'react';
import Modal from 'react-modal';

export default class ModalLogin extends React.Component {
    render() {
        return (       
             <Modal
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.props.onRequestClose}
                contentLabel="Login"
                >
                <div>
                    Hello, world!
                </div>
            </Modal>
        )
    }
}