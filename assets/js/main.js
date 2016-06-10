/**
 * Generates a maze
 *
 * @param mazeWidth
 * @param mazeHeight
 * @returns {Array} : an array of cells with down and right parameters
 */
function generateMaze(mazeWidth, mazeHeight) {
    var nbCells = mazeWidth * mazeHeight;

    var maze = [];

    for (var i = 0; i < nbCells; i++) {
        maze.push({
            id: i,
            down: true,
            right: true,
            visited: false
        });
    }

    var open = 0;
    while (open < nbCells -1) {

        //var t = Math.floor(Math.random() * (nbCells-1 + 1));
        var t = open;

        if (!maze[t]["visited"]){

            var current = maze[t];
            current["visited"] = true;

            var nord;
            var sud;
            var est;
            var ouest;

            if (maze[t - mazeWidth] != null) nord = maze[t - mazeWidth];
            else nord = null;
            if (maze[t + mazeWidth] != null) sud = maze[t + mazeWidth];
            else sud = null;
            if ((t) % (mazeWidth) < (t + 1) % (mazeWidth)) est = maze[t + 1];
            else est = null;
            if ((t) % (mazeWidth) > (t - 1) % (mazeWidth) && t - 1 >= 0) ouest = maze[t - 1];
            else ouest = null;

            var yolo = [];
            if (nord != null && nord["id"] != current["id"]) yolo.push("nord");
            if (sud != null && sud["id"] != current["id"]) yolo.push("sud");
            if (est != null && est["id"] != current["id"]) yolo.push("est");
            if (ouest != null && ouest["id"] != current["id"]) yolo.push("ouest");

            var dir = yolo[Math.floor(Math.random() * (yolo.length))];
            switch (dir){
                case "nord":
                    nord["down"] = false;
                    replace(nord["id"], current["id"]);
                    break;
                case "sud":
                    current["down"] = false;
                    replace(sud["id"], current["id"]);
                    break;
                case "est":
                    current["right"] = false;
                    replace(est["id"], current["id"]);
                    break;
                case "ouest":
                    ouest["right"] = false;
                    replace(ouest["id"], current["id"]);
                    break;
            }

            function replace(target, current){
                var tar = IndexOfObject(maze,target,"id");
                while(tar > -1){
                    maze[tar]["id"] = current;
                    tar = IndexOfObject(maze,target,"id");
                }
            }

            open += 1;
        }

    }

    function IndexOfObject(Array, searchTerm, property) {
        for(var i = 0, len = Array.length; i < len; i++) {
            if (Array[i][property] === searchTerm) return i;
        }
        return -1;
    }

    for (var i = 0; i < maze.length; i++){
        delete maze[i]["visited"];
        delete maze[i]["id"];
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
function printResults(mazeWidth, mazeHeight, maze, cellsSizeStyle) {


    var renderer, scene, camera, mesh;

    init();

    function init(){
        // on initialise le moteur de rendu
        renderer = new THREE.WebGLRenderer();

        // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
        // renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById('container').appendChild(renderer.domElement);

        // on initialise la scène
        scene = new THREE.Scene();

        // on initialise la camera que l’on place ensuite sur la scène
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.set(0, 0, 1000);
        scene.add(camera);

        var light = new THREE.DirectionalLight( 0xffffaa, 1 );
        light.position.set( 100, 100, 100 ).normalize();
        scene.add( light );

        var id = 0;
        for (var i = 0; i < mazeHeight; i++){
            var geometry = new THREE.BoxGeometry( cellsSizeStyle/4, cellsSizeStyle, cellsSizeStyle );
            var material = new THREE.MeshPhongMaterial( { color: 0x00ff00, wireframe: true } );
            mesh = new THREE.Mesh( geometry, material );
            mesh.position.setX(-cellsSizeStyle);
            mesh.position.setY((cellsSizeStyle*i));
            scene.add( mesh );
            for (var ii = 0; ii < mazeWidth; ii++){
                if (maze[id]["right"] == true){
                    var geometry = new THREE.BoxGeometry( cellsSizeStyle/4, cellsSizeStyle, cellsSizeStyle );
                    var material = new THREE.MeshPhongMaterial( { color: 0x00ff00, wireframe: true } );
                    mesh = new THREE.Mesh( geometry, material );
                    mesh.position.setX((cellsSizeStyle*ii));
                    mesh.position.setY((cellsSizeStyle*i));
                    scene.add( mesh );
                }
                if (maze[id]["down"] == true){
                    var geometry = new THREE.BoxGeometry( cellsSizeStyle, cellsSizeStyle/4, cellsSizeStyle );
                    var material = new THREE.MeshPhongMaterial( { color: 0x00ff00, wireframe: true } );
                    mesh = new THREE.Mesh( geometry, material );
                    mesh.position.setX((cellsSizeStyle*ii)-10);
                    mesh.position.setY((cellsSizeStyle*i)+10);
                    scene.add( mesh );
                }
                id++;
            }
        }

        for (var iii = 0; iii < mazeWidth; iii++){
            var geometry = new THREE.BoxGeometry( cellsSizeStyle, cellsSizeStyle/4, cellsSizeStyle );
            var material = new THREE.MeshPhongMaterial( { color: 0x00ff00, wireframe: true } );
            mesh = new THREE.Mesh( geometry, material );
            mesh.position.setX((cellsSizeStyle*iii)-(cellsSizeStyle/2));
            mesh.position.setY(-(cellsSizeStyle/2));
            scene.add( mesh );
        }

        var startPosition = new THREE.Vector3( 0, 1000, 1000 );

        var render = function () {


            requestAnimationFrame( render );

            camera.position.set( startPosition.x, startPosition.y, startPosition.z );

            camera.position.x = ($("#3D-cameraX").val())*10;
            camera.position.y = ($("#3D-cameraY").val())*10;
            camera.position.z = ($("#3D-cameraZ").val())*100;

            camera.rotation.x = $("#3D-cameraRotateX").val()/100;
            camera.rotation.y = $("#3D-cameraRotateY").val()/100;
            camera.rotation.z = $("#3D-cameraRotateZ").val()/100;

            renderer.render( scene, camera );
        };

        render();

    }

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
function exportJson(mazeWidth, mazeHeight, maze) {
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
function downloadJson(jsonExportString) {
    var date = new Date();
    var fyr = date.getFullYear();
    var mth = date.getMonth();
    var day = date.getDate();
    var hrs = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var filename = "maze_" + fyr + "-" + mth + "-" + day + "_" + hrs + "h" + min + "m" + sec + "s" + ".json";
    download(jsonExportString, filename, 'application/json');
}

/**
 * Import Json Maze
 *
 * @param jsonImportString
 * @param cellsSizeStyle
 */
function importJson(jsonImportString, cellsSizeStyle) {
    var mazeJson = JSON.parse(jsonImportString);
    return printResults(mazeJson['width'], mazeJson['height'], mazeJson['cells'], cellsSizeStyle);
}

/**
 * Upload Json File and import it
 *
 * @param cellsSizeStyle
 */
function uploadJson(cellsSizeStyle) {
    var file = document.getElementById('file-upload');

    if (file.files.length) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('import').innerHTML = e.target.result;
            importJson(e.target.result, cellsSizeStyle);
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
function download(content, filename, contentType) {
    if (!contentType) contentType = 'application/octet-stream';
    var a = document.createElement('a');
    var blob = new Blob([content], {'type': contentType});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}


$(document).ready(function () {
    var cellsSizeStyle = 20;
    var mazeWidth = 30;
    var mazeHeight = 30;

    // Generate a new maze
    var mazeArray = generateMaze(mazeWidth, mazeHeight);

    // Prints results and get json representation
    var mazeJson = printResults(mazeWidth, mazeHeight, mazeArray, cellsSizeStyle);

    $("#download-json").click(function () {
        downloadJson(mazeJson)
    });
    $("#import-json").click(function () {
        var jsonStringToImport = $("#import").val();
        importJson(jsonStringToImport, cellsSizeStyle);
    });
    $("#upload-json").click(function () {
        uploadJson(cellsSizeStyle);
    });

    $("#options-viewport").click(function () {
        printResults(mazeWidth, mazeHeight, mazeArray, cellsSizeStyle);
    });
    $("#generate-maze").click(function () {
        mazeWidth = Number($("#options-width").val());
        mazeHeight = Number($("#options-height").val());
        mazeArray = generateMaze(mazeWidth, mazeHeight);
        mazeJson = printResults(mazeWidth, mazeHeight, mazeArray, cellsSizeStyle);
    });
});
