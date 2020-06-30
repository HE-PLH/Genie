let currentResize = "Q", center = {x:0, y:0};
let parentWidth = 0, parentHeight = 0;
let virtual_appender = createDomElement({name:"div"});
let boundary = {
    el: document.getElementById("genie-paint-field"),
    x: 0,
    y: 0
},ml = 0,mt = 0,mw = 0,mh = 0, unitX ="", unitY ="", percX =false, percY =false;

let Elements = {};
let ruleIndex = 1;
let styleId = "element";
let styleElement = document.getElementById(`${styleId}`);

let Styling = {
    changeRule: (rule, index) => {
        styleElement.sheet.deleteRule(index);
        styleElement.sheet.insertRule(rule, index);
    },
    commentRuleProperty : (property, value,index) => {
        property = property.split(":")[0];
        if (property.match(/\b/g)) {
            let t = Styling.get_style("","", index, true).cssText;
            value = value.split(";")[0];
            let r = t.replace(new RegExp(`\\b(?:${property}\\s*?:\\s*([^;>]*?)(?=[;">}]))`), `/*${property}:${value}*/`);
            Styling.changeRule(r, index);
        }
        else{
            console.log("empty")
        }
    },
    UncommentRuleProperty : (property, value,index) => {
        property = property.split(":")[0];
        value = value.split(";")[0];
        if (!(property === "" || value === "")) {
            Styling.edit_style("", property, value, index)
        }
    },
    init_style : (rules) => {
        let styleSheet = styleElement.sheet;
        ruleIndex = styleSheet.cssRules.length;
        //ruleIndex = styleSheet.cssRules.length;
        rules = rules.split("}");
        for (let st = -1; st < rules.length; st++) {
            if (rules.hasOwnProperty(st) && rules[st] !== "") {
                styleSheet.insertRule(`${rules[st]}`, ruleIndex);
            }
        }

    },
    edit_style : (cls,property,value,ruleI) => {
        let rules = styleElement.sheet.cssRules || styleElement.rules;
        if (ruleIndex !== undefined) {
            rules[ruleI].style[property] = value;
            return rules[ruleI];
        } else {
            for (let i = 0; i < rules.length; i++) {
                if (rules[i].selectorText === cls) {
                    rules[i].style[property] = value;
                }
            }
        }
    },
    get_style : (cls,property,index,get_all) => {
        let rules = styleElement.sheet.cssRules || styleElement.rules;
        if (ruleIndex !== null) {
            if (get_all) {
                return rules[index];
            } else {
                return rules[index].style[property];
            }
        } else {
            for (let i = 0; i < rules.length; i++) {
                if (rules[i].selectorText === cls) {
                    return (rules[i].style[property]);
                }
            }
        }
    },
    changeClass(el, newId) {
        let c = Styling.get_style(el.id, null, el.ruleIndex, true).cssText.split("{");
        Styling.changeRule(Methods.replace(c[0].split(" "), `#${el.id}`, `${newId}`).join(" ") + "{" + c[1], el.ruleIndex);
        el.id =`${newId.split("#")[1]}`;
    }
};

function ff(el, id, s){
    let l = "", t = "" ,a, b, c, d;
    if (s) {
        l = "width";
        t = "height";
    } else {
        l = "left";
        t = "top";
    }
    a = Styling.get_style(id, l, el.ruleIndex);
    b = Styling.get_style(id, t, el.ruleIndex);
    c = (a.split(`${parseFloat(a)}`));
    d = (b.split(`${parseFloat(b)}`));
    unitX = c[1];
    unitY = d[1];
    percX = unitX === "%";
    percY = unitY === "%";/*
    left_display.style.width = (a.length + 1) * 6 + "px";
    top_display.style.width = (b.length + 1) * 6 + "px";*/
    if (percX){
        parentWidth = el.parentElement.clientWidth;
        a = parseFloat(parseFloat(a)*parseFloat(parentWidth/100));
    }
    if (percY){
        parentHeight = el.parentElement.clientHeight;
        b = parseFloat(parseFloat(b)*parseFloat(parentHeight/100));
    }
    return [parseFloat(a), parseFloat(b)];
}

