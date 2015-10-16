var path = require("path");
var fs = require("fs");
var cheerio = require("cheerio");

var exercisesPath = "exercises.js";
var finalOutputPath = "exercises.html";
var doccoOutputFolder = "docco output";
var doccoOutputFile = "exercises.html";
var docoHtmlPath = path.join(__dirname, doccoOutputFolder, doccoOutputFile);

var liveReloadSrc = "http://localhost:9091/livereload.js";

fs.readFile(docoHtmlPath, function (err, html) {
	if (err) throw err;

	$ = cheerio.load(html);
	$('link[rel="stylesheet"]').attr("href", doccoOutputFolder + "/docco.css");
	$('head')
		.append('\n  <!-- Imports Section -->')
		.append('\n  <script src="bower_components/ramda/dist/ramda.js"></script>')
		.append('\n  <script src="bundle.js"></script>')
		.append('\n  <!-- Jasmine Section -->')
		.append('\n  <link rel="stylesheet" href="bower_components/jasmine-core/lib/jasmine-core/jasmine.css">')
		.append('\n  ')
		.append('\n  <script src="bower_components/jasmine-core/lib/jasmine-core/jasmine.js"></script>')
		.append('\n  <script src="bower_components/jasmine-core/lib/jasmine-core/jasmine-html.js"></script>')
		.append('\n  <script src="bower_components/jasmine-core/lib/jasmine-core/boot.js"></script>')
		.append('\n  ')
		.append('\n  <script src="' + exercisesPath +'"></script>')
		.append('\n  <!-- END Jasmine Section -->')
		.append('\n  <script src="' + liveReloadSrc + '"></script>');

	fs.writeFile(finalOutputPath, $.html(), function (err) {
		if (err) throw err;

		console.log('generated file with jasmine tests and docco output > ' + finalOutputPath);
	});
});
