import React, {Component, PropTypes,} from 'react';
import indexOf from 'lodash/indexOf';

class BrandsTableBody extends Component {
	static contextTypes = {
		router: PropTypes.object.isRequired
	};
	
	handleEdit = (item) => {
		this.props.editPage(item);
		this.context.router.push(`/admin/customPages/${item.id}`)
	};
	
	render() {
		const {items,itemIds} = this.props;
		const styles = {
			column:{
				textAlign:'center'
			}
		};
		return (
			<tbody>
			{items.map((item,i) => {
				return(
					<tr key={i}>
						<td>
							<p className="control">
								<label className="checkbox">
									<input
										type="checkbox"
										checked={indexOf(itemIds,item.uid) != -1}
										onChange={(e) => this.props.onSelectItems(e.target.checked,item.uid)}
									/>
								</label>
							</p>
						</td>
						<td style={styles.column}>{item.name}</td>
						<td style={styles.column}>
							<figure className="image is-96x96" style={{margin:'auto'}}>
								<img src={item.logo || "http://placehold.it/96x96"}/>
							</figure>
						</td>
						<td style={styles.column}>{item.lastUpdated}</td>
						<td>
							<div className="control is-grouped" style={{justifyContent:'center'}}>
								<p className="control">
									<a className="button is-primary" onClick={() => this.handleEdit(item)}>
										Edit
									</a>
								</p>
								<p className="control">
									<a className="button is-danger" onClick={() => this.props.onSingleDelete(item.id,item.name)}>
										Delete
									</a>
								</p>
							</div>
						</td>
					</tr>
				)
			})}
			</tbody>
		);
	}
}

BrandsTableBody.propTypes = {};
BrandsTableBody.defaultProps = {};

export default (BrandsTableBody);
