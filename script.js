function getRandomGame(min, max) {
	var temp = Math.random() * (max - min + 1) + min; /* RETURN est la DERNIERE instruction d'une fonction(si on veux ajouter un truc ce sera fprcément devant)*/
	temp = Math.floor(temp); /* = est l'opérateur d'affectation donc il applique ce qu'il y a après = à ce qui est compris avant.*/
	return temp;
}

var WIDTH_CANVAS=945;
var HEIGHT_CANVAS=600;
var WIDTH_JOUEUR = 70;
var HEIGHT_JOUEUR = 100;
var X_MAX = (WIDTH_CANVAS-WIDTH_JOUEUR) / WIDTH_JOUEUR;
var Y_MAX = (HEIGHT_CANVAS-HEIGHT_JOUEUR) / HEIGHT_JOUEUR;
var pos_player = {
					X: getRandomGame(0, X_MAX),
					Y: getRandomGame(0, Y_MAX)
				};
var pos_lingot = {
					X: getRandomGame(0, X_MAX),
					Y: getRandomGame(0, Y_MAX)
				};
var score = 0;

function draw(){
	console.log("draw");
	var contexte = document.querySelector('#canvas').getContext('2d');

	var img = new Image();
	img.src = 'img/topdown_cliff.jpg';
	img.onload = function(){
		contexte.drawImage(img, 0, 0);
	};
	var img1 = new Image();
	if(score >= 4){
		img1.src = "img/prairie_player.png";
	}
	else{
		img1.src = 'img/mineur.png';
	}
	
	img1.onload = function(){
		contexte.drawImage(img1, pos_player.X*WIDTH_JOUEUR, pos_player.Y*HEIGHT_JOUEUR);
	};
	var img2 = new Image();
	img2.src = 'img/lingo.png';
	img2.onload = function(){
		contexte.drawImage(img2, pos_lingot.X*WIDTH_JOUEUR, pos_lingot.Y*HEIGHT_JOUEUR);
	};

	//	À chaque fois qu'on dessine, on réécrit le score
	$('.score').html(score);


}
draw();

/* fonction random pour un interval 0, 1 la fonction suivante permet de définir le résultatg dans une plage (exemple entre 0 et 10000)
	function getRandom() {
  		return Math.random();
}
*/


function pathvalidator(keyCode){
	//	ici on vérifie que la touche est bien la touche "gauche" 
	if (keyCode==37){
		//	ensuite on vérifie si le déplacement est valide, s'il ne l'est pas on renvoie "false", 
		//	s'il est valide, on doit encore déterminer si la cible contient un lingot
		if (pos_player.X - 1 >= 0){
			//	on compare la position du lingot avec le mouvement
			if( pos_player.X - 1 == pos_lingot.X && pos_player.Y == pos_lingot.Y ){
				return "lingot";
			}
			else{
				return "true";
			}
		}
		else {
			return "false";
		}
	}
	else if (keyCode==38){
		if (pos_player.Y - 1 >= 0){
			if( pos_player.Y - 1 == pos_lingot.Y && pos_player.X == pos_lingot.X ){
				return "lingot";
			}
			else{
				return "true";
			}
		}
		else {
			return "false";
		}
	}
	else if (keyCode==39){
		if (pos_player.X + 1 <= X_MAX){
			if( pos_player.X + 1 == pos_lingot.X && pos_lingot.Y == pos_player.Y ){
				return "lingot";
			}
			else{
				return "true";
			}
		}
		else {
			return "false";
		}
	}
	else if (keyCode==40){
		if (pos_player.Y + 1 <= Y_MAX){
			if(pos_player.Y + 1 == pos_lingot.Y && pos_player.X == pos_lingot.X ){
				return "lingot";
			}
			else{
				return "true";
			}
		}
		else {
			return "false";
		}
	}
}

$(document).on('keydown', function(event){ //keydown quand on appuie sur la touche, key up quand on la relache
	var validation = pathvalidator(event.keyCode);
	if (event.keyCode == 37 && ( validation == "true" || validation == "lingot" ) ){
		pos_player.X = pos_player.X -1;
	}
	else if (event.keyCode == 38 && (validation == "true" || validation == "lingot" ) ){
		pos_player.Y = pos_player.Y -1;
	}
	else if (event.keyCode == 39 && (validation == "true" || validation == "lingot" ) ){
		pos_player.X = pos_player.X +1;
	}
	else if (event.keyCode == 40 && (validation == "true" || validation == "lingot" ) ){
		pos_player.Y = pos_player.Y +1;
	}


	//	Lorsque validation == "lingot" on peut déplacer le lingot, et incrémenter le score de 1
	if(validation == "lingot"){
		pos_lingot = 	{
								X: getRandomGame(0, X_MAX),
								Y: getRandomGame(0, Y_MAX)
							};
		score++;
		draw();
	}


	if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40){
		draw();
		event.preventDefault();
	}
	console.log(event.keyCode);
});

