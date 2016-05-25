var maze = new Array();
var result = "";

var mazeWidth = 30;
var mazeHeight = 30;
var cellsSize = 20;

var nbCells = mazeWidth * mazeHeight;


for (var i = 0; i < nbCells; i++) {
    maze.push({
        id: i + 1,
        down: true,
        right: true
    })
}


for (var i = 0; i < nbCells; i++) {


    switch (Math.floor(Math.random() * (4 - 1 + 1)) + 1) {
        case 1:

            break;
        case 2:

            break;
        case 3:

            break;
        case 4:

            break;
    }


    if (i >= mazeWidth) {
        var n = i - mazeWidth;
        var s = i + mazeWidth;
        var e = i + 1;
        var w = i - 1;
    }

    var border = Math.random() < 0.5 ? "down" : "right";
    if (border == "down") {
        maze[i]["down"] = false;
        maze[i]["right"] = true;
    }
    if (border == "right") {
        maze[i]["down"] = true;
        maze[i]["right"] = false;
    }

}


result += "<table>";
for (var r = 0; r < mazeHeight; r++) {
    result += "<tr>";
    for (var c = mazeWidth * r; c < (mazeWidth * r) + mazeWidth; c++) {
        result += "<td style='";
        if (maze[c]["down"] == true) result += "border-bottom: 1px solid black; ";
        if (maze[c]["right"] == true) result += "border-right: 1px solid black; ";
        result += "'>";

        result += maze[c]["id"];

        result += "</td>";
    }
    result += "</tr>";
}
result += "</table>";


$("#maze").html(result);


$("#maze table").css({
    "table-layout": "fixed",
    "border-collapse": "collapse",
    "border": "1px solid black"
});
$("#maze table td").css({
    "position": "relative",
    "overflow": "hidden",
    "width": cellsSize + "px",
    "height": cellsSize + "px"
});