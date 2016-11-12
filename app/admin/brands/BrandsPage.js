import React, {Component, PropTypes,} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchBrands, fetchBrandId, updateBrand, createBrand, getBrandValues} from './brandsLogics';

import {createPage} from '../../utils/components/PageHOC';
import ViewAllBrands from './viewAll/ViewAllBrands';
import BrandController from './createOrEdit/BrandController';

//constants
import {resrcs} from '../../utils/constants/environment';

const Brands = createPage(ViewAllBrands,BrandController);

class BrandsPage extends Component {
	
	componentDidMount() {
		this.props.fetchBrands();
	}
	
	render() {
		const {
			brands, 
			fetchStatus, 
			params, 
			editObject,
			fetchBrandId,
			updateBrand,
			createBrand,
		} = this.props;
		return (
			<Brands
				name={resrcs.brands}
				resources={brands}
				fetchStatus={fetchStatus}
				mode={params.mode}
				editObject={editObject}
				fetchId={fetchBrandId}
				onCreate={createBrand}
				onUpdate={updateBrand}
			/>
		);
	}
}

BrandsPage.propTypes = {};
BrandsPage.defaultProps = {};

const mapStateToProps = (state) => ({
	...getBrandValues(false)(state)
});

const mapDispatchToProps = (dispatch) =>bindActionCreators({fetchBrands,fetchBrandId, updateBrand, createBrand}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BrandsPage);
