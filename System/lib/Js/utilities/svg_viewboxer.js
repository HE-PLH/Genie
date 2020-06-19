function SVG_OBJECT(svg_text, svg_obj) {
    this.svg_text = svg_text;
    this.svg_obj = svg_obj;
    this.svg_element = null;
    this.toViewBox = function (str) {
        if (this.svg_obj) {
            this.svg_element = this.svg_obj;
        } else {
            let el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            el.innerHTML = this.svg_text;
            this.svg_element = el.querySelector("svg");
        }
        this.recurse();
    };
    this.scrutinize = function (obj) {
        let m = [], left = {};
        for (let i = 0, len = obj.length; i < len; i++) {
            if (!isNaN(parseFloat(obj[i]))){
                if (!(obj[i][0] === "0" || obj[i][0] === "1")) {
                    m.push(obj[i]);
                }else {
                    if (parseFloat(obj[i])===0){

                    }
                }
            }else {

            }
        }
        console.log(m);
    };
    this.executeViewBox = function (el) {
        let multiplier = 2;
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
                    d1 = s.match(/(\d*\.\d+|\d+\.?)|-/g);
                    if (op.indexOf("a")>-1) {
                        this.scrutinize(d1);
                    }
                    for (let j = 0,len1 = d1.length; j<len1;j++){
                        let m;
                        if (!isNaN(parseFloat(d1[j]))){
                            m = d1[j];
                            temp += `${m} `;
                        }else {
                            m = d1[j].trim();
                            if (temp[temp.length-1]===" "){
                                temp = temp.trim();
                            }
                            temp += `${m}`;
                        }
                        // console.log(parseFloat(d1[j]),d1[j])
                    }
                    str+=temp.trim();
                }
            }
            return str.trim();
        };
        if(el.tagName === "path"){
            console.log(el.getAttribute("d"));
            console.log(f(el.getAttribute("d"))+"\n\n");
            el.setAttribute("d", f(el.getAttribute("d")))
        }
        // return el;
    };
    this.recurse = function () {
        this.executeViewBox(this.svg_element);
        let f = (el) => {
            for (let i in el) {
                if (el.hasOwnProperty(i)) {
                    (this.executeViewBox(el[i]));
                    if (el[i]["children"] && el[i]["children"].length > 0) {
                        f(el[i]["children"]);
                    }
                }
            }
        };
        f(this.svg_element["children"]);
    }
}