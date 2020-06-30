/*tools*/
let RotationalTool = `<div id="rot-resize-cont" class="rot-resize-cont align_center normal_drag _tool rot">
    <div id="rotate_z" class="rot-resize normal_drag"></div>
    <div id="rotate_x" class="rot-resize normal_drag"></div>
    <div id="rotate_y" class="rot-resize normal_drag"></div>
    </div>`;
let PositionTool = `
    <div id="position-resize" class="position-resize _tool">
        <div id="top_resize" class="appendedTool normal_drag verticalAppendedTool position">
            <div class="point tool" id="top_resize_point" style="border-bottom-color: lightblue"></div>
            <div class="point_tail tool" id="top_resize_point_tail" style="border-bottom-color: lightblue"></div>
        </div>
        <div id="left_resize" class="appendedTool normal_drag horizontalAppendedTool position">
            <div class="point tool" id="left_resize_point" style="border-right-color: lightblue"></div>
            <div class="point_tail tool" id="left_resize_point_tail" style="border-right-color: lightblue"></div>
        </div>
    </div>
`;
let SizeTool = `
    <div id="size-resize" class="size-resize _tool">
        <div id="height_resize" class="appendedTool normal_drag verticalAppendedTool size">
            <div class="point tool" id="height_resize_point" style="border-bottom-color: lightblue"></div>
            <div class="point_tail tool" id="height_resize_point_tail" style="border-bottom-color: lightblue"></div>
        </div>
        <div id="width_resize" class="appendedTool normal_drag horizontalAppendedTool size">
            <div class="point tool" id="width_resize_point" style="border-right-color: lightblue"></div>
            <div class="point_tail tool" id="width_resize_point_tail" style="border-right-color: lightblue"></div>
        </div>
    </div>
`;
let traditionalTool = `
    <g id="traditional" class="traditional _tool">
        <rect id="t_top_left" class="t_tool normal_drag "></rect>
        <rect id="t_top" class=" t_tool normal_drag "></rect>
        <rect id="t_top_right" class=" t_tool normal_drag "></rect>
        <rect id="t_right" class=" t_tool normal_drag "></rect>
        <rect id="t_bottom_right" class=" t_tool normal_drag "></rect>              
        <rect id="t_bottom" class=" t_tool normal_drag "></rect>              
        <rect id="t_bottom_left" class=" t_tool normal_drag "></rect>
        <rect id="t_left" class=" t_tool normal_drag "></rect>
        <rect id="t_rot" class=" t_tool normal_drag ">
            <path id="t_rot_neck" style="position:absolute;"></path>
        </rect>
    </g>
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
const RADIAN_COEFFICIENT = 180 / Math.PI;


/*
***************************************
 ==== 7. GLOBAL VARIABLES
***************************************
*/
let wnd, isWindow, isInsideElement, isAppendedTool, isListItem, isTTool, isRotationTool, no = 0, is_field;
let appendingGL = false;
let timeOut;
let my_icons = {
    // DIV: "cat-baby",
    DIV: "box-arrow",
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
let typing = false;
let deleted = [];
let redone = [];
let sequencedKeys = [];
let g_timer = false;
let orient = '';
let seprator = {
    pw: 0,
    lftw: 0,
}, h;
let inEl = null;
let dragger = {
    pl: 0,
    pt: 0,
};
let lft;
let right;
let mouse = {
    clicking: {
        status: false,
        point: {
            x: 0,
            y: 0
        },
    },
    dragging: {
        status: false,
        offset: {
            x: 0,
            y: 0
        },
        draggable: false,
        drag_start: {
            status: false,
            element: "",
        },
        id: null,
        element: null
    },
    hovering: {
        status: false,
        point: {
            x: 0,
            y: 0
        },
        droppable: "",
        dropUl: "",
        carrying: false,
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
        status: false,
    }
};
let global_log_depth = 5;
let systemClasses = ["hi", "normal_drag"];
let lastContextMenuPt = null;
let highlightObj = {};
let KEY = {
    isNum: function (key) {
        return key > 47 && key < 58;
    },
    isCharCode: function (key) {
        return KEY.isNum(key) ||
            KEY.isNum(key) ||
            KEY.isSpace(key) ||
            KEY.isLetter(key) ||
            KEY.isEditKeys(key) ||
            KEY.isSpecialChars(key) ||
            KEY.isSquareBrackets(key) ||
            KEY.isNumPadKeys(key);
    },
    isSpace: function (key) {
        return key === 32 || key === 13;
    },
    isEditKeys: function (key) {
        return key === 46 || key === 8;
    },
    isLetter: function (key) {
        return key > 64 && key < 91;
    },
    isNumPadKeys: function (key) {
        return key > 95 && key < 112;
    },
    isSpecialChars: function (key) {
        return key > 185 && key < 193;
    },
    isSquareBrackets: function (key) {
        return key > 218 && key < 223;
    }
};
let instantChanges = {
    isB: function (obj) {
        return document.queryCommandState("bold")
    },
    B: function (obj) {
        try {
            document.execCommand("bold")
        } catch (e) {
            instantChanges.wrapTextWith(obj, document.createElement("b"));
        }
        checkIfBoldOrItalic();
    },
    I: function (obj) {
        try {
            document.execCommand("italic")
        } catch (e) {
            instantChanges.wrapTextWith(obj, document.createElement("i"));
        }
        checkIfBoldOrItalic();
    },
    isI: function (obj) {
        return document.queryCommandState("italic");
    },
    Color: function (obj, color) {
        let font = document.createElement("font");
        font.color = color || "red";
        instantChanges.wrapTextWith(obj, font);
    },
    Background: function (obj, bgcolor) {
        let font = document.createElement("font");
        font.style.backgroundColor = bgcolor || "red";
        instantChanges.wrapTextWith(obj, font);
    },
    wrapTextWith: function (obj, newElement) {
        let b4 = document.createTextNode(obj.start);
        obj.parent.replaceChild(b4, obj.el);
        Methods.presert(newElement, obj.parent, b4.nextElementSibling);
        newElement.appendChild(document.createTextNode(obj.text));
        Methods.presert(document.createTextNode(obj.end), obj.parent, newElement.nextElementSibling);
    }
};
let Methods = {
    edit: {
        allow: (el) => {
            el.readOnly = false;
            el.style.cursor = "auto";
            el.style.color = "blue";
            currentBeingTyped = el;
            typing = true;
        },
        block: (el) => {
            el.readOnly = true;
            typing = false;
            for (let i = 0; i < focusedElements.length; i++) {
                focusedElements[i].readOnly = true;
                focusedElements[i].style.cursor = focusedElements[i].classList.contains("hi") ? "all-scroll" : "pointer";
                /*focusedElements[i].style.color = "inherit";*/
                currentBeingTyped = [];
            }
        }
    },
    find: function (array, item) {
        if (array.length > 0) {
            return array.indexOf(item) !== -1;
        }
    },
    getSelectedText: function () {
        if (window.getSelection) {
            return window.getSelection()
        }
    },
    single_split: function (str, s) {
        let lst = "", lst1 = "", c = false;
        for (let i = 0, len = str.length; i < len; i++) {
            if (str[i] === s) {
                c = true;
                continue
            }
            if (!c) {
                lst += str[i];
            } else {
                lst1 += str[i];
            }
        }
        return [lst, lst1];
    },
    isInViewPort: function (el, bound) {
        if (bound){
            let rect = el.getBoundingClientRect();
            return rect.top >= 0 && rect.left >= 0 &&
                rect.bottom <= bound.clientHeight&&
                rect.right <= bound.clientWidth;
        }else {
            let rect = el.getBoundingClientRect();
            return rect.top >= 0 && rect.left >= 0 &&
                rect.bottom <= window.innerHeight || document.documentElement.clientHeight &&
                rect.right <= window.innerWidth || document.documentElement.clientWidth;
        }
        },
    remove_duplicates: function (arr) {
        return arr.filter((t = {}, a => !(t[a] = a in t)));
    },
    inRange: function (num, start, end) {
        return num >= start && num <= end;
    },
    remove: function (array, item) {
        if (Methods.find(array, item)) {
            array.splice(array.indexOf(item), 1);
        }
    },
    removeSpaces: function (string) {
        return string.replace(/\s/g, '');
    },
    trim: function (string) {
        return string.replace(/^\s+|\s+$/g, '');
    },
    removeNode: function (element) {
        element.parentNode.removeChild(element);
    },
    reverse: function (str, separator, joiner) {
        return str.split(`${separator || " "}`).reverse().join(`${joiner || " "}`)/*.substr(0,str.length-1-(fromRight||0));*/
    },
    presert: function (concernedNode, concerned_parent, nodeAfter) {
        try {
            nodeAfter = concerned_parent.contains(nodeAfter) ? nodeAfter : null;
            concerned_parent.insertBefore(concernedNode, nodeAfter)
        } catch (e) {
            console.log("shit, a parent on a child?")
        }
    },
    changeClassProperty: function (cls, elements, property, newValue, oldValue) {
        document.querySelectorAll(`${cls}`).forEach(function (el) {
            Methods.find(elements, el) ? el.style[`${property}`] = newValue : el.style[`${property}`] = oldValue || el.style[`${property}`];
        })
    },
    toogle: {
        display: function (element) {
            let display = element.style.display;
            display = display === "none" ? "block" : "none";
            element.style.display = display;
        },
        classes: function (element, class1, class2) {
            let cls = element.classList;
            if (cls.contains(`${class1}`)) {
                element.classList.remove(`${class1}`);
                element.classList.add(`${class2}`);
            } else if (cls.contains(`${class2}`)) {
                element.classList.remove(`${class2}`);
                element.classList.add(`${class1}`);
            } else {
                /*element.classList.add(`${class2}`);*/
            }
        }
    },/*
    getIndex : (element)=>{
        let i = 0;
        while ((element = element.previousSibling) !== null){i++}
        return i;
    }*/
    addToIndex: function (array, item, index) {
        array.splice(index, 0, item);
    },
    replace: function (array, old, _new) {
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
    h = createDomElement({name: "div"});
    h.innerHTML = projectObject;
    new Compressed_layout("window_body_left_bottom", "container", h).init();
}

function setAttributesTo(attr, el1, el2) {
    function f(el1, el2) {
        for (let i in el1) {
            if (el1.hasOwnProperty(i)) {
                el1[i][`${attr}`] = el2[i];
                if (el1[i].querySelector("ul") && el1[i].querySelector("ul")["children"].length > 0) {
                    f(el1[i].querySelector("ul")["children"], el2[i]["children"]);
                }
            }
        }
    }

    el1[`${attr}`] = el2;
    f(el1.querySelector("ul") ? el1.querySelector("ul")["children"] : "", el2["children"]);
}
function get_angle(original, pt) {
    if (pt.x >= 0 && pt.y <= 0) {
        angle = Math.atan(Math.abs(pt.x / pt.y)) * RADIAN_COEFFICIENT;
    } else if (pt.y >= 0 && pt.x >= 0) {
        angle = 90 + Math.atan(Math.abs(pt.y / pt.x)) * RADIAN_COEFFICIENT;
    } else if (pt.x <= 0 && pt.y >= 0) {
        angle = 180 + Math.atan(Math.abs(pt.x / pt.y)) * RADIAN_COEFFICIENT;
    } else if (pt.x <= 0 && pt.y <= 0) {
        angle = 270 + Math.atan(Math.abs(pt.y / pt.x)) * RADIAN_COEFFICIENT;
    }
    /*if(original%360- (rotation_count<0?angle-360:angle) >= 1) {
        rotation_count++;
    }else if((original%360 < 0?original%360 + 360:original%360) - angle <= -1){
        rotation_count --;
    }
    angle += rotation_count*360;*/
    return angle;
}

function removeEditable() {
    for (let i = 0, len = focusedElements.length; i < len; i++) {
        focusedElements[i].contentEditable = false;
    }
    typing = false;
    BRICK.typing = false;
}


function drag_style (wnd, property, value) {
    Styling.edit_style(mouse.dragging.id, property, value, wnd.ruleIndex)
}


function click(el, e) {
    /*inside element*/
    if (el.classList.contains("hi")) {
        handleCurrentResize(el);
        BRICK.click(el);
    } else

        /*compressed layout sidebar*/
    if (el.classList.contains("layout_title")) {
        /*compressed layout title focus*/
        handleEditing(el);
        handleCurrentResize(el.parentNode.creator);
        hightlightAll();
    } else if (el.classList.contains("appendedTool")) {
        handleCurrentResize(el.parentNode.parentElement);
    } else if (el.classList.contains("gti")) {
        e.preventDefault();
        let txt = el.id;
        if (txt === "A") {
            appendingGL = !appendingGL;
            Methods.toogle.classes(el, "toolbar-item-color", "lightblue");
        } else {
            document.getElementById("I").classList.remove("lightblue");
            document.getElementById("B").classList.remove("lightblue");
            HandleHightlightedText();
            instantChanges[txt.toString()](highlightObj);
            window.clearTimeout(timeOut);
            timeOut = setTimeout(function () {
                document.getElementById("genie-instant-toolbar").style.display = "none";
            }, 3000);
        }
        /*Methods.toogle.classes(this.el, "toolbar-item-color", "lightblue");*/
    } else
        /*
                toolbar items
        */
    if (el.classList.contains("genie-paint-field")) {
        handleEditing(el);
        removeCurrentTool();
        highlightLayout();
        removeEditable();
        /*
                remove instant toolbar
        */
        window.clearTimeout(timeOut);
        document.getElementById("genie-instant-toolbar").style.display = "none";

        focusedElements = [];
    } else {
        /*focusedElements = [];*/
        /*document.getElementById("size-resize").style.display = "none";
        document.getElementById("position-resize").style.display = "none";
        document.getElementById("rot-resize-cont").style.display = "none";*/
    }
}

function isDraggable(el) {
    return el.classList.contains("normal_drag");
}

function displayInstantToolbar() {
    window.clearTimeout(timeOut);
    document.getElementById("genie-instant-toolbar").style.display = "flex";
}

function slowRemoveInstantToolbar() {
    window.clearTimeout(timeOut);
    timeOut = setTimeout(function () {
        document.getElementById("genie-instant-toolbar").style.display = "none";
    }, 3000);
}

function highlightLayout(el) {
    Methods.changeClassProperty(".compressed_layout li .layout_title", el || focusedElements, "background", "lightblue", "white");
}

function HandleHightlightedText() {
    let h_obj = Methods.getSelectedText();
    let _start = h_obj.anchorOffset,
        _end = h_obj.focusOffset,
        _parent = h_obj.focusNode.parentElement,
        _el = _parent.childNodes[0];
    let a = _start;
    _start = _start > _end ? _end : _start;
    _end = a > _end ? a : _end;
    if ((_start === _end)) {
        highlightObj = {};
        /*checkIfBoldOrItalic();*/
    } else {
        /*checkIfBoldOrItalic();*/
        highlightObj = {
            el: _el,
            parent: _parent,
            text: _el.nodeValue.substring(_start, _end),
            start: _el.nodeValue.substring(0, _start),
            end: _el.nodeValue.substring(_end)
        };
        document.getElementById("genie-instant-toolbar").style.display = "flex";
        slowRemoveInstantToolbar();
    }
}

function checkIfBoldOrItalic() {
    let bold = instantChanges.isB(highlightObj);
    let italic = instantChanges.isI(highlightObj);
    let a = document.getElementById("B");
    let b = document.getElementById("I");
    if (bold || italic) {
        if (bold) {
            a.classList.remove("toolbar-item-color");
            a.classList.add("lightblue");
        }
        if (italic) {
            b.classList.remove("toolbar-item-color");
            b.classList.add("lightblue");
        }
    } else {
        if (!bold) {
            a.classList.remove("lightblue");
            a.classList.add("toolbar-item-color");
        }
        if (!italic) {
            b.classList.remove("lightblue");
            b.classList.add("toolbar-item-color");
        }
    }
}

function syncCloneId(el, el1, cd) {
    let tag = el1.tagName.toLowerCase();
    Elements[tag] === undefined ? Elements[tag] = 0 : Elements[tag]++;
    let id = `${tag + "-" + Elements[tag].toString()}`;
    el.id = id;
    cd.querySelector("input") ? cd.querySelector("input").value = id : "";
    let c = Styling.get_style(el1.id, null, el1.ruleIndex, true);
    c ? initiateStyle(null, id, c.cssText.split("{")[1]) : "";
    el.ruleIndex = ruleIndex;
    el.done = cd;
    cd.creator = el;
}

function clone(el) {
    let cloned = el.cloneNode(true);
    let clone_done = el.done.cloneNode(true);
    syncCloneId(cloned, el, clone_done);

    function f(el, el1, cd) {
        for (let i in el) {
            if (el.hasOwnProperty(i)) {
                syncCloneId(el[i], el1[i], cd[i]);
                if (el[i]["children"] && el[i]["children"].length > 0) {
                    f(el[i]["children"], el1[i]["children"], cd[i].querySelector("ul") ? cd[i].querySelector("ul")["children"] : "");
                }
            }
        }
    }

    clone_done.querySelector("ul") ? f(cloned["children"], el["children"], clone_done.querySelector("ul")["children"]) : "";
    return [cloned, clone_done];
    /*f(el.querySelector("div>.hi")["children"], el2["children"]);*/
}

function createDomElement(args) {
    let el = document.createElement(args.name);
    args.class ? el.classList += args.class : "";
    args.id ? el.id = args.id : "";
    args.creator ? el.creator = args.creator : "";
    args.innerHTML ? el.innerHTML = args.innerHTML : "";
    args.value ? el.value = args.value : "";
    args.contentEditable ? el.contentEditable = args.contentEditable : "";
    args.appendTo ? args.appendTo.appendChild(el) : "";
    args.prependTo ? args.prependTo.prepend(el) : "";
    return el;
}

function clsName(classList) {
    for (let i = 0; i < systemClasses.length; i++) {
        Methods.remove(classList, systemClasses[i]);
    }
    return classList;
}

function toolbarItems(el) {
    Methods.changeClassProperty(".genie-toolbar-item", [el], "backgroundColor", "lightblue", "#f3f3f3");
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
    for (let i = 0; i < focusedElements.length; i++) {
        if (focusedElements[i].classList.contains(`${cls}`)) {
            lst.push(`${focusedElements[i].id}`);
            lst1.push(focusedElements[i])
        } else if (focusedElements[i].parentNode.creator) {
            lst.push(`${focusedElements[i].parentNode.creator.id}`);
            lst1.push(focusedElements[i].parentNode.creator)
        }
    }
    return [lst, lst1];
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
            let y = createDomElement({name: "div"});
            y.innerHTML = RotationalTool;
            resize = y.querySelector("#rot-resize-cont");
            f(resize, 80);
            break;
        case "T":
            let tr = createDomElement({name: "div"});
            tr.innerHTML = traditionalTool;
            resize = tr.querySelector("#traditional");
            f(resize);
            break;
    }

    function f(p, flag) {
        if (el) {
            /*if (e){
                center = {x: e.pageX-el.getBoundingClientRect().left, y: e.pageY-el.getBoundingClientRect().top};
            }else{*/
            center = {x: el.clientWidth / 2, y: el.clientHeight / 2};

            /*}*/

            el.appendChild(p);
            p.style.left = `${center.x - (flag ? flag : 40)}px`;
            p.style.top = `${center.y - (flag ? flag : 0)}px`;
        } else {
            for (let i = 0, len = focusedElements.length; i < len; i++) {
                if (focusedElements[i].classList.contains("hi")) {
                    center = {x: focusedElements[i].clientWidth / 2, y: focusedElements[i].clientHeight / 2};
                    focusedElements[i].appendChild(p);
                    p.style.left = `${center.x - (flag ? flag : 40)}px`;
                    p.style.top = `${center.y - (flag ? flag : 0)}px`;
                }
            }
        }
    }
}

function removeCurrentTool(el) {
    if (el) {
        Methods.removeNode(el.querySelector("._tool"));
        Methods.remove(focusedElements, el);
    } else {
        document.querySelectorAll("._tool").forEach(function (e) {
            Methods.removeNode(e);
        });
    }
}

function reloadCurrentTool(el) {
    removeCurrentTool();
    addCurrentTool();
}

function handleEditing(el) {
    if (el.classList.contains("editable")) {
        if (!Methods.find(focusedElements, el.parentNode.creator)) {
            Methods.edit.block(el);
        }
    }
}

function handleCurrentResize(el) {
    if (Methods.find(focusedElements, el)) {
        if (BRICK.typing) {

        } else {
            /*on double clicking list_title*/
            if (keySequence.isSequenced([CTRL])) {
                Methods.remove(focusedElements, el);
                removeCurrentTool(el);
            }
        }
    } else {
            /*if ctrl is down ,multi-select!*/
            if (keySequence.isSequenced([CTRL])) {
                removeEditable();
                Styling.edit_style("", "cursor", "all-scroll", el.ruleIndex);
                focusedElements.push(el);
                addCurrentTool(el);
            } else {
                new Styles(el).init();
                removeEditable();
                removeCurrentTool();
                Styling.edit_style("", "cursor", "all-scroll", el.ruleIndex);
                addCurrentTool(el);
                focusedElements = [];
                focusedElements.push(el);

            }

    }
}

function Compressed_layout(parentClass, cls, data) {
    this.parentContainer = document.querySelector(`.${parentClass}`);
    this.currentWindowData = data || document.querySelector(`.${cls}`);
    this.listContainer = createDomElement({name: "ul", class: "ul_main"});

    this.init = () => {
        /*this.parentContainer.style.overflow = "overlay";*/
        let cont = createDomElement({name: "div", class: "compressed_layout"});
        console.time("loop");
        loop(this.currentWindowData['children'], this.listContainer);
        console.timeEnd("loop");
        cont.appendChild(this.listContainer);
        this.parentContainer.innerHTML = "";
        this.parentContainer.appendChild(cont);
        cont = null;
        let my_con = document.querySelector('.compressed_layout');

        /*Expand or collapse*/
        my_con.querySelectorAll('.compressed_layout .list_item').forEach(function (element) {
            element.classList.contains('carrying') ? element.querySelector("ul").style.display = "none" : "";
        });
    };

    function loop(links, ul) {
        for (let obj in links) {
            if (links.hasOwnProperty(obj)) {
                let li = createDomElement({name: "li", class: "list_item", appendTo: ul, creator: links[obj]}),
                    title = links[obj]["title"] ? links[obj]["title"] : links[obj].id;
                let sp = createDomElement({
                    name: "input",
                    class: "layout_title editable clickable normal_drag",
                    appendTo: li,
                    value: title
                });
                sp.setAttribute("readonly", "true");
                let ic = createDomElement({name: "div", class: "icon", prependTo: li});
                ic.innerHTML = `<svg viewBox="0 0 24 24" class="" width="100%" height="100%"><use xlink:href="../sources/svg_icons.svg#${my_icons[links[obj].tagName]}"></use></svg>`;
                links[obj].done = li;
                if (links[obj]['children'] && links[obj]['children'].length > 0) {
                    createDomElement({name: "div", class: "arrow collapsed", prependTo: li});
                    let ul2 = createDomElement({name: "ul", appendTo: li});
                    li.classList += " carrying";
                    loop(links[obj]['children'], ul2);
                } else {
                    /*createDomElement({name: "div", class: "leaf_node", prependTo: li});*/
                }
            }

        }
    }
}

function reload_compressed_layout() {
    new Compressed_layout("genie-compressed-layout", "container", boundary.el).init();
}


/*
***************************************
 ==== 7. EVENTS
 ***************************************
 */


function Events() {
    this.default = () => {
        window.addEventListener("keydown", function (e) {
            new KeyEventHandler(e, "key_down");
        });

        window.addEventListener("keyup", function (e) {
            new KeyEventHandler(e, "key_up");
        });

        window.addEventListener("mousedown", function (e) {
            mouse.releasing.status = false;
            mouse.clicking.status = true;
            mouse.clicking.point = {x: e.clientX, y: e.clientY};
            click(e.target, e);
            new MouseEventHandler(e);
        });

        window.addEventListener("mousemove", function (e) {
            mouse.moving.status = true;
            mouse.moving.point = {x: e.clientX, y: e.clientY};
            new MouseEventHandler(e);
        });


        window.addEventListener("mouseup", function (e) {
            /*e.preventDefault();
            e.stopPropagation();*/
            g_timer = false;
            mouse.hovering.status = false;
            mouse.moving.status = false;
            mouse.dragging.status = false;
            mouse.clicking.point = {x: e.clientX, y: e.clientY};
            mouse.releasing.status = true;
            mouse.clicking.status = false;
            new MouseEventHandler(e);
            if (mouse.dragging.id instanceof Array) {
                for (let i = 0; i < focusedElements.length; i++) {
                    document.getElementById(`${(mouse.dragging.id[i])}`).style.pointerEvents = "auto"
                }
            } else {
                if (mouse.dragging.id) {
                    let t = document.getElementById(`${(mouse.dragging.id)}`);
                    t.classList.contains("hi") ? t.style.pointerEvents = "auto" : "";
                } else {

                }
            }
            mouse.dragging.element = null;
        });

        window.addEventListener("click", function (e) {
            new MouseEventHandler(e, "mouse_click");
        }, false);

        window.addEventListener("mouseout", function (e) {
            e.stopPropagation();
            mouse.hovering.status = true;
            mouse.hovering.point = {x: e.clientX, y: e.clientY};
            new MouseEventHandler(e);
        });

        window.addEventListener("dblclick", function (e) {
            new MouseEventHandler(e, "dblclick");
        });

        window.addEventListener("auxclick", function (e) {
            new MouseEventHandler(e, "right_click");
        });

        window.addEventListener("contextmenu", function (e) {
            new MouseEventHandler(e, "contextmenu");
        });
    };
}

let keySequence = {
    isSequenced: (sequence_object) => {
        if ((sequence_object.length > 0 && sequencedKeys.length > 0) && sequence_object.length === sequencedKeys.length) {
            let f = () => {
                let t = true;
                for (let i = 0, len = sequencedKeys.length; i < len; i++) {
                    if (sequencedKeys[i] !== sequence_object[i]) {
                        t = false;
                    }
                }
                return t;
            };
            return f();
        } else return false;
    },
    DEL: () => {
        return keySequence.isSequenced([DEL]);
    },
    REDO: () => {
        return keySequence.isSequenced([CTRL, SHIFT, Z]);
    },
    UNDO: () => {
        return keySequence.isSequenced([CTRL, Z]);
    },
    DUP: () => {
        return keySequence.isSequenced([CTRL, D]);
    },
    APPEND: () => {
        return keySequence.isSequenced([ALT, A]);
    },
    POS_RESIZE: () => {
        return keySequence.isSequenced([Q]);
    },
    TRADITIONAL_TOOL: () => {
        return keySequence.isSequenced([T]);
    },
    SIZE_RESIZE: () => {
        return keySequence.isSequenced([W]);
    },
    ROT_RESIZE: () => {
        return keySequence.isSequenced([E]);
    }
};

/*
***************************************
 ==== 7. KEY EVENT HANDLER
***************************************
*/

function KeyEventHandler(element, event) {
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

KeyEventHandler.prototype.handleDelete = function () {
    let lst = [];
    for (let i = 0, len = focusedElements.length; i < len; i++) {
        if (focusedElements[i]) {
            if (focusedElements[i].parentNode.classList.contains("list_item") || focusedElements[i].classList.contains("hi")) {
                lst.push(focusedElements[i]);
            }
        }
    }
    removeCurrentTool();
    this.delete(lst)
};

KeyEventHandler.prototype.delete = function (elements) {
    let temp = [], element, is_inside_element = false;
    for (let i = 0; i < elements.length; i++) {
        element = elements[i];
        is_inside_element = element.classList.contains("hi");
        if (deleted.length < global_log_depth) {
            !is_inside_element ?
                temp.push({
                    elem: element,
                    parent: element.parentNode.parentNode,
                    concerned: element.parentNode,
                    next: element.parentNode.previousElementSibling,
                    creator_parent: element.parentNode.creator.parentNode,
                    creator_concerned: element.parentNode.creator,
                    next_parent: element.parentNode.creator.previousElementSibling
                }) : temp.push({
                    parent: element.parentNode,
                    concerned: element,
                    next: element.previousElementSibling,
                    done_parent: element.done.parentNode,
                    done_concerned: element.done,
                    done_next_parent: element.done.previousElementSibling
                });
        }
        if (is_inside_element) {
            Methods.removeNode(element);
            Methods.removeNode(element.done);
            mouse.dragging.id = null;
            wnd = null;
        } else {
            Methods.removeNode(element.parentNode.creator);
            Methods.removeNode(element.parentNode);
        }
    }
    deleted.push(temp);
};

KeyEventHandler.prototype.handleUndoDelete = function () {
    if (deleted.length > 0) {
        let d = deleted[deleted.length - 1], lst = [];
        let e, p, n, ce, cp, np, t;
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
                mouse.dragging.id = e.id;
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

KeyEventHandler.prototype.handleRedoDelete = function () {
    if (redone.length > 0) {
        let r = redone[0], element, lst = [], t;
        for (let i = 0; i < r.length; i++) {
            t = r[i];
            element = t.elem || t.concerned;
            lst.push(element)
        }
        removeCurrentTool();
        this.delete(lst);
        Methods.remove(redone, r);
    }
};

KeyEventHandler.prototype.handleDuplicate = function () {
    let lst = [];
    for (let i = 0, len = focusedElements.length; i < len; i++) {
        if (focusedElements[i].parentNode.classList.contains("list_item")) {
            lst.push(focusedElements[i].parentNode);
        } else if (focusedElements[i].classList.contains("hi")) {
            lst.push(focusedElements[i]);
        }
    }
    this.duplicate(lst);
};

KeyEventHandler.prototype.duplicate = function (elems) {
    let elem, c, cc, len = elems.length, tag = "";
    for (let i = 0; i < len; i++) {
        elem = elems[i];
        if (elem.classList.contains("hi")) {
            removeCurrentTool(elem);
            c = clone(elem);
            Methods.presert(c[1], elem.done.parentNode, elem.done.nextElementSibling);
            Methods.presert(c[0], elem.parentNode, elem.nextElementSibling);
            focusedElements.push(c[0]);
            addCurrentTool(c[0]);
        } else {
            removeCurrentTool();
            c = clone(elem.creator);
            Methods.presert(c[0], elem.creator.parentNode, elem.creator.nextElementSibling);
            Methods.presert(c[1], elem.parentNode, elem.nextElementSibling);
            addCurrentTool(elem);
        }
    }
    hightlightAll();
};

KeyEventHandler.prototype.handleKeys = function () {
    if (!BRICK.typing) {
        if (!typing) {
            if (this.el.parentNode.classList.contains("rule-prop")) {
                if (!this.el.parentNode.classList.contains("el_prop")) {
                    if (KEY.isCharCode(this.key)) {
                        Styling.commentRuleProperty(Methods.trim(this.el.parentNode.querySelector(".prop").value), Methods.trim(this.el.parentNode.querySelector(".val").value), this.el.parentNode.querySelector(".rule-prop-check-box").ruleIndex);
                    }
                }
            } else if (keySequence.DEL()) {
                this.element.preventDefault();
                this.handleDelete();
            } else if (keySequence.UNDO()) {
                this.element.preventDefault();
                this.handleUndoDelete();
            } else if (keySequence.REDO()) {
                this.element.preventDefault();
                this.handleRedoDelete();
            } else if (keySequence.DUP()) {
                this.element.preventDefault();
                this.handleDuplicate();
            } else if (keySequence.POS_RESIZE()) {
                this.element.preventDefault();
                currentResize = "Q";
                toolbarItems(document.getElementById("Q"));
                reloadCurrentTool();
            } else if (keySequence.SIZE_RESIZE()) {
                this.element.preventDefault();
                currentResize = "W";
                toolbarItems(document.getElementById("W"));
                reloadCurrentTool();
            } else if (keySequence.ROT_RESIZE()) {
                this.element.preventDefault();
                currentResize = "E";
                toolbarItems(document.getElementById("E"));
                reloadCurrentTool();
            } else if (keySequence.TRADITIONAL_TOOL()) {
                this.element.preventDefault();
                currentResize = "T";
                toolbarItems(document.getElementById("T"));
                reloadCurrentTool();
            }
        }
    }
};

KeyEventHandler.prototype.handle_key_up = function () {
    if (this.el.classList.contains("code_display")) {
        let p = this.el.creator.parentNode.creator;
        p.innerHTML = "";
        p.innerHTML = this.el.target.value;
    } else {
        if (this.el.classList.contains("hi")) {
            HandleHightlightedText();
        } else if (this.el.classList.contains("layout_title")) {
            this.el.value = this.el.value.split(" ").join("-");
            let el = this.el.parentNode.creator;
            if (this.el.value.length > 0) {
                Styling.changeClass(el, `#${this.el.value}`);
            }
        } else if (this.el.classList.contains("prop")) {
            if (KEY.isCharCode(this.key)) {
                if (this.el.parentNode.classList.contains("el_prop")) {
                    let e = this.el.parentNode.el, v = Methods.removeSpaces(this.el.value.split("{")[0]);
                    Styling.changeClass(e, v);
                    e.done.querySelector("input").value = v;
                } else {
                    let val = this.el.parentNode.querySelector(".val");
                    Styling.UncommentRuleProperty(Methods.trim(this.el.value), Methods.trim(val.value), this.el.parentNode.querySelector(".rule-prop-check-box").ruleIndex);
                }
                this.el.style.width = (this.el.value.length + 1) * 6 + "px";
            }
        } else if (this.el.classList.contains("val")) {
            if (KEY.isCharCode(this.key)) {
                Styling.edit_style("", Methods.removeSpaces(this.el.parentNode.querySelector(".prop").value.split(":")[0]), Methods.trim(this.el.value.split(";")[0]), this.el.parentNode.querySelector(".rule-prop-check-box").ruleIndex);
                this.el.style.width = (this.el.value.length + 1) * 6 + "px";
            }
        }
    }
};

