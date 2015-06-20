var baidu = function () {
    this.version = "1.3.5"
};
baidu.namespace = new Object();
baidu.namespace.register = function (fullNS) {
    var reg = /^[_$a-z]+[_$a-z0-9]*/i;
    var nsArray = fullNS.split(".");
    var sEval = "";
    var sNS = "";
    for (var i = 0; i < nsArray.length; i++) {
        if (!reg.test(nsArray[i])) {
            throw new Error("Invalid namespace:" + nsArray[i] + "");
            return
        }
        if (i != 0) {
            sNS += "."
        }
        sNS += nsArray[i];
        sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();"
    }
    if (sEval != "") {
        eval(sEval)
    }
};
String.prototype.trim = function () {
    return this.replace(/^\s*|\s*$/g, "")
};
String.prototype.format = function () {
    var b = arguments.length,
        a = this;
    while (b--) {
        a = a.replace(new RegExp("\\{" + b + "\\}", "g"), arguments[b])
    }
    return a
};
Date.prototype.format = function (e) {
    var a = function (m, l) {
        var n = "",
            k = (m < 0),
            j = String(Math.abs(m));
        if (j.length < l) {
            n = (new Array(l - j.length + 1)).join("0")
        }
        return (k ? "-" : "") + n + j
    };
    if ("string" != typeof e) {
        return this.toString()
    }
    var b = function (k, j) {
        e = e.replace(k, j)
    };
    var f = this.getFullYear(),
        d = this.getMonth() + 1,
        i = this.getDate(),
        g = this.getHours(),
        c = this.getMinutes(),
        h = this.getSeconds();
    b(/yyyy/g, a(f, 4));
    b(/yy/g, a(parseInt(f.toString().slice(2), 10), 2));
    b(/MM/g, a(d, 2));
    b(/M/g, d);
    b(/dd/g, a(i, 2));
    b(/d/g, i);
    b(/HH/g, a(g, 2));
    b(/H/g, g);
    b(/hh/g, a(g % 12, 2));
    b(/h/g, g % 12);
    b(/mm/g, a(c, 2));
    b(/m/g, c);
    b(/ss/g, a(h, 2));
    b(/s/g, h);
    return e
};
String.prototype.getBytes = function () {
    var b = this.replace(/\n/g, "xx").replace(/\t/g, "x");
    var a = encodeURIComponent(b);
    return a.replace(/%[A-Z0-9][A-Z0-9]/g, "x").length
};
var getOuterHtmlEllipsis = function (d) {
    var b = /(<[^>]+>)/g;
    var a = b.exec(d.outerHTML);
    var c = a ? a[1] : d.outerHTML;
    c = c.length > 40 ? c.substr(0, 40) + "..." : c;
    return c.replace(/</g, "<").replace(/>/g, ">")
};
var getOuterAndInnerHtmlEllipsis = function (b) {
    var a = jQuery("<div></div>").append(b).html()
};
(function () {
    baidu.i18n = {};
    baidu.i18n.getMessage = function (d, b) {
        if (b) {
            for (var c = 0, a = b.length; c < a; c++) {
                b[c] = "" + b[c]
            }
            return chrome.i18n.getMessage(d, b)
        } else {
            return chrome.i18n.getMessage(d)
        }
    }
})();
const MSG_TYPE = {
    BROWSER_CLICKED: "browser-clicked",
    GET_CSS: "get-css",
    GET_JS: "get-js",
    GET_HTML: "get-html",
    GET_COOKIE: "get-cookie",
    REMOVE_COOKIE: "remove-cookie",
    SET_COOKIE: "set-cookie",
    GET_OPTIONS: "get_options",
    SET_OPTIONS: "set_options",
    CSS_READY: "css-ready",
    JS_READY: "js-ready",
    HTML_READY: "html-ready",
    START_OPTION: "start-option",
    OPT_START_FCP: "opt-item-fcp",
    OPT_START_GRID: "opt-item-grid",
    CALC_PAGE_LOAD_TIME: "calc-page-load-time",
    GET_PAGE_WPO_INFO: "get_page_wpo_info",
    SHOW_PAGE_LOAD_TIME: "show-page-load-time",
    FCP_HELPER_DETECT: "fcp-helper-detect",
    GRID_DETECT: "grid-detect",
    JS_TRACKER: "js_tracker",
    CODE_COMPRESS: "code_compress",
    FROM_POPUP: "from_popup_action",
    REGEXP_TOOL: "regexp",
    EN_DECODE: "endecode",
    JSON_FORMAT: "jsonformat",
    QR_CODE: "qrcode",
    CODE_BEAUTIFY: "codebeautify",
    TIME_STAMP: "timestamp",
    IMAGE_BASE64: "imagebase64",
    AUTO_FORMART_PAGE_JSON: "opt_item_autojson"
};
const FILE = {
    STYLE: "style",
    LINK: "link",
    SCRIPT: "script-block"
};
const PUBLIC_ID_WHITE_LIST = {
    "": {
        systemIds: {
            "": true
        }
    },
    "-//W3C//DTD HTML 3.2 Final//EN": {
        systemIds: {
            "": true
        }
    },
    "-//W3C//DTD HTML 4.0//EN": {
        systemIds: {
            "": true,
            "http://www.w3.org/TR/html4/strict.dtd": true
        }
    },
    "-//W3C//DTD HTML 4.01//EN": {
        systemIds: {
            "": true,
            "http://www.w3.org/TR/html4/strict.dtd": true
        }
    },
    "-//W3C//DTD HTML 4.0 Transitional//EN": {
        systemIds: {
            "": true,
            "http://www.w3.org/TR/html4/loose.dtd": true
        }
    },
    "-//W3C//DTD HTML 4.01 Transitional//EN": {
        systemIds: {
            "": true,
            "http://www.w3.org/TR/html4/loose.dtd": true,
            "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd": true
        }
    },
    "-//W3C//DTD XHTML 1.1//EN": {
        systemIds: {
            "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd": true
        }
    },
    "-//W3C//DTD XHTML Basic 1.0//EN": {
        systemIds: {
            "http://www.w3.org/TR/xhtml-basic/xhtml-basic10.dtd": true
        }
    },
    "-//W3C//DTD XHTML 1.0 Strict//EN": {
        systemIds: {
            "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd": true
        }
    },
    "-//W3C//DTD XHTML 1.0 Transitional//EN": {
        systemIds: {
            "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd": true
        }
    },
    "ISO/IEC 15445:1999//DTD HyperText Markup Language//EN": {
        systemIds: {
            "": true
        }
    },
    "ISO/IEC 15445:2000//DTD HTML//EN": {
        systemIds: {
            "": true
        }
    },
    "ISO/IEC 15445:1999//DTD HTML//EN": {
        systemIds: {
            "": true
        }
    }
};
const COMPAT_MODE_DIFF_PUBLIC_ID_MAP = {
    "-//W3C//DTD HTML 4.0 Transitional//EN": {
        systemIds: {
            "http://www.w3.org/TR/html4/loose.dtd": {
                IE: "S",
                WebKit: "Q"
            }
        }
    },
    "ISO/IEC 15445:2000//DTD HTML//EN": {
        systemIds: {
            "": {
                IE: "Q",
                WebKit: "S"
            }
        }
    },
    "ISO/IEC 15445:1999//DTD HTML//EN": {
        systemIds: {
            "": {
                IE: "Q",
                WebKit: "S"
            }
        }
    }
};
const HTML_DEPRECATED_TAGS = {
    acronym: "定义首字母缩写",
    applet: "定义Java Applet",
    basefont: "定义Font定义",
    big: "定义大号文本",
    center: "定义居中的文本",
    dir: "定义目录列表",
    font: "定义文字相关",
    frame: "定义框架",
    frameset: "定义框架集",
    isindex: "定义单行的输入域",
    noframes: "定义noframe 部分",
    s: "定义加删除线的文本",
    strike: "定义加删除线的文本",
    tt: "定义打字机文本",
    u: "定义下划线文本",
    xmp: "定义预格式文本",
    layer: "定义层"
};
const HTML_DEPRECATED_ATTRIBUTES = {
    align: {
        iframe: true,
        img: true,
        object: true,
        table: true
    },
    color: {
        font: true
    },
    height: {
        td: true,
        th: true
    },
    language: {
        script: true
    },
    noshade: {
        hr: true
    },
    nowrap: {
        td: true,
        th: true
    },
    size: {
        hr: true,
        font: true,
        basefont: true
    }
};
const BLOCK_HTML_ELEMENT = ["address", "blockquote", "center", "dir", "div", "dl", "fieldset", "form", "h1", "h2", "h3",
        "h4", "h5", "h6", "hr", "isindex", "menu", "noframes", "noscript", "ol", "p", "pre", "table", "ul"];
