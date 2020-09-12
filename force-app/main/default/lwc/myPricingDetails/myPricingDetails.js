import { LightningElement, api } from 'lwc';

export default class MyPropertyPricingDetails extends LightningElement {
    @api property;
    @api propertyFound;
}