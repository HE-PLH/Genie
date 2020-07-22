// console.log(/(?s)\s|\*.*?\*/|//([^\r\n]*)/g.exec(""));

function Generate() {
    this.html = null;
    this.css = null;
    this.css2 = null;
    this.js = null;
    this.html_cont = document.getElementById("genie-paint-field");
    this.primary_css = document.getElementById(`${styleId}`);
    this.secondary_css = document.getElementById(`${classId}`);
    removeCurrentTool();
}

Generate.prototype.init=function(){
    this.html = this.html_cont.innerHTML;
    this.css = this.primary_css.innerHTML;
    this.css2 = this.secondary_css.innerHTML;
    this.generate_html();
    this.generate_primary_css();
    this.generate_secondary_css();
};

Generate.prototype.generate_html=function(){
    let el_x = this.html_cont.cloneNode(true);
    let f = function (el) {
        for (let i in el) {
            if (el.hasOwnProperty(i)) {
                el[i].removeAttribute("style");
                el[i].removeAttribute("contenteditable");
                Methods.apply(systemClasses, (e)=>{
                    el[i].classList.remove(e);
                });
                if (el[i].className === ""){
                    el[i].removeAttribute("class");
                }
                if(el[i]['children'] && el[i]['children'].length > 0) {
                    f(el[i]["children"]);
                }
            }
        }
    };
    f(el_x['children']);
    let el_xx = createDomElement({name: "div"});
    el_xx.appendChild(el_x);
    console.log(`${el_xx.innerHTML}</div>`);
};

Generate.prototype.unwrap=function(rules){
    let str = "";
    Methods.apply(rules, (e)=>{
        str+=e.cssText;
    });
    return str;
};

Generate.prototype.generate_primary_css=function(){
    console.log(`<style id = "${styleId}">${this.unwrap(this.primary_css.sheet.cssRules)}</style>`);
};

Generate.prototype.generate_secondary_css=function(){
    console.log(`<style id = "${styleId}">${this.unwrap(this.secondary_css.sheet.cssRules)}</style>`);
};

