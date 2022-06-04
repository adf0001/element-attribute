# element-attribute
get/set/remove element attribute, by string or json.

# Install
```
npm install element-attribute
```

# Usage & Api
```javascript

var element_attribute = require("element-attribute");

_ele('divResult3').innerHTML = '<span id=sp1>sp1</span>';

var el = document.getElementById("sp1");

/*
elementAttribute(el, name, value, json)

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

//shortcuts

	.get(el, name, json)
	.set(el, name, value, json)
	.remove(el, name)
	.hasName(el, name)

	.json(el, name, value)
	.getJson(el, name)
	.setJson(el, name, value)
	.hasJson(el, name)

	.string(el, name, value)
	.getString(el, name)
	.setString(el, name, value)
	.hasString(el, name)
*/

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

```
