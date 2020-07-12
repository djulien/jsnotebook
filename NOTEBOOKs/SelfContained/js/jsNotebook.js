//notebook common logic:
"use strict";
"TODO: magic-globals";

debug("using ver " + VER);
debug("start: doc state", document.readyState);
//debug("body style", JSON.stringify(document.body.style));
//debug("body comp style", JSON.stringify(window.getComputedStyle(document.body)));
//debug("qry body comp style", JSON.stringify(window.getComputedStyle( document.querySelector("body"))));
//extensions();

//don't start until deferred scripts load:
//if (true); else
//if ((document.readyState == "complete") || ((document.readyState != "loading") && !document.documentElement.app)) main();
//else document.addEventListener("DOMContentLoaded", main);
isready.then(main); //wait for boot loader (stylesheets since this file is already loaded and executing)

//create tabs, select default tab:
function main()
{
debug("READY");
//const props = {};
//for (let name in document.body)
//  if (document.body[name])
//    if (typeof document.body[name] != "function") props[name] = true;
//debug("body props:", Object.keys(props).sort((lhs, rhs) => lhs.localeCompare(rhs)).join(", "));
//debug("body methods", getMethods(document.body).join(", "));
    const notes = document.getElementById("notes") || document.body;
debug(`old notes class '${notes.classList}', bgcolor: '${notes.style.backgroundColor}'`, "inner", notes.innerHTML.length + ":" + notes.innerHTML.slice(0, 30) + " ...");
//document.body.style.background = "#808";
//    applyStyle(document.body, "jsNotebook");
//    dom_elt.classList += className;
    notes.classList.add("jsNotebook");
    notes.setAttribute("contentEditable", true); //mainly for debug
//user_pref("capability.policy.policynames", "allowclipboard");
//user_pref("capability.policy.allowclipboard.sites", "https://www.mozilla.org");
//user_pref("capability.policy.allowclipboard.Clipboard.cutcopy", "allAccess");
//user_pref("capability.policy.allowclipboard.Clipboard.paste", "allAccess");
    notes.addEventListener('input', () =>
    {
        console.log('notes edited');
    });
//document.writeln('<div style="font-size: 30px;">hello</div>');
//document.body.innerHTML += " ";
//    notes.innerHTML = convert notes.innerText; //apply markdown formatting
debug(`new notes class '${notes.classList}', bgcolor: '${notes.style.backgroundColor}'`, "inner", notes.innerHTML.length + ":" + notes.innerHTML.slice(0, 30) + " ...");
return;
//    throw "parent should override main()";
    debug("main: doc state", document.readyState);
//    tabstrip();
    get_title();
    gotab();
return;
    get_notes();
//    Array.from(document.getElementsByClassName("tab-link")).forEach((tab) => tab.className = tab.className.replace(" active", ""));
//    tab.click();
wrap();
return;
    make_tabs();
    fill_tabs();
}

