import { LightningElement, api} from 'lwc';
//import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

export default class MyPropertyOwner extends LightningElement {
    @api propertyOwnerId;
}