import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MyPropertyEnquiry extends LightningElement {
    @api objectApiName;
    @api propertyId;

    handleSuccess(event){
        const evt = new ShowToastEvent({
            title: "Enquiry Submitted",
            message: "Success",
            variant: "Success"
        });
        this.dispatchEvent(evt);
    }

}