/*
//adapted from https://flaviocopes.com/how-to-list-object-methods-javascript/
function getMethods(obj)
{
  const svobj = obj;
  const methods = {}; //new Set();
  while (obj)
  {
    Object.getOwnPropertyNames(obj)
//      .filter((name) => (typeof svobj[name]) == 'function')
      .forEach((name) => methods[name] = true);
    obj = Object.getPrototypeOf(obj);
  }
  return Object.keys(methods)
    .filter((name) => (typeof svobj[name]) == "function")
    .sort((lhs, rhs) => lhs.localeCompare(rhs));
}

function applyStyle(dom_elt, className)
{
    if (dom_elt.classList.contains(className)) return;
debug("old body class list: ", dom_elt.classList);
//    dom_elt.classList += className;
    dom_elt.classList.add(className);
debug("new body class list: ", dom_elt.classList);
return;
//  dom_elt.style.backgroundColor = "#808";
//  dom_elt.className = "jsNotebook";
//no worky for doc.body    dom_elt.className += style_name;
//no worky for doc.body    dom_elt.addClass(className);
//no worky:
const props = Object.keys(dom_elt).filter((key) => dom_elt[key]);
debug(`${props.length} props:`, props.join(","));
return;
    const old_style = getStyle();
    const new_style = getStyle(className);
    Object.entries(new_style).forEach(([name, value]) =>
    {
debug(`apply ${dom_elt.tagName} style.${name}? `, old_style[name] != value, ` old '${dom_elt.style[name]}' => new '${value}'`);
        if (old_style[name] == value) return; //continue;
        dom_elt.style[name] = value;
    });
}

function getStyle(className)
{
    const id = "kludge";
//kludge: create dummy dom element and read back style attrs
    const tag = Object.assign(document.createElement("div"), {}); //{id, [className || "ignore"]: className});
    if (className) tag.className = className; //document.getElementById(id).className = className;
    tag.id = id;
    tag.appendChild(document.createTextNode("dummy text"));
debug(`add ${tag.tagName} '${className || "null"}' to body`);
    document.body.appendChild(tag);
    const retval = styleof(tag);
    const retval2 = styleof(document.getElementById(id));
debug(`dummy div class = '${document.getElementById(id).className}'`);
if (retval != retval2) throw "ERROR: style mismatch";
debug(`remove ${tag.tagName} '${className || "null"}' to body`);
    document.body.remove(tag); //dummy element no longer needed
    return style2dict(retval);
}

function styleof(dom_elt)
{
    return document.defaultView.getComputedStyle(dom_elt, "").cssText;
}

function style2dict(styleText)
{
    const attrs = styleText
        .matchAll(/([\w\-]+)\s*:\s*([^;\s]*)\s*;/g) || [] //name, value pairs
debug("attrs", JSON.stringify(attrs));
    return Array.from(attrs)
//        .sort((lhs, rhs) => lhs[1].localeCompare(rhs[1]) || lhs[2].localeCompare(rhs[2])) //sort in case order varies; mainly for easier debug
        .reduce((attrs, [_, name, value]) => ((value != "") && (attrs[name.replace(/-\w/g, (str) => str.slice(1).toUpperCase())] = value), attrs), {}); //convert attr name to camel case
}
*/

/*
function tabstrip()
{
    document.getElementById("tabstrip")
        .getElementsByTagName("button") //querySelectorAll(".tabstrip button"));
	.forEach((button) => button.onclick = gotab); //.addEventListener("click", gotab)); //function(evt)
}
*/

function get_title()
{
    document.title = "** " + document.baseURI;
}

function get_notes()
{
//allow user to wrap notes in various ways:
    const notes = get_notes.nodes = [];
    const singleton = document.getElementById("notes");
    if (singleton) notes.push(singleton);
    notes.push(...Array.from(document.getElementsByName("notes")));
    notes.push(...Array.from(document.getElementsByClassName("notes")));
    notes.push(...Array.from(document.getElementsByTagName("notes")));
    notes.push(...Array.from(document.getElementsByTagName("pre"))); //allows text to display if Javascript disabled
    notes.forEach((note) => note.style.display = "none"); //hide HTML markup; styled markup will be displayed later
//    get_notes.indented = notes.reduce((note) => note.innerText.split(/\r?\n))
debug("raw text", escnp(notes.map((note) => note.innerText.replace(/ +$/, "")).join("<hr/>")));
    get_notes.text = notes.map((note) => unindent(note.innerText.replace(/ +$/, ""))).join("<hr/>");
    debug(`found ${plural(notes.length)} notes section${plural.suffix}, textlen ${get_notes.text.length}:'${escnp(get_notes.text)}'`);
//    return get_notes.cached = notes; //.forEach()
}

function wrap()
{
//debug("TODO: move notes to wrapper");
//    const wrapper = `<div id="nb-wrapper"></div>`;
//    document.body.insertAdjacentHTML("beforeend", wrapper);
//    document.getElementById("nb-wrapper").innerText = get_notes.text
//    const wrapper = document.getElementsByTagName("::before") || [];
//debug(wrapper.length);
//debug((document.getElementById("::before") || {}).id);
    document.body.insertAdjacentHTML("beforeend", `<div id="nb-scroller"><h1>title</h1>${get_notes.text}</div>`);
//    const wrapper = document.getElementById("nb-wrapper");
//    wrapper.style = window.getComputedStyle(document.querySelector("body"), ":before");
//debug(JSON.stringify(wrapper.style));
}

