let top_display = null,left_display = null, width_display = null,height_display = null, newProp = null;
function renderStyle(property, val, m, c) {
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
    let p = createDomElement({name: "input", class: "prop", appendTo: el, value: `${property}:`});
    p.type = "text";
    p.style.width = (property.length+1)*7+'px';
    let v = createDomElement({name: "input", class: "val", appendTo: el, value: `${val};`});
    v.type = "text";
    v.style.width = (val.length+1)*7+'px';
    if (!c) {
        switch (property) {
            case " top" || "top":
                top_display = v;
                break;
            case " left" || "left":
                left_display = v;
                break;
            case " width" || "width":
                width_display = v;
                break;
            case " height" || "height":
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
            createDomElement({name: "input", class: "prop", appendTo: e, value: `${"}"}`}).pointerEvents = "none";
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


