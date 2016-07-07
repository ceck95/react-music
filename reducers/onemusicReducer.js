let onemusicReducer = function(music=[],action){
  switch (action.type) {
    case 'GET_ONE_MUSIC':{
      for(let key in action.list){
        action.list[key].play = false
        if(action.list[key].id == action.data.id){
          action.list[key].play = true
        }
      }
      music = [];
      return [{
  				CaSi:action.data.CaSi,
  				LinkSong:action.data.LinkSong,
  				Listener:action.data.Listener,
  				TenSong:action.data.TenSong,
  				id:action.data.id,
          play:true
  			},...music]
    }
    default:
      return music
  }
}
export default onemusicReducer