function make_tabs()
{
//    const tabs = document.createDocumentFragment();
//    document.body.appendChild(tabs);
//    tabs.innerHTML = `
    const tabs = `
<div class="tabs">
    <button class="tab-link" onclick="gotab(event, this.innerText)" x-id="defaultOpen">Notes</button>
    <button class="tab-link" onclick="gotab(event, this.innerText)">Logic</button>
    <button class="tab-link" onclick="gotab(event, this.innerText)">Styles</button>
    <button class="tab-link" onclick="gotab(event, this.innerText)">Container</button>
    <button class="tab-link" onclick="gotab(event, this.innerText)">Files</button>
</div>
<div id="Notes" class="tab-content">
    <textarea>
        <h3>Notes</h3>
        <p>notes md here</p>
    </textarea>
</div>
<div id="Logic" class="tab-content">
    <textarea>
        <h3>Logic</h3>
        <p>parent js here</p>
    </textarea>
</div>
<div id="Styles" class="tab-content">
    <textarea>
        <h3>Styles</h3>
        <p>parent css here</p>
    </textarea>
</div>
<div id="Container" class="tab-content">
    <textarea>
        <h3>Container</h3>
        <p>parent html here</p>
    </textarea>
</div>
<div id="Files" class="tab-content">
    <textarea>
        <h3>Files</h3>
        <p>file mgr here</p>
    </textarea>
</div>
`;
    document.body.insertAdjacentHTML("beforeend", tabs);
    make_tabs.links = Array.from(document.getElementsByClassName("tab-link"));
    make_tabs.contents = Array.from(document.getElementsByClassName("tab-content"));
    debug(`made ${plural(make_tabs.links.length)} tab${plural.suffix}, ${plural(make_tabs.contents.length)} tab content${plural.suffix}`);
}

//NOTE: HTML is not sanitized, according to https://marked.js.org/#/README.md#README.md
function fill_tabs()
{
//    document.getElementById("Notes").insertAdjacentHTML("beforeend", `<pre x-id="notes">${get_notes.text || "(notes here)"}</pre>`);
//    document.getElementById("Notes").getElementsByTagName("textarea")[0].innerText = get_notes.text || "(no notes)";
//    document.getElementById("Notes").innerHTML = marked(get_notes.text || "(no notes)");
    CodeMirror.fromTextArea(document.getElementById("Notes").getElementsByTagName("textarea")[0])
}

function gotab(evt, label) //= {target: document.getElementiById("tabstrip").getElementsByTagName("button")[0]}, label)
{
    if (!gotab.tabs) //first time: cache data
//    {
	gotab.tabs = Array.from(document.getElementsByClassName("tabstrip")) //[]; //in case more than 1 tabstrip (useless?)
            .reduce((alltabs, tabstrip) =>
		(alltabs.push(...Array.from(tabstrip.getElementsByTagName("button")).map((button) =>
		    ({
			button: (button.onclick = gotab, button),
			contents: document.getElementById(button.innerText),
		    }))),
	         alltabs), []);
//	        .map((tab) => alltabs.push(tab)));
debug("got", gotab.tabs.length, "tabs using selector");
//        .getElementsByTagName("button") //querySelectorAll(".tabstrip button"));
//	gotab.buttons.forEach((button) => button.onclick = gotab); //.addEventListener("click", gotab)); //function(evt)
//        gotab.links = Array.from(document.getElementsByClassName("tab-link"));
//        gotab.contents = Array.from(document.getElementsByClassName("tab-content"));
//    }
    const target = ((evt || {}).currentTarget || gotab.tabs[0].button); //default first tab
//debug("caller evt.target", ((evt || {}).currentTarget || gotab.buttons[0]).tagName); //JSON.stringify(event.target));
//debug("caller this", ((evt || {}).currentTarget || gotab.buttons[0]).innerText); //JSON.stringify(this));
//    const links2 = Array.from(document.getElementById("tabstrip").getElementsByTagName("button")); //querySelector(".tabstrip button"));
debug("go tab", label || target.innerText || "(first)", "of", gotab.tabs.length);
//debug(typeof document.getElementsByClassName("tab-content"), JSON.stringify(document.getElementsByClassName("tab-content")));
    gotab.tabs.forEach(({button, contents}) =>
    {
	const select = (button.innerText == target.innerText) && " active";
	button.className = button.className.replace(" active", "") + (select || "");
        contents.style.display = select? "block": "none";
    });
}

