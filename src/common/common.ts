export const GetCarName = (sName: string) =>
{
     if (sName == "MAZDA_FOR_BOOK" || sName == "MAZDA_FOR_USER"){
             return "מאזדה"
     }
     else if(sName == "KIA_FOR_BOOK" || sName == "KIA_FOR_USER"){
             return "קיה"
     }
     else if( sName == "SHEV_FOR_BOOK" || sName == "SHEV_FOR_USER"){
             return "שברולט"
     }
     else  
     {
         return  "דייהטסו"
     }
 }