let BRICK = {
    multiple_drag_start: function (){
        let r = getFocusedClasses("hi");
        mouse.dragging.id = r[0];
        mouse.dragging.position = [];
        dragger.pt = [];
        dragger.pl = [];
        dragger.angle = [];
        wnd = r[1];
        for (let i = 0, len =mouse.dragging.id.length;i< len;i++) {
            Styling.edit_style(mouse.dragging.id[i], "position", "absolute", wnd[i].ruleIndex);
            switch (currentResize) {
                case "Q":
                    let a = ff(wnd[i], mouse.dragging.id[i]);
                    dragger.pl.push(a[0]);
                    dragger.pt.push(a[1]);
                    dragger.check = false;
                    break;
                case "W":
                    let w = ff(wnd[i], mouse.dragging.id, true);
                    dragger.pl.push(w[0]);
                    dragger.pt.push(w[1]);
                    dragger.check = true;
                    break;
                case "E":
                    dragger.pt.push(wnd.getBoundingClientRect());
                    let str = (Styling.get_style(mouse.dragging.id[i], "transform", wnd[i].ruleIndex)).split(" ");
                    dragger.angle.push({x: 0, y: 0, z: 0});
                    for (let i in str) {
                        if (str.hasOwnProperty(i)) {
                            let t = /[XYZ][(].+[)]/g.exec(str[i])[0];
                            if (t[0] === "X") {
                                dragger.angle[i].x = parseFloat(t.substring(2, t.length - 1));
                            } else if (t[0] === "Y") {
                                dragger.angle[i].y = parseFloat(t.substring(2, t.length - 1));
                            } else if (t[0] === "Z") {
                                dragger.angle[i].z = parseFloat(t.substring(2, t.length - 1));
                            }
                        }
                    }
                    dragger.check = null;
                    break;
                case "T":
                    let b = ff(wnd[i], mouse.dragging.id[i]);
                    dragger.pl.push(b[0]);
                    dragger.pt.push(b[1]);
                    dragger.check = false;
                    break;
            }
        }
    },
    drag_start: function () {
        mouse.dragging.id = `${mouse.dragging.element.id}`;
        wnd = mouse.dragging.element;
        // mouse.dragging.position = Styling.get_style(mouse.dragging.id, "position", wnd.ruleIndex);
        // Styling.edit_style(mouse.dragging.id, "position", "absolute", wnd.ruleIndex);
        switch (currentResize) {
            case "Q":
                let a = ff(wnd, mouse.dragging.id);
                dragger.pl = a[0];
                dragger.pt = a[1];
                dragger.check = false;
                break;
            case "W":
                let w = ff(wnd, mouse.dragging.id, true);
                dragger.pl = w[0];
                dragger.pt = w[1];
                dragger.check = true;
                break;
            case "T":
                let b = ff(wnd, mouse.dragging.id);
                dragger.check = false;
                dragger.pl = b[0];
                dragger.pt = b[1];
                break;
            case "E":
                dragger.pt = wnd.getBoundingClientRect();
                let str = (Styling.get_style(mouse.dragging.id, "transform", wnd.ruleIndex)).split(" ");
                dragger.angle = {x: 0, y: 0, z: 0};
                for (let i in str) {
                    if (str.hasOwnProperty(i)) {
                        let t = /[XYZ][(].+[)]/g.exec(str[i])[0];
                        if (t[0] === "X") {
                            dragger.angle.x = parseFloat(t.substring(2, t.length - 1));
                        } else if (t[0] === "Y") {
                            dragger.angle.y = parseFloat(t.substring(2, t.length - 1));
                        } else if (t[0] === "Z") {
                            dragger.angle.z = parseFloat(t.substring(2, t.length - 1));
                        }
                    }
                }
                dragger.check = null;
            break;
        }

    },
    click: function (el) {
        //the shitty negating part
        if (dragger.angle) {
            let str = Styling.get_style(el.id, "transform", el.ruleIndex).split(" ");
            let t = "";
            for (let i in str){
                if (str.hasOwnProperty(i)) {
                    t += " "+str[i].toString().replace(new RegExp("[(]"),"(-");
                }
            }
            /*document.getElementById("size-resize").style.transform = t;
            document.getElementById("position-resize").style.transform = t;
            document.getElementById("rot-resize-cont").style.transform = t;*/
        }
        hightlightAll();
        el.done.scrollIntoView(false)
    },
    typing: false
};

