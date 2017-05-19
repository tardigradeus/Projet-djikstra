console.log("Chargement du test");
$(document).ready(function(){
	console.log("Chargement du document terminé\nDébut du chargement du JS");

	// On simule l'arrivée d'une matrice remplie

	 var tabenvoie = [
		[-1, 4, 3,-1,-1, 5,-1,-1,-1],
	 	[-1,-1,-1,-1,-1, 8,-1,15,-1],
	 	[-1,-1,-1,-1,-1,-1,-1, 5,-1],
	 	[-1,-1,-1,-1,-1,-1,-1, 7,-1],
	 	[-1,-1,-1,-1,-1, 4,12,-1,-1],
	 	[-1,-1,-1,-1, 8,-1,-1,-1, 7],
	 	[-1,-1,-1,-1,-1,-1,-1,-1, 3],
	 	[-1,-1,-1,-1,-1,-1,-1,-1, 3],
	 	[-1,-1,-1,-1,-1,-1,-1,-1,-1]
	 ];
	 var nom = ["a","b","c","d","e","f","g","h","i"];

	/*var tabenvoie = [
		[-1, 1, 3, 9],
		[-1,-1, 1, 8],
		[-1,-1,-1, 2],
		[-1,-1,-1,-1]
	];
	var nom = ["a","b","c","d"];
	*/

	//console.log(creerAffichageMatriceLog(tabenvoie));

	$("#bouton").click(function(){
		var cible = $("#affichage");
		console.log("Lancement de l'algorithme");
		var tab = resolution(tabenvoie,0,nom,true);
		afficheTab(cible);
		$("html").append(construireListeHtml(tab,0,nom));
	});

});
