$(document).ready(function(){
	console.log("Début du chargement du JS dijkstra");

	/*
		TODO : Finir de commenter
		Firefox garde en mémoire la modif de cette propriété. Mise par défaut pour le
		contourner en remettant les éléments par défaut après un refresh de la page.
	*/
	$('#btnOui').prop('disabled', false);
	$('#btnNon').prop('disabled', false);
	$('#btnNbSommets').prop('disabled', false);
	$('#nbSommets').prop('disabled', false);
	$('.tdVal').prop('disabled', false);
	$('#btnValiderMatrice').prop('disabled', false);

	var nbSommets;
	var nommage;
	var matriceValeurs;
	var sommetDepart;
	var tableauNoms;
	var algo;

	/*
		Fonction qui permet de créer le tableau qui contient les noms des
		sommets par défault => liste de nombre de 1 aux nombre de colonnes
	*/
	function creerListeNom(nb){
		tableauNoms = new Array();
		for(var i = 0; i < nb; i++)
			tableauNoms[i] = i+1;
	}

	function recupererListeNom(nb){
		tableauNoms = new Array();
		var tds = $('#affTable').children().children();
		tableauNoms[0] = "";
		for(var i = 0; i < nb; i++){
			tableauNoms[i] = tds.eq(i+1).find("td").eq(0).find("input").val();
		}
	}

	// Fonction qui permet de créer la matrice remplis avec des 0 par défault
	function creerMatrice(){
		matriceValeurs = new Array();

		for (var i = 0; i < nbSommets; i++)
			matriceValeurs[i] = new Array();

		for (var i = 0; i < nbSommets; i++){
			for (var j = 0; j < nbSommets; j++)
				matriceValeurs[i][j] = 0 ;
		}

		if (nommage === false)
			creerListeNom(nbSommets);
	};

	// Fonction qui permet de créer l'affichage de la matrice et de l'inserer dans le document HTML
	function afficherMatrice(){
		var table = document.createElement('table');
		table.style.border = '1px solid black';
		table.id = 'affTable';

		for (var i = 0; i < matriceValeurs.length + 1; i++){
			var ligne = table.insertRow();
			for (var j = 0; j < matriceValeurs[0].length +1; j++){

				if (i == j){
					ligne.insertCell().innerHTML= '<input class="tdTable'+((i == 0) ? '': ' tdVal')+'" type="text" value="'+((i == 0) ? '': '0')+'" disabled />';
				}

				else if (i == 0){
					if(nommage === false)
						ligne.insertCell().innerHTML= '<input id="'+j+'" class="tdTable firstRow" type="text" value="'+tableauNoms[j-1]+'" disabled />';
					else
						ligne.insertCell().innerHTML= '<input id="'+j+'" class="tdTable firstRow" type="text" placeholder="Nom du sommet" />';
				}

				else if (j == 0){
					if (nommage === false)
						ligne.insertCell().innerHTML= '<input class="tdTable firstCol" type="text" value="'+tableauNoms[i-1]+'" disabled />';
					else
						ligne.insertCell().innerHTML= '<input class="tdTable firstCol" type="text" disabled />';
				}
				else
					ligne.insertCell().innerHTML = '<input class="tdTable tdVal" type="text" />';
			}
		}

		$('#matriceAff').append(table);

		var tailleCase = Math.floor($('#matriceAff').width()/(nbSommets+1));
		$('.tdTable').css('width',tailleCase+"px");
		// Si la table est trop grande, elle ne s'adapte pas pour une question de lisibilité => min-width en css
	};

	// Fonction qui permet de vérifier que les entrées dans la matrice sont valides (valeurs >= -1)
	function verifMatrice(mat){
		for (var i = 0; i < mat.length; i++) {
			if (isNaN(mat[i]) || !(/^(-1|[0-9]+)$/.test(mat[i]))) return false;
		}
		return true ;
	}

	// Fonction qui permet de récupérer la matrice depuis les entrées utilisateurs
	function recupererMatrice(){
		var mat = Array();
		$('.tdVal').each(function(){
			mat.push(parseInt($(this).val()));
		});
		console.log(mat);
		return mat;
	}

	/*
		Fonction qui permet de remplir la matrice de valeurs avec les données entrées par l'user
		Attention ne contient pas les noms ! -> (se trouvent dans tableauNoms)
	*/
	function remplirMatrice(mat){
		var x = 0 ;
		for (i = 0; i < nbSommets; i++){
			for (j = 0; j < nbSommets; j++){
				matriceValeurs[i][j] = parseInt(mat[x]);
				x++;
			}
		}
	}

	function initMatPlusAffichage(){
		creerMatrice();
		afficherMatrice();
		$('#matriceAff').fadeIn('slow');
		$('#btnValiderMatrice').fadeIn('slow');
	}

	function verifDoublonNommage(){
		var result = {};

		for (var i = 0; i < tableauNoms.length; i++){
			if (tableauNoms[i] in result){result[tableauNoms[i]] += 1;}
			else {result[tableauNoms[i]] = 1;}
		}

		console.log(tableauNoms);
		console.log(result);
		for (var i = 0; i < tableauNoms.length; i++){
			if (result[tableauNoms[i]] > 1) return false;
		}

		return true;
	}

	function recupSommetDepart(){
		var sommet = $('#nomSommet').val();
		console.log(sommet);
		console.log(tableauNoms);
		for (var i = 0; i < tableauNoms.length; i++) {
			if (sommet == tableauNoms[i])
				sommetDepart = i;
		};
		if (typeof sommetDepart == "undefined") return false;
		else return true;
	}

	// Fonction qui permet la création d'un string pour un affichage en console de la matrice
	function creerAffichageMatriceLog(matrice){
		var tabString = "";
		for (var i = 0; i < matrice.length; i++){
			tabString += " i = "+i+" : ";
			for (var j = 0 ; j < matrice[i].length; j++){
				if (matrice[i][j] == -1 || matrice[i][j] > 10)
					if (matrice[i][j] > 100)
						tabString += " | " + matrice[i][j];
					else
						tabString += " |  " + matrice[i][j];
				else
					tabString += " |   " + matrice[i][j];
			}
			tabString += "\n";
		}
	    return tabString;
	}

	/*
		Liaison de la première ligne du tableau à un gestionnaire d'events afin de remplir la
		première colonne en fonction des entrées dans celle-ci
	*/
	$(document).on('keyup', '.firstRow', function() {
		var num = $(this).attr('id');
		var value = $(this).val();
		$('.firstCol').eq(parseInt(num)-1).val(value);
	});

	$('#btnNbSommets').click(function(){
		nbSommets = parseInt($('#nbSommets').val());
		if (nbSommets > 2 && nbSommets < 100){
			$('#Pb_nbSommets').fadeOut('slow');
			$('#askNomSommets').slideDown('slow');
			$('#nbSommets').prop('disabled', true);
			$('#btnNbSommets').prop('disabled', true);
		}
		else
			$('#Pb_nbSommets').fadeIn('slow');
	});

	$('#btnOui').click(function(){
		$('#askPoids').append('ainsi que le nom des sommets :');
		$('#askPoids').slideDown('slow');
		$('#legende').slideDown('slow');
		$('#btnNon').fadeOut('slow');
		$('#btnOui').prop('disabled', true);
		nommage = true;
		initMatPlusAffichage();
	});

	$('#btnNon').click(function(){
		$('#askPoids').append(' :');
		$('#askPoids').slideDown('slow');
		$('#legende').slideDown('slow');
		$('#btnOui').fadeOut('slow');
		$('#btnNon').prop('disabled', true);
		nommage = false;
		initMatPlusAffichage();
	});

	$('#btnValiderMatrice').click(function(){
		mat = recupererMatrice();
		if (verifMatrice(mat)){
			if (nommage === true){
				recupererListeNom(nbSommets)
				var goOn = verifDoublonNommage();

				if (!goOn){
					$('#Pb_askPoids').fadeIn('slow');
					return ;
				}
				else {
					$('#Pb_askPoids').fadeOut('slow');
					remplirMatrice(mat);
					$('.tdVal').prop('disabled', true);
				}
			}
			else {
				$('#Pb_askPoids').fadeOut('slow');
				remplirMatrice(mat);
				$('.tdVal').prop('disabled', true);
			}
		}
		else {
			$('#Pb_askPoids').fadeIn('slow');
			return ;
		}

		$('#SelectAlgo').fadeIn('slow');
		$('#btnValiderMatrice').prop('disabled', true);
	});

	$('#btnChoixAlgo').click(function(){
		var choix = $('input[name=choixAlgo]:checked').val() ;
		if (choix == "plusCourt")
			algo = "plusCourt";
		else
			algo = "plusLourd";

		$('#nomSommet').val('');
		$('#SelectDepart').fadeIn('slow');
	});

	$('#btnChoixDepart').click(function(){
		sommetDepart = undefined;
		if (!recupSommetDepart()) {alert("Ce point n'existe pas !");return;}

		console.log(creerAffichageMatriceLog(matriceValeurs));
		console.log("Lancement de l'algorithme");
		
		var listeDetails = resolution(matriceValeurs,sommetDepart,tableauNoms,(algo == "plusCourt" ? true : false));
		afficheTab($("#solAff"));
		$("#solAffDetails").html(construireListeHtml(listeDetails,sommetDepart,tableauNoms));

		var tailleCase2 = Math.floor($('#matriceAff').width()/(nbSommets+1));
		$('.tdTable2').css('width',tailleCase2+"px");


		// $('#AffGraph').fadeIn('slow');
		$('#legendeSol').slideDown('slow');
		$('#AffSol').fadeIn('slow');
	});

	console.log("Chargement du JS dijkstra terminé, en attente d'évènements ...");
});
