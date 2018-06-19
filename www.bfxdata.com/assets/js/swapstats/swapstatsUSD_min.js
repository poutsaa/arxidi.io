if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

+function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var i = t(this), n = i.data("bs.alert");
            n || i.data("bs.alert", n = new o(this)), "string" == typeof e && n[e].call(i);
        });
    }
    var i = '[data-dismiss="alert"]', o = function(e) {
        t(e).on("click", i, this.close);
    };
    o.VERSION = "3.3.4", o.TRANSITION_DURATION = 150, o.prototype.close = function(e) {
        function i() {
            a.detach().trigger("closed.bs.alert").remove();
        }
        var n = t(this), s = n.attr("data-target");
        s || (s = n.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t(s);
        e && e.preventDefault(), a.length || (a = n.closest(".alert")), a.trigger(e = t.Event("close.bs.alert")), 
        e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", i).emulateTransitionEnd(o.TRANSITION_DURATION) : i());
    };
    var n = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = o, t.fn.alert.noConflict = function() {
        return t.fn.alert = n, this;
    }, t(document).on("click.bs.alert.data-api", i, o.prototype.close);
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.button"), s = "object" == typeof e && e;
            n || o.data("bs.button", n = new i(this, s)), "toggle" == e ? n.toggle() : e && n.setState(e);
        });
    }
    var i = function(e, o) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, o), this.isLoading = !1;
    };
    i.VERSION = "3.3.4", i.DEFAULTS = {
        loadingText: "loading..."
    }, i.prototype.setState = function(e) {
        var i = "disabled", o = this.$element, n = o.is("input") ? "val" : "html", s = o.data();
        e += "Text", null == s.resetText && o.data("resetText", o[n]()), setTimeout(t.proxy(function() {
            o[n](null == s[e] ? this.options[e] : s[e]), "loadingText" == e ? (this.isLoading = !0, 
            o.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, o.removeClass(i).removeAttr(i));
        }, this), 0);
    }, i.prototype.toggle = function() {
        var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), 
            t && i.prop("checked", !this.$element.hasClass("active")).trigger("change");
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active");
    };
    var o = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function() {
        return t.fn.button = o, this;
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
        var o = t(i.target);
        o.hasClass("btn") || (o = o.closest(".btn")), e.call(o, "toggle"), i.preventDefault();
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
    });
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.carousel"), s = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e), a = "string" == typeof e ? e : s.slide;
            n || o.data("bs.carousel", n = new i(this, s)), "number" == typeof e ? n.to(e) : a ? n[a]() : s.interval && n.pause().cycle();
        });
    }
    var i = function(e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), 
        this.options = i, this.paused = null, this.sliding = null, this.interval = null, 
        this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), 
        "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this));
    };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
              case 37:
                this.prev();
                break;

              case 39:
                this.next();
                break;

              default:
                return;
            }
            t.preventDefault();
        }
    }, i.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), 
        this;
    }, i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active);
    }, i.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e), o = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (o && !this.options.wrap) return e;
        var n = "prev" == t ? -1 : 1, s = (i + n) % this.$items.length;
        return this.$items.eq(s);
    }, i.prototype.to = function(t) {
        var e = this, i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t);
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t));
    }, i.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), 
        this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, i.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next");
    }, i.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev");
    }, i.prototype.slide = function(e, o) {
        var n = this.$element.find(".item.active"), s = o || this.getItemForDirection(e, n), a = this.interval, r = "next" == e ? "left" : "right", l = this;
        if (s.hasClass("active")) return this.sliding = !1;
        var h = s[0], d = t.Event("slide.bs.carousel", {
            relatedTarget: h,
            direction: r
        });
        if (this.$element.trigger(d), !d.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var p = t(this.$indicators.children()[this.getItemIndex(s)]);
                p && p.addClass("active");
            }
            var c = t.Event("slid.bs.carousel", {
                relatedTarget: h,
                direction: r
            });
            return t.support.transition && this.$element.hasClass("slide") ? (s.addClass(e), 
            s[0].offsetWidth, n.addClass(r), s.addClass(r), n.one("bsTransitionEnd", function() {
                s.removeClass([ e, r ].join(" ")).addClass("active"), n.removeClass([ "active", r ].join(" ")), 
                l.sliding = !1, setTimeout(function() {
                    l.$element.trigger(c);
                }, 0);
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (n.removeClass("active"), s.addClass("active"), 
            this.sliding = !1, this.$element.trigger(c)), a && this.cycle(), this;
        }
    };
    var o = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = o, this;
    };
    var n = function(i) {
        var o, n = t(this), s = t(n.attr("data-target") || (o = n.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (s.hasClass("carousel")) {
            var a = t.extend({}, s.data(), n.data()), r = n.attr("data-slide-to");
            r && (a.interval = !1), e.call(s, a), r && s.data("bs.carousel").to(r), i.preventDefault();
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", n).on("click.bs.carousel.data-api", "[data-slide-to]", n), 
    t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data());
        });
    });
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        e && 3 === e.which || (t(n).remove(), t(s).each(function() {
            var o = t(this), n = i(o), s = {
                relatedTarget: this
            };
            n.hasClass("open") && (n.trigger(e = t.Event("hide.bs.dropdown", s)), e.isDefaultPrevented() || (o.attr("aria-expanded", "false"), 
            n.removeClass("open").trigger("hidden.bs.dropdown", s)));
        }));
    }
    function i(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent();
    }
    function o(e) {
        return this.each(function() {
            var i = t(this), o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new a(this)), "string" == typeof e && o[e].call(i);
        });
    }
    var n = ".dropdown-backdrop", s = '[data-toggle="dropdown"]', a = function(e) {
        t(e).on("click.bs.dropdown", this.toggle);
    };
    a.VERSION = "3.3.4", a.prototype.toggle = function(o) {
        var n = t(this);
        if (!n.is(".disabled, :disabled")) {
            var s = i(n), a = s.hasClass("open");
            if (e(), !a) {
                "ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
                var r = {
                    relatedTarget: this
                };
                if (s.trigger(o = t.Event("show.bs.dropdown", r)), o.isDefaultPrevented()) return;
                n.trigger("focus").attr("aria-expanded", "true"), s.toggleClass("open").trigger("shown.bs.dropdown", r);
            }
            return !1;
        }
    }, a.prototype.keydown = function(e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var o = t(this);
            if (e.preventDefault(), e.stopPropagation(), !o.is(".disabled, :disabled")) {
                var n = i(o), a = n.hasClass("open");
                if (!a && 27 != e.which || a && 27 == e.which) return 27 == e.which && n.find(s).trigger("focus"), 
                o.trigger("click");
                var r = " li:not(.disabled):visible a", l = n.find('[role="menu"]' + r + ', [role="listbox"]' + r);
                if (l.length) {
                    var h = l.index(e.target);
                    38 == e.which && h > 0 && h--, 40 == e.which && h < l.length - 1 && h++, ~h || (h = 0), 
                    l.eq(h).trigger("focus");
                }
            }
        }
    };
    var r = t.fn.dropdown;
    t.fn.dropdown = o, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = r, this;
    }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation();
    }).on("click.bs.dropdown.data-api", s, a.prototype.toggle).on("keydown.bs.dropdown.data-api", s, a.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', a.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', a.prototype.keydown);
}(jQuery), +function(t) {
    "use strict";
    function e(e, o) {
        return this.each(function() {
            var n = t(this), s = n.data("bs.modal"), a = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            s || n.data("bs.modal", s = new i(this, a)), "string" == typeof e ? s[e](o) : a.show && s.show(o);
        });
    }
    var i = function(e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), 
        this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, 
        this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, 
    i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t);
    }, i.prototype.show = function(e) {
        var o = this, n = t.Event("show.bs.modal", {
            relatedTarget: e
        });
        this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, 
        this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), 
        this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), 
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            o.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(o.$element) && (o.ignoreBackdropClick = !0);
            });
        }), this.backdrop(function() {
            var n = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), 
            o.adjustDialog(), n && o.$element[0].offsetWidth, o.$element.addClass("in").attr("aria-hidden", !1), 
            o.enforceFocus();
            var s = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            n ? o.$dialog.one("bsTransitionEnd", function() {
                o.$element.trigger("focus").trigger(s);
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(s);
        }));
    }, i.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), 
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), 
        t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), 
        this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal());
    }, i.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus");
        }, this));
    }, i.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, i.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal");
    }, i.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal");
        });
    }, i.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, i.prototype.backdrop = function(e) {
        var o = this, n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = t.support.transition && n;
            if (this.$backdrop = t('<div class="modal-backdrop ' + n + '" />').appendTo(this.$body), 
            this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
            }, this)), s && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            s ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function() {
                o.removeBackdrop(), e && e();
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : a();
        } else e && e();
    }, i.prototype.handleUpdate = function() {
        this.adjustDialog();
    }, i.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        });
    }, i.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        });
    }, i.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar();
    }, i.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth);
    }, i.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad);
    }, i.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e;
    };
    var o = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function() {
        return t.fn.modal = o, this;
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
        var o = t(this), n = o.attr("href"), s = t(o.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")), a = s.data("bs.modal") ? "toggle" : t.extend({
            remote: !/#/.test(n) && n
        }, s.data(), o.data());
        o.is("a") && i.preventDefault(), s.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || s.one("hidden.bs.modal", function() {
                o.is(":visible") && o.trigger("focus");
            });
        }), e.call(s, a, this);
    });
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.tooltip"), s = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || o.data("bs.tooltip", n = new i(this, s)), 
            "string" == typeof e && n[e]());
        });
    }
    var i = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, 
        this.hoverState = null, this.$element = null, this.init("tooltip", t, e);
    };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, i.prototype.init = function(e, i, o) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), 
        this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport), 
        this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), s = n.length; s--; ) {
            var a = n[s];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != a) {
                var r = "hover" == a ? "mouseenter" : "focusin", l = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), 
                this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, i.prototype.getDefaults = function() {
        return i.DEFAULTS;
    }, i.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e;
    }, i.prototype.getDelegateOptions = function() {
        var e = {}, i = this.getDefaults();
        return this._options && t.each(this._options, function(t, o) {
            i[t] != o && (e[t] = o);
        }), e;
    }, i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i && i.$tip && i.$tip.is(":visible") ? void (i.hoverState = "in") : (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
        t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", 
        i.options.delay && i.options.delay.show ? void (i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show();
        }, i.options.delay.show)) : i.show());
    }, i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
        t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", 
        i.options.delay && i.options.delay.hide ? void (i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide();
        }, i.options.delay.hide)) : i.hide();
    }, i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !o) return;
            var n = this, s = this.tip(), a = this.getUID(this.type);
            this.setContent(), s.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && s.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement, l = /\s?auto?\s?/i, h = l.test(r);
            h && (r = r.replace(l, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element);
            var d = this.getPosition(), p = s[0].offsetWidth, c = s[0].offsetHeight;
            if (h) {
                var f = r, u = this.options.container ? t(this.options.container) : this.$element.parent(), g = this.getPosition(u);
                r = "bottom" == r && d.bottom + c > g.bottom ? "top" : "top" == r && d.top - c < g.top ? "bottom" : "right" == r && d.right + p > g.width ? "left" : "left" == r && d.left - p < g.left ? "right" : r, 
                s.removeClass(f).addClass(r);
            }
            var m = this.getCalculatedOffset(r, d, p, c);
            this.applyPlacement(m, r);
            var v = function() {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n);
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", v).emulateTransitionEnd(i.TRANSITION_DURATION) : v();
        }
    }, i.prototype.applyPlacement = function(e, i) {
        var o = this.tip(), n = o[0].offsetWidth, s = o[0].offsetHeight, a = parseInt(o.css("margin-top"), 10), r = parseInt(o.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(r) && (r = 0), e.top = e.top + a, e.left = e.left + r, 
        t.offset.setOffset(o[0], t.extend({
            using: function(t) {
                o.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                });
            }
        }, e), 0), o.addClass("in");
        var l = o[0].offsetWidth, h = o[0].offsetHeight;
        "top" == i && h != s && (e.top = e.top + s - h);
        var d = this.getViewportAdjustedDelta(i, e, l, h);
        d.left ? e.left += d.left : e.top += d.top;
        var p = /top|bottom/.test(i), c = p ? 2 * d.left - n + l : 2 * d.top - s + h, f = p ? "offsetWidth" : "offsetHeight";
        o.offset(e), this.replaceArrow(c, o[0][f], p);
    }, i.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "");
    }, i.prototype.setContent = function() {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right");
    }, i.prototype.hide = function(e) {
        function o() {
            "in" != n.hoverState && s.detach(), n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), 
            e && e();
        }
        var n = this, s = t(this.$tip), a = t.Event("hide.bs." + this.type);
        return this.$element.trigger(a), a.isDefaultPrevented() ? void 0 : (s.removeClass("in"), 
        t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), 
        this.hoverState = null, this);
    }, i.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "");
    }, i.prototype.hasContent = function() {
        return this.getTitle();
    }, i.prototype.getPosition = function(e) {
        e = e || this.$element;
        var i = e[0], o = "BODY" == i.tagName, n = i.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {
            width: n.right - n.left,
            height: n.bottom - n.top
        }));
        var s = o ? {
            top: 0,
            left: 0
        } : e.offset(), a = {
            scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
        }, r = o ? {
            width: t(window).width(),
            height: t(window).height()
        } : null;
        return t.extend({}, n, a, r, s);
    }, i.prototype.getCalculatedOffset = function(t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - o / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        };
    }, i.prototype.getViewportAdjustedDelta = function(t, e, i, o) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return n;
        var s = this.options.viewport && this.options.viewport.padding || 0, a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - s - a.scroll, l = e.top + s - a.scroll + o;
            r < a.top ? n.top = a.top - r : l > a.top + a.height && (n.top = a.top + a.height - l);
        } else {
            var h = e.left - s, d = e.left + s + i;
            h < a.left ? n.left = a.left - h : d > a.width && (n.left = a.left + a.width - d);
        }
        return n;
    }, i.prototype.getTitle = function() {
        var t, e = this.$element, i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title);
    }, i.prototype.getUID = function(t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t;
    }, i.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template);
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, i.prototype.enable = function() {
        this.enabled = !0;
    }, i.prototype.disable = function() {
        this.enabled = !1;
    }, i.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, i.prototype.toggle = function(e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
        t(e.currentTarget).data("bs." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i);
    }, i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type);
        });
    };
    var o = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = o, this;
    };
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.popover"), s = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || o.data("bs.popover", n = new i(this, s)), 
            "string" == typeof e && n[e]());
        });
    }
    var i = function(t, e) {
        this.init("popover", t, e);
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.4", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, 
    i.prototype.getDefaults = function() {
        return i.DEFAULTS;
    }, i.prototype.setContent = function() {
        var t = this.tip(), e = this.getTitle(), i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), 
        t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide();
    }, i.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, i.prototype.getContent = function() {
        var t = this.$element, e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content);
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    };
    var o = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function() {
        return t.fn.popover = o, this;
    };
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.tab");
            n || o.data("bs.tab", n = new i(this)), "string" == typeof e && n[e]();
        });
    }
    var i = function(e) {
        this.element = t(e);
    };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 150, i.prototype.show = function() {
        var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), o = e.data("target");
        if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var n = i.find(".active:last a"), s = t.Event("hide.bs.tab", {
                relatedTarget: e[0]
            }), a = t.Event("show.bs.tab", {
                relatedTarget: n[0]
            });
            if (n.trigger(s), e.trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                var r = t(o);
                this.activate(e.closest("li"), i), this.activate(r, r.parent(), function() {
                    n.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: n[0]
                    });
                });
            }
        }
    }, i.prototype.activate = function(e, o, n) {
        function s() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), 
            e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), r ? (e[0].offsetWidth, 
            e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            n && n();
        }
        var a = o.find("> .active"), r = n && t.support.transition && (a.length && a.hasClass("fade") || !!o.find("> .fade").length);
        a.length && r ? a.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s(), 
        a.removeClass("in");
    };
    var o = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function() {
        return t.fn.tab = o, this;
    };
    var n = function(i) {
        i.preventDefault(), e.call(t(this), "show");
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n);
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.affix"), s = "object" == typeof e && e;
            n || o.data("bs.affix", n = new i(this, s)), "string" == typeof e && n[e]();
        });
    }
    var i = function(e, o) {
        this.options = t.extend({}, i.DEFAULTS, o), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, 
        this.checkPosition();
    };
    i.VERSION = "3.3.4", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function(t, e, i, o) {
        var n = this.$target.scrollTop(), s = this.$element.offset(), a = this.$target.height();
        if (null != i && "top" == this.affixed) return i > n ? "top" : !1;
        if ("bottom" == this.affixed) return null != i ? n + this.unpin <= s.top ? !1 : "bottom" : t - o >= n + a ? !1 : "bottom";
        var r = null == this.affixed, l = r ? n : s.top, h = r ? a : e;
        return null != i && i >= n ? "top" : null != o && l + h >= t - o ? "bottom" : !1;
    }, i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(), e = this.$element.offset();
        return this.pinnedOffset = e.top - t;
    }, i.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1);
    }, i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(), o = this.options.offset, n = o.top, s = o.bottom, a = t(document.body).height();
            "object" != typeof o && (s = n = o), "function" == typeof n && (n = o.top(this.$element)), 
            "function" == typeof s && (s = o.bottom(this.$element));
            var r = this.getState(a, e, n, s);
            if (this.affixed != r) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (r ? "-" + r : ""), h = t.Event(l + ".bs.affix");
                if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix");
            }
            "bottom" == r && this.$element.offset({
                top: a - e - s
            });
        }
    };
    var o = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function() {
        return t.fn.affix = o, this;
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var i = t(this), o = i.data();
            o.offset = o.offset || {}, null != o.offsetBottom && (o.offset.bottom = o.offsetBottom), 
            null != o.offsetTop && (o.offset.top = o.offsetTop), e.call(i, o);
        });
    });
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(o);
    }
    function i(e) {
        return this.each(function() {
            var i = t(this), n = i.data("bs.collapse"), s = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
            !n && s.toggle && /show|hide/.test(e) && (s.toggle = !1), n || i.data("bs.collapse", n = new o(this, s)), 
            "string" == typeof e && n[e]();
        });
    }
    var o = function(e, i) {
        this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), 
        this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), 
        this.options.toggle && this.toggle();
    };
    o.VERSION = "3.3.4", o.TRANSITION_DURATION = 350, o.DEFAULTS = {
        toggle: !0
    }, o.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height";
    }, o.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, n = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(n && n.length && (e = n.data("bs.collapse"), e && e.transitioning))) {
                var s = t.Event("show.bs.collapse");
                if (this.$element.trigger(s), !s.isDefaultPrevented()) {
                    n && n.length && (i.call(n, "hide"), e || n.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), 
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var r = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, 
                        this.$element.trigger("shown.bs.collapse");
                    };
                    if (!t.support.transition) return r.call(this);
                    var l = t.camelCase([ "scroll", a ].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[a](this.$element[0][l]);
                }
            }
        }
    }, o.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), 
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var n = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(n, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : n.call(this);
            }
        }
    }, o.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, o.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, o) {
            var n = t(o);
            this.addAriaAndCollapsedClass(e(n), n);
        }, this)).end();
    }, o.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i);
    };
    var n = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = o, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = n, this;
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(o) {
        var n = t(this);
        n.attr("data-target") || o.preventDefault();
        var s = e(n), a = s.data("bs.collapse"), r = a ? "toggle" : n.data();
        i.call(s, r);
    });
}(jQuery), +function(t) {
    "use strict";
    function e(i, o) {
        this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), 
        this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || "") + " .nav li > a", 
        this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, 
        this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), 
        this.process();
    }
    function i(i) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.scrollspy"), s = "object" == typeof i && i;
            n || o.data("bs.scrollspy", n = new e(this, s)), "string" == typeof i && n[i]();
        });
    }
    e.VERSION = "3.3.4", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, e.prototype.refresh = function() {
        var e = this, i = "offset", o = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), 
        t.isWindow(this.$scrollElement[0]) || (i = "position", o = this.$scrollElement.scrollTop()), 
        this.$body.find(this.selector).map(function() {
            var e = t(this), n = e.data("target") || e.attr("href"), s = /^#./.test(n) && t(n);
            return s && s.length && s.is(":visible") && [ [ s[i]().top + o, n ] ] || null;
        }).sort(function(t, e) {
            return t[0] - e[0];
        }).each(function() {
            e.offsets.push(this[0]), e.targets.push(this[1]);
        });
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(), o = this.options.offset + i - this.$scrollElement.height(), n = this.offsets, s = this.targets, a = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= o) return a != (t = s[s.length - 1]) && this.activate(t);
        if (a && e < n[0]) return this.activeTarget = null, this.clear();
        for (t = n.length; t--; ) a != s[t] && e >= n[t] && (void 0 === n[t + 1] || e < n[t + 1]) && this.activate(s[t]);
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), 
        o.trigger("activate.bs.scrollspy");
    }, e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var o = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = o, this;
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            i.call(e, e.data());
        });
    });
}(jQuery), +function(t) {
    "use strict";
    function e() {
        var t = document.createElement("bootstrap"), e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in e) if (void 0 !== t.style[i]) return {
            end: e[i]
        };
        return !1;
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1, o = this;
        t(this).one("bsTransitionEnd", function() {
            i = !0;
        });
        var n = function() {
            i || t(o).trigger(t.support.transition.end);
        };
        return setTimeout(n, e), this;
    }, t(function() {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0;
            }
        });
    });
}(jQuery);