const INLINE_HTML_ELEMENT = ["a", "acronym", "b", "bdo", "big", "br", "cite", "code", "dfn", "em", "font", "i", "img",
        "input", "kbd", "label", "q", "s", "samp", "select", "small", "span", "strike", "strong", "sub", "sup",
        "textarea", "tt", "u", "var"];
const CHANGE_ABLE_HTML_ELEMENT = ["applet", "button", "del", "iframe", "ins", "map", "object", "script"];
const CONDITIONAL_COMMENT_REGEXP = /\[\s*if\s+[^\]][\s\w]*\]/i;
const NOT_IE_REVEALED_OPENING_CONDITIONAL_COMMENT_REGEXP = /^\[if\s+(!IE|false)\]$/i;
const REVEALED_CLOSING_CONDITIONAL_COMMENT_REGEXP = /^\[endif\s*\]$/i;
const NOT_IE_HIDDEN_CONDITIONAL_COMMENT_REGEXP = /^\[if\s+(!IE|false)\]>.*<!\[endif\]$/i;
const REG = {
    SCRIPT: /<script[^>]*>[\s\S]*?<\/[^>]*script>/gi,
    COMMENT: /<!--[\s\S]*?--\>/g,
    CSS_EXPRESSION: /expression[\s\r\n ]?\(/gi,
    TEXTAREA: /<textarea[^>]*>[\s\S]*?<\/[^>]*textarea>/gi,
    INVALID_TAG: /<\W+>/gi
};
const SELF_CLOSING_TAGS = ["meta", "link", "area", "base", "col", "input", "img", "br", "hr", "param", "embed"];
const HTML_DOM_MAX_DEPTH = 30;
const LOG = {
    options_page_opened: "m_20111124_options_page_opened",
    options_page_btnsave: "m_20111124_options_page_btnsave",
    options_page_btnclose: "m_20111124_options_page_btnclose",
    popup_page_show: "m_20111124_popup_page_show",
    popup_page_fcp: "m_20111124_popup_page_fcp",
    popup_page_grid: "m_20111124_popup_page_grid",
    popup_page_fdp: "m_20111124_popup_page_fdp",
    popup_page_endecode: "m_20111124_popup_page_endecode",
    popup_page_loadtime: "m_20111124_popup_page_loadtime",
    endecode_page_opened: "m_20111124_endecode_page_opened",
    endecode_page_uniEncode: "m_20111124_endecode_page_uniEncode",
    endecode_page_uniDecode: "m_20111124_endecode_page_uniDecode",
    endecode_page_utf8Encode: "m_20111124_endecode_page_utf8Encode",
    endecode_page_utf8Decode: "m_20111124_endecode_page_utf8Decode",
    endecode_page_base64Encode: "m_20111124_endecode_page_base64Encode",
    endecode_page_base64Decode: "m_20111124_endecode_page_base64Decode",
    endecode_page_btnchange: "m_20111124_endecode_page_btnchange",
    endecode_page_btnclear: "m_20111124_endecode_page_btnclear",
    fdp_page_opened: "m_20111124_fdp_page_opened",
    fdp_page_spacedoc: "m_20111124_fdp_page_spacedoc",
    fdp_page_fedoc: "m_20111124_fdp_page_fedoc",
    fdp_page_btnsearch: "m_20111124_fdp_page_btnsearch",
    fcp_detect_show: "m_20111124_fcp_detect_show",
    fcp_detect_close: "m_20111124_fcp_detect_close",
    fcp_detect_min: "m_20111124_fcp_detect_min",
    fcp_detect_max: "m_20111124_fcp_detect_max",
    fcp_detect_morehtml: "m_20111124_fcp_detect_morehtml",
    fcp_detect_morecss: "m_20111124_fcp_detect_morecss",
    fcp_detect_morejs: "m_20111124_fcp_detect_morejs",
    grid_detect_show: "m_20111124_grid_detect_show",
    grid_detect_esc: "m_20111124_grid_detect_esc",
    grid_detect_btnclose: "m_20111124_grid_detect_btnclose",
    fehelper_user_count: "m_20111124_fehelper_user_count"
};
var JsonFormatDealer = (function () {
    var c = 1,
        g = 2,
        a = 3,
        e = 4,
        n = 5,
        p = 6;
 
    function i(v) {
        v = ("__" + v + "__").split("");
        var u = {
            singleQuote: false,
            doubleQuote: false,
            regex: false,
            blockComment: false,
            lineComment: false,
            condComp: false
        };
        for (var t = 0, s = v.length; t < s; t++) {
            if (u.regex) {
                if (v[t] === "/" && v[t - 1] !== "\\") {
                    u.regex = false
                }
                continue
            }
            if (u.singleQuote) {
                if (v[t] === "'" && v[t - 1] !== "\\") {
                    u.singleQuote = false
                }
                continue
            }
            if (u.doubleQuote) {
                if (v[t] === '"' && v[t - 1] !== "\\") {
                    u.doubleQuote = false
                }
                continue
            }
            if (u.blockComment) {
                if (v[t] === "*" && v[t + 1] === "/") {
                    v[t + 1] = "";
                    u.blockComment = false
                }
                v[t] = "";
                continue
            }
            if (u.lineComment) {
                if (v[t + 1] === "\n" || v[t + 1] === "\r") {
                    u.lineComment = false
                }
                v[t] = "";
                continue
            }
            if (u.condComp) {
                if (v[t - 2] === "@" && v[t - 1] === "*" && v[t] === "/") {
                    u.condComp = false
                }
                continue
            }
            u.doubleQuote = v[t] === '"';
            u.singleQuote = v[t] === "'";
            if (v[t] === "/") {
                if (v[t + 1] === "*" && v[t + 2] === "@") {
                    u.condComp = true;
                    continue
                }
                if (v[t + 1] === "*") {
                    v[t] = "";
                    u.blockComment = true;
                    continue
                }
                if (v[t + 1] === "/") {
                    v[t] = "";
                    u.lineComment = true;
                    continue
                }
                u.regex = true
            }
        }
        return v.join("").slice(2, -2)
    }
    localStorage.jfVersion = "0.5.6";
    var d, b = document.createElement("span");
 
    function j(u, t) {
        var s = b.cloneNode(false);
        s.className = t;
        s.innerText = u;
        return s
    }
    function l(t) {
        var s = b.cloneNode(false);
        s.innerText = t;
        return s
    }
    function r(t) {
        var s = b.cloneNode(false);
        s.className = t;
        return s
    }
    var q = {
        t_kvov: r("kvov"),
        t_exp: r("e"),
        t_key: r("k"),
        t_string: r("s"),
        t_number: r("n"),
        t_null: j("null", "nl"),
        t_true: j("true", "bl"),
        t_false: j("false", "bl"),
        t_oBrace: j("{", "b"),
        t_cBrace: j("}", "b"),
        t_oBracket: j("[", "b"),
        t_cBracket: j("]", "b"),
        t_ellipsis: r("ell"),
        t_blockInner: r("blockInner"),
        t_colonAndSpace: document.createTextNode(":\u00A0"),
        t_commaText: document.createTextNode(","),
        t_dblqText: document.createTextNode('"')
    };
 
    function h(F, C) {
        var A, E, y, w = q,
            x, v, s;
        if (typeof F === "string") {
            A = c
        } else {
            if (typeof F === "number") {
                A = g
            } else {
                if (F === false || F === true) {
                    A = n
                } else {
                    if (F === null) {
                        A = p
                    } else {
                        if (F instanceof Array) {
                            A = e
                        } else {
                            A = a
                        }
                    }
                }
            }
        }
        E = w.t_kvov.cloneNode(false);
        if (A === a || A === e) {
            y = false;
            for (x in F) {
                if (F.hasOwnProperty(x)) {
                    y = true;
                    break
                }
            }
            if (y) {
                E.appendChild(w.t_exp.cloneNode(false))
            }
        }
        if (C !== false) {
            E.classList.add("objProp");
            v = w.t_key.cloneNode(false);
            v.textContent = JSON.stringify(C).slice(1, -1);
            E.appendChild(w.t_dblqText.cloneNode(false));
            E.appendChild(v);
            E.appendChild(w.t_dblqText.cloneNode(false));
            E.appendChild(w.t_colonAndSpace.cloneNode(false))
        } else {
            E.classList.add("arrElem")
        }
        var D, L;
        switch (A) {
        case c:
            var u = b.cloneNode(false),
                G = JSON.stringify(F);
            G = G.substring(1, G.length - 1);
            if (F[0] === "h" && F.substring(0, 4) === "http") {
                var t = document.createElement("A");
                t.href = F;
                t.innerText = G;
                u.appendChild(t)
            } else {
                u.innerText = G
            }
            s = w.t_string.cloneNode(false);
            s.appendChild(w.t_dblqText.cloneNode(false));
            s.appendChild(u);
            s.appendChild(w.t_dblqText.cloneNode(false));
            E.appendChild(s);
            break;
        case g:
            s = w.t_number.cloneNode(false);
            s.innerText = F;
            E.appendChild(s);
            break;
        case a:
            E.appendChild(w.t_oBrace.cloneNode(true));
            if (y) {
                E.appendChild(w.t_ellipsis.cloneNode(false));
                D = w.t_blockInner.cloneNode(false);
                var B = 0,
                    H, K;
                for (H in F) {
                    if (F.hasOwnProperty(H)) {
                        B++;
                        L = h(F[H], H);
                        K = w.t_commaText.cloneNode();
                        L.appendChild(K);
                        D.appendChild(L)
                    }
                }
                L.removeChild(K);
                E.appendChild(D)
            }
            E.appendChild(w.t_cBrace.cloneNode(true));
            break;
        case e:
            E.appendChild(w.t_oBracket.cloneNode(true));
            if (y) {
                E.appendChild(w.t_ellipsis.cloneNode(false));
                D = w.t_blockInner.cloneNode(false);
                for (var I = 0, z = F.length, J = z - 1; I < z; I++) {
                    L = h(F[I], false);
                    if (I < J) {
                        L.appendChild(w.t_commaText.cloneNode())
                    }
                    D.appendChild(L)
                }
                E.appendChild(D)
            }
            E.appendChild(w.t_cBracket.cloneNode(true));
            break;
        case n:
            if (F) {
                E.appendChild(w.t_true.cloneNode(true))
            } else {
                E.appendChild(w.t_false.cloneNode(true))
            }
            break;
        case p:
            E.appendChild(w.t_null.cloneNode(true));
            break
        }
        return E
    }
    function m(u, s) {
        var w = h(u, false);
        w.classList.add("rootKvov");
        var t = document.createElement("DIV");
        t.id = "formattedJson";
        t.appendChild(w);
        var v = t.outerHTML;
        if (s !== null) {
            v = '<div id="jsonpOpener">' + s + " ( </div>" + v + '<div id="jsonpCloser">)</div>'
        }
        return v
    }
    var k = function (u) {
        var B = null;
        var v = JsonFormatEntrance;
        if (u.type === "SENDING TEXT") {
            var w, D = u.text;
            try {
                w = new Function("return " + D)()
            } catch (y) {
                D = D.trim();
                var t;
                if (!(t = D.indexOf("("))) {
                    v.postMessage(["NOT JSON", "no opening parenthesis"]);
                    v.disconnect();
                    return
                }
                var s = i(D.substring(0, t)).trim();
                if (!s.match(/^[a-zA-Z_$][\.\[\]'"0-9a-zA-Z_$]*$/)) {
                    v.postMessage(["NOT JSON", "first bit not a valid function name"]);
                    v.disconnect();
                    return
                }
                var C;
                if (!(C = D.lastIndexOf(")"))) {
                    v.postMessage(["NOT JSON", "no closing paren"]);
                    v.disconnect();
                    return
                }
                var A = i(D.substring(C + 1)).trim();
                if (A !== "" && A !== ";") {
                    v.postMessage(["NOT JSON", "last closing paren followed by invalid characters"]);
                    v.disconnect();
                    return
                }
                D = D.substring(t + 1, C);
                try {
                    w = JSON.parse(D)
                } catch (z) {
                    v.postMessage(["NOT JSON", "looks like a function call, but the parameter is not valid JSON"]);
                    return
                }
                B = s
            }
            if (typeof w !== "object" && typeof w !== "array") {
                v.postMessage(["NOT JSON", "technically JSON but not an object or array"]);
                v.disconnect();
                return
            }
            v.postMessage(["FORMATTING"]);
            var x = m(w, B);
            v.postMessage(["FORMATTED", x]);
            v.disconnect()
        }
    };
    var f = function (s) {
        k(s)
    };
    var o = function () {};
    return {
        postMessage: f,
        disconnect: o
    }
})();
var JsonFormatEntrance = (function () {
    var r, o, n, i, g, k = JsonFormatDealer,
        l = +(new Date()),
        q, u, b, v;
    var j = function (B) {
        switch (B[0]) {
        case "NOT JSON":
            o.style.display = "";
            r.innerHTML = '<span class="x-json-tips">JSON不合法，请检查：</span>';
            b = +(new Date());
            break;
        case "FORMATTING":
            u = +(new Date());
            clearTimeout(g);
            var y = document.getElementById("optionBar");
            if (y) {
                y.parentNode.removeChild(y)
            }
            y = document.createElement("div");
            y.id = "optionBar";
            var A = document.createElement("button"),
                x = document.createElement("button");
            A.id = "buttonFormatted";
            A.innerText = "格式化";
            A.classList.add("selected");
            x.id = "buttonCollapseAll";
            x.innerText = "折叠所有";
            var z = false;
            A.addEventListener("click", function () {
                if (z) {
                    z = false;
                    o.style.display = "none";
                    r.style.display = "";
                    $(this).text("元数据")
                } else {
                    z = true;
                    o.style.display = "";
                    r.style.display = "none";
                    $(this).text("格式化")
                }
                $(this).parent().find("button").removeClass("selected");
                $(this).addClass("selected")
            }, false);
            x.addEventListener("click", function () {
                if (!z) {
                    if (x.innerText == "折叠所有") {
                        x.innerText = "展开所有";
                        e(document.getElementsByClassName("objProp"))
                    } else {
                        x.innerText = "折叠所有";
                        c(document.getElementsByClassName("objProp"))
                    }
                    $(this).parent().find("button").removeClass("selected");
                    $(this).addClass("selected")
                }
            }, false);
            y.appendChild(A);
            y.appendChild(x);
            document.addEventListener("click", m, false);
            r.parentNode.appendChild(y);
            break;
        case "FORMATTED":
            i.style.display = "";
            r.innerHTML = B[1];
            v = +(new Date());
            break;
        default:
            throw new Error("Message not understood: " + B[0])
        }
    };
    var t = 0;
 
    function e(B) {
        var z, y, x, A;
        for (y = B.length - 1; y >= 0; y--) {
            z = B[y];
            z.classList.add("collapsed");
            if (!z.id) {
                z.id = "kvov" + (++t);
                x = z.firstElementChild;
                while (x && !x.classList.contains("blockInner")) {
                    x = x.nextElementSibling
                }
                if (!x) {
                    continue
                }
                A = x.children.length;
                var C = A + (A === 1 ? " item" : " items");
                n.insertAdjacentHTML("beforeend", "\n#kvov" + t + '.collapsed:after{color: #aaa; content:" // ' + C +
                    '"}')
            }
        }
    }
    function c(y) {
        for (var x = y.length - 1; x >= 0; x--) {
            y[x].classList.remove("collapsed")
        }
    }
    var h = navigator.platform.indexOf("Mac") !== -1,
        d;
    if (h) {
        d = function (x) {
            return x.metaKey
        }
    } else {
        d = function (x) {
            return x.ctrlKey
        }
    }
    function m(A) {
        if (A.which === 1) {
            var z = A.target;
            if (z.className === "e") {
                A.preventDefault();
                var y = z.parentNode,
                    E = r,
                    x = document.body.offsetHeight,
                    C = document.body.scrollTop,
                    B;
                if (y.classList.contains("collapsed")) {
                    if (d(A)) {
                        c(y.parentNode.children)
                    } else {
                        c([y])
                    }
                } else {
                    if (d(A)) {
                        e(y.parentNode.children)
                    } else {
                        e([y])
                    }
                }
                E.style.marginBottom = 0;
                if (document.body.offsetHeight < window.innerHeight) {
                    return
                }
                if (document.body.scrollTop === C) {
                    return
                }
                var D = C - document.body.scrollTop + 8;
                E.style.marginBottom = D + "px";
                document.body.scrollTop = C;
                return
            }
        }
    }
    var f = function (x) {
        j(x)
    };
    var w = function () {};
    var s = function (x) {
        r = document.getElementById("jfContent");
        if (!r) {
            r = document.createElement("div");
            r.id = "jfContent";
            document.body.appendChild(r)
        }
        r.style.display = "";
        o = document.getElementById("jfContent_pre");
        if (!o) {
            o = document.createElement("pre");
            o.id = "jfContent_pre";
            document.body.appendChild(o)
        }
        o.innerHTML = JSON.stringify(JSON.parse(x), null, 4);
        o.style.display = "none";
        n = document.getElementById("jfStyleEl");
        if (!n) {
            n = document.createElement("style");
            document.head.appendChild(n)
        }
        i = document.getElementById("formattingMsg");
        if (!i) {
            i = document.createElement("pre");
            i.id = "formattingMsg";
            i.innerHTML =
                '<svg id="spinner" width="16" height="16" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#3d7fe6"></path></svg> 格式化中...';
            document.body.appendChild(i)
        }
        k.postMessage({
            type: "SENDING TEXT",
            text: x,
            length: x.length
        });
        a(JSON.parse(x))
    };
    var a = function (x) {
        try {
            window.webkitRequestFileSystem(window.TEMPORARY, 10 * 1024 * 1024, function (z) {
                var B = (+new Date).toString(36);
                var A = +new Date() + ".json";
                z.root.getDirectory(B, {
                    create: true
                }, function (D) {
                    var C = B + "/" + A;
                    z.root.getFile(C, {
                        create: true
                    }, function (E) {
                        E.createWriter(function (G) {
                            G.onwriteend = function () {
                                $("#optionBar").prepend('<a href="' + E.toURL() +
                                    '" id="btnDownload" target="_blank" title="在新页面Ctrl+S保存到本地">下载JSON数据</a>')
                            };
                            var F = new Blob([JSON.stringify(x, null, 4)], {
                                type: "application/octet-stream"
                            });
                            G.write(F)
                        })
                    })
                })
            })
        } catch (y) {}
    };
    var p = function () {
        try {
            r.innerHTML = "";
            o.innerHTML = ""
        } catch (x) {}
    };
    return {
        format: s,
        clear: p,
        postMessage: f,
        disconnect: w
    }
})();
baidu.jsonformat = (function () {
    var a = function () {
        $("#btnFormat").click(function (d) {
			$("#mod-json-result").show();
            var c = $.trim($("#jsonSource").val());
            JsonFormatEntrance.clear();
            JsonFormatEntrance.format(c)
        });
        $("#jfContent").delegate(".kvov", "click", function (c) {
            $("#jfContent .kvov").removeClass("x-outline");
            $(this).removeClass("x-hover").addClass("x-outline");
            if (!$(c.target).is(".kvov .e")) {
                c.stopPropagation()
            } else {
                $(c.target).parent().trigger("click")
            }
        }).delegate(".kvov", "mouseover", function (c) {
            $(this).addClass("x-hover");
            return false
        }).delegate(".kvov", "mouseout", function (c) {
            $(this).removeClass("x-hover")
        })
    };
    var b = function () {
        $(function () {
            jQuery("#jsonSource").focus();
            a()
        })
    };
    return {
        init: b
    }
})();
baidu.jsonformat.init();