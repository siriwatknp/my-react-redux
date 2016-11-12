import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ClickableIcon from './ClickableIcon';

//lodash
import isDate from 'lodash/isDate';
import isBoolean from 'lodash/isBoolean';
import isString from 'lodash/isString';
import sortBy from 'lodash/sortBy';
import values from 'lodash/values';
import some from 'lodash/some';
import omit from 'lodash/omit';

const shortInstruction = (content,color = '#aaa') => (
	<p style={{marginBottom:'15px',color:color}}><strong><i>Note.</i></strong>{'' + content}</p>
);

const findItemsByPage = (items,page,itemsPerPage) => {
	return items.filter((item,i) => (page - 1)*itemsPerPage <= i && i < page*itemsPerPage)
};

export const createTable = (TableHeader,TableBody) => (
	class extends Component{

		static propTypes = {
			items:PropTypes.array,
			ippList:PropTypes.arrayOf(PropTypes.number),
			showOnly:PropTypes.bool,
			deleteItemById:PropTypes.func
		};

		static defaultProps = {
			items:[],
			ippList:[10,25,50],
			showOnly:false
		};

		state = {items:[],ids:[],open:false,activePage:1};
		
		componentDidMount(){
			const {items} = this.props;
			this.setState({items})
		}
		
		componentWillReceiveProps(nextProps, nextContext) {
			const {items} = nextProps;
			if(this.state.items !== items) this.setState({items})
		}
		
		handleOnSearchInputChange = (e) => {
			const {items} = this.props;
			const sortedItems = items.filter(item => this.findString(e.target.value,item));
			this.setState({items:sortedItems})
		};

		handleSort = (key,isDesc) => {
			const {items} = this.state;
			let sortedItems = sortBy(items,item => {
				const val = item[key];
				if(isDate(val)) {
					return Date.parse(val)
				}else if(isBoolean(val)){
					return val ? 0 : 1
				}else if(parseInt(val)){
					return parseInt(val)
				}else if(isString(val)){
					return val.toLowerCase()
				}
			});
			if(isDesc){
				sortedItems = sortedItems.reverse();
			}
			this.setState({items:sortedItems})
		};

		handleChoosePage = (page) => {
			this.setState({activePage:page})
		};

		createPagination = (items,itemsPerPage) => {
			const totalPage = Math.ceil(items.length/itemsPerPage);
			return Array.from(new Array(totalPage), (x,i) => i + 1)
		};
		
		findString = (delimeter,item) => {
			const value = values(item);
			return some(value,txt => {
				if(txt){
					const string = txt.toString();
					if(string !== undefined){
						return string.toLowerCase().indexOf(delimeter.toLowerCase()) !== -1;
					}
				}
			})
		};

		handleDelete = () => {
			const {ids} = this.state;
			ids.forEach(id => this.props.deleteItemById(id));
			this.setState({ids:[]})
			this.handleToggleModal()
		};

		handleOnSelectItem = (checked,itemId) => {
			if(checked){
				this.setState({ids:[...this.state.ids,itemId]})
			}else{
				this.setState({ids:this.state.ids.filter(id => id !== itemId)})
			}
		};

		handleOnSingleDelete = (itemId) => {
			this.setState({ids:[itemId]});
			this.handleToggleModal()
		};


		handleToggleModal = () => {
			this.setState({open:!this.state.open})
		};

		handleOnSelectChange = (e) => {
			//onChange set active page to 1
			this.setState({itemsPerPage:e.target.value,activePage:1});
		};

		render(){
			const {items,itemsPerPage,ids,open,activePage} = this.state;
			const {showOnly,ippList,...other} = this.props;
			const pages = this.createPagination(items,itemsPerPage || ippList[0]);
			const showedItems = findItemsByPage(items,activePage,itemsPerPage || ippList[0]);
			const actions = [
				<FlatButton
					label="Cancel"
					onTouchTap={this.handleToggleModal}
				/>,
				<RaisedButton
					label="Submit"
					secondary={true}
					onTouchTap={this.handleDelete}
				/>,
			];
			return(
				<div>
					{!showOnly && shortInstruction(' Select check-box in front of each row to enable removing multiple designs.')}
					<nav className="level">
						<div className="level-left">
							<p className="control">
								<input
									className="input"
									placeholder="search..."
									onChange={this.handleOnSearchInputChange}
								/>
							</p>
						</div>
						<div className="level-right">
							{!showOnly &&
							<a className="button is-danger" disabled={ids.length == 0} onClick={this.handleToggleModal}>
								<span className="icon"><i className="fa fa-trash"/></span>
								<soan>remove item(s)</soan>
							</a>
							}
						</div>
					</nav>

					<table className={`table is-striped`}>
						<TableHeader
							onSort={this.handleSort}
						/>
						<TableBody
							items={showedItems}
							itemIds={ids}
							onSingleDelete={this.handleOnSingleDelete}
							onSelectItems={this.handleOnSelectItem}
							{...omit(other,'items')}
						/>
					</table>
					{!items.length ?
						<div style={{textAlign:'center',fontSize:'16px',color:'#aaa'}}>{`No item(s) found`}</div>
						:
						<nav className="nav has-shadow">
							<div className="nav-left">
								<p className="nav-item subtitle is-6">Total items : <strong> {this.props.items.length}</strong></p>
							</div>

							<div className="nav-center">
								<span className="nav-item">items per page </span>
								<p className="nav-item control">
								<span className="select">
									<select onChange={this.handleOnSelectChange}>
										{ippList.map((amt,i) =>
											<option key={i}>{amt}</option>
										)}
									</select>
								</span>
								</p>
							</div>

							<div className="nav-right">
								<p className="nav-item">Page : </p>
								<div className="nav-item">
									<p className="control has-addons">
										{pages.map((page,i) =>
											<a className="button" key={i} onClick={() => this.handleChoosePage(page,itemsPerPage)} disabled={activePage == page}>
												<span>{page}</span>
											</a>
										)}
									</p>
								</div>
							</div>

						</nav>
					}
					<Dialog
						title="Are you sure ?"
						actions={actions}
						modal={true}
						open={open}
					>
						You are about to delete item(s) from this table, Click 'Submit' to continue.
					</Dialog>
				</div>
			)
		}
	}
);	

export const createTableHeader = (headers) => (
	class extends Component{

		state = {sorts:[]};
		
		componentDidMount() {
			this.setState({sorts:headers.map(header => false)})
		}

		handleSort = (index,sortKey) => {
			this.props.onSort(sortKey,this.state.sorts[index]);
			this.setState({sorts:this.state.sorts.map((sort,i) => {
				if(i == index){
					return !sort;
				}
				return sort
			})})
		};
		
		render(){
			const {sorts} = this.state;
			return(
				<thead>
					<tr>
						{headers.map((header,i) =>
							<th key={i} style={{textAlign:'center'}}>
								{header.text}
								{header.sortKey &&
									<ClickableIcon
										onClick={() => this.handleSort(i,header.sortKey)}
										className={sorts[i] ? `fa fa-1x fa-sort-amount-desc` : `fa fa-1x fa-sort-amount-asc`}
										style={{float:'right',color:'#aaa'}}
									/>
								}
							</th>
						)}
					</tr>
				</thead>
			)
		}
	}
);