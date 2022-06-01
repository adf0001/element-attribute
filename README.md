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
		if value is "undefined", get and return the value;
			if not exist, return null;
			else
				if json is true, return the json object;
				else return the string;
		if value is null, remove the attribute;
		in othercases, set the attribute value as a string, or a json string;
	json
		boolean type

//shrtcuts

	.get(el, name, json)
	.set(el, name, value, json)
	.remove(el, name)
	.has(el, name)

	.json(el, name, value)
	.getJson(el, name)
	.setJson(el, name, value)
	.hasJson(el, name)

*/

element_attribute(el, "a1", 999);

element_attribute(el, "a2", 999);
element_attribute(el, "a2", null);	//remove

element_attribute(el, "a3", { b: 1 }, true);	//json

element_attribute(el, "a4", void 0, true);		//get, not json
element_attribute(el, "a5", null, true);	//remove, not json

element_attribute(el, "a6", '{"b":1');	//broken json

done(!(
	element_attribute(el, "a1") == 999 &&
	element_attribute(el, "a1") !== 999 &&
	element_attribute(el, "a1") === "999" &&

	element_attribute(el, "a111") === null &&

	!el.hasAttribute("a2") &&

	element_attribute(el, "a3") === '{"b":1}' &&
	JSON.stringify(element_attribute(el, "a3", void 0, true)) === '{"b":1}' &&

	!el.hasAttribute("a4") &&
	element_attribute(el, "a4", void 0, true) === null &&	//get, not json

	!el.hasAttribute("a5") &&

	element_attribute(el, "a6", void 0, true) === null &&
	element_attribute(el, "a6") === '{"b":1' &&

	true
));

```
