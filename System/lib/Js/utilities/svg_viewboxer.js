function SVG_OBJECT(svg_text, svg_obj) {
    this.svg_text = svg_text;
    this.svg_obj = svg_obj;
    this.svg_element = null;
    this.temp = null;
    this.toViewBox = function (str) {
        console.time("t");
        if (this.svg_obj) {
            this.svg_element = this.svg_obj;
        } else {
            this.temp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.temp.innerHTML = this.svg_text;
            this.svg_element = this.temp.querySelector("svg");
        }
        console.log(this.recurse());
        console.timeEnd("t")
    };
    this.scrutinize = function (obj, multiplier) {
        let str = "";
        let ex = (n)=>{
            for (let i = 0; i<n;i++){
                let a = (/-?(\d*\.\d+|\d+\.?)/).exec(obj)[0];
                let p = parseFloat(a);
                if (p<0){
                    str = str.trim();
                }
                str+=`${a*multiplier} `;
                obj = obj.replace(new RegExp(`${a}`), "");
            }
        };
        let f = ()=>{
            ex(3);
            let a = (/(00)|(01)|(10)|(11)/).exec(obj)[0];

            str+=`${a} `;
            str = str.trim();
            obj = (obj.replace(`${a}`, ""));
            ex(2);
        };
        while (obj.trim().length>0){
            f();
        }
        return str;
    };
    this.executeViewBox = function (el) {
        let multiplier = 1;
        let f = (d)=>{
/*
            console.log(/([mzlhvcsqta]|([+\-])?(\d*\.\d+|\d+\.?)([eE][+\-]?\d+)*)/gi.exec(d))
*/
            let str = "", d1;
            d = d.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi);
            // d = d.match(/(\s*)?[mzlhvcsqta]([-+])?((\d*\.\d+|\d+\.?)*([+-])?\s*)*/gi);
            for (let i = 0,len = d.length; i<len;i++){
                let op = ((/[mzlhvcsqta]/i).exec(d[i]));
                str += op;
                let s = d[i].split((/[mzlhvcsqta]/i)), temp = '';
                if (s[1]) {
                    s = s[1];
                    d1 = s.match(/-?(\d*\.\d+|\d+\.?)/g);
                    if (op.indexOf("a")>-1||op.indexOf("A")>-1) {
                        if (d1.length % 7 !== 0) {
                            str += (this.scrutinize(s, multiplier)).trim();
                        }else {
                            str += (d1.join(" ")).trim();
                        }
                    }else {
                        for (let j = 0, len1 = d1.length; j < len1; j++) {
                            let m = d1[j];
                            temp += `${parseFloat(m)*multiplier} `;
                        }
                        str += temp.trim();
                    }
                }
            }
            return str.trim();
        };
        if(el.tagName === "path"){
            el.setAttribute("d", f(el.getAttribute("d")))
        }
        return el;
    };
    this.recurse = function () {
        this.executeViewBox(this.svg_element);
        let f = (el) => {
            for (let i in el) {
                if (el.hasOwnProperty(i)) {
                    el[i].parentNode.replaceChild(this.executeViewBox(el[i]), el[i]);
                    if (el[i]["children"] && el[i]["children"].length > 0) {
                        f(el[i]["children"]);
                    }
                }
            }
        };
        f(this.svg_element["children"]);
        return this.svg_element;
    }
}