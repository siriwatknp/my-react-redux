import React, {Component, PropTypes,} from 'react';

import MuiTabs from './MuiTabs';

//lodash
import isEmpty from 'lodash/isEmpty';
import isBoolean from 'lodash/isBoolean';
import isString from 'lodash/isString';
import capitalize from 'lodash/capitalize';
import indexOf from 'lodash/indexOf';

export const createPage = (ViewAll,CreateOrEdit) => {
	return class extends Component {
		
		static propTypes = {
			fetchId:PropTypes.func.isRequired,
			name:PropTypes.string.isRequired,
			mode:PropTypes.string.isRequired,
			resources:PropTypes.array.isRequired,
			editObject:PropTypes.object.isRequired,
			adPath:PropTypes.string,
			onCreate:PropTypes.func,
			onUpdate:PropTypes.func,
			fetchStatus:PropTypes.oneOfType([
				PropTypes.bool,
				PropTypes.string
			])
		};
		
		static defaultProps = {
			adPath:'',
		};

		componentDidMount() {
			this.fetchById(this.props.mode);
		}

		componentWillReceiveProps(nextProps, nextContext) {
			if(nextProps.mode !== this.props.mode){
				this.fetchById(nextProps.mode)
			}
		}

		fetchById = (mode) => {
			if(indexOf(['viewAll','create'],mode) == -1){
				this.props.fetchId(mode)
			}
		};
		
		renderByMode = (mode) => {
			const {resources,fetchStatus,editObject,onCreate,onUpdate,...other} = this.props;
			if(mode == 'create'){
				return(
					<CreateOrEdit
						onSave={mode == 'create' ? onCreate : onUpdate}
						editObject={editObject}
						{...other}
					/>
				)
			}else{
				if(isBoolean(fetchStatus) && fetchStatus && isEmpty(editObject) && mode != 'create'){
					return(
						<div>Loading...</div>
					)
				}else if(isString(fetchStatus)){
					return(
						<div>{fetchStatus}</div>
					)
				}
				return(
					<ViewAll resources={resources} {...other}/>
				)
			}
		};
		
		render() {
			const {mode,name,adPath} = this.props;
			const urls = [
				{label:`View All ${capitalize(name)}`,path:`${adPath}/${name}/viewAll`},
				{label:`Create ${capitalize(name.slice(0,-1))}`,path:`${adPath}/${name}/create`}
			];
			const indexes = {viewAll:0,create:1};
			return (
				<div>
					<MuiTabs urls={urls} index={indexes[mode] >= 0 ? indexes[mode] : -1}/>
					{this.renderByMode(mode)}
				</div>
			);
		}
	}
};
