//issue on having to negate append tools rotation
//shitted on bug on negating for multiple rotations
//shoddy hovering
//issue in deleting even the appended tool

/*tools*/
let RotationalTool = `<div id="rot-resize-cont" class="rot-resize-cont align_center normal_drag _tool rot">
    <div id="rotate_z" class="rot-resize normal_drag" draggable="true"></div>
    <div id="rotate_x" class="rot-resize normal_drag" draggable="true"></div>
    <div id="rotate_y" class="rot-resize normal_drag" draggable="true"></div>
    </div>`;
let PositionTool = `
    <div id="position-resize" class="position-resize _tool">
        <div id="top_resize" class="appendedTool normal_drag verticalAppendedTool position" draggable="true">
            <div class="point tool" id="top_resize_point" style="border-bottom-color: lightblue"></div>
            <div class="point_tail tool" id="top_resize_point_tail" style="border-bottom-color: lightblue"></div>
        </div>
        <div id="left_resize" class="appendedTool normal_drag horizontalAppendedTool position" draggable="true">
            <div class="point tool" id="left_resize_point" style="border-right-color: lightblue"></div>
            <div class="point_tail tool" id="left_resize_point_tail" style="border-right-color: lightblue"></div>
        </div>
    </div>
`;
let SizeTool = `
    <div id="size-resize" class="size-resize _tool">
        <div id="height_resize" class="appendedTool normal_drag verticalAppendedTool size" draggable="true">
            <div class="point tool" id="height_resize_point" style="border-bottom-color: lightblue"></div>
            <div class="point_tail tool" id="height_resize_point_tail" style="border-bottom-color: lightblue"></div>
        </div>
        <div id="width_resize" class="appendedTool normal_drag horizontalAppendedTool size" draggable="true">
            <div class="point tool" id="width_resize_point" style="border-right-color: lightblue"></div>
            <div class="point_tail tool" id="width_resize_point_tail" style="border-right-color: lightblue"></div>
        </div>
    </div>
`;


/*
***************************************
 ==== 7. CONSTANT VARIABLES
***************************************
*/
const CTRL = 17;
const SHIFT = 16;
const ALT = 18;
const DEL = 46;
const D = 68;
const Z = 90;
const A = 65;
const Q = 81;
const W = 87;
const E = 69;
const R = 82;
const T = 84;
const RADIAN_COEFFICIENT = 180/Math.PI;


/*
***************************************
 ==== 7. GLOBAL VARIABLES
***************************************
*/
let wnd, isWindow, isInsideElement,isAppendedTool,isListItem, isRotationTool, no = 0, is_field;
let appendingGL = false;
let clk = false;
let my_icons = {
    DIV: "cat-baby",
    NAV: "star",
    OL: "list",
    UL: "menu",
    LI: "orders",
    P: "cat-cart",
    H1: "cat-computer",
    H2: "cat-computing",
    H3: "cat-sunglasses",
    H4: "cat-books",
    H5: "star-shield",
    H6: "truck"
};
let angle = 0, rotation_count = 0;
let focusedElements = [];
let currentBeingTyped = [];
let deleted = [];
let redone = [];
let sequencedKeys = [];
let g_timer=false;
let orient = '';
let seprator={
    pw: 0,
    lftw: 0,
},h;
let inEl = null;
let dragger={
    pl: 0,
    pt: 0,
};
let lft;
let right;
let mouse = {
    clicking: {
        status:false,
        point:{
            x:0,
            y:0
        },
    },
    dragging: {
        status:false,
        offset:{
            x:0,
            y:0
        },
        draggable : false,
        drag_start: {
            status: false,
            element: "",
        },
        elementClass:null,
        element:null
    },
    hovering: {
        status: false,
        point: {
            x: 0,
            y: 0
        },
        droppable:"",
        dropUl:"",
        carrying:false,
    },
    releasing: {
        status: false,
        point: {
            x: 0,
            y: 0
        },
    },
    moving: {
        status: false,
        point: {
            x: 0,
            y: 0
        },
    },
    hover: {
        status:false,
    }
};
let global_log_depth = 5;
let systemClasses =  ["hi","normal_drag"];
let lastContextMenuPt =  null;
let Methods = {
    edit : {
        allow: (el)=>{
            el.readOnly = false;
            el.style.cursor = "auto";
            el.style.color = "blue";
            currentBeingTyped = el;
        },
        block: (el)=>{
            el.readOnly = true;
            for (let i=0;i<focusedElements.length;i++) {
                focusedElements[i].readOnly = true;
                focusedElements[i].style.cursor = focusedElements[i].classList.contains("hi")?"all-scroll":"pointer";
                focusedElements[i].style.color = "inherit";
                currentBeingTyped = [];
            }
        }
    },
    find : function(array,item) {
        if (array.length > 0) {
            return array.find(i => i === item) === item;
        }
    },
    remove_duplicates: function(arr){
        return arr.filter((t={},a=>!(t[a]=a in t)));
    },
    inRange : function(num, start,end) {
        return num >= start && num <= end;
    },
    remove : function(array,item){
        if (Methods.find(array,item)) {
            array.splice(array.indexOf(item), 1);
        }
    },
    removeNode : function(element){
        element.parentNode.removeChild(element);
    },
    reverse : function(str,separator,joiner) {
        return str.split(`${separator||" "}`).reverse().join(`${joiner||" "}`)//.substr(0,str.length-1-(fromRight||0));
    },
    presert : function(concernedNode,concerned_parent,nodeAfter) {
        try {
            nodeAfter = concerned_parent.contains(nodeAfter)?nodeAfter:null;
            concerned_parent.insertBefore(concernedNode,nodeAfter)
        }catch (e) {
            console.log("shit, a parent on a child?")
        }
    },
    changeClassProperty : function(cls,elements,property,newValue,oldValue) {
        document.querySelectorAll(`${cls}`).forEach(function (el) {
            Methods.find(elements,el)?el.style[`${property}`] = newValue:el.style[`${property}`]=oldValue||el.style[`${property}`];
        })
    },
    toogle : {
        display: function (element) {
            let display = element.style.display;
            display = display === "none"?"block":"none";
            element.style.display = display;
        },
        classes: function (element,class1,class2) {
            let cls = element.classList;
            if (cls.contains(`${class1}`)) {
                element.classList.remove(`${class1}`);
                element.classList.add(`${class2}`);
            } else if (cls.contains(`${class2}`)) {
                element.classList.remove(`${class2}`);
                element.classList.add(`${class1}`);
            }else{
                console.log("what?")
            }
        }
    },/*
    getIndex : (element)=>{
        let i = 0;
        while ((element = element.previousSibling) !== null){i++}
        return i;
    }*/
    addToIndex : function(array,item, index){
        array.splice(index, 0, item);
    },
    replace : function(array, old, _new){
        let index = array.indexOf(old);
        Methods.remove(array, old);
        Methods.addToIndex(array, _new, index);
        return array;
    },/*
    getIndex : (element)=>{
        let i = 0;
        while ((element = element.previousSibling) !== null){i++}
        return i;
    }*/
};