let TraditionalTool = {
    methods: {
        t_top_left: (ml, mt,  sw, sh, wnd)=>{
            mw =  sw - mouse.dragging.offset.x;
            mh =  sh - mouse.dragging.offset.y;
            if (percX){
                ml = `${100 * ml / parentWidth}`;
                mw = `${100 * mw / parentWidth}`;
            }
            if (percY){
                mt = `${100 * mt / parentHeight}`;
                mh = `${100 * mh / parentHeight}`;
            }
            if (mw>0) {
                drag_style(wnd, "left", `${ml + unitX}`);
                drag_style(wnd, "width", `${mw + unitX}`);
            }
            if (mh>0){
                drag_style(wnd, "top", `${mt + unitY}`);
                drag_style(wnd, "height", `${mh + unitY}`);
            }
            height_display.value = `${mh + unitY}`;
            width_display.value = `${mw + unitX}`;
            top_display.value = `${mt + unitY}`;
            left_display.value = `${ml + unitX}`;
        },
        t_top: (ml, mt,  sw, sh, wnd)=>{
            mh =  sh - mouse.dragging.offset.y;
            if (percY){
                mt = `${100 * mt / parentHeight}`;
                mh = `${100 * mh / parentHeight}`;
            }
            if (mh>0){
                drag_style(wnd,"top", `${mt + unitY}`);
                drag_style(wnd,"height", `${mh + unitY}`);
            }
            height_display.value = `${mh + unitY}`;
            top_display.value = `${mt + unitY}`;
        },
        t_top_right: (ml, mt,  sw, sh, wnd)=>{
            mh =  sh - mouse.dragging.offset.y;
            mw =  sw + mouse.dragging.offset.x;
            if (percX){
                mw = `${100 * mw / parentWidth}`;
            }
            if (percY){
                mt = `${100 * mt / parentHeight}`;
                mh = `${100 * mh / parentHeight}`;
            }
            if (mh>0) {
                drag_style(wnd, "top", `${mt + unitY}`);
                drag_style(wnd, "height", `${mh + unitY}`);
            }
            if (mw>0) {
                drag_style(wnd, "width", `${mw + unitX}`);
                drag_style(wnd, "width", `${mw + unitX}`);
            }
            height_display.value = `${mh + unitY}`;
            width_display.value = `${mw + unitX}`;
            top_display.value = `${mt + unitY}`;
        },
        t_right: (ml, mt,  sw, sh, wnd)=>{
            mw =  sw + mouse.dragging.offset.x;
            if (percX){
                mw = `${100 * mw / parentWidth}`;
            }
            drag_style(wnd,"width", `${mw + unitX}`);
            width_display.value = `${mw + unitX}`;
        },
        t_bottom_right: (ml, mt,  sw, sh, wnd)=>{
            mw =  sw + mouse.dragging.offset.x;
            mh =  sh + mouse.dragging.offset.y;
            if (percX){
                mw = `${100 * mw / parentWidth}`;
            }
            if (percY){
                mh = `${100 * mh / parentHeight}`;
            }
            drag_style(wnd,"width", `${mw + unitX}`);
            drag_style(wnd,"height", `${mh + unitY}`);
            height_display.value = `${mh + unitY}`;
            width_display.value = `${mw + unitX}`;
        },
        t_bottom: (ml, mt,  sw, sh, wnd)=>{
            mh =  sh + mouse.dragging.offset.y;
            if (percY){
                mh = `${100 * mh / parentHeight}`;
            }
            drag_style(wnd,"height", `${mh + unitY}`);
            height_display.value = `${mh + unitY}`;
        },
        t_bottom_left: (ml, mt,  sw, sh, wnd)=>{
            mw =  sw - mouse.dragging.offset.x;
            mh =  sh + mouse.dragging.offset.y;
            if (percX){
                ml = `${100 * ml / parentWidth}`;
                mw = `${100 * mw / parentWidth}`;
            }
            if (percY){
                mh = `${100 * mh / parentHeight}`;
            }
            if (mw>0){
                drag_style(wnd,"left", `${ml + unitX}`);
                drag_style(wnd,"width", `${mw + unitX}`);
            }
            if (mh>0) {
                drag_style(wnd, "height", `${mh + unitY}`);
            }

            height_display.value = `${mh + unitY}`;
            width_display.value = `${mw + unitX}`;
            left_display.value = `${ml + unitX}`;
        },
        t_left: (ml, mt,  sw, sh, wnd)=>{
            mw =  sw - mouse.dragging.offset.x;
            if (percX){
                ml = `${100 * ml / parentWidth}`;
                mw = `${100 * mw / parentWidth}`;
            }
            if (mw>0) {
                drag_style(wnd, "left", `${ml + unitX}`);
                drag_style(wnd, "width", `${mw + unitX}`);
            }
            width_display.value = `${mw + unitX}`;
            left_display.value = `${ml + unitX}`;
        },
        t_rot: (ml, mt,  sw, sh, wnd)=>{
            //rotate
            ml = get_angle(dragger.angle, {
                x: (mouse.moving.point.x - dragger.originalD.left) - center.x,
                y: (mouse.moving.point.y - dragger.originalD.top) - center.y
            });
            Styling.edit_style(mouse.dragging.id, "transform", `rotateZ(${ml}deg)`, wnd.ruleIndex)
        },
    },
    drag_start : ()=>{
        mouse.dragging.id = `${mouse.dragging.element.parentNode.parentElement.id}`;
        wnd = mouse.dragging.element.parentNode.parentElement;
        dragger.method = mouse.dragging.element.id;
        let a = ff(wnd, mouse.dragging.id);
        dragger.pl = a[0];
        dragger.pt = a[1];
        let w = ff(wnd, mouse.dragging.id, true);
        dragger.sw = w[0];
        dragger.sh = w[1];
        let t = ((Styling.get_style(mouse.dragging.id, "transform", wnd.ruleIndex)).match(new RegExp("[Z][(].+[)]"))[0]);
        dragger.angle = (parseFloat(t.substring(2,t.length-1)));
        dragger.originalD = wnd.getBoundingClientRect();
    },
    multiple_drag_start : ()=>{
        let r = getFocusedClasses("hi");
        mouse.dragging.id = r[0];
        mouse.dragging.position = [];
        dragger.method = mouse.dragging.element.id;
        dragger.pt = [];
        dragger.pl = [];
        dragger.sw = [];
        dragger.sh = [];
        wnd = r[1];
        for (let i = 0, len = mouse.dragging.id.length;i< len;i++){
            let a = ff(wnd[i], mouse.dragging.id[i]);
            dragger.pl.push(a[0]);
            dragger.pt.push(a[1]);

            let w = ff(wnd[i], mouse.dragging.id[i], true);
            dragger.sw.push(w[i][0]);
            dragger.sh.push(w[i][1]);
        }
    },
    handle_traditional_appendTools : () => {
        if (no) {
            /*
                    multiple
            */

            for (let i = 0; i < mouse.dragging.id.length; i++) {
                TraditionalTool.methods[dragger.method](ml[i], mt[i], dragger.sw[i], dragger.sh[i], wnd[i]);
            }
        } else {
            /*
                    single
            */
            TraditionalTool.methods[dragger.method](ml, mt, dragger.sw, dragger.sh, wnd);
        }
    }
};

