import React, {Component, PropTypes,} from 'react';
import {storage} from '../firebase/config';

class UploadFormFireBase extends Component {

	state = {
		isUploading: false,
		url:null,
		errMessage:null
	};

	uploadMedia = (file) => {
		this.setState({isUploading: true});
		const {folder} = this.props;
		return storage.ref(folder).put(file)
			.then(snapshot => {
				console.log(snapshot,snapshot.val());
			})
	};

	handleUpload = () => {
		const {files} = this.refs.fileInput;
		if(files.length){
			this.uploadMedia(files[0])
		}
	};

	render() {
		const {isUploading} = this.state;
		return (
			<div className="control is-grouped">
				<p className="control">
					<input className="input" type="file" ref="fileInput"/>
				</p>
				<p className="control">
					<a
						className={`button is-success ${isUploading ? 'is-loading':''}`}
						onClick={this.handleUpload}
					>
						Upload
					</a>
				</p>
			</div>
		);
	}
}

UploadFormFireBase.propTypes = {
	folder:PropTypes.string
};
UploadFormFireBase.defaultProps = {
	folder:'/untitled'
};

export default (UploadFormFireBase);