let projectObject = `
<div class="project" title="Genie">
    <div class="lib">
        <div class="css"><div class="Genie.css">Hi there css</div></div>
        <div class="Js">
            <div class="external">nothing</div>
            <div class="utilities">
                <div class="utilities.js">Hi there utilities.js</div>
                <div class="Genie.js">Hi there Genie.js</div>
            </div>      
        </div>
       
    </div>
</div>
`;

let ctxmenu = `
<div class="do" title="done">
    <div class="lib">
        <div class="css"><div class="Genie.css">Hi there css</div></div>
        <div class="Js">
            <div class="external">nothing</div>
            <div class="utilities">
                <div class="utilities.js">Hi there utilities.js</div>
                <div class="Genie.js">Hi there Genie.js</div>
            </div>      
        </div>
    </div>
</div>
<div class="create" title="github">
    <div class="headings" title="done">
            <div class="h1" title="done"></div>
            <div class="h2" title="done"></div>
            <div class="h3" title="done"></div>
            <div class="h4" title="done"></div>
            <div class="h5" title="done"></div>
            <div class="h6" title="done"></div>
            <div class="address" title="done"></div>
     </div>
    <div class="block elements" title="done">
        <div class="div" title="done"></div>
        <div class="p" title="done"></div>       
        <div class="hr" title="done"></div>
        <div class="pagination" title="done">
            <div class="nav" title="done"></div>
            <div class="article" title="done"></div>
            <div class="article" title="done"></div>
        </div>
        <div class="lists" title="done">
            <div class="ol" title="done"></div>
            <div class="ul" title="done"></div>
            <div class="li" title="done"></div>
        </div>
        <div class="pre" title="done"></div>
        <div class="blockquote" title="done"></div>
        <div class="form" title="done"></div>
        <div class="table" title="done"></div>
    </div>
    <div class="inline elements" title="twitter">
        <div class="text elements" title="done">
            <div class="phrase markup" title="done">
                <div class="em" title="done"></div>
                <div class="strong" title="done"></div>
                <div class="den" title="done"></div>
                <div class="code" title="done"></div>
                <div class="samp" title="done"></div>
                <div class="kbd" title="done"></div>
                <div class="var" title="done"></div>
                <div class="site" title="done"></div>
            </div>
            <div class="font markup" title="done">
                <div class="tt" title="done"></div>
                <div class="i" title="done"></div>
                <div class="b" title="done"></div>
                <div class="u" title="done"></div>
                <div class="strike" title="done"></div>
                <div class="big" title="done"></div>
                <div class="small" title="done"></div>
                <div class="sub" title="done"></div>
                <div class="sup" title="done"></div>
            </div>
            <div class="special elements" title="done">
                <div class="a" title="done"></div>
                <div class="img" title="done"></div>
                <div class="applet" title="done"></div>
                <div class="font" title="done"></div>
                <div class="basefont" title="done"></div>
                <div class="br" title="done"></div>
                <div class="script" title="done"></div>
                <div class="map" title="done"></div>
            </div>
        </div>
        <div class="a" title="done"></div>
        <div class="img" title="done"></div>
    </div>
</div>
`;

/*
***************************************
 ==== 7. GLOBAL FUNCTIONS
 ***************************************
*/
function CreateWindow() {
    h = createDomElement({name:"div"});
    h.innerHTML = projectObject;
    new Compressed_layout("window_body_left_bottom","container",h).init();
}

function setAttributesTo(attr,el1,el2) {
    function f(el1,el2) {
        for (let i in el1){ if (el1.hasOwnProperty(i)) {
            el1[i][`${attr}`] = el2[i];
            if (el1[i].querySelector("ul")&&el1[i].querySelector("ul")["children"].length > 0) {
                f(el1[i].querySelector("ul")["children"], el2[i]["children"]);
            }
        }
        }
    }
    el1[`${attr}`] = el2;
    f(el1.querySelector("ul")?el1.querySelector("ul")["children"]:"", el2["children"]);
}

function highlightLayout(el) {
    Methods.changeClassProperty(".compressed_layout li .layout_title",el||focusedElements,"background", "lightblue","white");
}

function syncCloneClass(el, el1) {
    let tag = el1.tagName.toLowerCase();
    Elements[tag] === undefined ? Elements[tag] = 0 : Elements[tag]++;
    let cls = `${tag + "-" + Elements[tag].toString()}`;
    el.classList.replace(`${el.classList[0]}`,`${(cls)}`);
    let c = Styling.get_style(el1.classList[0],null,el1.ruleIndex,true);
    c?initiateStyle(null, `${cls}`, c.cssText.split("{")[1]):"";
    el.ruleIndex = ruleIndex;
}

function clone(el) {
    let cloned  = el.cloneNode(true);
    syncCloneClass(cloned, el);
    function f(el,el1) {
        for (let i in el){ if (el.hasOwnProperty(i)) {
            syncCloneClass(el[i],el1[i]);
            if (el[i]["children"]&&el[i]["children"].length > 0) {
                f(el[i]["children"], el1[i]["children"]);
            }
        }
        }
    }
    f(cloned["children"],el["children"]);
    return cloned;
    //f(el.querySelector("div>.hi")["children"], el2["children"]);
}