(function() {
    var n = this, t = n._, r = Array.prototype, e = Object.prototype, u = Function.prototype, i = r.push, a = r.slice, o = r.concat, l = e.toString, c = e.hasOwnProperty, f = Array.isArray, s = Object.keys, p = u.bind, h = function(n) {
        return n instanceof h ? n : this instanceof h ? void (this._wrapped = n) : new h(n);
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = h), 
    exports._ = h) : n._ = h, h.VERSION = "1.7.0";
    var g = function(n, t, r) {
        if (t === void 0) return n;
        switch (null == r ? 3 : r) {
          case 1:
            return function(r) {
                return n.call(t, r);
            };

          case 2:
            return function(r, e) {
                return n.call(t, r, e);
            };

          case 3:
            return function(r, e, u) {
                return n.call(t, r, e, u);
            };

          case 4:
            return function(r, e, u, i) {
                return n.call(t, r, e, u, i);
            };
        }
        return function() {
            return n.apply(t, arguments);
        };
    };
    h.iteratee = function(n, t, r) {
        return null == n ? h.identity : h.isFunction(n) ? g(n, t, r) : h.isObject(n) ? h.matches(n) : h.property(n);
    }, h.each = h.forEach = function(n, t, r) {
        if (null == n) return n;
        t = g(t, r);
        var e, u = n.length;
        if (u === +u) for (e = 0; u > e; e++) t(n[e], e, n); else {
            var i = h.keys(n);
            for (e = 0, u = i.length; u > e; e++) t(n[i[e]], i[e], n);
        }
        return n;
    }, h.map = h.collect = function(n, t, r) {
        if (null == n) return [];
        t = h.iteratee(t, r);
        for (var e, u = n.length !== +n.length && h.keys(n), i = (u || n).length, a = Array(i), o = 0; i > o; o++) e = u ? u[o] : o, 
        a[o] = t(n[e], e, n);
        return a;
    };
    var v = "Reduce of empty array with no initial value";
    h.reduce = h.foldl = h.inject = function(n, t, r, e) {
        null == n && (n = []), t = g(t, e, 4);
        var u, i = n.length !== +n.length && h.keys(n), a = (i || n).length, o = 0;
        if (arguments.length < 3) {
            if (!a) throw new TypeError(v);
            r = n[i ? i[o++] : o++];
        }
        for (;a > o; o++) u = i ? i[o] : o, r = t(r, n[u], u, n);
        return r;
    }, h.reduceRight = h.foldr = function(n, t, r, e) {
        null == n && (n = []), t = g(t, e, 4);
        var u, i = n.length !== +n.length && h.keys(n), a = (i || n).length;
        if (arguments.length < 3) {
            if (!a) throw new TypeError(v);
            r = n[i ? i[--a] : --a];
        }
        for (;a--; ) u = i ? i[a] : a, r = t(r, n[u], u, n);
        return r;
    }, h.find = h.detect = function(n, t, r) {
        var e;
        return t = h.iteratee(t, r), h.some(n, function(n, r, u) {
            return t(n, r, u) ? (e = n, !0) : void 0;
        }), e;
    }, h.filter = h.select = function(n, t, r) {
        var e = [];
        return null == n ? e : (t = h.iteratee(t, r), h.each(n, function(n, r, u) {
            t(n, r, u) && e.push(n);
        }), e);
    }, h.reject = function(n, t, r) {
        return h.filter(n, h.negate(h.iteratee(t)), r);
    }, h.every = h.all = function(n, t, r) {
        if (null == n) return !0;
        t = h.iteratee(t, r);
        var e, u, i = n.length !== +n.length && h.keys(n), a = (i || n).length;
        for (e = 0; a > e; e++) if (u = i ? i[e] : e, !t(n[u], u, n)) return !1;
        return !0;
    }, h.some = h.any = function(n, t, r) {
        if (null == n) return !1;
        t = h.iteratee(t, r);
        var e, u, i = n.length !== +n.length && h.keys(n), a = (i || n).length;
        for (e = 0; a > e; e++) if (u = i ? i[e] : e, t(n[u], u, n)) return !0;
        return !1;
    }, h.contains = h.include = function(n, t) {
        return null == n ? !1 : (n.length !== +n.length && (n = h.values(n)), h.indexOf(n, t) >= 0);
    }, h.invoke = function(n, t) {
        var r = a.call(arguments, 2), e = h.isFunction(t);
        return h.map(n, function(n) {
            return (e ? t : n[t]).apply(n, r);
        });
    }, h.pluck = function(n, t) {
        return h.map(n, h.property(t));
    }, h.where = function(n, t) {
        return h.filter(n, h.matches(t));
    }, h.findWhere = function(n, t) {
        return h.find(n, h.matches(t));
    }, h.max = function(n, t, r) {
        var e, u, i = -1 / 0, a = -1 / 0;
        if (null == t && null != n) {
            n = n.length === +n.length ? n : h.values(n);
            for (var o = 0, l = n.length; l > o; o++) e = n[o], e > i && (i = e);
        } else t = h.iteratee(t, r), h.each(n, function(n, r, e) {
            u = t(n, r, e), (u > a || u === -1 / 0 && i === -1 / 0) && (i = n, a = u);
        });
        return i;
    }, h.min = function(n, t, r) {
        var e, u, i = 1 / 0, a = 1 / 0;
        if (null == t && null != n) {
            n = n.length === +n.length ? n : h.values(n);
            for (var o = 0, l = n.length; l > o; o++) e = n[o], i > e && (i = e);
        } else t = h.iteratee(t, r), h.each(n, function(n, r, e) {
            u = t(n, r, e), (a > u || 1 / 0 === u && 1 / 0 === i) && (i = n, a = u);
        });
        return i;
    }, h.shuffle = function(n) {
        for (var t, r = n && n.length === +n.length ? n : h.values(n), e = r.length, u = Array(e), i = 0; e > i; i++) t = h.random(0, i), 
        t !== i && (u[i] = u[t]), u[t] = r[i];
        return u;
    }, h.sample = function(n, t, r) {
        return null == t || r ? (n.length !== +n.length && (n = h.values(n)), n[h.random(n.length - 1)]) : h.shuffle(n).slice(0, Math.max(0, t));
    }, h.sortBy = function(n, t, r) {
        return t = h.iteratee(t, r), h.pluck(h.map(n, function(n, r, e) {
            return {
                value: n,
                index: r,
                criteria: t(n, r, e)
            };
        }).sort(function(n, t) {
            var r = n.criteria, e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0) return 1;
                if (e > r || e === void 0) return -1;
            }
            return n.index - t.index;
        }), "value");
    };
    var m = function(n) {
        return function(t, r, e) {
            var u = {};
            return r = h.iteratee(r, e), h.each(t, function(e, i) {
                var a = r(e, i, t);
                n(u, e, a);
            }), u;
        };
    };
    h.groupBy = m(function(n, t, r) {
        h.has(n, r) ? n[r].push(t) : n[r] = [ t ];
    }), h.indexBy = m(function(n, t, r) {
        n[r] = t;
    }), h.countBy = m(function(n, t, r) {
        h.has(n, r) ? n[r]++ : n[r] = 1;
    }), h.sortedIndex = function(n, t, r, e) {
        r = h.iteratee(r, e, 1);
        for (var u = r(t), i = 0, a = n.length; a > i; ) {
            var o = i + a >>> 1;
            r(n[o]) < u ? i = o + 1 : a = o;
        }
        return i;
    }, h.toArray = function(n) {
        return n ? h.isArray(n) ? a.call(n) : n.length === +n.length ? h.map(n, h.identity) : h.values(n) : [];
    }, h.size = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length : h.keys(n).length;
    }, h.partition = function(n, t, r) {
        t = h.iteratee(t, r);
        var e = [], u = [];
        return h.each(n, function(n, r, i) {
            (t(n, r, i) ? e : u).push(n);
        }), [ e, u ];
    }, h.first = h.head = h.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : 0 > t ? [] : a.call(n, 0, t);
    }, h.initial = function(n, t, r) {
        return a.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)));
    }, h.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : a.call(n, Math.max(n.length - t, 0));
    }, h.rest = h.tail = h.drop = function(n, t, r) {
        return a.call(n, null == t || r ? 1 : t);
    }, h.compact = function(n) {
        return h.filter(n, h.identity);
    };
    var y = function(n, t, r, e) {
        if (t && h.every(n, h.isArray)) return o.apply(e, n);
        for (var u = 0, a = n.length; a > u; u++) {
            var l = n[u];
            h.isArray(l) || h.isArguments(l) ? t ? i.apply(e, l) : y(l, t, r, e) : r || e.push(l);
        }
        return e;
    };
    h.flatten = function(n, t) {
        return y(n, t, !1, []);
    }, h.without = function(n) {
        return h.difference(n, a.call(arguments, 1));
    }, h.uniq = h.unique = function(n, t, r, e) {
        if (null == n) return [];
        h.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = h.iteratee(r, e));
        for (var u = [], i = [], a = 0, o = n.length; o > a; a++) {
            var l = n[a];
            if (t) a && i === l || u.push(l), i = l; else if (r) {
                var c = r(l, a, n);
                h.indexOf(i, c) < 0 && (i.push(c), u.push(l));
            } else h.indexOf(u, l) < 0 && u.push(l);
        }
        return u;
    }, h.union = function() {
        return h.uniq(y(arguments, !0, !0, []));
    }, h.intersection = function(n) {
        if (null == n) return [];
        for (var t = [], r = arguments.length, e = 0, u = n.length; u > e; e++) {
            var i = n[e];
            if (!h.contains(t, i)) {
                for (var a = 1; r > a && h.contains(arguments[a], i); a++) ;
                a === r && t.push(i);
            }
        }
        return t;
    }, h.difference = function(n) {
        var t = y(a.call(arguments, 1), !0, !0, []);
        return h.filter(n, function(n) {
            return !h.contains(t, n);
        });
    }, h.zip = function(n) {
        if (null == n) return [];
        for (var t = h.max(arguments, "length").length, r = Array(t), e = 0; t > e; e++) r[e] = h.pluck(arguments, e);
        return r;
    }, h.object = function(n, t) {
        if (null == n) return {};
        for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r;
    }, h.indexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = 0, u = n.length;
        if (r) {
            if ("number" != typeof r) return e = h.sortedIndex(n, t), n[e] === t ? e : -1;
            e = 0 > r ? Math.max(0, u + r) : r;
        }
        for (;u > e; e++) if (n[e] === t) return e;
        return -1;
    }, h.lastIndexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = n.length;
        for ("number" == typeof r && (e = 0 > r ? e + r + 1 : Math.min(e, r + 1)); --e >= 0; ) if (n[e] === t) return e;
        return -1;
    }, h.range = function(n, t, r) {
        arguments.length <= 1 && (t = n || 0, n = 0), r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, 
        n += r) u[i] = n;
        return u;
    };
    var d = function() {};
    h.bind = function(n, t) {
        var r, e;
        if (p && n.bind === p) return p.apply(n, a.call(arguments, 1));
        if (!h.isFunction(n)) throw new TypeError("Bind must be called on a function");
        return r = a.call(arguments, 2), e = function() {
            if (!(this instanceof e)) return n.apply(t, r.concat(a.call(arguments)));
            d.prototype = n.prototype;
            var u = new d();
            d.prototype = null;
            var i = n.apply(u, r.concat(a.call(arguments)));
            return h.isObject(i) ? i : u;
        };
    }, h.partial = function(n) {
        var t = a.call(arguments, 1);
        return function() {
            for (var r = 0, e = t.slice(), u = 0, i = e.length; i > u; u++) e[u] === h && (e[u] = arguments[r++]);
            for (;r < arguments.length; ) e.push(arguments[r++]);
            return n.apply(this, e);
        };
    }, h.bindAll = function(n) {
        var t, r, e = arguments.length;
        if (1 >= e) throw new Error("bindAll must be passed function names");
        for (t = 1; e > t; t++) r = arguments[t], n[r] = h.bind(n[r], n);
        return n;
    }, h.memoize = function(n, t) {
        var r = function(e) {
            var u = r.cache, i = t ? t.apply(this, arguments) : e;
            return h.has(u, i) || (u[i] = n.apply(this, arguments)), u[i];
        };
        return r.cache = {}, r;
    }, h.delay = function(n, t) {
        var r = a.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r);
        }, t);
    }, h.defer = function(n) {
        return h.delay.apply(h, [ n, 1 ].concat(a.call(arguments, 1)));
    }, h.throttle = function(n, t, r) {
        var e, u, i, a = null, o = 0;
        r || (r = {});
        var l = function() {
            o = r.leading === !1 ? 0 : h.now(), a = null, i = n.apply(e, u), a || (e = u = null);
        };
        return function() {
            var c = h.now();
            o || r.leading !== !1 || (o = c);
            var f = t - (c - o);
            return e = this, u = arguments, 0 >= f || f > t ? (clearTimeout(a), a = null, o = c, 
            i = n.apply(e, u), a || (e = u = null)) : a || r.trailing === !1 || (a = setTimeout(l, f)), 
            i;
        };
    }, h.debounce = function(n, t, r) {
        var e, u, i, a, o, l = function() {
            var c = h.now() - a;
            t > c && c > 0 ? e = setTimeout(l, t - c) : (e = null, r || (o = n.apply(i, u), 
            e || (i = u = null)));
        };
        return function() {
            i = this, u = arguments, a = h.now();
            var c = r && !e;
            return e || (e = setTimeout(l, t)), c && (o = n.apply(i, u), i = u = null), o;
        };
    }, h.wrap = function(n, t) {
        return h.partial(t, n);
    }, h.negate = function(n) {
        return function() {
            return !n.apply(this, arguments);
        };
    }, h.compose = function() {
        var n = arguments, t = n.length - 1;
        return function() {
            for (var r = t, e = n[t].apply(this, arguments); r--; ) e = n[r].call(this, e);
            return e;
        };
    }, h.after = function(n, t) {
        return function() {
            return --n < 1 ? t.apply(this, arguments) : void 0;
        };
    }, h.before = function(n, t) {
        var r;
        return function() {
            return --n > 0 ? r = t.apply(this, arguments) : t = null, r;
        };
    }, h.once = h.partial(h.before, 2), h.keys = function(n) {
        if (!h.isObject(n)) return [];
        if (s) return s(n);
        var t = [];
        for (var r in n) h.has(n, r) && t.push(r);
        return t;
    }, h.values = function(n) {
        for (var t = h.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = n[t[u]];
        return e;
    }, h.pairs = function(n) {
        for (var t = h.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = [ t[u], n[t[u]] ];
        return e;
    }, h.invert = function(n) {
        for (var t = {}, r = h.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];
        return t;
    }, h.functions = h.methods = function(n) {
        var t = [];
        for (var r in n) h.isFunction(n[r]) && t.push(r);
        return t.sort();
    }, h.extend = function(n) {
        if (!h.isObject(n)) return n;
        for (var t, r, e = 1, u = arguments.length; u > e; e++) {
            t = arguments[e];
            for (r in t) c.call(t, r) && (n[r] = t[r]);
        }
        return n;
    }, h.pick = function(n, t, r) {
        var e, u = {};
        if (null == n) return u;
        if (h.isFunction(t)) {
            t = g(t, r);
            for (e in n) {
                var i = n[e];
                t(i, e, n) && (u[e] = i);
            }
        } else {
            var l = o.apply([], a.call(arguments, 1));
            n = new Object(n);
            for (var c = 0, f = l.length; f > c; c++) e = l[c], e in n && (u[e] = n[e]);
        }
        return u;
    }, h.omit = function(n, t, r) {
        if (h.isFunction(t)) t = h.negate(t); else {
            var e = h.map(o.apply([], a.call(arguments, 1)), String);
            t = function(n, t) {
                return !h.contains(e, t);
            };
        }
        return h.pick(n, t, r);
    }, h.defaults = function(n) {
        if (!h.isObject(n)) return n;
        for (var t = 1, r = arguments.length; r > t; t++) {
            var e = arguments[t];
            for (var u in e) n[u] === void 0 && (n[u] = e[u]);
        }
        return n;
    }, h.clone = function(n) {
        return h.isObject(n) ? h.isArray(n) ? n.slice() : h.extend({}, n) : n;
    }, h.tap = function(n, t) {
        return t(n), n;
    };
    var b = function(n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n === 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof h && (n = n._wrapped), t instanceof h && (t = t._wrapped);
        var u = l.call(n);
        if (u !== l.call(t)) return !1;
        switch (u) {
          case "[object RegExp]":
          case "[object String]":
            return "" + n == "" + t;

          case "[object Number]":
            return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;

          case "[object Date]":
          case "[object Boolean]":
            return +n === +t;
        }
        if ("object" != typeof n || "object" != typeof t) return !1;
        for (var i = r.length; i--; ) if (r[i] === n) return e[i] === t;
        var a = n.constructor, o = t.constructor;
        if (a !== o && "constructor" in n && "constructor" in t && !(h.isFunction(a) && a instanceof a && h.isFunction(o) && o instanceof o)) return !1;
        r.push(n), e.push(t);
        var c, f;
        if ("[object Array]" === u) {
            if (c = n.length, f = c === t.length) for (;c-- && (f = b(n[c], t[c], r, e)); ) ;
        } else {
            var s, p = h.keys(n);
            if (c = p.length, f = h.keys(t).length === c) for (;c-- && (s = p[c], f = h.has(t, s) && b(n[s], t[s], r, e)); ) ;
        }
        return r.pop(), e.pop(), f;
    };
    h.isEqual = function(n, t) {
        return b(n, t, [], []);
    }, h.isEmpty = function(n) {
        if (null == n) return !0;
        if (h.isArray(n) || h.isString(n) || h.isArguments(n)) return 0 === n.length;
        for (var t in n) if (h.has(n, t)) return !1;
        return !0;
    }, h.isElement = function(n) {
        return !(!n || 1 !== n.nodeType);
    }, h.isArray = f || function(n) {
        return "[object Array]" === l.call(n);
    }, h.isObject = function(n) {
        var t = typeof n;
        return "function" === t || "object" === t && !!n;
    }, h.each([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(n) {
        h["is" + n] = function(t) {
            return l.call(t) === "[object " + n + "]";
        };
    }), h.isArguments(arguments) || (h.isArguments = function(n) {
        return h.has(n, "callee");
    }), "function" != typeof /./ && (h.isFunction = function(n) {
        return "function" == typeof n || !1;
    }), h.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n));
    }, h.isNaN = function(n) {
        return h.isNumber(n) && n !== +n;
    }, h.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" === l.call(n);
    }, h.isNull = function(n) {
        return null === n;
    }, h.isUndefined = function(n) {
        return n === void 0;
    }, h.has = function(n, t) {
        return null != n && c.call(n, t);
    }, h.noConflict = function() {
        return n._ = t, this;
    }, h.identity = function(n) {
        return n;
    }, h.constant = function(n) {
        return function() {
            return n;
        };
    }, h.noop = function() {}, h.property = function(n) {
        return function(t) {
            return t[n];
        };
    }, h.matches = function(n) {
        var t = h.pairs(n), r = t.length;
        return function(n) {
            if (null == n) return !r;
            n = new Object(n);
            for (var e = 0; r > e; e++) {
                var u = t[e], i = u[0];
                if (u[1] !== n[i] || !(i in n)) return !1;
            }
            return !0;
        };
    }, h.times = function(n, t, r) {
        var e = Array(Math.max(0, n));
        t = g(t, r, 1);
        for (var u = 0; n > u; u++) e[u] = t(u);
        return e;
    }, h.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1));
    }, h.now = Date.now || function() {
        return new Date().getTime();
    };
    var _ = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }, w = h.invert(_), j = function(n) {
        var t = function(t) {
            return n[t];
        }, r = "(?:" + h.keys(n).join("|") + ")", e = RegExp(r), u = RegExp(r, "g");
        return function(n) {
            return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n;
        };
    };
    h.escape = j(_), h.unescape = j(w), h.result = function(n, t) {
        if (null == n) return void 0;
        var r = n[t];
        return h.isFunction(r) ? n[t]() : r;
    };
    var x = 0;
    h.uniqueId = function(n) {
        var t = ++x + "";
        return n ? n + t : t;
    }, h.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var A = /(.)^/, k = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, O = /\\|'|\r|\n|\u2028|\u2029/g, F = function(n) {
        return "\\" + k[n];
    };
    h.template = function(n, t, r) {
        !t && r && (t = r), t = h.defaults({}, t, h.templateSettings);
        var e = RegExp([ (t.escape || A).source, (t.interpolate || A).source, (t.evaluate || A).source ].join("|") + "|$", "g"), u = 0, i = "__p+='";
        n.replace(e, function(t, r, e, a, o) {
            return i += n.slice(u, o).replace(O, F), u = o + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : a && (i += "';\n" + a + "\n__p+='"), 
            t;
        }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var a = new Function(t.variable || "obj", "_", i);
        } catch (o) {
            throw o.source = i, o;
        }
        var l = function(n) {
            return a.call(this, n, h);
        }, c = t.variable || "obj";
        return l.source = "function(" + c + "){\n" + i + "}", l;
    }, h.chain = function(n) {
        var t = h(n);
        return t._chain = !0, t;
    };
    var E = function(n) {
        return this._chain ? h(n).chain() : n;
    };
    h.mixin = function(n) {
        h.each(h.functions(n), function(t) {
            var r = h[t] = n[t];
            h.prototype[t] = function() {
                var n = [ this._wrapped ];
                return i.apply(n, arguments), E.call(this, r.apply(h, n));
            };
        });
    }, h.mixin(h), h.each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(n) {
        var t = r[n];
        h.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], 
            E.call(this, r);
        };
    }), h.each([ "concat", "join", "slice" ], function(n) {
        var t = r[n];
        h.prototype[n] = function() {
            return E.call(this, t.apply(this._wrapped, arguments));
        };
    }), h.prototype.value = function() {
        return this._wrapped;
    }, "function" == typeof define && define.amd && define("underscore", [], function() {
        return h;
    });
}).call(this);

