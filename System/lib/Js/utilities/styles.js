let top_display = null,left_display = null, width_display = null,height_display = null, newProp = null;
function renderStyle(property, val, m, c) {
    property = property.trim();
    val = val.trim();
    let el = createDomElement({name: "div", class: "rule-prop"});
    let del = createDomElement({name: "span", class: "rule-prop-delete", appendTo: el});
    del.innerHTML = `<svg viewBox="0 0 24 24" class="ic" width="24px" height="24px">
                <use xlink:href="../sources/svg_icons.svg#delete"></use>
            </svg>`;
    let cb = createDomElement({name: "input", class: "rule-prop-check-box", appendTo: el});
    cb.type = "checkbox";
    cb.ruleIndex = m;
    del.ruleIndex = m;
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
            let e = createDomElement({name: "div", class: "rule-prop  el_prop", appendTo: d});
            e.el = el;
            createDomElement({name: "input", class: "prop", appendTo: e, value: `${'#'+el.id + " {"}`}).type = "text";
            for (let i = 0, len = rules.length - 1; i < len; i++) {
                rule = Methods.single_split(rules[i], ":");
                d.appendChild(renderStyle(rule[0], rule[1], el.ruleIndex, c))
            }
            e = createDomElement({name: "div", class: "rule-prop  el_prop", appendTo: d});
            createDomElement({name: "span", class: "prop", appendTo: e, innerHTML: '}'}).ruleIndex = el.ruleIndex;
            cont.appendChild(d);
            el = el.parentNode;
            c = true;
        }
    }
    return cont;
}

function Styles(el){
    this.styleParentId = "genie-styles-main";
    this.parentContainer = document.getElementById(`${this.styleParentId}`);
    this.container = null;
    this.element = el;
}

Styles.prototype.init = function () {
    this.parentContainer.innerHTML = "";
    this.container = createDomElement({name: "div", class: "styles"});
    get_all_styles(this.parentContainer, "genie-paint-field", this.element);
};

function allClsLoop(rules, container) {
    let f = (rule, index)=>{
        let title = rule.substring(0, rule.indexOf("{"));
        rule = style_object(rule);
        // console.log(rule);
        let d = createDomElement({name: "div", class: "rule-props-cont"});
        let e = createDomElement({name: "div", class: "rule-prop  el_prop", appendTo: d});
        createDomElement({name: "input", class: "prop", appendTo: e, value: `${title + " {"}`}).type = "text";
        //let ul = createDomElement({name: "ul", class: "el_prop"});
        console.log(rule)
        for (let i = 0, len = rule.length - 1; i < len; i++) {
            let r = Methods.single_split(rule[i], ":");
            d.appendChild(renderStyle(r[0], r[1], index, true));
        }
        return d;
    };
    for (let i in rules){
        if (rules.hasOwnProperty(i)) {
            container.appendChild(f(rules[i].cssText, i));
        }
    }
    return container;
}

function Classes() {
    this.allClassContainer = document.getElementById("all-cls-pl");
    this.classSheet = document.getElementById("element-utilities");
}

Classes.prototype.init = function () {
    this.container = createDomElement({name: "div", class: "styles"});
    this.loadAllClasses();
    // get_all_styles(this.parentContainer, "genie-paint-field", this.element);
};

Classes.prototype.createNewClass = function () {

};

Classes.prototype.loadAllClasses = function () {
    this.allClassContainer.appendChild(allClsLoop(this.classSheet.sheet.cssRules, this.container));
};
new Classes().init();