function createDomElement(args) {
    let el = document.createElement(args.name);
    args.class?el.classList+=args.class:"";
    args.id?el.id = args.id:"";
    args.creator?el.creator = args.creator:"";
    args.innerHTML?el.innerHTML = args.innerHTML:"";
    args.value?el.value = args.value:"";
    args.appendTo?args.appendTo.appendChild(el):"";
    args.prependTo?args.prependTo.prepend(el):"";
    return el;
}

function clsName(classList) {
    for (let i = 0;i<systemClasses.length;i++){
        Methods.remove(classList,systemClasses[i]);
    }
    return classList;
}

function toolbarItems(el) {
    Methods.changeClassProperty(".genie-toolbar-item",[el],"backgroundColor","lightblue","#f3f3f3");
}

function hightlightAll() {
    let ell = [];
    for (let i = 0, len = focusedElements.length; i < len; i++) {
        if (focusedElements[i].classList.contains("hi")) {
            ell.push(focusedElements[i].done.querySelector("input"));
        }
    }
    highlightLayout(ell);
}

function getFocusedClasses(cls) {
    let lst = [], lst1 = [];
    for (let i = 0;i<focusedElements.length;i++){
        if (focusedElements[i].classList.contains(`${cls}`)) {
            lst.push(`${focusedElements[i].classList[0]}`);
            lst1.push(focusedElements[i])
        }else if(focusedElements[i].parentNode.creator){
            lst.push(`${focusedElements[i].parentNode.creator.classList[0]}`);
            lst1.push(focusedElements[i].parentNode.creator)
        }
    }
    return [lst,lst1];
}

function addCurrentTool(el) {
    let resize;
    switch (currentResize) {
        case "Q":
            let r = createDomElement({name: "div"});
            r.innerHTML = PositionTool;
            resize = r.querySelector("#position-resize");
            f(resize);
            break;
        case "W":
            let t = createDomElement({name: "div"});
            t.innerHTML = SizeTool;
            resize = t.querySelector("#size-resize");
            f(resize);
            break;
        case "E":
            document.querySelectorAll("._tool").forEach(function (e) {
                e.style.display = "none";
            });
            rot_resize= document.getElementById("rot-resize-cont");
            rot_resize.style.display = "block";
            rot_resize.style.zIndex = "200";

            inEl = el;
            rot_resize.style.left = `${inEl.getBoundingClientRect().left+center.x - 80}px`;
            rot_resize.style.top = `${inEl.getBoundingClientRect().top+center.y-80}px`;
            break;
    }

    function f(p) {
        if (el) {
            center = {x: el.clientWidth / 2, y: el.clientHeight / 2};
            el.appendChild(p);
            p.style.left = `${center.x - 40}px`;
            p.style.top = `${center.y}px`;
        }else {
            for (let i = 0, len = focusedElements.length; i < len; i++) {
                if (focusedElements[i].classList.contains("hi")) {
                    center = {x: focusedElements[i].clientWidth / 2,y: focusedElements[i].clientHeight / 2};
                    focusedElements[i].appendChild(p);
                    p.style.left = `${center.x-40}px`;
                    p.style.top = `${center.y}px`;
                }
            }
        }
    }
}

function removeCurrentTool(el) {
    if (el){
        Methods.removeNode(el.querySelector("._tool"));
    }else {
        document.querySelectorAll("._tool").forEach(function (e) {
            Methods.removeNode(e);
        });
    }
}


function Compressed_layout(parentClass,cls,data) {
    this.parentContainer = document.querySelector(`.${parentClass}`);
    this.currentWindowData =  data||document.querySelector(`.${cls}`);
    this.listContainer = createDomElement({name:"ul",class:"ul_main"});

    this.init = ()=>{
        this.parentContainer.style.overflow = "overlay";
        let cont = createDomElement({name:"div",class:"compressed_layout"});
        console.time("loop");
        loop(this.currentWindowData['children'], this.listContainer);
        console.timeEnd("loop");
        cont.appendChild(this.listContainer);
        this.parentContainer.innerHTML = "";
        this.parentContainer.appendChild(cont);
        cont = null;
        let my_con= document.querySelector('.compressed_layout');

        // Expand or collapse
        my_con.querySelectorAll('.compressed_layout .list_item').forEach(function (element) {
            element.classList.contains('carrying')?element.querySelector("ul").style.display = "none":"";

        });
    };
    function loop(links, ul) {
        for (let obj in links) {
            if (links.hasOwnProperty(obj)) {
                let li = createDomElement({name: "li", class: "list_item", appendTo: ul, creator: links[obj]}),
                    title = links[obj]["title"] ? links[obj]["title"] : clsName(links[obj].className.split(" "));
                let sp = createDomElement({
                    name: "input",
                    class: "layout_title editable clickable normal_drag",
                    appendTo: li,
                    value: title
                });
                sp.setAttribute("readonly", "true");
                sp.setAttribute("draggable", "true");
                let ic = createDomElement({name: "div", class: "icon", prependTo: li});
                ic.innerHTML = `<svg viewBox="0 0 24 24" class="" width="100%" height="100%"><use xlink:href="../sources/svg_icons.svg#${my_icons[links[obj].tagName]}"></use></svg>`;
                links[obj].done = li;
                if (links[obj]['children'] && links[obj]['children'].length > 0) {
                    createDomElement({name: "div", class: "arrow collapsed", prependTo: li});
                    let ul2 = createDomElement({name: "ul", appendTo: li});
                    li.classList += " carrying";
                    loop(links[obj]['children'], ul2);
                } else {
                    //createDomElement({name: "div", class: "leaf_node", prependTo: li});
                }
            }

        }
    }
}

function reload_compressed_layout() {
    new Compressed_layout("genie-compressed-layout","container",boundary.el).init();
}


/*
***************************************
 ==== 7. EVENTS
 ***************************************
 */


