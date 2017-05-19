$(document).ready(function(){
	console.log("Chargement de l'algorithme");
});



	var tableau;

	function afficheTab(cible){
		$(cible).html(tableau);
	}

	/*
		Fonction a prendre qui prendre en parametre un tabenvoie, un int debut, et un int arrivee
		(Indices des noms des sommets de début et d'arrivée)
		Renvoie null si rien n'a été trouver sinon renvoie un tableau avec les indices des cases qui correspondent
		au chemin pour aller à l'arrivée avec en premier l'arrivee (Ordre inversé de l'arrivée au début)
	*/
	function resolution(tabenvoie,debut,tableauNoms,boolAlgo){
		tableau = $("<table style='border-collapse: collapse; text-align:center; padding:1em; width:100%;'></table>");
	
		/*
			Debut de l'initialisation
			On créer un tableau qui vas être utiliser par l'algorithme
		*/
		var tabAlgo = new Array();
		tabAlgo[0] = [];
		tabAlgo[0] = initialise(tabenvoie,debut);

		//on créer les ligne du tableau a afficher
		var ligne = $("<tr></tr>");
		var caseIndice = $("<th style='border: 1px solid black;'class='tdTable2'>Route depuis "+tableauNoms[debut]+" \\ Sommets </th>");
		ligne.append(caseIndice);
		for(var i = 0 ; i < tabAlgo[0].length; i++){
			ligne.append("<th style='border: 1px solid black;'class='tdTable2'>"+tableauNoms[i]+"</th>");
		}
		tableau.append(ligne);
		construireTabHtml(tabAlgo,tableauNoms,"d'initialisation",tableauNoms[debut]);

		console.log("Etat du tableau après initialisation ")
		console.log(tabAlgo);

		/** Fin de l'initialisation **/

		/** Debut de la boucle **/
		var nbBoucle = 1;

		// A chaque itérations on vas remplacer l'ancienne version de notre matrice de travaille par la nouvelle
		while(verifierToutPasMarque(tabAlgo)){
			
			// On recupère l'indice de la case qui a la valeur la plus petite;
			var indice = donneIndice(tabAlgo,boolAlgo) ;
			console.log("Plus petit Indice = " + indice)

			tabAlgo[0][indice].marquer = true;

			// Passage par reference du tableau on pourra donc modifier des trucs,
			// dedans il a besoin du tableau avec les infos sur les liens et de la case que l'on vient de fixer
			majPonderation(tabenvoie,tabAlgo,indice,boolAlgo);
			console.log("Etat de la matrice juste avant le depart pour une nouvelle boucle :")
			console.log(tabAlgo);
			construireTabHtml(tabAlgo,tableauNoms,nbBoucle,tableauNoms[indice]);
			nbBoucle++;
		}
		/** fin de la boucle **/
		return tabAlgo;
	}

	/*
		Fonction qui permet d'initialiser la tableau de départ
		On vas retourner un tableau qui correspondra à la première ligne de notre tableau (ex voir pdf)
	*/
	function initialise(tab,debut){

		var tabAlgoL1 = new Array();

		// On parcourt les colonnes de la case qui correspond au commencement
		for (var j = 0; j < tab[debut].length; j++){
			// Creation d'un objet par tableau
			if (tab[debut][j] != -1){
				// Variable qui va dire pour chaque sommet quelle est la longueur du chemin
				var chemin = tab[debut][j];
				var predecesseur = debut;
			}
			else {
				var chemin = Infinity;
				var predecesseur = null;
			}

			tabAlgoL1[j] = {
				chemin : chemin,
				marquer : false,
				predecesseur : predecesseur
			};
			//console.log(tabAlgoL1[j]);
		}

		// Ensuite on met la case du debut a 0 car si tu veut t'y rendre bas tu reste sur ton cul XD
		tabAlgoL1[debut].chemin = 0;
		// On marque la case
		tabAlgoL1[debut].marquer = true;
		tabAlgoL1[debut].predecesseur = debut ;

		return tabAlgoL1;
	}

	// Fonction qui permet de verifier que l'on peut encore continuer l'algo de marquage
	function verifierToutPasMarque(tabAlgo){
			var continuer = false;
			for(var i = 0 ; i < tabAlgo[tabAlgo.length-1].length ; i++){
				// Si la case n'est pas marquée et que on peut y acceder
				if( !tabAlgo[tabAlgo.length-1][i].marquer && tabAlgo[tabAlgo.length-1][i].chemin != Infinity){
					continuer = true;
				}
			}
			return continuer;
	}

	// Fonction qui retourne l'indice de la case qui a la valeur la plus petite (pour le marquage)
	function donneIndice(tabAlgo,boolAlgo){
		tailleTableau = tabAlgo.length-1;
		var indice = null;
		// On cherche la case avec le plus petit indice
		for (var i = 0 ; i < tabAlgo[tailleTableau].length ; i++){

			// Si la case n'est pas marquée et que la case n'est pas Infinity alors on compare les indices
			if ( !tabAlgo[tailleTableau][i].marquer && tabAlgo[tailleTableau][i].chemin != Infinity){
				// Si c'est la première initialisation
				if (indice == null){
					indice = i;
				}
				//si on utilise l'algo de la majoration
				else if(!boolAlgo){
					
					// On compare les valeur des cases
					// (i la case que l'on soupsonne d'être la plus grande et indice la case qui et actuellement la plus grande)
					if (tabAlgo[tailleTableau][i].chemin > tabAlgo[tailleTableau][indice].chemin){
						indice = i;
					}
				}
				//on n'utilise l'algo de la minoration
				else if(boolAlgo){
					
					// On compare les valeur des cases
					// (i la case que l'on soupsonne d'être la plus petite et indice la case qui et actuellement la plus petite)
					if (tabAlgo[tailleTableau][i].chemin < tabAlgo[tailleTableau][indice].chemin){
						indice = i;
					}
				}
			}
		}
		return indice;
	}

	// Fonction qui fait les mises à jours des ponderations du tableau
	function majPonderation(tabenvoie,tabAlgo,marquer,boolAlgo){
		// Variable qui contient la ponderation qu'il faut rien que pour aller à notre sommet marqué
		var ponderation = tabAlgo[0][marquer].chemin;

		// On regarde les liens qu'a le sommet que l'on vient de marquer
		for(var i = 0 ; i < tabenvoie[marquer].length ; i++){
			// On prends la valeur du lien qui uni le sommet marqué avec le ième sommet
			var chemin = 0;
			chemin = tabenvoie[marquer][i]
			// Si il y a un lien on va regarder si on doit remplacer la valeur dans la matrice de travaille
			if(chemin != -1){
				//chemin = la ponderation entre S le sommet de depart et le sommet actuellement marquer
				chemin += ponderation;
				//si on veut utiliser l'algorithme a l'envers
				if(boolAlgo){
					//si le chemin est plus grand que l'ancien chemin on fait la maj
					if(tabAlgo[0][i].chemin > chemin){
						tabAlgo[0][i].chemin = chemin;
						tabAlgo[0][i].predecesseur = marquer;
					}
				}
				else{
					//si le chemin est plus petit que le chemin actuel on fait la maj
					if(tabAlgo[0][i].chemin < chemin){
						tabAlgo[0][i].chemin = chemin;
						tabAlgo[0][i].predecesseur = marquer;
					}
				}
			}
		}
	}

	// Fonction qui permet de construire la tab html à partir du tableau à afficher
	function construireTabHtml(tabAlgo,tableauNoms,i,varMarq){
		var ligne = $("<tr></tr>");
		var caseIndiceMarquer = ("<th style='border: 1px solid black;' class='tdTable2'>Etape "+i+"<br /> Variable marquée : "+varMarq+"</th>");
		ligne.append(caseIndiceMarquer);

		for(var i = 0 ; i < tabAlgo[tabAlgo.length-1].length ; i++){
			StringCase = "";
			StringCase = "D = "+tabAlgo[tabAlgo.length-1][i].chemin+"<br /> PP = "+tableauNoms[tabAlgo[tabAlgo.length-1][i].predecesseur];
			var cases = $("<td style='border: 1px solid black;' class='tdTable2'>"+StringCase+"</td>");
			ligne.append(cases);
		}
		tableau.append(ligne);
	}
	
	//fonction qui donne le suivie des points et leur ponderation a appeler en dernier
	function construireListeHtml(tabAlgo,sommetBase,tableauNoms){
		var list = $("<ul></ul>");
		
		//on parcour chaque ligne du tableau 
		for(var i = 0 ; i < tabAlgo[0].length ; i++ ){
			
			//on recupère notre structure de donnés
			var caseObjet =  tabAlgo[0][i];
			var ligne = $("<li></li>");
			
			//si la case n'est pas = a infinie 
			if(caseObjet.chemin != Infinity){
				
				var texte = "Lien entre "+tableauNoms[sommetBase]+" et "+tableauNoms[i]+" | Chemin : " ;
				var tab_chemin = new Array();
				var j = 0;
				//tant que le predecesseur de notre case n'est pas 
				while ( caseObjet.predecesseur !=  sommetBase ){
					tab_chemin[j] = tableauNoms[caseObjet.predecesseur];
					//on remplace la case par son predecesseur
					caseObjet = tabAlgo[0][caseObjet.predecesseur];
					j++;
				}

				tab_chemin[j] = tableauNoms[sommetBase];
				tab_chemin = tab_chemin.reverse();
				ligne.text(texte +tab_chemin.join(" -> ")+" -> "+tableauNoms[i]+" | Ponderation = "+caseObjet.chemin );
			}
			else{
				ligne.text("Lien entre "+tableauNoms[sommetBase]+" et "+tableauNoms[i]+" | Non joignable");
			}
			list.append(ligne);
		}
		return list;
	}

