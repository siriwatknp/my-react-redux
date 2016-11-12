//constants
export const screens = ['desktop','mobile'];
export const imageFormFields = [{ref:'source',label:'source'},{ref:'link',label:'link to'}];
export const imageFormOptions = [{value:'_self',label:'existing tab'},{value:'_blank',label:'new tab'}];

export const imageFormStyles = {
	columns:{
		margin:'0px 0px 20px 0px',
		border:'1px solid #ddd',
		borderRadius:'5px',
	},
	figure:{
		marginBottom:10,
	},
	image:{
		
	}
};

export const hoverStyleTop = {
	style:{zIndex:1301},
	wrapperStyle:{borderRadius:5},
	barStyle:{borderTopLeftRadius:5,borderTopRightRadius:5}
};

export const hoverStyleLeft = {
	style:{zIndex:1301},
	wrapperStyle:{borderRadius:5},
	barStyle:{borderTopLeftRadius:5,borderBottomLeftRadius:5}
};

const dupKeyValue = (array) => {
	const object = {};
	array.forEach(item => {
		object[item] = item;
	});
	return object
};

const cssType = {
	fontSize:'fontSize',
	fontWeight:'fontWeight',
	fontFamily:'fontFamily',
	textAlign:'textAlign',
	backgroundColor:'backgroundColor',
	color:'color',
	width:'width',
	height:'height',
};

const tagType = {
	input:'input',
	select:'select',
	switch:'switch',
	colorPicker:'colorPicker'
};

export const dataType = {
	number:'number',
	text:'text',
	radio:'radio',
	toggle:'toggle',
	checkbox:'checkbox',
	percentage:'percentage',
	textarea:'textarea'
};

export const imageData = {
	source: '',
	link: '',
	target: '_self'
};

export const imagesObject = {
	desktop:{
		images:[imageData]
	},
	mobile:{
		images:[imageData]
	}
};

export const sliderData = {
	source: '',
	link: '',
	target: '_self',
	active: true
};
