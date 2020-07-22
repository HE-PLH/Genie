let top_display = null,left_display = null, width_display = null,height_display = null, newProp = null;
function renderStyle(property, val, m, c, ind) {
    property = property.trim();
    val = val.trim();
    let el = createDomElement({name: "div", class: "rule-prop"});
    let del = createDomElement({name: "span", class: "rule-prop-delete bl", appendTo: el});
    del.innerHTML = `<svg viewBox="0 0 24 24" class="ic" width="24px" height="24px">
                <use xlink:href="../sources/svg_icons.svg#delete"></use>
            </svg>`;
    let cb = createDomElement({name: "input", class: "rule-prop-check-box", appendTo: el});
    cb.type = "checkbox";
    cb.checked = true;
    let p = createDomElement({name: "input", class: "prop", appendTo: el, value: `${property}`});
    p.type = "text";
    p.style.width = (property.length+1)*6+'px';
    createDomElement({name: "span", class: "colon", appendTo: el, innerHTML: `:`});
    let v = createDomElement({name: "input", class: "val", appendTo: el, value: `${val}`});
    v.type = "text";
    v.style.width = (val.length+1)*6+'px';
    createDomElement({name: "span", class: "s-colon", appendTo: el, innerHTML: `;`});
    if (!c) {
        switch (property) {
            case "top":
                top_display = v;
                v.style.width = (val.length+1)*8+'px';
                break;
            case "left":
                left_display = v;
                v.style.width = (val.length+1)*8+'px';
                break;
            case "width":
                width_display = v;
                break;
            case  "height":
                height_display = v;
                break;
        }
    }
    return el;
}

function syncStyle() {

}

function style_object(cssText){
   return cssText.substring(cssText.indexOf("{")+1).split("}")[0].split(";");
}

function get_all_styles(cont, cont_id, el) {
    let rules, rule, c = false;
    while (el.parentNode&&(el.id!==cont_id)){
        rules = Styling.get_style(el.id,"",el.ruleIndex, true);
        if (rules) {
            rules = style_object(rules.cssText);
            let d = createDomElement({name: "div", class: "rule-props-cont"});
            d.ruleIndex = el.ruleIndex;
            let e = createDomElement({name: "div", class: "rule-prop carrying  el_prop", appendTo: d});
            createDomElement({name: "div", class: "arrow expanded", prependTo: e});
            e.el = el;
            createDomElement({name: "input", class: "prop", appendTo: e, value: `${'#'+el.id + " {"}`}).type = "text";
            for (let i = 0, len = rules.length - 1; i < len; i++) {
                rule = Methods.single_split(rules[i], ":");
                d.appendChild(renderStyle(rule[0], rule[1], el.ruleIndex, c))
            }
            e = createDomElement({name: "div", class: "rule-prop  el_prop", appendTo: d});
            createDomElement({name: "span", class: "prop c-l", appendTo: e, innerHTML: '}'}).ruleIndex = el.ruleIndex;
            cont.appendChild(d);
            el = el.parentNode;
            c = true;
        }
    }
    return cont;
}

function Styles(el){
    this.styleParentId = "genie-styles-main-top";
    this.parentContainer = document.getElementById(`${this.styleParentId}`);
    this.container = null;
    this.element = el;
}

Styles.prototype.init = function () {
    this.parentContainer.innerHTML = "";
    this.container = createDomElement({name: "div", class: "styles"});
    get_all_styles(this.parentContainer, "genie-paint-field", this.element);
};

function allClsLoop(rule, index) {
    let title = rule.substring(0, rule.indexOf("{"));
    rule = style_object(rule);
    // console.log(rule);
    let d = createDomElement({name: "div", class: "rule-props-cont"});
    d.ruleIndex = index;
    createDomElement({name: "div", class: "rule-props-cont-del bl", appendTo: d}).innerHTML = `<svg viewBox="0 0 24 24" class="ic" width="24px" height="24px">
                <use xlink:href="../sources/svg_icons.svg#delete"></use>
            </svg>`;
    let e = createDomElement({name: "div", class: "rule-prop carrying el_prop", appendTo: d});
    e.el = {ruleIndex: index, id: title.split(".")[1]};
    createDomElement({name: "div", class: "arrow expanded", prependTo: e});
    createDomElement({name: "input", class: "prop", appendTo: e, value: `${title + " {"}`}).type = "text";
    //let ul = createDomElement({name: "ul", class: "el_prop"});
    for (let i = 0, len = rule.length - 1; i < len; i++) {
        let r = Methods.single_split(rule[i], ":");
        d.appendChild(renderStyle(r[0], r[1], index, true, "rI"));
    }
    createDomElement({name: "span", class: "prop c-l", appendTo: d, innerHTML: '}'}).rI = index;
    return d;
}

function Classes() {
    this.allClassContainer = document.getElementById("all-cls-pl");
    this.classSheet = document.getElementById(`${classId}`);
}

Classes.prototype.init = function () {
    this.container = createDomElement({name: "div", class: "styles"});
    this.loadAllClasses();
    // get_all_styles(this.parentContainer, "genie-paint-field", this.element);
};

Classes.prototype.createNewClass = function (title) {
    this.container = document.querySelector(".styles");
    let rules = `.${title.split(".")[1]}{}`, index = this.classSheet.sheet.cssRules.length;
    this.container.appendChild(allClsLoop(rules, index));
    this.classSheet.sheet.insertRule(`${rules}`, index);
};

Classes.prototype.getAllClasses = function () {
    let rules = this.classSheet.sheet.cssRules;
    let cont = document.getElementById("genie-all-cls-main");
    cont.innerHTML = "";
    let f = (text)=>{
        let d = createDomElement({name: "div", class: "choose-cls-cont"});
        let cb = createDomElement({name: "input", class: "choose-cls", appendTo: d});
        cb.type = "checkbox";
        createDomElement({name: "span", class: "cls-title", appendTo: d, innerHTML: text});
        cont.appendChild(d)
    };
    Methods.apply(rules, (e)=>{f(e.selectorText);});
    // console.log(rules);
};

Classes.prototype.loadAllClasses = function () {
    let rules = this.classSheet.sheet.cssRules;
    for (let i in rules){
        if (rules.hasOwnProperty(i)) {
            this.container.appendChild(allClsLoop(rules[i].cssText, i));
        }
    }
    this.allClassContainer.appendChild(this.container);
};
new Classes().init();
new Classes().getAllClasses();