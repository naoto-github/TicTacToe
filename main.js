// This is a JavaScript file
$(function(){

	var EMPTY = 0;
	var MARU = 1;
	var BATU = 2;

	var PLAYING = 0;
	var FINISHED = 1;

	var game = PLAYING;

	var user_clear = false;
	var comp_clear = false;

	var win = 0;
	var lost = 0;
	var draw = 0;

	var blocks = new Array(9);

	$("#reset").click(function(){
		reset();
	})

	$(".block").click(function(){

		if(game == PLAYING){
			getBlock();
			var index = $(".block").index(this);

			if(blocks[index] == EMPTY){
				getBlock();
				userTurn(index);
				setBlock();

				getBlock();
				compTurn();
				setBlock();

				judge();
			}
		}
	});

	function reset(){
		for(var i=0; i<blocks.length; i++){
			blocks[i] = EMPTY;
		}
		setBlock();
		game = PLAYING;
		user_clear = false;
		comp_clear = false;
	}

	function userTurn(index){
		blocks[index] = MARU;
	}

	function compTurn(){
		empties = [];

		for(var i=0; i<blocks.length; i++){
			if(blocks[i] == EMPTY){
				empties.push(i);
			}
		}

		//console.log("length:" + empties.length);

		var rand = Math.floor(Math.random() * empties.length);
		blocks[empties[rand]] = BATU;

		//console.log("rand:" + empties[rand]);
	}

	function hasEmpty(){
		for(var i=0; i<blocks.length; i++){
			if(blocks[i] == EMPTY){
				return true;
			}
		}
		return false;
	}

	function getBlock(){
		var i = 0;
		$(".block").each(function(){
			var state = $(this).attr("state");
			blocks[i] = Number(state);
			i++;
		})
	}

	function setBlock(){
		for(var i=0; i<blocks.length; i++){
			if(blocks[i] == MARU){
				$(".block").eq(i).attr("state", MARU);
				$(".block").eq(i).find("img").attr("src", "image/maru.png");
			}
			else if(blocks[i] == BATU){
				$(".block").eq(i).attr("state", BATU);
				$(".block").eq(i).find("img").attr("src", "image/batu.png");
			}
			else{
				$(".block").eq(i).attr("state", EMPTY);
				$(".block").eq(i).find("img").attr("src", "image/empty.png");
			}
		}
	}

	function judge(){
		if(blocks[0] == MARU && blocks[1] == MARU && blocks[2] == MARU){
			user_clear = true;
		}
		else if(blocks[3] == MARU && blocks[4] == MARU && blocks[5] == MARU){
			user_clear = true;
		}
		else if(blocks[6] == MARU && blocks[7] == MARU && blocks[8] == MARU){
			user_clear = true;
		}
		else if(blocks[0] == MARU && blocks[3] == MARU && blocks[6] == MARU){
			user_clear = true;
		}
		else if(blocks[1] == MARU && blocks[4] == MARU && blocks[7] == MARU){
			user_clear = true;
		}
		else if(blocks[2] == MARU && blocks[5] == MARU && blocks[8] == MARU){
			user_clear = true;
		}
		else if(blocks[0] == MARU && blocks[4] == MARU && blocks[8] == MARU){
			user_clear = true;
		}
		else if(blocks[2] == MARU && blocks[4] == MARU && blocks[6] == MARU){
			user_clear = true;
		}

		if(blocks[0] == BATU && blocks[1] == BATU && blocks[2] == BATU){
			comp_clear = true;
		}
		else if(blocks[3] == BATU && blocks[4] == BATU && blocks[5] == BATU){
			comp_clear = true;
		}
		else if(blocks[6] == BATU && blocks[7] == BATU && blocks[8] == BATU){
			comp_clear = true;
		}
		else if(blocks[0] == BATU && blocks[3] == BATU && blocks[6] == BATU){
			comp_clear = true;
		}
		else if(blocks[1] == BATU && blocks[4] == BATU && blocks[7] == BATU){
			comp_clear = true;
		}
		else if(blocks[2] == BATU && blocks[5] == BATU && blocks[8] == BATU){
			comp_clear = true;
		}
		else if(blocks[0] == BATU && blocks[4] == BATU && blocks[8] == BATU){
			comp_clear = true;
		}
		else if(blocks[2] == BATU && blocks[4] == BATU && blocks[6] == BATU){
			comp_clear = true;
		}

		if(user_clear == true && comp_clear == false){
			win += 1;
			game = FINISHED;
		}
		else if(user_clear == false && comp_clear == true){
			lost += 1;
			game = FINISHED;
		}
		else if(user_clear == true && comp_clear == true){
			draw += 1;
			game = FINISHED;
		}
		else if(hasEmpty() == false){
			draw += 1;
			game = FINISHED;
		}

		$("#history").text("勝ち:" + win.toString() + "　負け" + lost.toString() + "　引き分け:" + draw.toString());
	}


});
