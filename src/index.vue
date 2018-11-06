<style>
    .msg-warp {
        background: rgba(0, 0, 0, 0.60);
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .msg-dialog {
        width: 560px;
        background: #FFFFFF;
        box-sizing: border-box;
    }

    .msg-dialog__title {
        height: 120px;
        border-bottom: 1px solid #F7F7F7; /*no*/
        font-size: 32px;
        line-height: 120px;
        color: #2B2B2B;
        letter-spacing: 0;
        text-align: center;
    }

    .msg-dialog__text {
        padding: 60px 41px;
        font-size: 24px;
        line-height: 34px;
        color: #2B2B2B;
    }

    .msg-dialog__buttons {
        padding: 0 28px 52px 28px;
        display: flex;
        flex-direction: column;
    }

    .msg-dialog__button {
        width: 100%;
        height: 88px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        line-height: 44px;
        border-radius: 8px;
        box-sizing: border-box;
        margin-top: 22px;
    }

    .msg-dialog__button--active {
        opacity: 0.85;
    }

    .msg-dialog__button--done {
        background-image: linear-gradient(-45deg, #01BBFA 0%, #007CFF 100%);
        color: #FFFFFF;
    }

    .msg-dialog__button--cancel {
        border: 1px solid #007CFF;
        color: #007CFF;
    }

    .msg-dialog__buttons--inline {
        flex-direction: row;
        justify-content: space-between;
        padding-left: 78px;
        padding-right: 78px;
    }

    .msg-dialog__buttons--inline .msg-dialog__button {
        width: 178.6px;
        height: 64.6px;
        font-size: 28px;
    }

    .msg-enter-active {
        animation: msg-show 0.4s;
    }

    @keyframes msg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .msg-leave-active {
        opacity: 0;
        transition: opacity .4s;
    }
</style>

<script>
    import plugin from './plugin'
    import Vue from 'vue'

    const Msg = {
        data(){
            return {}
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            inline: {
                type: Boolean,
                default: false
            },
            title: {
                type: [String, Object],
                default: null
            },
            text: {
                type: [String, Object],
                default: null
            },
            cancel: {
                type: [String, Object],
                default: null
            },
            button: {
                type: [String, Object],
                default: '确定'
            }
        },
        render(h) {
            let title = null, button = null, cancelButton = null
            if (this.$slots.title || this.title) {
                title = <div class="msg-dialog__title">{this.$slots.title || this.title}</div>
            }
            if (this.$slots.cancel || this.cancel) {
                cancelButton = <div class="msg-dialog__button msg-dialog__button--cancel"
                                    onTouchstart={this.changeBg.bind(this)}
                                    onClick={this.fnDone.bind(this,false,'button')}>
                    {this.$slots.cancel || this.cancel}
                </div>
            }
            if (this.$slots.button || this.button) {
                button = <div class="msg-dialog__button msg-dialog__button--done"
                              onTouchstart={this.changeBg.bind(this)} onClick={this.fnDone.bind(this,true,'button')}>
                    {this.$slots.button || this.button}
                </div>
            }
            return (<transition name="msg">
                <div class="msg-warp" v-show={this.show} onClick={this.fnDone.bind(this,false,'mask')}>
                    <div class="msg-dialog" onClick={this.stop}>
                        {title}
                        <div class="msg-dialog__text">{this.$slots.default || this.text}</div>
                        <div class={{'msg-dialog__buttons':true,'msg-dialog__buttons--inline':this.inline&&cancelButton}}>
                            {cancelButton}
                            {button}
                        </div>
                    </div>
                </div>
            </transition>)
        },
        methods: {
            changeBg(e){
                if (e && e.target.className.indexOf('msg-dialog__button') > -1) {
                    if (!e.target.classList.contains('msg-dialog__button--active')) {
                        e.target.classList.add('msg-dialog__button--active')

                        setTimeout(()=> {
                            e.target.classList.remove('msg-dialog__button--active')
                        }, 200)
                    }
                }
            },
            fnDone(result, target){
                this.$emit("done", result, target)
            },
            stop(e){
                e.stopPropagation()
            }
        },
        mounted(){
        },
        components: {},
        filters: {}
    }

    Vue.use(plugin, Msg)

    export default Msg
</script>