function Events() {
    this.default = ()=> {
        window.addEventListener("keydown", function (e) {
            new KeyEventHandler(e,"key_down");
        });

        window.addEventListener("keyup", function (e) {
            new KeyEventHandler(e,"key_up");
        });

        window.addEventListener("mousedown", function (e) {
            mouse.releasing.status = false;
            mouse.clicking.status = true;
            mouse.clicking.point = {x:e.clientX,y:e.clientY};
            new MouseEventHandler(e);
        });

        window.addEventListener("mousemove", function (e) {
            mouse.moving.status = true;
            mouse.moving.point = {x:e.clientX,y:e.clientY};
            new MouseEventHandler(e);
        });


        window.addEventListener("mouseup", function (e) {
            //e.preventDefault();
            //e.stopPropagation();
            g_timer = false;
            mouse.hovering.status = false;
            mouse.moving.status = false;
            mouse.dragging.status = false;
            mouse.clicking.point = {x: e.clientX, y: e.clientY};
            mouse.releasing.status = true;
            mouse.clicking.status = false;
            new MouseEventHandler(e);
            mouse.dragging.elementClass?document.querySelector(`.${(mouse.dragging.elementClass)}`).style.pointerEvents = "auto":"";
            mouse.dragging.element = null;
        });

        window.addEventListener("click",function (e) {
            new MouseEventHandler(e,"mouse_click");
        }, false);

        window.addEventListener("mouseout", function (e) {
            e.stopPropagation();
            mouse.hovering.status = true;
            mouse.hovering.point = {x: e.clientX, y: e.clientY};
            new MouseEventHandler(e);
        });

        window.addEventListener("dblclick", function (e) {
            new MouseEventHandler(e,"dblclick");
        });

        window.addEventListener("auxclick", function (e) {
            new MouseEventHandler(e,"right_click");
        });

        window.addEventListener("contextmenu", function (e) {
            new MouseEventHandler(e,"contextmenu");
        });
    };
}

let keySequence = {
    isSequenced: (key_string_def)=>{
        if (key_string_def.length>0&&sequencedKeys.length>0) {
            let str = key_string_def.toString().split(","), flag = false;
            if (str.length===sequencedKeys.length) {
                for (let i in str) {
                    if (str.hasOwnProperty(i) && sequencedKeys.hasOwnProperty(i)) {
                        if (!(sequencedKeys[i].toString() === str[i].toString())) {
                            return flag;
                        }
                    }
                }
                return true;
            }else {
                return false;
            }
        }else return false;
    },
    DEL:()=> {
        return keySequence.isSequenced(`${DEL}`);
    },
    REDO:()=> {
        return keySequence.isSequenced(`${CTRL},${SHIFT},${Z}`);
    },
    UNDO:()=> {
        return keySequence.isSequenced(`${CTRL},${Z}`);
    },
    DUP:()=> {
        return keySequence.isSequenced(`${CTRL},${D}`);
    },
    APPEND:()=> {
        return keySequence.isSequenced(`${ALT},${A}`);
    },
    POS_RESIZE:()=> {
        return keySequence.isSequenced(`${ALT},${Q}`);
    },
    SIZE_RESIZE:()=> {
        return keySequence.isSequenced(`${ALT},${W}`);
    },
    ROT_RESIZE:()=> {
        return keySequence.isSequenced(`${ALT},${E}`);
    }
};

/*
***************************************
 ==== 7. KEY EVENT HANDLER
***************************************
*/

function KeyEventHandler (element,event){
    this.element = element;
    this.el = element.target;
    this.event = event;
    this.key = this.element.keyCode;
    this.def();
}

/*
***************************************
 ==== 7. KEY EVENT HANDLER METHODS
***************************************
*/

KeyEventHandler.prototype.handleDelete=function() {
    let lst = [];
    for (let i = 0, len = focusedElements.length;i< len;i++) {
        if (focusedElements[i]) {
            if (focusedElements[i].parentNode.classList.contains("list_item") || focusedElements[i].classList.contains("hi")) {
                lst.push(focusedElements[i]);
            }
        }
    }
    removeCurrentTool();
    this.delete(lst)
};

KeyEventHandler.prototype.delete = function(elements){
    let temp = [],element, is_inside_element = false;
    for (let i = 0; i < elements.length; i++) {
        element = elements[i];
        is_inside_element= element.classList.contains("hi");
        if (deleted.length < global_log_depth) {
            !is_inside_element?
                temp.push({
                    elem: element,
                    parent: element.parentNode.parentNode,
                    concerned: element.parentNode,
                    next: element.parentNode.previousElementSibling,
                    creator_parent: element.parentNode.creator.parentNode,
                    creator_concerned: element.parentNode.creator,
                    next_parent: element.parentNode.creator.previousElementSibling
                }):temp.push({
                    parent: element.parentNode,
                    concerned: element,
                    next: element.previousElementSibling,
                    done_parent: element.done.parentNode,
                    done_concerned: element.done,
                    done_next_parent: element.done.previousElementSibling
                });
        }
        if (is_inside_element){
            Methods.removeNode(element);
            Methods.removeNode(element.done);
            mouse.dragging.elementClass = null;
            wnd = null;
        }else {
            Methods.removeNode(element.parentNode.creator);
            Methods.removeNode(element.parentNode);
        }
    }
    deleted.push(temp);
};

KeyEventHandler.prototype.handleUndoDelete = function(){
    if (deleted.length>0) {
        let d = deleted[deleted.length - 1],lst = [];
        let e,p,n,ce,cp,np,t;
        for (let i = 0; i < d.length; i++) {
            t = d[i];
            e = t.concerned;
            p = t.parent;
            n = t.next;
            if (e.classList.contains("hi")) {
                ce = t.done_concerned;
                cp = t.done_parent;
                np = t.done_next_parent;
                Methods.presert(e, p, n);
                Methods.presert(ce, cp, np);
                mouse.dragging.elementClass = e.classList[0];
                wnd = e
            } else {
                ce = t.creator_concerned;
                cp = t.creator_parent;
                np = t.next_parent;
                Methods.presert(e, p, n);
                Methods.presert(ce, cp, np);
            }
            lst.push(t);
        }
        Methods.remove(deleted, d);
        redone.push(lst);
    }
};

KeyEventHandler.prototype.handleRedoDelete=function(){
    if (redone.length>0) {
        let r = redone[0], element,lst = [],t;
        for (let i = 0; i < r.length; i++) {
            t = r[i];
            element = t.elem||t.concerned;
            lst.push(element)
        }
        removeCurrentTool();
        this.delete(lst);
        Methods.remove(redone, r);
    }
};

KeyEventHandler.prototype.handleDuplicate=function(){
    let lst = [];
    for (let i = 0, len = focusedElements.length;i< len;i++) {
        if (focusedElements[i].parentNode.classList.contains("list_item")) {
            lst.push(focusedElements[i].parentNode);
        }else if (focusedElements[i].classList.contains("hi")) {
            lst.push(focusedElements[i]);
        }
    }
    this.duplicate(lst);
};

