
// element-attribute @ npm, get/set/remove element attribute, by string or json.

/*
get or set element attribute
	value
		`undefined`
			get the value, refer "json" bellow;
			if not exist, return null;
		null
			remove the attribute;
		others
			set the value, refer "json" bellow;
	json
		false
			force to string type;
		true
			force to json type; if fail when getting, return null;
		`undefined` / "auto"
			when getting,
				return a json-container if parsing success;
				( a json-container is a json-object heading '{', or a json-array heading '[', refer https://json.org);
				in any other cases, or if parsing fail, return the string;
			when setting,
				set as json when the value is a json-container;
				in any other cases, set as string;
*/
var elementAttribute = function (el, name, value, json) {
	if (typeof el === "string") el = document.getElementById(el);
	if (!el) return;

	if (typeof json === "undefined") json = "auto";

	var str, ch0;

	if (typeof value === "undefined") {		//get
		str = el.getAttribute(name);
		if (str === null) return null;	//not exist

		if (json === "auto") {
			ch0 = str.charAt(0);
			if (ch0 === "[" || ch0 === "{") {
				try { return JSON.parse(str); }
				catch (ex) { }	//only try; return string when fail;
			}
		}
		else if (json) {
			try { return JSON.parse(str); }
			catch (ex) {
				console.error("fail to parse json, " + ex + ", " + str);
				return null;	//return null when forcely json fail;
			}
		}

		return str;
	}
	else if (value === null) el.removeAttribute(name);	//remove
	else {		//set
		if (json === "auto") {
			if (typeof value === "object") {
				str = JSON.stringify(value);
				ch0 = str.charAt(0);
				el.setAttribute(name, (ch0 === "[" || ch0 === "{") ? str : value);
			}
			else el.setAttribute(name, value);
		}
		else el.setAttribute(name, json ? JSON.stringify(value) : value);
	}
}

//module exports

module.exports = exports = elementAttribute;

exports.elementAttribute = elementAttribute;

//shrtcuts

exports.get = function (el, name, json) { return elementAttribute(el, name, void 0, json); }
exports.set = elementAttribute;
exports.remove = function (el, name) { return elementAttribute(el, name, null); }
exports.hasName = function (el, name) { return el?.hasAttribute(name); }

exports.json = function (el, name, value) { return elementAttribute(el, name, value, true); }
exports.getJson = function (el, name) { return elementAttribute(el, name, void 0, true); }
exports.setJson = exports.json;
exports.hasJson = function (el, name) { return elementAttribute(el, name, void 0, true) !== null; }

exports.string = exports.str = function (el, name, value) { return elementAttribute(el, name, value, false); }
exports.getString = exports.getStr = function (el, name) { return elementAttribute(el, name, void 0, false); }
exports.setString = exports.setStr = exports.string;
exports.hasString = exports.hasStr = exports.hasName;
