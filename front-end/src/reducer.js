export default function reducer(state = {categ : "" } , action ) {
    
    switch(action.type){
        case "storeCateg":
            return {...state , categ : action.payload}
        default : 
            return state;
    }
}
