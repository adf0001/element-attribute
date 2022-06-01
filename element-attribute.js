
// element-attribute @ npm, get/set/remove element attribute, by string or json.

/*
get or set element attribute
	value
		if value is "undefined", get and return the value;
			if not exist, return null;
			else
				if json is true, return the json object;
				else return the string;
		if value is null, remove the attribute;
		in othercases, set the attribute value as a string, or a json string;
	json
		boolean type
*/
var elementAttribute = function (el, name, value, json) {
	if (typeof el === "string") el = document.getElementById(el);
	if (!el) return;

	if (typeof value === "undefined") {		//get
		var v = el.getAttribute(name);
		if (v === null) return null;	//not exist

		if (!json) return v;

		try {
			return JSON.parse(v);
		}
		catch (ex) {
			console.error("fail to parse json, " + ex);
			return null;
		}
	}
	else if (value === null) el.removeAttribute(name);	//remove
	else el.setAttribute(name, json ? JSON.stringify(value) : value);		//set
}

//module exports

module.exports = exports = elementAttribute;

exports.elementAttribute = elementAttribute;

//shrtcuts

exports.get = function (el, name, json) { return elementAttribute(el, name, void 0, json); }
exports.set = elementAttribute;
exports.remove = function (el, name) { return elementAttribute(el, name, null); }
exports.has = function (el, name) { return elementAttribute(el, name) !== null; }

exports.json = function (el, name, value) { return elementAttribute(el, name, value, true); }
exports.getJson = function (el, name) { return elementAttribute(el, name, void 0, true); }
exports.setJson = exports.json;
exports.hasJson = function (el, name) { return elementAttribute(el, name, void 0, true) !== null; }
