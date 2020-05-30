let currentResize = "Q", center = {x:0, y:0};
let virtual_appender = createDomElement({name:"div"});
let boundary = {
    el: document.getElementById("genie-paint-field"),
    x: 0,
    y: 0
},ml = 0,mt = 0;

let Elements = {};
let ruleIndex = 1;
let styleId = "element";
let styleElement = document.getElementById(`${styleId}`);

let Styling = {
    changeRule: (rule, index) => {
        styleElement.sheet.deleteRule(index);
        styleElement.sheet.insertRule(rule, index);
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
};

let BRICK = {
    multiple_drag_start: function (){
        let r = getFocusedClasses("hi");
        mouse.dragging.elementClass = r[0];
        mouse.dragging.position = [];
        dragger.pt = [];
        dragger.pl = [];
        dragger.angle = [];
        wnd = r[1];
        for (let i = 0, len =mouse.dragging.elementClass.length;i< len;i++) {
            Styling.edit_style(mouse.dragging.elementClass[i], "position", "absolute", wnd[i].ruleIndex);
            if (currentResize === "Q") {
                dragger.pl.push(parseFloat(Styling.get_style(mouse.dragging.elementClass[i], "left", wnd[i].ruleIndex).split("px")[0]));
                dragger.pt.push(parseFloat(Styling.get_style(mouse.dragging.elementClass[i], "top", wnd[i].ruleIndex).split("px")[0]));
                dragger.check = false;
            } else if (currentResize === "W") {
                dragger.pl.push(wnd[i].clientWidth);
                dragger.pt.push(wnd[i].clientHeight);
                dragger.check = true;
            } else if (currentResize === "E") {
                dragger.pt.push(wnd.getBoundingClientRect());
                let str = (Styling.get_style(mouse.dragging.elementClass[i], "transform", wnd[i].ruleIndex)).split(" ");
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
            }
        }
    },
    drag_start: function () {
        mouse.dragging.elementClass = `${mouse.dragging.element.classList[0]}`;
        wnd = mouse.dragging.element;
        // mouse.dragging.position = Styling.get_style(mouse.dragging.elementClass, "position", wnd.ruleIndex);
        Styling.edit_style(mouse.dragging.elementClass, "position", "absolute", wnd.ruleIndex);
        if (currentResize === "Q") {
            dragger.pl = parseFloat(Styling.get_style(mouse.dragging.elementClass, "left", wnd.ruleIndex).split("px")[0]);
            dragger.pt = parseFloat(Styling.get_style(mouse.dragging.elementClass, "top", wnd.ruleIndex).split("px")[0]);
            dragger.check = false;
        } else if (currentResize === "W") {
            dragger.pl = wnd.clientWidth;
            dragger.pt = wnd.clientHeight;
            dragger.check = true;
        } else if (currentResize === "E") {
            dragger.pt = wnd.getBoundingClientRect();
            let str = (Styling.get_style(mouse.dragging.elementClass, "transform", wnd.ruleIndex)).split(" ");
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
        }
    },
    click: function (el) {
        //the shitty negating part
        if (dragger.angle) {
            let str = Styling.get_style(el.classList[0], "transform", el.ruleIndex).split(" ");
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
    }
};

let Resizers = {
    drag_start : ()=>{
        //mouse.dragging.element.style.transform = "rotate(0deg)";
        wnd = mouse.dragging.element.parentElement.parentElement;
        mouse.dragging.elementClass = `${wnd.classList[0]}`;
        dragger.height_resize = mouse.dragging.element.id === "height_resize";
        dragger.width_resize = mouse.dragging.element.id === "width_resize";
        dragger.top_resize = mouse.dragging.element.id === "top_resize";
        dragger.left_resize = mouse.dragging.element.id === "left_resize";
        if (mouse.dragging.element.classList.contains("size")) {
            dragger.pl = wnd.clientWidth;
            dragger.pt = wnd.clientHeight;
        }
        else if (mouse.dragging.element.classList.contains("position")){
            dragger.pl = parseFloat(Styling.get_style(mouse.dragging.elementClass, "left", wnd.ruleIndex).split("px")[0]);
            dragger.pt = parseFloat(Styling.get_style(mouse.dragging.elementClass, "top", wnd.ruleIndex).split("px")[0]);
        }
        let t = ((Styling.get_style(mouse.dragging.elementClass, "transform", wnd.ruleIndex)).match(new RegExp("[Z][(].+[)]"))[0]);
        dragger.angle = parseFloat(t.substring(2,t.length-1));
    },
    multiple_drag_start : ()=>{
        let r = getFocusedClasses("hi");
        mouse.dragging.elementClass = r[0];
        mouse.dragging.position = [];
        dragger.pt = [];
        dragger.pl = [];
        dragger.angle = [];
        wnd = r[1];
        dragger.height_resize = mouse.dragging.element.id === "height_resize";
        dragger.width_resize = mouse.dragging.element.id === "width_resize";
        dragger.top_resize = mouse.dragging.element.id === "top_resize";
        dragger.left_resize = mouse.dragging.element.id === "left_resize";
        for (let i = 0, len = mouse.dragging.elementClass.length;i< len;i++){
            //mouse.dragging.element.style.transform = "rotate(0deg)";
            // wnd.push(mouse.dragging.element.parentElement.parentElement);
            if (mouse.dragging.element.classList.contains("size")) {
                dragger.pl.push(wnd[i].clientWidth);
                dragger.pt.push(wnd[i].clientHeight);
            }
            else if (mouse.dragging.element.classList.contains("position")){
                dragger.pl.push(parseFloat(Styling.get_style(mouse.dragging.elementClass[i], "left", wnd[i].ruleIndex).split("px")[0]));
                dragger.pt.push(parseFloat(Styling.get_style(mouse.dragging.elementClass[i], "top", wnd[i].ruleIndex).split("px")[0]));
            }
            let t = ((Styling.get_style(mouse.dragging.elementClass[i], "transform", wnd[i].ruleIndex)).match(new RegExp("[Z][(].+[)]"))[0]);
            dragger.angle.push(parseFloat(t.substring(2,t.length-1)));
        }
    }
};

function initiateStyle(parentPath, className,custom) {
    Styling.init_style(`
        div#${parentPath||"genie-paint-field"} .${className}{${custom||"transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); border: 1px solid gray; cursor: all-scroll; left:0; top:0; position: absolute; width: 100px; height: 50px; background-color: white; }"}`
    );
}


function G(class_name) {
    this.tagName = "div";
    this.className = class_name||"div";
    this.target =  document.querySelector(`.${this.className}`);
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
    this.target = createDomElement({name: `${this.tagName}`,appendTo:this.parent, class: `${this.className} hi normal_drag`,innerHTML:"hi there" });
    this.target.setAttribute("draggable","true");
    initiateStyle(this.parentPath,this.className);
    this.target.ruleIndex = ruleIndex;
    //this.bindings();
    reload_compressed_layout();
    return this.target;
    //Styling.edit_style(`div#${this.parentPath} .${this.className}`,"background-color","blue",this.target.ruleIndex)
};


//new G().create();