KeyEventHandler.prototype.duplicate = function(elems){
    let elem,c,cc,len = elems.length,tag = "";
    for (let i = 0; i < len; i++) {
        elem= elems[i];
        if (elem.classList.contains("hi")){
            removeCurrentTool();
            c = clone(elem);
            Methods.presert(c, elem.parentNode, elem.nextElementSibling);
            addCurrentTool();
        }else {
            removeCurrentTool();
            //c = elem.cloneNode(true);
            cc = clone(elem.creator);
            //Methods.presert(c, elem.parentNode, elem.nextElementSibling);
            Methods.presert(cc, elem.creator.parentNode, elem.creator.nextElementSibling);
            addCurrentTool();
            //setAttributesTo("creator", c, cc);
        }
    }
    reload_compressed_layout();
    hightlightAll();
};

KeyEventHandler.prototype.handleKeys = function(){
    if (keySequence.DEL()) {
        this.element.preventDefault();
        this.handleDelete();
    }
    else if (keySequence.UNDO()){
        this.element.preventDefault();
        this.handleUndoDelete();
    }
    else if (keySequence.REDO()){
        this.element.preventDefault();
        this.handleRedoDelete();
    }
    else if (keySequence.DUP()){
        this.element.preventDefault();
        this.handleDuplicate();
    }
    else if (keySequence.POS_RESIZE()){
        this.element.preventDefault();
        currentResize = "Q";
        toolbarItems(document.getElementById("Q"));
    }
    else if (keySequence.SIZE_RESIZE()){
        this.element.preventDefault();
        currentResize = "W";
        toolbarItems(document.getElementById("W"));
    }
    else if (keySequence.ROT_RESIZE()){
        this.element.preventDefault();
        currentResize = "E";
        toolbarItems(document.getElementById("E"));
    }
};

KeyEventHandler.prototype.handle_key_up = function(){
    if(this.el.classList.contains("code_display")) {
        let p = this.el.creator.parentNode.creator;
        p.innerHTML = "";
        p.innerHTML = this.el.target.value;
    }else if (this.el.classList.contains("layout_title")) {
        this.el.value = this.el.value.split(" ").join("-");
        let el = this.el.parentNode.creator;
        if (this.el.value.length>0) {
            let c = Styling.get_style(el.classList[0], null, el.ruleIndex, true).cssText.split("{");
            Styling.changeRule(Methods.replace(c[0].split(" "), `.${el.classList[0]}`, `.${this.el.value}`).join(" ") + "{" + c[1], el.ruleIndex);
            el.classList.replace(`${el.classList[0]}`, `${this.el.value}`);
        }
    }
};

KeyEventHandler.prototype.def = function(){
    if (this.event === "key_down") {
        if (!Methods.find(sequencedKeys,this.key)) {
            sequencedKeys.push(this.key);
        }
        this.handleKeys();
    }else if (this.event === "key_up"){
        this.handle_key_up();
        Methods.remove(sequencedKeys,this.key)
    }
};

/*
***************************************
 ==== 7. MOUSE EVENT HANDLER
***************************************
*/

function MouseEventHandler (element,event){
    this.element = element;
    this.el = this.element.target;
    this.event = event;

    this.init(this.event,this.element);
}

/*
***************************************
 ==== 7. MOUSE EVENT HANDLER METHODS
***************************************
*/

MouseEventHandler.prototype.handleHovering = function(){
    if (mouse.dragging.status){
        mouse.hovering.droppable = "";
        mouse.hovering.carrying = false;
        this.el = this.element.toElement;
        if(this.el.classList.contains("layout_title")) {
            let parent = this.el.parentElement;
            if (parent.classList.contains("carrying")) {
                let arrow = parent.querySelector(".arrow"), ul = parent.querySelector("ul");
                ul.style.display = "block";
                if (arrow.classList.contains("collapsed")) {
                    arrow.classList.remove("collapsed");
                    arrow.classList.add("expanded");
                }
                arrow.scrollIntoView(false);
                mouse.hovering.droppable = ul;
            }
            mouse.hovering.carrying = true;
        }
        // else if(this.el.classList.contains("hi")){
        //      console.log("hi")
        // }
    }
};

MouseEventHandler.prototype.separatedWindowDrag = function(orientation,direction,column_resizer,rightR) {
    if (mouse.dragging.drag_start) {
        right = this.el.nextElementSibling;
        lft = this.el.previousElementSibling;
        seprator.rightw = right ? right[`client${orientation}`] : null;
        seprator.lftw = lft ? lft[`client${orientation}`] : null;
        seprator.pw = lft ? lft.parentElement[`client${orientation}`] : null;
        orient = orientation.toLowerCase();
        right?right.style.transition = "0s width":"";
        lft?lft.style.transition = "0s width":"";
    }else {
        if (!column_resizer) {
            let lft_w = seprator.lftw + mouse.dragging.offset[direction],
                right_w = seprator.rightw - mouse.dragging.offset[direction];
            if (right_w > 60 && lft_w > 60) {
                lft.style[orient] = `${100 * lft_w / seprator.pw}%`;
                right.style[orient] = `${100 * right_w / seprator.pw}%`;
            }
        } else if (!rightR) {
            let lft_w = !seprator.lftw ? null : seprator.lftw + mouse.dragging.offset[direction];
            if (15 < lft_w) {
                lft.style[orient] = `${lft_w}px`;
            }
        } else {
            let right_w = !seprator.rightw ? null : seprator.rightw - mouse.dragging.offset[direction];
            100 <= right_w ? (100 < right_w) ? !menu_show ? menu_show = true : "" : "" : menu_show ? menu_show = false : "";
            if (right_w > 50) {
                right.style[orient] = `${right_w}px`;
            }
            right.parentElement.querySelector(".settings-title").style.display = menu_show ? "block" : "none";
        }
    }
};

MouseEventHandler.prototype.handleEditing = function(el){
    if (!Methods.find(focusedElements,el)) {
        if (el.classList.contains("editable")) {
            Methods.edit.block(el);
        }
    }
};

