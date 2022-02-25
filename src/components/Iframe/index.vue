<script>
/* eslint-disable */
import { generateUUID, debounce } from '@/utils'

export default {
  name: 'app-iframe',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    src: {
      type: String,
      required: true
    },
    crossorigin: {
      type: String,
      default: 'anonymous'
    },
    target: {
      type: String,
      default: '_parent'
    },
    className: String,
    allow: String,
    name: String,
    title: String,
    sandbox: String
  },
  data() {
    return {
      iframeEl: null,
      iframeLoadedMessage: `IFRAME_LOADED_${generateUUID()}`,
      iframeOnReadyStateChangeMessage: `IFRAME_ON_READ_STATE_CHANGE_${generateUUID()}`
    };
  },
  watch: {
    src() {
      this.reinitIframe(this);
    }
  },
  methods: {
    removeIframe() {
      while (this.$el.firstChild) {
        this.$el.removeChild(this.$el.firstChild);
      }
    },
    setIframeUrl() {
      if (this.iframeEl.contentWindow === null) {
        setTimeout(this.setIframeUrl)
        return;
      }
      const iframeDoc = this.iframeEl.contentWindow.document;
      iframeDoc.open()
        .write(
          `
          <body onload="window.location.replace('${this.src}'); parent.postMessage('${this.iframeLoadedMessage}', '*')"></body>
          <script>
            window.document.onreadystatechange = function () {
              if (window.document.readyState === 'complete') {
                parent.postMessage('${this.iframeOnReadyStateChangeMessage}', '*')
              }
            };
          <\/script>
          `
        );
      iframeDoc.close(); //iframe onload event happens
    },
    reinitIframe: debounce(vm => {
      vm.removeIframe();
      vm.initIframe();
    }, 200),
    initIframe() {
      this.iframeEl = document.createElement('iframe');
      this.iframeEl.setAttribute('style', 'visibility: hidden; position: absolute; top: -99999px; border: none;');
      if (this.src) this.iframeEl.setAttribute('iframe-src', this.src);
      if (this.className) this.iframeEl.setAttribute('class', this.className);
      if (this.class) this.iframeEl.setAttribute('class', this.class);
      if (this.crossorigin) this.iframeEl.setAttribute('crossorigin', this.crossorigin);
      if (this.target) this.iframeEl.setAttribute('target', this.target);
      if (this.allow) this.iframeEl.setAttribute('allow', this.allow);
      if (this.name) this.iframeEl.setAttribute('name', this.name);
      if (this.title) this.iframeEl.setAttribute('title', this.title);
      if (this.sandbox) this.iframeEl.setAttribute('sandbox', this.sandbox);
      this.$el.appendChild(this.iframeEl);
      this.setIframeUrl();
    },
    listenForEvents() {
      // Create IE + others compatible event handler
      const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
      const eventer = window[eventMethod];
      const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
      // Listen to message from child window
      eventer(messageEvent, event => {
        if (event.data === this.iframeLoadedMessage) {
          this.$emit('iframe-load');
          this.iframeEl.setAttribute('style', 'visibility: visible; border: none; width: 100%; height: 100%');
        }
        if (event.data === this.iframeOnReadyStateChangeMessage) {
          this.$emit('load');
        }
      }, false);
    }
  },
  mounted() {
    this.listenForEvents();
    this.initIframe();
  },
  render() {
    const { width, height } = this
    return (<div class="vue-iframe" style={{ width, height }}></div>)
  }
}
</script>