(function($) {
    jQuery.fn.extend({
        slimScroll: function(options) {
            var defaults = {
                width: "auto",
                height: "250px",
                size: "7px",
                color: "#000",
                position: "right",
                distance: "1px",
                start: "top",
                opacity: 0,
                alwaysVisible: false,
                disableFadeOut: false,
                railVisible: false,
                railColor: "#333",
                railOpacity: 0,
                railDraggable: true,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: false,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "7px",
                railBorderRadius: "7px"
            };
            var o = $.extend(defaults, options);
            this.each(function() {
                var isOverPanel, isOverBar, isDragg, queueHide, touchDif, barHeight, percentScroll, lastScroll, divS = "<div></div>", minBarHeight = 30, releaseScroll = false;
                var me = $(this);
                if (me.parent().hasClass(o.wrapperClass)) {
                    var offset = me.scrollTop();
                    bar = me.parent().find("." + o.barClass);
                    rail = me.parent().find("." + o.railClass);
                    getBarHeight();
                    if ($.isPlainObject(options)) {
                        if ("height" in options && options.height == "auto") {
                            me.parent().css("height", "auto");
                            me.css("height", "auto");
                            var height = me.parent().parent().height();
                            me.parent().css("height", height);
                            me.css("height", height);
                        } else if ("height" in options) {
                            var h = options.height;
                            me.parent().css("height", h);
                            me.css("height", h);
                        }
                        if ("scrollTo" in options) {
                            offset = parseInt(o.scrollTo);
                        } else if ("scrollBy" in options) {
                            offset += parseInt(o.scrollBy);
                        } else if ("destroy" in options) {
                            bar.remove();
                            rail.remove();
                            me.unwrap();
                            return;
                        }
                        scrollContent(offset, false, true);
                    }
                    return;
                }
                o.height = o.height == "auto" ? me.parent().height() : o.height;
                var wrapper = $(divS).addClass(o.wrapperClass).css({
                    position: "relative",
                    overflow: "hidden",
                    width: o.width,
                    height: o.height
                });
                me.css({
                    overflow: "hidden",
                    width: o.width,
                    height: o.height
                });
                var rail = $(divS).addClass(o.railClass).css({
                    width: o.size,
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    display: o.alwaysVisible && o.railVisible ? "block" : "none",
                    "border-radius": o.railBorderRadius,
                    background: o.railColor,
                    opacity: o.railOpacity,
                    zIndex: 90
                });
                var bar = $(divS).addClass(o.barClass).css({
                    background: o.color,
                    width: o.size,
                    position: "absolute",
                    top: 0,
                    opacity: o.opacity,
                    display: o.alwaysVisible ? "block" : "none",
                    "border-radius": o.borderRadius,
                    BorderRadius: o.borderRadius,
                    MozBorderRadius: o.borderRadius,
                    WebkitBorderRadius: o.borderRadius,
                    zIndex: 99
                });
                var posCss = o.position == "right" ? {
                    right: o.distance
                } : {
                    left: o.distance
                };
                rail.css(posCss);
                bar.css(posCss);
                me.wrap(wrapper);
                me.parent().append(bar);
                me.parent().append(rail);
                if (o.railDraggable) {
                    bar.bind("mousedown", function(e) {
                        var $doc = $(document);
                        isDragg = true;
                        t = parseFloat(bar.css("top"));
                        pageY = e.pageY;
                        $doc.bind("mousemove.slimscroll", function(e) {
                            currTop = t + e.pageY - pageY;
                            bar.css("top", currTop);
                            scrollContent(0, bar.position().top, false);
                        });
                        $doc.bind("mouseup.slimscroll", function(e) {
                            isDragg = false;
                            hideBar();
                            $doc.unbind(".slimscroll");
                        });
                        return false;
                    }).bind("selectstart.slimscroll", function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    });
                }
                rail.hover(function() {
                    showBar();
                }, function() {
                    hideBar();
                });
                bar.hover(function() {
                    isOverBar = true;
                }, function() {
                    isOverBar = false;
                });
                me.hover(function() {
                    isOverPanel = true;
                    showBar();
                    hideBar();
                }, function() {
                    isOverPanel = false;
                    hideBar();
                });
                me.bind("touchstart", function(e, b) {
                    if (e.originalEvent.touches.length) {
                        touchDif = e.originalEvent.touches[0].pageY;
                    }
                });
                me.bind("touchmove", function(e) {
                    if (!releaseScroll) {
                        e.originalEvent.preventDefault();
                    }
                    if (e.originalEvent.touches.length) {
                        var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
                        scrollContent(diff, true);
                        touchDif = e.originalEvent.touches[0].pageY;
                    }
                });
                getBarHeight();
                if (o.start === "bottom") {
                    bar.css({
                        top: me.outerHeight() - bar.outerHeight()
                    });
                    scrollContent(0, true);
                } else if (o.start !== "top") {
                    scrollContent($(o.start).position().top, null, true);
                    if (!o.alwaysVisible) {
                        bar.hide();
                    }
                }
                attachWheel();
                function _onWheel(e) {
                    if (!isOverPanel) {
                        return;
                    }
                    var e = e || window.event;
                    var delta = 0;
                    if (e.wheelDelta) {
                        delta = -e.wheelDelta / 120;
                    }
                    if (e.detail) {
                        delta = e.detail / 3;
                    }
                    var target = e.target || e.srcTarget || e.srcElement;
                    if ($(target).closest("." + o.wrapperClass).is(me.parent())) {
                        scrollContent(delta, true);
                    }
                    if (e.preventDefault && !releaseScroll) {
                        e.preventDefault();
                    }
                    if (!releaseScroll) {
                        e.returnValue = false;
                    }
                }
                function scrollContent(y, isWheel, isJump) {
                    releaseScroll = false;
                    var delta = y;
                    var maxTop = me.outerHeight() - bar.outerHeight();
                    if (isWheel) {
                        delta = parseInt(bar.css("top")) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();
                        delta = Math.min(Math.max(delta, 0), maxTop);
                        delta = y > 0 ? Math.ceil(delta) : Math.floor(delta);
                        bar.css({
                            top: delta + "px"
                        });
                    }
                    percentScroll = parseInt(bar.css("top")) / (me.outerHeight() - bar.outerHeight());
                    delta = percentScroll * (me[0].scrollHeight - me.outerHeight());
                    if (isJump) {
                        delta = y;
                        var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
                        offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
                        bar.css({
                            top: offsetTop + "px"
                        });
                    }
                    me.scrollTop(delta);
                    me.trigger("slimscrolling", ~~delta);
                    showBar();
                    hideBar();
                }
                function attachWheel() {
                    if (window.addEventListener) {
                        this.addEventListener("DOMMouseScroll", _onWheel, false);
                        this.addEventListener("mousewheel", _onWheel, false);
                        this.addEventListener("MozMousePixelScroll", _onWheel, false);
                    } else {
                        document.attachEvent("onmousewheel", _onWheel);
                    }
                }
                function getBarHeight() {
                    barHeight = Math.max(me.outerHeight() / me[0].scrollHeight * me.outerHeight(), minBarHeight);
                    bar.css({
                        height: barHeight + "px"
                    });
                    var display = barHeight == me.outerHeight() ? "none" : "block";
                    bar.css({
                        display: display
                    });
                }
                function showBar() {
                    getBarHeight();
                    clearTimeout(queueHide);
                    if (percentScroll == ~~percentScroll) {
                        releaseScroll = o.allowPageScroll;
                        if (lastScroll != percentScroll) {
                            var msg = ~~percentScroll == 0 ? "top" : "bottom";
                            me.trigger("slimscroll", msg);
                        }
                    } else {
                        releaseScroll = false;
                    }
                    lastScroll = percentScroll;
                    if (barHeight >= me.outerHeight()) {
                        releaseScroll = true;
                        return;
                    }
                    bar.stop(true, true).fadeIn("fast");
                    if (o.railVisible) {
                        rail.stop(true, true).fadeIn("fast");
                    }
                }
                function hideBar() {
                    if (!o.alwaysVisible) {
                        queueHide = setTimeout(function() {
                            if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg) {
                                bar.fadeOut("slow");
                                rail.fadeOut("slow");
                            }
                        }, 1e3);
                    }
                }
            });
            return this;
        }
    });
    jQuery.fn.extend({
        slimscroll: jQuery.fn.slimScroll
    });
})(jQuery);

