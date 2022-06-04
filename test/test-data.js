
//global variable, for html page, refer tpsvr @ npm.
element_attribute = require("../element-attribute.js");

module.exports = {

	"element_attribute": function (done) {
		if (typeof window === "undefined") throw "disable for nodejs";

		_ele('divResult3').innerHTML = '<span id=sp1>sp1</span>';

		var el = document.getElementById("sp1");

		element_attribute(el, "a1", 999);
		element_attribute(el, "a1b", "999", true);	//json

		element_attribute(el, "a2", 999);
		element_attribute(el, "a2", null);	//remove

		element_attribute(el, "a3", { b: 1 }, true);	//json
		element_attribute(el, "a3b", { b: 1 });	//json
		element_attribute(el, "a3c", [1, 2]);	//json

		element_attribute(el, "a4", void 0, true);		//get, not json
		element_attribute(el, "a5", null, true);	//remove, not json

		element_attribute(el, "a6", '{"b":1');	//broken json

		//console.log(element_attribute(el, "a6", void 0, true));

		done(!(
			element_attribute(el, "a1") == 999 &&
			element_attribute(el, "a1") !== 999 &&
			element_attribute(el, "a1") === "999" &&

			element_attribute(el, "a1", void 0, true) === 999 &&

			element_attribute(el, "a1b") === '"999"' &&
			element_attribute(el, "a1b", void 0, true) === "999" &&

			element_attribute(el, "a111") === null &&

			!el.hasAttribute("a2") &&

			element_attribute(el, "a3", void 0, false) === '{"b":1}' &&
			JSON.stringify(element_attribute(el, "a3", void 0, true)) === '{"b":1}' &&
			JSON.stringify(element_attribute(el, "a3")) === '{"b":1}' &&

			element_attribute(el, "a3b", void 0, false) === '{"b":1}' &&
			JSON.stringify(element_attribute(el, "a3b", void 0, true)) === '{"b":1}' &&
			JSON.stringify(element_attribute(el, "a3b")) === '{"b":1}' &&

			element_attribute(el, "a3c", void 0, false) === '[1,2]' &&
			JSON.stringify(element_attribute(el, "a3c", void 0, true)) === '[1,2]' &&
			JSON.stringify(element_attribute(el, "a3c")) === '[1,2]' &&

			!el.hasAttribute("a4") &&
			element_attribute(el, "a4", void 0, true) === null &&	//get, not json

			!el.hasAttribute("a5") &&

			element_attribute(el, "a6", void 0, true) === null &&
			element_attribute(el, "a6") === '{"b":1' &&

			true
		));
	},

	"shortcuts": function (done) {
		if (typeof window === "undefined") throw "disable for nodejs";

		_ele('divResult3').innerHTML = '<span id=sp1>sp1</span>';

		var el = document.getElementById("sp1");

		element_attribute.set(el, "a1", 999);
		element_attribute.json(el, "a1b", "999");

		element_attribute.set(el, "a2", 999);
		element_attribute.remove(el, "a2");	//remove

		element_attribute.json(el, "a3", { b: 1 });	//json
		element_attribute.set(el, "a3b", { b: 1 });	//json
		element_attribute.set(el, "a3c", [1, 2]);	//json

		element_attribute.get(el, "a4");		//get, not json
		element_attribute.remove(el, "a5");	//remove, not json

		element_attribute.set(el, "a6", '{"b":1');	//broken json

		done(!(
			element_attribute.get(el, "a1") == 999 &&
			element_attribute.get(el, "a1") !== 999 &&
			element_attribute.get(el, "a1") === "999" &&
			element_attribute.getJson(el, "a1") === 999 &&

			element_attribute.str(el, "a1b") === '"999"' &&
			element_attribute.json(el, "a1b") === "999" &&

			element_attribute.get(el, "a111") === null &&

			!element_attribute.hasName(el, "a2") &&

			element_attribute.getStr(el, "a3") === '{"b":1}' &&
			JSON.stringify(element_attribute.getJson(el, "a3")) === '{"b":1}' &&
			JSON.stringify(element_attribute.get(el, "a3")) === '{"b":1}' &&

			element_attribute.getString(el, "a3b") === '{"b":1}' &&
			JSON.stringify(element_attribute.getJson(el, "a3b")) === '{"b":1}' &&
			JSON.stringify(element_attribute.get(el, "a3b")) === '{"b":1}' &&
			JSON.stringify(element_attribute.json(el, "a3b")) === '{"b":1}' &&

			element_attribute.str(el, "a3c") === '[1,2]' &&
			JSON.stringify(element_attribute.getJson(el, "a3c")) === '[1,2]' &&
			JSON.stringify(element_attribute.get(el, "a3c")) === '[1,2]' &&
			JSON.stringify(element_attribute.json(el, "a3c")) === '[1,2]' &&

			!element_attribute.hasName(el, "a4") &&
			element_attribute.getJson(el, "a4") === null &&	//get, not json

			!element_attribute.hasName(el, "a5") &&

			element_attribute.getJson(el, "a6") === null &&
			element_attribute.get(el, "a6") === '{"b":1' &&
			!element_attribute.hasJson(el, "a6") &&
			element_attribute.hasName(el, "a6") &&
			element_attribute.hasString(el, "a6") &&

			true
		));
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('element_attribute', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
