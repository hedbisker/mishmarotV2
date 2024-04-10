export default class tableValidation{
     static IsQuantityForChangeValid(quantityForChange:number,quantity:number ){
        return (quantityForChange < 1 || quantityForChange > quantity) 
    }
}
  