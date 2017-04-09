import React from 'react';

export default class FilePicker extends React.Component {
    render() {
        return (
			<div className="file">
				Drop or <button>select</button> a file.
				<input type="file" />
			</div>
        )
    }
}
