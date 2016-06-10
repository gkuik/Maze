#Maze

Générateur et solveur de labyrinthe

####Demo : http://gkuik.github.io/Maze/

##2. Solution
*Enguerran :* L'idée était d'utiliser une librarie contenant plusieurs algorithmes résoveurs de labyrinthe afin de les comparer (A*, Dijkstra, BestFirst, Tremaux...) comme [PathFinding.js](https://github.com/qiao/PathFinding.js) qui semblait idéeale ou celle de [primaryobjects](https://github.com/primaryobjects/maze) qui compare Tremaux et A*.

Seulement toutes ces librairies nécessitent une représentation "brute" du labyrinthe : soit en matrice pour **PathFinding.js** soit un type string avec sauts de ligne (`\ `), cases remplies (`*`), cases vides (` `) pour **primaryobjects**.

Il fallait donc convertir la représentation "cellule avec ouverture droite et bas" en représentation brute.

_Exemple avec le labyrinthe 2*2 suivant :_

![Maze2x2](http://image.noelshack.com/fichiers/2016/23/1465595040-maze2x2-exemple.png)

_sa représentation JSON actuelle_
```json
{
"cells":[
{"down":true,"right":false},{"down":false,"right":true},
{"down":true,"right":false},{"down":true,"right":true}
],
"height":2,"width":2
}
```
_deviendrait, en matrice ceci_
```javascript
var matrix = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
]
```
Or après tentatives, je n'ai malheuresement pas réussi à effectuer cette tranformation dans le temps imparti.
