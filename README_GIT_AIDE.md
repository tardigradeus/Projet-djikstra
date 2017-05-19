# AIDE GIT
 
## Installation de git :
 
Linux (Debian / Ubuntu) : **sudo apt-get install git-core git-gui git-doc**    
Windows :    
 
* Téléchargez et installez :    
**https://github.com/git-for-windows/git/releases/download/v2.10.0.windows.1/Git-2.10.0-64-bit.exe**    

Conseil : installez le bash proposé et mettez le par défaut => plus agréable    

## Premiers paramétrages :    
 
**Mettez-vous où vous voulez mettre votre répertoire git.**
 
* **git config --global user.name "PSEUDO_GITHUB"**    
    Pour moi, ça sera Asetyan.
 
 
* **git config --global user.email "MAIL"**    
    Le mail mis à l'inscription.
 
On va faire avec un token, SSH pour ceux qui veulent et savent.    
Sans token, vous serez obligé de retaper l'id et mdp à chaque push.    
 
**Faites un token :**    
    Allez sur github, dans paramètres, à l'onglet "Personal access tokens", créez en un,
    cochez la première case uniquement. Une fois généré, copiez le token dans un
    fichier à ne pas perdre (de préférence crypté ;)) !    
   
* **git clone https://PSEUDO_GITHUB:TOKEN@github.com/NomUtilisateurHebergeurDuProjet/NomProjet.git**    
    Permet de récuperer le projet depuis Github.
    Ici NomUtilisateurHebergeurDuProjet c'est moi donc ça sera Asetyan.

* **git remote -v**    
    Pour vérifier que vous ayez bien deux lignes : une avec (fetch) et l'autre avec (push)

* **git remote remove NOM**    
    A faire que si vous n'avez pas les deux lignes précédentes
    Supprime l'entrée pour le nom du racourcis créée automatiquement. ("origin" par défaut)
  

* **git remote add origin https://PSEUDO_GITHUB:TOKEN@github.com/NomUtilisateurHebergeurDuProjet/NomProjet.git**    
    Dans le cas ou deux lignes ne sont présentes uniquement !
    Crée un alias pour le dépot afin d'éviter de retaper l'url à chaque pull/push.
 
 
## Commandes usuelles :

**POUR TOUTE MODIFICATION DANS UN DOSSIER GÉRÉ PAR GIT PRÉCÉDEZ LA COMMANDE PAR GIT POUR QU'ELLE SOIT PRISE EN COMPTE PAR GIT**     
Exemples : **git** mkdir toto - **git** mv readme.md README.md

* **git status**    
    Permet de savoir sur quelle branche on est (master par défaut).
    Donne aussi la situation actuel des données.
 
* **git diff HEAD**    
    Permet de voir les différentes modifications depuis le dernier commit,
    sur les fichiers déjà suivie par GIT.

* **git diff HEAD nomFichier**    
    Permet de voir les différentes modifications depuis le dernier commit,
    sur le fichié spécifié.
 
* **git log**    
    Permet de voir la liste des commits.
 
* **git add NomDossierCompletOuFichiers**    
    Permet de dire à git de commencer à indexer ces fichiers / dossiers  .  
    On peux en mettre plusieurs à la suite : ``git add fichier1.java fichier2.c dossier1``
 
* **git pull origin master**    
    Permet de récuperer le code à jour depuis github pour la branche master (celle de base).
 
* **git commit -am "nomDuCommit"**     
    Permet de faire un checkpoint local.
 
* **git push -u origin master**    
    Permet de mettre à jour le code sur github pour la branche master en envoyant les checkpoints.   
    Note : toujours faire un pull avant un push pour récupérer les modifications des autres déjà envoyées sur github !    
    -> Si des conflits se posent il faut les gérer, puis faire un nouveau commit avant de push : venir me voir s'il y a un soucis.
 
* **git stash**    
    **/!\ A EVITER POUR NOUS. /!\\**     
    Pour récupérer des modifications du dépôt principal, sans avoir fini nos propres modifications.    
    Une branche temporaire est créée avec vos modifications.    
    Pour récupérer les modifications :  ``git stash apply.``    

* **git reset NOMFICHER**    
    **/!\ MAL UTILISEE, PEUT FAIRE DES CONNERIES. /!\\**   
    Permet de retirer un fichier ajouté avant de commit.    
    Ne le supprime pas, mais dis à git de plus s'en occuper.    
 
* **git commit --amend -m "Here the new comment"**    
    Ne fonctionne que si pas encore push sur github.    
    Permet de changer le message du dernier commit.
 
* **git reset**    
    **/!\ MAL UTILISEE, PEUT FAIRE DES CONNERIES. /!\\**    
    Ne fonctionne que si pas encore pushé sur github    
    Permet d'annuler tous les commits fait depuis le dernier pull.    
 
### Pour gérer les branches

* **git branch -v**    
    Permet de lister les branches.
  
* **git pull origin nom_branche**      
    Permet de récuperer le code à jour depuis github pour la branche spécifiée
 
* **git push -u origin nom_branche**    
    Permet de mettre à jour le code sur github pour la branche spécifiée.
 
* **git checkout -b nom_de_la_branche**    
    Permet de créer une branche EN LOCAL .
 
* **git checkout nom_de_la_branche**    
    Permet de changer de branche de travail.
 
* **git branch -d nom_de_la_branche**    
    **/!\ NE SAUVEGARDE RIEN NULL PART. /!\**    
    Permet de supprimer une branche    
    
* **git checkout NOMFICHER**    
    Permet de récupérer un fichier dans sa dernière version commit.
 
* **git merge brancheSource**    
    Permet de fusionner la branche en cours avec une branche source.  
    Bien vérifiez d'être dans la bonne branche avec ``git status`` !
 
* **git checkout brancheCible ; git merge brancheSource**    
    Permet de fusioner la branche source dans la branche cible.    
    Supprime automatiquement le brancheSource après la fusion.  
 
### Pour gérer les tags

* **git tag**    
    Permet de lister les tags existants.
 
* **git tag -a Version -m "MESSAGE"**    
    Permet de tag le dépôt git local avec Version : V0.0.1
  
* **git push --tags**    
    Permet de pousser un tag local sur le dépôt git distant.
 
### Création d'une archive  
 
* **git archive --format=zip --prefix=NomDossier/ VersionEnchiffre | gzip > NomDossier.zip**    
    Pour créer une archive propre de la version du dépôt sans les fichiers inutiles.
 
### Annuler un commit en particulier déjà pushé    
 
* **git log**      
    Récupére l’id du commit à annuler.
* **git revert XXX**      
    Annule le commit proprement. => Crée un nouveau commit qui fait l'inverse de toutes les modifications du commit XXX
* **git push -u origin nom_branche**      
    Envoie l'annulation sur github avec nom_branche le nom de la branche actuel.
 
### Pour ignorer des fichiers par défauts les mettre dans le fichier .gitignore

## Retours :
 
Si vous voyez des erreurs surtout n'hésitez pas à les signaler avec l'onglet "Issues" !    
Vous pouvez avec cet onglet, proposer de nouveaux ajouts ou des éclaicissements si besoin.

MEMO intéressant : https://services.github.com/on-demand/downloads/fr/github-git-cheat-sheet.pdf