var graphLendbookDepthChartUSD;

var minZoom;

var maxZoom;

var lowestAsk;

var lowestBid;

var highestAsk;

var highestBid;

$(function() {
    $.getJSON("../json/swapstats/bitfinexSwapDepthChartUSDbids.json", function(bidsJSON) {
        $.getJSON("../json/swapstats/bitfinexSwapDepthChartUSDasks.json", function(asksJSON) {
            $.getJSON("../json/bitfinexFrrRateUSD.json", function(frrJSON) {
                highestAsk = parseFloat(asksJSON[asksJSON.length - 1][0]);
                highestBid = parseFloat(bidsJSON[bidsJSON.length - 1][0]);
                lowestAsk = parseFloat(asksJSON[0][0]);
                lowestBid = parseFloat(bidsJSON[0][0]);
                minZoom = parseFloat(highestBid) - .03;
                if (minZoom <= lowestBid) {
                    minZoom = lowestBid;
                }
                maxZoom = parseFloat(lowestAsk) + .03;
                Highcharts.setOptions({
                    global: {
                        useUTC: true
                    }
                });
                var frrFlagLable = "FRR: ";
                var frrValue = frrJSON.toString();
                var frrFlagTitle = frrFlagLable.concat(frrValue);
                var chartHeight = $("#lendbookDepthChart").height();
                var flagHeight = -.9 * chartHeight;
                graphLendbookDepthChartUSD = new Highcharts.Chart({
                    chart: {
                        renderTo: "lendbookDepthChart",
                        type: "area",
                        animation: false,
                        spacingTop: -10,
                        spacingBottom: 0,
                        spacingLeft: 0,
                        spacingRight: 0,
                        events: {
                            load: function() {
                                this.xAxis[0].setExtremes(minZoom, maxZoom);
                            }
                        },
                        resetZoomButton: {
                            theme: {
                                display: "none"
                            }
                        }
                    },
                    navigation: {
                        enabled: false,
                        buttonOptions: {
                            verticalAlign: "top",
                            x: -60,
                            y: -127
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: "",
                        style: {
                            display: "none"
                        }
                    },
                    xAxis: {
                        gridLineWidth: 1,
                        lineWidth: 1,
                        minorTickInterval: "auto",
                        minorTickColor: "#FEFEFE",
                        title: {
                            enabled: false,
                            text: "Rate DRKBTC",
                            style: {
                                fontWeight: "normal",
                                display: "none"
                            }
                        }
                    },
                    yAxis: {
                        gridLineWidth: 1,
                        minorTickInterval: "auto",
                        minorTickColor: "#FEFEFE",
                        opposite: true,
                        labels: {
                            align: "left",
                            x: 5,
                            y: 0,
                            enabled: true
                        },
                        title: {
                            enabled: false,
                            text: "Volume Sum",
                            style: {
                                fontWeight: "normal",
                                display: "none"
                            }
                        }
                    },
                    legend: {
                        align: "center",
                        verticalAlign: "top",
                        y: 10,
                        floating: true,
                        backgroundColor: "#FFFFFF",
                        shadow: true,
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            lineWidth: 1,
                            animation: false,
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        crosshairs: [ true, true ],
                        formatter: function() {
                            var s = "Sum: " + this.y;
                            s += "<br/>Rate: " + this.x;
                            return s;
                        }
                    },
                    series: [ {
                        name: "Bids",
                        id: "bids",
                        data: bidsJSON,
                        color: "rgba(204,63,51,1.0)",
                        fillColor: "rgba(204,63,51,0.2)"
                    }, {
                        name: "Asks",
                        id: "asks",
                        data: asksJSON,
                        color: "rgba(90,151,112,1.0)",
                        fillColor: "rgba(90,151,112,0.2)"
                    }, {
                        type: "flags",
                        name: "FRR",
                        data: [ {
                            x: frrJSON,
                            title: frrFlagTitle
                        } ],
                        shape: "squarepin",
                        y: flagHeight,
                        showInLegend: false
                    } ]
                });
            });
        });
    });
});

$("#zoomOut").click(function() {
    zoomMinDiff = minZoom - lowestBid;
    zoomMin = zoomMinDiff / 2;
    minZoom -= zoomMin;
    zoomPlusDiff = maxZoom - lowestAsk;
    zoomPlus = zoomPlusDiff * 1;
    maxZoom += zoomPlus;
    if (maxZoom >= highestAsk) {
        maxZoom = highestAsk;
    }
    graphLendbookDepthChartUSD.xAxis[0].setExtremes(minZoom, maxZoom);
});

$("#zoomIn").click(function() {
    zoomMinDiff = highestBid - minZoom;
    zoomMin = zoomMinDiff / 2;
    minZoom += zoomMin;
    zoomPlusDiff = maxZoom - lowestAsk;
    zoomPlus = zoomPlusDiff / 2;
    maxZoom -= zoomPlus;
    graphLendbookDepthChartUSD.xAxis[0].setExtremes(minZoom, maxZoom);
});

var last24HourRatioChart;

$(function() {
    $.getJSON("/json/variableFrrRatio24HourUSD.json", function(json) {
        Highcharts.setOptions({
            colors: [ "rgba(53,118,190,0.9)", "rgba(171,199,231,0.9)" ]
        });
        last24HourRatioChart = new Highcharts.Chart({
            chart: {
                renderTo: "ratioChart24h",
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                animation: false,
                spacingTop: -30,
                spacingBottom: 20,
                spacingLeft: 30,
                spacingRight: 30,
                backgroundColor: "rgba(255, 255, 255, 0)"
            },
            title: {
                text: "Sell / Buy Ratio (24h)",
                align: "center",
                verticalAlign: "middle",
                style: {
                    fontSize: "130%",
                    display: "none"
                },
                y: -60
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: "<b>{point.percentage:.1f}%</b>"
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -20,
                        style: {
                            fontWeight: "bold",
                            color: "white",
                            textShadow: "0px 1px 2px black"
                        }
                    },
                    animation: false,
                    startAngle: -90,
                    endAngle: 90,
                    center: [ "50%", "75%" ]
                }
            },
            series: [ {
                type: "pie",
                name: "Buy / Sell Ratio",
                innerSize: "50%",
                data: json
            } ]
        });
    });
});

