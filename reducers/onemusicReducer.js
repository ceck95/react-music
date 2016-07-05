let onemusicReducer = function(music=[],action){
  switch (action.type) {
    case 'GET_ONE_MUSIC':{
      return [{
  				CaSi:action.data.CaSi,
  				LinkSong:action.data.LinkSong,
  				Listener:action.data.Listener,
  				TenSong:action.data.TenSong
  			},...music]
    }
    default:
      return music
  }
}
export default onemusicReducer
