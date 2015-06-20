(function () {
    function a(d, c) {
        var e = new b(d, c);
        return e.beautify()
    }
    function b(g, F) {
        var e, J, t, ac, Z, C, an;
        var v, G, h;
        var O, af, j, r, A, am;
        var W;
        var aa, n, k, ao, z;
        var B;
        var d, L, w;
        var aq = "";
        O = "\n\r\t ".split("");
        af = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$".split("");
        am = "0123456789".split("");
        j =
            "+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::";
        j += " <%= <% %> <?= <? ?>";
        j = j.split(" ");
        A = "continue,try,throw,return,var,if,switch,case,default,for,while,break,function".split(",");
        L = {
            BlockStatement: "BlockStatement",
            Statement: "Statement",
            ObjectLiteral: "ObjectLiteral",
            ArrayLiteral: "ArrayLiteral",
            ForInitializer: "ForInitializer",
            Conditional: "Conditional",
            Expression: "Expression"
        };
        d = {
            TK_START_EXPR: aj,
            TK_END_EXPR: N,
            TK_START_BLOCK: X,
            TK_END_BLOCK: Y,
            TK_WORD: y,
            TK_SEMICOLON: M,
            TK_STRING: x,
            TK_EQUALS: R,
            TK_OPERATOR: ad,
            TK_COMMA: ah,
            TK_BLOCK_COMMENT: ag,
            TK_INLINE_COMMENT: V,
            TK_COMMENT: o,
            TK_DOT: ai,
            TK_UNKNOWN: ab
        };
 
        function l(at, au) {
            return {
                mode: au,
                last_text: at ? at.last_text : "",
                last_word: at ? at.last_word : "",
                var_line: false,
                var_line_tainted: false,
                var_line_reindented: false,
                in_html_comment: false,
                multiline_array: false,
                if_block: false,
                do_block: false,
                do_while: false,
                in_case_statement: false,
                in_case: false,
                case_body: false,
                indentation_level: (at ? at.indentation_level + ((at.var_line && at.var_line_reindented) ? 1 : 0) : 0),
                ternary_depth: 0
            }
        }
        F = F ? F : {};
        w = {};
        if (F.space_after_anon_function !== undefined && F.jslint_happy === undefined) {
            F.jslint_happy = F.space_after_anon_function
        }
        if (F.braces_on_own_line !== undefined) {
            w.brace_style = F.braces_on_own_line ? "expand" : "collapse"
        }
        w.brace_style = F.brace_style ? F.brace_style : (w.brace_style ? w.brace_style : "collapse");
        w.indent_size = F.indent_size ? parseInt(F.indent_size, 10) : 4;
        w.indent_char = F.indent_char ? F.indent_char : " ";
        w.preserve_newlines = (F.preserve_newlines === undefined) ? true : F.preserve_newlines;
        w.break_chained_methods = (F.break_chained_methods === undefined) ? false : F.break_chained_methods;
        w.max_preserve_newlines = (F.max_preserve_newlines === undefined) ? 0 : parseInt(F.max_preserve_newlines, 10);
        w.jslint_happy = (F.jslint_happy === undefined) ? false : F.jslint_happy;
        w.keep_array_indentation = (F.keep_array_indentation === undefined) ? false : F.keep_array_indentation;
        w.space_before_conditional = (F.space_before_conditional === undefined) ? true : F.space_before_conditional;
        w.unescape_strings = (F.unescape_strings === undefined) ? false : F.unescape_strings;
        w.wrap_line_length = (F.wrap_line_length === undefined) ? 0 : parseInt(F.wrap_line_length, 10);
        an = "";
        while (w.indent_size > 0) {
            an += w.indent_char;
            w.indent_size -= 1
        }
        while (g && (g.charAt(0) === " " || g.charAt(0) === "\t")) {
            aq += g.charAt(0);
            g = g.substring(1)
        }
        e = g;
        B = g.length;
        Z = "TK_START_BLOCK";
        C = "";
        J = [];
        k = false;
        ao = false;
        z = [];
        h = [];
        q(L.BlockStatement);
        r = 0;
        this.beautify = function () {
            var av, au, at, aw;
            while (true) {
                av = ae();
                t = av[0];
                ac = av[1];
                if (ac === "TK_EOF") {
                    break
                }
                at = w.keep_array_indentation && T(v.mode);
                if (at) {
                    for (au = 0; au < n; au += 1) {
                        I(true)
                    }
                } else {
                    aa = n > 0;
                    if (w.max_preserve_newlines && n > w.max_preserve_newlines) {
                        n = w.max_preserve_newlines
                    }
                    if (w.preserve_newlines) {
                        if (n > 1) {
                            I();
                            for (au = 1; au < n; au += 1) {
                                I(true)
                            }
                        }
                    }
                }
                d[ac]();
                if (ac !== "TK_INLINE_COMMENT" && ac !== "TK_COMMENT" && ac !== "TK_UNKNOWN") {
                    C = v.last_text;
                    Z = ac;
                    v.last_text = t
                }
            }
            aw = aq + J.join("").replace(/[\r\n ]+$/, "");
            return aw
        };
 
        function u(at) {
            at = (at === undefined) ? false : at;
            while (J.length && (J[J.length - 1] === " " || J[J.length - 1] === an || J[J.length - 1] === aq || (at && (
                J[J.length - 1] === "\n" || J[J.length - 1] === "\r")))) {
                J.pop()
            }
        }
        function c(at) {
            return at.replace(/^\s\s*|\s\s*$/, "")
        }
        function al(av) {
            av = av.replace(/\x0d/g, "");
            var au = [],
                at = av.indexOf("\n");
            while (at !== -1) {
                au.push(av.substring(0, at));
                av = av.substring(at + 1);
                at = av.indexOf("\n")
            }
            if (av.length) {
                au.push(av)
            }
            return au
        }
        function ar() {
            return J.length && J[J.length - 1] === "\n"
        }
        function E(at, av) {
            var au = at.length - 1;
            if (au < 0) {
                au += at.length
            }
            if (au > at.length - 1) {
                au = at.length - 1
            }
            for (au++; au-- > 0;) {
                if (au in at && at[au] === av) {
                    return au
                }
            }
            return -1
        }
        function p(av) {
            av = (av === undefined) ? false : av;
            if (w.wrap_line_length && !av) {
                var at = "";
                var au = 0;
                var aw = E(J, "\n") + 1;
                if (aw < J.length) {
                    at = J.slice(aw).join("");
                    au = at.length + t.length + (ao ? 1 : 0);
                    if (au >= w.wrap_line_length) {
                        av = true
                    }
                }
            }
            if (((w.preserve_newlines && aa) || av) && !ar()) {
                I(false, true);
                k = true;
                aa = false
            }
        }
        function I(at, au) {
            k = false;
            ao = false;
            if (!au) {
                if (v.last_text !== ";") {
                    while (v.mode === L.Statement && !v.if_block) {
                        i()
                    }
                }
            }
            if (v.mode === L.ArrayLiteral) {
                v.multiline_array = true
            }
            if (!J.length) {
                return
            }
            if (at || !ar()) {
                J.push("\n")
            }
        }
        function D() {
            if (ar()) {
                if (w.keep_array_indentation && T(v.mode) && z.length) {
                    J.push(z.join("") + "")
                } else {
                    if (aq) {
                        J.push(aq)
                    }
                    m(v.indentation_level);
                    m(v.var_line && v.var_line_reindented);
                    m(k)
                }
            }
        }
        function m(au) {
            if (au === undefined) {
                au = 1
            } else {
                if (typeof au !== "number") {
                    au = au ? 1 : 0
                }
            } if (v.last_text !== "") {
                for (var at = 0; at < au; at += 1) {
                    J.push(an)
                }
            }
        }
        function ak() {
            if (ao && J.length) {
                var at = J[J.length - 1];
                if (!ar() && at !== " " && at !== an) {
                    J.push(" ")
                }
            }
        }
        function P(at) {
            at = at || t;
            D();
            k = false;
            ak();
            ao = false;
            J.push(at)
        }
        function s() {
            v.indentation_level += 1
        }
        function q(at) {
            if (v) {
                h.push(v);
                G = v
            } else {
                G = l(null, at)
            }
            v = l(G, at)
        }
        function T(at) {
            return at === L.ArrayLiteral
        }
        function K(at) {
            return Q(at, [L.ArrayLiteral, L.Expression, L.ForInitializer, L.Conditional])
        }
        function i() {
            if (h.length > 0) {
                G = v;
                v = h.pop()
            }
        }
        function H() {
            if ((v.last_text === "do" || (v.last_text === "else" && t !== "if") || (Z === "TK_END_EXPR" && (G.mode ===
                L.ForInitializer || G.mode === L.Conditional)))) {
                p();
                q(L.Statement);
                s();
                k = false;
                return true
            }
            return false
        }
        function ap(au, aw) {
            for (var av = 0; av < au.length; av++) {
                var at = c(au[av]);
                if (at.charAt(0) !== aw) {
                    return false
                }
            }
            return true
        }
        function S(at) {
            return Q(at, ["case", "return", "do", "if", "throw", "else"])
        }
        function Q(av, at) {
            for (var au = 0; au < at.length; au += 1) {
                if (at[au] === av) {
                    return true
                }
            }
            return false
        }
        function f(aw) {
            var at = false,
                au = "",
                az = 0,
                av = "",
                ax = 0,
                ay;
            while (at || az < aw.length) {
                ay = aw.charAt(az);
                az++;
                if (at) {
                    at = false;
                    if (ay === "x") {
                        av = aw.substr(az, 2);
                        az += 2
                    } else {
                        if (ay === "u") {
                            av = aw.substr(az, 4);
                            az += 4
                        } else {
                            au += "\\" + ay;
                            continue
                        }
                    } if (!av.match(/^[0123456789abcdefABCDEF]+$/)) {
                        return aw
                    }
                    ax = parseInt(av, 16);
                    if (ax >= 0 && ax < 32) {
                        if (ay === "x") {
                            au += "\\x" + av
                        } else {
                            au += "\\u" + av
                        }
                        continue
                    } else {
                        if (ax === 34 || ax === 39 || ax === 92) {
                            au += "\\" + String.fromCharCode(ax)
                        } else {
                            if (ay === "x" && ax > 126 && ax <= 255) {
                                return aw
                            } else {
                                au += String.fromCharCode(ax)
                            }
                        }
                    }
                } else {
                    if (ay === "\\") {
                        at = true
                    } else {
                        au += ay
                    }
                }
            }
            return au
        }
        function U(au) {
            var at = r;
            var av = e.charAt(at);
            while (Q(av, O) && av !== au) {
                at++;
                if (at >= B) {
                    return false
                }
                av = e.charAt(at)
            }
            return av === au
        }
        function ae() {
            var aw, at;
            n = 0;
            if (r >= B) {
                return ["", "TK_EOF"]
            }
            aa = false;
            z = [];
            var aB = e.charAt(r);
            r += 1;
            while (Q(aB, O)) {
                if (aB === "\n") {
                    n += 1;
                    z = []
                } else {
                    if (n) {
                        if (aB === an) {
                            z.push(an)
                        } else {
                            if (aB !== "\r") {
                                z.push(" ")
                            }
                        }
                    }
                } if (r >= B) {
                    return ["", "TK_EOF"]
                }
                aB = e.charAt(r);
                r += 1
            }
            if (Q(aB, af)) {
                if (r < B) {
                    while (Q(e.charAt(r), af)) {
                        aB += e.charAt(r);
                        r += 1;
                        if (r === B) {
                            break
                        }
                    }
                }
                if (r !== B && aB.match(/^[0-9]+[Ee]$/) && (e.charAt(r) === "-" || e.charAt(r) === "+")) {
                    var au = e.charAt(r);
                    r += 1;
                    var aD = ae();
                    aB += au + aD[0];
                    return [aB, "TK_WORD"]
                }
                if (aB === "in") {
                    return [aB, "TK_OPERATOR"]
                }
                return [aB, "TK_WORD"]
            }
            if (aB === "(" || aB === "[") {
                return [aB, "TK_START_EXPR"]
            }
            if (aB === ")" || aB === "]") {
                return [aB, "TK_END_EXPR"]
            }
            if (aB === "{") {
                return [aB, "TK_START_BLOCK"]
            }
            if (aB === "}") {
                return [aB, "TK_END_BLOCK"]
            }
            if (aB === ";") {
                return [aB, "TK_SEMICOLON"]
            }
            if (aB === "/") {
                var ax = "";
                var aC = true;
                if (e.charAt(r) === "*") {
                    r += 1;
                    if (r < B) {
                        while (r < B && !(e.charAt(r) === "*" && e.charAt(r + 1) && e.charAt(r + 1) === "/")) {
                            aB = e.charAt(r);
                            ax += aB;
                            if (aB === "\n" || aB === "\r") {
                                aC = false
                            }
                            r += 1;
                            if (r >= B) {
                                break
                            }
                        }
                    }
                    r += 2;
                    if (aC && n === 0) {
                        return ["/*" + ax + "*/", "TK_INLINE_COMMENT"]
                    } else {
                        return ["/*" + ax + "*/", "TK_BLOCK_COMMENT"]
                    }
                }
                if (e.charAt(r) === "/") {
                    ax = aB;
                    while (e.charAt(r) !== "\r" && e.charAt(r) !== "\n") {
                        ax += e.charAt(r);
                        r += 1;
                        if (r >= B) {
                            break
                        }
                    }
                    return [ax, "TK_COMMENT"]
                }
            }
            if (aB === "'" || aB === '"' || (aB === "/" && ((Z === "TK_WORD" && S(v.last_text)) || (Z === "TK_END_EXPR" &&
                Q(G.mode, [L.Conditional, L.ForInitializer])) || (Q(Z, ["TK_COMMENT", "TK_START_EXPR", "TK_START_BLOCK",
                    "TK_END_BLOCK", "TK_OPERATOR", "TK_EQUALS", "TK_EOF", "TK_SEMICOLON", "TK_COMMA"]))))) {
                var aE = aB,
                    aA = false,
                    az = false;
                at = aB;
                if (r < B) {
                    if (aE === "/") {
                        var ay = false;
                        while (aA || ay || e.charAt(r) !== aE) {
                            at += e.charAt(r);
                            if (!aA) {
                                aA = e.charAt(r) === "\\";
                                if (e.charAt(r) === "[") {
                                    ay = true
                                } else {
                                    if (e.charAt(r) === "]") {
                                        ay = false
                                    }
                                }
                            } else {
                                aA = false
                            }
                            r += 1;
                            if (r >= B) {
                                return [at, "TK_STRING"]
                            }
                        }
                    } else {
                        while (aA || e.charAt(r) !== aE) {
                            at += e.charAt(r);
                            if (aA) {
                                if (e.charAt(r) === "x" || e.charAt(r) === "u") {
                                    az = true
                                }
                                aA = false
                            } else {
                                aA = e.charAt(r) === "\\"
                            }
                            r += 1;
                            if (r >= B) {
                                return [at, "TK_STRING"]
                            }
                        }
                    }
                }
                r += 1;
                at += aE;
                if (az && w.unescape_strings) {
                    at = f(at)
                }
                if (aE === "/") {
                    while (r < B && Q(e.charAt(r), af)) {
                        at += e.charAt(r);
                        r += 1
                    }
                }
                return [at, "TK_STRING"]
            }
            if (aB === "#") {
                if (J.length === 0 && e.charAt(r) === "!") {
                    at = aB;
                    while (r < B && aB !== "\n") {
                        aB = e.charAt(r);
                        at += aB;
                        r += 1
                    }
                    return [c(at) + "\n", "TK_UNKNOWN"]
                }
                var av = "#";
                if (r < B && Q(e.charAt(r), am)) {
                    do {
                        aB = e.charAt(r);
                        av += aB;
                        r += 1
                    } while (r < B && aB !== "#" && aB !== "=");
                    if (aB === "#") {} else {
                        if (e.charAt(r) === "[" && e.charAt(r + 1) === "]") {
                            av += "[]";
                            r += 2
                        } else {
                            if (e.charAt(r) === "{" && e.charAt(r + 1) === "}") {
                                av += "{}";
                                r += 2
                            }
                        }
                    }
                    return [av, "TK_WORD"]
                }
            }
            if (aB === "<" && e.substring(r - 1, r + 3) === "<!--") {
                r += 3;
                aB = "<!--";
                while (e.charAt(r) !== "\n" && r < B) {
                    aB += e.charAt(r);
                    r++
                }
                v.in_html_comment = true;
                return [aB, "TK_COMMENT"]
            }
            if (aB === "-" && v.in_html_comment && e.substring(r - 1, r + 2) === "-->") {
                v.in_html_comment = false;
                r += 2;
                return ["-->", "TK_COMMENT"]
            }
            if (aB === ".") {
                return [aB, "TK_DOT"]
            }
            if (Q(aB, j)) {
                while (r < B && Q(aB + e.charAt(r), j)) {
                    aB += e.charAt(r);
                    r += 1;
                    if (r >= B) {
                        break
                    }
                }
                if (aB === ",") {
                    return [aB, "TK_COMMA"]
                } else {
                    if (aB === "=") {
                        return [aB, "TK_EQUALS"]
                    } else {
                        return [aB, "TK_OPERATOR"]
                    }
                }
            }
            return [aB, "TK_UNKNOWN"]
        }
        function aj() {
            if (H()) {}
            if (t === "[") {
                if (Z === "TK_WORD" || v.last_text === ")") {
                    if (Q(v.last_text, A)) {
                        ao = true
                    }
                    q(L.Expression);
                    P();
                    return
                }
                if (T(v.mode)) {
                    if ((v.last_text === "[") || (C === "]" && v.last_text === ",")) {
                        if (!w.keep_array_indentation) {
                            I()
                        }
                    }
                }
            } else {
                if (v.last_text === "for") {
                    q(L.ForInitializer)
                } else {
                    if (Q(v.last_text, ["if", "while"])) {
                        q(L.Conditional)
                    } else {
                        q(L.Expression)
                    }
                }
            } if (v.last_text === ";" || Z === "TK_START_BLOCK") {
                I()
            } else {
                if (Z === "TK_END_EXPR" || Z === "TK_START_EXPR" || Z === "TK_END_BLOCK" || v.last_text === ".") {
                    if (aa) {
                        I()
                    }
                } else {
                    if (Z !== "TK_WORD" && Z !== "TK_OPERATOR") {
                        ao = true
                    } else {
                        if (v.last_word === "function" || v.last_word === "typeof") {
                            if (w.jslint_happy) {
                                ao = true
                            }
                        } else {
                            if (Q(v.last_text, A) || v.last_text === "catch") {
                                if (w.space_before_conditional) {
                                    ao = true
                                }
                            }
                        }
                    }
                }
            } if (t === "(") {
                if (Z === "TK_EQUALS" || Z === "TK_OPERATOR") {
                    if (v.mode !== L.ObjectLiteral) {
                        p()
                    }
                }
            }
            P();
            if (t === "[") {
                q(L.ArrayLiteral);
                s()
            }
        }
        function N() {
            while (v.mode === L.Statement) {
                i()
            }
            if (t === "]" && T(v.mode) && v.multiline_array && !w.keep_array_indentation) {
                I()
            }
            i();
            P();
            if (v.do_while && G.mode === L.Conditional) {
                G.mode = L.Expression;
                v.do_block = false;
                v.do_while = false
            }
        }
        function X() {
            q(L.BlockStatement);
            var at = U("}");
            if (w.brace_style === "expand-strict") {
                if (!at) {
                    I()
                }
            } else {
                if (w.brace_style === "expand") {
                    if (Z !== "TK_OPERATOR") {
                        if (Z === "TK_EQUALS" || (S(v.last_text) && v.last_text !== "else")) {
                            ao = true
                        } else {
                            I()
                        }
                    }
                } else {
                    if (Z !== "TK_OPERATOR" && Z !== "TK_START_EXPR") {
                        if (Z === "TK_START_BLOCK") {
                            I()
                        } else {
                            ao = true
                        }
                    } else {
                        if (T(G.mode) && v.last_text === ",") {
                            if (C === "}") {
                                ao = true
                            } else {
                                I()
                            }
                        }
                    }
                }
            }
            P();
            s()
        }
        function Y() {
            while (v.mode === L.Statement) {
                i()
            }
            i();
            if (w.brace_style === "expand" || w.brace_style === "expand-strict") {
                if (Z !== "TK_START_BLOCK") {
                    I()
                }
            } else {
                if (Z !== "TK_START_BLOCK") {
                    if (T(v.mode) && w.keep_array_indentation) {
                        w.keep_array_indentation = false;
                        I();
                        w.keep_array_indentation = true
                    } else {
                        I()
                    }
                }
            }
            P()
        }
        function y() {
            if (H()) {} else {
                if (aa && !K(v.mode) && (Z !== "TK_OPERATOR" || (v.last_text === "--" || v.last_text === "++")) && Z !==
                    "TK_EQUALS" && (w.preserve_newlines || v.last_text !== "var")) {
                    I()
                }
            } if (v.do_block && !v.do_while) {
                if (t === "while") {
                    ao = true;
                    P();
                    ao = true;
                    v.do_while = true;
                    return
                } else {
                    I();
                    v.do_block = false
                }
            }
            if (v.if_block) {
                if (t !== "else") {
                    while (v.mode === L.Statement) {
                        i()
                    }
                    v.if_block = false
                }
            }
            if (t === "function") {
                if (v.var_line && Z !== "TK_EQUALS") {
                    v.var_line_reindented = true
                }
                if ((ar() || v.last_text === ";") && v.last_text !== "{" && Z !== "TK_BLOCK_COMMENT" && Z !==
                    "TK_COMMENT") {
                    n = ar() ? n : 0;
                    if (!w.preserve_newlines) {
                        n = 1
                    }
                    for (var at = 0; at < 2 - n; at++) {
                        I(true)
                    }
                }
                if (Z === "TK_WORD") {
                    if (v.last_text === "get" || v.last_text === "set" || v.last_text === "new" || v.last_text ===
                        "return") {
                        ao = true
                    } else {
                        I()
                    }
                } else {
                    if (Z === "TK_OPERATOR" || v.last_text === "=") {
                        ao = true
                    } else {
                        if (K(v.mode)) {} else {
                            I()
                        }
                    }
                }
                P();
                v.last_word = t;
                return
            }
            if (t === "case" || (t === "default" && v.in_case_statement)) {
                I();
                if (v.case_body || w.jslint_happy) {
                    v.indentation_level--;
                    v.case_body = false
                }
                P();
                v.in_case = true;
                v.in_case_statement = true;
                return
            }
            W = "NONE";
            if (Z === "TK_END_BLOCK") {
                if (!Q(t, ["else", "catch", "finally"])) {
                    W = "NEWLINE"
                } else {
                    if (w.brace_style === "expand" || w.brace_style === "end-expand" || w.brace_style ===
                        "expand-strict") {
                        W = "NEWLINE"
                    } else {
                        W = "SPACE";
                        ao = true
                    }
                }
            } else {
                if (Z === "TK_SEMICOLON" && v.mode === L.BlockStatement) {
                    W = "NEWLINE"
                } else {
                    if (Z === "TK_SEMICOLON" && K(v.mode)) {
                        W = "SPACE"
                    } else {
                        if (Z === "TK_STRING") {
                            W = "NEWLINE"
                        } else {
                            if (Z === "TK_WORD") {
                                W = "SPACE"
                            } else {
                                if (Z === "TK_START_BLOCK") {
                                    W = "NEWLINE"
                                } else {
                                    if (Z === "TK_END_EXPR") {
                                        ao = true;
                                        W = "NEWLINE"
                                    }
                                }
                            }
                        }
                    }
                }
            } if (Q(t, A) && v.last_text !== ")") {
                if (v.last_text === "else") {
                    W = "SPACE"
                } else {
                    W = "NEWLINE"
                }
            }
            if (Z === "TK_COMMA" || Z === "TK_START_EXPR" || Z === "TK_EQUALS" || Z === "TK_OPERATOR") {
                if (v.mode !== L.ObjectLiteral) {
                    p()
                }
            }
            if (Q(t, ["else", "catch", "finally"])) {
                if (Z !== "TK_END_BLOCK" || w.brace_style === "expand" || w.brace_style === "end-expand" || w.brace_style ===
                    "expand-strict") {
                    I()
                } else {
                    u(true);
                    if (J[J.length - 1] !== "}") {
                        I()
                    }
                    ao = true
                }
            } else {
                if (W === "NEWLINE") {
                    if (S(v.last_text)) {
                        ao = true
                    } else {
                        if (Z !== "TK_END_EXPR") {
                            if ((Z !== "TK_START_EXPR" || t !== "var") && v.last_text !== ":") {
                                if (t === "if" && v.last_word === "else" && v.last_text !== "{") {
                                    ao = true
                                } else {
                                    v.var_line = false;
                                    v.var_line_reindented = false;
                                    I()
                                }
                            }
                        } else {
                            if (Q(t, A) && v.last_text !== ")") {
                                v.var_line = false;
                                v.var_line_reindented = false;
                                I()
                            }
                        }
                    }
                } else {
                    if (T(v.mode) && v.last_text === "," && C === "}") {
                        I()
                    } else {
                        if (W === "SPACE") {
                            ao = true
                        }
                    }
                }
            }
            P();
            v.last_word = t;
            if (t === "var") {
                v.var_line = true;
                v.var_line_reindented = false;
                v.var_line_tainted = false
            }
            if (t === "do") {
                v.do_block = true
            }
            if (t === "if") {
                v.if_block = true
            }
        }
        function M() {
            while (v.mode === L.Statement && !v.if_block) {
                i()
            }
            P();
            v.var_line = false;
            v.var_line_reindented = false;
            if (v.mode === L.ObjectLiteral) {
                v.mode = L.BlockStatement
            }
        }
        function x() {
            if (H()) {
                ao = true
            } else {
                if (Z === "TK_WORD") {
                    ao = true
                } else {
                    if (Z === "TK_COMMA" || Z === "TK_START_EXPR" || Z === "TK_EQUALS" || Z === "TK_OPERATOR") {
                        if (v.mode !== L.ObjectLiteral) {
                            p()
                        }
                    } else {
                        I()
                    }
                }
            }
            P()
        }
        function R() {
            if (v.var_line) {
                v.var_line_tainted = true
            }
            ao = true;
            P();
            ao = true
        }
        function ah() {
            if (v.var_line) {
                if (K(v.mode) || Z === "TK_END_BLOCK") {
                    v.var_line_tainted = false
                }
                if (v.var_line) {
                    v.var_line_reindented = true
                }
                P();
                if (v.var_line_tainted) {
                    v.var_line_tainted = false;
                    I()
                } else {
                    ao = true
                }
                return
            }
            if (Z === "TK_END_BLOCK" && v.mode !== L.Expression) {
                P();
                if (v.mode === L.ObjectLiteral && v.last_text === "}") {
                    I()
                } else {
                    ao = true
                }
            } else {
                if (v.mode === L.ObjectLiteral) {
                    P();
                    I()
                } else {
                    P();
                    ao = true
                }
            }
        }
        function ad() {
            var au = true;
            var at = true;
            if (S(v.last_text)) {
                ao = true;
                P();
                return
            }
            if (t === "*" && Z === "TK_DOT" && !C.match(/^\d+$/)) {
                P();
                return
            }
            if (t === ":" && v.in_case) {
                v.case_body = true;
                s();
                P();
                I();
                v.in_case = false;
                return
            }
            if (t === "::") {
                P();
                return
            }
            if (aa && (t === "--" || t === "++")) {
                I()
            }
            if (Q(t, ["--", "++", "!"]) || (Q(t, ["-", "+"]) && (Q(Z, ["TK_START_BLOCK", "TK_START_EXPR", "TK_EQUALS",
                    "TK_OPERATOR"]) || Q(v.last_text, A) || v.last_text === ","))) {
                au = false;
                at = false;
                if (v.last_text === ";" && K(v.mode)) {
                    au = true
                }
                if (Z === "TK_WORD" && Q(v.last_text, A)) {
                    au = true
                }
                if ((v.mode === L.BlockStatement || v.mode === L.Statement) && (v.last_text === "{" || v.last_text ===
                    ";")) {
                    I()
                }
            } else {
                if (t === ":") {
                    if (v.ternary_depth === 0) {
                        if (v.mode === L.BlockStatement) {
                            v.mode = L.ObjectLiteral
                        }
                        au = false
                    } else {
                        v.ternary_depth -= 1
                    }
                } else {
                    if (t === "?") {
                        v.ternary_depth += 1
                    }
                }
            }
            ao = ao || au;
            P();
            ao = at
        }
        function ag() {
            var at = al(t);
            var au;
            if (ap(at.slice(1), "*")) {
                I(false, true);
                P(at[0]);
                for (au = 1; au < at.length; au++) {
                    I(false, true);
                    P(" " + c(at[au]))
                }
            } else {
                if (at.length > 1) {
                    I(false, true)
                } else {
                    if (Z === "TK_END_BLOCK") {
                        I(false, true)
                    } else {
                        ao = true
                    }
                }
                P(at[0]);
                J.push("\n");
                for (au = 1; au < at.length; au++) {
                    J.push(at[au]);
                    J.push("\n")
                }
            } if (!U("\n")) {
                I(false, true)
            }
        }
        function V() {
            ao = true;
            P();
            ao = true
        }
        function o() {
            if (aa) {
                I(false, true)
            }
            if (v.last_text === "," && !aa) {
                u(true)
            }
            ao = true;
            P();
            I(false, true)
        }
        function ai() {
            if (S(v.last_text)) {
                ao = true
            } else {
                p(v.last_text === ")" && w.break_chained_methods)
            }
            P()
        }
        function ab() {
            P();
            if (t[t.length - 1] === "\n") {
                I()
            }
        }
    }
    if (typeof define === "function") {
        define(function (d, c, e) {
            c.js_beautify = a
        })
    } else {
        if (typeof exports !== "undefined") {
            exports.js_beautify = a
        } else {
            if (typeof window !== "undefined") {
                window.js_beautify = a
            }
        }
    }
}());
(function () {
    function a(v, e) {
        e = e || {};
        var t = e.indent_size || 4;
        var c = e.indent_char || " ";
        if (typeof t === "string") {
            t = parseInt(t, 10)
        }
        var h = /^\s+$/;
        var f = /[\w$\-_]/;
        var j = -1,
            n;
 
        function r() {
            n = v.charAt(++j);
            return n
        }
        function s() {
            return v.charAt(j + 1)
        }
        function x(z) {
            var A = j;
            while (r()) {
                if (n === "\\") {
                    r();
                    r()
                } else {
                    if (n === z) {
                        break
                    } else {
                        if (n === "\n") {
                            break
                        }
                    }
                }
            }
            return v.substring(A, j + 1)
        }
        function b() {
            var z = j;
            while (h.test(s())) {
                j++
            }
            return j !== z
        }
        function y() {
            var z = j;
            do {} while (h.test(r()));
            return j !== z + 1
        }
        function q() {
            var z = j;
            r();
            while (r()) {
                if (n === "*" && s() === "/") {
                    j++;
                    break
                }
            }
            return v.substring(z, j + 1)
        }
        function k(z) {
            return v.substring(j - z.length, j).toLowerCase() === z
        }
        var p = v.match(/^[\r\n]*[\t ]*/)[0];
        var i = Array(t + 1).join(c);
        var u = 0;
 
        function m() {
            u++;
            p += i
        }
        function o() {
            u--;
            p = p.slice(0, -t)
        }
        var d = {};
        d["{"] = function (z) {
            d.singleSpace();
            l.push(z);
            d.newLine()
        };
        d["}"] = function (z) {
            d.newLine();
            l.push(z);
            d.newLine()
        };
        d.newLine = function (z) {
            if (!z) {
                while (h.test(l[l.length - 1])) {
                    l.pop()
                }
            }
            if (l.length) {
                l.push("\n")
            }
            if (p) {
                l.push(p)
            }
        };
        d.singleSpace = function () {
            if (l.length && !h.test(l[l.length - 1])) {
                l.push(" ")
            }
        };
        var l = [];
        if (p) {
            l.push(p)
        }
        while (true) {
            var g = y();
            if (!n) {
                break
            }
            if (n === "{") {
                m();
                d["{"](n)
            } else {
                if (n === "}") {
                    o();
                    d["}"](n)
                } else {
                    if (n === '"' || n === "'") {
                        l.push(x(n))
                    } else {
                        if (n === ";") {
                            l.push(n, "\n", p)
                        } else {
                            if (n === "/" && s() === "*") {
                                d.newLine();
                                l.push(q(), "\n", p)
                            } else {
                                if (n === "(") {
                                    if (k("url")) {
                                        l.push(n);
                                        b();
                                        if (r()) {
                                            if (n !== ")" && n !== '"' && n !== "'") {
                                                l.push(x(")"))
                                            } else {
                                                j--
                                            }
                                        }
                                    } else {
                                        if (g) {
                                            d.singleSpace()
                                        }
                                        l.push(n);
                                        b()
                                    }
                                } else {
                                    if (n === ")") {
                                        l.push(n)
                                    } else {
                                        if (n === ",") {
                                            b();
                                            l.push(n);
                                            d.singleSpace()
                                        } else {
                                            if (n === "]") {
                                                l.push(n)
                                            } else {
                                                if (n === "[" || n === "=") {
                                                    b();
                                                    l.push(n)
                                                } else {
                                                    if (g) {
                                                        d.singleSpace()
                                                    }
                                                    l.push(n)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        var w = l.join("").replace(/[\n ]+$/, "");
        return w
    }
    if (typeof define === "function") {
        define(function (c, b, d) {
            b.css_beautify = a
        })
    } else {
        if (typeof exports !== "undefined") {
            exports.css_beautify = a
        } else {
            if (typeof window !== "undefined") {
                window.css_beautify = a
            }
        }
    }
}());
(function () {
    function b(v, g, p, h) {
        var z, s, q, j, k, y;
        g = g || {};
        s = g.indent_size || 4;
        q = g.indent_char || " ";
        k = g.brace_style || "collapse";
        j = g.max_char === 0 ? Infinity : g.max_char || 250;
        y = g.unformatted || ["a", "span", "bdo", "em", "strong", "dfn", "code", "samp", "kbd", "var", "cite", "abbr",
                "acronym", "q", "sub", "sup", "tt", "i", "b", "big", "small", "u", "s", "strike", "font", "ins", "del",
                "pre", "address", "dt", "h1", "h2", "h3", "h4", "h5", "h6"];
 
        function f() {
            this.pos = 0;
            this.token = "";
            this.current_mode = "CONTENT";
            this.tags = {
                parent: "parent1",
                parentcount: 1,
                parent1: ""
            };
            this.tag_type = "";
            this.token_text = this.last_token = this.last_text = this.token_type = "";
            this.Utils = {
                whitespace: "\n\r\t ".split(""),
                single_token: "br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed,?php,?,?="
                    .split(","),
                extra_liners: "head,body,/html".split(","),
                in_array: function (B, t) {
                    for (var A = 0; A < t.length; A++) {
                        if (B === t[A]) {
                            return true
                        }
                    }
                    return false
                }
            };
            this.get_content = function () {
                var t = "",
                    B = [],
                    C = false;
                while (this.input.charAt(this.pos) !== "<") {
                    if (this.pos >= this.input.length) {
                        return B.length ? B.join("") : ["", "TK_EOF"]
                    }
                    t = this.input.charAt(this.pos);
                    this.pos++;
                    this.line_char_count++;
                    if (this.Utils.in_array(t, this.Utils.whitespace)) {
                        if (B.length) {
                            C = true
                        }
                        this.line_char_count--;
                        continue
                    } else {
                        if (C) {
                            if (this.line_char_count >= this.max_char) {
                                B.push("\n");
                                for (var A = 0; A < this.indent_level; A++) {
                                    B.push(this.indent_string)
                                }
                                this.line_char_count = 0
                            } else {
                                B.push(" ");
                                this.line_char_count++
                            }
                            C = false
                        }
                    }
                    B.push(t)
                }
                return B.length ? B.join("") : ""
            };
            this.get_contents_to = function (B) {
                if (this.pos === this.input.length) {
                    return ["", "TK_EOF"]
                }
                var t = "";
                var C = "";
                var D = new RegExp("</" + B + "\\s*>", "igm");
                D.lastIndex = this.pos;
                var A = D.exec(this.input);
                var E = A ? A.index : this.input.length;
                if (this.pos < E) {
                    C = this.input.substring(this.pos, E);
                    this.pos = E
                }
                return C
            };
            this.record_tag = function (t) {
                if (this.tags[t + "count"]) {
                    this.tags[t + "count"]++;
                    this.tags[t + this.tags[t + "count"]] = this.indent_level
                } else {
                    this.tags[t + "count"] = 1;
                    this.tags[t + this.tags[t + "count"]] = this.indent_level
                }
                this.tags[t + this.tags[t + "count"] + "parent"] = this.tags.parent;
                this.tags.parent = t + this.tags[t + "count"]
            };
            this.retrieve_tag = function (t) {
                if (this.tags[t + "count"]) {
                    var A = this.tags.parent;
                    while (A) {
                        if (t + this.tags[t + "count"] === A) {
                            break
                        }
                        A = this.tags[A + "parent"]
                    }
                    if (A) {
                        this.indent_level = this.tags[t + this.tags[t + "count"]];
                        this.tags.parent = this.tags[A + "parent"]
                    }
                    delete this.tags[t + this.tags[t + "count"] + "parent"];
                    delete this.tags[t + this.tags[t + "count"]];
                    if (this.tags[t + "count"] === 1) {
                        delete this.tags[t + "count"]
                    } else {
                        this.tags[t + "count"]--
                    }
                }
            };
            this.get_tag = function (J) {
                var E = "",
                    G = [],
                    F = "",
                    A = false,
                    I, D, B = this.pos,
                    t = this.line_char_count;
                J = J !== undefined ? J : false;
                do {
                    if (this.pos >= this.input.length) {
                        if (J) {
                            this.pos = B;
                            this.line_char_count = t
                        }
                        return G.length ? G.join("") : ["", "TK_EOF"]
                    }
                    E = this.input.charAt(this.pos);
                    this.pos++;
                    this.line_char_count++;
                    if (this.Utils.in_array(E, this.Utils.whitespace)) {
                        A = true;
                        this.line_char_count--;
                        continue
                    }
                    if (E === "'" || E === '"') {
                        if (!G[1] || G[1] !== "!") {
                            E += this.get_unformatted(E);
                            A = true
                        }
                    }
                    if (E === "=") {
                        A = false
                    }
                    if (G.length && G[G.length - 1] !== "=" && E !== ">" && A) {
                        if (this.line_char_count >= this.max_char) {
                            this.print_newline(false, G);
                            this.line_char_count = 0
                        } else {
                            G.push(" ");
                            this.line_char_count++
                        }
                        A = false
                    }
                    if (E === "<") {
                        I = this.pos - 1
                    }
                    G.push(E)
                } while (E !== ">");
                var K = G.join("");
                var C;
                if (K.indexOf(" ") !== -1) {
                    C = K.indexOf(" ")
                } else {
                    C = K.indexOf(">")
                }
                var H = K.substring(1, C).toLowerCase();
                if (K.charAt(K.length - 2) === "/" || this.Utils.in_array(H, this.Utils.single_token)) {
                    if (!J) {
                        this.tag_type = "SINGLE"
                    }
                } else {
                    if (H === "script") {
                        if (!J) {
                            this.record_tag(H);
                            this.tag_type = "SCRIPT"
                        }
                    } else {
                        if (H === "style") {
                            if (!J) {
                                this.record_tag(H);
                                this.tag_type = "STYLE"
                            }
                        } else {
                            if (this.is_unformatted(H, y)) {
                                F = this.get_unformatted("</" + H + ">", K);
                                G.push(F);
                                if (I > 0 && this.Utils.in_array(this.input.charAt(I - 1), this.Utils.whitespace)) {
                                    G.splice(0, 0, this.input.charAt(I - 1))
                                }
                                D = this.pos - 1;
                                if (this.Utils.in_array(this.input.charAt(D + 1), this.Utils.whitespace)) {
                                    G.push(this.input.charAt(D + 1))
                                }
                                this.tag_type = "SINGLE"
                            } else {
                                if (H.charAt(0) === "!") {
                                    if (H.indexOf("[if") !== -1) {
                                        if (K.indexOf("!IE") !== -1) {
                                            F = this.get_unformatted("-->", K);
                                            G.push(F)
                                        }
                                        if (!J) {
                                            this.tag_type = "START"
                                        }
                                    } else {
                                        if (H.indexOf("[endif") !== -1) {
                                            this.tag_type = "END";
                                            this.unindent()
                                        } else {
                                            if (H.indexOf("[cdata[") !== -1) {
                                                F = this.get_unformatted("]]>", K);
                                                G.push(F);
                                                if (!J) {
                                                    this.tag_type = "SINGLE"
                                                }
                                            } else {
                                                F = this.get_unformatted("-->", K);
                                                G.push(F);
                                                this.tag_type = "SINGLE"
                                            }
                                        }
                                    }
                                } else {
                                    if (!J) {
                                        if (H.charAt(0) === "/") {
                                            this.retrieve_tag(H.substring(1));
                                            this.tag_type = "END"
                                        } else {
                                            this.record_tag(H);
                                            this.tag_type = "START"
                                        } if (this.Utils.in_array(H, this.Utils.extra_liners)) {
                                            this.print_newline(true, this.output)
                                        }
                                    }
                                }
                            }
                        }
                    }
                } if (J) {
                    this.pos = B;
                    this.line_char_count = t
                }
                return G.join("")
            };
            this.get_unformatted = function (A, B) {
                if (B && B.toLowerCase().indexOf(A) !== -1) {
                    return ""
                }
                var t = "";
                var C = "";
                var D = true;
                do {
                    if (this.pos >= this.input.length) {
                        return C
                    }
                    t = this.input.charAt(this.pos);
                    this.pos++;
                    if (this.Utils.in_array(t, this.Utils.whitespace)) {
                        if (!D) {
                            this.line_char_count--;
                            continue
                        }
                        if (t === "\n" || t === "\r") {
                            C += "\n";
                            this.line_char_count = 0;
                            continue
                        }
                    }
                    C += t;
                    this.line_char_count++;
                    D = true
                } while (C.toLowerCase().indexOf(A) === -1);
                return C
            };
            this.get_token = function () {
                var t;
                if (this.last_token === "TK_TAG_SCRIPT" || this.last_token === "TK_TAG_STYLE") {
                    var A = this.last_token.substr(7);
                    t = this.get_contents_to(A);
                    if (typeof t !== "string") {
                        return t
                    }
                    return [t, "TK_" + A]
                }
                if (this.current_mode === "CONTENT") {
                    t = this.get_content();
                    if (typeof t !== "string") {
                        return t
                    } else {
                        return [t, "TK_CONTENT"]
                    }
                }
                if (this.current_mode === "TAG") {
                    t = this.get_tag();
                    if (typeof t !== "string") {
                        return t
                    } else {
                        var B = "TK_TAG_" + this.tag_type;
                        return [t, B]
                    }
                }
            };
            this.get_full_indent = function (t) {
                t = this.indent_level + t || 0;
                if (t < 1) {
                    return ""
                }
                return Array(t + 1).join(this.indent_string)
            };
            this.is_unformatted = function (B, A) {
                if (!this.Utils.in_array(B, A)) {
                    return false
                }
                if (B.toLowerCase() !== "a" || !this.Utils.in_array("a", A)) {
                    return true
                }
                var C = this.get_tag(true);
                var t = (C || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);
                if (!t || this.Utils.in_array(t, A)) {
                    return true
                } else {
                    return false
                }
            };
            this.printer = function (C, B, t, E, D) {
                this.input = C || "";
                this.output = [];
                this.indent_character = B;
                this.indent_string = "";
                this.indent_size = t;
                this.brace_style = D;
                this.indent_level = 0;
                this.max_char = E;
                this.line_char_count = 0;
                for (var A = 0; A < this.indent_size; A++) {
                    this.indent_string += this.indent_character
                }
                this.print_newline = function (H, F) {
                    this.line_char_count = 0;
                    if (!F || !F.length) {
                        return
                    }
                    if (!H) {
                        while (this.Utils.in_array(F[F.length - 1], this.Utils.whitespace)) {
                            F.pop()
                        }
                    }
                    F.push("\n");
                    for (var G = 0; G < this.indent_level; G++) {
                        F.push(this.indent_string)
                    }
                };
                this.print_token = function (F) {
                    this.output.push(F)
                };
                this.indent = function () {
                    this.indent_level++
                };
                this.unindent = function () {
                    if (this.indent_level > 0) {
                        this.indent_level--
                    }
                }
            };
            return this
        }
        z = new f();
        z.printer(v, q, s, j, k);
        while (true) {
            var m = z.get_token();
            z.token_text = m[0];
            z.token_type = m[1];
            if (z.token_type === "TK_EOF") {
                break
            }
            switch (z.token_type) {
            case "TK_TAG_START":
                z.print_newline(false, z.output);
                z.print_token(z.token_text);
                z.indent();
                z.current_mode = "CONTENT";
                break;
            case "TK_TAG_STYLE":
            case "TK_TAG_SCRIPT":
                z.print_newline(false, z.output);
                z.print_token(z.token_text);
                z.current_mode = "CONTENT";
                break;
            case "TK_TAG_END":
                if (z.last_token === "TK_CONTENT" && z.last_text === "") {
                    var x = z.token_text.match(/\w+/)[0];
                    var o = z.output[z.output.length - 1].match(/<\s*(\w+)/);
                    if (o === null || o[1] !== x) {
                        z.print_newline(true, z.output)
                    }
                }
                z.print_token(z.token_text);
                z.current_mode = "CONTENT";
                break;
            case "TK_TAG_SINGLE":
                var e = z.token_text.match(/^\s*<([a-z]+)/i);
                if (!e || !z.Utils.in_array(e[1], y)) {
                    z.print_newline(false, z.output)
                }
                z.print_token(z.token_text);
                z.current_mode = "CONTENT";
                break;
            case "TK_CONTENT":
                if (z.token_text !== "") {
                    z.print_token(z.token_text)
                }
                z.current_mode = "TAG";
                break;
            case "TK_STYLE":
            case "TK_SCRIPT":
                if (z.token_text !== "") {
                    z.output.push("\n");
                    var n = z.token_text,
                        u, l = 1;
                    if (z.token_type === "TK_SCRIPT") {
                        u = typeof p === "function" && p
                    } else {
                        if (z.token_type === "TK_STYLE") {
                            u = typeof h === "function" && h
                        }
                    } if (g.indent_scripts === "keep") {
                        l = 0
                    } else {
                        if (g.indent_scripts === "separate") {
                            l = -z.indent_level
                        }
                    }
                    var d = z.get_full_indent(l);
                    if (u) {
                        n = u(n.replace(/^\s*/, d), g)
                    } else {
                        var i = n.match(/^\s*/)[0];
                        var r = i.match(/[^\n\r]*$/)[0].split(z.indent_string).length - 1;
                        var w = z.get_full_indent(l - r);
                        n = n.replace(/^\s*/, d).replace(/\r\n|\r|\n/g, "\n" + w).replace(/\s*$/, "")
                    } if (n) {
                        z.print_token(n);
                        z.print_newline(true, z.output)
                    }
                }
                z.current_mode = "TAG";
                break
            }
            z.last_token = z.token_type;
            z.last_text = z.token_text
        }
        return z.output.join("")
    }
    if (typeof define === "function") {
        define(function (f, e, g) {
            var d = f("./beautify.js").js_beautify;
            var h = f("./beautify-css.js").css_beautify;
            e.html_beautify = function (j, i) {
                return b(j, i, d, h)
            }
        })
    } else {
        if (typeof exports !== "undefined") {
            var a = require("./beautify.js").js_beautify;
            var c = require("./beautify-css.js").css_beautify;
            exports.html_beautify = function (e, d) {
                return b(e, d, a, c)
            }
        } else {
            if (typeof window !== "undefined") {
                window.html_beautify = function (e, d) {
                    return b(e, d, window.js_beautify, window.css_beautify)
                }
            }
        }
    }
}());
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
eval(function (h, b, j, f, g, i) {
    g = function (a) {
        return (a < b ? "" : g(parseInt(a / b))) + ((a = a % b) > 35 ? String.fromCharCode(a + 29) : a.toString(36))
    };
    if (!"".replace(/^/, String)) {
        while (j--) {
            i[g(j)] = f[j] || g(j)
        }
        f = [function (a) {
                return i[a]
            }];
        g = function () {
            return "\\w+"
        };
        j = 1
    }
    while (j--) {
        if (f[j]) {
            h = h.replace(new RegExp("\\b" + g(j) + "\\b", "g"), f[j])
        }
    }
    return h
}(
    'K M;I(M)1S 2U("2a\'t 4k M 4K 2g 3l 4G 4H");(6(){6 r(f,e){I(!M.1R(f))1S 3m("3s 15 4R");K a=f.1w;f=M(f.1m,t(f)+(e||""));I(a)f.1w={1m:a.1m,19:a.19?a.19.1a(0):N};H f}6 t(f){H(f.1J?"g":"")+(f.4s?"i":"")+(f.4p?"m":"")+(f.4v?"x":"")+(f.3n?"y":"")}6 B(f,e,a,b){K c=u.L,d,h,g;v=R;5K{O(;c--;){g=u[c];I(a&g.3r&&(!g.2p||g.2p.W(b))){g.2q.12=e;I((h=g.2q.X(f))&&h.P===e){d={3k:g.2b.W(b,h,a),1C:h};1N}}}}5v(i){1S i}5q{v=11}H d}6 p(f,e,a){I(3b.Z.1i)H f.1i(e,a);O(a=a||0;a<f.L;a++)I(f[a]===e)H a;H-1}M=6(f,e){K a=[],b=M.1B,c=0,d,h;I(M.1R(f)){I(e!==1d)1S 3m("2a\'t 5r 5I 5F 5B 5C 15 5E 5p");H r(f)}I(v)1S 2U("2a\'t W 3l M 59 5m 5g 5x 5i");e=e||"";O(d={2N:11,19:[],2K:6(g){H e.1i(g)>-1},3d:6(g){e+=g}};c<f.L;)I(h=B(f,c,b,d)){a.U(h.3k);c+=h.1C[0].L||1}Y I(h=n.X.W(z[b],f.1a(c))){a.U(h[0]);c+=h[0].L}Y{h=f.3a(c);I(h==="[")b=M.2I;Y I(h==="]")b=M.1B;a.U(h);c++}a=15(a.1K(""),n.Q.W(e,w,""));a.1w={1m:f,19:d.2N?d.19:N};H a};M.3v="1.5.0";M.2I=1;M.1B=2;K C=/\\$(?:(\\d\\d?|[$&`\'])|{([$\\w]+)})/g,w=/[^5h]+|([\\s\\S])(?=[\\s\\S]*\\1)/g,A=/^(?:[?*+]|{\\d+(?:,\\d*)?})\\??/,v=11,u=[],n={X:15.Z.X,1A:15.Z.1A,1C:1r.Z.1C,Q:1r.Z.Q,1e:1r.Z.1e},x=n.X.W(/()??/,"")[1]===1d,D=6(){K f=/^/g;n.1A.W(f,"");H!f.12}(),y=6(){K f=/x/g;n.Q.W("x",f,"");H!f.12}(),E=15.Z.3n!==1d,z={};z[M.2I]=/^(?:\\\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S]))/;z[M.1B]=/^(?:\\\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\\d*|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S])|\\(\\?[:=!]|[?*+]\\?|{\\d+(?:,\\d*)?}\\??)/;M.1h=6(f,e,a,b){u.U({2q:r(f,"g"+(E?"y":"")),2b:e,3r:a||M.1B,2p:b||N})};M.2n=6(f,e){K a=f+"/"+(e||"");H M.2n[a]||(M.2n[a]=M(f,e))};M.3c=6(f){H r(f,"g")};M.5l=6(f){H f.Q(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g,"\\\\$&")};M.5e=6(f,e,a,b){e=r(e,"g"+(b&&E?"y":""));e.12=a=a||0;f=e.X(f);H b?f&&f.P===a?f:N:f};M.3q=6(){M.1h=6(){1S 2U("2a\'t 55 1h 54 3q")}};M.1R=6(f){H 53.Z.1q.W(f)==="[2m 15]"};M.3p=6(f,e,a,b){O(K c=r(e,"g"),d=-1,h;h=c.X(f);){a.W(b,h,++d,f,c);c.12===h.P&&c.12++}I(e.1J)e.12=0};M.57=6(f,e){H 6 a(b,c){K d=e[c].1I?e[c]:{1I:e[c]},h=r(d.1I,"g"),g=[],i;O(i=0;i<b.L;i++)M.3p(b[i],h,6(k){g.U(d.3j?k[d.3j]||"":k[0])});H c===e.L-1||!g.L?g:a(g,c+1)}([f],0)};15.Z.1p=6(f,e){H J.X(e[0])};15.Z.W=6(f,e){H J.X(e)};15.Z.X=6(f){K e=n.X.1p(J,14),a;I(e){I(!x&&e.L>1&&p(e,"")>-1){a=15(J.1m,n.Q.W(t(J),"g",""));n.Q.W(f.1a(e.P),a,6(){O(K c=1;c<14.L-2;c++)I(14[c]===1d)e[c]=1d})}I(J.1w&&J.1w.19)O(K b=1;b<e.L;b++)I(a=J.1w.19[b-1])e[a]=e[b];!D&&J.1J&&!e[0].L&&J.12>e.P&&J.12--}H e};I(!D)15.Z.1A=6(f){(f=n.X.W(J,f))&&J.1J&&!f[0].L&&J.12>f.P&&J.12--;H!!f};1r.Z.1C=6(f){M.1R(f)||(f=15(f));I(f.1J){K e=n.1C.1p(J,14);f.12=0;H e}H f.X(J)};1r.Z.Q=6(f,e){K a=M.1R(f),b,c;I(a&&1j e.58()==="3f"&&e.1i("${")===-1&&y)H n.Q.1p(J,14);I(a){I(f.1w)b=f.1w.19}Y f+="";I(1j e==="6")c=n.Q.W(J,f,6(){I(b){14[0]=1f 1r(14[0]);O(K d=0;d<b.L;d++)I(b[d])14[0][b[d]]=14[d+1]}I(a&&f.1J)f.12=14[14.L-2]+14[0].L;H e.1p(N,14)});Y{c=J+"";c=n.Q.W(c,f,6(){K d=14;H n.Q.W(e,C,6(h,g,i){I(g)5b(g){24"$":H"$";24"&":H d[0];24"`":H d[d.L-1].1a(0,d[d.L-2]);24"\'":H d[d.L-1].1a(d[d.L-2]+d[0].L);5a:i="";g=+g;I(!g)H h;O(;g>d.L-3;){i=1r.Z.1a.W(g,-1)+i;g=1Q.3i(g/10)}H(g?d[g]||"":"$")+i}Y{g=+i;I(g<=d.L-3)H d[g];g=b?p(b,i):-1;H g>-1?d[g+1]:h}})})}I(a&&f.1J)f.12=0;H c};1r.Z.1e=6(f,e){I(!M.1R(f))H n.1e.1p(J,14);K a=J+"",b=[],c=0,d,h;I(e===1d||+e<0)e=5D;Y{e=1Q.3i(+e);I(!e)H[]}O(f=M.3c(f);d=f.X(a);){I(f.12>c){b.U(a.1a(c,d.P));d.L>1&&d.P<a.L&&3b.Z.U.1p(b,d.1a(1));h=d[0].L;c=f.12;I(b.L>=e)1N}f.12===d.P&&f.12++}I(c===a.L){I(!n.1A.W(f,"")||h)b.U("")}Y b.U(a.1a(c));H b.L>e?b.1a(0,e):b};M.1h(/\\(\\?#[^)]*\\)/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?"":"(?:)"});M.1h(/\\((?!\\?)/,6(){J.19.U(N);H"("});M.1h(/\\(\\?<([$\\w]+)>/,6(f){J.19.U(f[1]);J.2N=R;H"("});M.1h(/\\\\k<([\\w$]+)>/,6(f){K e=p(J.19,f[1]);H e>-1?"\\\\"+(e+1)+(3R(f.2S.3a(f.P+f[0].L))?"":"(?:)"):f[0]});M.1h(/\\[\\^?]/,6(f){H f[0]==="[]"?"\\\\b\\\\B":"[\\\\s\\\\S]"});M.1h(/^\\(\\?([5A]+)\\)/,6(f){J.3d(f[1]);H""});M.1h(/(?:\\s+|#.*)+/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?"":"(?:)"},M.1B,6(){H J.2K("x")});M.1h(/\\./,6(){H"[\\\\s\\\\S]"},M.1B,6(){H J.2K("s")})})();1j 2e!="1d"&&(2e.M=M);K 1v=6(){6 r(a,b){a.1l.1i(b)!=-1||(a.1l+=" "+b)}6 t(a){H a.1i("3e")==0?a:"3e"+a}6 B(a){H e.1Y.2A[t(a)]}6 p(a,b,c){I(a==N)H N;K d=c!=R?a.3G:[a.2G],h={"#":"1c",".":"1l"}[b.1o(0,1)]||"3h",g,i;g=h!="3h"?b.1o(1):b.5u();I((a[h]||"").1i(g)!=-1)H a;O(a=0;d&&a<d.L&&i==N;a++)i=p(d[a],b,c);H i}6 C(a,b){K c={},d;O(d 2g a)c[d]=a[d];O(d 2g b)c[d]=b[d];H c}6 w(a,b,c,d){6 h(g){g=g||1P.5y;I(!g.1F){g.1F=g.52;g.3N=6(){J.5w=11}}c.W(d||1P,g)}a.3g?a.3g("4U"+b,h):a.4y(b,h,11)}6 A(a,b){K c=e.1Y.2j,d=N;I(c==N){c={};O(K h 2g e.1U){K g=e.1U[h];d=g.4x;I(d!=N){g.1V=h.4w();O(g=0;g<d.L;g++)c[d[g]]=h}}e.1Y.2j=c}d=e.1U[c[a]];d==N&&b!=11&&1P.1X(e.13.1x.1X+(e.13.1x.3E+a));H d}6 v(a,b){O(K c=a.1e("\\n"),d=0;d<c.L;d++)c[d]=b(c[d],d);H c.1K("\\n")}6 u(a,b){I(a==N||a.L==0||a=="\\n")H a;a=a.Q(/</g,"&1y;");a=a.Q(/ {2,}/g,6(c){O(K d="",h=0;h<c.L-1;h++)d+=e.13.1W;H d+" "});I(b!=N)a=v(a,6(c){I(c.L==0)H"";K d="";c=c.Q(/^(&2s;| )+/,6(h){d=h;H""});I(c.L==0)H d;H d+\'<17 1g="\'+b+\'">\'+c+"</17>"});H a}6 n(a,b){a.1e("\\n");O(K c="",d=0;d<50;d++)c+="                    ";H a=v(a,6(h){I(h.1i("\\t")==-1)H h;O(K g=0;(g=h.1i("\\t"))!=-1;)h=h.1o(0,g)+c.1o(0,b-g%b)+h.1o(g+1,h.L);H h})}6 x(a){H a.Q(/^\\s+|\\s+$/g,"")}6 D(a,b){I(a.P<b.P)H-1;Y I(a.P>b.P)H 1;Y I(a.L<b.L)H-1;Y I(a.L>b.L)H 1;H 0}6 y(a,b){6 c(k){H k[0]}O(K d=N,h=[],g=b.2D?b.2D:c;(d=b.1I.X(a))!=N;){K i=g(d,b);I(1j i=="3f")i=[1f e.2L(i,d.P,b.23)];h=h.1O(i)}H h}6 E(a){K b=/(.*)((&1G;|&1y;).*)/;H a.Q(e.3A.3M,6(c){K d="",h=N;I(h=b.X(c)){c=h[1];d=h[2]}H\'<a 2h="\'+c+\'">\'+c+"</a>"+d})}6 z(){O(K a=1E.36("1k"),b=[],c=0;c<a.L;c++)a[c].3s=="20"&&b.U(a[c]);H b}6 f(a){a=a.1F;K b=p(a,".20",R);a=p(a,".3O",R);K c=1E.4i("3t");I(!(!a||!b||p(a,"3t"))){B(b.1c);r(b,"1m");O(K d=a.3G,h=[],g=0;g<d.L;g++)h.U(d[g].4z||d[g].4A);h=h.1K("\\r");c.39(1E.4D(h));a.39(c);c.2C();c.4C();w(c,"4u",6(){c.2G.4E(c);b.1l=b.1l.Q("1m","")})}}I(1j 3F!="1d"&&1j M=="1d")M=3F("M").M;K e={2v:{"1g-27":"","2i-1s":1,"2z-1s-2t":11,1M:N,1t:N,"42-45":R,"43-22":4,1u:R,16:R,"3V-17":R,2l:11,"41-40":R,2k:11,"1z-1k":11},13:{1W:"&2s;",2M:R,46:11,44:11,34:"4n",1x:{21:"4o 1m",2P:"?",1X:"1v\\n\\n",3E:"4r\'t 4t 1D O: ",4g:"4m 4B\'t 51 O 1z-1k 4F: ",37:\'<!4T 1z 4S "-//4V//3H 4W 1.0 4Z//4Y" "1Z://2y.3L.3K/4X/3I/3H/3I-4P.4J"><1z 4I="1Z://2y.3L.3K/4L/5L"><3J><4N 1Z-4M="5G-5M" 6K="2O/1z; 6J=6I-8" /><1t>6L 1v</1t></3J><3B 1L="25-6M:6Q,6P,6O,6N-6F;6y-2f:#6x;2f:#6w;25-22:6v;2O-3D:3C;"><T 1L="2O-3D:3C;3w-32:1.6z;"><T 1L="25-22:6A-6E;">1v</T><T 1L="25-22:.6C;3w-6B:6R;"><T>3v 3.0.76 (72 73 3x)</T><T><a 2h="1Z://3u.2w/1v" 1F="38" 1L="2f:#3y">1Z://3u.2w/1v</a></T><T>70 17 6U 71.</T><T>6T 6X-3x 6Y 6D.</T></T><T>6t 61 60 J 1k, 5Z <a 2h="6u://2y.62.2w/63-66/65?64=5X-5W&5P=5O" 1L="2f:#3y">5R</a> 5V <2R/>5U 5T 5S!</T></T></3B></1z>\'}},1Y:{2j:N,2A:{}},1U:{},3A:{6n:/\\/\\*[\\s\\S]*?\\*\\//2c,6m:/\\/\\/.*$/2c,6l:/#.*$/2c,6k:/"([^\\\\"\\n]|\\\\.)*"/g,6o:/\'([^\\\\\'\\n]|\\\\.)*\'/g,6p:1f M(\'"([^\\\\\\\\"]|\\\\\\\\.)*"\',"3z"),6s:1f M("\'([^\\\\\\\\\']|\\\\\\\\.)*\'","3z"),6q:/(&1y;|<)!--[\\s\\S]*?--(&1G;|>)/2c,3M:/\\w+:\\/\\/[\\w-.\\/?%&=:@;]*/g,6a:{18:/(&1y;|<)\\?=?/g,1b:/\\?(&1G;|>)/g},69:{18:/(&1y;|<)%=?/g,1b:/%(&1G;|>)/g},6d:{18:/(&1y;|<)\\s*1k.*?(&1G;|>)/2T,1b:/(&1y;|<)\\/\\s*1k\\s*(&1G;|>)/2T}},16:{1H:6(a){6 b(i,k){H e.16.2o(i,k,e.13.1x[k])}O(K c=\'<T 1g="16">\',d=e.16.2x,h=d.2X,g=0;g<h.L;g++)c+=(d[h[g]].1H||b)(a,h[g]);c+="</T>";H c},2o:6(a,b,c){H\'<2W><a 2h="#" 1g="6e 6h\'+b+" "+b+\'">\'+c+"</a></2W>"},2b:6(a){K b=a.1F,c=b.1l||"";b=B(p(b,".20",R).1c);K d=6(h){H(h=15(h+"6f(\\\\w+)").X(c))?h[1]:N}("6g");b&&d&&e.16.2x[d].2B(b);a.3N()},2x:{2X:["21","2P"],21:{1H:6(a){I(a.V("2l")!=R)H"";K b=a.V("1t");H e.16.2o(a,"21",b?b:e.13.1x.21)},2B:6(a){a=1E.6j(t(a.1c));a.1l=a.1l.Q("47","")}},2P:{2B:6(){K a="68=0";a+=", 18="+(31.30-33)/2+", 32="+(31.2Z-2Y)/2+", 30=33, 2Z=2Y";a=a.Q(/^,/,"");a=1P.6Z("","38",a);a.2C();K b=a.1E;b.6W(e.13.1x.37);b.6V();a.2C()}}}},35:6(a,b){K c;I(b)c=[b];Y{c=1E.36(e.13.34);O(K d=[],h=0;h<c.L;h++)d.U(c[h]);c=d}c=c;d=[];I(e.13.2M)c=c.1O(z());I(c.L===0)H d;O(h=0;h<c.L;h++){O(K g=c[h],i=a,k=c[h].1l,j=3W 0,l={},m=1f M("^\\\\[(?<2V>(.*?))\\\\]$"),s=1f M("(?<27>[\\\\w-]+)\\\\s*:\\\\s*(?<1T>[\\\\w-%#]+|\\\\[.*?\\\\]|\\".*?\\"|\'.*?\')\\\\s*;?","g");(j=s.X(k))!=N;){K o=j.1T.Q(/^[\'"]|[\'"]$/g,"");I(o!=N&&m.1A(o)){o=m.X(o);o=o.2V.L>0?o.2V.1e(/\\s*,\\s*/):[]}l[j.27]=o}g={1F:g,1n:C(i,l)};g.1n.1D!=N&&d.U(g)}H d},1M:6(a,b){K c=J.35(a,b),d=N,h=e.13;I(c.L!==0)O(K g=0;g<c.L;g++){b=c[g];K i=b.1F,k=b.1n,j=k.1D,l;I(j!=N){I(k["1z-1k"]=="R"||e.2v["1z-1k"]==R){d=1f e.4l(j);j="4O"}Y I(d=A(j))d=1f d;Y 6H;l=i.3X;I(h.2M){l=l;K m=x(l),s=11;I(m.1i("<![6G[")==0){m=m.4h(9);s=R}K o=m.L;I(m.1i("]]\\>")==o-3){m=m.4h(0,o-3);s=R}l=s?m:l}I((i.1t||"")!="")k.1t=i.1t;k.1D=j;d.2Q(k);b=d.2F(l);I((i.1c||"")!="")b.1c=i.1c;i.2G.74(b,i)}}},2E:6(a){w(1P,"4k",6(){e.1M(a)})}};e.2E=e.2E;e.1M=e.1M;e.2L=6(a,b,c){J.1T=a;J.P=b;J.L=a.L;J.23=c;J.1V=N};e.2L.Z.1q=6(){H J.1T};e.4l=6(a){6 b(j,l){O(K m=0;m<j.L;m++)j[m].P+=l}K c=A(a),d,h=1f e.1U.5Y,g=J,i="2F 1H 2Q".1e(" ");I(c!=N){d=1f c;O(K k=0;k<i.L;k++)(6(){K j=i[k];g[j]=6(){H h[j].1p(h,14)}})();d.28==N?1P.1X(e.13.1x.1X+(e.13.1x.4g+a)):h.2J.U({1I:d.28.17,2D:6(j){O(K l=j.17,m=[],s=d.2J,o=j.P+j.18.L,F=d.28,q,G=0;G<s.L;G++){q=y(l,s[G]);b(q,o);m=m.1O(q)}I(F.18!=N&&j.18!=N){q=y(j.18,F.18);b(q,j.P);m=m.1O(q)}I(F.1b!=N&&j.1b!=N){q=y(j.1b,F.1b);b(q,j.P+j[0].5Q(j.1b));m=m.1O(q)}O(j=0;j<m.L;j++)m[j].1V=c.1V;H m}})}};e.4j=6(){};e.4j.Z={V:6(a,b){K c=J.1n[a];c=c==N?b:c;K d={"R":R,"11":11}[c];H d==N?c:d},3Y:6(a){H 1E.4i(a)},4c:6(a,b){K c=[];I(a!=N)O(K d=0;d<a.L;d++)I(1j a[d]=="2m")c=c.1O(y(b,a[d]));H J.4e(c.6b(D))},4e:6(a){O(K b=0;b<a.L;b++)I(a[b]!==N)O(K c=a[b],d=c.P+c.L,h=b+1;h<a.L&&a[b]!==N;h++){K g=a[h];I(g!==N)I(g.P>d)1N;Y I(g.P==c.P&&g.L>c.L)a[b]=N;Y I(g.P>=c.P&&g.P<d)a[h]=N}H a},4d:6(a){K b=[],c=2u(J.V("2i-1s"));v(a,6(d,h){b.U(h+c)});H b},3U:6(a){K b=J.V("1M",[]);I(1j b!="2m"&&b.U==N)b=[b];a:{a=a.1q();K c=3W 0;O(c=c=1Q.6c(c||0,0);c<b.L;c++)I(b[c]==a){b=c;1N a}b=-1}H b!=-1},2r:6(a,b,c){a=["1s","6i"+b,"P"+a,"6r"+(b%2==0?1:2).1q()];J.3U(b)&&a.U("67");b==0&&a.U("1N");H\'<T 1g="\'+a.1K(" ")+\'">\'+c+"</T>"},3Q:6(a,b){K c="",d=a.1e("\\n").L,h=2u(J.V("2i-1s")),g=J.V("2z-1s-2t");I(g==R)g=(h+d-1).1q().L;Y I(3R(g)==R)g=0;O(K i=0;i<d;i++){K k=b?b[i]:h+i,j;I(k==0)j=e.13.1W;Y{j=g;O(K l=k.1q();l.L<j;)l="0"+l;j=l}a=j;c+=J.2r(i,k,a)}H c},49:6(a,b){a=x(a);K c=a.1e("\\n");J.V("2z-1s-2t");K d=2u(J.V("2i-1s"));a="";O(K h=J.V("1D"),g=0;g<c.L;g++){K i=c[g],k=/^(&2s;|\\s)+/.X(i),j=N,l=b?b[g]:d+g;I(k!=N){j=k[0].1q();i=i.1o(j.L);j=j.Q(" ",e.13.1W)}i=x(i);I(i.L==0)i=e.13.1W;a+=J.2r(g,l,(j!=N?\'<17 1g="\'+h+\' 5N">\'+j+"</17>":"")+i)}H a},4f:6(a){H a?"<4a>"+a+"</4a>":""},4b:6(a,b){6 c(l){H(l=l?l.1V||g:g)?l+" ":""}O(K d=0,h="",g=J.V("1D",""),i=0;i<b.L;i++){K k=b[i],j;I(!(k===N||k.L===0)){j=c(k);h+=u(a.1o(d,k.P-d),j+"48")+u(k.1T,j+k.23);d=k.P+k.L+(k.75||0)}}h+=u(a.1o(d),c()+"48");H h},1H:6(a){K b="",c=["20"],d;I(J.V("2k")==R)J.1n.16=J.1n.1u=11;1l="20";J.V("2l")==R&&c.U("47");I((1u=J.V("1u"))==11)c.U("6S");c.U(J.V("1g-27"));c.U(J.V("1D"));a=a.Q(/^[ ]*[\\n]+|[\\n]*[ ]*$/g,"").Q(/\\r/g," ");b=J.V("43-22");I(J.V("42-45")==R)a=n(a,b);Y{O(K h="",g=0;g<b;g++)h+=" ";a=a.Q(/\\t/g,h)}a=a;a:{b=a=a;h=/<2R\\s*\\/?>|&1y;2R\\s*\\/?&1G;/2T;I(e.13.46==R)b=b.Q(h,"\\n");I(e.13.44==R)b=b.Q(h,"");b=b.1e("\\n");h=/^\\s*/;g=4Q;O(K i=0;i<b.L&&g>0;i++){K k=b[i];I(x(k).L!=0){k=h.X(k);I(k==N){a=a;1N a}g=1Q.4q(k[0].L,g)}}I(g>0)O(i=0;i<b.L;i++)b[i]=b[i].1o(g);a=b.1K("\\n")}I(1u)d=J.4d(a);b=J.4c(J.2J,a);b=J.4b(a,b);b=J.49(b,d);I(J.V("41-40"))b=E(b);1j 2H!="1d"&&2H.3S&&2H.3S.1C(/5s/)&&c.U("5t");H b=\'<T 1c="\'+t(J.1c)+\'" 1g="\'+c.1K(" ")+\'">\'+(J.V("16")?e.16.1H(J):"")+\'<3Z 5z="0" 5H="0" 5J="0">\'+J.4f(J.V("1t"))+"<3T><3P>"+(1u?\'<2d 1g="1u">\'+J.3Q(a)+"</2d>":"")+\'<2d 1g="17"><T 1g="3O">\'+b+"</T></2d></3P></3T></3Z></T>"},2F:6(a){I(a===N)a="";J.17=a;K b=J.3Y("T");b.3X=J.1H(a);J.V("16")&&w(p(b,".16"),"5c",e.16.2b);J.V("3V-17")&&w(p(b,".17"),"56",f);H b},2Q:6(a){J.1c=""+1Q.5d(1Q.5n()*5k).1q();e.1Y.2A[t(J.1c)]=J;J.1n=C(e.2v,a||{});I(J.V("2k")==R)J.1n.16=J.1n.1u=11},5j:6(a){a=a.Q(/^\\s+|\\s+$/g,"").Q(/\\s+/g,"|");H"\\\\b(?:"+a+")\\\\b"},5f:6(a){J.28={18:{1I:a.18,23:"1k"},1b:{1I:a.1b,23:"1k"},17:1f M("(?<18>"+a.18.1m+")(?<17>.*?)(?<1b>"+a.1b.1m+")","5o")}}};H e}();1j 2e!="1d"&&(2e.1v=1v);',
    62, 441,
    "||||||function|||||||||||||||||||||||||||||||||||||return|if|this|var|length|XRegExp|null|for|index|replace|true||div|push|getParam|call|exec|else|prototype||false|lastIndex|config|arguments|RegExp|toolbar|code|left|captureNames|slice|right|id|undefined|split|new|class|addToken|indexOf|typeof|script|className|source|params|substr|apply|toString|String|line|title|gutter|SyntaxHighlighter|_xregexp|strings|lt|html|test|OUTSIDE_CLASS|match|brush|document|target|gt|getHtml|regex|global|join|style|highlight|break|concat|window|Math|isRegExp|throw|value|brushes|brushName|space|alert|vars|http|syntaxhighlighter|expandSource|size|css|case|font|Fa|name|htmlScript|dA|can|handler|gm|td|exports|color|in|href|first|discoveredBrushes|light|collapse|object|cache|getButtonHtml|trigger|pattern|getLineHtml|nbsp|numbers|parseInt|defaults|com|items|www|pad|highlighters|execute|focus|func|all|getDiv|parentNode|navigator|INSIDE_CLASS|regexList|hasFlag|Match|useScriptTags|hasNamedCapture|text|help|init|br|input|gi|Error|values|span|list|250|height|width|screen|top|500|tagName|findElements|getElementsByTagName|aboutDialog|_blank|appendChild|charAt|Array|copyAsGlobal|setFlag|highlighter_|string|attachEvent|nodeName|floor|backref|output|the|TypeError|sticky|Za|iterate|freezeTokens|scope|type|textarea|alexgorbatchev|version|margin|2010|005896|gs|regexLib|body|center|align|noBrush|require|childNodes|DTD|xhtml1|head|org|w3|url|preventDefault|container|tr|getLineNumbersHtml|isNaN|userAgent|tbody|isLineHighlighted|quick|void|innerHTML|create|table|links|auto|smart|tab|stripBrs|tabs|bloggerMode|collapsed|plain|getCodeLinesHtml|caption|getMatchesHtml|findMatches|figureOutLineNumbers|removeNestedMatches|getTitleHtml|brushNotHtmlScript|substring|createElement|Highlighter|load|HtmlScript|Brush|pre|expand|multiline|min|Can|ignoreCase|find|blur|extended|toLowerCase|aliases|addEventListener|innerText|textContent|wasn|select|createTextNode|removeChild|option|same|frame|xmlns|dtd|twice|1999|equiv|meta|htmlscript|transitional|1E3|expected|PUBLIC|DOCTYPE|on|W3C|XHTML|TR|EN|Transitional||configured|srcElement|Object|after|run|dblclick|matchChain|valueOf|constructor|default|switch|click|round|execAt|forHtmlScript|token|gimy|functions|getKeywords|1E6|escape|within|random|sgi|another|finally|supply|MSIE|ie|toUpperCase|catch|returnValue|definition|event|border|imsx|constructing|one|Infinity|from|when|Content|cellpadding|flags|cellspacing|try|xhtml|Type|spaces|2930402|hosted_button_id|lastIndexOf|donate|active|development|keep|to|xclick|_s|Xml|please|like|you|paypal|cgi|cmd|webscr|bin|highlighted|scrollbars|aspScriptTags|phpScriptTags|sort|max|scriptScriptTags|toolbar_item|_|command|command_|number|getElementById|doubleQuotedString|singleLinePerlComments|singleLineCComments|multiLineCComments|singleQuotedString|multiLineDoubleQuotedString|xmlComments|alt|multiLineSingleQuotedString|If|https|1em|000|fff|background|5em|xx|bottom|75em|Gorbatchev|large|serif|CDATA|continue|utf|charset|content|About|family|sans|Helvetica|Arial|Geneva|3em|nogutter|Copyright|syntax|close|write|2004|Alex|open|JavaScript|highlighter|July|02|replaceChild|offset|83"
    .split("|"), 0, {}));
(function () {
    typeof (require) != "undefined" ? SyntaxHighlighter = require("shCore").SyntaxHighlighter : null;
 
    function a() {
        function b(g) {
            return "\\b([a-z_]|)" + g.replace(/ /g, "(?=:)\\b|\\b([a-z_\\*]|\\*|)") + "(?=:)\\b"
        }
        function d(g) {
            return "\\b" + g.replace(/ /g, "(?!-)(?!:)\\b|\\b()") + ":\\b"
        }
        var e =
            "ascent azimuth background-attachment background-color background-image background-position background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index";
        var c =
            "above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow";
        var f =
            "[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif";
        this.regexList = [{
                regex: SyntaxHighlighter.regexLib.multiLineCComments,
                css: "comments"
            }, {
                regex: SyntaxHighlighter.regexLib.doubleQuotedString,
                css: "string"
            }, {
                regex: SyntaxHighlighter.regexLib.singleQuotedString,
                css: "string"
            }, {
                regex: /\#[a-fA-F0-9]{3,6}/g,
                css: "value"
            }, {
                regex: /(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,
                css: "value"
            }, {
                regex: /!important/g,
                css: "color3"
            }, {
                regex: new RegExp(b(e), "gm"),
                css: "keyword"
            }, {
                regex: new RegExp(d(c), "g"),
                css: "value"
            }, {
                regex: new RegExp(this.getKeywords(f), "g"),
                css: "color1"
            }];
        this.forHtmlScript({
            left: /(<|<)\s*style.*?(>|>)/gi,
            right: /(<|<)\/\s*style\s*(>|>)/gi
        })
    }
    a.prototype = new SyntaxHighlighter.Highlighter();
    a.aliases = ["css"];
    SyntaxHighlighter.brushes.CSS = a;
    typeof (exports) != "undefined" ? exports.Brush = a : null
})();
(function () {
    typeof (require) != "undefined" ? SyntaxHighlighter = require("shCore").SyntaxHighlighter : null;
 
    function a() {
        var b =
            "break case catch continue default delete do else false  for function if in instanceof new null return super switch this throw true try typeof var while with";
        var c = SyntaxHighlighter.regexLib;
        this.regexList = [{
                regex: c.multiLineDoubleQuotedString,
                css: "string"
            }, {
                regex: c.multiLineSingleQuotedString,
                css: "string"
            }, {
                regex: c.singleLineCComments,
                css: "comments"
            }, {
                regex: c.multiLineCComments,
                css: "comments"
            }, {
                regex: /\s*#.*/gm,
                css: "preprocessor"
            }, {
                regex: new RegExp(this.getKeywords(b), "gm"),
                css: "keyword"
            }];
        this.forHtmlScript(c.scriptScriptTags)
    }
    a.prototype = new SyntaxHighlighter.Highlighter();
    a.aliases = ["js", "jscript", "javascript"];
    SyntaxHighlighter.brushes.JScript = a;
    typeof (exports) != "undefined" ? exports.Brush = a : null
})();
(function () {
    typeof (require) != "undefined" ? SyntaxHighlighter = require("shCore").SyntaxHighlighter : null;
 
    function a() {
        function b(f, j) {
            var g = SyntaxHighlighter.Match,
                i = f[0],
                d = new XRegExp("(<|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)", "xg").exec(i),
                c = [];
            if (f.attributes != null) {
                var e, h = new XRegExp("(?<name> [\\w:\\-\\.]+)\\s*=\\s*(?<value> \".*?\"|'.*?'|\\w+)", "xg");
                while ((e = h.exec(i)) != null) {
                    c.push(new g(e.name, f.index + e.index, "color1"));
                    c.push(new g(e.value, f.index + e.index + e[0].indexOf(e.value), "string"))
                }
            }
            if (d != null) {
                c.push(new g(d.name, f.index + d[0].indexOf(d.name), "keyword"))
            }
            return c
        }
        this.regexList = [{
                regex: new XRegExp("(\\<|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\>|>)", "gm"),
                css: "color2"
            }, {
                regex: SyntaxHighlighter.regexLib.xmlComments,
                css: "comments"
            }, {
                regex: new XRegExp("(<|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(>|>)", "sg"),
                func: b
            }]
    }
    a.prototype = new SyntaxHighlighter.Highlighter();
    a.aliases = ["xml", "xhtml", "xslt", "html"];
    SyntaxHighlighter.brushes.Xml = a;
    typeof (exports) != "undefined" ? exports.Brush = a : null
})();
var CodeBeautify = (function () {
    var b = {
        brace_style: "collapse",
        break_chained_methods: false,
        indent_char: " ",
        indent_scripts: "keep",
        indent_size: "4",
        keep_array_indentation: true,
        preserve_newlines: true,
        space_after_anon_function: true,
        space_before_conditional: true,
        unescape_strings: false,
        wrap_line_length: "120"
    };
    var a = "Javascript";
    var c = function () {
        $('input[name="codeType"]').click(function (f) {
            a = this.value;
            $("#codeTitle").html(this.value)
        });
        $("#btnFormat").click(function (i) {
            if (a == "Javascript") {
                var h = js_beautify($("#codeSource").val(), b);
                h = h.replace(/>/g, ">").replace(/</g, "<");
                h = '<pre class="brush: js;toolbar:false;">' + h + "</pre>";
                $("#jfContent").html(h)
            } else {
                if (a == "CSS") {
                    var g = css_beautify($("#codeSource").val());
                    g = '<pre class="brush: css;toolbar:true;">' + g + "</pre>";
                    $("#jfContent").html(g)
                } else {
                    if (a == "HTML") {
                        var f = html_beautify($("#codeSource").val());
                        f = '<pre class="brush: html;toolbar:false;">' + f + "</pre>";
                        $("#jfContent").html(f)
                    }
                }
            }
            SyntaxHighlighter.defaults.toolbar = false;
            SyntaxHighlighter.highlight()
        })
    };
    var d = function () {
        $(function () {
            jQuery("#codeSource").focus();
            c()
        })
    };
    return {
        init: d
    }
})();
CodeBeautify.init();