var lastHourRatioChart;

$(function() {
    $.getJSON("/json/variableFrrRatioLastHourUSD.json", function(json) {
        Highcharts.setOptions({
            colors: [ "rgba(53,118,190,0.9)", "rgba(171,199,231,0.9)" ]
        });
        lastHourRatioChart = new Highcharts.Chart({
            chart: {
                renderTo: "ratioChart1h",
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                animation: false,
                spacingTop: -30,
                spacingBottom: 20,
                spacingLeft: 30,
                spacingRight: 30,
                backgroundColor: "rgba(255, 255, 255, 0)"
            },
            title: {
                text: "Sell / Buy Ratio (24h)",
                align: "center",
                verticalAlign: "middle",
                style: {
                    fontSize: "130%",
                    display: "none"
                },
                y: -60
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: "<b>{point.percentage:.1f}%</b>"
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -20,
                        style: {
                            fontWeight: "bold",
                            color: "white",
                            textShadow: "0px 1px 2px black"
                        }
                    },
                    animation: false,
                    startAngle: -90,
                    endAngle: 90,
                    center: [ "50%", "75%" ]
                }
            },
            series: [ {
                type: "pie",
                name: "Buy / Sell Ratio",
                innerSize: "50%",
                data: json
            } ]
        });
    });
});

var graphLastSwapsUSD;

var lastSwapTimestamp;

function round(value, exp) {
    if (typeof exp === "undefined" || +exp === 0) return Math.round(value);
    value = +value;
    exp = +exp;
    if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) return NaN;
    value = value.toString().split("e");
    value = Math.round(+(value[0] + "e" + (value[1] ? +value[1] + exp : exp)));
    value = value.toString().split("e");
    return +(value[0] + "e" + (value[1] ? +value[1] - exp : -exp));
}

function makeDate(timestamp) {
    var currentTime = new Date(timestamp);
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var nowTime = month + "-" + day + "-" + year + " time " + hours + ":" + minutes + ":" + seconds + " ";
    console.log("Time: " + nowTime);
}

function appendNewSwaps(data) {
    var amountSeries = graphLastSwapsUSD.series[1];
    var rateSeries = graphLastSwapsUSD.series[0];
    var swapJson = eval(data);
    swapJson.reverse();
    var dataLength = data.length;
    lastSwapInJsonTimestamp = parseInt(data[dataLength - 1]["timestamp"]) * 1e3;
    firstSwapInJsonTimestamp = parseInt(data[0]["timestamp"]) * 1e3;
    if (lastSwapInJsonTimestamp > lastSwapTimestamp) {
        var lastRow = dataLength - 1;
        for (i = 0; i < dataLength; i++) {
            var swapTimestamp = parseInt(data[i]["timestamp"]) * 1e3;
            if (swapTimestamp > lastSwapTimestamp) {
                swapRate = parseFloat(data[i]["rate"]);
                swapAmount = data[i]["amount"];
                var pointRate = [ swapTimestamp, swapRate ];
                var pointVolume = [ swapTimestamp, swapAmount ];
                if (i < lastRow) {
                    graphLastSwapsUSD.series[1].addPoint(pointVolume, false, false);
                    graphLastSwapsUSD.series[0].addPoint(pointRate, false, false);
                }
                if (i == lastRow) {
                    graphLastSwapsUSD.series[1].addPoint(pointVolume, true, true);
                    graphLastSwapsUSD.series[0].addPoint(pointRate, true, true);
                }
            }
        }
    }
}

$(function() {
    $.getJSON("../json/lastSwapsUSD.json", function(data) {
        Highcharts.setOptions({
            global: {
                useUTC: true
            }
        });
        var rate = [], volume = [], dataLength = data.length;
        for (i = 0; i < dataLength; i++) {
            var timestamp = data[i][0] / 1e3;
            timestamp = Math.floor(timestamp) * 1e3;
            rate.push([ timestamp, data[i][1] ]);
            var amount = data[i][2];
            volume.push([ timestamp, amount ]);
        }
        lastSwapTimestamp = parseInt(data[dataLength - 1][0]);
        var groupingUnits = [ [ "minute", [ 1 ] ], [ "minute", [ 15 ] ], [ "minute", [ 30 ] ], [ "hour", [ 1 ] ] ];
        graphLastSwapsUSD = new Highcharts.StockChart({
            chart: {
                renderTo: "lastSwapsChart",
                spacingTop: 0,
                spacingRight: 0,
                spacingLeft: 0
            },
            navigator: {
                height: 20,
                margin: 2
            },
            navigation: {
                buttonOptions: {
                    verticalAlign: "top",
                    y: 0,
                    x: -350
                }
            },
            rangeSelector: {
                inputPosition: {
                    x: -70,
                    y: 0
                },
                buttons: [ {
                    type: "hour",
                    count: 6,
                    text: "6h"
                }, {
                    type: "hour",
                    count: 24,
                    text: "24h"
                }, {
                    type: "day",
                    count: 7,
                    text: "7d"
                }, {
                    type: "all",
                    text: "All"
                } ],
                selected: 0
            },
            scrollbar: {
                enabled: false
            },
            title: {
                text: "Last USD Swaps",
                style: {
                    color: "rgba(55,77,108,0)",
                    fontSize: "22px",
                    display: "none"
                },
                y: 55,
                floating: false
            },
            xAxis: {
                type: "datetime",
                gridLineWidth: 1,
                minTickInterval: 6e4,
                title: {
                    enabled: false,
                    text: "Time",
                    style: {
                        fontWeight: "normal"
                    }
                }
            },
            credits: {
                enabled: true,
                href: "http://www.bfxdata.com",
                text: "BFXdata.com"
            },
            yAxis: [ {
                title: {
                    text: "Rate (% / day)"
                },
                labels: {
                    align: "left"
                },
                minorTickInterval: "auto",
                opposite: true
            }, {
                title: {
                    color: "rgba(0,0,0,0.4)",
                    text: "Volume (USD)"
                },
                labels: {
                    align: "right"
                },
                opposite: false
            } ],
            tooltip: {
                valueDecimals: 5
            },
            plotOptions: {
                series: {
                    animation: false,
                    groupPixelWidth: 2
                },
                candlestick: {
                    color: "#DD2F29",
                    upColor: "#87DA3B",
                    lineColor: "#666"
                }
            },
            series: [ {
                type: "spline",
                name: "Swap Rate USD",
                lineWidth: 1,
                color: "#428bca",
                data: rate,
                dataGrouping: {
                    enabled: true,
                    forced: true,
                    groupPixelWidth: 2,
                    approximation: "high",
                    units: [ [ "second", [ 1 ] ], [ "minute", [ 1 ] ], [ "minute", [ 2 ] ], [ "minute", [ 5 ] ], [ "minute", [ 15 ] ], [ "minute", [ 30 ] ], [ "hour", [ 1 ] ], [ "hour", [ 2 ] ], [ "hour", [ 3 ] ], [ "hour", [ 6 ] ], [ "hour", [ 12 ] ] ]
                }
            }, {
                type: "column",
                name: "Volume",
                data: volume,
                color: "rgba(0,0,0,0.4)",
                yAxis: 1,
                dataGrouping: {
                    enabled: true,
                    forced: true,
                    groupPixelWidth: 2,
                    units: [ [ "second", [ 1 ] ], [ "minute", [ 1 ] ], [ "minute", [ 2 ] ], [ "minute", [ 5 ] ], [ "minute", [ 15 ] ], [ "minute", [ 30 ] ], [ "hour", [ 1 ] ], [ "hour", [ 2 ] ], [ "hour", [ 3 ] ], [ "hour", [ 6 ] ], [ "hour", [ 12 ] ] ]
                }
            } ]
        });
    });
});

var socket;

var tickerLoaded = false;

var bfxdataTodayloaded = false;

var swapstatsTableFirstLoad = true;

var previousWidth;

var swapsOld;

var swapsCurrent;

var swapsNew;

var depthAsksOld = {};

var depthAsksCurrent;

var depthAsksNew = {};

var depthBidsOld = {};

var depthBidsCurrent;

var depthBidsNew = {};

var lastPID;

$(document).ready(function() {
    bfxdataToday();
    bfxdataToday1minute();
    makeSwapStatsTables();
    var screenWidth = $(window).width();
    tickerResize(screenWidth);
    footerFirstload(screenWidth);
    startwebsocketio();
    startTime();
});

$(window).resize(function() {
    var screenWidth = $(window).width();
    tickerResize(screenWidth);
    footerResize(screenWidth);
});

