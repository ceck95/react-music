let musicReducer = function(listmusic=[],action){
  switch (action.type) {
    case 'MUSIC_SEARCH_API':{
      return listmusic = action.data;
    }
    default:
     return listmusic;
  }
}
export default musicReducer