MouseEventHandler.prototype.handleCurrentResize = function(el){
    if (Methods.find(focusedElements,el)) {
        //on double clicking list_title
        for (let i = 0, len = focusedElements.length; i < len; i++) {
            if (el.classList.contains("editable")) {
                if (!Methods.find(currentBeingTyped, el)) {
                    Methods.edit.allow(el);
                }
            }
        }
        if (keySequence.isSequenced(`${CTRL}`)) {
            Methods.remove(focusedElements, el);
            removeCurrentTool(el);
        }
    }else {
        if (el.classList.contains("editable")) {
            Methods.edit.block(el);
        } else
            //if ctrl is down ,multi-select!
        if (keySequence.isSequenced(`${CTRL}`)) {
            focusedElements.push(el);
            addCurrentTool(el);
        } else {
            focusedElements = [];
            focusedElements.push(el);
            removeCurrentTool();
            addCurrentTool(el);
        }
    }
};

MouseEventHandler.prototype.handleCodePreview=function() {
    if (this.el.classList.contains("layout_title")) {
        let cd = document.querySelector(".code_display");
        if (cd) {
            cd.value = this.el.parentNode.creator.innerHTML;
            cd.creator = this.el;
        }
    }
};

MouseEventHandler.prototype.mouse_down = function(){
    if (!g_timer) {
        if (this.el["draggable"]) {
            mouse.dragging.drag_start = true;
            mouse.dragging.draggable = true;
            mouse.dragging.element = this.el;
        }else {
            mouse.dragging.draggable = false;
        }

    }else{
        mouse.dragging.drag_start = false;
    }
};

MouseEventHandler.prototype.released = function() {
    if (mouse.hovering.carrying) {
        if (mouse.dragging.elementClass === "layout_title") {
            let has_ul = mouse.dragging.element.parentNode.querySelector("ul");
            let has_dest_ul = this.el.parentNode.querySelector("ul");
            if (!(has_ul === null ? mouse.dragging.element : has_ul).isEqualNode(this.el)) {
                if (has_dest_ul !== null) {
                    Methods.presert(mouse.dragging.element.parentNode, mouse.hovering.droppable, mouse.hovering.droppable.nextElementSibling);
                    Methods.presert(mouse.dragging.element.parentNode.creator, mouse.hovering.droppable.parentNode.creator, null);
                } else {
                    let element = createDomElement({name: "ul", appendTo: this.el.parentNode});
                    createDomElement({name: "div", class: "arrow collapsed", prependTo: this.el.parentNode});
                    createDomElement({name: "div", class: "icon", prependTo: this.el.parentNode});
                    this.el.parentNode.classList += " carrying";
                    element.append(mouse.dragging.element.parentNode);
                    this.el.parentNode.creator.prepend(mouse.dragging.element.parentNode.creator);
                }
            }
        }
        mouse.hovering.dropUl = "";
    }

    if (keySequence.APPEND()||appendingGL) {
        (this.el.classList.contains("hi") && wnd && mouse.dragging.elementClass && !(this.el.isEqualNode(wnd) || this.el.isEqualNode(wnd.parentNode) || this.el.parentNode.isEqualNode(wnd))) ? this.append() : "";
    }
};

MouseEventHandler.prototype.dblclick = function() {
    console.log(this.el.classList.contains("genie-compressed-layout"))
};

MouseEventHandler.prototype.right_click = function() {

};

MouseEventHandler.prototype.contextmenu = function() {
    this.element.preventDefault();
    //if (this.el.classList.contains("genie-compressed-layout")||this.el.classList.contains("layout_title")){
    let el = document.querySelector(".contextmenu");
    el.style.display = `block`;
    el.style.left = `${this.element.clientX}px`;
    el.style.top = `${this.element.clientY}px`;
    lastContextMenuPt = this.el;
    //}
};

MouseEventHandler.prototype.click = function(){
        //inside element
    if (this.el.classList.contains("hi")){
        this.handleCurrentResize(this.el);
        BRICK.click(this.el);
    }else

        //compressed layout sidebar
    if (this.el.classList.contains("layout_title")) {
        //compressed layout title focus
        this.handleEditing(this.el);
        this.handleCurrentResize(this.el.parentNode.creator);
        hightlightAll();
    }else

    if (this.el.classList.contains("appendedTool")){
        this.handleCurrentResize(this.el.parentNode.parentElement);
    }else
        //toolbar items
    if (this.el.classList.contains("genie-paint-field")) {
        removeCurrentTool();
        highlightLayout();
        focusedElements = [];
    }

    else {
        focusedElements = [];
        /*document.getElementById("size-resize").style.display = "none";
        document.getElementById("position-resize").style.display = "none";
        document.getElementById("rot-resize-cont").style.display = "none";*/
    }
};

MouseEventHandler.prototype.handle_late_click = function(){
    //hide context menu
    let el = document.querySelector(".contextmenu");
    el?(el.style.display==="block"?el.style.display = `none`:""):"";

    //context menu clicks
    if (this.el.classList.contains("cm")){
        if (!this.el.classList.contains("carrying")) {
            let tag = this.el.querySelector("span").innerHTML;
            Elements[tag] === undefined ? Elements[tag] = 0 : Elements[tag]++;
            this.handleCurrentResize(new G(`${tag + "-" + Elements[tag].toString()}`).create(tag,null, lastContextMenuPt));
        }
    }else

    if (this.el.classList.contains("arrow")&&this.el.parentNode.classList.contains("carrying")){
        //if compressed layout list_item has other list_items
        Methods.toogle.classes(this.el,"expanded","collapsed");
        Methods.toogle.display(this.el.parentNode.querySelector("ul"));
    }else

    if (this.el.classList.contains("cancel")||this.el.classList.contains("window_close")){
        document.querySelector(".window").style.display = "none";
    }else

    if (this.el.classList.contains("code_display")){
        let cd = document.querySelector(".code_display");
        cd.readOnly = false;
        cd.style.cursor = "auto";
    }else

    if (this.el.classList.contains("genie-toolbar-item")) {
        toolbarItems(this.el);
        currentResize = this.el.innerHTML;
    } else

    if (this.el.classList.contains("gti")) {
        appendingGL = !appendingGL;
        Methods.toogle.classes(this.el, "toolbar-item-color", "lightblue");
    }
};

