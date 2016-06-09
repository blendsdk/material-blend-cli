var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
if (!XMLHttpRequest.prototype.sendAsBinary) {
    /**
     * From MDN
     */
    XMLHttpRequest.prototype.sendAsBinary = function (sData) {
        var nBytes = sData.length, ui8Data = new Uint8Array(nBytes);
        for (var nIdx = 0; nIdx < nBytes; nIdx++) {
            ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
        }
        this.send(ui8Data);
    };
}
if (!Function.prototype.async) {
    Function.prototype.async = function () {
        var me = this, args = arguments;
        setTimeout(function () {
            me.apply(me, args);
        }, 1);
    };
}
if (!String.prototype.inArray) {
    String.prototype.inArray = function (list) {
        if (list === void 0) { list = []; }
        var result = false;
        for (var i = 0; i !== list.length; i++) {
            if (list[i] === this) {
                result = true;
                break;
            }
        }
        return result;
    };
}
if (!String.prototype.repeat) {
    String.prototype.repeat = function (counts) {
        return new Array(counts + 1).join(this);
    };
}
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        if (position === void 0) { position = 0; }
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}
if (!String.prototype.ucfirst) {
    String.prototype.ucfirst = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
}
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
}
if (!Array.prototype.unique) {
    Array.prototype.unique = function () {
        return this.filter(function (item, i, allItems) {
            return i === allItems.indexOf(item);
        });
    };
}
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../Typings.ts" />
var Blend;
(function (Blend) {
    var binding;
    (function (binding) {
        /**
         * Provides signal/slot style object binding.
         * The mapping can be one of the following styles
         */
        var BindingProvider = (function () {
            function BindingProvider() {
            }
            /**
             * Binds the propertys of two components using setSource/getSource/setTarget method
             */
            BindingProvider.prototype.bindProperty = function (source, target, srcProp, trgProp) {
                if (trgProp === void 0) { trgProp = null; }
                trgProp = trgProp || srcProp;
                this.bind(source, target, "set" + srcProp.ucfirst(), "set" + trgProp.ucfirst(), "get" + srcProp.ucfirst());
            };
            BindingProvider.prototype.bind = function (source, target, sourceMember, targetMember, usingMember) {
                var orgSourceMember = source[sourceMember];
                source[sourceMember] = function () {
                    var sr = orgSourceMember.apply(source, arguments);
                    target.applyFunction(targetMember, [usingMember !== null ? source.applyFunction(usingMember, [sr]) : sr]);
                    return sr;
                };
            };
            return BindingProvider;
        }());
        binding.BindingProvider = BindingProvider;
    })(binding = Blend.binding || (Blend.binding = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="Typings.ts" />
/// <reference path="Blend.ts" />
/// <reference path="binding/BindingProvider.ts" />
var Blend;
(function (Blend) {
    /**
     * Base class for a component in Blend
     */
    var Component = (function () {
        function Component(config) {
            if (config === void 0) { config = null; }
            var me = this;
        }
        /**
         * Get the value of a perperty of this component. This is used to
         * Read the private-ish value of a component
          */
        Component.prototype.getProperty = function (name, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            var me = this;
            return (me[name] === undefined ? defaultValue : me[name]);
        };
        /**
         * Provides a way to externally set a property on this component
         */
        Component.prototype.setProperty = function (name, value) {
            var me = this;
            me[name] = value;
        };
        /**
         * Check if this Component implements a function
         */
        Component.prototype.hasFunction = function (fname) {
            var me = this;
            return !Blend.isNullOrUndef(me[fname]) && Blend.isFunction(me[fname]);
        };
        /**
         * Dynamically run a function within this Component
         */
        Component.prototype.applyFunction = function (name, args) {
            var me = this, fn = me[name];
            if (Blend.isFunction(fn)) {
                return fn.apply(me, args);
            }
            else {
                throw new Error("Class method [" + name + "] does not exist!");
            }
        };
        return Component;
    }());
    Blend.Component = Component;
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Blend;
(function (Blend) {
    var dom;
    (function (dom) {
        /**
         * Implements a classList provider for the Blend.dom.Element
         */
        var ClassList = (function () {
            function ClassList(htmlElement) {
                var me = this;
                me.list = [];
                me.initList((htmlElement.getAttribute("class") || "").trim());
            }
            ClassList.prototype.initList = function (css) {
                var me = this;
                (css === "" ? [] : css.split(" ")).forEach(function (c) {
                    c = c.trim();
                    if (c.length !== 0 && c !== "") {
                        me.list.push(c);
                    }
                });
            };
            ClassList.prototype.serializeTo = function (htmlElement) {
                var me = this, css = me.toString();
                if (css !== null && css !== "" && css.length !== 0) {
                    htmlElement.setAttribute("class", css);
                }
                else {
                    htmlElement.removeAttribute("class");
                }
            };
            ClassList.prototype.removeLike = function (list) {
                var me = this, i = -1, n = [];
                list.forEach(function (r) {
                    me.list.forEach(function (i) {
                        if (!i.startsWith(r)) {
                            n.push(i);
                        }
                    });
                });
                me.list = n;
            };
            ClassList.prototype.remove = function (list) {
                var me = this, i = -1;
                list.forEach(function (r) {
                    i = me.list.indexOf(r);
                    if (i !== -1) {
                        me.list.splice(i, 1);
                    }
                });
            };
            ClassList.prototype.add = function (list) {
                var me = this;
                list.forEach(function (i) {
                    if (!me.has(i)) {
                        me.list.push(i);
                    }
                });
            };
            ClassList.prototype.clear = function () {
                this.list = [];
            };
            ClassList.prototype.has = function (n) {
                return this.list.indexOf(n) !== -1;
            };
            ClassList.prototype.toString = function () {
                var r = this.list.join(" ").trim();
                return r === "" ? null : r;
            };
            ClassList.prototype.toArray = function () {
                return this.list;
            };
            return ClassList;
        }());
        dom.ClassList = ClassList;
    })(dom = Blend.dom || (Blend.dom = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Blend;
(function (Blend) {
    var dom;
    (function (dom) {
        /**
         * Implements a style list provides for the Blend.dom.Element
         */
        var StyleList = (function () {
            function StyleList(el) {
                this.pixelRe = /px$/;
                this.UNIT = "px";
                this.unitPropertyRe = /(width$|height$|size$|radius$|padding|margin$|top$|bottom$|right$|left$)/;
                this.unitTypeRe = /(em$|\%$|auto|^calc)/;
                this.initList(el.style.cssText.trim());
            }
            StyleList.prototype.initList = function (data) {
                var me = this, p;
                me.styles = {};
                if (data !== "") {
                    data.split(";").forEach(function (d) {
                        if (d !== "") {
                            p = d.split(":");
                            me.styles[p[0].trim()] = me.fromUnit(p[1].trim());
                        }
                    });
                }
            };
            StyleList.prototype.set = function (name, value) {
                this.styles[name] = value;
            };
            StyleList.prototype.unset = function (name) {
                delete (this.styles[name]);
            };
            StyleList.prototype.getComputed = function (el, names) {
                var me = this, cs = window.getComputedStyle(el, null), r = {};
                names.forEach(function (key) {
                    r[key] = me.fromUnit(cs.getPropertyValue(key));
                });
                return r;
            };
            StyleList.prototype.serializeTo = function (el) {
                var me = this, style = "";
                Object.keys(me.styles).forEach(function (name) {
                    style += name + ":" + me.toUnit(name, me.styles[name]) + ";";
                });
                if (style !== "") {
                    el.style.cssText = style;
                }
            };
            /**
             * Checks and converts the value to px based on the given key
             */
            StyleList.prototype.toUnit = function (key, value) {
                var me = this;
                if (value !== null && me.unitPropertyRe.test(key) && !me.unitTypeRe.test(value)) {
                    value = value + me.UNIT;
                }
                return value;
            };
            /**
             * Given the value it converts px value to a number, otherwise it returns the original
             * value.
             */
            StyleList.prototype.fromUnit = function (value) {
                var me = this;
                if (value !== null && me.pixelRe.test(value)) {
                    value = parseFloat(value.replace(me.UNIT, ""));
                }
                return value;
            };
            return StyleList;
        }());
        dom.StyleList = StyleList;
    })(dom = Blend.dom || (Blend.dom = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../Typings.ts" />
/// <reference path="../Component.ts" />
/// <reference path="ClassList.ts" />
/// <reference path="StyleList.ts" />
/// <reference path="../Blend.ts" />
var Blend;
(function (Blend) {
    var dom;
    (function (dom) {
        /**
         * Wraps an HTMLElement into a utility class for easier  manipulation
         * and hadling
         */
        var Element = (function (_super) {
            __extends(Element, _super);
            function Element(el) {
                _super.call(this);
                this.pixelRe = /px$/;
                this.UNIT = "px";
                this.unitPropertyRe = /(width$|height$|size$|radius$|padding|margin$|top$|bottom$|right$|left$)/;
                this.unitTypeRe = /(em$|\%$|auto|^calc)/;
                this.el = el;
                this.classList = new Blend.dom.ClassList(this.el);
                this.styleList = new Blend.dom.StyleList(this.el);
            }
            /**
             * Sets an attribute to this element
             */
            Element.prototype.setAttribute = function (name, value) {
                var me = this;
                me.el.setAttribute.apply(me.el, arguments);
                return me;
            };
            /**
             * Removed an attribute from this element
             */
            Element.prototype.removeAttribute = function (name) {
                var me = this;
                me.el.removeAttribute(name);
                return me;
            };
            /**
             * Get the list of files for from this Element
              */
            Element.prototype.getFiles = function () {
                var me = this, fel = me.el;
                if (fel.files) {
                    return fel.files;
                }
                else {
                    return new FileList(); // return an empty one
                }
            };
            /**
             * Adds an EventListener to an EventTarget
             */
            Element.prototype.addEventListener = function (eventName, eventHandler) {
                Blend.Runtime.addEventListener(this.el, eventName, eventHandler);
            };
            /**
             * Removes an EventListener from an EventTarget
             */
            Element.prototype.removeEventListener = function (eventName, eventHandler) {
                Blend.Runtime.removeEventListener(this.el, eventName, eventHandler);
            };
            /**
             * Retuns the computed bounds
             */
            Element.prototype.getBounds = function () {
                var bounds = this.getStyle(["top", "left", "width", "height", "visible"]), borderSize;
                if (Blend.Runtime.IE && Blend.Runtime.IEVersion < 12) {
                    borderSize = this.getStyle(["border-top-width", "border-right-width", "border-bottom-width", "border-left-width"]);
                    bounds.width += borderSize["border-left-width"] + borderSize["border-right-width"];
                    bounds.height += borderSize["border-top-width"] + borderSize["border-bottom-width"];
                    return bounds;
                }
                else {
                    return bounds;
                }
            };
            /**
             * Sets the style of this element
             */
            Element.prototype.setStyle = function (styles) {
                var me = this;
                if (styles) {
                    Blend.forEach(styles, function (v, k) {
                        if (v === null || v === "auto") {
                            me.styleList.unset(k);
                        }
                        else {
                            me.styleList.set(k, v);
                        }
                    });
                    me.styleList.serializeTo(me.el);
                }
                return this;
            };
            /**
             * Gets the computed styles of en element
             */
            Element.prototype.getStyle = function (styles) {
                return this.styleList.getComputed(this.el, Blend.wrapInArray(styles));
            };
            /**
             * Gets the CSS classes from this element if possible
             * @return string|string[]
             */
            Element.prototype.getCssClass = function (asArray) {
                if (asArray === void 0) { asArray = false; }
                return asArray === true ? this.classList.toArray() : this.classList.toString();
            };
            /**
             * Checks whether this element has a given CSS class
             */
            Element.prototype.hasCssClass = function (name) {
                return this.classList.has(name);
            };
            /**
             * Adds a new css class an element if it already does not exist
             * The replace flag will replace the existsing css class value
             */
            Element.prototype.addCssClass = function (css, replace) {
                if (replace === void 0) { replace = false; }
                var me = this, t = [];
                if (replace === true) {
                    this.classList.clear();
                }
                me.classList.add(Blend.wrapInArray(css));
                me.classList.serializeTo(me.el);
                return this;
            };
            /**
             * Removes one of more CSS classes from this element
             */
            Element.prototype.removeCssClass = function (css) {
                var me = this, t = [];
                me.classList.remove(Blend.wrapInArray(css));
                me.classList.serializeTo(me.el);
                return this;
            };
            /**
             * Removes one or more CSS classes from this element by checking if the
             * CSS names start with the given request
             */
            Element.prototype.removeCssClassLike = function (css) {
                var me = this, t = [];
                me.classList.removeLike(Blend.wrapInArray(css));
                me.classList.serializeTo(me.el);
                return this;
            };
            /**
             * Clears the value of the class attribute of this element
             */
            Element.prototype.clearCssClass = function () {
                this.classList.clear();
                return this;
            };
            /**
             * Removes the child elements from this Element
             */
            Element.prototype.clearElement = function () {
                var me = this;
                if (me.el) {
                    while (me.el.firstChild) {
                        me.el.removeChild(me.el.firstChild);
                    }
                }
            };
            /**
             * Sets the data-* attribute for this element
             */
            Element.prototype.setData = function (name, value) {
                this.el.setAttribute("data-" + name, value);
                return this;
            };
            /**
             * Gets a data attribute or returns a default value if the attribute does
             * not exist
             */
            Element.prototype.getData = function (name, defaultValue) {
                if (defaultValue === void 0) { defaultValue = null; }
                var me = this, attr = "data-" + name;
                return me.el.hasAttribute(attr) ? me.el.getAttribute(attr) : defaultValue;
            };
            /**
             * Set the Scroll state for this Element
             */
            Element.prototype.scrollState = function (state) {
                var me = this;
                me.setData("scroll", Blend.eScrollState[state]);
                return this;
            };
            /**
             * Enables/Disables the text select state of this element
             */
            Element.prototype.selectable = function (state) {
                this.setData("selectable", state === true ? "on" : "off");
            };
            /**
             * Gets the native HTMLElement
             */
            Element.prototype.getEl = function () {
                return this.el;
            };
            /**
             * Appends a child Element to this Element
             */
            Element.prototype.append = function (child) {
                this.el.appendChild((child.getEl()));
                return child;
            };
            /**
             * Removes this element from its parent
             */
            Element.prototype.remove = function () {
                var me = this, pNode, cNode;
                cNode = me.el;
                pNode = cNode.parentNode || null;
                if (pNode) {
                    pNode.removeChild(cNode);
                }
            };
            /**
             * Sets the inner HTML of this element
             */
            Element.prototype.setHtml = function (html) {
                this.el.innerHTML = html;
                return this;
            };
            Element.prototype.setPadding = function (value) {
                var me = this, padding = {};
                if (Blend.isNumeric(value)) {
                    me.setStyle({ padding: value });
                }
                else {
                    me.setStyle({
                        "padding-top": value.top || null,
                        "padding-right": value.right || null,
                        "padding-bottom": value.bottom || null,
                        "padding-left": value.left || null
                    });
                }
                return this;
            };
            /**
             * Gets the inner HTML of this element
             */
            Element.prototype.getHtml = function () {
                return this.el.innerHTML;
            };
            /**
             * Created an Element based on CreateElementInterface
             */
            Element.create = function (conf, elCallback, elCallbackScope) {
                var me = this, config;
                if (Blend.isInstanceOf(conf, Blend.dom.ElementConfigBuilder)) {
                    config = conf.getConfig();
                }
                else {
                    config = conf;
                }
                if (Blend.isObject(config)) {
                    var el = document.createElement(config.tag || "div");
                    for (var cfg in config) {
                        var val = config[cfg];
                        if (cfg !== "tag" && cfg !== "scope" && cfg !== "oid") {
                            if (cfg === "cls") {
                                cfg = "class";
                                if (Blend.isArray(val)) {
                                    val = val.join(" ");
                                }
                            }
                            else if (cfg === "innerHTML") {
                                cfg = null;
                                el.innerHTML = val;
                            }
                            else if (cfg === "text") {
                                cfg = null;
                                var textNd = document.createTextNode(val);
                                el.appendChild(textNd);
                            }
                            else if (cfg === "listeners" && Blend.isObject(val)) {
                                cfg = null;
                                for (var e in val) {
                                    var handler = val[e];
                                    Blend.Runtime.addEventListener(el, e, function () {
                                        handler.apply(config.scope || window, arguments);
                                    });
                                }
                            }
                            else if (cfg === "children") {
                                if (!Blend.isArray(val)) {
                                    val = [val];
                                }
                                val.forEach(function (child) {
                                    if (child instanceof HTMLElement) {
                                        el.appendChild(child);
                                    }
                                    else if (child instanceof Blend.dom.Element) {
                                        el.appendChild(child.getEl());
                                    }
                                    else if (child instanceof Blend.dom.ElementConfigBuilder) {
                                        el.appendChild(Blend.dom.Element.create(child, elCallback, elCallbackScope).getEl());
                                    }
                                    else {
                                        el.appendChild(Blend.dom.Element.create(child, elCallback, elCallbackScope).getEl());
                                    }
                                });
                                cfg = null;
                            }
                            else if (cfg === "data") {
                                Blend.forEach(val, function (v, k) {
                                    el.setAttribute("data-" + k, v);
                                });
                                cfg = null;
                            }
                            else if (cfg === "style") {
                                cfg = null;
                                Blend.getElement(el).setStyle(val);
                            }
                            else if (cfg === "selectable") {
                                if (val === false) {
                                    Blend.getElement(el).selectable(false);
                                }
                                cfg = null;
                            }
                            if (cfg) {
                                el.setAttribute(cfg, val);
                            }
                        }
                    }
                    var wEl = new Blend.dom.Element(el);
                    if (elCallback && config.oid) {
                        elCallback.apply(elCallbackScope || window, [wEl, config.oid]);
                    }
                    return wEl;
                }
                else {
                    return Blend.createElement({});
                }
            };
            return Element;
        }(Blend.Component));
        dom.Element = Element;
    })(dom = Blend.dom || (Blend.dom = {}));
})(Blend || (Blend = {}));
var Blend;
(function (Blend) {
    /**
     * Wrapper for Blend.dom.Element.create
     */
    Blend.createElement = Blend.dom.Element.create;
    /**
     * Wrapper for document.querySelector
     */
    function selectElement(query, from) {
        if (from === void 0) { from = null; }
        var els = Blend.selectElements(query, from);
        return els[0] || null;
    }
    Blend.selectElement = selectElement;
    /**
     * Wrapper for document.querySelectorAll
     */
    function selectElements(query, from) {
        if (from === void 0) { from = null; }
        var els = [];
        Blend.forEach(((from ? from.getEl() : null) || document).querySelectorAll(query), function (el) {
            if (Blend.isInstanceOf(el, HTMLElement)) {
                els.push(new Blend.dom.Element(el));
            }
        });
        return els;
    }
    Blend.selectElements = selectElements;
    /**
     * Wrapper for document.getElementById
      */
    function getElement(el) {
        if (Blend.isString(el)) {
            return new Blend.dom.Element(document.getElementById(el));
        }
        else {
            return new Blend.dom.Element(el);
        }
    }
    Blend.getElement = getElement;
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="binding/BindingProvider.ts" />
var Blend;
(function (Blend) {
    /**
     * Provides functionality to get Blend kickstarted and check for
     * brower compatibility
     */
    var RuntimeSingleton = (function () {
        function RuntimeSingleton() {
            this.kickStarted = false;
            this.Binder = new Blend.binding.BindingProvider();
            this.mediaQueryRegistery = {};
            this.mediaQueryMatchers = {};
        }
        /**
         * Used to trigger the media query matching on application.
         */
        RuntimeSingleton.prototype.triggerMediaQueryCheck = function () {
            var me = this;
            Blend.forEach(me.mediaQueryMatchers, function (mql, mediaQuery) {
                if (mql.matches && me.previousMediaQuery !== mediaQuery) {
                    me.mediaQueryRegistery[mediaQuery].forEach(function (fn) {
                        fn.apply(me, [mql]);
                    });
                    me.previousMediaQuery = mediaQuery;
                    return false;
                }
            });
        };
        /**
         * Adds a media query listener
         */
        RuntimeSingleton.prototype.addMediaQueryListener = function (mediaQuery, listener) {
            var me = this;
            if (me.mediaQueryRegistery[mediaQuery] === undefined) {
                me.mediaQueryRegistery[mediaQuery] = [];
                var mql = window.matchMedia(mediaQuery);
                me.mediaQueryMatchers[mediaQuery] = mql;
                mql.addListener(function () {
                    me.triggerMediaQueryCheck();
                });
            }
            me.mediaQueryRegistery[mediaQuery].push(listener);
        };
        /**
         * Checks if the current browser is supported
          */
        RuntimeSingleton.prototype.isSupportedBrowser = function () {
            var me = this, ie = me.detectIE();
            me.IE = ie !== 0;
            me.IEVersion = ie;
            if (ie !== 0 && ie < 11) {
                document.write("<div id=\"noblend\">Unable to run this application. Please upgrade your Internet Explorer to version 11 or above, otherwise use Google Chrome or Firefox!</div>");
                return false;
            }
            else {
                return true;
            }
        };
        /**
         * Resets the "ready" callback buffer
         */
        RuntimeSingleton.prototype.reset = function () {
            var me = this;
            me.readyCallbacks = [];
        };
        /**
         * Adds a callback function to run when the browser is ready to go
         */
        RuntimeSingleton.prototype.ready = function (callback, scope) {
            var me = this;
            if (!me.readyCallbacks) {
                me.readyCallbacks = [];
            }
            me.readyCallbacks.push({
                fn: callback,
                sc: scope || me
            });
            return this;
        };
        /**
         * Initiates Blend's application lifecycle by executing the callbacks
         * which are registered by {Environment.ready}. This function needs to called
         * to get a Blend application started.
         */
        RuntimeSingleton.prototype.kickStart = function () {
            var me = this, didRun = false, doCallback = function () {
                if (didRun === false) {
                    didRun = true;
                    if (me.isSupportedBrowser()) {
                        Blend.forEach(me.readyCallbacks, function (item) {
                            item.fn.apply(item.sc, []);
                        });
                    }
                }
                // empty the callbacks after running once incase we have late
                // ready(...) calls later, so we don't run previous calls again.
                me.readyCallbacks = [];
            };
            if (!me.kickStarted) {
                me.kickStarted = true;
                if (document.readyState === "complete") {
                    doCallback.apply(me, []);
                }
                else {
                    me.addEventListener(document, "DOMContentLoaded", doCallback);
                    me.addEventListener(window, "load", doCallback);
                }
            }
            else {
                doCallback.apply(me, []);
            }
        };
        /**
         * Adds an EventListener to an EventTarget. You can add multiple events by
         * providing event names seperated by spaces (eg. 'mouseup click')
         */
        RuntimeSingleton.prototype.addEventListener = function (el, eventName, eventHandler) {
            if (eventName.indexOf(" ") !== -1) {
                eventName.split(" ").forEach(function (eName) {
                    eName = eName.trim();
                    if (eName.length !== 0) {
                        el.addEventListener(eName, eventHandler, false);
                    }
                });
            }
            else {
                el.addEventListener(eventName, eventHandler, false);
            }
        };
        /**
         * Removes an EventListener from an EventTarget. You can remove multiple events by
         * providing event names seperated by spaces (eg. 'mouseup click')
         */
        RuntimeSingleton.prototype.removeEventListener = function (el, eventName, eventHandler) {
            if (eventName.indexOf(" ") !== -1) {
                eventName.split(" ").forEach(function (eName) {
                    eName = eName.trim();
                    if (eName.length !== 0) {
                        el.removeEventListener(eName, eventHandler, false);
                    }
                });
            }
            else {
                el.removeEventListener(eventName, eventHandler, false);
            }
        };
        RuntimeSingleton.prototype.detectIE = function () {
            // copyright http://codepen.io/gapcode/pen/vEJNZN
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
            }
            var trident = ua.indexOf("Trident/");
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf("rv:");
                return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
            }
            var edge = ua.indexOf("Edge/");
            if (edge > 0) {
                // Edge (IE 12+) => return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
            }
            return 0;
        };
        return RuntimeSingleton;
    }());
    Blend.RuntimeSingleton = RuntimeSingleton;
    /**
     * Global reference to the RuntimeSingleton
     */
    Blend.Runtime = new RuntimeSingleton();
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="common/Utils.ts" />
/// <reference path="dom/Element.ts" />
/// <reference path="./Runtime.ts" />
var Blend;
(function (Blend) {
    var eMediaQuery = (function () {
        function eMediaQuery() {
        }
        eMediaQuery.LARGE = "L";
        eMediaQuery.MEDIUM = "M";
        eMediaQuery.SMALL = "S";
        return eMediaQuery;
    }());
    Blend.eMediaQuery = eMediaQuery;
    /**
     * Element Scroll values
     */
    (function (eScrollState) {
        eScrollState[eScrollState["none"] = 0] = "none";
        eScrollState[eScrollState["auto"] = 1] = "auto";
        eScrollState[eScrollState["both"] = 2] = "both";
        eScrollState[eScrollState["horizontal"] = 3] = "horizontal";
        eScrollState[eScrollState["vertical"] = 4] = "vertical";
    })(Blend.eScrollState || (Blend.eScrollState = {}));
    var eScrollState = Blend.eScrollState;
    Blend.registry = {};
    /**
     * Put the framework in DEBUG mode
     */
    Blend.DEBUG = false;
    var ID = 1000;
    Blend.COMMON_MEDIA_QUERIES = {};
    /**
     * IMPORTANT: For the media queries to work properly, we need to define them from
     * large to small because the Media Query check will match the first one and
     * trigger the responsiveChange event and other matching mediea queries will be
     * ignored!
     */
    Blend.COMMON_MEDIA_QUERIES[eMediaQuery.LARGE] = "(min-width : 840px)";
    Blend.COMMON_MEDIA_QUERIES[eMediaQuery.MEDIUM] = "(min-width: 480px) and (max-width: 839px)";
    Blend.COMMON_MEDIA_QUERIES[eMediaQuery.SMALL] = "(max-width : 479px)";
    /**
     * Bind wraps a function into a new functions so it can run in a given scope
     * whn the new function is called.
     */
    function bind(scope, fn) {
        return function () {
            fn.apply(scope, arguments);
        };
    }
    Blend.bind = bind;
    /**
     * Generates a new sequential ID used internally for debugging
     */
    function newID() {
        return ID++;
    }
    Blend.newID = newID;
    /**
     * Returns enum value, either the value as number or its string representation
     */
    function parseEnum(objEnum, value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (Blend.isString(value)) {
            return objEnum[value] === undefined ? defaultValue : objEnum[value];
        }
        else {
            return objEnum[objEnum[value]] === undefined ? defaultValue : objEnum[objEnum[value]];
        }
    }
    Blend.parseEnum = parseEnum;
    /**
     * Checks if the given value is a function
     */
    function isFunction(value) {
        return (typeof value === "function");
    }
    Blend.isFunction = isFunction;
    /**
     * Checks if the given value is a string
     */
    function isString(value) {
        return (typeof value === "string");
    }
    Blend.isString = isString;
    /**
     * Checks if the given value is null or undefined
     */
    function isNullOrUndef(value) {
        return (value === null || value === undefined);
    }
    Blend.isNullOrUndef = isNullOrUndef;
    /**
      * Checks if the given value is an array
      */
    function isArray(value) {
        return Object.prototype.toString.apply(value) === "[object Array]";
    }
    Blend.isArray = isArray;
    /**
     * Checks if the given value is a number
     */
    function isNumeric(value) {
        // Original source: JQuery
        return value - parseFloat(value) >= 0;
    }
    Blend.isNumeric = isNumeric;
    /**
     * Checks if the given value is an object
     */
    function isObject(value) {
        return (typeof value === "object" &&
            (typeof value !== "function" &&
                value !== null &&
                value !== undefined &&
                !Blend.isArray(value)));
    }
    Blend.isObject = isObject;
    /**
     * Wraps an object in an array if the object is not an array itself
     */
    function wrapInArray(obj) {
        return Blend.isArray(obj) ? obj : Blend.isNullOrUndef(obj) ? [] : [obj];
    }
    Blend.wrapInArray = wrapInArray;
    /**
     * Copies keys and values from one object to another
     * @param {any} target
     * @param {any} source
     * @param {boolean} overwrite the child objects or arrays
     * @param {mergeArrays} will merge arrays instead of overwriting them
     */
    function apply(target, source, overwrite, mergeArrays) {
        if (overwrite === void 0) { overwrite = false; }
        if (mergeArrays === void 0) { mergeArrays = false; }
        var key, targetKeys = Object.keys(target || {}), targetHasKey = function (key) {
            return targetKeys.indexOf(key) !== -1;
        };
        overwrite = overwrite || false;
        mergeArrays = mergeArrays || false;
        if (target && source) {
            for (key in source) {
                if (key && source.hasOwnProperty(key)) {
                    if (targetHasKey(key) && Blend.isObject(target[key])) {
                        if (overwrite) {
                            target[key] = source[key];
                        }
                        else {
                            Blend.apply(target[key], source[key]);
                        }
                    }
                    else if (targetHasKey(key) && Blend.isArray(target[key]) && mergeArrays === true) {
                        target[key] = target[key].concat(Blend.wrapInArray(source[key]));
                    }
                    else if (targetHasKey(key) && overwrite) {
                        target[key] = source[key];
                    }
                    else if (Blend.isNullOrUndef(target[key])) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    }
    Blend.apply = apply;
    /**
     * Checks if the given value is a boolean
     */
    function isBoolean(value) {
        return (typeof (value) === "boolean");
    }
    Blend.isBoolean = isBoolean;
    /**
     * Checks if the give value is instance of another class/function
     */
    function isInstanceOf(obj, clazz) {
        if (obj === null || obj === undefined) {
            return false;
        }
        var hc = "[object HTMLCollection]";
        if (obj.toString() === hc && clazz === "HTMLCollection") {
            return true;
        }
        else {
            if (Blend.isString(clazz)) {
                var fn = new Function("", " try { return " + clazz + " } catch(e) { return null };");
                clazz = fn();
            }
            try {
                var res = (obj instanceof clazz);
                return res;
            }
            catch (e) {
                return false;
            }
        }
    }
    Blend.isInstanceOf = isInstanceOf;
    /**
     * Loops though the given object (array, dictionary) and runs a callback on each item.
     * The callback loop will break when the callback function returns "false" explicitly!
     * The callback has the following signature:
     * function(item:any, index:number|string, scope:any = obj) {
     * }
     */
    function forEach(obj, callback, scope) {
        if (typeof HTMLCollection === "undefined") {
            var HTMLCollection = function () {
                //
            };
        }
        var key;
        if (obj) {
            if (Blend.isFunction(obj)) {
                return;
            }
            else if (Blend.isArray(obj)) {
                var length = obj.length;
                for (key = 0; key < length; key++) {
                    if (callback.call(scope, obj[key], parseInt(key), obj) === false) {
                        break;
                    }
                }
            }
            else if (Blend.isInstanceOf(obj, "HTMLCollection")) {
                var length = obj.length, key, el;
                for (key = 0; key !== length; key++) {
                    el = obj.item(key);
                    if (key !== "length") {
                        if (callback.call(scope, el, parseInt(key), obj) === false) {
                            break;
                        }
                    }
                }
            }
            else {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (callback.call(scope, obj[key], key, obj) === false) {
                            break;
                        }
                    }
                }
            }
        }
    }
    Blend.forEach = forEach;
    /**
     *  Create a new Blend.Component object
     */
    function createComponent(clazz, config) {
        if (config === void 0) { config = null; }
        if (typeof (clazz) === "string") {
            if (Blend.registry[clazz]) {
                return Blend.createComponent(Blend.registry[clazz], config);
            }
            else {
                throw new Error("Unknown class alias " + clazz);
            }
        }
        else if (Blend.isClass(clazz)) {
            return new clazz(config || {});
        }
        else if (clazz !== null && clazz !== undefined && typeof (clazz) === "object" && clazz.ctype) {
            var ctype = clazz.ctype;
            delete (clazz.ctype);
            return Blend.createComponent(ctype, Blend.apply(clazz, config));
        }
        else {
            throw new Error("Unable to create an object from " + clazz);
        }
    }
    Blend.createComponent = createComponent;
    function isClass(clazz) {
        return typeof (clazz) === "function" && !!Object.keys(clazz.prototype).length === true;
    }
    Blend.isClass = isClass;
    /**
     * Registers a class with a given alias into the class registry so we can
     * instantiate an object with createObjectWithAlias.
     */
    function registerClassWithAlias(alias, clazz) {
        if (!Blend.registry[alias]) {
            Blend.registry[alias] = clazz;
        }
        else {
            throw new Error("A Class with alias " + alias + " is already registered!");
        }
    }
    Blend.registerClassWithAlias = registerClassWithAlias;
})(Blend || (Blend = {}));
var Blend;
(function (Blend) {
    Blend.version = "v2.0.2";
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../Blend.ts" />
/// <reference path="../Component.ts" />
var Blend;
(function (Blend) {
    var ajax;
    (function (ajax) {
        /**
         * Base class for an Ajax Request
         */
        var AjaxRequest = (function (_super) {
            __extends(AjaxRequest, _super);
            function AjaxRequest(config) {
                _super.call(this);
                var me = this, cfg;
                if (Blend.isString(config)) {
                    cfg = {
                        url: config || null
                    };
                }
                else {
                    cfg = config;
                }
                me.url = cfg.url || null;
                me.headers = cfg.headers || {};
                me.onComplete = cfg.onComplete || null;
                me.onProgress = cfg.onProgress || null;
                me.onFailed = cfg.onFailed || null;
                me.onSuccess = cfg.onSuccess || null;
                me.onStart = cfg.onStart || null;
                me.onPrepareUpload = cfg.onPrepareUpload || null;
                me.scope = cfg.scope | me;
                me.xhrConfig = {
                    withCredentials: cfg.withCredentials === true ? true : false
                };
                me.initialize();
            }
            AjaxRequest.prototype.initialize = function () {
                var me = this, handlers = {
                    progress: me.updateProgress,
                    load: me.transferComplete,
                    error: me.transferFailed,
                    abort: me.transferCanceled
                };
                me.xhr = new XMLHttpRequest();
                Blend.forEach(handlers, function (handler, eventName) {
                    me.xhr.addEventListener(eventName, function (evt) {
                        handler.apply(me, [me.xhr, evt]);
                    });
                });
                Blend.forEach(me.headers, function (value, header) {
                    me.xhr.setRequestHeader(header, value);
                });
                Blend.forEach(me.xhrConfig, function (value, key) {
                    me.xhr[key] = value;
                });
            };
            AjaxRequest.prototype.sendRequest = function (data) {
                if (data === void 0) { data = {}; }
                var me = this;
                me.callID = (new Date()).getTime();
                if (me.callHandler("onStart", arguments) !== false) {
                    me.doSendRequest(data);
                }
                else {
                    me.transferCanceled(me.xhr, null);
                }
            };
            AjaxRequest.prototype.updateProgress = function (request, evt) {
                var me = this;
                me.callHandler("onProgress", arguments);
            };
            AjaxRequest.prototype.transferComplete = function (request, evt) {
                var me = this;
                if (request.status >= 300) {
                    me.transferFailed.apply(me, arguments);
                }
                else if (request.status < 300) {
                    me.callHandler("onSuccess", arguments);
                }
                me.callHandler("onComplete", arguments);
            };
            AjaxRequest.prototype.transferFailed = function (request, evt) {
                var me = this;
                me.callHandler("onFailed", arguments);
            };
            AjaxRequest.prototype.transferCanceled = function (request, evt) {
                var me = this;
                me.transferFailed(request, evt);
            };
            /**
             * File prepare event notification
             */
            AjaxRequest.prototype.notifyPrepareUpload = function (file, status) {
                this.callHandler("onPrepareUpload", arguments);
            };
            /**
             * Calls a registerend handler by name
             */
            AjaxRequest.prototype.callHandler = function (name, args) {
                var me = this;
                if (me[name]) {
                    return me[name].apply(me.scope || me, args);
                }
                else {
                    return undefined;
                }
            };
            /**
             * URI encode a string value
             */
            AjaxRequest.prototype.encodeURIComponent = function (value) {
                return encodeURIComponent(value).replace(/[!'()*]/g, function (c) {
                    return "%" + c.charCodeAt(0).toString(16);
                });
            };
            /**
             * URL encode a Dictionary
             */
            AjaxRequest.prototype.urlEncodeData = function (data) {
                var me = this, payload = [];
                Blend.forEach(data, function (value, key) {
                    payload.push(key + "=" + me.encodeURIComponent(value));
                });
                return payload.join("&").trim();
            };
            /**
             * Creates or updates the current URL by adding a call ID ti bypass browser caching
             */
            AjaxRequest.prototype.createURI = function (data) {
                if (data === void 0) { data = {}; }
                var me = this;
                data = data || {};
                data["_c"] = me.callID;
                return (me.url
                    + (me.url.indexOf("?") === -1 ? "?" : "&")
                    + me.urlEncodeData(data));
            };
            return AjaxRequest;
        }(Blend.Component));
        ajax.AjaxRequest = AjaxRequest;
    })(ajax = Blend.ajax || (Blend.ajax = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../Blend.ts" />
/// <reference path="AjaxRequest.ts" />
var Blend;
(function (Blend) {
    var ajax;
    (function (ajax) {
        /**
         * AjaxGetRequest implements a GET request
         */
        var AjaxGetRequest = (function (_super) {
            __extends(AjaxGetRequest, _super);
            function AjaxGetRequest() {
                _super.apply(this, arguments);
            }
            AjaxGetRequest.prototype.doSendRequest = function (data) {
                if (data === void 0) { data = {}; }
                var me = this;
                me.xhr.open("GET", me.createURI(data), true);
                me.xhr.send(null);
            };
            return AjaxGetRequest;
        }(Blend.ajax.AjaxRequest));
        ajax.AjaxGetRequest = AjaxGetRequest;
    })(ajax = Blend.ajax || (Blend.ajax = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../Blend.ts" />
/// <reference path="AjaxRequest.ts" />
var Blend;
(function (Blend) {
    var ajax;
    (function (ajax) {
        /**
         * AjaxPostRequest implements a POST request with File uploading capabilities
         */
        var AjaxPostRequest = (function (_super) {
            __extends(AjaxPostRequest, _super);
            function AjaxPostRequest() {
                _super.apply(this, arguments);
                /**
                 * Converts an ArrayBuffer (File) to a string
                 */
                this.arrayBufferToString = function (result) {
                    var binary = "";
                    var bytes = new Uint8Array(result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    return binary;
                };
            }
            AjaxPostRequest.prototype.doSendRequest = function (data) {
                if (data === void 0) { data = {}; }
                var me = this;
                me.readyToSend = true;
                me.boundary = "!!@@##" + me.callID + "##@@!!";
                me.dataItemHeader = "--" + me.boundary + "\r\nContent-Disposition: form-data;";
                me.xhr.open("POST", me.createURI(), true);
                me.xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + me.boundary);
                me.boundaryEncodeData(data, function (encodedData) {
                    me.xhr.setRequestHeader("Content-Length", encodedData.length.toString());
                    me.xhr.sendAsBinary(encodedData);
                });
            };
            /**
             * Encode the data that is to be sent (POST) asynchronously
             */
            AjaxPostRequest.prototype.boundaryEncodeData = function (data, callback) {
                var me = this, pendingConverts = 0, payload = [];
                Blend.forEach(data, function (value, key) {
                    if (Blend.isInstanceOf(value, FileList)) {
                        pendingConverts += me.encodeFileList(value, payload, function () {
                            pendingConverts -= 1;
                        });
                    }
                    else {
                        payload.push(me.encodeDataItem(key, value));
                    }
                });
                var waitId = setInterval(function () {
                    if (pendingConverts === 0) {
                        clearInterval(waitId);
                        payload.push("--" + me.boundary + "--\r\n");
                        callback.apply(me, [payload.join("")]);
                    }
                }, 250);
            };
            /**
             * Encodes a FileList
             */
            AjaxPostRequest.prototype.encodeFileList = function (files, payload, onFinish) {
                var me = this, currentFile, filetype, nextFile = 0, reader = new FileReader();
                reader.onload = function (evt) {
                    filetype = currentFile.type === "" ? "application/octet-stream" : currentFile.type;
                    payload.push(me.dataItemHeader + " name=\"" + currentFile.name + "\"; filename=\"" + currentFile.name + "\"\r\nContent-Type: " + filetype + "\r\n\r\n" + me.arrayBufferToString(reader.result) + "\r\n");
                    onFinish.apply(me, []);
                    me.notifyPrepareUpload(currentFile, 2);
                    nextFile += 1;
                    doWork();
                };
                reader.onprogress = function (evt) {
                    me.notifyPrepareUpload(currentFile, 1);
                };
                var doWork = function () {
                    if (files[nextFile]) {
                        currentFile = files[nextFile];
                        me.notifyPrepareUpload(currentFile, 0);
                        reader.readAsArrayBuffer(currentFile);
                    }
                };
                doWork();
                return files.length;
            };
            /**
             * Encodes simple data items
             */
            AjaxPostRequest.prototype.encodeDataItem = function (key, value) {
                var me = this;
                return me.dataItemHeader + " name=\"" + key + "\"\r\n\r\n" + value + "\r\n";
            };
            return AjaxPostRequest;
        }(Blend.ajax.AjaxRequest));
        ajax.AjaxPostRequest = AjaxPostRequest;
    })(ajax = Blend.ajax || (Blend.ajax = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../Typings.ts" />
/// <reference path="../Blend.ts" />
/// <reference path="../Component.ts" />
var Blend;
(function (Blend) {
    var mvc;
    (function (mvc) {
        /**
         * Abstract class providing controller regsiteration and event publishing
         * This class is the base class for View and the Context
         */
        var Client = (function (_super) {
            __extends(Client, _super);
            function Client(config) {
                if (config === void 0) { config = {}; }
                _super.call(this, config);
                var me = this;
                me.controllers = [];
                me.addController(config.controller || []);
            }
            /**
             * Fires an event towards the Controllers within this View
             */
            Client.prototype.fireEventWithScope = function (scope, eventName, args) {
                var me = this;
                if (me.controllers) {
                    Blend.forEach(me.controllers, function (controller) {
                        if (controller.delegate) {
                            controller.delegate(eventName, scope, args);
                        }
                        else {
                            // function controller
                            controller.apply(scope, [scope, eventName].concat(args));
                        }
                    });
                }
            };
            /**
             * Adds (registers) Controllers with this client
             */
            Client.prototype.addController = function (controllers) {
                var me = this, ctrl;
                Blend.forEach(Blend.wrapInArray(controllers), function (item) {
                    if (Blend.isClass(item) || Blend.isString(item)) {
                        ctrl = Blend.createComponent(item);
                    }
                    else if (Blend.isObject(item)) {
                        ctrl = item;
                    }
                    else if (Blend.isFunction(item)) {
                        ctrl = item;
                    }
                    if (Blend.isInstanceOf(ctrl, Blend.mvc.Controller)) {
                        ctrl.bindView(me);
                        me.controllers.push(ctrl);
                    }
                    else if (Blend.isFunction(ctrl)) {
                        me.controllers.push(function () { return ctrl.apply(me, arguments); });
                    }
                    else {
                        throw new Error(ctrl + " is not a valid Blend.mvc.Controller");
                    }
                });
            };
            return Client;
        }(Blend.Component));
        mvc.Client = Client;
    })(mvc = Blend.mvc || (Blend.mvc = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../Typings.ts" />
/// <reference path="../Blend.ts" />
/// <reference path="Client.ts" />
var Blend;
(function (Blend) {
    var mvc;
    (function (mvc) {
        var View = (function (_super) {
            __extends(View, _super);
            function View(config) {
                if (config === void 0) { config = {}; }
                _super.call(this, config);
                var me = this;
                me.reference = config.reference || null;
                me.currentEventName = null;
                me.setContext(config.context || null);
                me.disableEvents();
            }
            /**
             * Sets the global MVC context
              */
            View.prototype.setContext = function (context) {
                var me = this;
                me.context = context;
            };
            /**
             * Checks to see if we have a global MVC context
             */
            View.prototype.hasContext = function () {
                return !Blend.isNullOrUndef(this.context);
            };
            /**
             * Disables the event and notification on this View
             */
            View.prototype.disableEvents = function () {
                this.eventsEnabled = false;
                return this;
            };
            /**
             * Enables the event and notification on this view
             */
            View.prototype.enableEvents = function () {
                this.eventsEnabled = true;
                return this;
            };
            /**
             * Gets the reference identifier for this View
             */
            View.prototype.getReference = function () {
                return this.reference || null;
            };
            View.prototype.canFireEvents = function () {
                return this.eventsEnabled === true;
            };
            /**
             * Fires an event towards the Controllers within this View
             * and the current global Context is possible
             */
            View.prototype.fireEvent = function (eventName) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var me = this;
                me.currentEventName = eventName;
                if (me.canFireEvents() === true) {
                    this.fireEventWithScope(me, eventName, args);
                    if (me.context !== null) {
                        me.context.delegate(eventName, me, args);
                    }
                }
                return this;
            };
            return View;
        }(Blend.mvc.Client));
        mvc.View = View;
    })(mvc = Blend.mvc || (Blend.mvc = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../Typings.ts" />
/// <reference path="../Component.ts" />
/// <reference path="View.ts" />
/// <reference path="Client.ts" />
var Blend;
(function (Blend) {
    var mvc;
    (function (mvc) {
        /**
         * Base class for a Controller.
         */
        var Controller = (function (_super) {
            __extends(Controller, _super);
            function Controller(config) {
                if (config === void 0) { config = {}; }
                _super.call(this, config);
                this.handlers = {};
                this.initEvents();
            }
            Controller.prototype.initEvents = function () {
            };
            /**
             * @internal
             * Delegates an event to the regisreted handlers in this controller
             */
            Controller.prototype.delegate = function (eventName, view, args) {
                var me = this, reference = view.getReference ? view.getReference() : "", handlers = me.handlers[eventName] || me.handlers[reference + "." + eventName] || null;
                if (handlers && handlers.length !== 0) {
                    handlers.forEach(function (handler) {
                        setTimeout(function () {
                            try {
                                handler.apply(me, [view].concat(args));
                            }
                            catch (error) {
                            }
                        }, 2);
                    });
                }
            };
            /**
             * Registers an event handler within this controller
             */
            Controller.prototype.on = function (eventName, handler) {
                var me = this;
                if (!me.handlers[eventName]) {
                    me.handlers[eventName] = [handler];
                }
                else {
                    me.handlers[eventName].push(handler);
                }
            };
            /**
             * @internal
             * Registers a View's reference within this controller
             */
            Controller.prototype.bindView = function (view) {
                var me = this, reference = (view.getReference ? view.getReference() : null); // trick to bypass the Context object
                if (reference !== null) {
                    if (me[reference] === null) {
                        me[reference] = view;
                    }
                    else if (Blend.isArray(me[reference])) {
                        me[reference].push(view);
                    }
                }
            };
            return Controller;
        }(Blend.Component));
        mvc.Controller = Controller;
    })(mvc = Blend.mvc || (Blend.mvc = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../Typings.ts" />
/// <reference path="../Blend.ts" />
/// <reference path="Controller.ts" />
/// <reference path="Client.ts" />
var Blend;
(function (Blend) {
    var mvc;
    (function (mvc) {
        /**
         * Represents a context that hols instanses of controllers an other
         *  mvc related state
         */
        var Context = (function (_super) {
            __extends(Context, _super);
            function Context() {
                _super.apply(this, arguments);
            }
            /**
             * Delegates an event to the Controllers within this Context
             */
            Context.prototype.delegate = function (eventName, sender, args) {
                this.fireEventWithScope(sender, eventName, args);
            };
            return Context;
        }(Blend.mvc.Client));
        mvc.Context = Context;
    })(mvc = Blend.mvc || (Blend.mvc = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../mvc/View.ts" />
/// <reference path="../dom/Element.ts" />
var Blend;
(function (Blend) {
    var material;
    (function (material) {
        /**
         * Abstract base class for a Material
         */
        var Material = (function (_super) {
            __extends(Material, _super);
            function Material(config) {
                if (config === void 0) { config = {}; }
                _super.call(this, config);
                var me = this;
                me.isInitialized = false;
                me.parent = config.parent || null;
                me.useParentControllers = config.useParentController || false;
                me.isRendered = false;
                me.visible = true;
                me.config = {
                    css: [],
                    style: {},
                    visible: true,
                    top: null,
                    left: null,
                    width: null,
                    height: null,
                    responsive: config.responsive || false,
                    responseTo: config.responseTo || null
                };
                me.addCssClass(config.css || []);
                me.setStyle(config.style || {});
                me.setVisible(Blend.isBoolean(config.visible) ? config.visible : me.visible);
                me.setBounds({
                    top: config.top || null,
                    left: config.left || null,
                    width: config.width || null,
                    height: config.height || null
                });
                me.initializeResponsiveEvents();
                me.canLayout = true;
            }
            /**
             * Internal function used for initiating a sub-layout process. This function can be
             * overridden when implementing a custom component. See the Button component as
             * an example of how to use this function
             */
            Material.prototype.updateLayout = function () {
            };
            /**
             * Initiates a sub-layout process.
             */
            Material.prototype.performLayout = function () {
                var me = this;
                if (me.canLayout === true) {
                    me.suspendLayout();
                    me.updateLayout();
                    me.resumeLayout();
                }
            };
            /**
             * Suspends the sub-layout from staring
             */
            Material.prototype.suspendLayout = function () {
                this.canLayout = false;
            };
            /**
             * Resumes the sub-layout
             */
            Material.prototype.resumeLayout = function () {
                this.canLayout = true;
            };
            /**
             * This function is used internally on render time to assign element IDs to
             * properties
             */
            Material.prototype.assignElementByOID = function (el, oid) {
                var me = this;
                if (me[oid] === null) {
                    me[oid] = el;
                }
            };
            /**
             * Initialized a responsive listener for this Material by adding a listener to the
             * Runtime.addMediaQueryListener
             */
            Material.prototype.initializeResponsiveEvents = function () {
                var me = this, config;
                config = me.config.responsive === true ? Blend.COMMON_MEDIA_QUERIES
                    : me.config.responseTo || null;
                if (config !== null) {
                    Blend.forEach(config, function (queries, alias) {
                        queries = Blend.wrapInArray(queries);
                        queries.forEach(function (mediaQuery) {
                            Blend.Runtime.addMediaQueryListener(mediaQuery, function (mql) {
                                me.fireEvent("responsiveChanged", alias, mql);
                            });
                        });
                    });
                }
            };
            Material.prototype.getProperty = function (name, defaultValue) {
                if (defaultValue === void 0) { defaultValue = null; }
                var me = this;
                if (name.indexOf("config.", 0) === 0) {
                    name = name.replace("config.", "").trim();
                    return (me.config[name] === undefined ? defaultValue : me.config[name]);
                }
                else {
                    return _super.prototype.getProperty.call(this, name, defaultValue);
                }
            };
            Material.prototype.render = function () {
                return Blend.dom.Element.create({});
            };
            /**
             * Sends a materialInitialized notification
             */
            Material.prototype.notifyMaterialInitialized = function () {
                var me = this;
                me.fireEvent("materialInitialized", me);
            };
            /**
             * DO NOT USE THIS FUNCTION!
             * Internal function that is called by the parent/host to initiate
             * the initialization process
              */
            Material.prototype.doInitialize = function () {
                var me = this;
                me.initEvents();
                me.initialize();
                me.performLayout();
                me.notifyMaterialInitialized();
                return me;
            };
            /**
             * This function can be overriden to do custom initialization on this Material
             */
            Material.prototype.initialize = function () {
            };
            /**
             * Override this method for creating event listeners for this Material
             */
            Material.prototype.initEvents = function () {
            };
            /**
             * Check if events can be fired on this Material
             */
            Material.prototype.canFireEvents = function () {
                var me = this, state;
                if (_super.prototype.canFireEvents.call(this)) {
                    if (me.parent !== null) {
                        state = me.parent.canFireEvents();
                    }
                    else {
                        state = true;
                    }
                }
                else {
                    state = false;
                }
                if (state === false && me.currentEventName === "materialInitialized") {
                    return true;
                }
                else {
                    return state;
                }
            };
            /////////////////////////////////////////////////////////////////////////
            // BOUNDS
            /////////////////////////////////////////////////////////////////////////
            /**
             * Returns the bounds of this Material based on the ElementBoundsInterface interface
             */
            Material.prototype.getBounds = function () {
                var me = this;
                if (me.isRendered) {
                    return me.element.getBounds();
                }
                else {
                    return null;
                }
            };
            /**
             * Sets the bounds of this Material based on the ElementBoundsInterface interface
             */
            Material.prototype.setBounds = function (bounds) {
                var me = this, nullBounds = { top: null, left: null, width: null, height: null };
                if (me.isRendered) {
                    me.setStyle(bounds === null ? nullBounds : bounds);
                }
                else {
                    Blend.apply(me.config, bounds === null ? nullBounds : bounds);
                }
                me.notifyBoundsChanged();
                return this;
            };
            /**
             * Sends boundsChanged notification
             */
            Material.prototype.notifyBoundsChanged = function () {
                var me = this;
                if (me.isRendered) {
                    me.fireEvent("boundsChanged", me.getBounds());
                }
            };
            /////////////////////////////////////////////////////////////////////////
            // VISIBILITY
            //////////////////////////////////////////////////////////////////////////
            /**
             * Sets the visibility state for this Material
             */
            Material.prototype.setVisible = function (visible) {
                if (visible === void 0) { visible = true; }
                var me = this;
                me.visible = visible === true ? true : false;
                if (me.isRendered) {
                    me.element.setData("visible", me.visible);
                }
                else {
                    me.config.visible = me.visible;
                }
                me.notifyVisibilityChanged();
                return this;
            };
            /**
             * gets the visibility state of this Material
             */
            Material.prototype.isVisible = function () {
                var me = this;
                return me.visible;
            };
            /**
             * Sends a visibilityChanged notification
             */
            Material.prototype.notifyVisibilityChanged = function () {
                var me = this;
                me.fireEvent("visibilityChanged", me.visible);
            };
            /////////////////////////////////////////////////////////////////////////
            // STYLE and CSS
            //////////////////////////////////////////////////////////////////////////
            /**
             * Sets the Styles for this Material
             * */
            Material.prototype.setStyle = function (style) {
                var me = this;
                if (me.isRendered) {
                    me.element.setStyle(style);
                }
                else {
                    Blend.apply(me.config.style, style, false, true);
                }
                me.notifyStyleOrCSSChanged();
            };
            /**
             * Adds one or more CSS classes to this Material
             */
            Material.prototype.addCssClass = function (css) {
                var me = this;
                if (me.isRendered) {
                    me.element.addCssClass(css);
                }
                else {
                    Blend.wrapInArray(css).forEach(function (itm) {
                        me.config.css.push(itm);
                    });
                }
                me.notifyStyleOrCSSChanged();
            };
            /**
             * Sends a visibilityChanged notification
             */
            Material.prototype.notifyStyleOrCSSChanged = function () {
                var me = this;
                me.fireEvent("styleChanged", me.visible);
            };
            /**
             *Helps configuring the this Material before the rendering cycle is complete
             */
            Material.prototype.finalizeRender = function () {
                var me = this;
                me.addCssClass(me.config.css);
                me.setBounds({
                    top: me.config.top,
                    left: me.config.left,
                    width: me.config.width,
                    height: me.config.height
                });
                me.setStyle(me.config.style);
                if (!me.visible) {
                    // should be set only when not visible
                    me.setVisible(false);
                }
                if (Blend.DEBUG === true) {
                    var id = "m" + Blend.newID();
                    me.element.getEl().setAttribute("id", id);
                    window[id] = me;
                }
            };
            /**
            * Retrives the HTMLElement for this Material
            */
            Material.prototype.getElement = function () {
                var me = this;
                if (!me.isRendered) {
                    me.disableEvents();
                    me.element = me.render();
                    me.isRendered = true;
                    me.finalizeRender();
                    me.enableEvents();
                }
                return me.element;
            };
            /**
             * Destroys this Material by setting the properties to null,
             * deleting them and removing its HTMLElement
             */
            Material.prototype.destroy = function () {
                var me = this;
                me.element.remove();
                Blend.forEach(me, function (value, key) {
                    me[key] = null;
                    delete (me[key]);
                });
            };
            return Material;
        }(Blend.mvc.View));
        material.Material = Material;
    })(material = Blend.material || (Blend.material = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../Typings.ts" />
/// <reference path="../Blend.ts" />
/// <reference path="../dom/Element.ts" />
/// <reference path="../mvc/Context.ts" />
/// <reference path="../material/Material.ts" />
var Blend;
(function (Blend) {
    var application;
    (function (application) {
        /**
         * Base class for implementing an Application component
         */
        var Application = (function (_super) {
            __extends(Application, _super);
            function Application(config) {
                if (config === void 0) { config = {}; }
                _super.call(this, Blend.apply(config, {
                    responsive: true
                }));
                var me = this;
                me.isStarted = false;
                me.isResizing = false;
                me.config.mainView = config.mainView || null;
                me.config.theme = config.theme || "default";
                me.config.style = {}; // remove use provided styles
                me.setContext(new Blend.mvc.Context());
                me.createMainView();
            }
            /**
             * Used to fire an event when the browser is resized
             */
            Application.prototype.notifyApplicationResized = function (evt) {
                var me = this;
                me.fireEvent("applicationResized", evt);
            };
            /**
             * Handle the resize notification correctly
             */
            Application.prototype.onWindowResize = function () {
                var me = this;
                if (!me.isResizing) {
                    me.isResizing = true;
                    me.notifyApplicationResized.apply(me, arguments);
                    me.isResizing = false;
                }
            };
            /**
             * Install an event listener on the window
             */
            Application.prototype.setupWindowListeners = function () {
                var me = this, tm = -1, counts = 0, curSize = -1;
                Blend.Runtime.addEventListener(window, "resize", function (evt) {
                    curSize = window.innerWidth + window.innerHeight;
                    clearInterval(tm);
                    tm = setInterval(function () {
                        if (counts >= 3) {
                            if (curSize === (window.innerWidth + innerHeight)) {
                                clearInterval(tm);
                                me.onWindowResize.apply(me, [evt]);
                            }
                            else {
                                counts = 0;
                            }
                        }
                        else {
                            counts++;
                        }
                    }, 50);
                });
            };
            /**
             * Fires when the application is ready for user interaction
             */
            Application.prototype.notifyApplicationReady = function () {
                var me = this;
                me.fireEvent("applicationReady");
            };
            Application.prototype.performInitialMediaQuery = function () {
                Blend.Runtime.triggerMediaQueryCheck();
            };
            Application.prototype.asyncRun = function () {
                var me = this, body = Blend.getElement(document.body);
                if (!me.isStarted) {
                    body.clearElement();
                    body.addCssClass(me.config.theme, false);
                    body.append(me.getElement());
                    me.setupWindowListeners();
                    me.performInitialMediaQuery();
                    me.doInitialize();
                    me.notifyApplicationReady();
                    me.isStarted = true;
                }
            };
            /**
             * Creates the main view of this application
             * */
            Application.prototype.createMainView = function () {
                var me = this;
                if (me.config.mainView) {
                    me.mainView = Blend.createComponent(me.config.mainView, {
                        parent: me
                    });
                    if (Blend.isInstanceOf(me.mainView, Blend.material.Material)) {
                        me.setContext(me.context);
                        me.mainView.addCssClass("mb-mainview");
                        if (me.mainView.getProperty("useParentController", true) === true) {
                            me.mainView.addController(me.controllers);
                        }
                    }
                    else {
                        throw new Error("The provide mainView is not a valid View instance!");
                    }
                }
                else {
                    throw new Error("Missing or invalid mainView!");
                }
            };
            Application.prototype.renderMainView = function () {
                return this.mainView.getElement();
            };
            Application.prototype.finalizeRender = function () {
                var me = this;
                _super.prototype.finalizeRender.call(this);
                /**
                 * We cleanup the main view bounds to force it to fit into the application
                 */
                me.mainView.setBounds({ top: null, left: null, width: null, height: null });
                me.mainView.setStyle({ display: null });
            };
            Application.prototype.render = function () {
                var me = this;
                return Blend.dom.Element.create({
                    cls: ["mb-application"],
                    children: [me.renderMainView()]
                });
            };
            /**
             * Entry point of a Blend application
             */
            Application.prototype.run = function () {
                var me = this;
                if (!me.isStarted) {
                    Blend.Runtime.ready(function () {
                        me.asyncRun.apply(me, arguments);
                    }, me);
                    Blend.Runtime.kickStart();
                }
            };
            return Application;
        }(Blend.material.Material));
        application.Application = Application;
    })(application = Blend.application || (Blend.application = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../../Typings.ts" />
/// <reference path="../../Blend.ts" />
/// <reference path="../../Component.ts" />
/// <reference path="../../dom/Element.ts" />
var Blend;
(function (Blend) {
    var material;
    (function (material) {
        var effect;
        (function (effect) {
            var Ripple = (function (_super) {
                __extends(Ripple, _super);
                function Ripple(config) {
                    if (config === void 0) { config = {}; }
                    _super.call(this, config);
                    var me = this;
                    me.removeQueue = [];
                    me.rippleDuration = 350;
                    me.skipMouseEvent = false;
                    me.center = config.center === true ? true : false;
                    me.element = config.element || null;
                    if (me.element !== null) {
                        me.bindEvents();
                        me.setRippleColor(config.color || null);
                    }
                }
                Ripple.prototype.bindEvents = function () {
                    var me = this;
                    if (me.element.getProperty("hasRipple", false) === false) {
                        me.element.addEventListener("mousedown", Blend.bind(me, me.handleDownEvent));
                        me.element.addEventListener("mouseup mouseleave", Blend.bind(me, me.handleHandleUpEvent));
                        me.element.setProperty("hasRipple", true);
                        me.createRippleContainer();
                    }
                };
                Ripple.prototype.createRippleContainer = function () {
                    var me = this, copyStyles = me.element.getStyle(["border-radius", "border-color", "border-width", "border-style"]);
                    me.container = me.element.append(Blend.createElement({
                        cls: "mb-ripple-container",
                        style: copyStyles
                    }));
                };
                Ripple.prototype.handleDownEvent = function (evt) {
                    var me = this, top, left, mouseEvent;
                    if (me.center === true) {
                        left = me.container.getEl().clientWidth / 2;
                        top = me.container.getEl().clientHeight / 2;
                    }
                    else {
                        mouseEvent = evt;
                        if (mouseEvent.srcElement !== me.container.getEl()) {
                            var crect = me.container.getEl().getBoundingClientRect();
                            left = mouseEvent.clientX - crect.left;
                            top = mouseEvent.clientY - crect.top;
                        }
                        else {
                            left = evt.offsetX;
                            top = evt.offsetY;
                        }
                    }
                    me.initiateRipple(left, top);
                };
                Ripple.prototype.handleHandleUpEvent = function () {
                    var me = this;
                    while (me.removeQueue.length !== 0) {
                        var ripple = me.removeQueue.splice(0, 1)[0];
                        setTimeout(function () {
                            ripple.removeCssClass(["mb-ripple-active"]);
                            setTimeout(function () {
                                ripple.getEl().parentNode.removeChild(ripple.getEl());
                            }, 2000);
                        }, me.rippleDuration * 0.4);
                    }
                };
                Ripple.prototype.initiateRipple = function (left, top) {
                    var me = this, ripple = me.container.append(Blend.createElement({
                        cls: ["mb-ripple"],
                        style: {
                            top: top,
                            left: left
                        }
                    })), width = me.element.getEl().clientWidth, height = me.element.getEl().clientHeight, x = Math.max(Math.abs(width - left), left) * 2, y = Math.max(Math.abs(height - top), top) * 2, size = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
                    ripple.setStyle({
                        width: size,
                        height: size,
                        "background-color": me.color
                    });
                    ripple.addCssClass(["mb-ripple-placed"]);
                    setTimeout(function () {
                        ripple.addCssClass(["mb-ripple-scaled"]);
                        ripple.addCssClass(["mb-ripple-active"]);
                    }, 5);
                    me.removeQueue.push(ripple);
                };
                /**
                 * Converts a hex color to a RGB format
                 */
                Ripple.prototype.hexToRgb = function (value) {
                    if (Blend.isString(value) && value.length !== 0 && value[0] === "#") {
                        if (value.length === 4) {
                            var t = value.split("");
                            value = "#" + t[1] + t[1] + t[2] + t[2] + t[3] + t[3];
                        }
                        if (value.length === 7) {
                            var p = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
                            return p ? "rgba(" + parseInt(p[1], 16) + "," + parseInt(p[2], 16) + "," + parseInt(p[3], 16) + ")" : null;
                        }
                    }
                    return value;
                };
                Ripple.prototype.setRippleColor = function (color) {
                    var me = this, opacity = 0.95, prop = "color", clr, defaultColor = "rgb(0,0,0)";
                    if (Blend.isInstanceOf(color, Blend.dom.Element)) {
                        clr = color.getStyle(prop)[prop];
                    }
                    else {
                        clr = color;
                        if (clr && clr.length !== 0 && clr[0].inArray([".", "#"])) {
                            var el = Blend.selectElement(clr, me.element);
                            if (el) {
                                clr = el.getStyle(prop)[prop];
                            }
                        }
                        clr = me.hexToRgb(clr || defaultColor);
                    }
                    var t = clr.replace(/\brgba\b|\brgb\b|\s|\(|\)/g, "").split(",");
                    if (t.length >= 3) {
                        clr = "rgba(" + t[0] + "," + t[1] + "," + t[2] + "," + opacity + ")";
                    }
                    else {
                        clr = "rgba(0,0,0," + opacity + ")";
                    }
                    me.color = clr;
                };
                return Ripple;
            }(Blend.Component));
            effect.Ripple = Ripple;
        })(effect = material.effect || (material.effect = {}));
    })(material = Blend.material || (Blend.material = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../Typings.ts" />
var Blend;
(function (Blend) {
    var dom;
    (function (dom) {
        var ElementConfigBuilder = (function () {
            function ElementConfigBuilder(config) {
                var me = this, cfg = {};
                if (Blend.isString(config)) {
                    cfg = {
                        tag: config
                    };
                }
                else {
                    cfg = config;
                }
                me.config = Blend.apply({
                    tag: "div",
                    cls: [],
                    children: [],
                    listeners: {},
                    data: {},
                    style: {},
                    selectable: null
                }, cfg, true, true);
            }
            ElementConfigBuilder.prototype.addChild = function (child) {
                var me = this;
                if (Blend.isInstanceOf(child, Blend.dom.ElementConfigBuilder)) {
                    me.config.children.push(child);
                    return child;
                }
                else {
                    var c = new Blend.dom.ElementConfigBuilder(child);
                    me.config.children.push(c);
                    return c;
                }
            };
            ElementConfigBuilder.prototype.setStyle = function (styles) {
                var me = this;
                Blend.forEach(styles, function (v, k) {
                    me.config.style[k] = v;
                });
                return this;
            };
            ElementConfigBuilder.prototype.setSelectable = function (state) {
                this.config.selectable = state;
                return this;
            };
            ElementConfigBuilder.prototype.setText = function (text) {
                this.config.text = text;
                return this;
            };
            ElementConfigBuilder.prototype.addCSS = function (css) {
                var me = this;
                css.forEach(function (itm) {
                    me.config.cls.push(itm);
                });
                return this;
            };
            ElementConfigBuilder.prototype.setOID = function (oid) {
                this.config.oid = oid;
                return this;
            };
            ElementConfigBuilder.prototype.setTag = function (tag) {
                this.config.tag = tag;
                return this;
            };
            ElementConfigBuilder.prototype.getConfig = function () {
                return this.config;
            };
            return ElementConfigBuilder;
        }());
        dom.ElementConfigBuilder = ElementConfigBuilder;
    })(dom = Blend.dom || (Blend.dom = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../material/Material.ts" />
/// <reference path="../material/effect/Ripple.ts" />
/// <reference path="../dom/Element.ts" />
/// <reference path="../dom/ElementConfigBuilder.ts" />
var Blend;
(function (Blend) {
    var button;
    (function (button) {
        /**
         * Base class for implementing a Button
         */
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(config) {
                if (config === void 0) { config = {}; }
                _super.call(this, config);
                this.wrapperElement = null;
                this.textElement = null;
                this.iconElement = null;
                var me = this;
                me.buttonTypes = ["flat", "raised", "fab", "fab-mini", "round-flat", "round-raised"];
                me.fabPositions = [
                    "top-right",
                    "top-center",
                    "top-left",
                    "center-right",
                    "center-center",
                    "center-left",
                    "bottom-right",
                    "bottom-center",
                    "bottom-left",
                    "relative"
                ];
                me.iconSizes = {
                    "small": 18,
                    "medium": 24,
                    "large": 36,
                    "xlarge": 48
                };
                me.config = {
                    text: config.text || "",
                    icon: config.icon || null,
                    iconFamily: config.iconFamily || "material-icons",
                    iconAlign: me.getCheckIconAlign(config.iconAlign),
                    buttonType: me.getCheckButtonType(config.buttonType),
                    fabPosition: me.getCheckFabPosition(config.fabPosition),
                    theme: config.theme || "default",
                    disabled: config.disabled === true ? true : false,
                    iconSize: config.iconSize || null,
                    ripple: config.ripple === false ? false : true
                };
            }
            Button.prototype.setState = function (value) {
                var me = this;
                me.config.disabled = !value;
                if (value === true) {
                    me.element.removeAttribute("disabled");
                }
                else {
                    me.element.setAttribute("disabled", true);
                }
                return me;
            };
            Button.prototype.isEnabled = function () {
                return !this.config.disabled;
            };
            Button.prototype.getCheclIconSize = function (iconSize) {
                var me = this;
                iconSize = iconSize || "default";
                iconSize = iconSize.inArray(Object.keys(me.iconSizes)) ? iconSize : "default";
                return iconSize === "default" ? null : iconSize;
            };
            Button.prototype.getCheckFabPosition = function (fabPosition) {
                var me = this;
                fabPosition = fabPosition || "relative";
                fabPosition = fabPosition.inArray(me.fabPositions) ? fabPosition : "relative";
                return fabPosition === "relative" ? null : fabPosition;
            };
            Button.prototype.getCheckIconAlign = function (iconAlign) {
                iconAlign = iconAlign || "left";
                return iconAlign.inArray(["left", "right"]) ? iconAlign : "left";
            };
            Button.prototype.getCheckButtonType = function (buttonType) {
                var me = this;
                buttonType = (buttonType || "flat");
                return buttonType.inArray(me.buttonTypes) ? buttonType : "flat";
            };
            Button.prototype.setTheme = function (theme) {
                var me = this;
                me.config.theme = theme || "default";
                me.performLayout();
                return me;
            };
            Button.prototype.setButtonType = function (buttonType) {
                var me = this;
                me.config.buttonType = me.getCheckButtonType(buttonType);
                me.element.clearCssClass().addCssClass(["mb-btn"]);
                me.performLayout();
                return me;
            };
            Button.prototype.setText = function (text) {
                var me = this;
                me.config.text = text;
                me.textElement.setHtml(text);
                me.performLayout();
                return this;
            };
            Button.prototype.setIconSize = function (iconSize) {
                var me = this, sizeCss = "mb-btn-icon-size";
                me.config.iconSize = me.getCheclIconSize(iconSize);
                me.element.removeCssClassLike([sizeCss]);
                if (iconSize !== null) {
                    me.element.addCssClass([(sizeCss + "-") + me.config.iconSize]);
                    me.performLayout();
                }
                return this;
            };
            Button.prototype.setIcon = function (icon) {
                var me = this;
                me.config.icon = icon;
                me.iconElement.setHtml(icon);
                me.performLayout();
                return this;
            };
            Button.prototype.setFabPosition = function (fabPosition) {
                var me = this, posCss = "mb-" + me.config.buttonType + "-pos";
                if (me.isFab()) {
                    me.config.fabPosition = me.getCheckFabPosition(fabPosition);
                    me.element.removeCssClassLike([posCss]);
                    me.element.addCssClass([(posCss + "-") + me.config.fabPosition]);
                    me.performLayout();
                }
                return this;
            };
            Button.prototype.updateLayout = function () {
                var me = this, themeCls = "btn-theme-" + me.config.buttonType + "-" + me.config.theme, bothCls = "mb-btn-" + me.config.buttonType + "-both", textOnlyCls = "mb-btn-" + me.config.buttonType + "-text-only", iconOnlyCls = "mb-btn-" + me.config.buttonType + "-icon-only", textIconCls = "mb-btn-inner-texticon", iconTextCls = "mb-btn-inner-icontext", hasIcon = me.config.icon !== null, hasText = (me.config.text || "").trim() !== "", roundOrFabButton = me.config.buttonType.indexOf("round") !== -1 || me.config.buttonType.indexOf("fab") !== -1;
                me.element.removeCssClass([textOnlyCls, iconOnlyCls, bothCls, themeCls]);
                me.wrapperElement.removeCssClass([textIconCls, iconTextCls]);
                if (me.isFab() || me.isRound()) {
                    hasText = false;
                    if (!hasIcon) {
                        hasIcon = true;
                        me.setIcon("mood");
                    }
                    if (me.config.fabPosition && me.isFab()) {
                        me.setFabPosition(me.config.fabPosition);
                    }
                    if (me.isRound()) {
                        me.setIconSize(me.config.iconSize);
                    }
                }
                else {
                    me.setIconSize(me.config.iconSize);
                }
                if (hasText && hasIcon) {
                    me.element.addCssClass([bothCls]);
                    if (me.config.iconAlign === "left") {
                        me.wrapperElement.addCssClass(iconTextCls);
                    }
                    else if (me.config.iconAlign === "right") {
                        me.wrapperElement.addCssClass(textIconCls);
                    }
                }
                else if (hasText) {
                    me.element.addCssClass([textOnlyCls]);
                }
                else if (hasIcon) {
                    me.element.addCssClass([iconOnlyCls]);
                }
                me.element.addCssClass([themeCls]);
                me.setState(!me.config.disabled);
                if (me.config.ripple === true) {
                    me.rippleEffect = null; // remove the old one!
                    me.rippleEffect = new Blend.material.effect.Ripple({
                        element: me.element,
                        center: roundOrFabButton ? true : false,
                        color: roundOrFabButton ? me.iconElement : me.textElement
                    });
                }
            };
            Button.prototype.notifyClick = function (evt) {
                var me = this;
                me.fireEvent("click", evt);
            };
            Button.prototype.initEvents = function () {
                var me = this;
                me.element.addEventListener("click", me.notifyClick.bind(me));
            };
            /**
             * Check if this button is a Floating Action Button
             */
            Button.prototype.isFab = function () {
                return this.config.buttonType.indexOf("fab") !== -1;
            };
            /**
             * Check if this button is either a round-flat or round-raised
             */
            Button.prototype.isRound = function () {
                return this.config.buttonType.indexOf("round") !== -1;
            };
            Button.prototype.render = function () {
                var me = this;
                var buttonEl = new Blend.dom.ElementConfigBuilder("button")
                    .addCSS(["mb-btn"]);
                var innerEl = new Blend.dom.ElementConfigBuilder("span")
                    .setOID("wrapperElement")
                    .addCSS(["mb-btn-inner"]);
                var txtEl = new Blend.dom.ElementConfigBuilder("span")
                    .setOID("textElement")
                    .addCSS(["mb-btn-text"])
                    .setText(me.config.text);
                var iconEl = new Blend.dom.ElementConfigBuilder("i")
                    .setOID("iconElement")
                    .addCSS(["mb-btn-icon", me.config.iconFamily]);
                if (me.config.icon !== null) {
                    iconEl.setText(me.config.icon);
                }
                if (me.config.iconAlign === "left") {
                    innerEl.addChild(iconEl);
                    innerEl.addChild(txtEl);
                }
                if (me.config.iconAlign === "right") {
                    innerEl.addChild(txtEl);
                    innerEl.addChild(iconEl);
                }
                buttonEl.addChild(innerEl);
                return Blend.dom.Element.create(buttonEl, me.assignElementByOID, me);
            };
            return Button;
        }(Blend.material.Material));
        button.Button = Button;
    })(button = Blend.button || (Blend.button = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../material/Material.ts" />
/// <reference path="../dom/Element.ts" />
var Blend;
(function (Blend) {
    var container;
    (function (container) {
        var Container = (function (_super) {
            __extends(Container, _super);
            function Container() {
                _super.apply(this, arguments);
            }
            return Container;
        }(Blend.material.Material));
        container.Container = Container;
    })(container = Blend.container || (Blend.container = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../Blend.ts" />
/// <reference path="Material.ts" />
var Blend;
(function (Blend) {
    var material;
    (function (material) {
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle(config) {
                if (config === void 0) { config = {}; }
                _super.call(this, config);
                var me = this;
                me.setBounds({
                    width: config.width || 100,
                    height: config.height || 100
                });
                me.setStyle({
                    "background-color": config.color || "transparent",
                    "border": config.border === true ? "1px solid #000" : null
                });
                me.layoutCount = 0;
            }
            Rectangle.prototype.layoutView = function () {
                var me = this;
                me.layoutCount++;
            };
            Rectangle.prototype.finalizeRender = function () {
                var me = this;
                _super.prototype.finalizeRender.call(this);
                me.addCssClass("m-rectangle");
            };
            Rectangle.prototype.log = function () {
                var me = this;
                me.element.setHtml("<pre>Layouts: " + me.layoutCount + "</pre>");
            };
            return Rectangle;
        }(Blend.material.Material));
        material.Rectangle = Rectangle;
        Blend.registerClassWithAlias("mb.rect", Blend.material.Rectangle);
    })(material = Blend.material || (Blend.material = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../Typings.ts" />
/// <reference path="../Component.ts" />
var Blend;
(function (Blend) {
    var mvc;
    (function (mvc) {
        /**
         * Provides a generic and bindable Model
         */
        var Model = (function (_super) {
            __extends(Model, _super);
            function Model(config) {
                if (config === void 0) { config = {}; }
                _super.call(this, config);
                this.data = config;
                this.createProperties();
            }
            /**
            * Sets the values of the fields in this Model. This action triggers
            * all the handlers for bound View setters
            */
            Model.prototype.setData = function (data) {
                var me = this, sname;
                Blend.forEach(data, function (value, name) {
                    sname = "set" + name.ucfirst();
                    if (me.hasFunction(sname)) {
                        me.applyFunction(sname, [value]);
                    }
                });
            };
            /**
             * Gets the current data in this Model
             */
            Model.prototype.getData = function () {
                return this.data;
            };
            /**
             * Creates automatic properties for this Model when there are no
             * custom getters/setters available
             */
            Model.prototype.createProperties = function () {
                var me = this, sname, gname;
                Blend.forEach(me.data, function (value, name) {
                    gname = "get" + name.ucfirst(),
                        sname = "set" + name.ucfirst();
                    if (!me.hasFunction(gname)) {
                        me[gname] = function () {
                            return me.data[name];
                        };
                    }
                    if (!me.hasFunction(sname)) {
                        me[sname] = function (data) {
                            me.data[name] = data;
                            return me;
                        };
                    }
                });
            };
            return Model;
        }(Blend.Component));
        mvc.Model = Model;
    })(mvc = Blend.mvc || (Blend.mvc = {}));
})(Blend || (Blend = {}));
/**
 * Copyright 2016 TrueSoftware B.V. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../application/Application.ts" />
var Blend;
(function (Blend) {
    var web;
    (function (web) {
        /**
         * Base class for a web/desktop application
         */
        var Application = (function (_super) {
            __extends(Application, _super);
            function Application() {
                _super.apply(this, arguments);
            }
            return Application;
        }(Blend.application.Application));
        web.Application = Application;
    })(web = Blend.web || (Blend.web = {}));
})(Blend || (Blend = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9ibGVuZC9zcmMvY29tbW9uL1V0aWxzLnRzIiwiLi4vLi4vYmxlbmQvc3JjL1R5cGluZ3MudHMiLCIuLi8uLi9ibGVuZC9zcmMvYmluZGluZy9CaW5kaW5nUHJvdmlkZXIudHMiLCIuLi8uLi9ibGVuZC9zcmMvQ29tcG9uZW50LnRzIiwiLi4vLi4vYmxlbmQvc3JjL2RvbS9DbGFzc0xpc3QudHMiLCIuLi8uLi9ibGVuZC9zcmMvZG9tL1N0eWxlTGlzdC50cyIsIi4uLy4uL2JsZW5kL3NyYy9kb20vRWxlbWVudC50cyIsIi4uLy4uL2JsZW5kL3NyYy9SdW50aW1lLnRzIiwiLi4vLi4vYmxlbmQvc3JjL0JsZW5kLnRzIiwiLi4vLi4vYmxlbmQvc3JjL1ZlcnNpb24udHMiLCIuLi8uLi9ibGVuZC9zcmMvYWpheC9BamF4UmVxdWVzdC50cyIsIi4uLy4uL2JsZW5kL3NyYy9hamF4L0FqYXhHZXRSZXF1ZXN0LnRzIiwiLi4vLi4vYmxlbmQvc3JjL2FqYXgvQWpheFBvc3RSZXF1ZXN0LnRzIiwiLi4vLi4vYmxlbmQvc3JjL212Yy9DbGllbnQudHMiLCIuLi8uLi9ibGVuZC9zcmMvbXZjL1ZpZXcudHMiLCIuLi8uLi9ibGVuZC9zcmMvbXZjL0NvbnRyb2xsZXIudHMiLCIuLi8uLi9ibGVuZC9zcmMvbXZjL0NvbnRleHQudHMiLCIuLi8uLi9ibGVuZC9zcmMvbWF0ZXJpYWwvTWF0ZXJpYWwudHMiLCIuLi8uLi9ibGVuZC9zcmMvYXBwbGljYXRpb24vQXBwbGljYXRpb24udHMiLCIuLi8uLi9ibGVuZC9zcmMvbWF0ZXJpYWwvZWZmZWN0L1JpcHBsZS50cyIsIi4uLy4uL2JsZW5kL3NyYy9kb20vRWxlbWVudENvbmZpZ0J1aWxkZXIudHMiLCIuLi8uLi9ibGVuZC9zcmMvYnV0dG9uL0J1dHRvbi50cyIsIi4uLy4uL2JsZW5kL3NyYy9jb250YWluZXIvQ29udGFpbmVyLnRzIiwiLi4vLi4vYmxlbmQvc3JjL2xvZ2dlci9Mb2dnZXJJbnRlcmZhY2UudHMiLCIuLi8uLi9ibGVuZC9zcmMvbWF0ZXJpYWwvUmVjdGFuZ2xlLnRzIiwiLi4vLi4vYmxlbmQvc3JjL212Yy9Nb2RlbC50cyIsIi4uLy4uL2JsZW5kL3NyYy93ZWIvQXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQXFCSCxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUN6Qzs7T0FFRztJQUNILGNBQWMsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFVBQVMsS0FBSztRQUNsRCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNsRCxDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUM7QUFDTixDQUFDO0FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUc7UUFDdkIsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLElBQUksR0FBRyxTQUFTLENBQUM7UUFDaEMsVUFBVSxDQUFDO1lBQ1AsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQyxDQUFDO0FB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LFNBQVMsR0F5RHpDO1FBekRZLFNBQUssUUF5RGpCLENBQUE7SUFFTCxDQUFDLEVBaEVlLEdBQUcsR0FBSCxTQUFHLEtBQUgsU0FBRyxRQWdFbEI7QUFBRCxDQUFDLEVBaEVTLEtBQUssS0FBTCxLQUFLLFFBZ0VkO0FDbkZEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRUgsc0RBQXNEO0FBRXRELElBQVUsS0FBSyxDQU1kO0FBTkQsV0FBVSxLQUFLO0lBQUMsSUFBQSxHQUFHLENBTWxCO0lBTmUsV0FBQSxHQUFHLEVBQUMsQ0FBQztRQUNqQjs7V0FFRztRQUNIO1lBQWlDLCtCQUE2QjtZQUE5RDtnQkFBaUMsOEJBQTZCO1lBQzlELENBQUM7WUFBRCxrQkFBQztRQUFELENBQUMsQUFERCxDQUFpQyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FDN0Q7UUFEWSxlQUFXLGNBQ3ZCLENBQUE7SUFDTCxDQUFDLEVBTmUsR0FBRyxHQUFILFNBQUcsS0FBSCxTQUFHLFFBTWxCO0FBQUQsQ0FBQyxFQU5TLEtBQUssS0FBTCxLQUFLLFFBTWQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IDIwMTYgVHJ1ZVNvZnR3YXJlIEIuVi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmludGVyZmFjZSBBcnJheTxUPiB7XHJcbiAgICB1bmlxdWUoKTogQXJyYXk8VD47XHJcbn1cclxuXHJcbmludGVyZmFjZSBTdHJpbmcge1xyXG4gICAgdWNmaXJzdCgpOiBzdHJpbmc7XHJcbiAgICByZXBlYXQoY291bnRzOiBudW1iZXIpOiBzdHJpbmc7XHJcbiAgICBzdGFydHNXaXRoKHNlYXJjaFN0cmluZzogc3RyaW5nLCBwb3NpdGlvbj86IG51bWJlcik6IGJvb2xlYW47XHJcbiAgICBpbkFycmF5KGxpc3Q6IEFycmF5PHN0cmluZz4pOiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgRnVuY3Rpb24ge1xyXG4gICAgYXN5bmM6IGFueTtcclxufVxyXG5cclxuaW50ZXJmYWNlIFhNTEh0dHBSZXF1ZXN0IHtcclxuICAgIHNlbmRBc0JpbmFyeShkYXRhOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5pZiAoIVhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZW5kQXNCaW5hcnkpIHtcclxuICAgIC8qKlxyXG4gICAgICogRnJvbSBNRE5cclxuICAgICAqL1xyXG4gICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNlbmRBc0JpbmFyeSA9IGZ1bmN0aW9uKHNEYXRhKSB7XHJcbiAgICAgICAgdmFyIG5CeXRlcyA9IHNEYXRhLmxlbmd0aCwgdWk4RGF0YSA9IG5ldyBVaW50OEFycmF5KG5CeXRlcyk7XHJcbiAgICAgICAgZm9yICh2YXIgbklkeCA9IDA7IG5JZHggPCBuQnl0ZXM7IG5JZHgrKykge1xyXG4gICAgICAgICAgICB1aThEYXRhW25JZHhdID0gc0RhdGEuY2hhckNvZGVBdChuSWR4KSAmIDB4ZmY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VuZCh1aThEYXRhKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmlmICghRnVuY3Rpb24ucHJvdG90eXBlLmFzeW5jKSB7XHJcbiAgICBGdW5jdGlvbi5wcm90b3R5cGUuYXN5bmMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgbWUgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIG1lLmFwcGx5KG1lLCBhcmdzKTtcclxuICAgICAgICB9LCAxKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmlmICghU3RyaW5nLnByb3RvdHlwZS5pbkFycmF5KSB7XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLmluQXJyYXkgPSBmdW5jdGlvbihsaXN0OiBBcnJheTxzdHJpbmc+ID0gW10pOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgIT09IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGxpc3RbaV0gPT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxufVxyXG5cclxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnJlcGVhdCkge1xyXG4gICAgU3RyaW5nLnByb3RvdHlwZS5yZXBlYXQgPSBmdW5jdGlvbihjb3VudHM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgQXJyYXkoY291bnRzICsgMSkuam9pbih0aGlzKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmlmICghU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKSB7XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggPSBmdW5jdGlvbihzZWFyY2hTdHJpbmc6IHN0cmluZywgcG9zaXRpb246IG51bWJlciA9IDApIHtcclxuICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIHx8IDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic3RyKHBvc2l0aW9uLCBzZWFyY2hTdHJpbmcubGVuZ3RoKSA9PT0gc2VhcmNoU3RyaW5nO1xyXG4gICAgfTtcclxufVxyXG5cclxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnVjZmlyc3QpIHtcclxuICAgIFN0cmluZy5wcm90b3R5cGUudWNmaXJzdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5zbGljZSgxKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmlmICghU3RyaW5nLnByb3RvdHlwZS50cmltKSB7XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLnRyaW0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgXCJcIik7XHJcbiAgICB9O1xyXG59XHJcblxyXG5pZiAoISg8YW55PkFycmF5LnByb3RvdHlwZSkudW5pcXVlKSB7XHJcbiAgICAoPGFueT5BcnJheS5wcm90b3R5cGUpLnVuaXF1ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbihpdGVtOiBhbnksIGk6IGFueSwgYWxsSXRlbXM6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaSA9PT0gYWxsSXRlbXMuaW5kZXhPZihpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn0iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYgVHJ1ZVNvZnR3YXJlIEIuVi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBJbnRlcmZhY2UgZm9yIGNvbmZpZ3VyaW5nIGEgZGljdGlvYW55XHJcbiAqL1xyXG5pbnRlcmZhY2UgRGljdGlvbmFyeUludGVyZmFjZSB7XHJcbiAgICBbbmFtZTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGZvciBjb25maWd1cmluZyBTdHlsZXNcclxuICovXHJcbmludGVyZmFjZSBTdHlsZUludGVyZmFjZSB7XHJcbiAgICBbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGZvciBhc3NpZ25pbmcgRXZlbnRMaXN0ZW5lcnMgdG8gRE9NIEVsZW1lbnRzXHJcbiAqL1xyXG5pbnRlcmZhY2UgQ3JlYXRlRWxlbWVudEV2ZW50TGlzdGVuZXJzSW50ZXJmYWNlIHtcclxuICAgIFtuYW1lOiBzdHJpbmddOiBFdmVudExpc3RlbmVyO1xyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGZvciBjb25maWd1cmluZyB0aGUgRG9tLmNyZWF0ZUVsZW1lbnQgdXRpbGl0eVxyXG4gKi9cclxuaW50ZXJmYWNlIENyZWF0ZUVsZW1lbnRJbnRlcmZhY2Uge1xyXG4gICAgdGFnPzogc3RyaW5nO1xyXG4gICAgc2NvcGU/OiBhbnk7XHJcbiAgICBvaWQ/OiBzdHJpbmc7XHJcbiAgICBjbHM/OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+O1xyXG4gICAgbGlzdGVuZXJzPzogQ3JlYXRlRWxlbWVudEV2ZW50TGlzdGVuZXJzSW50ZXJmYWNlO1xyXG4gICAgdGV4dD86IHN0cmluZztcclxuICAgIGNoaWxkcmVuPzogQXJyYXk8Q3JlYXRlRWxlbWVudEludGVyZmFjZSB8IEhUTUxFbGVtZW50IHwgQmxlbmQuZG9tLkVsZW1lbnQ+O1xyXG4gICAgZGF0YT86IGFueTtcclxuICAgIHN0eWxlPzogU3R5bGVJbnRlcmZhY2U7XHJcbiAgICBzZWxlY3RhYmxlPzogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqICBJbnRlcmZhY2UgZm9yIGNvbmZpZ3VyaW5nIGEgQ29tcG9uZW50XHJcbiAqL1xyXG5pbnRlcmZhY2UgQmluZGFibGVJbnRlcmZhY2Uge1xyXG4gICAgaGFzRnVuY3Rpb24oZm5hbWU6IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgICBhcHBseUZ1bmN0aW9uKG5hbWU6IHN0cmluZywgYXJnczogQXJyYXk8YW55PiB8IElBcmd1bWVudHMpOiBhbnk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnRlcmZhY2UgZm9yIGNvbmZpZ3VyaW5nIGEgQmxlbmQuQ29tcG9uZW50IGNsYXNzXHJcbiAqL1xyXG5pbnRlcmZhY2UgQ29tcG9uZW50Q2xhc3Mge1xyXG4gICAgbmV3IChjb25maWc/OiBhbnkpOiBCbGVuZC5Db21wb25lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDbGFzcyByZWdpc3RlcnkgaXRlbSBpbnRlcmZhY2VcclxuICovXHJcbmludGVyZmFjZSBDbGFzc1JlZ2lzdHJ5SW50ZXJmYWNlIHtcclxuICAgIFtuYW1lOiBzdHJpbmddOiBDb21wb25lbnRDbGFzcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSBmb3IgY29uZmlndXJpbmcgYSBDb21wb25lbnQgdXNpbmcgSlNPTiBjb25maWcgbm90YXRpb25cclxuICogd2l0aCBhIGNvbmZpZyB0eXBlIGN0eXBlXHJcbiAqL1xyXG5pbnRlcmZhY2UgQ29tcG9uZW50Q29uZmlnIHtcclxuICAgIGN0eXBlPzogQ29tcG9uZW50VHlwZXM7XHJcbiAgICBbbmFtZTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGZvciBjb25maWd1cmluZyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBjb250cm9sbGVyXHJcbiAqL1xyXG5pbnRlcmZhY2UgRnVuY3Rpb25Bc0NvbnRyb2xsZXIge1xyXG4gICAgKGNsaWVudDogQmxlbmQubXZjLkNsaWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcclxufVxyXG4vKipcclxuICogQ3VzdG9tIHR5cGUgZGVzY3JpYmluZyBhIGN0eXBlXHJcbiAqL1xyXG50eXBlIENvbXBvbmVudFR5cGVzID0gQ29tcG9uZW50Q2xhc3MgfCBDb21wb25lbnRDb25maWcgfCBzdHJpbmc7XHJcbnR5cGUgQ29udHJvbGxlclR5cGUgPSBDb21wb25lbnRDbGFzcyB8IEJsZW5kLm12Yy5Db250cm9sbGVyIHwgRnVuY3Rpb25Bc0NvbnRyb2xsZXIgfCBzdHJpbmc7XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGZvciBjb25maWd1cmluZyBhIE1WQyBDbGllbnQgKFVzZWQgYnkgTWF0ZXJpYWwgYW5kIENvbnRleHQpXHJcbiAqL1xyXG5pbnRlcmZhY2UgTXZjQ2xpZW50SW50ZXJmYWNlIHtcclxuICAgIGNvbnRyb2xsZXI/OiBDb250cm9sbGVyVHlwZSB8IEFycmF5PENvbnRyb2xsZXJUeXBlPjtcclxuICAgIGNvbnRleHQ/OiBCbGVuZC5tdmMuQ29udGV4dDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSBmb3IgY29uZmlndXJpbmcgYSBNVkMgVmlld1xyXG4gKi9cclxuaW50ZXJmYWNlIE12Y1ZpZXdJbnRlcmZhY2UgZXh0ZW5kcyBNdmNDbGllbnRJbnRlcmZhY2Uge1xyXG4gICAgcmVmZXJlbmNlPzogc3RyaW5nO1xyXG4gICAgW25hbWU6IHN0cmluZ106IGFueTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSBmb3IgY29uZmlndXJpbmcgYSBNYXRlcmlhbCdzIGJvdW5kcyBhbmQgdmlzaWJpbGl0eVxyXG4gKi9cclxuaW50ZXJmYWNlIEVsZW1lbnRCb3VuZHNJbnRlcmZhY2Uge1xyXG4gICAgdG9wPzogbnVtYmVyO1xyXG4gICAgbGVmdD86IG51bWJlcjtcclxuICAgIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgaGVpZ2h0PzogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgdmlzaWJsZT86IGJvb2xlYW47XHJcbn1cclxuXHJcblxyXG5pbnRlcmZhY2UgTWVkaWFRdWVyeUNvbmZpZyBleHRlbmRzIERpY3Rpb25hcnlJbnRlcmZhY2Uge1xyXG4gICAgW25hbWU6IHN0cmluZ106IHN0cmluZyB8IEFycmF5PHN0cmluZz47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnRlcmZhY2UgZm9yIGNvbmZpZ3VyaW5nIGFuIEFqYXggKFBvc3QvR2V0KSBxdWVyeVxyXG4gKi9cclxuaW50ZXJmYWNlIEFqYXhSZXF1ZXN0SW50ZXJmYWNlIHtcclxuICAgIHVybDogc3RyaW5nO1xyXG4gICAgaGVhZGVycz86IERpY3Rpb25hcnlJbnRlcmZhY2U7XHJcbiAgICBvblN0YXJ0PzogRnVuY3Rpb247XHJcbiAgICBvblByb2dyZXNzPzogRnVuY3Rpb247XHJcbiAgICBvblByZXBhcmVVcGxvYWQ/OiBGdW5jdGlvbjtcclxuICAgIG9uQ29tcGxldGU/OiBGdW5jdGlvbjtcclxuICAgIG9uU3VjY2Vzcz86IEZ1bmN0aW9uO1xyXG4gICAgb25GYWlsZWQ/OiBGdW5jdGlvbjtcclxuICAgIHNjb3BlPzogYW55O1xyXG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSBmb3IgY29uZmlndXJpbmcgdGhlIHBhZGRpbmcgb2YgYW4gRWxlbWVudFxyXG4gKi9cclxuaW50ZXJmYWNlIFBhZGRpbmdJbnRlcmZhY2Uge1xyXG4gICAgdG9wPzogbnVtYmVyO1xyXG4gICAgcmlnaHQ/OiBudW1iZXI7XHJcbiAgICBib3R0b20/OiBudW1iZXI7XHJcbiAgICBsZWZ0PzogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogTWF0ZXJpYWwgVHlwZXMgZGVmaW5pdGlvblxyXG4gKi9cclxudHlwZSBNYXRlcmlhbFR5cGUgPSBzdHJpbmcgfCBDb21wb25lbnRDbGFzcyB8IE1hdGVyaWFsSW50ZXJmYWNlIHwgQ29udGFpbmVyTWF0ZXJpYWxJbnRlcmZhY2UgfCBCbGVuZC5tYXRlcmlhbC5NYXRlcmlhbDtcclxuXHJcbi8qKlxyXG4gKiBJbnRlcmZhY2UgZm9yIGNvbmZpZ3VyaW5nIGEgTWF0ZXJpYWxcclxuICovXHJcbmludGVyZmFjZSBNYXRlcmlhbEludGVyZmFjZSBleHRlbmRzIE12Y1ZpZXdJbnRlcmZhY2Uge1xyXG4gICAgcGFyZW50PzogQmxlbmQubWF0ZXJpYWwuTWF0ZXJpYWw7XHJcbiAgICB1c2VQYXJlbnRDb250cm9sbGVyPzogYm9vbGVhbjtcclxuICAgIGNzcz86IHN0cmluZyB8IEFycmF5PHN0cmluZz47XHJcbiAgICBzdHlsZT86IFN0eWxlSW50ZXJmYWNlO1xyXG4gICAgdmlzaWJsZT86IGJvb2xlYW47XHJcbiAgICB0b3A/OiBudW1iZXI7XHJcbiAgICBsZWZ0PzogbnVtYmVyO1xyXG4gICAgd2lkdGg/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICBoZWlnaHQ/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICByZXNwb25zaXZlPzogYm9vbGVhbjtcclxuICAgIHJlc3BvbnNlVG8/OiBNZWRpYVF1ZXJ5Q29uZmlnO1xyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGZvciBjb25maWd1cmluZyBhIENvbnRhaW5lclxyXG4gKi9cclxuaW50ZXJmYWNlIENvbnRhaW5lck1hdGVyaWFsSW50ZXJmYWNlIGV4dGVuZHMgTWF0ZXJpYWxJbnRlcmZhY2Uge1xyXG4gICAgaXRlbXM/OiBBcnJheTxNYXRlcmlhbFR5cGU+O1xyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGZvciBjb25maWd1cmluZyBhbiBBcHBsaWNhdGlvblxyXG4gKi9cclxuaW50ZXJmYWNlIEFwcGxpY2F0aW9uSW50ZXJmYWNlIGV4dGVuZHMgTWF0ZXJpYWxJbnRlcmZhY2Uge1xyXG4gICAgbWFpblZpZXc/OiBNYXRlcmlhbFR5cGU7XHJcbiAgICB0aGVtZT86IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSBmb3IgY29uZmlndXJpbmcgYSBCdXR0b25cclxuICovXHJcbmludGVyZmFjZSBCdXR0b25JbnRlcmZhY2UgZXh0ZW5kcyBNYXRlcmlhbEludGVyZmFjZSB7XHJcbiAgICBpY29uPzogc3RyaW5nO1xyXG4gICAgaWNvblNpemU/OiBzdHJpbmc7XHJcbiAgICBpY29uRmFtaWx5Pzogc3RyaW5nO1xyXG4gICAgdGhlbWU/OiBzdHJpbmc7XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgICByaXBwbGU/OiBib29sZWFuO1xyXG4gICAgdGV4dD86IHN0cmluZztcclxuICAgIGljb25BbGlnbj86IHN0cmluZztcclxuICAgIGJ1dHRvblR5cGU/OiBzdHJpbmc7XHJcbiAgICBmYWJQb3NpdGlvbj86IHN0cmluZztcclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYgVHJ1ZVNvZnR3YXJlIEIuVi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9UeXBpbmdzLnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBCbGVuZC5iaW5kaW5nIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIHNpZ25hbC9zbG90IHN0eWxlIG9iamVjdCBiaW5kaW5nLlxyXG4gICAgICogVGhlIG1hcHBpbmcgY2FuIGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nIHN0eWxlc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgQmluZGluZ1Byb3ZpZGVyIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQmluZHMgdGhlIHByb3BlcnR5cyBvZiB0d28gY29tcG9uZW50cyB1c2luZyBzZXRTb3VyY2UvZ2V0U291cmNlL3NldFRhcmdldCBtZXRob2RcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgYmluZFByb3BlcnR5KHNvdXJjZTogQmluZGFibGVJbnRlcmZhY2UsIHRhcmdldDogQmluZGFibGVJbnRlcmZhY2UsIHNyY1Byb3A6IHN0cmluZywgdHJnUHJvcDogc3RyaW5nID0gbnVsbCkge1xyXG4gICAgICAgICAgICB0cmdQcm9wID0gdHJnUHJvcCB8fCBzcmNQcm9wO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmQoc291cmNlLCB0YXJnZXQsIFwic2V0XCIgKyBzcmNQcm9wLnVjZmlyc3QoKSwgXCJzZXRcIiArIHRyZ1Byb3AudWNmaXJzdCgpLCBcImdldFwiICsgc3JjUHJvcC51Y2ZpcnN0KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJpbmQoXHJcbiAgICAgICAgICAgIHNvdXJjZTogQmluZGFibGVJbnRlcmZhY2UsXHJcbiAgICAgICAgICAgIHRhcmdldDogQmluZGFibGVJbnRlcmZhY2UsXHJcbiAgICAgICAgICAgIHNvdXJjZU1lbWJlcjogc3RyaW5nLFxyXG4gICAgICAgICAgICB0YXJnZXRNZW1iZXI6IHN0cmluZyxcclxuICAgICAgICAgICAgdXNpbmdNZW1iZXI6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgb3JnU291cmNlTWVtYmVyID0gKDxhbnk+c291cmNlKVtzb3VyY2VNZW1iZXJdO1xyXG4gICAgICAgICAgICAoPGFueT5zb3VyY2UpW3NvdXJjZU1lbWJlcl0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzciA9IG9yZ1NvdXJjZU1lbWJlci5hcHBseShzb3VyY2UsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuYXBwbHlGdW5jdGlvbih0YXJnZXRNZW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAsIFt1c2luZ01lbWJlciAhPT0gbnVsbCA/IHNvdXJjZS5hcHBseUZ1bmN0aW9uKHVzaW5nTWVtYmVyLCBbc3JdKSA6IHNyXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3I7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxNiBUcnVlU29mdHdhcmUgQi5WLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlR5cGluZ3MudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQmxlbmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiYmluZGluZy9CaW5kaW5nUHJvdmlkZXIudHNcIiAvPlxyXG5cclxubmFtZXNwYWNlIEJsZW5kIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJhc2UgY2xhc3MgZm9yIGEgY29tcG9uZW50IGluIEJsZW5kXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBDb21wb25lbnQgaW1wbGVtZW50cyBCaW5kYWJsZUludGVyZmFjZSB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogRGljdGlvbmFyeUludGVyZmFjZSA9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgdmFsdWUgb2YgYSBwZXJwZXJ0eSBvZiB0aGlzIGNvbXBvbmVudC4gVGhpcyBpcyB1c2VkIHRvXHJcbiAgICAgICAgICogUmVhZCB0aGUgcHJpdmF0ZS1pc2ggdmFsdWUgb2YgYSBjb21wb25lbnRcclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldFByb3BlcnR5PFQ+KG5hbWU6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBhbnkgPSBudWxsKTogVCB7XHJcbiAgICAgICAgICAgIHZhciBtZTogYW55ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIChtZVtuYW1lXSA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogbWVbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvdmlkZXMgYSB3YXkgdG8gZXh0ZXJuYWxseSBzZXQgYSBwcm9wZXJ0eSBvbiB0aGlzIGNvbXBvbmVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzZXRQcm9wZXJ0eShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIG1lOiBhbnkgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2hlY2sgaWYgdGhpcyBDb21wb25lbnQgaW1wbGVtZW50cyBhIGZ1bmN0aW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGhhc0Z1bmN0aW9uKGZuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIG1lOiBhbnkgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gIUJsZW5kLmlzTnVsbE9yVW5kZWYobWVbZm5hbWVdKSAmJiBCbGVuZC5pc0Z1bmN0aW9uKG1lW2ZuYW1lXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEeW5hbWljYWxseSBydW4gYSBmdW5jdGlvbiB3aXRoaW4gdGhpcyBDb21wb25lbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgYXBwbHlGdW5jdGlvbihuYW1lOiBzdHJpbmcsIGFyZ3M6IEFycmF5PGFueT4gfCBJQXJndW1lbnRzKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIG1lOiBhbnkgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgZm46IEZ1bmN0aW9uID0gPEZ1bmN0aW9uPm1lW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoQmxlbmQuaXNGdW5jdGlvbihmbikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseShtZSwgYXJncyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENsYXNzIG1ldGhvZCBbJHtuYW1lfV0gZG9lcyBub3QgZXhpc3QhYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIENvcHlyaWdodCAyMDE2IFRydWVTb2Z0d2FyZSBCLlYuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5uYW1lc3BhY2UgQmxlbmQuZG9tIHtcclxuICAgIC8qKlxyXG4gICAgICogSW1wbGVtZW50cyBhIGNsYXNzTGlzdCBwcm92aWRlciBmb3IgdGhlIEJsZW5kLmRvbS5FbGVtZW50XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBDbGFzc0xpc3Qge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgbGlzdDogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKGh0bWxFbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS5saXN0ID0gW107XHJcbiAgICAgICAgICAgIG1lLmluaXRMaXN0KChodG1sRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKS50cmltKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0TGlzdChjc3M6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICAoY3NzID09PSBcIlwiID8gW10gOiBjc3Muc3BsaXQoXCIgXCIpKS5mb3JFYWNoKGZ1bmN0aW9uKGM6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgYyA9IGMudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGMubGVuZ3RoICE9PSAwICYmIGMgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZS5saXN0LnB1c2goYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNlcmlhbGl6ZVRvKGh0bWxFbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY3NzID0gbWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYgKGNzcyAhPT0gbnVsbCAmJiBjc3MgIT09IFwiXCIgJiYgY3NzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaHRtbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY3NzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGh0bWxFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVtb3ZlTGlrZShsaXN0OiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsIGkgPSAtMSwgbjogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgICAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24ocjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBtZS5saXN0LmZvckVhY2goZnVuY3Rpb24oaTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpLnN0YXJ0c1dpdGgocikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbi5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWUubGlzdCA9IG47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVtb3ZlKGxpc3Q6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcywgaSA9IC0xO1xyXG4gICAgICAgICAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24ocjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpID0gbWUubGlzdC5pbmRleE9mKHIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWUubGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZChsaXN0OiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbihpOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmICghbWUuaGFzKGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWUubGlzdC5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFzKG46IHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0LmluZGV4T2YobikgIT09IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciByID0gdGhpcy5saXN0LmpvaW4oXCIgXCIpLnRyaW0oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHIgPT09IFwiXCIgPyBudWxsIDogcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB0b0FycmF5KCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxNiBUcnVlU29mdHdhcmUgQi5WLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxubmFtZXNwYWNlIEJsZW5kLmRvbSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBsZW1lbnRzIGEgc3R5bGUgbGlzdCBwcm92aWRlcyBmb3IgdGhlIEJsZW5kLmRvbS5FbGVtZW50XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBTdHlsZUxpc3Qge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0eWxlczogRGljdGlvbmFyeUludGVyZmFjZTtcclxuICAgICAgICBwcml2YXRlIGVsOiBIVE1MRWxlbWVudDtcclxuICAgICAgICBwcml2YXRlIHBpeGVsUmUgPSAvcHgkLztcclxuICAgICAgICBwcml2YXRlIFVOSVQ6IHN0cmluZyA9IFwicHhcIjtcclxuICAgICAgICBwcml2YXRlIHVuaXRQcm9wZXJ0eVJlOiBSZWdFeHAgPSAvKHdpZHRoJHxoZWlnaHQkfHNpemUkfHJhZGl1cyR8cGFkZGluZ3xtYXJnaW4kfHRvcCR8Ym90dG9tJHxyaWdodCR8bGVmdCQpLztcclxuICAgICAgICBwcml2YXRlIHVuaXRUeXBlUmU6IFJlZ0V4cCA9IC8oZW0kfFxcJSR8YXV0b3xeY2FsYykvO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihlbDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0TGlzdChlbC5zdHlsZS5jc3NUZXh0LnRyaW0oKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRMaXN0KGRhdGE6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgcDogQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICAgICAgbWUuc3R5bGVzID0ge307XHJcbiAgICAgICAgICAgIGlmIChkYXRhICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnNwbGl0KFwiO1wiKS5mb3JFYWNoKGZ1bmN0aW9uKGQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBkLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWUuc3R5bGVzW3BbMF0udHJpbSgpXSA9IG1lLmZyb21Vbml0KHBbMV0udHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldChuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZXNbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB1bnNldChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgZGVsZXRlICh0aGlzLnN0eWxlc1tuYW1lXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0Q29tcHV0ZWQoZWw6IEhUTUxFbGVtZW50LCBuYW1lczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCksXHJcbiAgICAgICAgICAgICAgICByOiBTdHlsZUludGVyZmFjZSA9IHt9O1xyXG4gICAgICAgICAgICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByW2tleV0gPSBtZS5mcm9tVW5pdChjcy5nZXRQcm9wZXJ0eVZhbHVlKGtleSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2VyaWFsaXplVG8oZWw6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsIHN0eWxlID0gXCJcIjtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMobWUuc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUgKz0gYCR7bmFtZX06JHttZS50b1VuaXQobmFtZSwgbWUuc3R5bGVzW25hbWVdKX07YDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChzdHlsZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGUuY3NzVGV4dCA9IHN0eWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDaGVja3MgYW5kIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBweCBiYXNlZCBvbiB0aGUgZ2l2ZW4ga2V5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB0b1VuaXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIG1lLnVuaXRQcm9wZXJ0eVJlLnRlc3Qoa2V5KSAmJiAhbWUudW5pdFR5cGVSZS50ZXN0KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIG1lLlVOSVQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2l2ZW4gdGhlIHZhbHVlIGl0IGNvbnZlcnRzIHB4IHZhbHVlIHRvIGEgbnVtYmVyLCBvdGhlcndpc2UgaXQgcmV0dXJucyB0aGUgb3JpZ2luYWxcclxuICAgICAgICAgKiB2YWx1ZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGZyb21Vbml0KHZhbHVlOiBhbnkpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgbWUucGl4ZWxSZS50ZXN0KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlLnJlcGxhY2UobWUuVU5JVCwgXCJcIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxNiBUcnVlU29mdHdhcmUgQi5WLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1R5cGluZ3MudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vQ29tcG9uZW50LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNsYXNzTGlzdC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJTdHlsZUxpc3QudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vQmxlbmQudHNcIiAvPlxyXG5cclxubmFtZXNwYWNlIEJsZW5kLmRvbSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcyBhbiBIVE1MRWxlbWVudCBpbnRvIGEgdXRpbGl0eSBjbGFzcyBmb3IgZWFzaWVyICBtYW5pcHVsYXRpb25cclxuICAgICAqIGFuZCBoYWRsaW5nXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBFbGVtZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBlbDogSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBwaXhlbFJlID0gL3B4JC87XHJcbiAgICAgICAgcHJpdmF0ZSBVTklUOiBzdHJpbmcgPSBcInB4XCI7XHJcbiAgICAgICAgcHJpdmF0ZSB1bml0UHJvcGVydHlSZTogUmVnRXhwID0gLyh3aWR0aCR8aGVpZ2h0JHxzaXplJHxyYWRpdXMkfHBhZGRpbmd8bWFyZ2luJHx0b3AkfGJvdHRvbSR8cmlnaHQkfGxlZnQkKS87XHJcbiAgICAgICAgcHJpdmF0ZSB1bml0VHlwZVJlOiBSZWdFeHAgPSAvKGVtJHxcXCUkfGF1dG98XmNhbGMpLztcclxuICAgICAgICBwdWJsaWMgY2xhc3NMaXN0OiBCbGVuZC5kb20uQ2xhc3NMaXN0O1xyXG4gICAgICAgIHB1YmxpYyBzdHlsZUxpc3Q6IEJsZW5kLmRvbS5TdHlsZUxpc3Q7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGVsOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmVsID0gZWw7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0ID0gbmV3IEJsZW5kLmRvbS5DbGFzc0xpc3QodGhpcy5lbCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGVMaXN0ID0gbmV3IEJsZW5kLmRvbS5TdHlsZUxpc3QodGhpcy5lbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXRzIGFuIGF0dHJpYnV0ZSB0byB0aGlzIGVsZW1lbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZywgdmFsdWU/OiBhbnkpOiBCbGVuZC5kb20uRWxlbWVudCB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLmVsLnNldEF0dHJpYnV0ZS5hcHBseShtZS5lbCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbW92ZWQgYW4gYXR0cmlidXRlIGZyb20gdGhpcyBlbGVtZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHJlbW92ZUF0dHJpYnV0ZShuYW1lOiBzdHJpbmcpOiBCbGVuZC5kb20uRWxlbWVudCB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLmVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0IHRoZSBsaXN0IG9mIGZpbGVzIGZvciBmcm9tIHRoaXMgRWxlbWVudFxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0RmlsZXMoKTogRmlsZUxpc3Qge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLCBmZWw6IEhUTUxJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5tZS5lbDtcclxuICAgICAgICAgICAgaWYgKGZlbC5maWxlcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZlbC5maWxlcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRmlsZUxpc3QoKTsgLy8gcmV0dXJuIGFuIGVtcHR5IG9uZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZGRzIGFuIEV2ZW50TGlzdGVuZXIgdG8gYW4gRXZlbnRUYXJnZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWU6IHN0cmluZywgZXZlbnRIYW5kbGVyOiBFdmVudExpc3RlbmVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIEJsZW5kLlJ1bnRpbWUuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmVsLCBldmVudE5hbWUsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW1vdmVzIGFuIEV2ZW50TGlzdGVuZXIgZnJvbSBhbiBFdmVudFRhcmdldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZTogc3RyaW5nLCBldmVudEhhbmRsZXI6IEV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgQmxlbmQuUnVudGltZS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZWwsIGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1bnMgdGhlIGNvbXB1dGVkIGJvdW5kc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBnZXRCb3VuZHMoKTogRWxlbWVudEJvdW5kc0ludGVyZmFjZSB7XHJcbiAgICAgICAgICAgIHZhciBib3VuZHM6IEVsZW1lbnRCb3VuZHNJbnRlcmZhY2UgPSB0aGlzLmdldFN0eWxlKFtcInRvcFwiLCBcImxlZnRcIiwgXCJ3aWR0aFwiLCBcImhlaWdodFwiLCBcInZpc2libGVcIl0pLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyU2l6ZTogU3R5bGVJbnRlcmZhY2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoQmxlbmQuUnVudGltZS5JRSAmJiBCbGVuZC5SdW50aW1lLklFVmVyc2lvbiA8IDEyKSB7XHJcbiAgICAgICAgICAgICAgICBib3JkZXJTaXplID0gdGhpcy5nZXRTdHlsZShbXCJib3JkZXItdG9wLXdpZHRoXCIsIFwiYm9yZGVyLXJpZ2h0LXdpZHRoXCIsIFwiYm9yZGVyLWJvdHRvbS13aWR0aFwiLCBcImJvcmRlci1sZWZ0LXdpZHRoXCJdKTtcclxuICAgICAgICAgICAgICAgIGJvdW5kcy53aWR0aCArPSA8YW55PmJvcmRlclNpemVbXCJib3JkZXItbGVmdC13aWR0aFwiXSArIDxhbnk+Ym9yZGVyU2l6ZVtcImJvcmRlci1yaWdodC13aWR0aFwiXTtcclxuICAgICAgICAgICAgICAgIGJvdW5kcy5oZWlnaHQgKz0gPGFueT5ib3JkZXJTaXplW1wiYm9yZGVyLXRvcC13aWR0aFwiXSArIDxhbnk+Ym9yZGVyU2l6ZVtcImJvcmRlci1ib3R0b20td2lkdGhcIl07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYm91bmRzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvdW5kcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0cyB0aGUgc3R5bGUgb2YgdGhpcyBlbGVtZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNldFN0eWxlKHN0eWxlczogU3R5bGVJbnRlcmZhY2UpOiBCbGVuZC5kb20uRWxlbWVudCB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChzdHlsZXMpIHtcclxuICAgICAgICAgICAgICAgIEJsZW5kLmZvckVhY2goc3R5bGVzLCBmdW5jdGlvbih2OiBhbnksIGs6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2ID09PSBudWxsIHx8ICg8c3RyaW5nPnYpID09PSBcImF1dG9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZS5zdHlsZUxpc3QudW5zZXQoayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWUuc3R5bGVMaXN0LnNldChrLCB2KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG1lLnN0eWxlTGlzdC5zZXJpYWxpemVUbyhtZS5lbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSBjb21wdXRlZCBzdHlsZXMgb2YgZW4gZWxlbWVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBnZXRTdHlsZShzdHlsZXM6IHN0cmluZyB8IEFycmF5PHN0cmluZz4pOiBTdHlsZUludGVyZmFjZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0eWxlTGlzdC5nZXRDb21wdXRlZCh0aGlzLmVsLFxyXG4gICAgICAgICAgICAgICAgQmxlbmQud3JhcEluQXJyYXk8c3RyaW5nPihzdHlsZXMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIENTUyBjbGFzc2VzIGZyb20gdGhpcyBlbGVtZW50IGlmIHBvc3NpYmxlXHJcbiAgICAgICAgICogQHJldHVybiBzdHJpbmd8c3RyaW5nW11cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0Q3NzQ2xhc3MoYXNBcnJheTogYm9vbGVhbiA9IGZhbHNlKTogKHN0cmluZyB8IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFzQXJyYXkgPT09IHRydWUgPyB0aGlzLmNsYXNzTGlzdC50b0FycmF5KCkgOiB0aGlzLmNsYXNzTGlzdC50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBlbGVtZW50IGhhcyBhIGdpdmVuIENTUyBjbGFzc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBoYXNDc3NDbGFzcyhuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmhhcyhuYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFkZHMgYSBuZXcgY3NzIGNsYXNzIGFuIGVsZW1lbnQgaWYgaXQgYWxyZWFkeSBkb2VzIG5vdCBleGlzdFxyXG4gICAgICAgICAqIFRoZSByZXBsYWNlIGZsYWcgd2lsbCByZXBsYWNlIHRoZSBleGlzdHNpbmcgY3NzIGNsYXNzIHZhbHVlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGFkZENzc0NsYXNzKGNzczogc3RyaW5nIHwgc3RyaW5nW10sIHJlcGxhY2U6IGJvb2xlYW4gPSBmYWxzZSk6IEJsZW5kLmRvbS5FbGVtZW50IHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcywgdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgICAgICBpZiAocmVwbGFjZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuY2xlYXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZS5jbGFzc0xpc3QuYWRkKDxBcnJheTxzdHJpbmc+PkJsZW5kLndyYXBJbkFycmF5KGNzcykpO1xyXG4gICAgICAgICAgICBtZS5jbGFzc0xpc3Quc2VyaWFsaXplVG8obWUuZWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbW92ZXMgb25lIG9mIG1vcmUgQ1NTIGNsYXNzZXMgZnJvbSB0aGlzIGVsZW1lbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcmVtb3ZlQ3NzQ2xhc3MoY3NzOiBzdHJpbmcgfCBzdHJpbmdbXSk6IEJsZW5kLmRvbS5FbGVtZW50IHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcywgdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgICAgICBtZS5jbGFzc0xpc3QucmVtb3ZlKDxBcnJheTxzdHJpbmc+PkJsZW5kLndyYXBJbkFycmF5KGNzcykpO1xyXG4gICAgICAgICAgICBtZS5jbGFzc0xpc3Quc2VyaWFsaXplVG8obWUuZWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbW92ZXMgb25lIG9yIG1vcmUgQ1NTIGNsYXNzZXMgZnJvbSB0aGlzIGVsZW1lbnQgYnkgY2hlY2tpbmcgaWYgdGhlXHJcbiAgICAgICAgICogQ1NTIG5hbWVzIHN0YXJ0IHdpdGggdGhlIGdpdmVuIHJlcXVlc3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcmVtb3ZlQ3NzQ2xhc3NMaWtlKGNzczogc3RyaW5nIHwgc3RyaW5nW10pOiBCbGVuZC5kb20uRWxlbWVudCB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsIHQ6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICAgICAgbWUuY2xhc3NMaXN0LnJlbW92ZUxpa2UoPEFycmF5PHN0cmluZz4+QmxlbmQud3JhcEluQXJyYXkoY3NzKSk7XHJcbiAgICAgICAgICAgIG1lLmNsYXNzTGlzdC5zZXJpYWxpemVUbyhtZS5lbCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2xlYXJzIHRoZSB2YWx1ZSBvZiB0aGUgY2xhc3MgYXR0cmlidXRlIG9mIHRoaXMgZWxlbWVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbGVhckNzc0NsYXNzKCk6IEJsZW5kLmRvbS5FbGVtZW50IHtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuY2xlYXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW1vdmVzIHRoZSBjaGlsZCBlbGVtZW50cyBmcm9tIHRoaXMgRWxlbWVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsZWFyRWxlbWVudCgpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKG1lLmVsKSB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobWUuZWwuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lLmVsLnJlbW92ZUNoaWxkKG1lLmVsLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXRzIHRoZSBkYXRhLSogYXR0cmlidXRlIGZvciB0aGlzIGVsZW1lbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc2V0RGF0YShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBCbGVuZC5kb20uRWxlbWVudCB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIG5hbWUsIHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIGEgZGF0YSBhdHRyaWJ1dGUgb3IgcmV0dXJucyBhIGRlZmF1bHQgdmFsdWUgaWYgdGhlIGF0dHJpYnV0ZSBkb2VzXHJcbiAgICAgICAgICogbm90IGV4aXN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldERhdGEobmFtZTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IGFueSA9IG51bGwpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgYXR0cjogc3RyaW5nID0gXCJkYXRhLVwiICsgbmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lLmVsLmhhc0F0dHJpYnV0ZShhdHRyKSA/IG1lLmVsLmdldEF0dHJpYnV0ZShhdHRyKSA6IGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldCB0aGUgU2Nyb2xsIHN0YXRlIGZvciB0aGlzIEVsZW1lbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc2Nyb2xsU3RhdGUoc3RhdGU6IEJsZW5kLmVTY3JvbGxTdGF0ZSk6IEJsZW5kLmRvbS5FbGVtZW50IHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgbWUuc2V0RGF0YShcInNjcm9sbFwiLCBCbGVuZC5lU2Nyb2xsU3RhdGVbPG51bWJlcj5zdGF0ZV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuYWJsZXMvRGlzYWJsZXMgdGhlIHRleHQgc2VsZWN0IHN0YXRlIG9mIHRoaXMgZWxlbWVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzZWxlY3RhYmxlKHN0YXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YShcInNlbGVjdGFibGVcIiwgc3RhdGUgPT09IHRydWUgPyBcIm9uXCIgOiBcIm9mZlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIG5hdGl2ZSBIVE1MRWxlbWVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBnZXRFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQXBwZW5kcyBhIGNoaWxkIEVsZW1lbnQgdG8gdGhpcyBFbGVtZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGFwcGVuZChjaGlsZDogQmxlbmQuZG9tLkVsZW1lbnQpOiBCbGVuZC5kb20uRWxlbWVudCB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoKGNoaWxkLmdldEVsKCkpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVtb3ZlcyB0aGlzIGVsZW1lbnQgZnJvbSBpdHMgcGFyZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHJlbW92ZSgpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIHBOb2RlOiBOb2RlLFxyXG4gICAgICAgICAgICAgICAgY05vZGU6IE5vZGU7XHJcbiAgICAgICAgICAgIGNOb2RlID0gbWUuZWw7XHJcbiAgICAgICAgICAgIHBOb2RlID0gY05vZGUucGFyZW50Tm9kZSB8fCBudWxsO1xyXG4gICAgICAgICAgICBpZiAocE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHBOb2RlLnJlbW92ZUNoaWxkKGNOb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0cyB0aGUgaW5uZXIgSFRNTCBvZiB0aGlzIGVsZW1lbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc2V0SHRtbChodG1sOiBzdHJpbmcpOiBCbGVuZC5kb20uRWxlbWVudCB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0UGFkZGluZyh2YWx1ZTogbnVtYmVyIHwgUGFkZGluZ0ludGVyZmFjZSk6IEJsZW5kLmRvbS5FbGVtZW50IHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcywgcGFkZGluZzogUGFkZGluZ0ludGVyZmFjZSA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoQmxlbmQuaXNOdW1lcmljKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgbWUuc2V0U3R5bGUoeyBwYWRkaW5nOiA8bnVtYmVyPnZhbHVlIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWUuc2V0U3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIFwicGFkZGluZy10b3BcIjogKDxQYWRkaW5nSW50ZXJmYWNlPnZhbHVlKS50b3AgfHwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBcInBhZGRpbmctcmlnaHRcIjogKDxQYWRkaW5nSW50ZXJmYWNlPnZhbHVlKS5yaWdodCB8fCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicGFkZGluZy1ib3R0b21cIjogKDxQYWRkaW5nSW50ZXJmYWNlPnZhbHVlKS5ib3R0b20gfHwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBcInBhZGRpbmctbGVmdFwiOiAoPFBhZGRpbmdJbnRlcmZhY2U+dmFsdWUpLmxlZnQgfHwgbnVsbFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSBpbm5lciBIVE1MIG9mIHRoaXMgZWxlbWVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBnZXRIdG1sKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsLmlubmVySFRNTDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZWQgYW4gRWxlbWVudCBiYXNlZCBvbiBDcmVhdGVFbGVtZW50SW50ZXJmYWNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoY29uZjogQ3JlYXRlRWxlbWVudEludGVyZmFjZSB8IEJsZW5kLmRvbS5FbGVtZW50Q29uZmlnQnVpbGRlciwgZWxDYWxsYmFjaz86IEZ1bmN0aW9uLCBlbENhbGxiYWNrU2NvcGU/OiBhbnkpOiBCbGVuZC5kb20uRWxlbWVudCB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsIGNvbmZpZzogQ3JlYXRlRWxlbWVudEludGVyZmFjZTtcclxuICAgICAgICAgICAgaWYgKEJsZW5kLmlzSW5zdGFuY2VPZihjb25mLCBCbGVuZC5kb20uRWxlbWVudENvbmZpZ0J1aWxkZXIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWcgPSAoPEJsZW5kLmRvbS5FbGVtZW50Q29uZmlnQnVpbGRlcj5jb25mKS5nZXRDb25maWcoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZyA9IDxDcmVhdGVFbGVtZW50SW50ZXJmYWNlPmNvbmY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKEJsZW5kLmlzT2JqZWN0KGNvbmZpZykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGNvbmZpZy50YWcgfHwgXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjZmcgaW4gY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbDogYW55ID0gKDxhbnk+Y29uZmlnKVtjZmddO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjZmcgIT09IFwidGFnXCIgJiYgY2ZnICE9PSBcInNjb3BlXCIgJiYgY2ZnICE9PSBcIm9pZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZmcgPT09IFwiY2xzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNmZyA9IFwiY2xhc3NcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChCbGVuZC5pc0FycmF5KHZhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSA8QXJyYXk8c3RyaW5nPj52YWwuam9pbihcIiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2ZnID09PSBcImlubmVySFRNTFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZmcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNmZyA9PT0gXCJ0ZXh0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNmZyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dE5kID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKHRleHROZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2ZnID09PSBcImxpc3RlbmVyc1wiICYmIEJsZW5kLmlzT2JqZWN0KHZhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNmZyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBlIGluIHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoYW5kbGVyID0gdmFsW2VdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJsZW5kLlJ1bnRpbWUuYWRkRXZlbnRMaXN0ZW5lcihlbCwgZSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXIuYXBwbHkoY29uZmlnLnNjb3BlIHx8IHdpbmRvdywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZmcgPT09IFwiY2hpbGRyZW5cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFCbGVuZC5pc0FycmF5KHZhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSBbdmFsXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkOiBIVE1MRWxlbWVudCB8IENyZWF0ZUVsZW1lbnRJbnRlcmZhY2UgfCBCbGVuZC5kb20uRWxlbWVudCB8IEJsZW5kLmRvbS5FbGVtZW50Q29uZmlnQnVpbGRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKDxIVE1MRWxlbWVudD5jaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIEJsZW5kLmRvbS5FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKCg8QmxlbmQuZG9tLkVsZW1lbnQ+Y2hpbGQpLmdldEVsKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBCbGVuZC5kb20uRWxlbWVudENvbmZpZ0J1aWxkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoQmxlbmQuZG9tLkVsZW1lbnQuY3JlYXRlKCg8QmxlbmQuZG9tLkVsZW1lbnRDb25maWdCdWlsZGVyPmNoaWxkKSwgZWxDYWxsYmFjaywgZWxDYWxsYmFja1Njb3BlKS5nZXRFbCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChCbGVuZC5kb20uRWxlbWVudC5jcmVhdGUoPENyZWF0ZUVsZW1lbnRJbnRlcmZhY2U+Y2hpbGQsIGVsQ2FsbGJhY2ssIGVsQ2FsbGJhY2tTY29wZSkuZ2V0RWwoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZmcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNmZyA9PT0gXCJkYXRhXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJsZW5kLmZvckVhY2godmFsLCBmdW5jdGlvbih2OiBhbnksIGs6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRhdGEtXCIgKyBrLCB2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2ZnID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZmcgPT09IFwic3R5bGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2ZnID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJsZW5kLmdldEVsZW1lbnQoZWwpLnNldFN0eWxlKDxTdHlsZUludGVyZmFjZT52YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNmZyA9PT0gXCJzZWxlY3RhYmxlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQmxlbmQuZ2V0RWxlbWVudChlbCkuc2VsZWN0YWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZmcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShjZmcsIHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgd0VsID0gbmV3IEJsZW5kLmRvbS5FbGVtZW50KGVsKTtcclxuICAgICAgICAgICAgICAgIGlmIChlbENhbGxiYWNrICYmIGNvbmZpZy5vaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbENhbGxiYWNrLmFwcGx5KGVsQ2FsbGJhY2tTY29wZSB8fCB3aW5kb3csIFt3RWwsIGNvbmZpZy5vaWRdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB3RWw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQmxlbmQuY3JlYXRlRWxlbWVudCh7fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm5hbWVzcGFjZSBCbGVuZCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcGVyIGZvciBCbGVuZC5kb20uRWxlbWVudC5jcmVhdGVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IHZhciBjcmVhdGVFbGVtZW50ID0gQmxlbmQuZG9tLkVsZW1lbnQuY3JlYXRlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHBlciBmb3IgZG9jdW1lbnQucXVlcnlTZWxlY3RvclxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2VsZWN0RWxlbWVudChxdWVyeTogc3RyaW5nLCBmcm9tOiBCbGVuZC5kb20uRWxlbWVudCA9IG51bGwpOiBCbGVuZC5kb20uRWxlbWVudCB7XHJcbiAgICAgICAgdmFyIGVscyA9IEJsZW5kLnNlbGVjdEVsZW1lbnRzKHF1ZXJ5LCBmcm9tKTtcclxuICAgICAgICByZXR1cm4gZWxzWzBdIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcGVyIGZvciBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzZWxlY3RFbGVtZW50cyhxdWVyeTogc3RyaW5nLCBmcm9tOiBCbGVuZC5kb20uRWxlbWVudCA9IG51bGwpOiBBcnJheTxCbGVuZC5kb20uRWxlbWVudD4ge1xyXG4gICAgICAgIHZhciBlbHM6IEFycmF5PEJsZW5kLmRvbS5FbGVtZW50PiA9IFtdO1xyXG4gICAgICAgIEJsZW5kLmZvckVhY2goKChmcm9tID8gZnJvbS5nZXRFbCgpIDogbnVsbCkgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpLCBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKEJsZW5kLmlzSW5zdGFuY2VPZihlbCwgSFRNTEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBlbHMucHVzaChuZXcgQmxlbmQuZG9tLkVsZW1lbnQoZWwpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBlbHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcGVyIGZvciBkb2N1bWVudC5nZXRFbGVtZW50QnlJZFxyXG4gICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1lbnQoZWw6IHN0cmluZyB8IEhUTUxFbGVtZW50KTogQmxlbmQuZG9tLkVsZW1lbnQge1xyXG4gICAgICAgIGlmIChCbGVuZC5pc1N0cmluZyhlbCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCbGVuZC5kb20uRWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCg8c3RyaW5nPmVsKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCbGVuZC5kb20uRWxlbWVudCg8SFRNTEVsZW1lbnQ+ZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxNiBUcnVlU29mdHdhcmUgQi5WLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImJpbmRpbmcvQmluZGluZ1Byb3ZpZGVyLnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBCbGVuZCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQ2FsbGJhY2sgaW50ZXJmYWNlIGZvciB0aGUgcmVhZHkgZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgaW50ZXJmYWNlIElSZWFkQ2FsbGJhY2sge1xyXG4gICAgICAgIGZuOiBGdW5jdGlvbjtcclxuICAgICAgICBzYz86IGFueTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBNZWRpYSBRdWVyeSByZWdpc3RlcnkgdGhhdCBob2xkIGEgbGlzbmV0ZXJzIGZvciB0aGUgVmlld3NcclxuICAgICAqIHJlc3BvbmRpbmcgdG8gYSBtZWRpYSBxdWVyeVxyXG4gICAgICAqL1xyXG4gICAgaW50ZXJmYWNlIElNZWRpYVF1ZXJ5UmVnaXN0ZXJ5IGV4dGVuZHMgRGljdGlvbmFyeUludGVyZmFjZSB7XHJcbiAgICAgICAgW25hbWU6IHN0cmluZ106IEFycmF5PEZ1bmN0aW9uPjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBNZWRpYSBRdWVyeSBtYXRjaGVyIHJlZ2lzdGVyeVxyXG4gICAgICovXHJcbiAgICBpbnRlcmZhY2UgSU1lZGlhUXVlcnlNYXRjaGVyIGV4dGVuZHMgRGljdGlvbmFyeUludGVyZmFjZSB7XHJcbiAgICAgICAgW25hbWU6IHN0cmluZ106IE1lZGlhUXVlcnlMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXMgZnVuY3Rpb25hbGl0eSB0byBnZXQgQmxlbmQga2lja3N0YXJ0ZWQgYW5kIGNoZWNrIGZvclxyXG4gICAgICogYnJvd2VyIGNvbXBhdGliaWxpdHlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFJ1bnRpbWVTaW5nbGV0b24ge1xyXG5cclxuICAgICAgICBwcml2YXRlIHJlYWR5Q2FsbGJhY2tzOiBBcnJheTxJUmVhZENhbGxiYWNrPjtcclxuICAgICAgICBwcml2YXRlIGtpY2tTdGFydGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgcHJpdmF0ZSBtZWRpYVF1ZXJ5UmVnaXN0ZXJ5OiBJTWVkaWFRdWVyeVJlZ2lzdGVyeTtcclxuICAgICAgICBwcml2YXRlIG1lZGlhUXVlcnlNYXRjaGVyczogSU1lZGlhUXVlcnlNYXRjaGVyO1xyXG4gICAgICAgIHByaXZhdGUgcHJldmlvdXNNZWRpYVF1ZXJ5OiBzdHJpbmc7IC8vIHVzZWQgdG8gcHJldmVudCBtdWx0aXBsZSBldmVudHMgb2Ygc2FtZSBhbGlhc1xyXG5cclxuICAgICAgICBwdWJsaWMgQmluZGVyOiBCbGVuZC5iaW5kaW5nLkJpbmRpbmdQcm92aWRlcjtcclxuICAgICAgICBwdWJsaWMgSUU6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIElFVmVyc2lvbjogbnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQmluZGVyID0gbmV3IEJsZW5kLmJpbmRpbmcuQmluZGluZ1Byb3ZpZGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVkaWFRdWVyeVJlZ2lzdGVyeSA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUXVlcnlNYXRjaGVycyA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXNlZCB0byB0cmlnZ2VyIHRoZSBtZWRpYSBxdWVyeSBtYXRjaGluZyBvbiBhcHBsaWNhdGlvbi5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgdHJpZ2dlck1lZGlhUXVlcnlDaGVjaygpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgQmxlbmQuZm9yRWFjaChtZS5tZWRpYVF1ZXJ5TWF0Y2hlcnMsIGZ1bmN0aW9uKG1xbDogTWVkaWFRdWVyeUxpc3QsIG1lZGlhUXVlcnk6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1xbC5tYXRjaGVzICYmIG1lLnByZXZpb3VzTWVkaWFRdWVyeSAhPT0gbWVkaWFRdWVyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lLm1lZGlhUXVlcnlSZWdpc3RlcnlbbWVkaWFRdWVyeV0uZm9yRWFjaChmdW5jdGlvbihmbjogRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uYXBwbHkobWUsIFttcWxdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBtZS5wcmV2aW91c01lZGlhUXVlcnkgPSBtZWRpYVF1ZXJ5O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZGRzIGEgbWVkaWEgcXVlcnkgbGlzdGVuZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgYWRkTWVkaWFRdWVyeUxpc3RlbmVyKG1lZGlhUXVlcnk6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChtZS5tZWRpYVF1ZXJ5UmVnaXN0ZXJ5W21lZGlhUXVlcnldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG1lLm1lZGlhUXVlcnlSZWdpc3RlcnlbbWVkaWFRdWVyeV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhciBtcWw6IE1lZGlhUXVlcnlMaXN0ID0gd2luZG93Lm1hdGNoTWVkaWEobWVkaWFRdWVyeSk7XHJcbiAgICAgICAgICAgICAgICBtZS5tZWRpYVF1ZXJ5TWF0Y2hlcnNbbWVkaWFRdWVyeV0gPSBtcWw7XHJcbiAgICAgICAgICAgICAgICBtcWwuYWRkTGlzdGVuZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWUudHJpZ2dlck1lZGlhUXVlcnlDaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWUubWVkaWFRdWVyeVJlZ2lzdGVyeVttZWRpYVF1ZXJ5XS5wdXNoKGxpc3RlbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBicm93c2VyIGlzIHN1cHBvcnRlZFxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGlzU3VwcG9ydGVkQnJvd3NlcigpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGllID0gbWUuZGV0ZWN0SUUoKTtcclxuICAgICAgICAgICAgbWUuSUUgPSBpZSAhPT0gMDtcclxuICAgICAgICAgICAgbWUuSUVWZXJzaW9uID0gaWU7XHJcbiAgICAgICAgICAgIGlmIChpZSAhPT0gMCAmJiBpZSA8IDExKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC53cml0ZShcIjxkaXYgaWQ9XFxcIm5vYmxlbmRcXFwiPlVuYWJsZSB0byBydW4gdGhpcyBhcHBsaWNhdGlvbi4gUGxlYXNlIHVwZ3JhZGUgeW91ciBJbnRlcm5ldCBFeHBsb3JlciB0byB2ZXJzaW9uIDExIG9yIGFib3ZlLCBvdGhlcndpc2UgdXNlIEdvb2dsZSBDaHJvbWUgb3IgRmlyZWZveCE8L2Rpdj5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVzZXRzIHRoZSBcInJlYWR5XCIgY2FsbGJhY2sgYnVmZmVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS5yZWFkeUNhbGxiYWNrcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHJ1biB3aGVuIHRoZSBicm93c2VyIGlzIHJlYWR5IHRvIGdvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmVhZHkoY2FsbGJhY2s6IEZ1bmN0aW9uLCBzY29wZT86IGFueSk6IEJsZW5kLlJ1bnRpbWVTaW5nbGV0b24ge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIW1lLnJlYWR5Q2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICBtZS5yZWFkeUNhbGxiYWNrcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lLnJlYWR5Q2FsbGJhY2tzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZm46IGNhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgc2M6IHNjb3BlIHx8IG1lXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluaXRpYXRlcyBCbGVuZCdzIGFwcGxpY2F0aW9uIGxpZmVjeWNsZSBieSBleGVjdXRpbmcgdGhlIGNhbGxiYWNrc1xyXG4gICAgICAgICAqIHdoaWNoIGFyZSByZWdpc3RlcmVkIGJ5IHtFbnZpcm9ubWVudC5yZWFkeX0uIFRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gY2FsbGVkXHJcbiAgICAgICAgICogdG8gZ2V0IGEgQmxlbmQgYXBwbGljYXRpb24gc3RhcnRlZC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBraWNrU3RhcnQoKSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBkaWRSdW4gPSBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGRvQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlkUnVuID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWRSdW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWUuaXNTdXBwb3J0ZWRCcm93c2VyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJsZW5kLmZvckVhY2gobWUucmVhZHlDYWxsYmFja3MsIGZ1bmN0aW9uKGl0ZW06IElSZWFkQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmZuLmFwcGx5KGl0ZW0uc2MsIFtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVtcHR5IHRoZSBjYWxsYmFja3MgYWZ0ZXIgcnVubmluZyBvbmNlIGluY2FzZSB3ZSBoYXZlIGxhdGVcclxuICAgICAgICAgICAgICAgICAgICAvLyByZWFkeSguLi4pIGNhbGxzIGxhdGVyLCBzbyB3ZSBkb24ndCBydW4gcHJldmlvdXMgY2FsbHMgYWdhaW4uXHJcbiAgICAgICAgICAgICAgICAgICAgbWUucmVhZHlDYWxsYmFja3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoIW1lLmtpY2tTdGFydGVkKSB7XHJcbiAgICAgICAgICAgICAgICBtZS5raWNrU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9DYWxsYmFjay5hcHBseShtZSwgW10pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtZS5hZGRFdmVudExpc3RlbmVyKGRvY3VtZW50LCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZG9DYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWUuYWRkRXZlbnRMaXN0ZW5lcih3aW5kb3csIFwibG9hZFwiLCBkb0NhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvQ2FsbGJhY2suYXBwbHkobWUsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkcyBhbiBFdmVudExpc3RlbmVyIHRvIGFuIEV2ZW50VGFyZ2V0LiBZb3UgY2FuIGFkZCBtdWx0aXBsZSBldmVudHMgYnlcclxuICAgICAgICAgKiBwcm92aWRpbmcgZXZlbnQgbmFtZXMgc2VwZXJhdGVkIGJ5IHNwYWNlcyAoZWcuICdtb3VzZXVwIGNsaWNrJylcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihlbDogRXZlbnRUYXJnZXQsIGV2ZW50TmFtZTogc3RyaW5nLCBldmVudEhhbmRsZXI6IEV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZS5pbmRleE9mKFwiIFwiKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZS5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVOYW1lID0gZU5hbWUudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlTmFtZS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihlTmFtZSwgZXZlbnRIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbW92ZXMgYW4gRXZlbnRMaXN0ZW5lciBmcm9tIGFuIEV2ZW50VGFyZ2V0LiBZb3UgY2FuIHJlbW92ZSBtdWx0aXBsZSBldmVudHMgYnlcclxuICAgICAgICAgKiBwcm92aWRpbmcgZXZlbnQgbmFtZXMgc2VwZXJhdGVkIGJ5IHNwYWNlcyAoZWcuICdtb3VzZXVwIGNsaWNrJylcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcihlbDogRXZlbnRUYXJnZXQsIGV2ZW50TmFtZTogc3RyaW5nLCBldmVudEhhbmRsZXI6IEV2ZW50TGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZS5pbmRleE9mKFwiIFwiKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZS5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVOYW1lID0gZU5hbWUudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlTmFtZS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihlTmFtZSwgZXZlbnRIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGV0ZWN0SUUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgLy8gY29weXJpZ2h0IGh0dHA6Ly9jb2RlcGVuLmlvL2dhcGNvZGUvcGVuL3ZFSk5aTlxyXG4gICAgICAgICAgICB2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuICAgICAgICAgICAgdmFyIG1zaWUgPSB1YS5pbmRleE9mKFwiTVNJRSBcIik7XHJcbiAgICAgICAgICAgIGlmIChtc2llID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSUUgMTAgb3Igb2xkZXIgPT4gcmV0dXJuIHZlcnNpb24gbnVtYmVyXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodWEuc3Vic3RyaW5nKG1zaWUgKyA1LCB1YS5pbmRleE9mKFwiLlwiLCBtc2llKSksIDEwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHRyaWRlbnQgPSB1YS5pbmRleE9mKFwiVHJpZGVudC9cIik7XHJcbiAgICAgICAgICAgIGlmICh0cmlkZW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSUUgMTEgPT4gcmV0dXJuIHZlcnNpb24gbnVtYmVyXHJcbiAgICAgICAgICAgICAgICB2YXIgcnYgPSB1YS5pbmRleE9mKFwicnY6XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHVhLnN1YnN0cmluZyhydiArIDMsIHVhLmluZGV4T2YoXCIuXCIsIHJ2KSksIDEwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGVkZ2UgPSB1YS5pbmRleE9mKFwiRWRnZS9cIik7XHJcbiAgICAgICAgICAgIGlmIChlZGdlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRWRnZSAoSUUgMTIrKSA9PiByZXR1cm4gdmVyc2lvbiBudW1iZXJcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh1YS5zdWJzdHJpbmcoZWRnZSArIDUsIHVhLmluZGV4T2YoXCIuXCIsIGVkZ2UpKSwgMTApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHbG9iYWwgcmVmZXJlbmNlIHRvIHRoZSBSdW50aW1lU2luZ2xldG9uXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCB2YXIgUnVudGltZSA9IG5ldyBSdW50aW1lU2luZ2xldG9uKCk7XHJcbn0iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYgVHJ1ZVNvZnR3YXJlIEIuVi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb21tb24vVXRpbHMudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiZG9tL0VsZW1lbnQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9SdW50aW1lLnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBCbGVuZCB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIGVNZWRpYVF1ZXJ5IHtcclxuICAgICAgICBzdGF0aWMgTEFSR0U6IHN0cmluZyA9IFwiTFwiO1xyXG4gICAgICAgIHN0YXRpYyBNRURJVU06IHN0cmluZyA9IFwiTVwiO1xyXG4gICAgICAgIHN0YXRpYyBTTUFMTDogc3RyaW5nID0gXCJTXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbGVtZW50IFNjcm9sbCB2YWx1ZXNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGVudW0gZVNjcm9sbFN0YXRlIHtcclxuICAgICAgICBub25lLFxyXG4gICAgICAgIGF1dG8sXHJcbiAgICAgICAgYm90aCxcclxuICAgICAgICBob3Jpem9udGFsLFxyXG4gICAgICAgIHZlcnRpY2FsXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IHZhciByZWdpc3RyeTogQ2xhc3NSZWdpc3RyeUludGVyZmFjZSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHV0IHRoZSBmcmFtZXdvcmsgaW4gREVCVUcgbW9kZVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgdmFyIERFQlVHOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICB2YXIgSUQgPSAxMDAwO1xyXG5cclxuICAgIGV4cG9ydCB2YXIgQ09NTU9OX01FRElBX1FVRVJJRVM6IERpY3Rpb25hcnlJbnRlcmZhY2UgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElNUE9SVEFOVDogRm9yIHRoZSBtZWRpYSBxdWVyaWVzIHRvIHdvcmsgcHJvcGVybHksIHdlIG5lZWQgdG8gZGVmaW5lIHRoZW0gZnJvbVxyXG4gICAgICogbGFyZ2UgdG8gc21hbGwgYmVjYXVzZSB0aGUgTWVkaWEgUXVlcnkgY2hlY2sgd2lsbCBtYXRjaCB0aGUgZmlyc3Qgb25lIGFuZFxyXG4gICAgICogdHJpZ2dlciB0aGUgcmVzcG9uc2l2ZUNoYW5nZSBldmVudCBhbmQgb3RoZXIgbWF0Y2hpbmcgbWVkaWVhIHF1ZXJpZXMgd2lsbCBiZVxyXG4gICAgICogaWdub3JlZCFcclxuICAgICAqL1xyXG4gICAgQ09NTU9OX01FRElBX1FVRVJJRVNbZU1lZGlhUXVlcnkuTEFSR0VdID0gXCIobWluLXdpZHRoIDogODQwcHgpXCI7XHJcbiAgICBDT01NT05fTUVESUFfUVVFUklFU1tlTWVkaWFRdWVyeS5NRURJVU1dID0gXCIobWluLXdpZHRoOiA0ODBweCkgYW5kIChtYXgtd2lkdGg6IDgzOXB4KVwiO1xyXG4gICAgQ09NTU9OX01FRElBX1FVRVJJRVNbZU1lZGlhUXVlcnkuU01BTExdID0gXCIobWF4LXdpZHRoIDogNDc5cHgpXCI7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZCB3cmFwcyBhIGZ1bmN0aW9uIGludG8gYSBuZXcgZnVuY3Rpb25zIHNvIGl0IGNhbiBydW4gaW4gYSBnaXZlbiBzY29wZVxyXG4gICAgICogd2huIHRoZSBuZXcgZnVuY3Rpb24gaXMgY2FsbGVkLlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gYmluZChzY29wZTogYW55LCBmbjogRnVuY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmbi5hcHBseShzY29wZSwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGVzIGEgbmV3IHNlcXVlbnRpYWwgSUQgdXNlZCBpbnRlcm5hbGx5IGZvciBkZWJ1Z2dpbmdcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG5ld0lEKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIElEKys7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGVudW0gdmFsdWUsIGVpdGhlciB0aGUgdmFsdWUgYXMgbnVtYmVyIG9yIGl0cyBzdHJpbmcgcmVwcmVzZW50YXRpb25cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRW51bTxUPihvYmpFbnVtOiBhbnksIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIGRlZmF1bHRWYWx1ZTogYW55ID0gbnVsbCk6IFQge1xyXG4gICAgICAgIGlmIChCbGVuZC5pc1N0cmluZyh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iakVudW1bdmFsdWVdID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VmFsdWUgOiBvYmpFbnVtW3ZhbHVlXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqRW51bVtvYmpFbnVtW3ZhbHVlXV0gPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWx1ZSA6IG9iakVudW1bb2JqRW51bVt2YWx1ZV1dO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaXNOdWxsT3JVbmRlZih2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGFycmF5XHJcbiAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaXNBcnJheSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkodmFsdWUpID09PSBcIltvYmplY3QgQXJyYXldXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBpc051bWVyaWModmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIE9yaWdpbmFsIHNvdXJjZTogSlF1ZXJ5XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlIC0gcGFyc2VGbG9hdCh2YWx1ZSkgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcclxuICAgICAgICAgICAgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiICYmXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgdmFsdWUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICAgICAgIUJsZW5kLmlzQXJyYXkodmFsdWUpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcyBhbiBvYmplY3QgaW4gYW4gYXJyYXkgaWYgdGhlIG9iamVjdCBpcyBub3QgYW4gYXJyYXkgaXRzZWxmXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiB3cmFwSW5BcnJheTxUPihvYmo6IGFueSk6IEFycmF5PFQ+IHtcclxuICAgICAgICByZXR1cm4gQmxlbmQuaXNBcnJheShvYmopID8gb2JqIDogQmxlbmQuaXNOdWxsT3JVbmRlZihvYmopID8gW10gOiBbb2JqXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvcGllcyBrZXlzIGFuZCB2YWx1ZXMgZnJvbSBvbmUgb2JqZWN0IHRvIGFub3RoZXJcclxuICAgICAqIEBwYXJhbSB7YW55fSB0YXJnZXRcclxuICAgICAqIEBwYXJhbSB7YW55fSBzb3VyY2VcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3ZlcndyaXRlIHRoZSBjaGlsZCBvYmplY3RzIG9yIGFycmF5c1xyXG4gICAgICogQHBhcmFtIHttZXJnZUFycmF5c30gd2lsbCBtZXJnZSBhcnJheXMgaW5zdGVhZCBvZiBvdmVyd3JpdGluZyB0aGVtXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBhcHBseSh0YXJnZXQ6IGFueSwgc291cmNlOiBhbnksIG92ZXJ3cml0ZTogYm9vbGVhbiA9IGZhbHNlLCBtZXJnZUFycmF5czogYm9vbGVhbiA9IGZhbHNlKTogYW55IHtcclxuICAgICAgICB2YXIga2V5OiBhbnksXHJcbiAgICAgICAgICAgIHRhcmdldEtleXMgPSBPYmplY3Qua2V5cyh0YXJnZXQgfHwge30pLFxyXG4gICAgICAgICAgICB0YXJnZXRIYXNLZXkgPSBmdW5jdGlvbiAoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRLZXlzLmluZGV4T2Yoa2V5KSAhPT0gLTE7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgb3ZlcndyaXRlID0gb3ZlcndyaXRlIHx8IGZhbHNlO1xyXG4gICAgICAgIG1lcmdlQXJyYXlzID0gbWVyZ2VBcnJheXMgfHwgZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQgJiYgc291cmNlKSB7XHJcbiAgICAgICAgICAgIGZvciAoa2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSAmJiBzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRIYXNLZXkoa2V5KSAmJiBCbGVuZC5pc09iamVjdCh0YXJnZXRba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG92ZXJ3cml0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJsZW5kLmFwcGx5KHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldEhhc0tleShrZXkpICYmIEJsZW5kLmlzQXJyYXkodGFyZ2V0W2tleV0pICYmIG1lcmdlQXJyYXlzID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gdGFyZ2V0W2tleV0uY29uY2F0KEJsZW5kLndyYXBJbkFycmF5KHNvdXJjZVtrZXldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXRIYXNLZXkoa2V5KSAmJiBvdmVyd3JpdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEJsZW5kLmlzTnVsbE9yVW5kZWYodGFyZ2V0W2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgYm9vbGVhblxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHR5cGVvZiAodmFsdWUpID09PSBcImJvb2xlYW5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGdpdmUgdmFsdWUgaXMgaW5zdGFuY2Ugb2YgYW5vdGhlciBjbGFzcy9mdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaXNJbnN0YW5jZU9mKG9iajogYW55LCBjbGF6ejogYW55KTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGlmIChvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGhjID0gXCJbb2JqZWN0IEhUTUxDb2xsZWN0aW9uXVwiO1xyXG4gICAgICAgIGlmIChvYmoudG9TdHJpbmcoKSA9PT0gaGMgJiYgY2xhenogPT09IFwiSFRNTENvbGxlY3Rpb25cIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoQmxlbmQuaXNTdHJpbmcoY2xhenopKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZm4gPSBuZXcgRnVuY3Rpb24oXCJcIiwgXCIgdHJ5IHsgcmV0dXJuIFwiICsgY2xhenogKyBcIiB9IGNhdGNoKGUpIHsgcmV0dXJuIG51bGwgfTtcIik7XHJcbiAgICAgICAgICAgICAgICBjbGF6eiA9IGZuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciByZXMgPSAob2JqIGluc3RhbmNlb2YgY2xhenopO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9vcHMgdGhvdWdoIHRoZSBnaXZlbiBvYmplY3QgKGFycmF5LCBkaWN0aW9uYXJ5KSBhbmQgcnVucyBhIGNhbGxiYWNrIG9uIGVhY2ggaXRlbS5cclxuICAgICAqIFRoZSBjYWxsYmFjayBsb29wIHdpbGwgYnJlYWsgd2hlbiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gcmV0dXJucyBcImZhbHNlXCIgZXhwbGljaXRseSFcclxuICAgICAqIFRoZSBjYWxsYmFjayBoYXMgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XHJcbiAgICAgKiBmdW5jdGlvbihpdGVtOmFueSwgaW5kZXg6bnVtYmVyfHN0cmluZywgc2NvcGU6YW55ID0gb2JqKSB7XHJcbiAgICAgKiB9XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoKG9iajogYW55LCBjYWxsYmFjazogRnVuY3Rpb24sIHNjb3BlPzogYW55KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBIVE1MQ29sbGVjdGlvbiA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB2YXIgSFRNTENvbGxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIga2V5OiBhbnk7XHJcbiAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICBpZiAoQmxlbmQuaXNGdW5jdGlvbihvYmopKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQmxlbmQuaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoOiBudW1iZXIgPSBvYmoubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yIChrZXkgPSAwOyBrZXkgPCBsZW5ndGg7IGtleSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoc2NvcGUsIG9ialtrZXldLCBwYXJzZUludChrZXkpLCBvYmopID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQmxlbmQuaXNJbnN0YW5jZU9mKG9iaiwgXCJIVE1MQ29sbGVjdGlvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbmd0aDogbnVtYmVyID0gb2JqLmxlbmd0aCwga2V5OiBhbnksIGVsOiBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIGZvciAoa2V5ID0gMDsga2V5ICE9PSBsZW5ndGg7IGtleSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwgPSBvYmouaXRlbShrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT09IFwibGVuZ3RoXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoc2NvcGUsIGVsLCBwYXJzZUludChrZXkpLCBvYmopID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXksIG9iaikgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBDcmVhdGUgYSBuZXcgQmxlbmQuQ29tcG9uZW50IG9iamVjdFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50PFQgZXh0ZW5kcyBCbGVuZC5Db21wb25lbnQ+KGNsYXp6OiBDb21wb25lbnRUeXBlcywgY29uZmlnOiBhbnkgPSBudWxsKTogVCB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoY2xhenopID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGlmIChCbGVuZC5yZWdpc3RyeVsoPHN0cmluZz5jbGF6eildKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQmxlbmQuY3JlYXRlQ29tcG9uZW50PFQ+KEJsZW5kLnJlZ2lzdHJ5Wyg8c3RyaW5nPmNsYXp6KV0sIGNvbmZpZyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gY2xhc3MgYWxpYXMgJHtjbGF6en1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoQmxlbmQuaXNDbGFzcyhjbGF6eikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxUPm5ldyAoPENvbXBvbmVudENsYXNzPmNsYXp6KShjb25maWcgfHwge30pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xhenogIT09IG51bGwgJiYgY2xhenogIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgKGNsYXp6KSA9PT0gXCJvYmplY3RcIiAmJiAoPENvbXBvbmVudENvbmZpZz5jbGF6eikuY3R5cGUpIHtcclxuICAgICAgICAgICAgdmFyIGN0eXBlID0gKDxDb21wb25lbnRDb25maWc+Y2xhenopLmN0eXBlO1xyXG4gICAgICAgICAgICBkZWxldGUgKCg8Q29tcG9uZW50Q29uZmlnPmNsYXp6KS5jdHlwZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBCbGVuZC5jcmVhdGVDb21wb25lbnQ8VD4oY3R5cGUsIEJsZW5kLmFwcGx5KGNsYXp6LCBjb25maWcpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBjcmVhdGUgYW4gb2JqZWN0IGZyb20gJHtjbGF6en1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzQ2xhc3MoY2xheno6IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgKGNsYXp6KSA9PT0gXCJmdW5jdGlvblwiICYmICEhT2JqZWN0LmtleXMoKDxhbnk+Y2xhenopLnByb3RvdHlwZSkubGVuZ3RoID09PSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIGEgY2xhc3Mgd2l0aCBhIGdpdmVuIGFsaWFzIGludG8gdGhlIGNsYXNzIHJlZ2lzdHJ5IHNvIHdlIGNhblxyXG4gICAgICogaW5zdGFudGlhdGUgYW4gb2JqZWN0IHdpdGggY3JlYXRlT2JqZWN0V2l0aEFsaWFzLlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDbGFzc1dpdGhBbGlhcyhhbGlhczogc3RyaW5nLCBjbGF6ejogQ29tcG9uZW50Q2xhc3MpIHtcclxuICAgICAgICBpZiAoIXJlZ2lzdHJ5W2FsaWFzXSkge1xyXG4gICAgICAgICAgICBCbGVuZC5yZWdpc3RyeVthbGlhc10gPSBjbGF6ejtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEEgQ2xhc3Mgd2l0aCBhbGlhcyAke2FsaWFzfSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQhYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIm5hbWVzcGFjZSBCbGVuZCB7XHJcbiAgICBleHBvcnQgdmFyIHZlcnNpb24gPSBcInYyLjAuMlwiO1xufSIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxNiBUcnVlU29mdHdhcmUgQi5WLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0JsZW5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0NvbXBvbmVudC50c1wiIC8+XHJcblxyXG5uYW1lc3BhY2UgQmxlbmQuYWpheCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCYXNlIGNsYXNzIGZvciBhbiBBamF4IFJlcXVlc3RcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqYXhSZXF1ZXN0IGV4dGVuZHMgQmxlbmQuQ29tcG9uZW50IHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHhocjogWE1MSHR0cFJlcXVlc3Q7XHJcbiAgICAgICAgcHJvdGVjdGVkIHhockNvbmZpZzogRGljdGlvbmFyeUludGVyZmFjZTtcclxuICAgICAgICBwcm90ZWN0ZWQgdXJsOiBzdHJpbmc7XHJcbiAgICAgICAgcHJvdGVjdGVkIGhlYWRlcnM6IERpY3Rpb25hcnlJbnRlcmZhY2U7XHJcbiAgICAgICAgcHJvdGVjdGVkIG9uQ29tcGxldGU6IEZ1bmN0aW9uO1xyXG4gICAgICAgIHByb3RlY3RlZCBvblByb2dyZXNzOiBGdW5jdGlvbjtcclxuICAgICAgICBwcm90ZWN0ZWQgb25GYWlsZWQ6IEZ1bmN0aW9uO1xyXG4gICAgICAgIHByb3RlY3RlZCBvblN1Y2Nlc3M6IEZ1bmN0aW9uO1xyXG4gICAgICAgIHByb3RlY3RlZCBvblN0YXJ0OiBGdW5jdGlvbjtcclxuICAgICAgICBwcm90ZWN0ZWQgb25QcmVwYXJlVXBsb2FkOiBGdW5jdGlvbjtcclxuICAgICAgICBwcm90ZWN0ZWQgc2NvcGU6IGFueTtcclxuICAgICAgICBwcm90ZWN0ZWQgY2FsbElEOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBkb1NlbmRSZXF1ZXN0KGRhdGE6IERpY3Rpb25hcnlJbnRlcmZhY2UpOiB2b2lkXHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IHN0cmluZyB8IEFqYXhSZXF1ZXN0SW50ZXJmYWNlKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsIGNmZzogQWpheFJlcXVlc3RJbnRlcmZhY2U7XHJcbiAgICAgICAgICAgIGlmIChCbGVuZC5pc1N0cmluZyhjb25maWcpKSB7XHJcbiAgICAgICAgICAgICAgICBjZmcgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiA8c3RyaW5nPmNvbmZpZyB8fCBudWxsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2ZnID0gPEFqYXhSZXF1ZXN0SW50ZXJmYWNlPmNvbmZpZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZS51cmwgPSBjZmcudXJsIHx8IG51bGw7XHJcbiAgICAgICAgICAgIG1lLmhlYWRlcnMgPSBjZmcuaGVhZGVycyB8fCB7fTtcclxuICAgICAgICAgICAgbWUub25Db21wbGV0ZSA9IGNmZy5vbkNvbXBsZXRlIHx8IG51bGw7XHJcbiAgICAgICAgICAgIG1lLm9uUHJvZ3Jlc3MgPSBjZmcub25Qcm9ncmVzcyB8fCBudWxsO1xyXG4gICAgICAgICAgICBtZS5vbkZhaWxlZCA9IGNmZy5vbkZhaWxlZCB8fCBudWxsO1xyXG4gICAgICAgICAgICBtZS5vblN1Y2Nlc3MgPSBjZmcub25TdWNjZXNzIHx8IG51bGw7XHJcbiAgICAgICAgICAgIG1lLm9uU3RhcnQgPSBjZmcub25TdGFydCB8fCBudWxsO1xyXG4gICAgICAgICAgICBtZS5vblByZXBhcmVVcGxvYWQgPSBjZmcub25QcmVwYXJlVXBsb2FkIHx8IG51bGw7XHJcbiAgICAgICAgICAgIG1lLnNjb3BlID0gY2ZnLnNjb3BlIHwgPGFueT5tZTtcclxuICAgICAgICAgICAgbWUueGhyQ29uZmlnID0ge1xyXG4gICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiBjZmcud2l0aENyZWRlbnRpYWxzID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG1lLmluaXRpYWxpemUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbml0aWFsaXplKCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLCBoYW5kbGVyczogRGljdGlvbmFyeUludGVyZmFjZSA9IHtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzOiBtZS51cGRhdGVQcm9ncmVzcyxcclxuICAgICAgICAgICAgICAgIGxvYWQ6IG1lLnRyYW5zZmVyQ29tcGxldGUsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogbWUudHJhbnNmZXJGYWlsZWQsXHJcbiAgICAgICAgICAgICAgICBhYm9ydDogbWUudHJhbnNmZXJDYW5jZWxlZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBtZS54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgQmxlbmQuZm9yRWFjaChoYW5kbGVycywgZnVuY3Rpb24oaGFuZGxlcjogRnVuY3Rpb24sIGV2ZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBtZS54aHIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uKGV2dDogRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLmFwcGx5KG1lLCBbbWUueGhyLCBldnRdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgQmxlbmQuZm9yRWFjaChtZS5oZWFkZXJzLCBmdW5jdGlvbih2YWx1ZTogc3RyaW5nLCBoZWFkZXI6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgbWUueGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBCbGVuZC5mb3JFYWNoKG1lLnhockNvbmZpZywgZnVuY3Rpb24odmFsdWU6IGFueSwga2V5OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICg8YW55Pm1lLnhocilba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZW5kUmVxdWVzdChkYXRhOiBEaWN0aW9uYXJ5SW50ZXJmYWNlID0ge30pIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgbWUuY2FsbElEID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgaWYgKG1lLmNhbGxIYW5kbGVyKFwib25TdGFydFwiLCBhcmd1bWVudHMpICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgbWUuZG9TZW5kUmVxdWVzdChkYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lLnRyYW5zZmVyQ2FuY2VsZWQobWUueGhyLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHVwZGF0ZVByb2dyZXNzKHJlcXVlc3Q6IFhNTEh0dHBSZXF1ZXN0LCBldnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLmNhbGxIYW5kbGVyKFwib25Qcm9ncmVzc1wiLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zZmVyQ29tcGxldGUocmVxdWVzdDogWE1MSHR0cFJlcXVlc3QsIGV2dDogRXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgbWUudHJhbnNmZXJGYWlsZWQuYXBwbHkobWUsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPCAzMDApIHtcclxuICAgICAgICAgICAgICAgIG1lLmNhbGxIYW5kbGVyKFwib25TdWNjZXNzXCIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWUuY2FsbEhhbmRsZXIoXCJvbkNvbXBsZXRlXCIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNmZXJGYWlsZWQocmVxdWVzdDogWE1MSHR0cFJlcXVlc3QsIGV2dDogRXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgbWUuY2FsbEhhbmRsZXIoXCJvbkZhaWxlZFwiLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zZmVyQ2FuY2VsZWQocmVxdWVzdDogWE1MSHR0cFJlcXVlc3QsIGV2dDogRXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgbWUudHJhbnNmZXJGYWlsZWQocmVxdWVzdCwgZXZ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpbGUgcHJlcGFyZSBldmVudCBub3RpZmljYXRpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgbm90aWZ5UHJlcGFyZVVwbG9hZChmaWxlOiBGaWxlLCBzdGF0dXM6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxIYW5kbGVyKFwib25QcmVwYXJlVXBsb2FkXCIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxscyBhIHJlZ2lzdGVyZW5kIGhhbmRsZXIgYnkgbmFtZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY2FsbEhhbmRsZXIobmFtZTogc3RyaW5nLCBhcmdzOiBJQXJndW1lbnRzKSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICgoPGFueT5tZSlbbmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoPEZ1bmN0aW9uPig8YW55Pm1lKVtuYW1lXSkuYXBwbHkobWUuc2NvcGUgfHwgbWUsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVVJJIGVuY29kZSBhIHN0cmluZyB2YWx1ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBlbmNvZGVVUklDb21wb25lbnQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKS5yZXBsYWNlKC9bIScoKSpdL2csIGZ1bmN0aW9uKGMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIiVcIiArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVVJMIGVuY29kZSBhIERpY3Rpb25hcnlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgdXJsRW5jb2RlRGF0YShkYXRhOiBEaWN0aW9uYXJ5SW50ZXJmYWNlKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcywgcGF5bG9hZDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgICAgICBCbGVuZC5mb3JFYWNoKGRhdGEsIGZ1bmN0aW9uKHZhbHVlOiBhbnksIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goYCR7a2V5fT0ke21lLmVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSl9YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcGF5bG9hZC5qb2luKFwiJlwiKS50cmltKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIG9yIHVwZGF0ZXMgdGhlIGN1cnJlbnQgVVJMIGJ5IGFkZGluZyBhIGNhbGwgSUQgdGkgYnlwYXNzIGJyb3dzZXIgY2FjaGluZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVVUkkoZGF0YTogRGljdGlvbmFyeUludGVyZmFjZSA9IHt9KSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xyXG4gICAgICAgICAgICBkYXRhW1wiX2NcIl0gPSBtZS5jYWxsSUQ7XHJcbiAgICAgICAgICAgIHJldHVybiAobWUudXJsXHJcbiAgICAgICAgICAgICAgICArIChtZS51cmwuaW5kZXhPZihcIj9cIikgPT09IC0xID8gXCI/XCIgOiBcIiZcIilcclxuICAgICAgICAgICAgICAgICsgbWUudXJsRW5jb2RlRGF0YShkYXRhKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYgVHJ1ZVNvZnR3YXJlIEIuVi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9CbGVuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBamF4UmVxdWVzdC50c1wiIC8+XHJcblxyXG5uYW1lc3BhY2UgQmxlbmQuYWpheCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBamF4R2V0UmVxdWVzdCBpbXBsZW1lbnRzIGEgR0VUIHJlcXVlc3RcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEFqYXhHZXRSZXF1ZXN0IGV4dGVuZHMgQmxlbmQuYWpheC5BamF4UmVxdWVzdCB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBkb1NlbmRSZXF1ZXN0KGRhdGE6IERpY3Rpb25hcnlJbnRlcmZhY2UgPSB7fSkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS54aHIub3BlbihcIkdFVFwiLCBtZS5jcmVhdGVVUkkoZGF0YSksIHRydWUpO1xyXG4gICAgICAgICAgICBtZS54aHIuc2VuZChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYgVHJ1ZVNvZnR3YXJlIEIuVi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9CbGVuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJBamF4UmVxdWVzdC50c1wiIC8+XHJcblxyXG5uYW1lc3BhY2UgQmxlbmQuYWpheCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBamF4UG9zdFJlcXVlc3QgaW1wbGVtZW50cyBhIFBPU1QgcmVxdWVzdCB3aXRoIEZpbGUgdXBsb2FkaW5nIGNhcGFiaWxpdGllc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgQWpheFBvc3RSZXF1ZXN0IGV4dGVuZHMgQmxlbmQuYWpheC5BamF4UmVxdWVzdCB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBib3VuZGFyeTogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBkYXRhSXRlbUhlYWRlcjogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCByZWFkeVRvU2VuZDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGRvU2VuZFJlcXVlc3QoZGF0YTogRGljdGlvbmFyeUludGVyZmFjZSA9IHt9KSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLnJlYWR5VG9TZW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWUuYm91bmRhcnkgPSBcIiEhQEAjI1wiICsgbWUuY2FsbElEICsgXCIjI0BAISFcIjtcclxuICAgICAgICAgICAgbWUuZGF0YUl0ZW1IZWFkZXIgPSBgLS0ke21lLmJvdW5kYXJ5fVxcclxcbkNvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTtgO1xyXG4gICAgICAgICAgICBtZS54aHIub3BlbihcIlBPU1RcIiwgbWUuY3JlYXRlVVJJKCksIHRydWUpO1xyXG4gICAgICAgICAgICBtZS54aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcIm11bHRpcGFydFxcL2Zvcm0tZGF0YTsgYm91bmRhcnk9XCIgKyBtZS5ib3VuZGFyeSk7XHJcbiAgICAgICAgICAgIG1lLmJvdW5kYXJ5RW5jb2RlRGF0YShkYXRhLCBmdW5jdGlvbihlbmNvZGVkRGF0YTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBtZS54aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtTGVuZ3RoXCIsIGVuY29kZWREYXRhLmxlbmd0aC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIG1lLnhoci5zZW5kQXNCaW5hcnkoZW5jb2RlZERhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZSB0aGUgZGF0YSB0aGF0IGlzIHRvIGJlIHNlbnQgKFBPU1QpIGFzeW5jaHJvbm91c2x5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGJvdW5kYXJ5RW5jb2RlRGF0YShkYXRhOiBEaWN0aW9uYXJ5SW50ZXJmYWNlLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIHBlbmRpbmdDb252ZXJ0czogbnVtYmVyID0gMCxcclxuICAgICAgICAgICAgICAgIHBheWxvYWQ6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICAgICAgQmxlbmQuZm9yRWFjaChkYXRhLCBmdW5jdGlvbih2YWx1ZTogYW55LCBrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKEJsZW5kLmlzSW5zdGFuY2VPZih2YWx1ZSwgRmlsZUxpc3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ0NvbnZlcnRzICs9IG1lLmVuY29kZUZpbGVMaXN0KDxGaWxlTGlzdD52YWx1ZSwgcGF5bG9hZCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlbmRpbmdDb252ZXJ0cyAtPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2gobWUuZW5jb2RlRGF0YUl0ZW0oa2V5LCB2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHdhaXRJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBlbmRpbmdDb252ZXJ0cyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwod2FpdElkKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goYC0tJHttZS5ib3VuZGFyeX0tLVxcclxcbmApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG1lLCBbcGF5bG9hZC5qb2luKFwiXCIpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDI1MCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb252ZXJ0cyBhbiBBcnJheUJ1ZmZlciAoRmlsZSkgdG8gYSBzdHJpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGFycmF5QnVmZmVyVG9TdHJpbmcgPSBmdW5jdGlvbihyZXN1bHQ6IEFycmF5PG51bWJlcj4pOiBzdHJpbmcge1xyXG4gICAgICAgICAgICB2YXIgYmluYXJ5ID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkocmVzdWx0KTtcclxuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGJ5dGVzLmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGJpbmFyeSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuY29kZXMgYSBGaWxlTGlzdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5jb2RlRmlsZUxpc3QoZmlsZXM6IEZpbGVMaXN0LCBwYXlsb2FkOiBBcnJheTxzdHJpbmc+LCBvbkZpbmlzaDogRnVuY3Rpb24pOiBudW1iZXIge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudEZpbGU6IEZpbGUsXHJcbiAgICAgICAgICAgICAgICBmaWxldHlwZTogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgbmV4dEZpbGU6IG51bWJlciA9IDAsXHJcbiAgICAgICAgICAgICAgICByZWFkZXI6IEZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZ0OiBFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgZmlsZXR5cGUgPSBjdXJyZW50RmlsZS50eXBlID09PSBcIlwiID8gXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIiA6IGN1cnJlbnRGaWxlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goYCR7bWUuZGF0YUl0ZW1IZWFkZXJ9IG5hbWU9XCIke2N1cnJlbnRGaWxlLm5hbWV9XCI7IGZpbGVuYW1lPVwiJHtjdXJyZW50RmlsZS5uYW1lfVwiXFxyXFxuQ29udGVudC1UeXBlOiAke2ZpbGV0eXBlfVxcclxcblxcclxcbiR7bWUuYXJyYXlCdWZmZXJUb1N0cmluZyhyZWFkZXIucmVzdWx0KX1cXHJcXG5gKTtcclxuICAgICAgICAgICAgICAgIG9uRmluaXNoLmFwcGx5KG1lLCBbXSk7XHJcbiAgICAgICAgICAgICAgICBtZS5ub3RpZnlQcmVwYXJlVXBsb2FkKGN1cnJlbnRGaWxlLCAyKTtcclxuICAgICAgICAgICAgICAgIG5leHRGaWxlICs9IDE7XHJcbiAgICAgICAgICAgICAgICBkb1dvcmsoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVhZGVyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbihldnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBtZS5ub3RpZnlQcmVwYXJlVXBsb2FkKGN1cnJlbnRGaWxlLCAxKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGRvV29yayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbGVzW25leHRGaWxlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRGaWxlID0gZmlsZXNbbmV4dEZpbGVdO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lLm5vdGlmeVByZXBhcmVVcGxvYWQoY3VycmVudEZpbGUsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihjdXJyZW50RmlsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRvV29yaygpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmlsZXMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlcyBzaW1wbGUgZGF0YSBpdGVtc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5jb2RlRGF0YUl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIGAke21lLmRhdGFJdGVtSGVhZGVyfSBuYW1lPVwiJHtrZXl9XCJcXHJcXG5cXHJcXG4ke3ZhbHVlfVxcclxcbmA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIENvcHlyaWdodCAyMDE2IFRydWVTb2Z0d2FyZSBCLlYuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vVHlwaW5ncy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9CbGVuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9Db21wb25lbnQudHNcIiAvPlxyXG5cclxubmFtZXNwYWNlIEJsZW5kLm12YyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBYnN0cmFjdCBjbGFzcyBwcm92aWRpbmcgY29udHJvbGxlciByZWdzaXRlcmF0aW9uIGFuZCBldmVudCBwdWJsaXNoaW5nXHJcbiAgICAgKiBUaGlzIGNsYXNzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBWaWV3IGFuZCB0aGUgQ29udGV4dFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgQ2xpZW50IGV4dGVuZHMgQmxlbmQuQ29tcG9uZW50IHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGNvbnRyb2xsZXJzOiBBcnJheTxCbGVuZC5tdmMuQ29udHJvbGxlcj47XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IE12Y0NsaWVudEludGVyZmFjZSA9IHt9KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbmZpZyk7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLmNvbnRyb2xsZXJzID0gW107XHJcbiAgICAgICAgICAgIG1lLmFkZENvbnRyb2xsZXIoY29uZmlnLmNvbnRyb2xsZXIgfHwgW10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRmlyZXMgYW4gZXZlbnQgdG93YXJkcyB0aGUgQ29udHJvbGxlcnMgd2l0aGluIHRoaXMgVmlld1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBmaXJlRXZlbnRXaXRoU2NvcGUoc2NvcGU6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGFyZ3M6IEFycmF5PGFueT4pIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKG1lLmNvbnRyb2xsZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBCbGVuZC5mb3JFYWNoKG1lLmNvbnRyb2xsZXJzLCBmdW5jdGlvbihjb250cm9sbGVyOiBDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xsZXIuZGVsZWdhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5kZWxlZ2F0ZShldmVudE5hbWUsIHNjb3BlLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjb250cm9sbGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICg8YW55PmNvbnRyb2xsZXIpLmFwcGx5KHNjb3BlLCBbc2NvcGUsIGV2ZW50TmFtZV0uY29uY2F0KGFyZ3MpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkcyAocmVnaXN0ZXJzKSBDb250cm9sbGVycyB3aXRoIHRoaXMgY2xpZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGFkZENvbnRyb2xsZXIoY29udHJvbGxlcnM6IENvbnRyb2xsZXJUeXBlIHwgQXJyYXk8Q29udHJvbGxlclR5cGU+KSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBjdHJsOiBDb250cm9sbGVyO1xyXG4gICAgICAgICAgICBCbGVuZC5mb3JFYWNoKEJsZW5kLndyYXBJbkFycmF5KGNvbnRyb2xsZXJzKSwgZnVuY3Rpb24oaXRlbTogQ29udHJvbGxlclR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChCbGVuZC5pc0NsYXNzKGl0ZW0pIHx8IEJsZW5kLmlzU3RyaW5nKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3RybCA9IDxDb250cm9sbGVyPkJsZW5kLmNyZWF0ZUNvbXBvbmVudChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQmxlbmQuaXNPYmplY3QoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsID0gPENvbnRyb2xsZXI+aXRlbTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQmxlbmQuaXNGdW5jdGlvbihpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwgPSA8YW55Pml0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoQmxlbmQuaXNJbnN0YW5jZU9mKGN0cmwsIEJsZW5kLm12Yy5Db250cm9sbGVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuYmluZFZpZXcobWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lLmNvbnRyb2xsZXJzLnB1c2goY3RybCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEJsZW5kLmlzRnVuY3Rpb24oY3RybCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZS5jb250cm9sbGVycy5wdXNoKDxhbnk+ZnVuY3Rpb24oKSB7IHJldHVybiAoPGFueT5jdHJsKS5hcHBseShtZSwgYXJndW1lbnRzKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjdHJsfSBpcyBub3QgYSB2YWxpZCBCbGVuZC5tdmMuQ29udHJvbGxlcmApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYgVHJ1ZVNvZnR3YXJlIEIuVi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9UeXBpbmdzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0JsZW5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNsaWVudC50c1wiIC8+XHJcblxyXG5uYW1lc3BhY2UgQmxlbmQubXZjIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVmlldyBleHRlbmRzIEJsZW5kLm12Yy5DbGllbnQge1xyXG5cclxuICAgICAgICBwcml2YXRlIHJlZmVyZW5jZTogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBjb250ZXh0OiBCbGVuZC5tdmMuQ29udGV4dDtcclxuICAgICAgICBwcm90ZWN0ZWQgZXZlbnRzRW5hYmxlZDogYm9vbGVhbjtcclxuICAgICAgICBwcm90ZWN0ZWQgY3VycmVudEV2ZW50TmFtZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBNdmNWaWV3SW50ZXJmYWNlID0ge30pIHtcclxuICAgICAgICAgICAgc3VwZXIoY29uZmlnKTtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgbWUucmVmZXJlbmNlID0gY29uZmlnLnJlZmVyZW5jZSB8fCBudWxsO1xyXG4gICAgICAgICAgICBtZS5jdXJyZW50RXZlbnROYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgbWUuc2V0Q29udGV4dChjb25maWcuY29udGV4dCB8fCBudWxsKTtcclxuICAgICAgICAgICAgbWUuZGlzYWJsZUV2ZW50cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0cyB0aGUgZ2xvYmFsIE1WQyBjb250ZXh0XHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzZXRDb250ZXh0KGNvbnRleHQ6IEJsZW5kLm12Yy5Db250ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2hlY2tzIHRvIHNlZSBpZiB3ZSBoYXZlIGEgZ2xvYmFsIE1WQyBjb250ZXh0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGhhc0NvbnRleHQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhQmxlbmQuaXNOdWxsT3JVbmRlZih0aGlzLmNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGlzYWJsZXMgdGhlIGV2ZW50IGFuZCBub3RpZmljYXRpb24gb24gdGhpcyBWaWV3XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGRpc2FibGVFdmVudHMoKTogQmxlbmQubXZjLkNsaWVudCB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuYWJsZXMgdGhlIGV2ZW50IGFuZCBub3RpZmljYXRpb24gb24gdGhpcyB2aWV3XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGVuYWJsZUV2ZW50cygpOiBCbGVuZC5tdmMuQ2xpZW50IHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSByZWZlcmVuY2UgaWRlbnRpZmllciBmb3IgdGhpcyBWaWV3XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldFJlZmVyZW5jZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJlbmNlIHx8IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2FuRmlyZUV2ZW50cygpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzRW5hYmxlZCA9PT0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpcmVzIGFuIGV2ZW50IHRvd2FyZHMgdGhlIENvbnRyb2xsZXJzIHdpdGhpbiB0aGlzIFZpZXdcclxuICAgICAgICAgKiBhbmQgdGhlIGN1cnJlbnQgZ2xvYmFsIENvbnRleHQgaXMgcG9zc2libGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZmlyZUV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IEJsZW5kLm12Yy5DbGllbnQge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS5jdXJyZW50RXZlbnROYW1lID0gZXZlbnROYW1lO1xyXG4gICAgICAgICAgICBpZiAobWUuY2FuRmlyZUV2ZW50cygpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVFdmVudFdpdGhTY29wZShtZSwgZXZlbnROYW1lLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIGlmIChtZS5jb250ZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWUuY29udGV4dC5kZWxlZ2F0ZShldmVudE5hbWUsIG1lLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYgVHJ1ZVNvZnR3YXJlIEIuVi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9UeXBpbmdzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0NvbXBvbmVudC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJWaWV3LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNsaWVudC50c1wiIC8+XHJcblxyXG5pbnRlcmZhY2UgQ29udHJvbGxlckV2ZW50SGFuZGxlciB7XHJcbiAgICAodmlldzogQmxlbmQubXZjLlZpZXcsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcclxufVxyXG5cclxubmFtZXNwYWNlIEJsZW5kLm12YyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCYXNlIGNsYXNzIGZvciBhIENvbnRyb2xsZXIuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgQmxlbmQuQ29tcG9uZW50IHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBoYW5kbGVyczogRGljdGlvbmFyeUludGVyZmFjZSA9IHt9O1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBhbnkgPSB7fSkge1xyXG4gICAgICAgICAgICBzdXBlcihjb25maWcpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRFdmVudHMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbml0RXZlbnRzKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICAgICAqIERlbGVnYXRlcyBhbiBldmVudCB0byB0aGUgcmVnaXNyZXRlZCBoYW5kbGVycyBpbiB0aGlzIGNvbnRyb2xsZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBkZWxlZ2F0ZShldmVudE5hbWU6IHN0cmluZywgdmlldzogQ2xpZW50LCBhcmdzOiBhbnlbXSkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlID0gKDxhbnk+dmlldykuZ2V0UmVmZXJlbmNlID8gKDxhbnk+dmlldykuZ2V0UmVmZXJlbmNlKCkgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcnMgPSBtZS5oYW5kbGVyc1tldmVudE5hbWVdIHx8IG1lLmhhbmRsZXJzW3JlZmVyZW5jZSArIFwiLlwiICsgZXZlbnROYW1lXSB8fCBudWxsO1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlcnMgJiYgaGFuZGxlcnMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXI6IENvbnRyb2xsZXJFdmVudEhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5hcHBseShtZSwgW3ZpZXddLmNvbmNhdChhcmdzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgd2l0aGluIHRoaXMgY29udHJvbGxlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBvbihldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogQ29udHJvbGxlckV2ZW50SGFuZGxlcik6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIW1lLmhhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIG1lLmhhbmRsZXJzW2V2ZW50TmFtZV0gPSBbaGFuZGxlcl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZS5oYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICAgICAqIFJlZ2lzdGVycyBhIFZpZXcncyByZWZlcmVuY2Ugd2l0aGluIHRoaXMgY29udHJvbGxlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJpbmRWaWV3KHZpZXc6IENsaWVudCB8IFZpZXcpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIG1lOiBhbnkgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlID0gKCg8Vmlldz52aWV3KS5nZXRSZWZlcmVuY2UgPyAoPFZpZXc+dmlldykuZ2V0UmVmZXJlbmNlKCkgOiBudWxsKTsgLy8gdHJpY2sgdG8gYnlwYXNzIHRoZSBDb250ZXh0IG9iamVjdFxyXG4gICAgICAgICAgICBpZiAocmVmZXJlbmNlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVbcmVmZXJlbmNlXSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lW3JlZmVyZW5jZV0gPSB2aWV3O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChCbGVuZC5pc0FycmF5KG1lW3JlZmVyZW5jZV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxBcnJheTxCbGVuZC5tdmMuVmlldz4+bWVbcmVmZXJlbmNlXSkucHVzaCg8Vmlldz52aWV3KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYgVHJ1ZVNvZnR3YXJlIEIuVi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9UeXBpbmdzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0JsZW5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNvbnRyb2xsZXIudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQ2xpZW50LnRzXCIgLz5cclxuXHJcblxyXG5cclxubmFtZXNwYWNlIEJsZW5kLm12YyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXByZXNlbnRzIGEgY29udGV4dCB0aGF0IGhvbHMgaW5zdGFuc2VzIG9mIGNvbnRyb2xsZXJzIGFuIG90aGVyXHJcbiAgICAgKiAgbXZjIHJlbGF0ZWQgc3RhdGVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIENvbnRleHQgZXh0ZW5kcyBCbGVuZC5tdmMuQ2xpZW50IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVsZWdhdGVzIGFuIGV2ZW50IHRvIHRoZSBDb250cm9sbGVycyB3aXRoaW4gdGhpcyBDb250ZXh0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGRlbGVnYXRlKGV2ZW50TmFtZTogc3RyaW5nLCBzZW5kZXI6IENsaWVudCwgYXJnczogQXJyYXk8YW55Pikge1xyXG4gICAgICAgICAgICB0aGlzLmZpcmVFdmVudFdpdGhTY29wZShzZW5kZXIsIGV2ZW50TmFtZSwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYgVHJ1ZVNvZnR3YXJlIEIuVi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tdmMvVmlldy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb20vRWxlbWVudC50c1wiIC8+XHJcblxyXG5uYW1lc3BhY2UgQmxlbmQubWF0ZXJpYWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgYSBNYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0ZXJpYWwgZXh0ZW5kcyBCbGVuZC5tdmMuVmlldyB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBwYXJlbnQ6IEJsZW5kLm1hdGVyaWFsLk1hdGVyaWFsO1xyXG4gICAgICAgIHByb3RlY3RlZCBlbGVtZW50OiBCbGVuZC5kb20uRWxlbWVudDtcclxuICAgICAgICBwcm90ZWN0ZWQgaXNSZW5kZXJlZDogYm9vbGVhbjtcclxuICAgICAgICBwcm90ZWN0ZWQgdmlzaWJsZTogYm9vbGVhbjtcclxuICAgICAgICBwcm90ZWN0ZWQgY29uZmlnOiBNYXRlcmlhbEludGVyZmFjZTtcclxuICAgICAgICBwcm90ZWN0ZWQgdXNlUGFyZW50Q29udHJvbGxlcnM6IGJvb2xlYW47XHJcbiAgICAgICAgcHJvdGVjdGVkIGlzSW5pdGlhbGl6ZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgcHJvdGVjdGVkIGNhbkxheW91dDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogTWF0ZXJpYWxJbnRlcmZhY2UgPSB7fSkge1xyXG4gICAgICAgICAgICBzdXBlcihjb25maWcpO1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS5pc0luaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG1lLnBhcmVudCA9IGNvbmZpZy5wYXJlbnQgfHwgbnVsbDtcclxuICAgICAgICAgICAgbWUudXNlUGFyZW50Q29udHJvbGxlcnMgPSBjb25maWcudXNlUGFyZW50Q29udHJvbGxlciB8fCBmYWxzZTtcclxuICAgICAgICAgICAgbWUuaXNSZW5kZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBtZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWUuY29uZmlnID0ge1xyXG4gICAgICAgICAgICAgICAgY3NzOiBbXSxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7fSxcclxuICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0b3A6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBjb25maWcucmVzcG9uc2l2ZSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlVG86IGNvbmZpZy5yZXNwb25zZVRvIHx8IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbWUuYWRkQ3NzQ2xhc3MoY29uZmlnLmNzcyB8fCBbXSk7XHJcbiAgICAgICAgICAgIG1lLnNldFN0eWxlKGNvbmZpZy5zdHlsZSB8fCB7fSk7XHJcbiAgICAgICAgICAgIG1lLnNldFZpc2libGUoQmxlbmQuaXNCb29sZWFuKGNvbmZpZy52aXNpYmxlKSA/IGNvbmZpZy52aXNpYmxlIDogbWUudmlzaWJsZSk7XHJcbiAgICAgICAgICAgIG1lLnNldEJvdW5kcyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IGNvbmZpZy50b3AgfHwgbnVsbCxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IGNvbmZpZy5sZWZ0IHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogY29uZmlnLndpZHRoIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGNvbmZpZy5oZWlnaHQgfHwgbnVsbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWUuaW5pdGlhbGl6ZVJlc3BvbnNpdmVFdmVudHMoKTtcclxuICAgICAgICAgICAgbWUuY2FuTGF5b3V0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEludGVybmFsIGZ1bmN0aW9uIHVzZWQgZm9yIGluaXRpYXRpbmcgYSBzdWItbGF5b3V0IHByb2Nlc3MuIFRoaXMgZnVuY3Rpb24gY2FuIGJlXHJcbiAgICAgICAgICogb3ZlcnJpZGRlbiB3aGVuIGltcGxlbWVudGluZyBhIGN1c3RvbSBjb21wb25lbnQuIFNlZSB0aGUgQnV0dG9uIGNvbXBvbmVudCBhc1xyXG4gICAgICAgICAqIGFuIGV4YW1wbGUgb2YgaG93IHRvIHVzZSB0aGlzIGZ1bmN0aW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHVwZGF0ZUxheW91dCgpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluaXRpYXRlcyBhIHN1Yi1sYXlvdXQgcHJvY2Vzcy5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgcGVyZm9ybUxheW91dCgpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKG1lLmNhbkxheW91dCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbWUuc3VzcGVuZExheW91dCgpO1xyXG4gICAgICAgICAgICAgICAgbWUudXBkYXRlTGF5b3V0KCk7XHJcbiAgICAgICAgICAgICAgICBtZS5yZXN1bWVMYXlvdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU3VzcGVuZHMgdGhlIHN1Yi1sYXlvdXQgZnJvbSBzdGFyaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHN1c3BlbmRMYXlvdXQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuTGF5b3V0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXN1bWVzIHRoZSBzdWItbGF5b3V0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlc3VtZUxheW91dCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5MYXlvdXQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIGludGVybmFsbHkgb24gcmVuZGVyIHRpbWUgdG8gYXNzaWduIGVsZW1lbnQgSURzIHRvXHJcbiAgICAgICAgICogcHJvcGVydGllc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBhc3NpZ25FbGVtZW50QnlPSUQoZWw6IEJsZW5kLmRvbS5FbGVtZW50LCBvaWQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgbWU6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChtZVtvaWRdID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBtZVtvaWRdID0gZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluaXRpYWxpemVkIGEgcmVzcG9uc2l2ZSBsaXN0ZW5lciBmb3IgdGhpcyBNYXRlcmlhbCBieSBhZGRpbmcgYSBsaXN0ZW5lciB0byB0aGVcclxuICAgICAgICAgKiBSdW50aW1lLmFkZE1lZGlhUXVlcnlMaXN0ZW5lclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBpbml0aWFsaXplUmVzcG9uc2l2ZUV2ZW50cygpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcywgY29uZmlnOiBNZWRpYVF1ZXJ5Q29uZmlnO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnID0gbWUuY29uZmlnLnJlc3BvbnNpdmUgPT09IHRydWUgPyBCbGVuZC5DT01NT05fTUVESUFfUVVFUklFU1xyXG4gICAgICAgICAgICAgICAgOiBtZS5jb25maWcucmVzcG9uc2VUbyB8fCBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgQmxlbmQuZm9yRWFjaChjb25maWcsIGZ1bmN0aW9uKHF1ZXJpZXM6IEFycmF5PHN0cmluZz4sIGFsaWFzOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWVyaWVzID0gQmxlbmQud3JhcEluQXJyYXk8c3RyaW5nPihxdWVyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICBxdWVyaWVzLmZvckVhY2goZnVuY3Rpb24obWVkaWFRdWVyeTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJsZW5kLlJ1bnRpbWUuYWRkTWVkaWFRdWVyeUxpc3RlbmVyKG1lZGlhUXVlcnksIGZ1bmN0aW9uKG1xbDogTWVkaWFRdWVyeUxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lLmZpcmVFdmVudChcInJlc3BvbnNpdmVDaGFuZ2VkXCIsIGFsaWFzLCBtcWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0UHJvcGVydHk8VD4obmFtZTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IGFueSA9IG51bGwpOiBUIHtcclxuICAgICAgICAgICAgdmFyIG1lOiBhbnkgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAobmFtZS5pbmRleE9mKFwiY29uZmlnLlwiLCAwKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZShcImNvbmZpZy5cIiwgXCJcIikudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChtZS5jb25maWdbbmFtZV0gPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWx1ZSA6IG1lLmNvbmZpZ1tuYW1lXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuZ2V0UHJvcGVydHk8VD4obmFtZSwgZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlbmRlcigpOiBCbGVuZC5kb20uRWxlbWVudCB7XHJcbiAgICAgICAgICAgIHJldHVybiBCbGVuZC5kb20uRWxlbWVudC5jcmVhdGUoe30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2VuZHMgYSBtYXRlcmlhbEluaXRpYWxpemVkIG5vdGlmaWNhdGlvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBub3RpZnlNYXRlcmlhbEluaXRpYWxpemVkKCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS5maXJlRXZlbnQoXCJtYXRlcmlhbEluaXRpYWxpemVkXCIsIG1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERPIE5PVCBVU0UgVEhJUyBGVU5DVElPTiFcclxuICAgICAgICAgKiBJbnRlcm5hbCBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBieSB0aGUgcGFyZW50L2hvc3QgdG8gaW5pdGlhdGVcclxuICAgICAgICAgKiB0aGUgaW5pdGlhbGl6YXRpb24gcHJvY2Vzc1xyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZG9Jbml0aWFsaXplKCk6IEJsZW5kLm1hdGVyaWFsLk1hdGVyaWFsIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgbWUuaW5pdEV2ZW50cygpO1xyXG4gICAgICAgICAgICBtZS5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgICAgIG1lLnBlcmZvcm1MYXlvdXQoKTtcclxuICAgICAgICAgICAgbWUubm90aWZ5TWF0ZXJpYWxJbml0aWFsaXplZCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIGZ1bmN0aW9uIGNhbiBiZSBvdmVycmlkZW4gdG8gZG8gY3VzdG9tIGluaXRpYWxpemF0aW9uIG9uIHRoaXMgTWF0ZXJpYWxcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBmb3IgY3JlYXRpbmcgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGlzIE1hdGVyaWFsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGluaXRFdmVudHMoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2hlY2sgaWYgZXZlbnRzIGNhbiBiZSBmaXJlZCBvbiB0aGlzIE1hdGVyaWFsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNhbkZpcmVFdmVudHMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsIHN0YXRlOiBib29sZWFuO1xyXG4gICAgICAgICAgICBpZiAoc3VwZXIuY2FuRmlyZUV2ZW50cygpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWUucGFyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBtZS5wYXJlbnQuY2FuRmlyZUV2ZW50cygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gZmFsc2UgJiYgbWUuY3VycmVudEV2ZW50TmFtZSA9PT0gXCJtYXRlcmlhbEluaXRpYWxpemVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8gQk9VTkRTXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBib3VuZHMgb2YgdGhpcyBNYXRlcmlhbCBiYXNlZCBvbiB0aGUgRWxlbWVudEJvdW5kc0ludGVyZmFjZSBpbnRlcmZhY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRCb3VuZHMoKTogRWxlbWVudEJvdW5kc0ludGVyZmFjZSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChtZS5pc1JlbmRlcmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWUuZWxlbWVudC5nZXRCb3VuZHMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXRzIHRoZSBib3VuZHMgb2YgdGhpcyBNYXRlcmlhbCBiYXNlZCBvbiB0aGUgRWxlbWVudEJvdW5kc0ludGVyZmFjZSBpbnRlcmZhY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZXRCb3VuZHMoYm91bmRzOiBFbGVtZW50Qm91bmRzSW50ZXJmYWNlKTogQmxlbmQubWF0ZXJpYWwuTWF0ZXJpYWwge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLCBudWxsQm91bmRzOiBTdHlsZUludGVyZmFjZSA9IHsgdG9wOiBudWxsLCBsZWZ0OiBudWxsLCB3aWR0aDogbnVsbCwgaGVpZ2h0OiBudWxsIH07XHJcbiAgICAgICAgICAgIGlmIChtZS5pc1JlbmRlcmVkKSB7XHJcbiAgICAgICAgICAgICAgICBtZS5zZXRTdHlsZShib3VuZHMgPT09IG51bGwgPyBudWxsQm91bmRzIDogPFN0eWxlSW50ZXJmYWNlPmJvdW5kcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBCbGVuZC5hcHBseShtZS5jb25maWcsIGJvdW5kcyA9PT0gbnVsbCA/IG51bGxCb3VuZHMgOiBib3VuZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lLm5vdGlmeUJvdW5kc0NoYW5nZWQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZW5kcyBib3VuZHNDaGFuZ2VkIG5vdGlmaWNhdGlvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG5vdGlmeUJvdW5kc0NoYW5nZWQoKSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChtZS5pc1JlbmRlcmVkKSB7XHJcbiAgICAgICAgICAgICAgICBtZS5maXJlRXZlbnQoXCJib3VuZHNDaGFuZ2VkXCIsIG1lLmdldEJvdW5kcygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvLyBWSVNJQklMSVRZXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0cyB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBmb3IgdGhpcyBNYXRlcmlhbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbiA9IHRydWUpOiBCbGVuZC5tYXRlcmlhbC5NYXRlcmlhbCB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLnZpc2libGUgPSB2aXNpYmxlID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAobWUuaXNSZW5kZXJlZCkge1xyXG4gICAgICAgICAgICAgICAgbWUuZWxlbWVudC5zZXREYXRhKFwidmlzaWJsZVwiLCBtZS52aXNpYmxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lLmNvbmZpZy52aXNpYmxlID0gbWUudmlzaWJsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZS5ub3RpZnlWaXNpYmlsaXR5Q2hhbmdlZCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGdldHMgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhpcyBNYXRlcmlhbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBpc1Zpc2libGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBtZS52aXNpYmxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2VuZHMgYSB2aXNpYmlsaXR5Q2hhbmdlZCBub3RpZmljYXRpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgbm90aWZ5VmlzaWJpbGl0eUNoYW5nZWQoKSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLmZpcmVFdmVudChcInZpc2liaWxpdHlDaGFuZ2VkXCIsIG1lLnZpc2libGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vIFNUWUxFIGFuZCBDU1NcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXRzIHRoZSBTdHlsZXMgZm9yIHRoaXMgTWF0ZXJpYWxcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBzZXRTdHlsZShzdHlsZTogU3R5bGVJbnRlcmZhY2UpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKG1lLmlzUmVuZGVyZWQpIHtcclxuICAgICAgICAgICAgICAgIG1lLmVsZW1lbnQuc2V0U3R5bGUoc3R5bGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgQmxlbmQuYXBwbHkobWUuY29uZmlnLnN0eWxlLCBzdHlsZSwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lLm5vdGlmeVN0eWxlT3JDU1NDaGFuZ2VkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZGRzIG9uZSBvciBtb3JlIENTUyBjbGFzc2VzIHRvIHRoaXMgTWF0ZXJpYWxcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgYWRkQ3NzQ2xhc3MoY3NzOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChtZS5pc1JlbmRlcmVkKSB7XHJcbiAgICAgICAgICAgICAgICBtZS5lbGVtZW50LmFkZENzc0NsYXNzKGNzcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBCbGVuZC53cmFwSW5BcnJheShjc3MpLmZvckVhY2goZnVuY3Rpb24oaXRtOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAoPEFycmF5PHN0cmluZz4+bWUuY29uZmlnLmNzcykucHVzaChpdG0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWUubm90aWZ5U3R5bGVPckNTU0NoYW5nZWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlbmRzIGEgdmlzaWJpbGl0eUNoYW5nZWQgbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG5vdGlmeVN0eWxlT3JDU1NDaGFuZ2VkKCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS5maXJlRXZlbnQoXCJzdHlsZUNoYW5nZWRcIiwgbWUudmlzaWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKkhlbHBzIGNvbmZpZ3VyaW5nIHRoZSB0aGlzIE1hdGVyaWFsIGJlZm9yZSB0aGUgcmVuZGVyaW5nIGN5Y2xlIGlzIGNvbXBsZXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGZpbmFsaXplUmVuZGVyKCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS5hZGRDc3NDbGFzcyhtZS5jb25maWcuY3NzKTtcclxuICAgICAgICAgICAgbWUuc2V0Qm91bmRzKHtcclxuICAgICAgICAgICAgICAgIHRvcDogbWUuY29uZmlnLnRvcCxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IG1lLmNvbmZpZy5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IG1lLmNvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogbWUuY29uZmlnLmhlaWdodFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWUuc2V0U3R5bGUobWUuY29uZmlnLnN0eWxlKTtcclxuICAgICAgICAgICAgaWYgKCFtZS52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzaG91bGQgYmUgc2V0IG9ubHkgd2hlbiBub3QgdmlzaWJsZVxyXG4gICAgICAgICAgICAgICAgbWUuc2V0VmlzaWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKEJsZW5kLkRFQlVHID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBcIm1cIiArIEJsZW5kLm5ld0lEKCk7XHJcbiAgICAgICAgICAgICAgICBtZS5lbGVtZW50LmdldEVsKCkuc2V0QXR0cmlidXRlKFwiaWRcIiwgaWQpO1xyXG4gICAgICAgICAgICAgICAgKDxhbnk+d2luZG93KVtpZF0gPSBtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBSZXRyaXZlcyB0aGUgSFRNTEVsZW1lbnQgZm9yIHRoaXMgTWF0ZXJpYWxcclxuICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBnZXRFbGVtZW50KCk6IEJsZW5kLmRvbS5FbGVtZW50IHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCFtZS5pc1JlbmRlcmVkKSB7XHJcbiAgICAgICAgICAgICAgICBtZS5kaXNhYmxlRXZlbnRzKCk7XHJcbiAgICAgICAgICAgICAgICBtZS5lbGVtZW50ID0gbWUucmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICBtZS5pc1JlbmRlcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG1lLmZpbmFsaXplUmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICBtZS5lbmFibGVFdmVudHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWUuZWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlc3Ryb3lzIHRoaXMgTWF0ZXJpYWwgYnkgc2V0dGluZyB0aGUgcHJvcGVydGllcyB0byBudWxsLFxyXG4gICAgICAgICAqIGRlbGV0aW5nIHRoZW0gYW5kIHJlbW92aW5nIGl0cyBIVE1MRWxlbWVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS5lbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBCbGVuZC5mb3JFYWNoKG1lLCBmdW5jdGlvbih2YWx1ZTogYW55LCBrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgKDxhbnk+bWUpW2tleV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlICgoPGFueT5tZSlba2V5XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYgVHJ1ZVNvZnR3YXJlIEIuVi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9UeXBpbmdzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0JsZW5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvbS9FbGVtZW50LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL212Yy9Db250ZXh0LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL21hdGVyaWFsL01hdGVyaWFsLnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBCbGVuZC5hcHBsaWNhdGlvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCYXNlIGNsYXNzIGZvciBpbXBsZW1lbnRpbmcgYW4gQXBwbGljYXRpb24gY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIEJsZW5kLm1hdGVyaWFsLk1hdGVyaWFsIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGNvbmZpZzogQXBwbGljYXRpb25JbnRlcmZhY2U7XHJcbiAgICAgICAgcHJvdGVjdGVkIGlzU3RhcnRlZDogYm9vbGVhbjtcclxuICAgICAgICBwcm90ZWN0ZWQgaXNSZXNpemluZzogYm9vbGVhbjtcclxuICAgICAgICBwcm90ZWN0ZWQgbWFpblZpZXc6IEJsZW5kLm1hdGVyaWFsLk1hdGVyaWFsO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBBcHBsaWNhdGlvbkludGVyZmFjZSA9IHt9KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEJsZW5kLmFwcGx5KGNvbmZpZywgPE1hdGVyaWFsSW50ZXJmYWNlPntcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS5pc1N0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgbWUuaXNSZXNpemluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBtZS5jb25maWcubWFpblZpZXcgPSBjb25maWcubWFpblZpZXcgfHwgbnVsbDtcclxuICAgICAgICAgICAgbWUuY29uZmlnLnRoZW1lID0gY29uZmlnLnRoZW1lIHx8IFwiZGVmYXVsdFwiO1xyXG4gICAgICAgICAgICBtZS5jb25maWcuc3R5bGUgPSB7fTsgLy8gcmVtb3ZlIHVzZSBwcm92aWRlZCBzdHlsZXNcclxuICAgICAgICAgICAgbWUuc2V0Q29udGV4dChuZXcgQmxlbmQubXZjLkNvbnRleHQoKSk7XHJcbiAgICAgICAgICAgIG1lLmNyZWF0ZU1haW5WaWV3KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVc2VkIHRvIGZpcmUgYW4gZXZlbnQgd2hlbiB0aGUgYnJvd3NlciBpcyByZXNpemVkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG5vdGlmeUFwcGxpY2F0aW9uUmVzaXplZChldnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLmZpcmVFdmVudChcImFwcGxpY2F0aW9uUmVzaXplZFwiLCBldnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGFuZGxlIHRoZSByZXNpemUgbm90aWZpY2F0aW9uIGNvcnJlY3RseVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBvbldpbmRvd1Jlc2l6ZSgpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCFtZS5pc1Jlc2l6aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBtZS5pc1Jlc2l6aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG1lLm5vdGlmeUFwcGxpY2F0aW9uUmVzaXplZC5hcHBseShtZSwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIG1lLmlzUmVzaXppbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5zdGFsbCBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgd2luZG93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHNldHVwV2luZG93TGlzdGVuZXJzKCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLCB0bSA9IC0xLFxyXG4gICAgICAgICAgICAgICAgY291bnRzID0gMCxcclxuICAgICAgICAgICAgICAgIGN1clNpemUgPSAtMTtcclxuICAgICAgICAgICAgQmxlbmQuUnVudGltZS5hZGRFdmVudExpc3RlbmVyKHdpbmRvdywgXCJyZXNpemVcIiwgZnVuY3Rpb24oZXZ0OiBFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgY3VyU2l6ZSA9IHdpbmRvdy5pbm5lcldpZHRoICsgd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0bSk7XHJcbiAgICAgICAgICAgICAgICB0bSA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudHMgPj0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyU2l6ZSA9PT0gKHdpbmRvdy5pbm5lcldpZHRoICsgaW5uZXJIZWlnaHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lLm9uV2luZG93UmVzaXplLmFwcGx5KG1lLCBbZXZ0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIGFwcGxpY2F0aW9uIGlzIHJlYWR5IGZvciB1c2VyIGludGVyYWN0aW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG5vdGlmeUFwcGxpY2F0aW9uUmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLmZpcmVFdmVudChcImFwcGxpY2F0aW9uUmVhZHlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgcGVyZm9ybUluaXRpYWxNZWRpYVF1ZXJ5KCkge1xyXG4gICAgICAgICAgICBCbGVuZC5SdW50aW1lLnRyaWdnZXJNZWRpYVF1ZXJ5Q2hlY2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhc3luY1J1bigpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEJsZW5kLmRvbS5FbGVtZW50ID0gQmxlbmQuZ2V0RWxlbWVudChkb2N1bWVudC5ib2R5KTtcclxuICAgICAgICAgICAgaWYgKCFtZS5pc1N0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGJvZHkuY2xlYXJFbGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICBib2R5LmFkZENzc0NsYXNzKG1lLmNvbmZpZy50aGVtZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYm9keS5hcHBlbmQobWUuZ2V0RWxlbWVudCgpKTtcclxuICAgICAgICAgICAgICAgIG1lLnNldHVwV2luZG93TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgICAgICBtZS5wZXJmb3JtSW5pdGlhbE1lZGlhUXVlcnkoKTtcclxuICAgICAgICAgICAgICAgIG1lLmRvSW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgbWUubm90aWZ5QXBwbGljYXRpb25SZWFkeSgpO1xyXG4gICAgICAgICAgICAgICAgbWUuaXNTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyB0aGUgbWFpbiB2aWV3IG9mIHRoaXMgYXBwbGljYXRpb25cclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVNYWluVmlldygpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKG1lLmNvbmZpZy5tYWluVmlldykge1xyXG4gICAgICAgICAgICAgICAgbWUubWFpblZpZXcgPSBCbGVuZC5jcmVhdGVDb21wb25lbnQ8QmxlbmQubWF0ZXJpYWwuTWF0ZXJpYWw+KG1lLmNvbmZpZy5tYWluVmlldywge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogbWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKEJsZW5kLmlzSW5zdGFuY2VPZihtZS5tYWluVmlldywgQmxlbmQubWF0ZXJpYWwuTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWUuc2V0Q29udGV4dChtZS5jb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBtZS5tYWluVmlldy5hZGRDc3NDbGFzcyhcIm1iLW1haW52aWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZS5tYWluVmlldy5nZXRQcm9wZXJ0eShcInVzZVBhcmVudENvbnRyb2xsZXJcIiwgdHJ1ZSkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWUubWFpblZpZXcuYWRkQ29udHJvbGxlcihtZS5jb250cm9sbGVycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcHJvdmlkZSBtYWluVmlldyBpcyBub3QgYSB2YWxpZCBWaWV3IGluc3RhbmNlIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3Npbmcgb3IgaW52YWxpZCBtYWluVmlldyFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCByZW5kZXJNYWluVmlldygpOiBCbGVuZC5kb20uRWxlbWVudCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1haW5WaWV3LmdldEVsZW1lbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBmaW5hbGl6ZVJlbmRlcigpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgc3VwZXIuZmluYWxpemVSZW5kZXIoKTtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFdlIGNsZWFudXAgdGhlIG1haW4gdmlldyBib3VuZHMgdG8gZm9yY2UgaXQgdG8gZml0IGludG8gdGhlIGFwcGxpY2F0aW9uXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBtZS5tYWluVmlldy5zZXRCb3VuZHMoeyB0b3A6IG51bGwsIGxlZnQ6IG51bGwsIHdpZHRoOiBudWxsLCBoZWlnaHQ6IG51bGwgfSk7XHJcbiAgICAgICAgICAgIG1lLm1haW5WaWV3LnNldFN0eWxlKHsgZGlzcGxheTogbnVsbCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCByZW5kZXIoKTogQmxlbmQuZG9tLkVsZW1lbnQge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gQmxlbmQuZG9tLkVsZW1lbnQuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIGNsczogW1wibWItYXBwbGljYXRpb25cIl0sXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW21lLnJlbmRlck1haW5WaWV3KCldXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW50cnkgcG9pbnQgb2YgYSBCbGVuZCBhcHBsaWNhdGlvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJ1bigpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCFtZS5pc1N0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgIEJsZW5kLlJ1bnRpbWUucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWUuYXN5bmNSdW4uYXBwbHkobWUsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB9LCBtZSk7XHJcbiAgICAgICAgICAgICAgICBCbGVuZC5SdW50aW1lLmtpY2tTdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxNiBUcnVlU29mdHdhcmUgQi5WLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgYW4gYWRhcHRhaW9uIGFuZCBwb3J0ZWQgZnJvbSBcIk1hdGVyaWFsIERlc2lnbiBMaXRlXCJcclxuICovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVHlwaW5ncy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9CbGVuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9Db21wb25lbnQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9tL0VsZW1lbnQudHNcIiAvPlxyXG5cclxuaW50ZXJmYWNlIFJpcHBsZUludGVyZmFjZSBleHRlbmRzIERpY3Rpb25hcnlJbnRlcmZhY2Uge1xyXG4gICAgZWxlbWVudD86IEJsZW5kLmRvbS5FbGVtZW50O1xyXG4gICAgY2VudGVyPzogYm9vbGVhbjtcclxuICAgIGNvbG9yPzogc3RyaW5nIHwgQmxlbmQuZG9tLkVsZW1lbnQ7XHJcbn1cclxuXHJcbm5hbWVzcGFjZSBCbGVuZC5tYXRlcmlhbC5lZmZlY3Qge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBSaXBwbGUgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEJsZW5kLmRvbS5FbGVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgY29udGFpbmVyOiBCbGVuZC5kb20uRWxlbWVudDtcclxuICAgICAgICBwcml2YXRlIGN1cnJlbnRSaXBwbGU6IEJsZW5kLmRvbS5FbGVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgc2tpcE1vdXNlRXZlbnQ6IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSBjZW50ZXI6IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSByaXBwbGVEdXJhdGlvbjogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgcmVtb3ZlUXVldWU6IEFycmF5PEJsZW5kLmRvbS5FbGVtZW50PjtcclxuICAgICAgICBwcm90ZWN0ZWQgY29sb3I6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogUmlwcGxlSW50ZXJmYWNlID0ge30pIHtcclxuICAgICAgICAgICAgc3VwZXIoY29uZmlnKTtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgbWUucmVtb3ZlUXVldWUgPSBbXTtcclxuICAgICAgICAgICAgbWUucmlwcGxlRHVyYXRpb24gPSAzNTA7XHJcbiAgICAgICAgICAgIG1lLnNraXBNb3VzZUV2ZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG1lLmNlbnRlciA9IGNvbmZpZy5jZW50ZXIgPT09IHRydWUgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgIG1lLmVsZW1lbnQgPSBjb25maWcuZWxlbWVudCB8fCBudWxsO1xyXG4gICAgICAgICAgICBpZiAobWUuZWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbWUuYmluZEV2ZW50cygpO1xyXG4gICAgICAgICAgICAgICAgbWUuc2V0UmlwcGxlQ29sb3IoY29uZmlnLmNvbG9yIHx8IG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYmluZEV2ZW50cygpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKG1lLmVsZW1lbnQuZ2V0UHJvcGVydHkoXCJoYXNSaXBwbGVcIiwgZmFsc2UpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgbWUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIEJsZW5kLmJpbmQobWUsIG1lLmhhbmRsZURvd25FdmVudCkpO1xyXG4gICAgICAgICAgICAgICAgbWUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cCBtb3VzZWxlYXZlXCIsIEJsZW5kLmJpbmQobWUsIG1lLmhhbmRsZUhhbmRsZVVwRXZlbnQpKTtcclxuICAgICAgICAgICAgICAgIG1lLmVsZW1lbnQuc2V0UHJvcGVydHkoXCJoYXNSaXBwbGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBtZS5jcmVhdGVSaXBwbGVDb250YWluZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGNyZWF0ZVJpcHBsZUNvbnRhaW5lcigpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGNvcHlTdHlsZXMgPSBtZS5lbGVtZW50LmdldFN0eWxlKFtcImJvcmRlci1yYWRpdXNcIiwgXCJib3JkZXItY29sb3JcIiwgXCJib3JkZXItd2lkdGhcIiwgXCJib3JkZXItc3R5bGVcIl0pO1xyXG4gICAgICAgICAgICBtZS5jb250YWluZXIgPSBtZS5lbGVtZW50LmFwcGVuZChCbGVuZC5jcmVhdGVFbGVtZW50KHtcclxuICAgICAgICAgICAgICAgIGNsczogXCJtYi1yaXBwbGUtY29udGFpbmVyXCIsXHJcbiAgICAgICAgICAgICAgICBzdHlsZTogY29weVN0eWxlc1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaGFuZGxlRG93bkV2ZW50KGV2dDogRXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcywgdG9wOiBudW1iZXIsIGxlZnQ6IG51bWJlciwgbW91c2VFdmVudDogTW91c2VFdmVudDtcclxuICAgICAgICAgICAgaWYgKG1lLmNlbnRlciA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGVmdCA9IG1lLmNvbnRhaW5lci5nZXRFbCgpLmNsaWVudFdpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgIHRvcCA9IG1lLmNvbnRhaW5lci5nZXRFbCgpLmNsaWVudEhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb3VzZUV2ZW50ID0gPE1vdXNlRXZlbnQ+ZXZ0O1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vdXNlRXZlbnQuc3JjRWxlbWVudCAhPT0gbWUuY29udGFpbmVyLmdldEVsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3JlY3QgPSBtZS5jb250YWluZXIuZ2V0RWwoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gbW91c2VFdmVudC5jbGllbnRYIC0gY3JlY3QubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICB0b3AgPSBtb3VzZUV2ZW50LmNsaWVudFkgLSBjcmVjdC50b3A7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSAoPE1vdXNlRXZlbnQ+ZXZ0KS5vZmZzZXRYO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcCA9ICg8TW91c2VFdmVudD5ldnQpLm9mZnNldFk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWUuaW5pdGlhdGVSaXBwbGUobGVmdCwgdG9wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBoYW5kbGVIYW5kbGVVcEV2ZW50KCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICB3aGlsZSAobWUucmVtb3ZlUXVldWUubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmlwcGxlID0gbWUucmVtb3ZlUXVldWUuc3BsaWNlKDAsIDEpWzBdO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByaXBwbGUucmVtb3ZlQ3NzQ2xhc3MoW1wibWItcmlwcGxlLWFjdGl2ZVwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlwcGxlLmdldEVsKCkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyaXBwbGUuZ2V0RWwoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgICAgICAgICB9LCBtZS5yaXBwbGVEdXJhdGlvbiAqIDAuNCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbml0aWF0ZVJpcHBsZShsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICByaXBwbGUgPSBtZS5jb250YWluZXIuYXBwZW5kKEJsZW5kLmNyZWF0ZUVsZW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNsczogW1wibWItcmlwcGxlXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgd2lkdGggPSBtZS5lbGVtZW50LmdldEVsKCkuY2xpZW50V2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBtZS5lbGVtZW50LmdldEVsKCkuY2xpZW50SGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgeCA9IE1hdGgubWF4KE1hdGguYWJzKHdpZHRoIC0gbGVmdCksIGxlZnQpICogMixcclxuICAgICAgICAgICAgICAgIHkgPSBNYXRoLm1heChNYXRoLmFicyhoZWlnaHQgLSB0b3ApLCB0b3ApICogMixcclxuICAgICAgICAgICAgICAgIHNpemUgPSBNYXRoLnNxcnQoTWF0aC5wb3coeCwgMikgKyBNYXRoLnBvdyh5LCAyKSk7XHJcbiAgICAgICAgICAgIHJpcHBsZS5zZXRTdHlsZSh7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogc2l6ZSxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogc2l6ZSxcclxuICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBtZS5jb2xvcixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJpcHBsZS5hZGRDc3NDbGFzcyhbXCJtYi1yaXBwbGUtcGxhY2VkXCJdKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJpcHBsZS5hZGRDc3NDbGFzcyhbXCJtYi1yaXBwbGUtc2NhbGVkXCJdKTtcclxuICAgICAgICAgICAgICAgIHJpcHBsZS5hZGRDc3NDbGFzcyhbXCJtYi1yaXBwbGUtYWN0aXZlXCJdKTtcclxuICAgICAgICAgICAgfSwgNSk7XHJcbiAgICAgICAgICAgIG1lLnJlbW92ZVF1ZXVlLnB1c2gocmlwcGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIGEgaGV4IGNvbG9yIHRvIGEgUkdCIGZvcm1hdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaGV4VG9SZ2IodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGlmIChCbGVuZC5pc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoICE9PSAwICYmIHZhbHVlWzBdID09PSBcIiNcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdmFsdWUuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBcIiNcIiArIHRbMV0gKyB0WzFdICsgdFsyXSArIHRbMl0gKyB0WzNdICsgdFszXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAgPyBgcmdiYSgke3BhcnNlSW50KHBbMV0sIDE2KX0sJHtwYXJzZUludChwWzJdLCAxNil9LCR7cGFyc2VJbnQocFszXSwgMTYpfSlgIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgc2V0UmlwcGxlQ29sb3IoY29sb3I6IHN0cmluZyB8IEJsZW5kLmRvbS5FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiBudW1iZXIgPSAwLjk1LFxyXG4gICAgICAgICAgICAgICAgcHJvcCA9IFwiY29sb3JcIixcclxuICAgICAgICAgICAgICAgIGNscjogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdENvbG9yID0gXCJyZ2IoMCwwLDApXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoQmxlbmQuaXNJbnN0YW5jZU9mKGNvbG9yLCBCbGVuZC5kb20uRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIGNsciA9IDxzdHJpbmc+KDxCbGVuZC5kb20uRWxlbWVudD5jb2xvcikuZ2V0U3R5bGUocHJvcClbcHJvcF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbHIgPSA8c3RyaW5nPmNvbG9yO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsciAmJiBjbHIubGVuZ3RoICE9PSAwICYmIGNsclswXS5pbkFycmF5KFtcIi5cIiwgXCIjXCJdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IEJsZW5kLnNlbGVjdEVsZW1lbnQoY2xyLCBtZS5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xyID0gPHN0cmluZz5lbC5nZXRTdHlsZShwcm9wKVtwcm9wXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjbHIgPSBtZS5oZXhUb1JnYihjbHIgfHwgZGVmYXVsdENvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHQgPSBjbHIucmVwbGFjZSgvXFxicmdiYVxcYnxcXGJyZ2JcXGJ8XFxzfFxcKHxcXCkvZywgXCJcIikuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgICAgICBpZiAodC5sZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICAgICAgY2xyID0gYHJnYmEoJHt0WzBdfSwke3RbMV19LCR7dFsyXX0sJHtvcGFjaXR5fSlgO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xyID0gYHJnYmEoMCwwLDAsJHtvcGFjaXR5fSlgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lLmNvbG9yID0gY2xyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAyMDE2IFRydWVTb2Z0d2FyZSBCLlYuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vVHlwaW5ncy50c1wiIC8+XHJcblxyXG5uYW1lc3BhY2UgQmxlbmQuZG9tIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRWxlbWVudENvbmZpZ0J1aWxkZXIge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY29uZmlnOiBDcmVhdGVFbGVtZW50SW50ZXJmYWNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBzdHJpbmcgfCBDcmVhdGVFbGVtZW50SW50ZXJmYWNlKSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsIGNmZzogQ3JlYXRlRWxlbWVudEludGVyZmFjZSA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoQmxlbmQuaXNTdHJpbmcoY29uZmlnKSkge1xyXG4gICAgICAgICAgICAgICAgY2ZnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZzogPHN0cmluZz5jb25maWdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjZmcgPSA8Q3JlYXRlRWxlbWVudEludGVyZmFjZT5jb25maWc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWUuY29uZmlnID0gQmxlbmQuYXBwbHkoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnOiBcImRpdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyczoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge30sXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGU6IG51bGxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjZmcsXHJcbiAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkQ2hpbGQoY2hpbGQ6IHN0cmluZyB8IEJsZW5kLmRvbS5FbGVtZW50Q29uZmlnQnVpbGRlciB8IENyZWF0ZUVsZW1lbnRJbnRlcmZhY2UpOiBCbGVuZC5kb20uRWxlbWVudENvbmZpZ0J1aWxkZXIge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoQmxlbmQuaXNJbnN0YW5jZU9mKGNoaWxkLCBCbGVuZC5kb20uRWxlbWVudENvbmZpZ0J1aWxkZXIpKSB7XHJcbiAgICAgICAgICAgICAgICBtZS5jb25maWcuY2hpbGRyZW4ucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPEJsZW5kLmRvbS5FbGVtZW50Q29uZmlnQnVpbGRlcj5jaGlsZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBjID0gbmV3IEJsZW5kLmRvbS5FbGVtZW50Q29uZmlnQnVpbGRlcig8Q3JlYXRlRWxlbWVudEludGVyZmFjZT5jaGlsZCk7XHJcbiAgICAgICAgICAgICAgICBtZS5jb25maWcuY2hpbGRyZW4ucHVzaChjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0U3R5bGUoc3R5bGVzOiBTdHlsZUludGVyZmFjZSk6IEJsZW5kLmRvbS5FbGVtZW50Q29uZmlnQnVpbGRlciB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIEJsZW5kLmZvckVhY2goc3R5bGVzLCBmdW5jdGlvbih2OiBhbnksIGs6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgbWUuY29uZmlnLnN0eWxlW2tdID0gdjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldFNlbGVjdGFibGUoc3RhdGU6IGJvb2xlYW4pOiBCbGVuZC5kb20uRWxlbWVudENvbmZpZ0J1aWxkZXIge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5zZWxlY3RhYmxlID0gc3RhdGU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRUZXh0KHRleHQ6IHN0cmluZyk6IEJsZW5kLmRvbS5FbGVtZW50Q29uZmlnQnVpbGRlciB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRDU1MoY3NzOiBBcnJheTxzdHJpbmc+KTogQmxlbmQuZG9tLkVsZW1lbnRDb25maWdCdWlsZGVyIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgY3NzLmZvckVhY2goZnVuY3Rpb24oaXRtOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICg8QXJyYXk8c3RyaW5nPj5tZS5jb25maWcuY2xzKS5wdXNoKGl0bSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRPSUQob2lkOiBzdHJpbmcpOiBCbGVuZC5kb20uRWxlbWVudENvbmZpZ0J1aWxkZXIge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5vaWQgPSBvaWQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldFRhZyh0YWc6IHN0cmluZyk6IEJsZW5kLmRvbS5FbGVtZW50Q29uZmlnQnVpbGRlciB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnRhZyA9IHRhZztcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0Q29uZmlnKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25maWc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIENvcHlyaWdodCAyMDE2IFRydWVTb2Z0d2FyZSBCLlYuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbWF0ZXJpYWwvTWF0ZXJpYWwudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbWF0ZXJpYWwvZWZmZWN0L1JpcHBsZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb20vRWxlbWVudC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb20vRWxlbWVudENvbmZpZ0J1aWxkZXIudHNcIiAvPlxyXG5cclxubmFtZXNwYWNlIEJsZW5kLmJ1dHRvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCYXNlIGNsYXNzIGZvciBpbXBsZW1lbnRpbmcgYSBCdXR0b25cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIEJsZW5kLm1hdGVyaWFsLk1hdGVyaWFsIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGNvbmZpZzogQnV0dG9uSW50ZXJmYWNlO1xyXG4gICAgICAgIHByb3RlY3RlZCB3cmFwcGVyRWxlbWVudDogQmxlbmQuZG9tLkVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHByb3RlY3RlZCB0ZXh0RWxlbWVudDogQmxlbmQuZG9tLkVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHByb3RlY3RlZCBpY29uRWxlbWVudDogQmxlbmQuZG9tLkVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHByb3RlY3RlZCBidXR0b25UeXBlczogQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBwcm90ZWN0ZWQgZmFiUG9zaXRpb25zOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIHByb3RlY3RlZCBpY29uU2l6ZXM6IERpY3Rpb25hcnlJbnRlcmZhY2U7XHJcbiAgICAgICAgcHJvdGVjdGVkIHJpcHBsZUVmZmVjdDogQmxlbmQubWF0ZXJpYWwuZWZmZWN0LlJpcHBsZTtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogQnV0dG9uSW50ZXJmYWNlID0ge30pIHtcclxuICAgICAgICAgICAgc3VwZXIoY29uZmlnKTtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgbWUuYnV0dG9uVHlwZXMgPSBbXCJmbGF0XCIsIFwicmFpc2VkXCIsIFwiZmFiXCIsIFwiZmFiLW1pbmlcIiwgXCJyb3VuZC1mbGF0XCIsIFwicm91bmQtcmFpc2VkXCJdO1xyXG4gICAgICAgICAgICBtZS5mYWJQb3NpdGlvbnMgPSBbXHJcbiAgICAgICAgICAgICAgICBcInRvcC1yaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3AtY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvcC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICBcImNlbnRlci1yaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjZW50ZXItY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcImNlbnRlci1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICBcImJvdHRvbS1yaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgXCJib3R0b20tY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcImJvdHRvbS1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlbGF0aXZlXCJcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIG1lLmljb25TaXplcyA9IHtcclxuICAgICAgICAgICAgICAgIFwic21hbGxcIjogMTgsXHJcbiAgICAgICAgICAgICAgICBcIm1lZGl1bVwiOiAyNCxcclxuICAgICAgICAgICAgICAgIFwibGFyZ2VcIjogMzYsXHJcbiAgICAgICAgICAgICAgICBcInhsYXJnZVwiOiA0OFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbWUuY29uZmlnID0ge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogY29uZmlnLnRleHQgfHwgXCJcIixcclxuICAgICAgICAgICAgICAgIGljb246IGNvbmZpZy5pY29uIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICBpY29uRmFtaWx5OiBjb25maWcuaWNvbkZhbWlseSB8fCBcIm1hdGVyaWFsLWljb25zXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uQWxpZ246IG1lLmdldENoZWNrSWNvbkFsaWduKGNvbmZpZy5pY29uQWxpZ24pLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uVHlwZTogbWUuZ2V0Q2hlY2tCdXR0b25UeXBlKGNvbmZpZy5idXR0b25UeXBlKSxcclxuICAgICAgICAgICAgICAgIGZhYlBvc2l0aW9uOiBtZS5nZXRDaGVja0ZhYlBvc2l0aW9uKGNvbmZpZy5mYWJQb3NpdGlvbiksXHJcbiAgICAgICAgICAgICAgICB0aGVtZTogY29uZmlnLnRoZW1lIHx8IFwiZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGNvbmZpZy5kaXNhYmxlZCA9PT0gdHJ1ZSA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGljb25TaXplOiBjb25maWcuaWNvblNpemUgfHwgbnVsbCxcclxuICAgICAgICAgICAgICAgIHJpcHBsZTogY29uZmlnLnJpcHBsZSA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRTdGF0ZSh2YWx1ZTogYm9vbGVhbik6IEJsZW5kLmJ1dHRvbi5CdXR0b24ge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS5jb25maWcuZGlzYWJsZWQgPSAhdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbWUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGlzRW5hYmxlZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuICF0aGlzLmNvbmZpZy5kaXNhYmxlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0Q2hlY2xJY29uU2l6ZShpY29uU2l6ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgaWNvblNpemUgPSBpY29uU2l6ZSB8fCBcImRlZmF1bHRcIjtcclxuICAgICAgICAgICAgaWNvblNpemUgPSBpY29uU2l6ZS5pbkFycmF5KE9iamVjdC5rZXlzKG1lLmljb25TaXplcykpID8gaWNvblNpemUgOiBcImRlZmF1bHRcIjtcclxuICAgICAgICAgICAgcmV0dXJuIGljb25TaXplID09PSBcImRlZmF1bHRcIiA/IG51bGwgOiBpY29uU2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0Q2hlY2tGYWJQb3NpdGlvbihmYWJQb3NpdGlvbjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgZmFiUG9zaXRpb24gPSBmYWJQb3NpdGlvbiB8fCBcInJlbGF0aXZlXCI7XHJcbiAgICAgICAgICAgIGZhYlBvc2l0aW9uID0gZmFiUG9zaXRpb24uaW5BcnJheShtZS5mYWJQb3NpdGlvbnMpID8gZmFiUG9zaXRpb24gOiBcInJlbGF0aXZlXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWJQb3NpdGlvbiA9PT0gXCJyZWxhdGl2ZVwiID8gbnVsbCA6IGZhYlBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRDaGVja0ljb25BbGlnbihpY29uQWxpZ246IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGljb25BbGlnbiA9IGljb25BbGlnbiB8fCBcImxlZnRcIjtcclxuICAgICAgICAgICAgcmV0dXJuIGljb25BbGlnbi5pbkFycmF5KFtcImxlZnRcIiwgXCJyaWdodFwiXSkgPyBpY29uQWxpZ24gOiBcImxlZnRcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0Q2hlY2tCdXR0b25UeXBlKGJ1dHRvblR5cGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGJ1dHRvblR5cGUgPSAoYnV0dG9uVHlwZSB8fCBcImZsYXRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBidXR0b25UeXBlLmluQXJyYXkobWUuYnV0dG9uVHlwZXMpID8gYnV0dG9uVHlwZSA6IFwiZmxhdFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldFRoZW1lKHRoZW1lOiBzdHJpbmcpOiBCbGVuZC5idXR0b24uQnV0dG9uIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcclxuICAgICAgICAgICAgbWUuY29uZmlnLnRoZW1lID0gdGhlbWUgfHwgXCJkZWZhdWx0XCI7XHJcbiAgICAgICAgICAgIG1lLnBlcmZvcm1MYXlvdXQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldEJ1dHRvblR5cGUoYnV0dG9uVHlwZTogc3RyaW5nKTogQmxlbmQuYnV0dG9uLkJ1dHRvbiB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLmNvbmZpZy5idXR0b25UeXBlID0gbWUuZ2V0Q2hlY2tCdXR0b25UeXBlKGJ1dHRvblR5cGUpO1xyXG4gICAgICAgICAgICBtZS5lbGVtZW50LmNsZWFyQ3NzQ2xhc3MoKS5hZGRDc3NDbGFzcyhbXCJtYi1idG5cIl0pO1xyXG4gICAgICAgICAgICBtZS5wZXJmb3JtTGF5b3V0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRUZXh0KHRleHQ6IHN0cmluZyk6IEJsZW5kLmJ1dHRvbi5CdXR0b24ge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS5jb25maWcudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgICAgIG1lLnRleHRFbGVtZW50LnNldEh0bWwodGV4dCk7XHJcbiAgICAgICAgICAgIG1lLnBlcmZvcm1MYXlvdXQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0SWNvblNpemUoaWNvblNpemU6IHN0cmluZyk6IEJsZW5kLmJ1dHRvbi5CdXR0b24ge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgc2l6ZUNzcyA9IFwibWItYnRuLWljb24tc2l6ZVwiO1xyXG4gICAgICAgICAgICBtZS5jb25maWcuaWNvblNpemUgPSBtZS5nZXRDaGVjbEljb25TaXplKGljb25TaXplKTtcclxuICAgICAgICAgICAgbWUuZWxlbWVudC5yZW1vdmVDc3NDbGFzc0xpa2UoW3NpemVDc3NdKTtcclxuICAgICAgICAgICAgaWYgKGljb25TaXplICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBtZS5lbGVtZW50LmFkZENzc0NsYXNzKFtgJHtzaXplQ3NzfS1gICsgbWUuY29uZmlnLmljb25TaXplXSk7XHJcbiAgICAgICAgICAgICAgICBtZS5wZXJmb3JtTGF5b3V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldEljb24oaWNvbjogc3RyaW5nKTogQmxlbmQuYnV0dG9uLkJ1dHRvbiB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLmNvbmZpZy5pY29uID0gaWNvbjtcclxuICAgICAgICAgICAgbWUuaWNvbkVsZW1lbnQuc2V0SHRtbChpY29uKTtcclxuICAgICAgICAgICAgbWUucGVyZm9ybUxheW91dCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRGYWJQb3NpdGlvbihmYWJQb3NpdGlvbjogc3RyaW5nKTogQmxlbmQuYnV0dG9uLkJ1dHRvbiB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBwb3NDc3MgPSBgbWItJHttZS5jb25maWcuYnV0dG9uVHlwZX0tcG9zYDtcclxuICAgICAgICAgICAgaWYgKG1lLmlzRmFiKCkpIHtcclxuICAgICAgICAgICAgICAgIG1lLmNvbmZpZy5mYWJQb3NpdGlvbiA9IG1lLmdldENoZWNrRmFiUG9zaXRpb24oZmFiUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgbWUuZWxlbWVudC5yZW1vdmVDc3NDbGFzc0xpa2UoW3Bvc0Nzc10pO1xyXG4gICAgICAgICAgICAgICAgbWUuZWxlbWVudC5hZGRDc3NDbGFzcyhbYCR7cG9zQ3NzfS1gICsgbWUuY29uZmlnLmZhYlBvc2l0aW9uXSk7XHJcbiAgICAgICAgICAgICAgICBtZS5wZXJmb3JtTGF5b3V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdXBkYXRlTGF5b3V0KCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgdGhlbWVDbHM6IHN0cmluZyA9IGBidG4tdGhlbWUtJHttZS5jb25maWcuYnV0dG9uVHlwZX0tJHttZS5jb25maWcudGhlbWV9YCxcclxuICAgICAgICAgICAgICAgIGJvdGhDbHM6IHN0cmluZyA9IGBtYi1idG4tJHttZS5jb25maWcuYnV0dG9uVHlwZX0tYm90aGAsXHJcbiAgICAgICAgICAgICAgICB0ZXh0T25seUNsczogc3RyaW5nID0gYG1iLWJ0bi0ke21lLmNvbmZpZy5idXR0b25UeXBlfS10ZXh0LW9ubHlgLFxyXG4gICAgICAgICAgICAgICAgaWNvbk9ubHlDbHM6IHN0cmluZyA9IGBtYi1idG4tJHttZS5jb25maWcuYnV0dG9uVHlwZX0taWNvbi1vbmx5YCxcclxuICAgICAgICAgICAgICAgIHRleHRJY29uQ2xzOiBzdHJpbmcgPSBcIm1iLWJ0bi1pbm5lci10ZXh0aWNvblwiLFxyXG4gICAgICAgICAgICAgICAgaWNvblRleHRDbHM6IHN0cmluZyA9IFwibWItYnRuLWlubmVyLWljb250ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBoYXNJY29uOiBib29sZWFuID0gbWUuY29uZmlnLmljb24gIT09IG51bGwsXHJcbiAgICAgICAgICAgICAgICBoYXNUZXh0OiBib29sZWFuID0gKG1lLmNvbmZpZy50ZXh0IHx8IFwiXCIpLnRyaW0oKSAhPT0gXCJcIixcclxuICAgICAgICAgICAgICAgIHJvdW5kT3JGYWJCdXR0b246IGJvb2xlYW4gPSBtZS5jb25maWcuYnV0dG9uVHlwZS5pbmRleE9mKFwicm91bmRcIikgIT09IC0xIHx8IG1lLmNvbmZpZy5idXR0b25UeXBlLmluZGV4T2YoXCJmYWJcIikgIT09IC0xO1xyXG5cclxuICAgICAgICAgICAgbWUuZWxlbWVudC5yZW1vdmVDc3NDbGFzcyhbdGV4dE9ubHlDbHMsIGljb25Pbmx5Q2xzLCBib3RoQ2xzLCB0aGVtZUNsc10pO1xyXG4gICAgICAgICAgICBtZS53cmFwcGVyRWxlbWVudC5yZW1vdmVDc3NDbGFzcyhbdGV4dEljb25DbHMsIGljb25UZXh0Q2xzXSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWUuaXNGYWIoKSB8fCBtZS5pc1JvdW5kKCkpIHtcclxuICAgICAgICAgICAgICAgIGhhc1RleHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICghaGFzSWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0ljb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lLnNldEljb24oXCJtb29kXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1lLmNvbmZpZy5mYWJQb3NpdGlvbiAmJiBtZS5pc0ZhYigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWUuc2V0RmFiUG9zaXRpb24obWUuY29uZmlnLmZhYlBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtZS5pc1JvdW5kKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZS5zZXRJY29uU2l6ZShtZS5jb25maWcuaWNvblNpemUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWUuc2V0SWNvblNpemUobWUuY29uZmlnLmljb25TaXplKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhhc1RleHQgJiYgaGFzSWNvbikge1xyXG4gICAgICAgICAgICAgICAgbWUuZWxlbWVudC5hZGRDc3NDbGFzcyhbYm90aENsc10pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lLmNvbmZpZy5pY29uQWxpZ24gPT09IFwibGVmdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWUud3JhcHBlckVsZW1lbnQuYWRkQ3NzQ2xhc3MoaWNvblRleHRDbHMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtZS5jb25maWcuaWNvbkFsaWduID09PSBcInJpZ2h0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZS53cmFwcGVyRWxlbWVudC5hZGRDc3NDbGFzcyh0ZXh0SWNvbkNscyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgbWUuZWxlbWVudC5hZGRDc3NDbGFzcyhbdGV4dE9ubHlDbHNdKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNJY29uKSB7XHJcbiAgICAgICAgICAgICAgICBtZS5lbGVtZW50LmFkZENzc0NsYXNzKFtpY29uT25seUNsc10pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZS5lbGVtZW50LmFkZENzc0NsYXNzKFt0aGVtZUNsc10pO1xyXG4gICAgICAgICAgICBtZS5zZXRTdGF0ZSghbWUuY29uZmlnLmRpc2FibGVkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtZS5jb25maWcucmlwcGxlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBtZS5yaXBwbGVFZmZlY3QgPSBudWxsOyAvLyByZW1vdmUgdGhlIG9sZCBvbmUhXHJcbiAgICAgICAgICAgICAgICBtZS5yaXBwbGVFZmZlY3QgPSBuZXcgQmxlbmQubWF0ZXJpYWwuZWZmZWN0LlJpcHBsZSg8UmlwcGxlSW50ZXJmYWNlPntcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBtZS5lbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlcjogcm91bmRPckZhYkJ1dHRvbiA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogcm91bmRPckZhYkJ1dHRvbiA/IG1lLmljb25FbGVtZW50IDogbWUudGV4dEVsZW1lbnRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgbm90aWZ5Q2xpY2soZXZ0OiBFdmVudCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS5maXJlRXZlbnQoXCJjbGlja1wiLCBldnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGluaXRFdmVudHMoKSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1lLm5vdGlmeUNsaWNrLmJpbmQobWUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENoZWNrIGlmIHRoaXMgYnV0dG9uIGlzIGEgRmxvYXRpbmcgQWN0aW9uIEJ1dHRvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBpc0ZhYigpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmJ1dHRvblR5cGUuaW5kZXhPZihcImZhYlwiKSAhPT0gLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDaGVjayBpZiB0aGlzIGJ1dHRvbiBpcyBlaXRoZXIgYSByb3VuZC1mbGF0IG9yIHJvdW5kLXJhaXNlZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBpc1JvdW5kKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuYnV0dG9uVHlwZS5pbmRleE9mKFwicm91bmRcIikgIT09IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlbmRlcigpOiBCbGVuZC5kb20uRWxlbWVudCB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgYnV0dG9uRWwgPSBuZXcgQmxlbmQuZG9tLkVsZW1lbnRDb25maWdCdWlsZGVyKFwiYnV0dG9uXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ1NTKFtcIm1iLWJ0blwiXSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5uZXJFbCA9IG5ldyBCbGVuZC5kb20uRWxlbWVudENvbmZpZ0J1aWxkZXIoXCJzcGFuXCIpXHJcbiAgICAgICAgICAgICAgICAuc2V0T0lEKFwid3JhcHBlckVsZW1lbnRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRDU1MoW1wibWItYnRuLWlubmVyXCJdKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0eHRFbCA9IG5ldyBCbGVuZC5kb20uRWxlbWVudENvbmZpZ0J1aWxkZXIoXCJzcGFuXCIpXHJcbiAgICAgICAgICAgICAgICAuc2V0T0lEKFwidGV4dEVsZW1lbnRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRDU1MoW1wibWItYnRuLXRleHRcIl0pXHJcbiAgICAgICAgICAgICAgICAuc2V0VGV4dChtZS5jb25maWcudGV4dCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaWNvbkVsID0gbmV3IEJsZW5kLmRvbS5FbGVtZW50Q29uZmlnQnVpbGRlcihcImlcIilcclxuICAgICAgICAgICAgICAgIC5zZXRPSUQoXCJpY29uRWxlbWVudFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZENTUyhbXCJtYi1idG4taWNvblwiLCBtZS5jb25maWcuaWNvbkZhbWlseV0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1lLmNvbmZpZy5pY29uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpY29uRWwuc2V0VGV4dChtZS5jb25maWcuaWNvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1lLmNvbmZpZy5pY29uQWxpZ24gPT09IFwibGVmdFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpbm5lckVsLmFkZENoaWxkKGljb25FbCk7XHJcbiAgICAgICAgICAgICAgICBpbm5lckVsLmFkZENoaWxkKHR4dEVsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1lLmNvbmZpZy5pY29uQWxpZ24gPT09IFwicmlnaHRcIikge1xyXG4gICAgICAgICAgICAgICAgaW5uZXJFbC5hZGRDaGlsZCh0eHRFbCk7XHJcbiAgICAgICAgICAgICAgICBpbm5lckVsLmFkZENoaWxkKGljb25FbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJ1dHRvbkVsLmFkZENoaWxkKGlubmVyRWwpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEJsZW5kLmRvbS5FbGVtZW50LmNyZWF0ZShidXR0b25FbCwgbWUuYXNzaWduRWxlbWVudEJ5T0lELCBtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYgVHJ1ZVNvZnR3YXJlIEIuVi4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tYXRlcmlhbC9NYXRlcmlhbC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb20vRWxlbWVudC50c1wiIC8+XHJcblxyXG5uYW1lc3BhY2UgQmxlbmQuY29udGFpbmVyIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgQmxlbmQubWF0ZXJpYWwuTWF0ZXJpYWwge1xyXG5cclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxNiBUcnVlU29mdHdhcmUgQi5WLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2VcclxuICogSW50ZXJmYWNlIGZvciBpbXBsZW1lbnRpbmcgYSBsb2dnZXIgY29tcG9uZW50XHJcbiAqL1xyXG5pbnRlcmZhY2UgTG9nZ2VySW50ZXJmYWNlIHtcclxuXHJcbiAgICBvcGVuKCk6IGFueTtcclxuXHJcbiAgICBjbG9zZSgpOiBhbnk7XHJcblxyXG4gICAgbG9nKHR5cGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb250ZXh0PzogYW55KTogYW55O1xyXG5cclxuICAgIHdhcm4obWVzc2FnZTogc3RyaW5nLCBjb250ZXh0PzogYW55KTogYW55O1xyXG5cclxuICAgIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgY29udGV4dD86IGFueSk6IGFueTtcclxuXHJcbiAgICBpbmZvKG1lc3NhZ2U6IHN0cmluZywgY29udGV4dD86IGFueSk6IGFueTtcclxuXHJcbiAgICBkZWJ1ZyhtZXNzYWdlOiBzdHJpbmcsIGNvbnRleHQ/OiBhbnkpOiBhbnk7XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAyMDE2IFRydWVTb2Z0d2FyZSBCLlYuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vQmxlbmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTWF0ZXJpYWwudHNcIiAvPlxyXG5cclxuaW50ZXJmYWNlIFJlY3RhbmdsZUludGVyZmFjZSBleHRlbmRzIE1hdGVyaWFsSW50ZXJmYWNlIHtcclxuICAgIGNvbG9yPzogc3RyaW5nO1xyXG4gICAgYm9yZGVyPzogYm9vbGVhbjtcclxufVxyXG5cclxubmFtZXNwYWNlIEJsZW5kLm1hdGVyaWFsIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgQmxlbmQubWF0ZXJpYWwuTWF0ZXJpYWwge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY29uZmlnOiBSZWN0YW5nbGVJbnRlcmZhY2U7XHJcbiAgICAgICAgcHJpdmF0ZSBsYXlvdXRDb3VudDogbnVtYmVyO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb25maWc6IFJlY3RhbmdsZUludGVyZmFjZSA9IHt9KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbmZpZyk7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLnNldEJvdW5kcyh7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogY29uZmlnLndpZHRoIHx8IDEwMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogY29uZmlnLmhlaWdodCB8fCAxMDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1lLnNldFN0eWxlKHtcclxuICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBjb25maWcuY29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiLFxyXG4gICAgICAgICAgICAgICAgXCJib3JkZXJcIjogY29uZmlnLmJvcmRlciA9PT0gdHJ1ZSA/IFwiMXB4IHNvbGlkICMwMDBcIiA6IG51bGxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1lLmxheW91dENvdW50ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBsYXlvdXRWaWV3KCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBtZS5sYXlvdXRDb3VudCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGZpbmFsaXplUmVuZGVyKCkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBzdXBlci5maW5hbGl6ZVJlbmRlcigpO1xyXG4gICAgICAgICAgICBtZS5hZGRDc3NDbGFzcyhcIm0tcmVjdGFuZ2xlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsb2coKSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1lLmVsZW1lbnQuc2V0SHRtbChgPHByZT5MYXlvdXRzOiAke21lLmxheW91dENvdW50fTwvcHJlPmApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWdpc3RlckNsYXNzV2l0aEFsaWFzKFwibWIucmVjdFwiLCBCbGVuZC5tYXRlcmlhbC5SZWN0YW5nbGUpO1xyXG59IiwiLyoqXHJcbiAqIENvcHlyaWdodCAyMDE2IFRydWVTb2Z0d2FyZSBCLlYuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vVHlwaW5ncy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9Db21wb25lbnQudHNcIiAvPlxyXG5cclxubmFtZXNwYWNlIEJsZW5kLm12YyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhIGdlbmVyaWMgYW5kIGJpbmRhYmxlIE1vZGVsXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBNb2RlbCBleHRlbmRzIEJsZW5kLkNvbXBvbmVudCB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBkYXRhOiBEaWN0aW9uYXJ5SW50ZXJmYWNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBEaWN0aW9uYXJ5SW50ZXJmYWNlID0ge30pIHtcclxuICAgICAgICAgICAgc3VwZXIoY29uZmlnKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gY29uZmlnO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVByb3BlcnRpZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogU2V0cyB0aGUgdmFsdWVzIG9mIHRoZSBmaWVsZHMgaW4gdGhpcyBNb2RlbC4gVGhpcyBhY3Rpb24gdHJpZ2dlcnNcclxuICAgICAgICAqIGFsbCB0aGUgaGFuZGxlcnMgZm9yIGJvdW5kIFZpZXcgc2V0dGVyc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNldERhdGEoZGF0YTogRGljdGlvbmFyeUludGVyZmFjZSkge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgc25hbWU6IHN0cmluZztcclxuICAgICAgICAgICAgQmxlbmQuZm9yRWFjaChkYXRhLCBmdW5jdGlvbih2YWx1ZTogc3RyaW5nLCBuYW1lOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIHNuYW1lID0gXCJzZXRcIiArIG5hbWUudWNmaXJzdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lLmhhc0Z1bmN0aW9uKHNuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lLmFwcGx5RnVuY3Rpb24oc25hbWUsIFt2YWx1ZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIGN1cnJlbnQgZGF0YSBpbiB0aGlzIE1vZGVsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldERhdGEoKTogRGljdGlvbmFyeUludGVyZmFjZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGF1dG9tYXRpYyBwcm9wZXJ0aWVzIGZvciB0aGlzIE1vZGVsIHdoZW4gdGhlcmUgYXJlIG5vXHJcbiAgICAgICAgICogY3VzdG9tIGdldHRlcnMvc2V0dGVycyBhdmFpbGFibGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVByb3BlcnRpZXMoKSB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBzbmFtZTogc3RyaW5nLCBnbmFtZTogc3RyaW5nO1xyXG4gICAgICAgICAgICBCbGVuZC5mb3JFYWNoKG1lLmRhdGEsIGZ1bmN0aW9uKHZhbHVlOiBhbnksIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgZ25hbWUgPSBcImdldFwiICsgbmFtZS51Y2ZpcnN0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgc25hbWUgPSBcInNldFwiICsgbmFtZS51Y2ZpcnN0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1lLmhhc0Z1bmN0aW9uKGduYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICg8YW55Pm1lKVtnbmFtZV0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lLmRhdGFbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghbWUuaGFzRnVuY3Rpb24oc25hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+bWUpW3NuYW1lXSA9IGZ1bmN0aW9uKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZS5kYXRhW25hbWVdID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxNiBUcnVlU29mdHdhcmUgQi5WLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2FwcGxpY2F0aW9uL0FwcGxpY2F0aW9uLnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBCbGVuZC53ZWIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBCYXNlIGNsYXNzIGZvciBhIHdlYi9kZXNrdG9wIGFwcGxpY2F0aW9uXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIEJsZW5kLmFwcGxpY2F0aW9uLkFwcGxpY2F0aW9uIHtcclxuICAgIH1cclxufSJdfQ==