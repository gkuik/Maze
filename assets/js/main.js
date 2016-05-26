/**
 * Generates a maze
 *
 * @param mazeWidth
 * @param mazeHeight
 * @returns {Array} : an array of cells with down and right parameters
 */
function generateMaze(mazeWidth, mazeHeight) {
    var nbCells = mazeWidth * mazeHeight;

    var maze = new Array();

    for (var i = 0; i < nbCells; i++) {
        maze.push({
            down: true,
            right: true
        });
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

    return maze;
}

/**
 * Prints the maze in html table and returns json
 *
 * @param mazeWidth
 * @param mazeHeight
 * @param maze (Array) : an array of cells with down and right parameters
 * @returns (String) : a json representation of the maze
 */
function printResults(mazeWidth, mazeHeight, maze, cellsSizeStyle){
    var result = "";
    var adapt = $('#options-viewport').is(':checked');

    result += "<table>";
    for (var r = 0; r < mazeHeight; r++) {
        result += "<tr>";
        for (var c = mazeWidth * r; c < (mazeWidth * r) + mazeWidth; c++) {
            result += "<td style='";
            if (maze[c]["down"] == true) result += "border-bottom: 1px solid black; ";
            if (maze[c]["right"] == true) result += "border-right: 1px solid black; ";
            result += "'>";
            result += c;
            result += "</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    // Show maze
    $("#maze").html(result);

    $("#maze table").css({
        "table-layout": "fixed",
        "border-collapse": "collapse",
        "border": "1px solid black"
    });

    if(adapt == true) {
        $("#maze table td").css({
            "position": "relative",
            "overflow": "hidden",
            "width": 50/mazeWidth + "vw",
            "lineHeight": 50/mazeHeight*1.5 + "vh"
        });
    } else {
        $("#maze table td").css({
            "position": "relative",
            "overflow": "hidden",
            "width": cellsSizeStyle + "px",
            "height": cellsSizeStyle + "px"
        });
    }

    // Return json string
    return exportJson(mazeWidth, mazeHeight, maze);
}

/**
 * Constructs json file with maze parameters
 *
 * @param mazeWidth
 * @param mazeHeight
 * @param maze (Array) : an array of cells with down and right parameters
 * @returns (String) : a json representation of the maze
 */
function exportJson(mazeWidth, mazeHeight, maze){
    var jsonExport = {};

    jsonExport['cells'] = maze;
    jsonExport['height'] = mazeHeight;
    jsonExport['width'] = mazeWidth;
    var jsonExportString = JSON.stringify(jsonExport);

    $("#export").val(jsonExportString);

    return jsonExportString;
}

/**
 * Downloads json file with timestamp
 *
 * @param jsonExportString
 */
function downloadJson(jsonExportString){
    var date = new Date();
    var fyr = date.getFullYear();
    var mth = date.getMonth();
    var day = date.getDate();
    var hrs = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var filename = "maze_" + fyr + "-" + mth + "-" + day + "_" + hrs + "h" + min + "m" + sec + "s" + ".json";
    download(jsonExportString, filename ,'application/json');
}

/**
 * Import Json Maze
 *
 * @param jsonImportString
 * @param cellsSizeStyle
 */
function importJson(jsonImportString,cellsSizeStyle){
    var mazeJson = JSON.parse(jsonImportString);
    return printResults(mazeJson['width'], mazeJson['height'], mazeJson['cells'],cellsSizeStyle);
}

/**
 * Upload Json File and import it
 *
 * @param cellsSizeStyle
 */
function uploadJson(cellsSizeStyle)
{
    var file = document.getElementById('file-upload');

    if(file.files.length)
    {
        var reader = new FileReader();

        reader.onload = function(e)
        {
            document.getElementById('import').innerHTML = e.target.result;
            importJson(e.target.result,cellsSizeStyle);
        };

        reader.readAsBinaryString(file.files[0]);

    }
}

/**
 * Download tool
 *
 * @param content
 * @param filename
 * @param contentType
 */
function download(content, filename, contentType)
{
    if(!contentType) contentType = 'application/octet-stream';
    var a = document.createElement('a');
    var blob = new Blob([content], {'type':contentType});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}


$(document).ready(function () {
    var cellsSizeStyle = 20;
    var mazeWidth = 30;
    var mazeHeight = 30;

    // Generate a new maze
    var mazeArray = generateMaze(mazeWidth,mazeHeight);

    // Prints results and get json representation
    var mazeJson = printResults(mazeWidth,mazeHeight,mazeArray,cellsSizeStyle);

    $("#download-json").click(function(){
        downloadJson(mazeJson)
    });
    $("#import-json").click(function(){
        var jsonStringToImport = $("#import").val();
        importJson(jsonStringToImport,cellsSizeStyle);
    });
    $("#upload-json").click(function(){
        uploadJson(cellsSizeStyle);
    });

    $("#options-viewport").click(function() {
        printResults(mazeWidth,mazeHeight,mazeArray,cellsSizeStyle);
    });
    $("#generate-maze").click(function(){
        mazeWidth = Number($("#options-width").val());
        mazeHeight = Number($("#options-height").val());
        mazeArray = generateMaze(mazeWidth,mazeHeight);
        mazeJson = printResults(mazeWidth,mazeHeight,mazeArray,cellsSizeStyle);
    });
});
