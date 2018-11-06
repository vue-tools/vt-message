function plugin(Vue, Msg) {
    let Component, component, container, props

    props = {
        title: null,
        text: null,
        done: null,
        button: '确定',
        cancel: null,
        inline: false,
        show: false,
        tapMaskClose: false
    }

    Component = Vue.extend({
        props: {
            options: {
                type: Object,
                default () {
                    return props
                }
            }
        },
        render(createElement) {
            let children = []

            if (this.options.title) {
                children.push(createElement('div', {
                    slot: 'title',
                    domProps: {
                        innerHTML: this.options.title
                    }
                }))
            }

            if (this.options.text) {
                children.push(createElement('div', {
                    domProps: {
                        innerHTML: this.options.text
                    }
                }))
            }

            if (this.options.cancel) {
                children.push(createElement('div', {
                    slot: 'cancel',
                    domProps: {
                        innerHTML: this.options.cancel
                    }
                }))
            }

            if (this.options.button) {
                children.push(createElement('div', {
                    slot: 'button',
                    domProps: {
                        innerHTML: this.options.button
                    }
                }))
            }

            return createElement(Msg, {
                attrs: {
                    name: 'component_message_plugin'
                },
                props: {
                    show: this.options.show,
                    inline: this.options.inline
                },
                on: {
                    done: function (result, target) {
                        if (target=='button') {
                            this.options.show = false
                            this.options.done && this.options.done(result)
                            this.$emit("done", result)
                        } else if (this.options.tapMaskClose) {
                            this.options.show = false
                            this.options.done && this.options.done(result)
                            this.$emit("done", result)
                        }
                    }.bind(this)
                }
            }, children)
        }
    })

    container = document.createElement('div')
    document.getElementsByTagName('body')[0].appendChild(container)
    component = new Component().$mount(container)

    function method() {
        let opts = null
        if (arguments.length == 1) {
            if (typeof arguments[0] == 'object') {
                opts = Object.assign(props, arguments[0], {show: true})
            } else if (typeof arguments[0] == 'string') {
                opts = Object.assign(props, {text: arguments[0]}, {show: true})
            } else {
                throw new Error("[plugin message] params error")
            }
        } else if (arguments.length == 2 && typeof arguments[0] == 'string' && typeof arguments[1] == 'string') {
            opts = Object.assign(props, {title: arguments[0], text: arguments[1]}, {show: true})
        } else {
            throw new Error("[plugin message] params error")
        }
        component.options = opts
        if (typeof opts.done != 'function') {
            return new Promise((rev, rej)=> {
                component.$on("done", result=> {
                    result ? rev() : rej()
                })
            })
        }
    }

    Vue.Message = method
    Vue.prototype.$message = method
}

module.exports = plugin