function tickerResize(size) {
    if (size <= 495) {
        var ticker = ' 			<div id="tickerTablediv" class="tickerTable" style="margin: auto;">								<table style="margin: auto;" class="text-nowrap">														<tbody><tr>																							<td colspan="4">																					<div id="clock"></div>								</td>																							</tr>																							<tr>																							<td class="ticker_bold" style="color:#428bca;">BTCUSD:</td>										<td class="ticker_bold">Bitfinex:</td>															<td style="color: rgb(255, 0, 0);" id="bitfinexBTCUSD">0</td>								<td class="ticker_bold text-nowrap">BTCe:</td>													<td id="btceBTCUSD">0</td>																<td class="ticker_bold">Bitstamp:</td>															<td id="bitstampBTCUSD">0</td>															</tr>																							<tr>																							<td class="ticker_bold" style="color:#428bca;">BTCCNY:</td>										<td class="ticker_bold">OkCoin:</td>															<td style="color: rgb(255, 0, 0);" id="okcoinBTCCNY">0</td>								<td class="ticker_bold">Huobi:</td>																<td style="color: rgb(255, 0, 0);" id="huobiBTCCNY">0</td>								<td class="ticker_bold">BtcChina:</td>															<td style="color: rgb(0, 128, 0);" id="btcchinaBTCCNY">0</td>							</tr>																							<tr>																							<td class="ticker_bold" style="color:#428bca;">LTCUSD:</td>										<td class="ticker_bold">Bitfinex:</td>															<td id="bitfinexLTCUSD">0</td>															<td class="ticker_bold text-nowrap">BTCe:</td>													<td id="btceLTCUSD">0</td>																</tr>																							<tr>																							<td class="ticker_bold" style="color:#428bca;">LTCCNY:</td>										<td class="ticker_bold">Okcoin:</td>															<td style="color: rgb(0, 128, 0);" id="okcoinLTCCNY">0</td>									<td class="ticker_bold">Huobi:</td>																<td id="huobiLTCCNY">0</td>																</tr>																						</tbody></table>																				</div>																							';
    }
    if (size >= 495 && size < 768) {
        var ticker = ' 			<div id="tickerTablediv" class="tickerTable" style="margin: auto;">								<table style="margin: auto;" class="text-nowrap">														<tbody><tr>																							<td class="ticker_bold" style="color:#428bca;">BTCUSD:</td>										<td class="ticker_bold">Bitfinex:</td>															<td style="color: rgb(255, 0, 0);" id="bitfinexBTCUSD">0</td>								<td class="ticker_bold text-nowrap">BTCe:</td>													<td id="btceBTCUSD">0</td>																<td class="ticker_bold">Bitstamp:</td>															<td id="bitstampBTCUSD">0</td>															</tr>																							<tr>																							<td class="ticker_bold" style="color:#428bca;">BTCCNY:</td>										<td class="ticker_bold">OkCoin:</td>															<td style="color: rgb(255, 0, 0);" id="okcoinBTCCNY">0</td>								<td class="ticker_bold">Huobi:</td>																<td style="color: rgb(255, 0, 0);" id="huobiBTCCNY">0</td>								<td class="ticker_bold">BtcChina:</td>															<td style="color: rgb(0, 128, 0);" id="btcchinaBTCCNY">0</td>							</tr>																							<tr>																							<td class="ticker_bold" style="color:#428bca;">LTCUSD:</td>										<td class="ticker_bold">Bitfinex:</td>															<td id="bitfinexLTCUSD">0</td>															<td class="ticker_bold text-nowrap">BTCe:</td>													<td id="btceLTCUSD">0</td>																<td rowspan="2" colspan="2">																					<div id="clock"></div>								</td>																							</tr>																							<tr>																							<td class="ticker_bold" style="color:#428bca;">LTCCNY:</td>										<td class="ticker_bold">Okcoin:</td>															<td style="color: rgb(0, 128, 0);" id="okcoinLTCCNY">0</td>									<td class="ticker_bold">Huobi:</td>																<td id="huobiLTCCNY">0</td>																</tr>																						</tbody></table>																				</div>																							';
    }
    if (size >= 768 && size < 1280) {
        var ticker = ' 			<div id="tickerTablediv" class="tickerTable" style="margin: auto;">								<table style="margin: auto;" class="text-nowrap">														<tbody><tr>																							<td colspan="2">																					<div id="clock"></div>								</td>																							<td class="ticker_bold" style="color:#428bca;">BTCUSD:</td>										<td class="ticker_bold">Bitfinex:</td>															<td style="color: rgb(255, 0, 0);" id="bitfinexBTCUSD">0</td>								<td class="ticker_bold text-nowrap">BTCe:</td>													<td id="btceBTCUSD">0</td>																<td class="ticker_bold">Bitstamp:</td>															<td id="bitstampBTCUSD">0</td>															<td class="ticker_bold" style="color:#428bca;">LTCUSD:</td>										<td class="ticker_bold">Bitfinex:</td>															<td id="bitfinexLTCUSD">0</td>															<td class="ticker_bold text-nowrap">BTCe:</td>													<td id="btceLTCUSD">0</td>																</tr>																							<tr>																							<td colspan="2">																				&nbsp; &nbsp;																				</td>																							<td class="ticker_bold" style="color:#428bca;">BTCCNY:</td>										<td class="ticker_bold">OkCoin:</td>															<td style="color: rgb(255, 0, 0);" id="okcoinBTCCNY">0</td>								<td class="ticker_bold">Huobi:</td>																<td style="color: rgb(255, 0, 0);" id="huobiBTCCNY">0</td>								<td class="ticker_bold">BtcChina:</td>															<td style="color: rgb(0, 128, 0);" id="btcchinaBTCCNY">0</td>							<td class="ticker_bold" style="color:#428bca;">LTCCNY:</td>										<td class="ticker_bold">Okcoin:</td>															<td style="color: rgb(0, 128, 0);" id="okcoinLTCCNY">0</td>									<td class="ticker_bold">Huobi:</td>																<td id="huobiLTCCNY">0</td>																</tr>																						</tbody></table>																				</div>																							';
    }
    if (size >= 1280 && size < 1366) {
        var ticker = ' 			<div id="clock"></div>					<div id="tickerTablediv" class="tickerTable" style="margin: auto;">								<table style="margin: auto;" class="text-nowrap">														<tbody><tr>																							<td class="ticker_bold" style="color:#428bca;">BTCUSD:</td>							<td class="ticker_bold">Bitfinex:</td>							<div><td id="bitfinexBTCUSD">0</td></div>							<td class="ticker_bold text-nowrap">BTCe:</td>							<div><td id="btceBTCUSD">0</td></div>							<td class="ticker_bold">Bitstamp:</td>							<div><td id="bitstampBTCUSD">0</td></div>							<td class="ticker_bold" style="color:#428bca;">BTCCNY:</td>							<td class="ticker_bold">Huobi:</td>							<div><td id="huobiBTCCNY">0</td></div>							<td class="ticker_bold">BtcChina:</td>							<div><td id="btcchinaBTCCNY">0</td></div>							<td class="ticker_bold">OkCoin:</td>							<div><td id="okcoinBTCCNY">0</td></div>							<td class="ticker_bold" style="color:#428bca;">LTCUSD:</td>							<td class="ticker_bold">Bitfinex:</td>							<div><td id="bitfinexLTCUSD">0</td></div>							<td class="ticker_bold text-nowrap">BTCe:</td>							<div><td id="btceLTCUSD">0</td></div>							<td class="ticker_bold" style="color:#428bca;">LTCCNY:</td>							<td class="ticker_bold">Okcoin:</td>							<div><td id="okcoinLTCCNY">0</td></div>							<td class="ticker_bold">Huobi:</td>							<div><td id="huobiLTCCNY">0</td></div>						</tr>																						</tbody></table>																				</div>																							';
    }
    if (size > 1366) {
        var ticker = ' 			<div id="tickerTablediv" class="tickerTable" style="margin: auto;">								<table style="margin: auto;" class="text-nowrap">					<tr>							<td colspan="2">																					<div id="clock"></div>								</td>																							<td class="ticker_bold" style="color:#428bca;">BTCUSD:</td>							<td class="ticker_bold">Bitfinex:</td>							<div><td id="bitfinexBTCUSD">0</td></div>							<td class="ticker_bold text-nowrap">BTCe:</td>							<div><td id="btceBTCUSD">0</td></div>							<td class="ticker_bold">Bitstamp:</td>							<div><td id="bitstampBTCUSD">0</td></div>							<td class="ticker_bold" style="color:#428bca;">BTCCNY:</td>							<td class="ticker_bold">Huobi:</td>							<div><td id="huobiBTCCNY">0</td></div>							<td class="ticker_bold">BtcChina:</td>							<div><td id="btcchinaBTCCNY">0</td></div>							<td class="ticker_bold">OkCoin:</td>							<div><td id="okcoinBTCCNY">0</td></div>							<td class="ticker_bold" style="color:#428bca;">LTCUSD:</td>							<td class="ticker_bold">Bitfinex:</td>							<div><td id="bitfinexLTCUSD">0</td></div>							<td class="ticker_bold text-nowrap">BTCe:</td>							<div><td id="btceLTCUSD">0</td></div>							<td class="ticker_bold" style="color:#428bca;">LTCCNY:</td>							<td class="ticker_bold">Okcoin:</td>							<div><td id="okcoinLTCCNY">0</td></div>							<td class="ticker_bold">Huobi:</td>							<div><td id="huobiLTCCNY">0</td></div>						</tr>					</table>					</div>																							';
    }
    document.getElementById("ticker").innerHTML = ticker;
    tickerLoaded = false;
    setTimeout(function() {
        updateTicker();
    }, 500);
}

function footerFirstload(screenWidth) {
    if (screenWidth < 1280) {
        $("#footerContainer").load("../assets/include/divFooterSmall.php");
    }
    if (screenWidth >= 1280) {
        $("#footerContainer").load("../assets/include/divFooterBig.php");
    }
    if (screenWidth < 1366) {
        var swapTableHeight = "305px";
        var depthTableHeight = "295px";
    } else {
        var swapTableHeight = "415px";
        var depthTableHeight = "415px";
    }
    $("#swapsTableDiv").slimscroll({
        height: swapTableHeight,
        width: "100%"
    });
    $("#asksTableDiv").slimscroll({
        height: depthTableHeight,
        width: "100%"
    });
    $("#bidsTableDiv").slimscroll({
        height: depthTableHeight,
        width: "100%"
    });
    previousWidth = screenWidth;
}

function footerResize(screenWidth) {
    if (screenWidth < 1280 && previousWidth >= 1280) {
        $("#footerContainer").load("../assets/include/divFooterSmall.php");
    }
    if (screenWidth >= 1280 && previousWidth < 1280) {
        $("#footerContainer").load("../assets/include/divFooterBig.php");
    }
    if (screenWidth < 1366) {
        var swapTableHeight = "305px";
        var depthTableHeight = "295px";
    } else {
        var swapTableHeight = "415px";
        var depthTableHeight = "415px";
    }
    $("#swapsTableDiv").slimscroll({
        height: swapTableHeight,
        width: "100%"
    });
    $("#asksTableDiv").slimscroll({
        height: depthTableHeight,
        width: "100%"
    });
    $("#bidsTableDiv").slimscroll({
        height: depthTableHeight,
        width: "100%"
    });
    previousWidth = screenWidth;
}

function startwebsocketio() {
    var url = "https://" + window.location.hostname + ":3001";
    socket = io.connect(url, {
        secure: true
    });
    var channels = [ "swapstatsUSD", "bfxdataToday", "bfxdataToday1Minute", "bitfinexFrrRateUSD", "variableFrrRatio24HourUSD", "variableFrrRatioLastHourUSD", "variableFrrVolumes24HourUSD", "variableFrrVolumesLastHourUSD", "bitfinexSwapDepthChartUSDasks", "bitfinexSwapDepthChartUSDbids", "bitfinexSwapDepthUSD", "last50SwapsTableUSD" ];
    socket.on("connect", function() {
        socket.emit("adduser", randomUsername());
        channels.forEach(function(channel) {
            socket.emit("switchChannel", channel);
        });
        console.log("connected");
    });
    socket.on("dataupdate", function(username, data) {
        try {
            jsonObject = data;
            jsonObject = JSON.parse(jsonObject);
        } catch (ex) {}
        try {
            var keyname = Object.keys(jsonObject);
            keyname = String(keyname);
            switch (keyname) {
              case "ticker_rt":
                data = jsonObject[keyname];
                updateTickerValues(data);
                break;

              case "bfxdataToday":
              case "bfxdataToday1Minute":
                data = jsonObject[keyname];
                updateValues(data);
                break;

              case "bitfinexSwapDepthUSD":
                data = jsonObject[keyname];
                if (!swapstatsTableFirstLoad) {
                    data = eval(data);
                    depthBidsNew = makeDepthObject(data["bids"]);
                    depthAsksNew = makeDepthObject(data["asks"]);
                    combineOldNewDepth();
                }
                break;

              case "last50SwapsTableUSD":
                data = jsonObject[keyname];
                if (!swapstatsTableFirstLoad) {
                    data = eval(data);
                    swapsNew = data;
                    combineOldNewSwaps();
                    appendNewSwaps(data);
                }
                break;

              case "variableFrrVolumesLastHourUSD":
                data = jsonObject[keyname];
                if (!swapstatsTableFirstLoad) {
                    data = eval(data);
                    makeVolume1hTable(data);
                }
                break;

              case "variableFrrVolumes24HourUSD":
                data = jsonObject[keyname];
                if (!swapstatsTableFirstLoad) {
                    data = eval(data);
                    makeVolume24hTable(data);
                }
                break;

              case "bitfinexSwapDepthChartUSDbids":
                data = jsonObject[keyname];
                data = eval(data);
                graphLendbookDepthChartUSD.series[0].setData(data, true, true, true);
                break;

              case "bitfinexSwapDepthChartUSDasks":
                data = jsonObject[keyname];
                data = eval(data);
                graphLendbookDepthChartUSD.series[1].setData(data, true, true, true);
                break;

              case "variableFrrRatioLastHourUSD":
                data = jsonObject[keyname];
                data = eval(data);
                lastHourRatioChart.series[0].setData(data, true, true, true);
                break;

              case "variableFrrRatio24HourUSD":
                data = jsonObject[keyname];
                data = eval(data);
                last24HourRatioChart.series[0].setData(data, true, true, true);
                break;

              default:            }
        } catch (ex) {}
    });
}