let Resizers = {
    drag_start : ()=>{
        //mouse.dragging.element.style.transform = "rotate(0deg)";
        wnd = mouse.dragging.element.parentElement.parentElement;
        mouse.dragging.id = `${wnd.id}`;
        if (mouse.dragging.element.classList.contains("size")) {
            dragger.height_resize = mouse.dragging.element.id === "height_resize";
            dragger.width_resize = mouse.dragging.element.id === "width_resize";
            let w = ff(wnd, mouse.dragging.id, true);
            dragger.pl = w[0];
            dragger.pt = w[1];
            dragger.check = true;
        }
        else if (mouse.dragging.element.classList.contains("position")){
            dragger.top_resize = mouse.dragging.element.id === "top_resize";
            dragger.left_resize = mouse.dragging.element.id === "left_resize";
            let a = ff(wnd, mouse.dragging.id);
            dragger.pl = a[0];
            dragger.pt = a[1];
        }
        let t = ((Styling.get_style(mouse.dragging.id, "transform", wnd.ruleIndex)).match(new RegExp("[Z][(].+[)]"))[0]);
        dragger.angle = parseFloat(t.substring(2,t.length-1));
    },
    multiple_drag_start : ()=>{
        let r = getFocusedClasses("hi");
        mouse.dragging.id = r[0];
        mouse.dragging.position = [];
        dragger.pt = [];
        dragger.pl = [];
        dragger.angle = [];
        wnd = r[1];
        dragger.height_resize = mouse.dragging.element.id === "height_resize";
        dragger.width_resize = mouse.dragging.element.id === "width_resize";
        dragger.top_resize = mouse.dragging.element.id === "top_resize";
        dragger.left_resize = mouse.dragging.element.id === "left_resize";
        let size = mouse.dragging.element.classList.contains("size");
        let position = mouse.dragging.element.classList.contains("position");
        for (let i = 0, len = mouse.dragging.id.length;i< len;i++){
            //mouse.dragging.element.style.transform = "rotate(0deg)";
            // wnd.push(mouse.dragging.element.parentElement.parentElement);
            if (size) {
                let w = ff(wnd[i], mouse.dragging.id, true);
                dragger.pl.push(w[0]);
                dragger.pt.push(w[1]);
                dragger.check = true;
            }
            else if (position){
                let a = ff(wnd[i], mouse.dragging.id[i]);
                dragger.pl.push(a[0]);
                dragger.pt.push(a[1]);
            }
            let t = ((Styling.get_style(mouse.dragging.id[i], "transform", wnd[i].ruleIndex)).match(new RegExp("[Z][(].+[)]"))[0]);
            dragger.angle.push(parseFloat(t.substring(2,t.length-1)));
        }
    }
};