KeyEventHandler.prototype.def = function () {
    if (this.event === "key_down") {
        if (!Methods.find(sequencedKeys, this.key)) {
            sequencedKeys.push(this.key);
        }
        this.handleKeys();
    } else if (this.event === "key_up") {
        this.handle_key_up();
        Methods.remove(sequencedKeys, this.key)
    }
};

/*
***************************************
 ==== 7. MOUSE EVENT HANDLER
***************************************
*/

function MouseEventHandler(element, event) {
    this.element = element;
    this.el = this.element.target;
    this.event = event;

    this.init(this.event, this.element);
}

/*
***************************************
 ==== 7. MOUSE EVENT HANDLER METHODS
***************************************
*/

MouseEventHandler.prototype.handleHovering = function () {
    if (mouse.dragging.status) {
        if (this.el.classList.contains("layout_title")) {
            mouse.hovering.droppable = "";
            mouse.hovering.carrying = false;
            this.el = this.element.toElement;
            let parent = this.el.parentElement;
            if (parent.classList.contains("carrying")) {
                let arrow = parent.querySelector(".arrow"), ul = parent.querySelector("ul");
                ul.style.display = "block";
                if (arrow.classList.contains("collapsed")) {
                    arrow.classList.remove("collapsed");
                    arrow.classList.add("expanded");
                }
                // arrow.scrollIntoView(false);
                mouse.hovering.droppable = ul;
            }
            mouse.hovering.carrying = true;
        }
        /*else if(this.el.classList.contains("hi")){
             console.log("hi")
        }*/
    }
};