MouseEventHandler.prototype.hover = function(){
    //mouse.hover.droppable = this.el;
};

MouseEventHandler.prototype.append = function(){
    Styling.edit_style(mouse.dragging.elementClass,"top","1px",wnd.ruleIndex);
    Styling.edit_style(mouse.dragging.elementClass,"left","1px",wnd.ruleIndex);
    this.el.appendChild(wnd);
    reload_compressed_layout();
};

MouseEventHandler.prototype.handle_appendTool_drag = function(dragger, wnd){
    let f = (ml,mt, wnd)=>{
        //position
        if (dragger.left_resize) {
            // (ml >= 0) ? this.drag_style(wnd, "left", ml) : "";
            this.drag_style(wnd, "left", ml);
        } else if (dragger.top_resize) {
            // (mt >= 0) ? this.drag_style(wnd, "top", mt) : "";
            this.drag_style(wnd, "top", mt);
        }
        //size
        if (dragger.height_resize) {
            this.drag_style(wnd, "height", mt);
        } else if (dragger.width_resize) {
            this.drag_style(wnd, "width", ml);
        } else if (dragger.width_resize) {
            this.drag_style(wnd, "width", ml);
        }
    };
    if (no){
        //multiple
        for (let i = 0; i<mouse.dragging.elementClass.length;i++) {
            f(ml[i], mt[i], wnd[i]);
        }
    }else {
        f(ml, mt, wnd);
    }
};

MouseEventHandler.prototype.preventRotation = function(t){
    //document.getElementById("position-resize").style.transform = t;
    //document.getElementById("size-resize").style.transform = t;
    document.getElementById("rot-resize-cont").style.transform = t;
};

MouseEventHandler.prototype.handle_rotate = function(dragger, wnd,check){
    let pt = {x:(mouse.moving.point.x-dragger.pt.left)-center.x,y:(mouse.moving.point.y-dragger.pt.top-30)-center.y};
    if (no){

    }else {
        if (check){

        }else {
            if (dragger.height_resize === 0) {
                ml = `rotateX(${this.get_angle(dragger.angle.x, pt) - dragger.angle.x - 5}deg) rotateY(${dragger.angle.y}deg) rotateZ(${dragger.angle.z}deg)`;
                //this.preventRotation(`rotateX(${-this.get_angle(dragger.angle.x,pt)}deg) rotateY(${-dragger.angle.y}deg) rotateZ(${-dragger.angle.z}deg)`);
            } else if (dragger.height_resize === 1) {
                ml = `rotateY(${this.get_angle(dragger.angle.y, pt) - dragger.angle.y - 5}deg) rotateX(${dragger.angle.x}deg) rotateZ(${dragger.angle.z}deg)`;
                //this.preventRotation(`rotateY(${-this.get_angle(dragger.angle.y,pt)}deg) rotateX(${-dragger.angle.x}deg) rotateZ(${-dragger.angle.z}deg)`);
            } else if (dragger.height_resize === 2) {
                ml = `rotateZ(${(this.get_angle(dragger.angle.z, pt) - 90)}deg) rotateY(${dragger.angle.y}deg) rotateX(${dragger.angle.x}deg)`;
                //this.preventRotation(`rotateZ(${-this.get_angle(dragger.angle.z,pt)}deg) rotateY(${-dragger.angle.y}deg) rotateX(${-dragger.angle.x}deg)`);
            }

            Styling.edit_style(mouse.dragging.elementClass, "transform", ml, wnd.ruleIndex);
        }
    }
};

MouseEventHandler.prototype.get_angle = function(original, pt){
    if(pt.x >= 0 && pt.y <= 0){
        angle = Math.atan(Math.abs(pt.x/pt.y))*RADIAN_COEFFICIENT;
    }
    else if(pt.y >= 0 && pt.x >= 0){
        angle = 90 + Math.atan(Math.abs(pt.y/pt.x))*RADIAN_COEFFICIENT;
    }
    else if(pt.x <= 0 && pt.y >= 0){
        angle = 180 + Math.atan(Math.abs(pt.x/pt.y))*RADIAN_COEFFICIENT;
    }
    else if(pt.x <= 0 && pt.y <= 0){
        angle = 270 + Math.atan(Math.abs(pt.y/pt.x))*RADIAN_COEFFICIENT;
    }
    /*if(original%360- (rotation_count<0?angle-360:angle) >= 1) {
        rotation_count++;
    }else if((original%360 < 0?original%360 + 360:original%360) - angle <= -1){
        rotation_count --;
    }
    angle += rotation_count*360;*/
    return angle;
};

MouseEventHandler.prototype.handle_inside_element_drag = function(dragger,wnd) {
    let f = (ml, mt, wnd)=>{
        if (dragger.check === null) {
            this.handle_rotate(dragger, wnd)
        } else {
            if (dragger.check) {
                this.drag_style(wnd, "height", mt);
                this.drag_style(wnd, "width", ml);
            } else {
                /*(mt >= 0) ? this.drag_style(wnd, "top", mt) : "";
                (ml >= 0) ? this.drag_style(wnd, "left", ml) : "";*/
                this.drag_style(wnd, "top", mt);
                this.drag_style(wnd, "left", ml);
            }
        }
    };
    if (no) {
        //multiple
        for (let i = 0; i<mouse.dragging.elementClass.length;i++) {
            f(ml[i], mt[i], wnd[i]);
        }
    }else {
        //single
        f(ml, mt, wnd);
    }
};

MouseEventHandler.prototype.drag_style = function(wnd,property,value){
    Styling.edit_style(mouse.dragging.elementClass, property, `${(value)}px`, wnd.ruleIndex)
};

