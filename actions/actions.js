let actions = {
	addTodo:function(text) {
		return {
			type:'ADD_TODO',
			text:text
		}
	},
	compeleteTodo:function(id){
		return{
			type:'COMPELETE_TODO',
			id:id
		}
	},
	deleteTodo:function(id){
		return{
			type:'DELETE_TODO',
			id:id
		}
	},
	createNewUserId:function(){
		return{
			type:'CREATE_USER',
			id:Math.round(Math.random()*100)
		}
	},
	getMusicSearchApi:function(data){
		return{
			type:'MUSIC_SEARCH_API',
			data:data
		}
	},
	musicSearchApi:function(textSearch){
		return(dispatch) => {
			fetch('http://music.nhutuit.com/search/'+textSearch,{method:'GET'}).then(function(response) {
         return response.json()
       }).then(function(data) {
        	dispatch(actions.getMusicSearchApi(data));
       }).catch(function(ex) {
         console.log(ex);
       })
		}
	},
	getOneMusic:function(music,list){
		return{
			type:'GET_ONE_MUSIC',
			data:music,
			list:list
		}
	},
	resetPlayList:function(list){
		return {
			type:'RESET_PLAY_LIST',
			list:list
		}
	}
}
export default actions
