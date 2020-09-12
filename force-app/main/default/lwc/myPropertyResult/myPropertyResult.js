import { LightningElement, track, wire, api } from 'lwc';
import getLatestProperty from '@salesforce/apex/PropertyDetails.getLatestProperty';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getSearchedProperty from '@salesforce/apex/PropertyDetails.getSearchedProperty';
import { registerListener, unregisterAllListeners } from 'c/myPubSub';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

export default class MyPropertyResult extends NavigationMixin(LightningElement) {
    @track properties;
    @track propertiesFound;
    @track propOwnerId;
    @track enquiryPropertyId;
    @track propertyId;
    @api openOwnerDetails = false;
    @api openEnquiryDetails = false;
    
    @track locationFilter;
    @track bedroomFilter;
    @track bathroomFilter;
    @track budgetFilter;


    @wire(getLatestProperty)
    wiredProperties({data, error}){
        if(data){
            this.properties = data;
            this.propertiesFound = true;
        }
        else if(error){
            this.showToast('Error', error.body.message, 'error');
            this.propertiesFound = false;
        }
    }

    showToast(title, message, variant){
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    ownerDetailsClick(event){
        this.propOwnerId = event.target.value;
        this.openOwnerDetails = true;
    }

    closeOwnerModal(){
        this.openOwnerDetails = false;
    }

    enquiryClick(event){
        this.enquiryPropertyId = event.target.value;
        this.openEnquiryDetails = true;
    }
    
    closeEnquiryModal(){
        this.openEnquiryDetails = false;
    }

    propertyDetailsNavigate(event){
        this.propertyId = event.target.value;
        console.log('Property Id :'+this.propertyId);
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__MyPropertyView',
            },
            state: {
                c__propertyId: this.propertyId,
            }
        });
    }



    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        registerListener("handleLocationFilterChange", this.handleLocationFilterChange, this);
        registerListener("handleNoOfBedroomFilterChange", this.handleNoOfBedroomFilterChange, this);
        registerListener("handleNoOfBathroomFilterChange", this.handleNoOfBathroomFilterChange, this);
        registerListener("handleBudgetFilterChange", this.handleBudgetFilterChange, this);
    }
    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    handleLocationFilterChange(locationChange){
        this.locationFilter = locationChange;
        getSearchedProperty({
            location: this.locationFilter,
            bedroom: this.bedroomFilter,
            bathroom: this.bathroomFilter,
            budget: this.budgetFilter,
        })
        .then(result => {
            this.properties = result;          
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'Error');
        });
    }

    handleNoOfBedroomFilterChange(bedroomChange){
        this.bedroomFilter = bedroomChange;
        getSearchedProperty({
            location: this.locationFilter,
            bedroom: this.bedroomFilter,
            bathroom: this.bathroomFilter,
            budget: this.budgetFilter,
        })
        .then(result => {
            this.properties = result;          
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'Error');
        });
    }

    handleNoOfBathroomFilterChange(bathroomChange){
        this.bathroomFilter = bathroomChange;
        getSearchedProperty({
            location: this.locationFilter,
            bedroom: this.bedroomFilter,
            bathroom: this.bathroomFilter,
            budget: this.budgetFilter,
        })
        .then(result => {
            this.properties = result;          
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'Error');
        });
    }

    handleBudgetFilterChange(budgetChange){
        this.budgetFilter = budgetChange;
        getSearchedProperty({
            location: this.locationFilter,
            bedroom: this.bedroomFilter,
            bathroom: this.bathroomFilter,
            budget: this.budgetFilter,
        })
        .then(result => {
            this.properties = result;          
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'Error');
        });
    }
}