MouseEventHandler.prototype.normal_drag = function () {
    if (mouse.dragging.drag_start){
        isWindow = mouse.dragging.element.classList.contains("window_title");
        isInsideElement = mouse.dragging.element.classList.contains("hi");
        isAppendedTool = mouse.dragging.element.classList.contains("appendedTool");
        isRotationTool = mouse.dragging.element.classList.contains("rot-resize");
        isListItem = mouse.dragging.element.classList.contains("layout_title");
        is_field = mouse.dragging.element.classList.contains("genie-paint-field");
        no = focusedElements.length>1;
        if (isWindow) {
            mouse.dragging.elementClass = "window";
            wnd = mouse.dragging.element.parentNode.parentElement;
            dragger.pl = wnd.offsetLeft;
            dragger.pt = wnd.offsetTop;
        }
        else if (isInsideElement) {
            if (no){
                BRICK.multiple_drag_start();
            }else {
                BRICK.drag_start();
                wnd?wnd.style.pointerEvents = "none":"";
            }
        }
        else if (isAppendedTool) {
            if (no){
                Resizers.multiple_drag_start();
            }else {
                Resizers.drag_start();
            }
        }
        else if (isRotationTool) {
            wnd = inEl;
            mouse.dragging.elementClass = `${wnd.classList[0]}`;
            dragger.height_resize = mouse.dragging.element.id === "rotate_x"?1:mouse.dragging.element.id === "rotate_y"?0: mouse.dragging.element.id === "rotate_z"?2:"";
            dragger.pt = wnd.getBoundingClientRect();
            let str = (Styling.get_style(mouse.dragging.elementClass, "transform", wnd.ruleIndex)).split(" ");
            dragger.angle = {x:0,y:0,z:0};
            for (let i in str){
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
        }
    }
    else {
        if (!isListItem) {
            if (no){
                wnd = [];
                for (let i = 0;i<mouse.dragging.elementClass.length;i++) {
                    wnd.push(document.querySelector(`.${mouse.dragging.elementClass[i]}`));
                }
                if (isRotationTool) {
                    //this.handle_rotate(dragger, wnd);
                } else {
                    ml = [];
                    mt = [];
                    for (let i = 0;i<mouse.dragging.elementClass.length;i++) {
                        ml.push(dragger.pl[i] + mouse.dragging.offset.x);
                        mt.push(dragger.pt[i] + mouse.dragging.offset.y);
                    }
                    if (isInsideElement) {
                        //inside element
                        this.handle_inside_element_drag(dragger, wnd);
                    } else {
                        if (isAppendedTool) {
                            //append tool
                            this.handle_appendTool_drag(dragger, wnd);
                        } else {
                            Methods.changeClassProperty(`.${mouse.dragging.elementClass}`, [wnd], "left", `${100 * (ml) / window.innerWidth}%`);
                            Methods.changeClassProperty(`.${mouse.dragging.elementClass}`, [wnd], "top", `${100 * (mt) / window.innerHeight}%`);
                        }
                    }
                }

            }else {
                wnd = document.querySelector(`.${mouse.dragging.elementClass}`);
                //wnd.scrollIntoView(false);
                if (isRotationTool) {
                    this.handle_rotate(dragger, wnd);
                } else {
                    ml = dragger.pl + mouse.dragging.offset.x;
                    mt = dragger.pt + mouse.dragging.offset.y;
                    if (isInsideElement) {
                        //inside element
                        this.handle_inside_element_drag(dragger, wnd);
                    } else {
                        if (isAppendedTool) {
                            //append tool
                            this.handle_appendTool_drag(dragger, wnd);
                        } else {
                            Methods.changeClassProperty(`.${mouse.dragging.elementClass}`, [wnd], "left", `${100 * (ml) / window.innerWidth}%`);
                            Methods.changeClassProperty(`.${mouse.dragging.elementClass}`, [wnd], "top", `${100 * (mt) / window.innerHeight}%`);
                        }
                    }
                }
            }
        }else {
            mouse.dragging.elementClass = "layout_title";
        }
    }
};

MouseEventHandler.prototype.drag = function(){
    this.element.preventDefault();
    if (mouse.dragging.draggable === true) {
        mouse.dragging.offset = {
            x: mouse.moving.point.x - mouse.clicking.point.x,
            y: mouse.moving.point.y - mouse.clicking.point.y
        };
        if (mouse.dragging.element) {
            //two window separator
            if (mouse.dragging.element.classList.contains("separator")) {
                if (mouse.dragging.element.classList.contains("fill_width")) {
                    if (mouse.dragging.element.classList.contains("rs")){
                        if (mouse.dragging.element.classList.contains("r")){
                            this.separatedWindowDrag("Height", "y", true, true);
                        }else {
                            this.separatedWindowDrag("Height", "y", true);
                        }
                    }else {
                        this.separatedWindowDrag("Height", "y");
                    }
                }else if (mouse.dragging.element.classList.contains("fill_height")) {
                    if (mouse.dragging.element.classList.contains("cs")){
                        if (mouse.dragging.element.classList.contains("c")){
                            this.separatedWindowDrag("Width", "x", true, true);
                        }else {
                            this.separatedWindowDrag("Width", "x", true);
                        }
                    }else {
                        this.separatedWindowDrag("Width", "x");
                    }
                }
            }
            if (mouse.dragging.element.classList.contains("normal_drag")) {
                // for (let i = 0; i<focusedElements.length;i++) {
                //     console.log(focusedElements[i])
                this.normal_drag();
                // }
            }
        }
    }
};

MouseEventHandler.prototype.init=function(event,element) {
    if (event) {
        switch (event) {
            case "mouse_click":
                this.handle_late_click();
                this.handleCodePreview();
                break;
            case "dblclick":
                this.dblclick();
                break;
            case "right_click":
                this.right_click();
                break;
            case "contextmenu":
                this.contextmenu();
                break;
        }
    }else {


        //mousedown - drag
        if (mouse.clicking.status) {
            clk = false;
            this.mouse_down();
            if (mouse.moving.status) {
                if (!((mouse.moving.point.x === mouse.clicking.point.x) && (mouse.moving.point.y === mouse.clicking.point.y))) {
                    mouse.dragging.status = true;
                    g_timer = true;
                    this.drag();
                }else {
                    clk = true;
                }
            }else {
                clk = true;
            }
            if (clk){
                this.click();
            }
        }
        //hovering
        if (mouse.hovering.status) {
            this.handleHovering();
        }else {
            //mouseup
            if (mouse.releasing.status && !mouse.moving.status&&!mouse.hovering.status) {
                this.released();
            }
        }
        //hover
        if (mouse.hover.status) {
            this.hover();
        }
    }
};

function rqst() {
    sendRequest({project_name:h["children"][0]["title"],project:h.innerHTML});
}

/*
***************************************
 ==== 7. ELEMENTS
 ***************************************
*/


