import { LightningElement, track, wire } from 'lwc';
import { fireEvent } from 'c/myPubSub';
import { CurrentPageReference } from 'lightning/navigation';

export default class MyPropertyFilter extends LightningElement {
    @track location;
    @track noOfBedroom;
    @track noOfBathroom;
    @track maximumBudget;

    get locationOptions(){
        return [
            {label: 'All', value: 'All'},
            {label: 'Pune', value: 'Pune'},
            {label: 'Bangalore', value: 'Bangalore'},
            {label: 'Mumbai', value: 'Mumbai'},
            {label: 'Chennai', value: 'Chennai'},
            {label: 'Bhubaneswar', value: 'Bhubaneswar'},
        ];
    }

    get noOfBedroomOptions(){
        return [
            {label: 'All', value: 'All'},
            {label: '1', value: '1'},
            {label: '2', value: '2'},
            {label: '3', value: '3'},
            {label: '4', value: '4'},
        ];
    }

    get noOfBathroomOptions(){
        return [
            {label: 'All', value: 'All'},
            {label: '1', value: '1'},
            {label: '2', value: '2'},
            {label: '3', value: '3'},
            {label: '4', value: '4'},
        ];
    }


    @wire(CurrentPageReference) pageRef;
    handleLocationChange(event){
        this.location = event.target.value;
        console.log('Location selected: '+this.location);
        fireEvent(this.pageRef, "handleLocationFilterChange", this.location);
    }

    handleNoOfBedroomChange(event){
        this.noOfBedroom = event.target.value;
        console.log('No of Bedroom selected: '+this.noOfBedroom);
        fireEvent(this.pageRef, "handleNoOfBedroomFilterChange", this.noOfBedroom);
    }

    handleNoOfBathroomChange(event){
        this.noOfBathroom = event.target.value;
        console.log('No of Bathroom selected: '+this.noOfBathroom);
        fireEvent(this.pageRef, "handleNoOfBathroomFilterChange", this.noOfBathroom);
    }

    handleBudgetChange(event){
        this.maximumBudget = event.target.value;
        console.log('Maximum Budget selected: '+this.maximumBudget);
        fireEvent(this.pageRef, "handleBudgetFilterChange", this.maximumBudget);
    }
}