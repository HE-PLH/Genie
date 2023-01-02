


/*
***************************************
 ==== 7. CONSTANT VARIABLES
***************************************
*/
const CTRL = 17;
const SHIFT = 16;
const ALT = 18;
const DEL = 46;
const ENTER = 13;
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
let wnd, clip_child, isWindow, isInsideElement, isAppendedTool, isListItem, isTTool, isRotationTool, no = 0, is_field;
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
let styleId = "element";
let classId = "element-utilities";
let colors = {
    primary: "#5e77dc",
    white: "#fff",
    dark: "#000",
    lightDark: "#2f2e2e",
    lighterDark: "#2f2e2e",
}
let styleElement = document.getElementById(`${styleId}`);
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
        if (bound) {
            let rect = el.getBoundingClientRect();
            return rect.top >= 0 && rect.left >= 0 &&
                rect.bottom <= bound.clientHeight &&
                rect.right <= bound.clientWidth;
        } else {
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
    apply: function (array, f) {
        for (let i = 0, len = array.length; i < len; i++) {
            f(array[i]);
        }
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
    changeClassProperty: function (cls, elements, property, newValue, oldValue, parent) {

        (parent || document).querySelectorAll(`${cls}`).forEach(function (el) {
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
    getDuplicates(arrays) {
        return arrays.shift().filter(function (v) {
            return arrays.every(function (a) {
                return a.indexOf(v) !== -1;
            })
        });
    },
    getChildIndex(el) {
        return [...el.parentNode.children].indexOf(el)
        // return undefined;
    }
};




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


function check_perc() {
    if (focusedElements.length > 0) {
        let w = true;
        let h = true;
        let l = true;
        let t = true;
        let g = (e, str) => {
            return Styling.get_style("", str, e.ruleIndex).indexOf("%") !== -1;
        };
        let r = (n, id) => {
            id = document.getElementById(`${id}`);
            id.checked = n;
        };
        Methods.apply(focusedElements, (e) => {
            if (!g(e, "width")) {
                w = false;
            }
            if (!g(e, "height")) {
                h = false;
            }
            if (!g(e, "left")) {
                l = false;
            }
            if (!g(e, "top")) {
                t = false;
            }
        });
        r(w, "m-option-w");
        r(h, "m-option-h");
        r(l, "m-option-l");
        r(t, "m-option-t");
    }
}

function presentCls() {
    let lst = [];
    if (focusedElements.length > 0) {
        Methods.apply(focusedElements, (e) => {
            let cls = e.className.split(" ");
            let t = [];
            for (let j = 0, l = cls.length; j < l; j++) {
                if (!(Methods.find(systemClasses, cls[j]))) {
                    t.push(cls[j]);
                }
            }
            lst.push(t);
        });
        return Methods.getDuplicates(lst);
    } else return lst;
}

function show_classes() {
    let cont = document.getElementById("genie-selected-cls");
    cont.innerHTML = "";
    let lst = presentCls();
    Methods.apply(lst, (e) => {
        cont.appendChild(createDomElement({name: "div", class: "choose-cls-cont", innerHTML: e}));
    });
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
    Methods.apply(focusedElements, (e) => {
        e.contentEditable = false;
    });
    typing = false;
    BRICK.typing = false;
}


function drag_style(wnd, property, value) {
    Styling.edit_style(mouse.dragging.id, property, value, wnd.ruleIndex)
}


function contract_drop() {
    let d = document.getElementById("m-option");
    d.classList.contains("full-h") ? (() => {
        d.classList.remove("full-h");
        d.classList.add("zero-h")
    })() : "";
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
            Methods.toogle.classes(el, "toolbar-item-color", colors.primary);
        } else {
            document.getElementById("I").classList.remove(colors.primary);
            document.getElementById("B").classList.remove(colors.primary);
            HandleHightlightedText();
            instantChanges[txt.toString()](highlightObj);
            window.clearTimeout(timeOut);
            timeOut = setTimeout(function () {
                document.getElementById("genie-instant-toolbar").style.display = "none";
            }, 3000);
        }
        /*Methods.toogle.classes(this.el, "toolbar-item-color", colors.primary);*/
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
        contract_drop();
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

function new_class_instr() {
    let title = document.getElementById("input-new-class").value || ".new-cls";
    new Classes().createNewClass(title)
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
    Methods.changeClassProperty(".compressed_layout li .layout_title", el || focusedElements, "background", colors.primary, "white");
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
            a.classList.add(colors.primary);
        }
        if (italic) {
            b.classList.remove("toolbar-item-color");
            b.classList.add(colors.primary);
        }
    } else {
        if (!bold) {
            a.classList.remove(colors.primary);
            a.classList.add("toolbar-item-color");
        }
        if (!italic) {
            b.classList.remove(colors.primary);
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

function checkSelectedCls() {
    let lst = presentCls();
    let ch = document.getElementById("genie-all-cls-main")["children"];
    Methods.apply(ch, (e) => {
        Methods.find(lst, e.querySelector("span").textContent.split(".")[1]) ? e.querySelector("input").checked = true : e.querySelector("input").checked = false;
    });
}

function clsName(classList) {
    for (let i = 0; i < systemClasses.length; i++) {
        Methods.remove(classList, systemClasses[i]);
    }
    return classList;
}

function toolbarItems(el) {
    Methods.changeClassProperty(".genie-toolbar-item", [el], "backgroundColor", colors.primary, "#f3f3f3");
}

function hightlightAll() {
    let ell = [];
    Methods.apply(focusedElements, (e) => {
        e.classList.contains("hi") ? ell.push(e.done.querySelector("input")) : "";
    });
    highlightLayout(ell);
}

function executeClip(_element, is_tile_img, is_frame) {
    let temp1 = document.querySelector(".genie-paint-field");
        let tag = _element.getAttribute("alt");
        let path = is_tile_img?graphicsObject[tag]:is_frame?frames[tag]:clipObject[tag];
        tag = tag.replace(/\.webp/g, "");
        tag = tag.replace(/\.svg/g, "");
        tag = tag.replace(/\.jpg/g, "");
        Elements[tag] === undefined ? Elements[tag] = 0 : Elements[tag]++;


        if (is_tile_img){
            let e = new G(`${tag + "-" + Elements[tag].toString()}`, {appended_img: path}).create(tag, null, lastContextMenuPt);
        }
        else if (is_frame){
            let e = new G(`${tag + "-" + Elements[tag].toString()}`, {framed:path}).create(tag, null, lastContextMenuPt);
        }else{
            let e = new G(`${tag + "-" + Elements[tag].toString()}`, {clipped: true, clipPath:path}).create(tag, null, lastContextMenuPt);
        }
        console.log(e)
}

function getFocusedClasses(cls) {
    let lst = [], lst1 = [];
    Methods.apply(focusedElements, (e) => {
        if (e.classList.contains(`${cls}`)) {
            lst.push(`${e.id}`);
            lst1.push(e)
        } else if (e.parentNode.creator) {
            lst.push(`${e.parentNode.creator.id}`);
            lst1.push(e.parentNode.creator)
        }
    });
    for (let i = 0; i < focusedElements.length; i++) {

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
            Methods.apply(focusedElements, (e) => {
                if (e.classList.contains("hi")) {
                    center = {x: e.clientWidth / 2, y: e.clientHeight / 2};
                    e.appendChild(p);
                    p.style.left = `${center.x - (flag ? flag : 40)}px`;
                    p.style.top = `${center.y - (flag ? flag : 0)}px`;
                }
            });
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
            el.style.cursor = "all-scroll";
            focusedElements.push(el);
            addCurrentTool(el);
        } else {
            new Styles(el).init();
            removeEditable();
            removeCurrentTool();
            el.style.cursor = "all-scroll";
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
    ENTER: () => {
        return keySequence.isSequenced([ENTER]);
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
    Methods.apply(focusedElements, (e) => {
        e ? e.parentNode.classList.contains("list_item") || e.classList.contains("hi") ? lst.push(e) : "" : "";
    });
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
    Methods.apply(focusedElements, (e) => {
        e.parentNode.classList.contains("list_item") ? lst.push(e.parentNode) : e.classList.contains("hi") ? lst.push(e) : "";
    });
    this.duplicate(lst);
};

KeyEventHandler.prototype.duplicate = function (elems) {
    let c;
    Methods.apply(elems, (e) => {
        if (e.classList.contains("hi")) {
            removeCurrentTool(e);
            c = clone(e);
            Methods.presert(c[1], e.done.parentNode, e.done.nextElementSibling);
            Methods.presert(c[0], e.parentNode, e.nextElementSibling);
            focusedElements.push(c[0]);
            addCurrentTool(c[0]);
        } else {
            removeCurrentTool();
            c = clone(e.creator);
            Methods.presert(c[0], e.creator.parentNode, e.creator.nextElementSibling);
            Methods.presert(c[1], e.parentNode, e.nextElementSibling);
            addCurrentTool(e);
        }
    });

    hightlightAll();
};

KeyEventHandler.prototype.handleKeys = function () {
    if (!BRICK.typing) {
        if (!typing) {
            if (this.el.parentNode.classList.contains("rule-prop") || this.el.parentNode.id === "special-create") {
                if (this.el.parentNode.id !== "special-create") {
                    if (!this.el.parentNode.classList.contains("el_prop")) {
                        if (KEY.isCharCode(this.key)) {
                            let p = Methods.trim(this.el.parentNode.querySelector(".prop").value);
                            let v = Methods.trim(this.el.parentNode.querySelector(".val").value);
                            let cb = this.el.parentNode.parentElement;
                            cb.ruleIndex !== undefined ? Styling.commentRuleProperty(p, v, cb.ruleIndex) : (() => {
                                styleElement = document.getElementById(`${classId}`);
                                Styling.commentRuleProperty(p, v, cb.rI);
                            })();
                        }
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
                Styling.changeClass(el, `#${this.el.value.split("#")[1]}`, false);
            }
        } else if (this.el.classList.contains("prop")) {
            if (KEY.isCharCode(this.key)) {
                if (this.el.parentNode.classList.contains("el_prop")) {
                    let e = this.el.parentNode.el, v = Methods.removeSpaces(this.el.value.split("{")[0]);
                    if (e.tagName !== undefined) {
                        Styling.changeClass(e, v, false);
                        e.done.querySelector("input").value = v;
                    } else {
                        styleElement = document.getElementById(`${classId}`);
                        Styling.changeClass(e, v, true);
                        styleElement = document.getElementById(`${styleId}`);
                    }
                } else {
                    let p = Methods.trim(this.el.value);
                    let v = Methods.trim(this.el.parentNode.querySelector(".val").value);
                    let cb = this.el.parentNode.parentElement;
                    cb.ruleIndex !== undefined ? Styling.UncommentRuleProperty(p, v, cb.ruleIndex) : (() => {
                        Styling.UncommentRuleProperty(p, v, cb.rI);
                        styleElement = document.getElementById(`${styleId}`);
                    })();
                }
                this.el.style.width = (this.el.value.length + 1) * 6 + "px";
            }
        } else if (this.el.id === "input-new-class") {
            if (keySequence.ENTER()) {
                new_class_instr();
            }
        } else if (this.el.classList.contains("val")) {
            if (KEY.isCharCode(this.key)) {
                let p = Methods.removeSpaces(this.el.parentNode.querySelector(".prop").value.split(":")[0]);
                let v = Methods.trim(this.el.value.split(";")[0]);
                let cb = this.el.parentNode.parentElement;
                cb.ruleIndex !== undefined ? Styling.edit_style("", p, v, cb.ruleIndex) : (() => {
                    styleElement = document.getElementById(`${classId}`);
                    Styling.edit_style("", p, v, cb.rI);
                    styleElement = document.getElementById(`${styleId}`);
                })();
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
        this.el.style.cursor = "text";
    } else {
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
    } else if (this.el.classList.contains("arrow") && this.el.parentNode.classList.contains("carrying")) {
        /*
                if compressed layout list_item has other list_items
        */
        Methods.toogle.classes(this.el, "expanded", "collapsed");
        let ul = this.el.parentNode.querySelector("ul");
        ul ? Methods.toogle.display(this.el.parentNode.querySelector("ul")) : (() => {
            this.el.parentNode.parentNode.querySelectorAll(".rule-prop").forEach((e) => {
                if (!e.classList.contains("el_prop")) {
                    Methods.toogle.display(e);
                }
            });
            let r = this.el.parentNode.parentNode.querySelector("span.c-l");
            r ? Methods.toogle.display(r) : "";
        })();
    } else if (this.el.classList.contains("cancel") || this.el.classList.contains("window_close")) {
        document.querySelector(".window").style.display = "none";
    } else if (this.el.classList.contains("code_display")) {
        let cd = document.querySelector(".code_display");
        cd.readOnly = false;
        cd.style.cursor = "auto";
    } else if (this.el.classList.contains("genie-toolbar-item")) {
        toolbarItems(this.el);
        currentResize = this.el.id;
        reloadCurrentTool();
    } else if (this.el.classList.contains("tab-btn")) {
        let len = this.el.parentElement.childElementCount;
        let targetList = this.el.parentElement.children;

        let bodyList = this.el.parentElement.parentElement.querySelector(".tab-main-body").children;
        let index = Methods.getChildIndex(this.el);

        for (let i = 0; i < len; i++) {
            targetList[i].classList.remove("tab-active");
            bodyList[i].classList.remove("tab-body-active");
        }
        targetList[index].classList.add("tab-active");
        bodyList[index].classList.add("tab-body-active");

    } else if (this.el.classList.contains("rule-prop-delete")) {
        let p = this.el.parentNode;
        let index = p.parentElement.ruleIndex !== undefined ? p.parentElement.ruleIndex : p.parentElement.rI;
        Styling.commentRuleProperty(p.querySelector(".prop").value, p.querySelector(".val").value, index);
        Methods.removeNode(p);

    } else if (this.el.classList.contains("rule-props-cont-del")) {
        let p = this.el.parentNode;
        styleElement = document.getElementById(`${classId}`);
        Styling.deleteRule(p.rI);
        Methods.removeNode(p);
        styleElement = document.getElementById(`${styleId}`);
    } else if (this.el.classList.contains("rule-prop-check-box")) {
        let p = this.el.parentNode;
        if (!this.el.checked) {
            let index;
            if (p.parentElement.ruleIndex !== undefined) {
                index = p.parentElement.ruleIndex;
                styleElement = document.getElementById(`${styleId}`);
            } else {
                index = p.parentElement.rI;
                styleElement = document.getElementById(`${classId}`);
            }
            Styling.commentRuleProperty(Methods.trim(p.querySelector(".prop").value), p.querySelector(".val").value, index);
            styleElement = document.getElementById(`${styleId}`);
        } else {
            let index;
            if (p.parentElement.ruleIndex !== undefined) {
                index = p.parentElement.ruleIndex;
                styleElement = document.getElementById(`${styleId}`);
            } else {
                index = p.parentElement.rI;
                styleElement = document.getElementById(`${classId}`);
            }
            Styling.UncommentRuleProperty(Methods.trim(p.querySelector(".prop").value), p.querySelector(".val").value, index);
            styleElement = document.getElementById(`${styleId}`);
        }
    } else if (this.el.classList.contains("rule-prop") || this.el.classList.contains("c-l")) {
        if (newProp === null) {
            let cb = this.el.querySelector(".rule-prop-check-box");
            let p;
            if (cb !== null) {
                p = cb.parentNode.parentElement.rI ? renderStyle(" ", " ", cb.parentNode.parentElement.rI, true, "rI") : renderStyle(" ", " ", cb.parentNode.parentElement.ruleIndex);
                Methods.presert(p, this.el.parentNode, this.el.nextElementSibling);
            } else {
                cb = this.el;
                if (cb.tagName === "SPAN") {
                    cb = this.el.rI;
                } else {
                    cb = cb.parentNode.parentElement.ruleIndex;
                }
                p = renderStyle(" ", " ", cb, true, "rI");
                Methods.presert(p, this.el.parentNode, this.el);
            }
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
    } else if (this.el.classList.contains("hi")) {
        if (BRICK.typing) {
            HandleHightlightedText();
        }
        checkSelectedCls();
        contract_drop();
    } else if (this.el.classList.contains("my-collapse")) {
        console.log("hello")
        // Methods.removeNode(this.el.parentElement);
        let temp_w = this.el.parentNode.getBoundingClientRect().width;
        let tmp = document.querySelector(".genie-paint-field");
        let temp1 = this.el.parentElement.nextElementSibling;
        tmp.style.width = tmp.getBoundingClientRect().width + temp_w + temp1.getBoundingClientRect().width + "px";
        temp1.style.width = 0;
        this.el.style.width = 0;
        console.log(temp_w, tmp)
        this.el.parentNode.style["width"] = 0;

    } else if (this.el.classList.contains("genie-left-nav-item")) {
        let tmp = document.querySelector(".genie-paint-field");
        let temp1 = document.querySelector(".genie-sec-layout-cont");
        let temp2 = document.querySelector(".my-collapse");
        let temp3 = document.querySelector(".separator");
        temp1.style.width = "300px";
        tmp.style.width = "calc(70% - 300px)";
        temp2?temp2.style.width = "30px":"";
        temp3.style.width = "15px";
        temp1.innerHTML = select_layouts[this.el.querySelector("span").innerText]
    } else if (this.el.classList.contains("arrow-right")) {
        let parent = this.el.parentElement.querySelector(".box-inner");
        x = ((parent.getBoundingClientRect().width / 2)) + parent.scrollLeft;
        console.log(x)
        parent.scrollLeft = x;

    }
    else if (this.el.classList.contains("arrow-left")) {
        let parent = this.el.parentElement.querySelector(".box-inner");
        x = ((parent.getBoundingClientRect().width / 2)) - parent.scrollLeft;
        console.log(x)
        parent.scrollLeft = -x;

    }else if (this.el.classList.contains("see-all")) {
        let temp1 = document.querySelector(".genie-sec-layout-cont");
        temp1.innerHTML = designElements[this.el.parentElement.children[0].innerText]
        console.log("here")
    }else if (this.el.classList.contains("tab-img")) {
        executeClip(this.el)
    }else if (this.el.classList.contains("tile-img")) {
        executeClip(this.el, true)
    }else if (this.el.classList.contains("frame-tile-img")) {
        executeClip(this.el, false, true)
    } else if (this.el.id === "create-new-class-btn") {
        new_class_instr();
    } else if (this.el.id === "input-new-class") {
        typing = false;
        BRICK.typing = false;
    } else if (this.el.id === "generate") {
        new Generate().init();
    } else if (this.el.id === "convert2perc") {
        check_perc();
        Methods.toogle.classes(document.getElementById("m-option"), "zero-h", "full-h");
    } else if (this.el.parentNode.classList.contains("choose-cls-cont")) {
        focusedElements.length > 0 ? (() => {
            let sp = this.el.parentNode.querySelector("span");
            let cb = this.el.parentNode.querySelector("input");
            let txt = sp.textContent;
            txt = txt.indexOf(".") !== -1 ? txt.split(".")[1] : txt;
            if (this.el.tagName !== "INPUT") {
                cb.checked = !cb.checked;
            }
            if (this.el.parentNode.parentElement.id === "m-option") {
                if (cb.checked) {
                    Methods.apply(focusedElements, (e) => {
                        console.log(txt);
                        let a, b;
                        if (txt === "top" || txt === "left") {
                            let d = ff(e, e.id, false);
                            if (txt === "left") {
                                a = `${d[0] * 100 / e.parentElement.clientWidth}%`;
                                if (!percX) {
                                    Styling.edit_style("", "left", a, e.ruleIndex);
                                    left_display.value = a;
                                }
                            } else {
                                b = `${d[1] * 100 / e.parentElement.clientHeight}%`;
                                if (!percY) {
                                    Styling.edit_style("", "top", b, e.ruleIndex);
                                    top_display.value = b;
                                }
                            }
                        } else {
                            let d = ff(e, e.id, true);
                            if (txt === "width") {
                                a = `${d[0] * 100 / e.parentElement.clientWidth}%`;
                                if (!percX) {
                                    Styling.edit_style("", "width", a, e.ruleIndex);
                                    width_display.value = a;
                                }
                            } else {
                                b = `${d[1] * 100 / e.parentElement.clientHeight}%`;
                                if (!percY) {
                                    Styling.edit_style("", "height", b, e.ruleIndex);
                                    height_display.value = b;
                                }
                            }
                        }
                    });
                } else {
                    Methods.apply(focusedElements, (e) => {
                        let a, b;
                        if (txt === "top" || txt === "left") {
                            let d = ff(e, e.id, false);
                            if (txt === "left") {
                                a = `${d[0]}px`;
                                if (percX) {
                                    Styling.edit_style("", "left", a, e.ruleIndex);
                                    left_display.value = a;
                                }
                            } else {
                                b = `${d[1]}px`;
                                if (percY) {
                                    Styling.edit_style("", "top", b, e.ruleIndex);
                                    top_display.value = b;
                                }
                            }
                        } else {
                            let d = ff(e, e.id, true);
                            if (txt === "width") {
                                a = `${d[0]}px`;
                                if (percX) {
                                    Styling.edit_style("", "width", a, e.ruleIndex);
                                    width_display.value = a;
                                }
                            } else {
                                b = `${d[1]}px`;
                                if (percY) {
                                    Styling.edit_style("", "height", b, e.ruleIndex);
                                    height_display.value = b;
                                }
                            }
                        }
                    });
                }
            } else {
                if (cb.checked) {
                    Methods.apply(focusedElements, (e) => {
                        !e.classList.contains(txt) ? e.classList.add(txt) : "";
                    });
                } else {
                    Methods.apply(focusedElements, (e) => {
                        e.classList.contains(txt) ? e.classList.remove(txt) : "";
                    });
                }
            }
        })() : "";
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
        if (percX) {
            ml = `${100 * ml / parentWidth}`;
        }
        if (percY) {
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
            Resizers.drag_clip(clip_child, wnd, "left", ml, unitX)
            left_display.value = `${ml + unitX}`;
        } else if (dragger.top_resize) {
            /*
                        (mt >= 0) ? drag_style(wnd, "top", mt) : "";
            */
            drag_style(wnd, "top", `${mt + unitY}`);
            Resizers.drag_clip(clip_child, wnd, "top", mt, unitY)
            top_display.value = `${mt + unitY}`;
        }
        /*
                size
        */
        if (dragger.height_resize) {
            drag_style(wnd, "height", `${mt + unitY}`);
            Resizers.drag_clip(clip_child, wnd, "height", mt, unitY);
            height_display.value = `${mt + unitY}`;
        } else if (dragger.width_resize) {
            drag_style(wnd, "width", `${ml + unitX}`);
            Resizers.drag_clip(clip_child, wnd, "width", ml, unitX);
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
            if (percX) {
                ml = `${100 * ml / parentWidth}`;
            }
            if (percY) {
                mt = `${100 * mt / parentHeight}`;
            }
            if (dragger.check) {
                drag_style(wnd, "height", `${mt + unitY}`);
                drag_style(wnd, "width", `${ml + unitX}`);
                Resizers.drag_clip_all(clip_child, wnd, "both_w_h", ml, mt, unitX, unitY);
                // Resizers.drag_clip(clip_child, wnd, "width", ml, unitX);
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
        } else if (isTTool) {
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
                        } else {
                            if (isTTool) {
                                /*
                                                        traditional append tool
                            */
                                TraditionalTool.handle_traditional_appendTools()
                            } else {
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
    if (BRICK.typing || typing) {
        mouse.dragging.draggable = false;
        /*mouse.dragging.element.draggable = false;*/
    } else {
        mouse.dragging.draggable = true;
    }
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


/*
* <div class="D-ZUcw" style="margin: -4px 0px;"><div class="FA8sBg" style="margin: 4px 0px;"><div class="v1Egnw" style="height: 71.75px; margin: 0px -4px;"><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rCvqVTU/1/0/402w-idrkZVCwXGI.png" alt="Square" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId597" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAFEHK3BpiA/1/0/404w-GnDnCo80hlg.png" alt="Rounded Square" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId598" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rEUSxdE/1/0/804w-t8rBv8DGtyU.png" alt="Circle" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId599" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rIzwGHQ/2/0/404w-aTx5hIJ54sQ.png" alt="Triangle Up" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId600" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div></div></div><div class="FA8sBg" style="margin: 4px 0px;"><div class="v1Egnw" style="height: 71.75px; margin: 0px -4px;"><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7lvBcr8Q/2/0/404w-bYy6pq3utRc.png" alt="Triangle Down" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId601" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rI8iZ1c/1/0/404w-b9rzdI-7r_Y.png" alt="Diamond" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId602" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rEE7Fs8/1/0/404w-XIk1i4yB4YM.png" alt="Pentagon" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId603" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rOrmA5A/1/0/348w-H-c_Fu_D-KI.png" alt="Hexagon Vertical" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId604" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div></div></div><div class="FA8sBg" style="margin: 4px 0px;"><div class="v1Egnw" style="height: 71.75px; margin: 0px -4px;"><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rID8RM4/1/0/404w-b4TXCBMgkp8.png" alt="Hexagon Horizontal" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId605" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rOgunQY/1/0/404w-LY-wOntoeVo.png" alt="Octagon" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId606" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7ljCsz84/1/0/404w-SUviByp4S-4.png" alt="4-Pointed Star" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId607" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rFLytUE/1/0/404w-mSWZsrd2CkU.png" alt="5-Pointed Star" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId608" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div></div></div><div class="FA8sBg" style="margin: 4px 0px;"><div class="v1Egnw" style="height: 71.75px; margin: 0px -4px;"><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7liqzgb0/1/0/356w-do76m3qcurw.png" alt="6-Pointed Star" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId609" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rNROzv0/1/0/404w-DbF2Ill2VaY.png" alt="8-Pointed Star" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId610" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rAZX3-o/1/0/804w-N933_KraONA.png" alt="Star Burst 1" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId611" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE1BySBc-s/5/0/404w-52ZCCFfaZsI.png" alt="Star Burst 2" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId612" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div></div></div><div class="FA8sBg" style="margin: 4px 0px;"><div class="v1Egnw" style="height: 71.75px; margin: 0px -4px;"><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7ljtDqvw/1/0/404w-db4mDMb3Dmk.png" alt="8-Pointed Star Inflated" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId613" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7lqCUXwk/1/0/404w-lUHS__vwMpY.png" alt="Star Burst 3" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId614" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7ln6Nwjc/2/0/404w-9JFf0XOzdYY.png" alt="Star Burst 4" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId615" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rLV4tqQ/1/0/404w-5CFChL99nO4.png" alt="Arrow Right" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId616" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div></div></div><div class="FA8sBg" style="margin: 4px 0px;"><div class="v1Egnw" style="height: 71.75px; margin: 0px -4px;"><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rPRXHUk/1/0/404w-3nv0IV8oDfg.png" alt="Arrow Left" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId617" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rBCEgeo/1/0/404w-4_kO1lsaCTU.png" alt="Arrow Up" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId618" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rMwt7Ls/1/0/404w-B3sw56NllxY.png" alt="Arrow Down" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId619" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rEyI1_8/1/0/404w-uDYW6ss_n8E.png" alt="Arrow Horizontal" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId620" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div></div></div><div class="FA8sBg" style="margin: 4px 0px;"><div class="v1Egnw" style="height: 71.75px; margin: 0px -4px;"><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7lo5Zk0o/4/0/404w-Ik40x6a8ZnA.png" alt="Arrow Block Right" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId621" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7lkjnmfM/2/0/404w-52OvVa8KUwE.png" alt="Arrow Block 2 Right" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId622" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7lkhGbzc/2/0/404w-YRRJ_hQHrqM.png" alt="Arrow Block Concave" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId623" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7l0GoGOs/2/0/404w-EGr6F73nd_c.png" alt="Arrow Block Convex" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId624" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div></div></div><div class="FA8sBg" style="margin: 4px 0px;"><div class="v1Egnw" style="height: 71.75px; margin: 0px -4px;"><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7lxJL7as/3/0/404w-M3upwblHJEM.png" alt="Pill" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId625" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rJYYx5o/1/0/406w-vgX30FzXj9w.png" alt="Square Speech Bubble" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId626" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7l3J68zY/2/0/406w-y5R2WyjVkxU.png" alt="Round Speech Bubble" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId627" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rCGifNk/1/0/406w-jIn1YVXNkGQ.png" alt="Heart" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId628" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div></div></div><div class="FA8sBg" style="margin: 4px 0px;"><div class="v1Egnw" style="height: 71.75px; margin: 0px -4px;"><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7l-OAKeA/2/0/402w-IB_xyqsB0BA.png" alt="Cross" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId629" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7lwzETcE/3/0/406w-73gMnSQib0c.png" alt="Cloud" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId630" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rMUQlAk/1/0/318w-NU4Ix7q5guY.png" alt="Banner 2" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId631" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rKLKA8k/2/0/370w-2qM1B0CNpl8.png" alt="Banner 3" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId632" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div></div></div><div class="FA8sBg" style="margin: 4px 0px;"><div class="v1Egnw" style="height: 71.75px; margin: 0px -4px;"><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rPGN4_0/1/0/402w-Lf-b5Cf2_To.png" alt="Banner 4" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId633" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rMr1Z9U/1/0/404w-w0v9KBJ_LgQ.png" alt="Banner 5" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId634" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rB52ro4/1/0/404w-DH_NmyNb32Y.png" alt="Banner 7" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId635" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rA4YV1w/1/0/404w-CkjFtNwKxpE.png" alt="Parallelogram Right" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId636" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div></div></div><div class="FA8sBg" style="margin: 4px 0px;"><div class="v1Egnw" style="height: 71.75px; margin: 0px -4px;"><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rLfn4pI/1/0/404w-d4-zFl7NXFU.png" alt="Parallelogram Left" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId637" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rN-rL1w/1/0/404w-JLR2uB4dw98.png" alt="Trapezoid Up" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId638" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7rMNDpuI/1/0/404w-XQe1fYw0hG4.png" alt="Trapezoid Down" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId639" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7l8a7Pp4/2/0/332w-SsxwjKxgmG8.png" alt="Arch Down" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId640" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div></div></div><div class="FA8sBg" style="margin: 4px 0px;"><div class="v1Egnw" style="height: 71.75px; margin: 0px -4px;"><div class="qFtWQg" style="width: 71.75px; margin: 0px 4px; height: 71.75px;"><div class="A0JANA ADVZ4g"><div class="GVUpNQ"><div class="ZP8HvQ oDHgrA"><div class="oDHgrA"><div class="BE2rWg" draggable="true"><div class="mh2TGQ CAFSwg wZ_zoQ _6mbnHA raefMw wKiiLw"><img class="_9Al4OQ A_yLpA _1vGB4g" crossorigin="anonymous" src="https://template.canva.com/EAE7l3ea-00/2/0/332w-Pgn1uS1cfow.png" alt="Arch Up" draggable="false"><div role="button" aria-label="Add this graphic to the canvas" class="e_NdpQ gwb2Ug _7YslCg _682gpw" draggable="true" tabindex="0" style="touch-action: auto;"></div><span class="T5OikA epg7uw _45rcUQ ZakHgA JA7pfA yAhYLw"><div class=""><button class="_1QoxDw Qkd66A tYI0Vw o4TrkA z6Gm7g Eph8Hg cclg9A vwGvLA Qkd66A tYI0Vw q3o1Qw cwOZMg zQlusQ uRvRjQ IS_6ew" type="button" aria-label="Show details" aria-controls="__a11yId641" aria-expanded="false" aria-haspopup="menu" role="button"><span class="TcNIhA"><span aria-hidden="true" class="uRWxVA dkWypw"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.25 9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm4.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill-rule="evenodd"></path></svg></span></span></button></div></span></div></div></div></div></div></div></div></div></div></div>
* */