function initiateStyle(parentPath, id,custom) {
    Styling.init_style(`
        div#${parentPath||"genie-paint-field"} #${id}{${custom||"transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); border: 1px solid gray;cursor:all-scroll;left:0;top:0;position:absolute; width: 100px; height: 50px; background-color: white; }"}`
    );
}


function G(id) {
    this.tagName = "div";
    this.id = id||"div";
    this.target =  document.getElementById(`.${this.id}`);
    this.parentPath = null;
    this.parent = null;
}

G.prototype.bindings = function(){
    this.target.addEventListener("mouseenter",function (e) {
        mouse.hover.status = true;
        new MouseEventHandler(e);
        mouse.hover.status = false;
    });
    this.target.addEventListener("mouseleave",function (e) {
        mouse.hover.status = false;
    })
};

G.prototype.create = function(tag_name, parent_path,parent){
    this.parentPath = parent_path||"genie-paint-field";
    this.tagName = tag_name||"div";
    parent = parent.classList.contains("hi")?parent:null;
    this.parent = parent||document.getElementById(`${this.parentPath}`);
    this.target = createDomElement({name: `${this.tagName}`,appendTo:this.parent, id: `${this.id}`, class: `hi normal_drag`,innerHTML:"hi there", contentEditable: false});
    initiateStyle(this.parentPath,this.id);
    this.target.ruleIndex = ruleIndex;
    //this.bindings();
    reload_compressed_layout();
    return this.target;
    //Styling.edit_style(`div#${this.parentPath} .${this.className}`,"background-color","blue",this.target.ruleIndex)
};


//new G().create();
