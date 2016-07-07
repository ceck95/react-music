let musicReducer = function(listmusic=[],action){
  switch (action.type) {
    case 'MUSIC_SEARCH_API':{
      for (let key in action.data){
        action.data[key].play  = false;
        action.data[key].id  = key;
      }
      return listmusic = action.data;
    }
    case 'RESET_PLAY_LIST':{
      for (let key in action.list){
        action.list[key].play  = false;
      }
      return listmusic = action.list;
    }
    default:
     return listmusic;
  }
}
export default musicReducer