MouseEventHandler.prototype.separatedWindowDrag = function (orientation, direction, column_resizer, rightR) {
    if (mouse.dragging.drag_start) {
        right = this.el.nextElementSibling;
        lft = this.el.previousElementSibling;
        seprator.rightw = right ? right[`client${orientation}`] : null;
        seprator.lftw = lft ? lft[`client${orientation}`] : null;
        seprator.pw = lft ? lft.parentElement[`client${orientation}`] : null;
        orient = orientation.toLowerCase();
        right ? right.style.transition = "0s width" : "";
        lft ? lft.style.transition = "0s width" : "";
    } else {
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

MouseEventHandler.prototype.handleCodePreview = function () {
    if (this.el.classList.contains("layout_title")) {
        let cd = document.querySelector(".code_display");
        if (cd) {
            cd.value = this.el.parentNode.creator.innerHTML;
            cd.creator = this.el;
        }
    }
};

MouseEventHandler.prototype.mouse_down = function () {
    if (!g_timer) {
        if (isDraggable(this.el)) {
            mouse.dragging.drag_start = true;
            mouse.dragging.draggable = true;
            mouse.dragging.element = this.el;
        } else {
            mouse.dragging.draggable = false;
        }

    } else {
        mouse.dragging.drag_start = false;
    }
};

MouseEventHandler.prototype.released = function () {
    if (mouse.hovering.carrying) {
        if (mouse.dragging.id === "layout_title") {
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

    if (keySequence.APPEND() || appendingGL) {
        (this.el.classList.contains("hi") && wnd && mouse.dragging.id && !(this.el.isEqualNode(wnd) || this.el.isEqualNode(wnd.parentNode) || this.el.parentNode.isEqualNode(wnd))) ? this.append() : "";
    }
};

MouseEventHandler.prototype.dblclick = function () {
    if (this.el.classList.contains("hi")) {
        removeEditable();
        removeCurrentTool();
        /*if (!this.el.contentEditable) {
            removeEditable();
            removeCurrentTool();
            this.el.contentEditable = true;
        }*/
        BRICK.typing = true;
        this.el.contentEditable = true;
        Styling.edit_style("", "cursor", "text", this.el.ruleIndex)
    }else {
        if (this.el.classList.contains("editable")) {
            if (!Methods.find(currentBeingTyped, this.el)) {
                Methods.edit.allow(this.el);
            }
        }
    }
};

MouseEventHandler.prototype.right_click = function () {

};

MouseEventHandler.prototype.contextmenu = function () {
    this.element.preventDefault();
    /*if (this.el.classList.contains("genie-compressed-layout")||this.el.classList.contains("layout_title")){*/
    let el = document.querySelector(".contextmenu");
    el.style.display = `block`;
    el.style.left = `${this.element.clientX}px`;
    el.style.top = `${this.element.clientY}px`;
    lastContextMenuPt = this.el;
    /*}*/
};

MouseEventHandler.prototype.handle_late_click = function () {
    /*hide context menu*/
    let el = document.querySelector(".contextmenu");
    el ? (el.style.display === "block" ? el.style.display = `none` : "") : "";
    /*context menu clicks*/
    if (this.el.classList.contains("cm")) {
        if (!this.el.classList.contains("carrying")) {
            let tag = this.el.querySelector("span").textContent;
            Elements[tag] === undefined ? Elements[tag] = 0 : Elements[tag]++;
            let e = new G(`${tag + "-" + Elements[tag].toString()}`).create(tag, null, lastContextMenuPt);
            removeCurrentTool();
            addCurrentTool(e);
        }
    }
    else if (this.el.classList.contains("arrow") && this.el.parentNode.classList.contains("carrying")) {
        /*
                if compressed layout list_item has other list_items
        */
        Methods.toogle.classes(this.el, "expanded", "collapsed");
        Methods.toogle.display(this.el.parentNode.querySelector("ul"));
    }
    else if (this.el.classList.contains("cancel") || this.el.classList.contains("window_close")) {
        document.querySelector(".window").style.display = "none";
    }
    else if (this.el.classList.contains("code_display")) {
        let cd = document.querySelector(".code_display");
        cd.readOnly = false;
        cd.style.cursor = "auto";
    }
    else if (this.el.classList.contains("genie-toolbar-item")) {
        toolbarItems(this.el);
        currentResize = this.el.id;
        reloadCurrentTool();
    }
    else if (this.el.classList.contains("style-tab")) {
        if (this.el.id === "style-tab-title"){
            let a = document.getElementById("genie-styles-main");
            let b = document.getElementById("genie-classes-main");
            a.style.opacity = "1";
            b.style.opacity = "0";
            a.style.visibility = "visible";
            b.style.visibility = "hidden";
        }
        else if (this.el.id === "class-tab-title"){
            let a = document.getElementById("genie-styles-main");
            let b = document.getElementById("genie-classes-main");
            a.style.opacity = "0";
            b.style.opacity = "1";
            a.style.visibility = "hidden";
            b.style.visibility = "visible";
        }
        Methods.changeClassProperty(".style-tab", [this.el], "backgroundColor", "lightblue", "inherit");
        Methods.changeClassProperty(".style-tab", [this.el], "border-bottom", "1px solid rgba(11, 23, 64, 0.96)", "0");
    }
    else if (this.el.classList.contains("rule-prop-delete")) {
        let p = this.el.parentNode;
        Styling.commentRuleProperty(p.querySelector(".prop").value, p.querySelector(".val").value, this.el.ruleIndex);
        Methods.removeNode(p);

    }
    else if (this.el.classList.contains("rule-prop-check-box")) {
        let p = this.el.parentNode;
        if (this.el.checked) {
            Styling.UncommentRuleProperty(Methods.trim(p.querySelector(".prop").value), p.querySelector(".val").value, this.el.ruleIndex);
        } else {
            Styling.commentRuleProperty(Methods.trim(p.querySelector(".prop").value), p.querySelector(".val").value, this.el.ruleIndex);
        }
    }
    else if (this.el.classList.contains("rule-prop")) {
        if (newProp === null) {
            let p = renderStyle(" ", " ", this.el.querySelector(".rule-prop-check-box").ruleIndex);
            Methods.presert(p, this.el.parentNode, this.el.nextElementSibling);
            p.querySelector(".prop").select();
            newProp = p;
        } else {
            let f = () => {
                for (const e of newProp.querySelectorAll("input[type='text']")) {
                    if (e.value.length > 2) {
                        return true;
                    }
                }
                return false;
            };
            if (!f()) {
                Methods.removeNode(newProp);
            }
            newProp = null;
        }
    }
    else if (this.el.classList.contains("hi")) {
        if (BRICK.typing) {
            HandleHightlightedText();
        }
    }
    else if (this.el.id === "create-new-class-btn") {

    }


};

MouseEventHandler.prototype.hover = function () {
    /*
        mouse.hover.droppable = this.el;
    */
};

MouseEventHandler.prototype.append = function () {
    Styling.edit_style(mouse.dragging.id, "top", "1px", wnd.ruleIndex);
    Styling.edit_style(mouse.dragging.id, "left", "1px", wnd.ruleIndex);
    removeCurrentTool();
    if (wnd instanceof Array) {
        wnd = wnd[0]
    }
    if (wnd['children'] && wnd['children'].length > 0) {
        createDomElement({name: "div", class: "arrow collapsed", prependTo: this.el.done});
        createDomElement({name: "ul", appendTo: this.el.done}).append(wnd.done);
        !this.el.done.classList.contains("carrying") ? this.el.done.classList.add("carrying") : "";
        /*
                Expand or collapse
        */
    } else {
        createDomElement({name: "div", class: "arrow collapsed", prependTo: this.el.done});
        createDomElement({name: "ul", appendTo: this.el.done}).append(wnd.done);
    }
    let my_con = document.querySelector('.compressed_layout');
    my_con.querySelectorAll('.compressed_layout .list_item').forEach(function (element) {
        element.classList.contains('carrying') ? element.querySelector("ul").style.display = "none" : "";
    });
    this.el.append(wnd);
    addCurrentTool(wnd);
    /*
        reload_compressed_layout();
    */
};

MouseEventHandler.prototype.handle_appendTool_drag = function (dragger, wnd) {
    let f = (ml, mt, wnd) => {
        if (percX){
            ml = `${100 * ml / parentWidth}`;
        }
        if (percY){
            mt = `${100 * mt / parentHeight}`
        }
        /*
                position
        */
        if (dragger.left_resize) {
            /*
                        (ml >= 0) ? drag_style(wnd, "left", ml) : "";
            */
            drag_style(wnd, "left", `${ml + unitX}`);
            left_display.value = `${ml + unitX}`;
        } else if (dragger.top_resize) {
            /*
                        (mt >= 0) ? drag_style(wnd, "top", mt) : "";
            */
            drag_style(wnd, "top", `${mt + unitY}`);
            top_display.value = `${mt + unitY}`;
        }
        /*
                size
        */
        if (dragger.height_resize) {
            drag_style(wnd, "height", `${mt + unitY}`);
            height_display.value = `${mt + unitY}`;
        } else if (dragger.width_resize) {
            drag_style(wnd, "width", `${ml + unitX}`);
            width_display.value = `${ml + unitX}`;
        }
    };
    if (no) {
        /*
                multiple
        */
        for (let i = 0; i < mouse.dragging.id.length; i++) {
            f(ml[i], mt[i], wnd[i]);
        }
    } else {
        f(ml, mt, wnd);
    }
};

MouseEventHandler.prototype.preventRotation = function (t) {
    /*document.getElementById("position-resize").style.transform = t;
    document.getElementById("size-resize").style.transform = t;*/
    document.getElementById("rot-resize-cont").style.transform = t;
};

MouseEventHandler.prototype.handle_rotate = function (dragger, wnd, check) {
    ml = get_angle(dragger.angle, {
        x: (mouse.moving.point.x - dragger.originalD.left) - center.x,
        y: (mouse.moving.point.y - dragger.originalD.top) - center.y
    });
    if (no) {

    } else {
        if (check) {

        } else {
            if (dragger.rot_tool === 1) {
                /*
                                rotate y
                */
                Styling.edit_style(mouse.dragging.id, "transform", `rotateY(${ml/* - dragger.angle.y*/}deg)`, wnd.ruleIndex)
            } else if (dragger.rot_tool === 2) {
                /*
                                rotate z
                */
                Styling.edit_style(mouse.dragging.id, "transform", `rotateZ(${ml/* - dragger.angle.z*/}deg)`, wnd.ruleIndex)
            } else if (dragger.rot_tool === 0) {
                /*
                                rotate x
                */
                Styling.edit_style(mouse.dragging.id, "transform", `rotateX(${ml/* - dragger.angle.x*/}deg)`, wnd.ruleIndex)
            }
        }
    }
};

MouseEventHandler.prototype.handle_inside_element_drag = function (dragger, wnd) {
    let f = (ml, mt, wnd) => {
        if (dragger.check === null) {
            this.handle_rotate(dragger, wnd)
        } else {
            if (percX){
                ml = `${100 * ml / parentWidth}`;
            }
            if (percY){
                mt = `${100 * mt / parentHeight}`;
            }
            if (dragger.check) {
                drag_style(wnd, "height", `${mt + unitY}`);
                drag_style(wnd, "width", `${ml + unitX}`);
                height_display.value = `${mt + unitY}`;
                width_display.value = `${ml + unitX}`;
            } else {
                /*(mt >= 0) ? drag_style(wnd, "top", mt) : "";
                (ml >= 0) ? drag_style(wnd, "left", ml) : "";*/
                drag_style(wnd, "top", `${mt + unitY}`);
                drag_style(wnd, "left", `${ml + unitX}`);
                top_display.value = `${mt + unitY}`;
                left_display.value = `${ml + unitX}`;

                /*drag_style(wnd, "top", `${mt}px`);
                drag_style(wnd, "left", `${ml}px`);
                top_display.value = percY?`${100 * mt / parentHeight + unitY}`:`${mt + unitY}`;
                left_display.value = percX?`${100 * ml / parentWidth + unitX}`:`${ml + unitX}`;
*/
            }
        }
    };
    if (no) {
        /*
                multiple
        */
        for (let i = 0; i < mouse.dragging.id.length; i++) {
            f(ml[i], mt[i], wnd[i]);
        }
    } else {
        /*
                single
        */
        f(ml, mt, wnd);
    }
};

MouseEventHandler.prototype.normal_drag = function () {
    if (mouse.dragging.drag_start) {
        dragger = {};
        if (BRICK.typing) {
            isWindow = false;
            isInsideElement = false;
            isAppendedTool = false;
            isRotationTool = false;
            isListItem = false;
            is_field = false;
            isTTool = false;
        } else {
            isWindow = mouse.dragging.element.classList.contains("window_title");
            isInsideElement = mouse.dragging.element.classList.contains("hi");
            isAppendedTool = mouse.dragging.element.classList.contains("appendedTool");
            isRotationTool = mouse.dragging.element.classList.contains("rot-resize");
            isTTool = mouse.dragging.element.classList.contains("t_tool");
            isListItem = mouse.dragging.element.classList.contains("layout_title");
            is_field = mouse.dragging.element.classList.contains("genie-paint-field");
        }
        no = focusedElements.length > 1;
        if (isWindow) {
            mouse.dragging.id = "window";
            wnd = mouse.dragging.element.parentNode.parentElement;
            dragger.pl = wnd.offsetLeft;
            dragger.pt = wnd.offsetTop;
        } else if (isInsideElement) {
            if (no) {
                BRICK.multiple_drag_start();
            } else {
                BRICK.drag_start();
                wnd ? wnd.style.pointerEvents = "none" : "";
            }
        } else if (isAppendedTool) {
            if (no) {
                Resizers.multiple_drag_start();
            } else {
                Resizers.drag_start();
            }
        }  else if (isTTool) {
            if (no) {
                TraditionalTool.multiple_drag_start();
            } else {
                TraditionalTool.drag_start();
            }
        } else if (isRotationTool) {
            wnd = mouse.dragging.element.parentNode.parentNode;
            mouse.dragging.id = `${wnd.id}`;
            dragger.rot_tool = mouse.dragging.element.id === "rotate_x" ? 1 : mouse.dragging.element.id === "rotate_y" ? 0 : mouse.dragging.element.id === "rotate_z" ? 2 : "";
            dragger.pt = {x: mouse.dragging.offset.x - center.x, y: mouse.dragging.offset.y - center.y};
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
            dragger.originalD = wnd.getBoundingClientRect();
        }
    } else {
        if (!isListItem) {
            if (no) {
                wnd = [];
                for (let i = 0; i < mouse.dragging.id.length; i++) {
                    wnd.push(document.getElementById(`${mouse.dragging.id[i]}`));
                }

                if (isRotationTool) {
                    /*
                                        this.handle_rotate(dragger, wnd);
                    */
                } else {
                    ml = [];
                    mt = [];
                    for (let i = 0; i < mouse.dragging.id.length; i++) {
                        ml.push(dragger.pl[i] + mouse.dragging.offset.x);
                        mt.push(dragger.pt[i] + mouse.dragging.offset.y);
                    }
                    if (isInsideElement) {
                        /*
                                                inside element
                        */
                        this.handle_inside_element_drag(dragger, wnd);
                    } else {
                        if (isAppendedTool) {
                            /*
                                                        append tool
                            */
                            this.handle_appendTool_drag(dragger, wnd);
                        } else {
                            /*
                                                        traditional append tool
                            */
                            if (isTTool) {
                                TraditionalTool.handle_traditional_appendTools();
                            } else {
                                Methods.changeClassProperty(`.${mouse.dragging.id}`, [wnd], "left", `${100 * (ml) / window.innerWidth}%`);
                                Methods.changeClassProperty(`.${mouse.dragging.id}`, [wnd], "top", `${100 * (mt) / window.innerHeight}%`);
                            }
                        }
                    }
                }

            } else {
                /*
                                wnd.scrollIntoView(false);
                */
                if (isRotationTool) {
                    this.handle_rotate(dragger, wnd);
                } else {
                    wnd = document.getElementById(`${mouse.dragging.id}`);
                    ml = dragger.pl + mouse.dragging.offset.x;
                    mt = dragger.pt + mouse.dragging.offset.y;
                    if (isInsideElement) {
                        /*inside element*/
                        this.handle_inside_element_drag(dragger, wnd);
                    } else {
                        if (isAppendedTool) {
                            /*append tool*/
                            this.handle_appendTool_drag(dragger, wnd);
                        }else {
                            if (isTTool){
                                /*
                                                        traditional append tool
                            */
                                TraditionalTool.handle_traditional_appendTools()
                            }
                            else {
                                Methods.changeClassProperty(`.${mouse.dragging.id}`, [wnd], "left", `${100 * (ml) / window.innerWidth}%`);
                                Methods.changeClassProperty(`.${mouse.dragging.id}`, [wnd], "top", `${100 * (mt) / window.innerHeight}%`);
                            }
                        }
                    }
                }
            }
        } else {
            mouse.dragging.id = "layout_title";
        }
    }
};

MouseEventHandler.prototype.drag = function () {
    if (BRICK.typing) {
        mouse.dragging.draggable = false;
        /*mouse.dragging.element.draggable = false;*/
    } else {
        mouse.dragging.draggable = true;
        /*mouse.dragging.element.draggable = true;*/
        this.element.preventDefault();
    }
    /*
        this.element.preventDefault();
    */
    if (mouse.dragging.draggable === true) {
        mouse.dragging.offset = {
            x: mouse.moving.point.x - mouse.clicking.point.x,
            y: mouse.moving.point.y - mouse.clicking.point.y
        };
        if (mouse.dragging.element) {
            /*
                        two window separator
            */
            if (mouse.dragging.element.classList.contains("separator")) {
                if (mouse.dragging.element.classList.contains("fill_width")) {
                    if (mouse.dragging.element.classList.contains("rs")) {
                        if (mouse.dragging.element.classList.contains("r")) {
                            this.separatedWindowDrag("Height", "y", true, true);
                        } else {
                            this.separatedWindowDrag("Height", "y", true);
                        }
                    } else {
                        this.separatedWindowDrag("Height", "y");
                    }
                } else if (mouse.dragging.element.classList.contains("fill_height")) {
                    if (mouse.dragging.element.classList.contains("cs")) {
                        if (mouse.dragging.element.classList.contains("c")) {
                            this.separatedWindowDrag("Width", "x", true, true);
                        } else {
                            this.separatedWindowDrag("Width", "x", true);
                        }
                    } else {
                        this.separatedWindowDrag("Width", "x");
                    }
                }
            }
            if (mouse.dragging.element.classList.contains("normal_drag")) {
                /*for (let i = 0; i<focusedElements.length;i++) {
                    console.log(focusedElements[i])*/
                this.normal_drag();
                /*}*/
            }
        }
    }
};

MouseEventHandler.prototype.init = function (event, element) {
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
    } else {


        /*
                mousedown - drag
        */
        if (mouse.clicking.status) {
            this.mouse_down();
            if (mouse.moving.status) {
                if (!((mouse.moving.point.x === mouse.clicking.point.x) && (mouse.moving.point.y === mouse.clicking.point.y))) {
                    mouse.dragging.status = true;
                    g_timer = true;
                    this.drag();
                }
            }
        }
        /*
                hovering
        */
        if (mouse.hovering.status) {
            this.handleHovering();
        } else {
            /*
                        mouseup
            */
            if (mouse.releasing.status && !mouse.moving.status && !mouse.hovering.status) {
                this.released();
            }
        }
        /*
                hover
        */
        /*if (mouse.hover.status) {
            this.hover();
        }*/
    }
};

function rqst() {
    sendRequest({project_name: h["children"][0]["title"], project: h.innerHTML});
}

/*
***************************************
 ==== 7. ELEMENTS
 ***************************************
*/


