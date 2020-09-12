import { LightningElement, api, wire } from 'lwc';
import getDetails from '@salesforce/apex/PropertyDetails.getDetails';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class MyMasterPropertyTab extends LightningElement {
    @api propertyId;
    @api property;
    @api propertyFound = false;

    @wire(getDetails, {propId: '$propertyId'})
    wiredProperties({data, error}){
        if(data){
            console.log('Property: '+this.property);
            this.property = data;
            this.propertyFound = true;
        }
        else if(error){
            this.showToast('Error', error.body.message, 'Error');
        }
    }

}