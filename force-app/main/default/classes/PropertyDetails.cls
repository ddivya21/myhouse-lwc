public with sharing class PropertyDetails {
    public PropertyDetails() {
    }

    @AuraEnabled(cacheable=true)
    public static list<Property__c> getLatestProperty(){
        list<Property__c> allPropertyList = new list<Property__c>();
        allPropertyList = [SELECT Id,
                                    Additional_Room__c,
                                    Available_From__c,
                                    Carpet_Area_sqft__c,
                                    Covered_Area_sqft__c,
                                    Electricity_Status__c,
                                    Facing__c,
                                    Floor__c,
                                    For_Bachelor__c,
                                    For_Family__c,
                                    Furnishing_Available__c,
                                    Furnished_Type__c,
                                    Geo_Map__c,
                                    Landmark__c,
                                    Location__c,
                                    Area__c,
                                    Street__c,
                                    Country__c,
                                    Maintenance_Charge__c,
                                    No_of_Balcony__c,
                                    No_of_Bathroom__c,
                                    No_of_Bedroom__c,
                                    Property_Description__c,
                                    Property_Main_Image__c,
                                    Property_Owner__c,  
                                    Property_Video_URL__c,                                  
                                    Name,
                                    Rent__c,
                                    Security_Deposit__c,
                                    Status__c,
                                    Verified__c,
                                    Water_Availability__c
                            FROM Property__c
                            LIMIT 50
                            ];
        return allPropertyList;
    }

    @AuraEnabled(cacheable=true)
    public static list<Property__c> getSearchedProperty(string location, string bedroom, string bathroom, string budget){
        list<Property__c> allPropertyList = new list<Property__c>();
        string propertyQuery = 'SELECT Id, Additional_Room__c, Available_From__c, Carpet_Area_sqft__c, Covered_Area_sqft__c, Electricity_Status__c, ';
        propertyQuery = propertyQuery+'Facing__c, Floor__c, For_Bachelor__c, For_Family__c, Furnished_Type__c, Furnishing_Available__c, Geo_Map__c, ';
        propertyQuery = propertyQuery +'Landmark__c, Area__c, Street__c, Country__c, Location__c, Maintenance_Charge__c, No_of_Balcony__c, No_of_Bathroom__c, No_of_Bedroom__c, ';
        propertyQuery = propertyQuery +'Property_Description__c, Property_Main_Image__c, Property_Video_URL__c, Name, Rent__c, Security_Deposit__c, Status__c, Verified__c, Water_Availability__c ';                            
        propertyQuery = propertyQuery +'FROM Property__c ';
        string whereClause = 'WHERE Rent__c != NULL';
        system.debug('****location '+location);
        if(string.isNotBlank(location)){
            //string locationSearch = +location+'%';
            if(location !='All'){
                whereClause = whereClause+' AND Area__c = :location';
            }
            
        }
        system.debug('****bedroom '+bedroom);
        integer bedroomCount;
        if(string.isNotBlank(bedroom)){
            if(bedroom !='All'){
                  bedroomCount= integer.valueOf(bedroom);
                 system.debug('****bedroomcount'+bedroomcount);
            whereClause  = whereClause+' AND No_of_Bedroom__c=:bedroomCount';  
            }  
        }
         system.debug('****bathroom '+bathroom);
          integer bathroomCount;
        if(string.isNotBlank(bathroom)){
             if(bathroom !='All'){
                 bathroomCount= integer.valueOf(bathroom);
                whereClause  = whereClause+' AND No_of_Bathroom__c=:bathroomCount';  
             }  
        }
       system.debug('****budget '+budget);
       double budgetValue;
        if(string.isNotBlank(budget)){
            
            budgetValue = double.valueOf(budget) ;    
            whereClause  = whereClause+' AND Rent__c<=:budgetValue'; 
                
        }
        propertyQuery = propertyQuery +' '+whereClause;
        system.debug('propertyQuery'+propertyQuery);
        allPropertyList = Database.query(propertyQuery);
        system.debug('allPropertyList'+allPropertyList);
        return allPropertyList;
    }
    
    @AuraEnabled(cacheable=true)
    public static Property__c getDetails(string propId){
        Property__c prop = [SELECT Id,
                                    Additional_Room__c,
                                    Available_From__c,
                                    Carpet_Area_sqft__c,
                                    Covered_Area_sqft__c,
                                    Electricity_Status__c,
                                    Facing__c,
                                    Floor__c,
                                    For_Bachelor__c,
                                    For_Family__c,
                                    Furnishing_Available__c,
                                    Furnished_Type__c,
                                    Geo_Map__c,
                                    Landmark__c,
                                    Location__c,
                                    Country__c,
                                    Street__c,
                                    Area__c,
                                    Maintenance_Charge__c,
                                    No_of_Balcony__c,
                                    No_of_Bathroom__c,
                                    No_of_Bedroom__c,
                                    Property_Description__c,
                                    Property_Main_Image__c,
                                    Property_Owner__c,  
                                    Property_Video_URL__c,                                  
                                    Name,
                                    Rent__c,
                                    Security_Deposit__c,
                                    Status__c,
                                    Verified__c,
                                    Water_Availability__c
                            FROM Property__c
                            WHERE Id=:propId
                            LIMIT 50
                            ];
        return prop;
    }
}
 

