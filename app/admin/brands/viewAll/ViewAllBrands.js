import React, {Component, PropTypes,} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import BrandsTableBody from './BrandsTableBody';
import {createTable,createTableHeader} from '../../../utils/components/TableHOC';

import {deleteBrand} from '../brandsLogics';

const headers = [
	{text: ''},
	{text: 'Brand Name', sortKey: 'name'},
	{text: 'Logo'},
	{text: 'Last Updated'},
	{text: 'actions'}
];
const Header = createTableHeader(headers);
const Table = createTable(Header,BrandsTableBody);

class ViewAllBrands extends Component {
	render() {
		const {resources,deleteBrand} = this.props;
		return (
			<Table
				items={resources}
				deleteItemById={deleteBrand}
			/>
		);
	}
}

ViewAllBrands.propTypes = {};
ViewAllBrands.defaultProps = {};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({deleteBrand},dispatch);

export default connect(null,mapDispatchToProps)(ViewAllBrands);
