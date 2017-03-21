import React, {Component} from 'react';
import CheckboxOrRadioGroup from '../components/CheckboxOrRadioGroup';
import SingleInput from '../components/SingleInput';
import TextArea from '../components/TextArea';
import Select from '../components/Select';


class FormContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			ownerName: '',
			address:'',
			email:"",
			phone:"",
			city:"",
			state:"",
			stateOptions:[],
			zip:"",
			homeType: [],
			selectedReason:"",
			ageOptions: [],
			ownerAgeRangeSelection: '',
			SolarOptions: ["Yes","No"],
			SolarSelect: "",
			description: '',
			warning: "",
			warning1:"",
			warning2:"",
			warning3:"",
			warning4:"",
			warning5:""
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		this.handleFullNameChange = this.handleFullNameChange.bind(this);

		this.handleFullEmailChange = this.handleFullEmailChange.bind(this);
		this.handleFullPhoneChange = this.handleFullPhoneChange.bind(this);

		this.handleFullCityChange = this.handleFullCityChange.bind(this);

		this.handleFullAddressChange = this.handleFullAddressChange.bind(this);
		this.handleStateSelect = this.handleStateSelect.bind(this);
		this.handleFullZipChange = this.handleFullZipChange.bind(this);

		this.handleAgeRangeSelect = this.handleAgeRangeSelect.bind(this);
		this.SolarInterest = this.SolarInterest.bind(this);
		this.handleSolarSelection = this.handleSolarSelection.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.validateData = this.validateData.bind(this);
		this.setDefault = this.setDefault.bind(this);

	}
	componentDidMount() {
				this.setState({
					homeType: ["Cost Effective","Environment Friendly"],
					ageOptions: ["15 to 30 years", "31 to 40 years ", "41 to 50 years", "50 and above"],
					stateOptions:['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
				});
			
	}

	validateEmail(e){
		return false;

	}
	handleFullNameChange(e) {
		this.setState({ ownerName: e.target.value } );
	}

	handleFullAddressChange(e) {
		this.setState({ address: e.target.value });
	}

	  handleFullEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handleFullPhoneChange(e) {
        this.setState({ phone: e.target.value });
    }


    handleFullCityChange(e) {
        this.setState({city: e.target.value });
    }

    handleStateSelect(e){
    	this.setState({state: e.target.value });
    }

    handleFullZipChange(e){
    	this.setState({zip: e.target.value});
    }


	handleAgeRangeSelect(e) {
		this.setState({ ownerAgeRangeSelection: e.target.value });
	}

	SolarInterest(e) {
		this.setState({selectedReason: e.target.value});
			
	}

	handleSolarSelection(e) {
		this.setState({ SolarSelect: e.target.value });
	}

	handleDescriptionChange(e) {
		this.setState({ description: e.target.value });
	}

	setDefault(e) {
		this.setState({warning:"",warning1:"",warning2:"",warning3:"",warning4:"",warning5:""});
	}

	validateData(e) {
		var check =0;
		if(this.state.ownerName === ""){
			this.setState({warning:"Invalid Name"});
			check =1;
		}

		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		
  		if(!re.test(this.state.email) ){
  			this.setState({warning1:"Invalid Email"});
  			check=1;
  		}

  		if(this.state.ownerAgeRangeSelection=== ""){
			this.setState({warning2:"Invalid Entry"});
			check =1;
		}

		if(this.state.address === ""){
			this.setState({warning3:"Invalid Address"});
			check =1;
		}

		if(this.state.state === "" || this.state.city === ""){
			this.setState({warning4:"Invalid Entry"});
			check =1;
		}
		if(check === 0){
			return true;
		}
		else{
			this.setState({warning5:"Invalid Entry "});
			return false;
		}
	}

	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			ownerName: "",
			selectedReason: "",
			ownerAgeRangeSelection: "",
			email:"",
			phone:"",
			address:"",
			city:"",
			state:"",
			zip:"",
			SolarSelect: "",
			description: ""
		});
	}

	handleFormSubmit(e) {
		e.preventDefault();
		this.setDefault(e);
		if(this.validateData(e) ) {
			const formPayload = {
				ownerName: this.state.ownerName,
				selectedReason: this.state.selectedReason,
				age: this.state.ownerAgeRangeSelection,
				email:this.state.email,
				phone:this.state.phone,
				address:this.state.address,
				city:this.state.city,
				state:this.state.state,
				zip:this.state.zip,
				SolarSelect: this.state.SolarSelect,
				description: this.state.description
			};
			console.log('Send this in a POST request:', formPayload);
			 fetch("/form", {
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                method: "POST",
	                body: JSON.stringify(formPayload)
	            })
	            .then(function(res) { console.log(res.status) })
	            .catch(function(res) { console.log(res.status) })
	            this.handleClearForm(e);
        }
	}

	render() {
		return (
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h5>Inquiry Form</h5>

				

				<SingleInput
					inputType={'text'}
					title={'Full Name'}
					name={'name'}
					controlFunc={this.handleFullNameChange}
					content={this.state.ownerName}
					placeholder={'Type first and last name here'} />

				<p className="form-input-hint">{this.state.warning}</p>

					<SingleInput
					inputType={'text'}
					title={'Email'}
					name={'email'}
					controlFunc={this.handleFullEmailChange}
					content={this.state.email}
					placeholder={'Email'} />

				<p className="form-input-hint">{this.state.warning1}</p>

					<SingleInput
					inputType={'text'}
					title={'Contact No'}
					name={'contact'}
					controlFunc={this.handleFullPhoneChange}
					content={this.state.phone}
					placeholder={'Contact Number'} />
				

				<Select
					name={'ageRange'}
					title={'Age'}
					placeholder={'Choose your age range'}
					controlFunc={this.handleAgeRangeSelect}
					options={this.state.ageOptions}
					selectedOption={this.state.ownerAgeRangeSelection} />
				<p className="form-input-hint">{this.state.warning2}</p>

				<SingleInput
					inputType={'text'}
					title={'Address'}
					name={'name1'}
					controlFunc={this.handleFullAddressChange}
					content={this.state.address}
					placeholder={'Address 1'} />
				<p className="form-input-hint">{this.state.warning3}</p>

				<SingleInput
					inputType={'text'}
					title={'City'}
					name={'city'}
					controlFunc={this.handleFullCityChange}
					content={this.state.city}
					placeholder={'City'} />
				<p className="form-input-hint">{this.state.warning4}</p>

				<Select
					name={'state'}
					title={'State'}
					placeholder={'State'}
					controlFunc={this.handleStateSelect}
					options={this.state.stateOptions}
					selectedOption={this.state.ownerstate} />

				<SingleInput
					inputType={'text'}
					title={'Zip Code'}
					name={'zip'}
					controlFunc={this.handleFullZipChange}
					content={this.state.zip}
					placeholder={'Zip Code'} />



				<CheckboxOrRadioGroup
					title={'What is your reason for opting Solar Energy?'}
					setName={'home'}
					type={'radio'}
					controlFunc={this.SolarInterest}
					options={this.state.homeType}
					selectedOptions={this.state.selectedReason} />

				<CheckboxOrRadioGroup
					title={'Do you have Solar Panels installed ?'}
					setName={'siblings'}
					controlFunc={this.handleSolarSelection}
					type={'radio'}
					options={this.state.SolarOptions}
					selectedOptions={this.state.SolarSelect} />
				

				<TextArea
					title={'If you have any queries let us know.We will get back to you soon'}
					rows={5}
					resize={false}
					content={this.state.description}
					name={'description'}
					controlFunc={this.handleDescriptionChange}
					placeholder={'Please be thorough in your descriptions'} />
				<input
					type="submit"
					className="btn btn-primary float-right"
					value="Submit"/>
				
				
			</form>
		);
	}
}

export default FormContainer;