//function tab(label, contents)
//{
//    return `
//        <div id="${label}" class="tab-content">
//            ${contents || "<h3>(${label} contents here)</h3>" || "<p>${label} contents here ...</p>"}
//        </div>`;
//}

function junk()
{
//simple markdown example editor is at: https://vuejs.org/v2/examples/index.html#Markdown%20Editor
//fancier markdown editor (based on Toast UI editor): https://panjiachen.github.io/vue-element-admin/#/components/markdown
//split panes example from: https://github.com/yansern/vue-multipane

//in case parent doesn't override:
//        const { Splitpanes, Panel} = splitpanes;
//        import { Multipane, MultipaneResizer } from "../node_modules/vue-multipane/dist/vue-multipane.js";
  new Vue(
  {
    el: "#app",
    components: {splitpanes},
  });
/*
  const app = new Vue(
  {
    el: "#editor",
    data: { input: "# hello", },
    computed:
    {
      compiledMarkdown: function() { return marked(this.input, { sanitize: true}); },
    },
    methods:
    {
      update: _.debounce(function(e) { this.input = e.target.value; }, 300),
    },
  });
*/
}

function junk_html()
{
/*
    <splitpanes class="default-theme">
      <pane min-sie="10">
        <div>editor<br/>EDITOR</div>
      </pane>
      <pane>
          <div>preview<br/>PREVIEW</div>
      </pane>
    </splitpanes>
    <div id="editor">
      <textarea :value="input" @input="update"></textarea>
      <div v-html="compiledMarkdown"></div>
    </div>
    <div id="app-2">
      <span v-bind:title="message">
        hover mouse for a few sec
        to see dyn title
      </span>
    </div>
*/
}

function unindent(str)
{
//debug(str.charCodeAt(0), str.charCodeAt(1), str.charCodeAt(9), str.charCodeAt(10));
    const indented = str.match(/^\r?\n?([^\S\r\n]+)/) || [, ""]; //check indentation of first line
    debug("indent len", indented[1].length, escnp(indented[1]));
    return (indented[1].length? str.replace(new RegExp(`^\\r?\\n?\\s{${indented[1].length}}`, "gm"), ""): str)
        .replace(/[^\S\r\n]+$/, ""); //trim trailng horiz space as well as well
}

function plural(n, multi, single)
{
    plural.suffix = (n == 1)? single || "": multi || "s";
    return n; //fluent
}

//escape non-printing chars (for debug):
function escnp(str, {use_color = true, keep_color = true, show_spaces = true, want_newline = false} = {}) //, radix = null, arysep = null} = {})
{
    const VisibleSpace = "\u00b7"; //String.fromCharCode(0xa4); //easier for debug of len/spacing
    const ColorPlaceholder = "\ubeef"; //placeholder to preserve color codes
    const NewlinePlaceholder = "\ufeed"; //placeholder to preserve color codes
    const highlight = /*use_color? (str) => str.cyan_lt:*/ (str) => str;
    return str.toString()
        .replace(/\r/g, highlight("\\r"))
        .replace(/\n/g, want_newline? NewlinePlaceholder: highlight("\\n"))
        .replace(/\t/g, highlight("\\t"))
        .replace(/[\u1000-\uffff]/g, (ch) => highlight(`\\u${ch.charCodeAt(0).toString(16).padStart(4, "0")}`))
        .replace(/\x1b(?=\[[\d;]+m)/g, keep_color? ColorPlaceholder: highlight("\\[")) //use placeholder to preserve color codes
        .replace(/[^\x20-\x7e]/g, (ch) => highlight(`\\x${ch.charCodeAt(0).toString(16).padStart(2, "0")}`))
        .replace(/\ubeef/g, "\x1b") //restore color codes
        .replace(/\ufeed/g, "\n") //restore newlines
        .replace(/ /g, show_spaces? VisibleSpace: " "); //make it easier to see white space
 }

function debug(...args)
{
//        const err = new Error(); //Error.captureStackTrace(err);
    const stkfr = (new Error()).stack.split("\n")[1];
    const srcline = stkfr.replace(/^.*?(:\d+:\d+)(:\d+)?$/i, "@$1");
//console.log(stkfr);
    console.log("DEBUG:", ...args, srcline);
}

//function extensions()
//{
//    Object.defineProperty(Array.prototype, "push_fluent", {value: function(...args) { this.push(...args); return this; }});
//}

debug("js loaded");
//eof