function makeSwapStatsTables() {
    var screenWidth = $(window).width();
    if (screenWidth < 1570) {
        var swapTableHeight = "305px";
        var depthTableHeight = "295px";
    } else {
        var swapTableHeight = "415px";
        var depthTableHeight = "415px";
    }
    var swapsTableUSD = ' 	<div> 	  <table class=" table table-condensed table-hover" id="swaps" title="Rate | Amount | Period | Time"> 		<tbody id="swapsTableBody" > 		</tbody> 	</div> 	</table> 	';
    document.getElementById("swapsTableDiv").innerHTML = swapsTableUSD;
    $("#swapsTableDiv").slimscroll({
        height: swapTableHeight,
        width: "100%"
    });
    var asksTableUSD = ' 			<div> 			  <table class=" table table-condensed table-hover" id="asks" title="Rate | Period | Amount | Sum"> 				<tbody id="asksTableBody"> 				</tbody> 			</table> 	</div> 	';
    document.getElementById("asksTableDiv").innerHTML = asksTableUSD;
    $("#asksTableDiv").slimscroll({
        height: depthTableHeight,
        width: "100%"
    });
    var bidsTableUSD = ' 			<div> 			  <table class=" table table-condensed table-hover" id="bids" title="Rate | Period | Amount | Sum"> 				<tbody id="bidsTableBody"> 				</tbody> 			</table> 	</div> 	';
    document.getElementById("bidsTableDiv").innerHTML = bidsTableUSD;
    $("#bidsTableDiv").slimscroll({
        height: depthTableHeight,
        width: "100%"
    });
    var volume1hTableUSD = ' 			<div> 			  <table class=" table table-condensed " id="volume1hTable"> 				<tbody id="volume1hTableBody"> 				</tbody> 			</table> 	</div> 	';
    document.getElementById("volume1hTableDiv").innerHTML = volume1hTableUSD;
    var volume24hTableUSD = ' 			<div> 			  <table class=" table table-condensed " id="volume24hTable"> 				<tbody id="volume24hTableBody"> 				</tbody> 			</table> 	</div> 	';
    document.getElementById("volume24hTableDiv").innerHTML = volume24hTableUSD;
    ajaxVolumeTables();
    ajaxSwapstatsTables();
}

function ajaxVolumeTables() {
    urlVolume1Hour = "../json/variableFrrVolumesLastHourUSD.json";
    urlVolume24Hour = "../json/variableFrrVolumes24HourUSD.json";
    ajaxNewVolume1HourJson(urlVolume1Hour).then(ajaxNewVolume24HourJson(urlVolume24Hour));
}

function ajaxSwapstatsTables() {
    urlDepth = "../json/swapstats/bitfinexSwapDepthUSD.json";
    urlSwaps = "../json/swapstats/last50SwapsTableUSD.json";
    ajaxNewDepthJson(urlDepth);
    ajaxNewSwapsJson(urlSwaps);
    swapstatsTableFirstLoad = false;
}

function ajaxNewVolume1HourJson(urlVolume1Hour) {
    var ajaxData = 1;
    $.ajax({
        url: urlVolume1Hour,
        type: "GET",
        dataType: "json",
        timeout: 3e3,
        cache: false,
        success: function(data) {
            data = eval(data);
            makeVolume1hTable(data);
        },
        error: function(x, t, m) {
            if (t === "timeout") {
                console.log(urlVolume1Hour + " timeout");
            } else {
                console.log("Error: " + urlVolume1Hour + " || " + t);
            }
        }
    });
    return $.when(ajaxData);
}

function ajaxNewVolume24HourJson(urlVolume24Hour) {
    var ajaxData = 1;
    $.ajax({
        url: urlVolume24Hour,
        type: "GET",
        dataType: "json",
        timeout: 3e3,
        cache: false,
        success: function(data) {
            data = eval(data);
            makeVolume24hTable(data);
        },
        error: function(x, t, m) {
            if (t === "timeout") {
                console.log(urlVolume24Hour + " timeout");
            } else {
                console.log("Error: " + urlVolume24Hour + " || " + t);
            }
        }
    });
    return $.when(ajaxData);
}

function ajaxNewSwapsJson(urlSwaps) {
    $.ajax({
        url: urlSwaps,
        type: "GET",
        dataType: "json",
        timeout: 3e3,
        cache: false,
        success: function(data) {
            data = eval(data);
            swapsOld = data;
            swapsNew = data;
            makeSwapsTable(data);
        },
        error: function(x, t, m) {
            if (t === "timeout") {
                console.log(urlTrades + " timeout");
            } else {
                console.log("Error: " + urlTrades + " || " + t);
            }
        }
    });
}

function ajaxNewDepthJson(urlDepth) {
    $.ajax({
        url: urlDepth,
        type: "GET",
        dataType: "json",
        timeout: 3e3,
        cache: false,
        success: function(data) {
            data = eval(data);
            depthBidsOld = makeDepthObject(data["bids"]);
            depthAsksOld = makeDepthObject(data["asks"]);
            depthBidsNew = depthBidsOld;
            depthAsksNew = depthAsksOld;
            makeBidsTable(data["bids"]);
            makeAsksTable(data["asks"]);
        },
        error: function(x, t, m) {
            if (t === "timeout") {
                console.log(urlDepth + " timeout");
            } else {
                console.log("Error: " + urlDepth + " || " + t);
            }
        }
    });
}

function combineOldNewSwaps() {
    var oldPidArray = [];
    for (i = 0; i < swapsOld.length; i++) {
        var pid = swapsOld[i]["pid"];
        oldPidArray.push(pid);
    }
    var combinedSwaps = [];
    var combiPidArray = [];
    swapsCombi = _.union(swapsOld, swapsNew);
    for (i = 0; i < swapsCombi.length; i++) {
        var pid = swapsCombi[i]["pid"];
        if (combiPidArray.indexOf(pid) < 0) {
            combiPidArray.push(pid);
            combinedSwaps.push(swapsCombi[i]);
        }
    }
    combinedSwaps.sort(function(a, b) {
        return b.pid - a.pid;
    });
    addToSwapsTable(combinedSwaps, oldPidArray);
}

function makeDepthObject(json) {
    obj = {};
    for (i = 0; i < json.length; i++) {
        timestamp = json[i]["timestamp"];
        rate = parseFloat(json[i]["rate"]);
        amount = parseFloat(json[i]["amount"]);
        period = parseInt(json[i]["period"]);
        value = {};
        value["rate"] = rate;
        value["period"] = period;
        value["amount"] = amount;
        value["timestamp"] = timestamp;
        obj[timestamp] = value;
    }
    return obj;
}

function combineOldNewDepth() {
    depthAsksOldNewCombined = [];
    depthBidsOldNewCombined = [];
    for (var timestamp in depthAsksNew) {
        if (depthAsksNew.hasOwnProperty(timestamp)) {
            if (depthAsksOld.hasOwnProperty(timestamp)) {
                properties = depthAsksNew[timestamp];
                value = {};
                value["rate"] = properties["rate"];
                value["period"] = properties["period"];
                value["amount"] = properties["amount"];
                value["timestamp"] = timestamp;
                value["changed"] = "same";
                depthAsksOldNewCombined.push(value);
            } else {
                properties = depthAsksNew[timestamp];
                value = {};
                value["rate"] = properties["rate"];
                value["period"] = properties["period"];
                value["amount"] = properties["amount"];
                value["timestamp"] = timestamp;
                value["changed"] = "new";
                depthAsksOldNewCombined.push(value);
            }
        }
    }
    for (var timestamp in depthAsksOld) {
        if (depthAsksOld.hasOwnProperty(timestamp)) {
            if (!depthAsksNew.hasOwnProperty(timestamp)) {
                properties = depthAsksOld[timestamp];
                value = {};
                value["rate"] = properties["rate"];
                value["period"] = properties["period"];
                value["amount"] = properties["amount"];
                value["timestamp"] = timestamp;
                value["changed"] = "deleted";
                depthAsksOldNewCombined.push(value);
            }
        }
    }
    depthAsksOldNewCombined.sort(firstBy(function(v1, v2) {
        return v1.rate - v2.rate;
    }).thenBy(function(v1, v2) {
        return v1.timestamp - v2.timestamp;
    }));
    for (var timestamp in depthBidsNew) {
        if (depthBidsNew.hasOwnProperty(timestamp)) {
            if (depthBidsOld.hasOwnProperty(timestamp)) {
                properties = depthBidsNew[timestamp];
                value = {};
                value["rate"] = properties["rate"];
                value["period"] = properties["period"];
                value["amount"] = properties["amount"];
                value["timestamp"] = timestamp;
                value["changed"] = "same";
                depthBidsOldNewCombined.push(value);
            } else {
                properties = depthBidsNew[timestamp];
                value = {};
                value["rate"] = properties["rate"];
                value["period"] = properties["period"];
                value["amount"] = properties["amount"];
                value["timestamp"] = timestamp;
                value["changed"] = "new";
                depthBidsOldNewCombined.push(value);
            }
        }
    }
    for (var timestamp in depthBidsOld) {
        if (depthBidsOld.hasOwnProperty(timestamp)) {
            if (!depthBidsNew.hasOwnProperty(timestamp)) {
                properties = depthBidsOld[timestamp];
                value = {};
                value["rate"] = properties["rate"];
                value["period"] = properties["period"];
                value["amount"] = properties["amount"];
                value["timestamp"] = timestamp;
                value["changed"] = "deleted";
                depthBidsOldNewCombined.push(value);
            }
        }
    }
    depthBidsOldNewCombined.sort(firstBy(function(v1, v2) {
        return v1.rate - v2.rate;
    }).thenBy(function(v1, v2) {
        return v1.timestamp - v2.timestamp;
    }));
    depthAsksOld = depthAsksNew;
    depthBidsOld = depthBidsNew;
    addToDepthBidsTable(depthBidsOldNewCombined);
    addToDepthAsksTable(depthAsksOldNewCombined);
}

firstBy = function() {
    function n(n, t) {
        if ("function" != typeof n) {
            var r = n;
            n = function(n, t) {
                return n[r] < t[r] ? -1 : n[r] > t[r] ? 1 : 0;
            };
        }
        return -1 === t ? function(t, r) {
            return -n(t, r);
        } : n;
    }
    function t(t, u) {
        return t = n(t, u), t.thenBy = r, t;
    }
    function r(r, u) {
        var f = this;
        return r = n(r, u), t(function(n, t) {
            return f(n, t) || r(n, t);
        });
    }
    return t;
}();

function makeAsksTable(data) {
    $("#asksTableBody").empty();
    var sum = 0;
    jQuery.each(data, function(i, val) {
        var rate = parseFloat(val["rate"]) / 365;
        var period = parseInt(val["period"]);
        if (rate > 0 && rate < 1) {
            var amount = parseFloat(val["amount"]);
            sum = sum + amount;
            $("#asksTableBody").append("<tr><td class='td_rate'>" + formatNumber(rate, 5) + "</td><td>" + period + "</td><td class='td_amount'>" + formatNumber(amount, 2) + "</td><td class='td_sum'>" + formatNumber(sum, 0) + "</td></tr>");
        }
    });
}

function makeBidsTable(data) {
    $("#bidsTableBody").empty();
    var sum = 0;
    jQuery.each(data, function(i, val) {
        var rate = parseFloat(val["rate"]) / 365;
        var period = parseInt(val["period"]);
        if (rate > 0 && rate < 1) {
            var amount = parseFloat(val["amount"]);
            sum = sum + amount;
            $("#bidsTableBody").append("<tr><td class='td_rate'>" + formatNumber(rate, 5) + "</td><td>" + period + "</td><td class='td_amount'>" + formatNumber(amount, 2) + "</td><td class='td_sum'>" + formatNumber(sum, 0) + "</td></tr>");
        }
    });
}

function makeSwapsTable(data) {
    $("#swapsTableBody").empty();
    jQuery.each(data, function(i, val) {
        var rate = parseFloat(val["rate"]);
        var amount = parseFloat(val["amount"]);
        var period = parseInt(val["period"]);
        $("#swapsTableBody").append("<tr><td class='td_rate' >" + formatNumber(rate, 5) + "</td><td class='td_amount' >" + formatNumber(amount, 2) + "</td><td class='td_type' >" + period + "</td><td class='td_timestamp'>" + timeConverter(val["timestamp"]) + "</td></tr>");
    });
    lastPID = parseFloat(data[0]["pid"]);
}

function makeVolume1hTable(data) {
    $("#volume1hTableBody").empty();
    var totalVolume = parseFloat(data[2]);
    var buyVolume = parseFloat(data[1]);
    var sellVolume = parseFloat(data[0]);
    $("#volume1hTableBody").append("<tr><td class='volumTableLabel'>Fixed</td><td class='volumTableValue'>" + formatNumber(sellVolume, 3) + "</td></tr><tr><td class='volumTableLabel'>FRR</td><td class='volumTableValue'>" + formatNumber(buyVolume, 3) + "</td></tr><tr><td class='volumTableLabel'>Total</td><td class='volumTableValue'>" + formatNumber(totalVolume, 3) + "</td></tr>");
}

function makeVolume24hTable(data) {
    $("#volume24hTableBody").empty();
    var totalVolume = parseFloat(data[2]);
    var buyVolume = parseFloat(data[1]);
    var sellVolume = parseFloat(data[0]);
    $("#volume24hTableBody").append("<tr><td class='volumTableLabel'>Fixed</td><td class='volumTableValue'>" + formatNumber(sellVolume, 3) + "</td></tr><tr><td class='volumTableLabel'>FRR</td><td class='volumTableValue'>" + formatNumber(buyVolume, 3) + "</td></tr><tr><td class='volumTableLabel'>Total</td><td class='volumTableValue'>" + formatNumber(totalVolume, 3) + "</td></tr>");
}

function randomUsername() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = "user_";
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    str = window.location.href;
    str = str.replace("https://www.bfxdata.com/", "");
    str = str.replace("https://bfxdata.com/", "");
    str = str.replace("http://www.bfxdata.com/", "");
    str = str.replace("http://bfxdata.com/", "");
    str = str.replace(/\//g, "_");
    randomstring += "_" + str;
    var d = new Date();
    var n = d.getTime();
    randomstring += "_" + n;
    return randomstring;
}

