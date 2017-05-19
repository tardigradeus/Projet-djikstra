$(document).ready(function(){
	console.log("Début du chargement du JS main");

	/*
		Fonction qui permet lors de l'affichage mobile de remonter automatiquement le
		menu après avoir cliqué sur un item en simulant un click sur celui-ci
	*/
	$('.main-menu-item').click(function(){
		/* Média de bootstrap utilisé ici pour le passage de mobile à web classique */
		if (window.innerWidth < 768)
			$('#button-mobile-bar').click();
	});

	/*
		Fonction qui permet lors de la modification de la taille de la fenêtre
		d'adapter son conteneur (appliqué sur le nav et le contenu)
	*/
	function sizeAdapt(){
		if ($(".navbar").css('height') != "51px")
			$("#main").css('margin-top',"100px");
		else
			$("#main").css('margin-top',"50px");
	
		// Adaptation des deux tableaux: matrice et affichage de la solution
		var nbCols = $('#affTable').find("tr").length;

		var tailleCase = Math.floor($('#matriceAff').width()/(nbCols));
		$('.tdTable').css('width',tailleCase+"px");
		$('.tdTable2').css('width',tailleCase+"px");
	};

	/* Permet d'appeler des fonctions au lancement de la page */
	$(window).load(function(){
		if (window.innerWidth > 768) $("#mainTab").click();
		sizeAdapt();
	});

	/* Permet d'appeler des fonctions à chaque redimentionnement de la fenêtre */
	$(window).resize(function() {
		sizeAdapt();
	});

	console.log("Chargement du JS main terminé, en attente d'évènements ...");
});
