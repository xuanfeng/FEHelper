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
    var c = arguments.length,
        d = this;
    while (c--) {
        d = d.replace(new RegExp("\\{" + c + "\\}", "g"), arguments[c])
    }
    return d
};
Date.prototype.format = function (n) {
    var r = function (a, b) {
        var e = "",
            c = (a < 0),
            d = String(Math.abs(a));
        if (d.length < b) {
            e = (new Array(b - d.length + 1)).join("0")
        }
        return (c ? "-" : "") + e + d
    };
    if ("string" != typeof n) {
        return this.toString()
    }
    var q = function (a, b) {
        n = n.replace(a, b)
    };
    var m = this.getFullYear(),
        o = this.getMonth() + 1,
        j = this.getDate(),
        l = this.getHours(),
        p = this.getMinutes(),
        k = this.getSeconds();
    q(/yyyy/g, r(m, 4));
    q(/yy/g, r(parseInt(m.toString().slice(2), 10), 2));
    q(/MM/g, r(o, 2));
    q(/M/g, o);
    q(/dd/g, r(j, 2));
    q(/d/g, j);
    q(/HH/g, r(l, 2));
    q(/H/g, l);
    q(/hh/g, r(l % 12, 2));
    q(/h/g, l % 12);
    q(/mm/g, r(p, 2));
    q(/m/g, p);
    q(/ss/g, r(k, 2));
    q(/s/g, k);
    return n
};
String.prototype.getBytes = function () {
    var c = this.replace(/\n/g, "xx").replace(/\t/g, "x");
    var d = encodeURIComponent(c);
    return d.replace(/%[A-Z0-9][A-Z0-9]/g, "x").length
};
var getOuterHtmlEllipsis = function (g) {
    var e = /(<[^>]+>)/g;
    var f = e.exec(g.outerHTML);
    var h = f ? f[1] : g.outerHTML;
    h = h.length > 40 ? h.substr(0, 40) + "..." : h;
    return h.replace(/</g, "<").replace(/>/g, ">")
};
var getOuterAndInnerHtmlEllipsis = function (c) {
    var d = jQuery("<div></div>").append(c).html()
};
(function () {
    baidu.i18n = {};
    baidu.i18n.getMessage = function (g, e) {
        if (e) {
            for (var h = 0, f = e.length; h < f; h++) {
                e[h] = "" + e[h]
            }
            return chrome.i18n.getMessage(g, e)
        } else {
            return chrome.i18n.getMessage(g)
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
baidu.namespace.register("baidu.regexp");
$.fn.extend({
    textareaAutoHeight: function (b) {
        this._options = {
            minHeight: 0,
            maxHeight: 1000
        };
        this.init = function () {
            for (var a in b) {
                this._options[a] = b[a]
            }
            if (this._options.minHeight == 0) {
                this._options.minHeight = parseFloat($(this).height())
            }
            for (var a in this._options) {
                if ($(this).attr(a) == null) {
                    $(this).attr(a, this._options[a])
                }
            }
            $(this).keyup(this.resetHeight).change(this.resetHeight).focus(this.resetHeight)
        };
        this.resetHeight = function () {
            var e = parseFloat($(this).attr("minHeight"));
            var f = parseFloat($(this).attr("maxHeight"));
            if (!$.browser.msie) {
                $(this).height(0)
            }
            var a = parseFloat(this.scrollHeight);
            a = a < e ? e : a > f ? f : a;
            $(this).height(a).scrollTop(a);
            if (a >= f) {
                $(this).css("overflow-y", "scroll")
            } else {
                $(this).css("overflow-y", "hidden")
            }
        };
        this.init()
    }
});
baidu.regexp = (function () {
    var J, x, w, H, E, G, D;
    var K = "tmp_id_";
    var M = "b";
    var v = "i";
    var A = "tr_" + K;
    var B = function (b) {
        try {
            return new Function("return " + b)()
        } catch (a) {
            return null
        }
    };
    var C = function (a) {
        var b = ["<table class='table table-bordered table-striped table-condensed table-hover'>"];
        b.push('<tr class="active"><th class="num">序号</th><th>匹配结果</th><th>在原字符串中的位置</th></tr>');
        $.each(a, function (d, c) {
            b.push('<tr id="' + A + c.index + '" data-index="' + c.index + '">');
            b.push('<td class="num">' + (d + 1) + '</td><td class="content">' + u(t(c.text)) +
                '</td><td class="index">' + c.index + "</td>");
            b.push("</tr>")
        });
        b.push("</table>");
        return b.join("")
    };
    var u = function (a) {
        return a.replace(/'/g, "'").replace(/<br\s*(\/)?\s*>/g, "\n").replace(/ /g, " ").replace(/</g, "<")
            .replace(/>/g, ">").replace(/"/g, '"').replace(/&/g, "&")
    };
    var t = function (a) {
        return a.replace(/'/g, "'").replace(/\n/g, "<br*>").replace(/\s/g, " ").replace(/</g, "<").replace(
            />/g, ">").replace(/"/g, "\"").replace(/&/g, "&")
    };
    var L = function (b, a) {
        var d = [];
        for (var c = 0, e = a.text.length; c < e; c++) {
            d.push("<" + b + ' data-id="' + K + a.index + '">' + a.text.charAt(c) + "</" + b + ">")
        }
        return d.join("")
    };
    var y = function () {
        $("tr[id^=" + A + "]").click(function (a) {
            var b = $(this).attr("data-index");
            var c = $(M + "[data-id=" + K + b + "]");
            c.animate({
                opacity: 0
            }, 200).delay().animate({
                opacity: 1
            }, 200).delay().animate({
                opacity: 0
            }, 200).delay().animate({
                opacity: 1
            }, 200)
        })
    };
    var z = function (c, a) {
        if (!c) {
            E.html("");
            return
        }
        var d = [];
        var b = 0;
        $.each(a, function (e, f) {
            if (e == 0) {
                if (f.index == 0) {
                    d.push(L(M, f))
                } else {
                    d.push(L(v, {
                        index: 0,
                        text: c.substring(0, f.index)
                    }));
                    d.push(L(M, f))
                }
            } else {
                b = a[e - 1].index + a[e - 1].text.length;
                d.push(L(v, {
                    index: b,
                    text: c.substring(b, f.index)
                }));
                d.push(L(M, f))
            }
        });
        E.html(d.join(""));
        y()
    };
    var N = function (b) {
        var a = ["<table class='table table-bordered table-striped table-condensed table-hover'>"];
        a.push('<tr class="active"><th class="num">序号</th><th>匹配结果</th></tr>');
        a.push('<tr><td colspan="2">' + b + "</td></tr>");
        a.push("</table>");
        return a.join("")
    };
    var I = function (b) {
        G.height(x.height()+24);
        var d = J.val().trim();
        var c = x.val().trim();
        if (!d || !c) {
            w.html(N("不能匹配"));
            H.html("0个");
            z()
        } else {
            var e = B(d);
            if (!e || !e instanceof RegExp) {
                w.html(N("正则表达式错误！"));
                H.html("0个");
                z();
                return
            }
            var a = [];
            c.replace(e, function () {
                var f = arguments[0];
                var g = arguments[arguments.length - 2];
                a.push({
                    text: f,
                    index: g
                })
            });
            if (!a || !a.length) {
                w.html(N("不能匹配"));
                H.html("0个");
                z()
            } else {
                w.html(C(a));
                H.html(a.length + "个");
                z(c, a)
            }
        }
    };
    var F = function () {
        $(function () {
            J = $("#regText");
            x = $("#srcCode");
            E = $("#srcBackground");
            G = $("#srcWrapper");
            w = $("#rstCode").html(N("暂无输入"));
            H = $("#rstCount");
            D = $("#regList");
            J.textareaAutoHeight({
                minHeight: 34
            });
            x.textareaAutoHeight({
                minHeight: 50
            });
            $("#regText,#srcCode").keyup(I).change(I).bind("paste", I);
            D.change(function (a) {
                var c = $(this).val();
                var b = $("#regTip");
                J.val(c);
                if (!c) {
                    b.hide()
                } else {
                    b.show()
                }
            })
        })
    };
    return {
        init: F
    }
})();
baidu.regexp.init();