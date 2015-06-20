baidu.namespace.register("baidu.regexp");
$.fn.extend({
    textareaAutoHeight: function (a) {
        this._options = {
            minHeight: 0,
            maxHeight: 1000
        };
        this.init = function () {
            for (var b in a) {
                this._options[b] = a[b]
            }
            if (this._options.minHeight == 0) {
                this._options.minHeight = parseFloat($(this).height())
            }
            for (var b in this._options) {
                if ($(this).attr(b) == null) {
                    $(this).attr(b, this._options[b])
                }
            }
            $(this).keyup(this.resetHeight).change(this.resetHeight).focus(this.resetHeight)
        };
        this.resetHeight = function () {
            var d = parseFloat($(this).attr("minHeight"));
            var c = parseFloat($(this).attr("maxHeight"));
            if (!$.browser.msie) {
                $(this).height(0)
            }
            var b = parseFloat(this.scrollHeight);
            b = b < d ? d : b > c ? c : b;
            $(this).height(b).scrollTop(b);
            if (b >= c) {
                $(this).css("overflow-y", "scroll")
            } else {
                $(this).css("overflow-y", "hidden")
            }
        };
        this.init()
    }
});
baidu.regexp = (function () {
    var e, q, r, g, j, h, k;
    var d = "tmp_id_";
    var b = "b";
    var s = "i";
    var n = "tr_" + d;
    var m = function (t) {
        try {
            return new Function("return " + t)()
        } catch (u) {
            return null
        }
    };
    var l = function (u) {
        var t = ["<table class='table table-bordered table-striped table-condensed table-hover'>"];
        t.push('<tr><th class="num">序号</th><th>匹配结果</th><th>在原字符串中的位置</th></tr>');
        $.each(u, function (v, w) {
            t.push('<tr id="' + n + w.index + '" data-index="' + w.index + '">');
            t.push('<td class="num">' + (v + 1) + '</td><td class="content">' + htmlDecode(w.text) + '</td><td class="index">' + w.index +
                "</td>");
            t.push("</tr>")
        });
        t.push("</table>");
        return t.join("")
    };
    var htmlDecode = function(str){
    	return str
          .replace(/&#39;/g, '\'')
          .replace(/<br\s*(\/)?\s*>/g, '\n')
          .replace(/&nbsp;/g, ' ')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&');
	}
    var c = function (w, x) {
        var u = [];
        for (var v = 0, t = x.text.length; v < t; v++) {
            u.push("<" + w + ' data-id="' + d + x.index + '">' + x.text.charAt(v) + "</" + w + ">")
        }
        return u.join("")
    };
    var p = function () {
        $("tr[id^=" + n + "]").click(function (v) {
            var u = $(this).attr("data-index");
            var t = $(b + "[data-id=" + d + u + "]");
            t.animate({
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
    var o = function (u, w) {
        if (!u) {
            j.html("");
            return
        }
        var t = [];
        var v = 0;
        $.each(w, function (x, y) {
            if (x == 0) {
                if (y.index == 0) {
                    t.push(c(b, y))
                } else {
                    t.push(c(s, {
                        index: 0,
                        text: u.substring(0, y.index)
                    }));
                    t.push(c(b, y))
                }
            } else {
                v = w[x - 1].index + w[x - 1].text.length;
                t.push(c(s, {
                    index: v,
                    text: u.substring(v, y.index)
                }));
                t.push(c(b, y))
            }
        });
        j.html(t.join(""));
        p()
    };
    var a = function (t) {
        var u = ["<table class='table table-bordered table-striped table-condensed table-hover'>>"];
        u.push('<tr><th class="num">序号</th><th>匹配结果</th></tr>');
        u.push('<tr><td colspan="2">' + t + "</td></tr>");
        u.push("</table>");
        return u.join("")
    };
    var f = function (w) {
        h.height(q.height());
        var u = e.val().trim();
        var v = q.val().trim();
        if (!u || !v) {
            r.html(a("不能匹配"));
            g.html("0个");
            o()
        } else {
            var t = m(u);
            if (!t || !t instanceof RegExp) {
                r.html(a("正则表达式错误！"));
                g.html("0个");
                o();
                return
            }
            var x = [];
            v.replace(t, function () {
                var z = arguments[0];
                var y = arguments[arguments.length - 2];
                x.push({
                    text: z,
                    index: y
                })
            });
            if (!x || !x.length) {
                r.html(a("不能匹配"));
                g.html("0个");
                o()
            } else {
                r.html(l(x));
                g.html(x.length + "个");
                o(v, x)
            }
        }
    };
    var i = function () {
        $(function () {
            e = $("#regText");
            q = $("#srcCode");
            j = $("#srcBackground");
            h = $("#srcWrapper");
            r = $("#rstCode").html(a("暂无输入"));
            g = $("#rstCount");
            k = $("#regList");
            e.textareaAutoHeight({
                minHeight: 34
            });
            q.textareaAutoHeight({
                minHeight: 50
            });
            $("#regText,#srcCode").keyup(f).change(f).bind("paste", f);
            k.change(function (v) {
                var t = $(this).val();
                var u = $("#regTip");
                e.val(t);
                if (!t) {
                    u.hide()
                } else {
                    u.show()
                }
            })
        })
    };
    return {
        init: i
    }
})();
baidu.regexp.init();