function updateTicker() {
    $.ajax({
        url: "../json/ticker_rt.json",
        type: "GET",
        dataType: "json",
        timeout: 3e3,
        cache: false,
        success: function(data) {
            data = eval(data);
            updateTickerValues(data);
            tickerLoaded = true;
        },
        error: function(x, t, m) {
            if (t === "timeout") {
                console.log("Error: ticker datarequest timeout");
            } else {
                console.log("Error: " + t);
            }
        }
    });
}

function updateTickerValue(keystring, updatedValue) {
    var divID = "#" + keystring;
    updatedValue = parseFloat(updatedValue);
    var oldValue = $(divID).text();
    while (oldValue.indexOf(",") != -1) {
        oldValue = oldValue.replace(",", "");
    }
    oldValue = parseFloat(oldValue);
    var keySymbbol = keystring.substr(keystring.length - 6);
    if (keySymbbol == "BTCUSD") {
        var decimals = 3;
    } else if (keySymbbol == "LTCUSD") {
        var decimals = 5;
    } else if (keySymbbol == "BTCCNY") {
        var decimals = 2;
    } else if (keySymbbol == "LTCCNY") {
        var decimals = 2;
    } else {
        var decimals = 1;
    }
    if (updatedValue > oldValue) {
        if (tickerLoaded) {
            $(divID).css("color", "green");
        }
        $(divID).html(formatTickerNumber(updatedValue, decimals));
    }
    if (updatedValue < oldValue) {
        if (tickerLoaded) {
            $(divID).css("color", "red");
        }
        $(divID).html(formatTickerNumber(updatedValue, decimals));
    }
}

function updateTickerValues(data) {
    jQuery.each(data, function(keystring, valuestring) {
        updatedValue = valuestring;
        updateTickerValue(keystring, updatedValue);
    });
}

function formatTickerNumber(number, decimals) {
    number = number.toFixed(decimals) + "";
    x = number.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
}

function bfxdataToday() {
    $.ajax({
        url: "../json/bfxdataToday.json",
        type: "GET",
        dataType: "json",
        timeout: 3e3,
        cache: false,
        success: function(data) {
            data = eval(data);
            updateValues(data);
        },
        error: function(x, t, m) {
            if (t === "timeout") {
                console.log("Statstabale timeout");
            } else {
                console.log("Error: " + t);
            }
        }
    });
}

function bfxdataToday1minute() {
    $.ajax({
        url: "../json/bfxdataToday1Minute.json",
        type: "GET",
        dataType: "json",
        timeout: 3e3,
        cache: false,
        success: function(data) {
            data = eval(data);
            updateValues(data);
            bfxdataTodayloaded = true;
        },
        error: function(x, t, m) {
            if (t === "timeout") {
                console.log("Statstabale 1m timeout");
            } else {
                console.log("Error: " + t);
            }
        }
    });
}

function updateValue(keystring, updatedValue) {
    var divID = "#" + keystring;
    updatedValue = parseFloat(updatedValue);
    var oldValue = $(divID).text();
    while (oldValue.indexOf(",") != -1) {
        oldValue = oldValue.replace(",", "");
    }
    oldValue = parseFloat(oldValue);
    var keyNoSymbol = keystring.substr(0, keystring.length - 6);
    if (keystring == "priceBTCUSD" || keystring == "bidBTCUSD" || keystring == "askBTCUSD" || keystring == "minBTCUSD" || keystring == "maxBTCUSD" || keystring == "maxBTCUSD" || keyNoSymbol == "volex" || keyNoSymbol == "change24rel" || keyNoSymbol == "volumeChange" || keystring == "vwap24BTCUSD" || keystring == "change24absBTCUSD" || keystring == "maxBTCUSD") {
        var decimals = 3;
    } else if (keyNoSymbol == "todayVolume" || keyNoSymbol == "volumeWeek" || keyNoSymbol == "volumeMonth" || keystring == "swapVolume1hUSD" || keystring == "swapVolume1hBTC" || keystring == "swapVolume1hLTC" || keystring == "swapVolume24hUSD" || keystring == "swapVolume24hBTC" || keystring == "swapVolume24hLTC") {
        var decimals = 0;
    } else if (keystring == "changeAbsoluteTotalAvgRateUSD" || keystring == "changeAbsoluteTotalAvgRateBTC" || keystring == "changeAbsoluteTotalAvgRateLTC") {
        var decimals = 7;
    } else if (keystring == "totalAmountUSD" || keystring == "totalAmountBTC" || keystring == "totalAmountLTC" || keystring == "changeAbsoluteTotalAmountUSD" || keystring == "changeAbsoluteTotalAmountBTC" || keystring == "changeAbsoluteTotalAmountLTC") {
        var decimals = 0;
    } else {
        var decimals = 5;
    }
    if (updatedValue > oldValue) {
        if (bfxdataTodayloaded) {
            $(divID).parent().animate({
                backgroundColor: "rgba(90,151,112,0.3)"
            }, 300);
            $(divID).parent().animate({
                backgroundColor: "rgba(255,255,255,0)"
            }, 3e3);
        }
        if (keyNoSymbol == "change24rel" || keyNoSymbol == "volumeChange" || keystring == "lastSwapUSD" || keystring == "lastSwapBTC" || keystring == "lastSwapLTC") {
            $(divID).html(formatNumber(updatedValue, decimals) + " %");
        } else {
            $(divID).html(formatNumber(updatedValue, decimals));
        }
    }
    if (updatedValue < oldValue) {
        if (bfxdataTodayloaded) {
            $(divID).parent().animate({
                backgroundColor: "rgba(204,63,51,0.3)"
            }, 300);
            $(divID).parent().animate({
                backgroundColor: "rgba(255,255,255,0)"
            }, 3e3);
        }
        if (keyNoSymbol == "change24rel" || keyNoSymbol == "volumeChange" || keystring == "lastSwapUSD" || keystring == "lastSwapBTC" || keystring == "lastSwapLTC") {
            $(divID).html(formatNumber(updatedValue, decimals) + " %");
        } else {
            $(divID).html(formatNumber(updatedValue, decimals));
        }
    }
    if (keyNoSymbol == "change24rel" || keyNoSymbol == "volumeChange" || keyNoSymbol == "change24abs" || keystring == "changeAbsoluteTotalAmountUSD" || keystring == "changeAbsoluteTotalAmountBTC" || keystring == "changeAbsoluteTotalAmountLTC" || keystring == "changeAbsoluteTotalAvgRateUSD" || keystring == "changeAbsoluteTotalAvgRateBTC" || keystring == "changeAbsoluteTotalAvgRateLTC") {
        changeFontColor(divID, updatedValue);
    }
}

function updateValues(data) {
    jQuery.each(data, function(keystring, valuestring) {
        updatedValue = valuestring[0];
        updateValue(keystring, updatedValue);
    });
}

function changeFontColor(divID, updatedValue) {
    if (updatedValue > 0) {
        $(divID).css("color", "green");
    }
    if (updatedValue < 0) {
        $(divID).css("color", "red");
    }
}

function formatNumber(number, decimals) {
    number = number.toFixed(decimals) + "";
    x = number.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
}

function startTime() {
    var today = new Date();
    var h = today.getUTCHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("clock").innerHTML = h + ":" + m + ":" + s + " (UTC)" + "&nbsp &nbsp &nbsp;";
    var t = setTimeout(function() {
        startTime();
    }, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function addToDepthBidsTable(depthBidsOldNewCombined) {
    var sum = 0;
    var amount;
    var changed;
    $("#bidsTableBody").empty();
    depthBidsOldNewCombined.reverse();
    for (var i = 0, len = depthBidsOldNewCombined.length; i < len; i++) {
        row = depthBidsOldNewCombined[i];
        amount = parseFloat(row.amount);
        changed = row.changed;
        rate = row.rate / 365;
        period = row.period;
        switch (changed) {
          case "same":
            sum = sum + amount;
            $("#bidsTableBody").append("<tr><td class='td_rate'>" + formatNumber(rate, 5) + "</td><td>" + period + "</td><td class='td_amount'>" + formatNumber(amount, 2) + "</td><td class='td_sum'>" + formatNumber(sum, 0) + "</td></tr>");
            break;

          case "new":
            sum = sum + amount;
            $("#bidsTableBody").append("<tr><td class='td_rate'><div class='new_bids_table_entry'>" + formatNumber(rate, 5) + "</div></td><td><div class='new_bids_table_entry'>" + period + "</div></td><td class='td_amount'><div class='new_bids_table_entry'>" + formatNumber(amount, 2) + "</div></td><td class='td_sum'><div class='new_bids_table_entry'>" + formatNumber(sum, 0) + "</div></td></tr>");
            break;

          case "deleted":
            $("#bidsTableBody").append("<tr><td class='td_rate'><div class='removed_bids_table_entry'>" + formatNumber(rate, 5) + "</div></td><td><div class='removed_bids_table_entry'>" + period + "</div></td><td class='td_amount'><div class='removed_bids_table_entry'>" + formatNumber(amount, 2) + "</div></td><td class='td_sum'><div class='removed_bids_table_entry'> - </div></td></tr>");
            break;
        }
    }
    $(".removed_bids_table_entry").css("text-decoration", "line-through");
    setTimeout(function() {
        $(".removed_bids_table_entry").slideUp(500);
    }, 4500);
    setTimeout(function() {
        $(".removed_bids_tr").remove();
    }, 5e3);
    $(".new_bids_table_entry").css("font-weight", "bold");
    $(".new_bids_table_entry").hide();
    setTimeout(function() {
        $(".new_bids_table_entry").slideDown(1e3);
    }, 1);
    setTimeout(function() {
        $(".new_bids_table_entry").css("font-weight", "300");
    }, 6e3);
}

function addToDepthAsksTable(depthAsksOldNewCombined) {
    var sum = 0;
    var amount;
    var changed;
    $("#asksTableBody").empty();
    for (var i = 0, len = depthAsksOldNewCombined.length; i < len; i++) {
        row = depthAsksOldNewCombined[i];
        amount = parseFloat(row.amount);
        changed = row.changed;
        rate = row.rate / 365;
        period = row.period;
        switch (changed) {
          case "same":
            sum = sum + amount;
            $("#asksTableBody").append("<tr><td class='td_rate'>" + formatNumber(rate, 5) + "</td><td>" + period + "</td><td class='td_amount'>" + formatNumber(amount, 2) + "</td><td class='td_sum'>" + formatNumber(sum, 0) + "</td></tr>");
            break;

          case "new":
            sum = sum + amount;
            $("#asksTableBody").append("<tr><td class='td_rate'><div class='new_asks_table_entry'>" + formatNumber(rate, 5) + "</div></td><td><div class='new_asks_table_entry'>" + period + "</div></td><td class='td_amount'><div class='new_asks_table_entry'>" + formatNumber(amount, 2) + "</div></td><td class='td_sum'><div class='new_asks_table_entry'>" + formatNumber(sum, 0) + "</div></td></tr>");
            break;

          case "deleted":
            $("#asksTableBody").append("<tr><td class='td_rate'><div class='removed_asks_table_entry'>" + formatNumber(rate, 5) + "</div></td><td><div class='removed_asks_table_entry'>" + period + "</div></td><td class='td_amount'><div class='removed_asks_table_entry'>" + formatNumber(amount, 2) + "</div></td><td class='td_sum'><div class='removed_asks_table_entry'> - </div></td></tr>");
            break;
        }
    }
    $(".removed_asks_table_entry").css("text-decoration", "line-through");
    setTimeout(function() {
        $(".removed_asks_table_entry").slideUp(500);
    }, 4500);
    setTimeout(function() {
        $(".removed_asks_tr").remove();
    }, 5e3);
    $(".new_asks_table_entry").css("font-weight", "bold");
    $(".new_asks_table_entry").hide();
    setTimeout(function() {
        $(".new_asks_table_entry").slideDown(1e3);
    }, 1);
    setTimeout(function() {
        $(".new_asks_table_entry").css("font-weight", "300");
    }, 6e3);
}

function addToSwapsTable(combinedSwaps, oldPidArray) {
    newPID = parseFloat(combinedSwaps[0]["pid"]);
    $("#swapsTableBody").empty();
    combinedSwaps.reverse();
    jQuery.each(combinedSwaps, function(i, val) {
        var lastRate = parseFloat(val["rate"]);
        var amount = parseFloat(val["amount"]);
        var period = parseInt(val["period"]);
        var pid = val["pid"];
        if (pid > lastPID) {
            $("#swapsTableBody").prepend("<tr class='new_table_entry'><td class='td_rate'>" + formatNumber(lastRate, 5) + "</td><td class='td_amount'>" + formatNumber(amount, 2) + "</td><td class='td_type'>" + period + "</td><td class='td_timestamp' >" + timeConverter(val["timestamp"]) + "</td></tr>");
        } else {
            $("#swapsTableBody").prepend("<tr><td class='td_rate'>" + formatNumber(lastRate, 5) + "</td><td class='td_amount'>" + formatNumber(amount, 2) + "</td><td class='td_type'>" + period + "</td><td class='td_timestamp'>" + timeConverter(val["timestamp"]) + "</td></tr>");
        }
    });
    $(".new_table_entry").css("font-weight", "bold");
    setTimeout(function() {
        $(".new_table_entry").css("font-weight", "300");
    }, 6e3);
    swapsOld = combinedSwaps;
    lastPID = newPID;
}

function formatNumber(number, decimals) {
    number = number.toFixed(decimals) + "";
    x = number.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1e3);
    var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getUTCHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    var min = a.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var sec = a.getSeconds();
    if (sec < 10) {
        sec = "0" + sec;
    }
    var time = hour + ":" + min + ":" + sec;
    return time;
}