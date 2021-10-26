<template>
  <transition name="cool-lightbox-modal">
    <div class="cool-lightbox" 
      v-bind:class="lightboxClasses"
      v-if="isVisible" 
      ref="coolLightbox"
      @click="closeModal"
      v-bind:style="lightboxStyles">
      <!-- 缩略图列表 -->
      <div v-if="gallery" class="cool-lightbox-thumbs">
        <div class="cool-lightbox-thumbs__list">
          <button 
            type="button"
            v-for="(item, itemIndex) in items"
            :key="itemIndex"
            :class="{ 
              active: itemIndex === imgIndex,
              'is-video': ['video', 'webVideo'].includes(getMediaType(itemIndex))
            }"
            @click="imgIndex = itemIndex"
            class="cool-lightbox__thumb">

            <svg v-if="['video', 'webVideo'].includes(getMediaType(itemIndex))" class="cool-lightbox__thumb__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M6.5 5.4v13.2l11-6.6z"></path>
            </svg>

            <img :src="getItemThumb(itemIndex)" alt="" />
          </button>
        </div>
      </div>
      <!--/cool-lightbox-thumbs-->

      <div 
        class="cool-lightbox__inner" 
        :style="innerStyles"

        @mousedown="startSwipe" 
        @mousemove="continueSwipe"
        @mouseup="endSwipe"
        @touchstart="startSwipe"
        @touchmove="continueSwipe"
        @touchend="endSwipe">

        <div class="cool-lightbox__progressbar" :style="stylesInterval"></div>
        <!-- 导航 pref/next -->
        <div class="cool-lightbox__navigation">
          <button type="button" class="cool-lightbox-button cool-lightbox-button--prev" title="Previous" :class="buttonsClasses" v-show="(hasPreviousButton || loopData) && items.length > 1" @click="onPrevClick">
            <slot name="icon-previous">
              <div class="cool-lightbox-button__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"></path></svg>
              </div>
            </slot>
          </button>

          <button type="button" class="cool-lightbox-button cool-lightbox-button--next" title="Next" :class="buttonsClasses" v-show="(hasNextButton || loopData) && items.length > 1" @click="onNextClick(false)">
            <slot name="icon-next">
              <div class="cool-lightbox-button__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"></path></svg>
              </div>
            </slot>
          </button>
        </div>
        <!--/cool-lightbox__navigation-->

        <!-- 主体区域 -->
        <div class="cool-lightbox__wrapper">
          <div ref="items" class="cool-lightbox__slide cool-lightbox__slide--current">
            <transition name="cool-lightbox-slide-change" mode="out-in">
              <div v-if="getMediaType(imgIndex) === 'image'" key="image" :style="imgWrapperStyle" class="cool-lightbox__slide__img">
                <transition v-if="!isItemPicture(imgIndex)" name="cool-lightbox-slide-change" mode="out-in">
                  <img
                    :src="currentItem.src"
                    :srcset="currentItem.srcset"
                    :sizes="currentItem.sizes"
                    :key="imgIndex"
                    draggable="false"
                    :alt="currentItem.alt"

                    @load="imageLoaded"
                    @click="zoomImage"
                    @mousedown="handleMouseDown($event)"
                    @mouseup="handleMouseUp($event)"
                    @mousemove="handleMouseMove($event)"
                  />
                </transition>
                <transition v-else name="cool-lightbox-slide-change" mode="out-in">
                  <picture :key="imgIndex">
                    <source
                      v-for="(source, sourceIndex) in getPictureSources(imgIndex)"
                      :srcset="source.srcset"
                      :type="source.type"
                      :media="source.media"
                      :sizes="source.sizes || currentItem.sizes"
                      :key="`source-${imgIndex}-${sourceIndex}`"
                    >
                    <img
                      :src="currentItem.src"
                      :srcset="currentItem.srcset"
                      :sizes="currentItem.sizes"
                      draggable="false"
                      :alt="currentItem.alt"

                      @load="imageLoaded"
                      @click="zoomImage(imgIndex)"
                      @mousedown="handleMouseDown($event)"
                      @mouseup="handleMouseUp($event)"
                      @mousemove="handleMouseMove($event)"
                    />
                  </picture>
                </transition>

                
                <div v-show="imageLoading" class="cool-lightbox-loading-wrapper">
                  <slot name="loading">
                    <div class="cool-lightbox-loading"></div>
                  </slot>
                </div>
                <!--/loading-wrapper-->
              </div>
              <!--/imgs-slide-->
            
              <div v-else key="video" class="cool-lightbox__iframe">
                <transition name="cool-lightbox-slide-change" mode="out-in">
                  <iframe
                    v-if="(getMediaType(imgIndex) === 'iframe')"
                    class="cool-lightbox-pdf" 
                    :src="currentItem.src"
                    :key="currentItem.src" 
                    frameborder="0" 
                    allowfullscreen>
                  </iframe>
                  <template v-else>
                    <iframe
                      class="cool-lightbox-video" 
                      v-autoplay
                      :data-autoplay="setAutoplay(imgIndex)"
                      :src="currentItem.src" 
                      v-if="!checkIsMp4(imgIndex) && getMediaType(imgIndex) === 'video'" 
                      :style="aspectRatioVideo" 
                      :key="currentItem.src" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
                    </iframe>

                    <video class="cool-lightbox-video"
                      v-if="checkIsMp4(imgIndex) || getMediaType(imgIndex) === 'webVideo'" 
                      v-autoplay
                      :data-autoplay="setAutoplay(imgIndex)"
                      :style="aspectRatioVideo" :key="checkIsMp4(imgIndex)" 
                      controls="" 
                      controlslist="nodownload" 
                      poster="">
                      <source :src="checkIsMp4(imgIndex)" :type="videoSourceType(imgIndex)">
                      Sorry, your browser doesn't support embedded videos
                    </video> 
                  </template>
                </transition>
              </div>
              <!--/cool-lightbox__iframe-->

            </transition>
          </div>
          <!--/cool-lightbox__slide-->
        </div>
        <!--/cool-lightbox__wrapper-->

        <!-- 标题/描述 -->
        <transition name="cool-lightbox-modal">
          <div v-show="currentItem.title || currentItem.description" key="caption-block" class="cool-lightbox-caption">
            <transition name="cool-lightbox-slide-change" mode="out-in">
              <h6 v-if="currentItem.title" key="title" v-html="currentItem.title"></h6>
            </transition>

            <transition name="cool-lightbox-slide-change" mode="out-in">
              <p v-if="currentItem.description" key="description" v-html="currentItem.description"></p>
            </transition>
          </div>
          <!--/cool-lightbox-caption-->
        </transition>
        <!-- 工具栏 -->
        <div class="cool-lightbox-toolbar" :class="buttonsClasses">
          
          <button type="button" v-if="this.slideshow && items.length > 1" title="Play slideshow" class="cool-lightbox-toolbar__btn" @click="togglePlaySlideshow">
            <svg xmlns="http://www.w3.org/2000/svg" v-if="!isPlayingSlideShow" viewBox="0 0 24 24">
              <path d="M6.5 5.4v13.2l11-6.6z"></path>
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg">
              <g>
                <rect id="svg_4" height="11.97529" width="11.728392" y="6.030873" x="6.259265" stroke-width="1.5" stroke="#000" fill="#000000"/>
              </g>
            </svg>
          </button>

          <button type="button" @click="showThumbs = !showThumbs" title="Show thumbnails" v-if="items.length > 1 && gallery" class="cool-lightbox-toolbar__btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 
              0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 
              0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 
              0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z">
              </path>
            </svg>
          </button>
          
          <button type="button" v-if="fullScreen" @click="toggleFullScreenMode" class="cool-lightbox-toolbar__btn" title="Fullscreen">
            <svg width="20px" height="20px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z"></path>
            </svg>
          </button>

          <button type="button" v-if="showCloseButton" class="cool-lightbox-toolbar__btn" title="Close" @click="close">
            <slot name="close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"></path>
              </svg>
            </slot>
          </button>
        </div>
        <!--/cool-lightbox--toolbar-->
      </div>
      <!--/cool-lightbox-inner-->
      
      <!-- 缩放区域 -->
      <transition name="cool-lightbox-modal">
        <div v-if="isZooming && useZoomBar" class="cool-lightbox-zoom">
          <svg height="469pt" class="cool-lightbox-zoom__icon" viewBox="0 -192 469.33333 469" width="469pt" 
            xmlns="http://www.w3.org/2000/svg"><path d="m437.332031.167969h-405.332031c-17.664062 
            0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 
            32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0"/>
          </svg>
          <input type="range" v-model="zoomBar" name="points" min="0" max="50" />
          <svg height="426.66667pt" class="cool-lightbox-zoom__icon" viewBox="0 0 426.66667 426.66667" width="426.66667pt" xmlns="http://www.w3.org/2000/svg">
            <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 
            9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 
            11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 
            21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 
            21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"/>
          </svg>
        </div>
      </transition>

    </div>
    <!--/cool-lightbox-->
  </transition>
  <!--/transition-->
</template>

<script>
// import './index.scss'
/* eslint-disable */
import AutoplayVideo from "./autoplay";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import {
  fullScreenMode,
  closeFullscreen,
  isObject,
  isVideo,
  isYoutube,
  isVimeo,
  getVimeoUrl,
  getYoutubeUrl,
  getYoutubeThumb,
  fileSuffix,
  videoSourceType
} from './utils'

export default {
  directives: {
    autoplay: AutoplayVideo,
  },
  props: {
    index: {
      required: true
    },
    items: {
      type: Array,
      required: true,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    slideshow: {
      type: Boolean,
      default: true,
    },
    slideshowColorBar: {
      type: String,
      default: '#fa4242',
    },
    slideshowDuration: {
      type: Number,
      default: 3000,
    },
    useZoomBar: Boolean,
    closeOnClickOutsideMobile: Boolean,
    srcName: {
      type: String,
      default: 'src',
    },
    srcThumb: {
      type: String,
      default: 'thumb',
    },
    srcMediaType: {
      type: String,
      default: 'type',
    },
    overlayColor: {
      type: String,
      default: 'rgba(30, 30, 30, .79)'
    },
    zIndex: {
      type: Number,
      default: 9999,
    },
    gallery: Boolean,
    fullScreen: Boolean,
    thumbsPosition: {
      type: String,
      default: 'right',
    },
    youtubeCookies: {
      type: Boolean,
      default: true,
    },
    enableWheelEvent: Boolean,
    showCloseButton: {
      type: Boolean,
      default: true,
    },
    disableZoom: Boolean,
    enableScrollLock: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // swipe data
      initialMouseX: 0,
      initialMouseY: 0,
      endMouseX: 0,
      endMouseY: 0,
      swipeType: null,
      IsSwipping: false,
      isDraggingSwipe: false,

      // use for mouse wheel
      prevTime: 0,

      // swipe effect
      xSwipeWrapper: 0,
      ySwipeWrapper: 0,
      swipeAnimation: null,
      swipeInterval: null,
      lightboxInnerWidth: null,

      // styles data
      imgIndex: this.index,
      isVisible: false,
      paddingBottom: false,
      imageLoading: false,
      showThumbs: false,
      isFullScreenMode: false,

      // aspect ratio videos
      aspectRatioVideo: {
        width: 'auto',
        height: 'auto',
      },

      // props to bind styles
      buttonsVisible: true,
      scale: 1,
      top: 0,
      left: 0,
      lastX: 0,
      lastY: 0,
      isDraging: false,
      canZoom: true,
      isZooming: false,
      transition: 'all .3s ease',
      zoomBar: 0,

      // slideshow playing data
      isPlayingSlideShow: false,
      intervalProgress: null,
      loopData: false,
      stylesInterval: {
        'display': 'block'
      }
    };
  },
  computed: {
    // get item
    currentItem() {
      const item = this.getItem(this.imgIndex)
      if (item) {
        const videoSrc = this.getVideoUrl(this.imgIndex)
        videoSrc && (item.src = videoSrc)
        return item
      }
      return null
    },
    // Images wrapper styles to use drag and zoom
    imgWrapperStyle() {
      return {
        top: `50%`,
        left: `50%`,
        transition: this.transition,
      }
    },
    // lightbox styles
    lightboxStyles() {
      return { 
        'z-index': this.zIndex,
        'background-color': this.overlayColor,
      }
    },
    innerStyles() {
      return {
        'padding-bottom': this.paddingBottom+'px',
      }
    },
    // Lightbox classes
    lightboxClasses() {
      let classesReturn = [
        { 'cool-lightbox--can-zoom': this.canZoom && !this.disableZoom },
        { 'cool-lightbox--zoom-disabled': this.disableZoom},
        { 'cool-lightbox--is-zooming': this.isZooming },
        { 'cool-lightbox--show-thumbs': this.showThumbs },
        { 'cool-lightbox--is-swipping': this.isDraggingSwipe }
      ];

      let classString = 'cool-lightbox--thumbs-'+this.thumbsPosition
      classesReturn.push(classString)

      return classesReturn
    },
    // Buttons classes
    buttonsClasses() {
      return {
        'hidden': !this.buttonsVisible,
      }
    },
    // check if the slide has next element
    hasNextButton() {
      return (this.imgIndex + 1 < this.items.length)
    },
    // check if the slide has previous element 
    hasPreviousButton() {
      return (this.imgIndex - 1 >= 0)
    },
    // check if the slide has next element
    hasNext() {
      return (this.imgIndex + 1 < this.items.length)
    },
    // check if the slide has previous element 
    hasPrevious() {
      return (this.imgIndex - 1 >= 0)
    }
  },
  watch: {
    zoomBar(newVal, prevVal) {
      let item;
      if(this.isZooming) {
        item = this.$refs.items.childNodes[0]

        const newZoom = 1.6 + newVal/10;
        item.style.transform  = 'translate3d(calc(-50% + '+this.left+'px), calc(-50% + '+this.top+'px), 0px) scale3d('+newZoom+', '+newZoom+', '+newZoom+')';
      }
    },

    showThumbs(prev, val) {
      let widthGalleryBlock = 212;
      let swipeAnimation = 'all .3s ease'
      if(window.innerWidth < 767) {
        widthGalleryBlock = 102
        swipeAnimation = null
      }

      if (this.thumbsPosition === 'bottom') {
        widthGalleryBlock = 0;
      }

      const self = this
      this.swipeAnimation = swipeAnimation

      if(prev) {
        this.xSwipeWrapper = -this.imgIndex*(window.innerWidth - widthGalleryBlock) - 30*this.imgIndex
      } else {
        this.xSwipeWrapper = -this.imgIndex*window.innerWidth - 30*this.imgIndex
      }

      setTimeout(function() {
        self.swipeAnimation = null
      }, 300)
    },

    index(prev, val) {
      const self = this
      
      if(prev !== null) {
        // swipe type
        this.swipeType = null
        this.initialMouseY = 0
        this.ySwipeWrapper = 0
        
        // set loop from data
        this.loopData = this.loop

        // add img index
        this.imgIndex = prev
        this.isVisible = true

        // add events listener
        window.addEventListener('keydown', this.eventListener)

        // add wheel event
        if(this.enableWheelEvent) {
          window.addEventListener('wheel', this.wheelEvent)
        }
        
        // only in mobile
        if(window.innerWidth < 700) {

          // add click event
          setTimeout(function() {
            window.addEventListener('click', self.showButtons)
          }, 200)
        }

        if (this.enableScrollLock) {
          setTimeout(function() {
            self.setCompensateForScrollbar();
            disableBodyScroll(self.$refs.coolLightbox);
          }, 50);
        }

      } else {

        // hide and stop slideshow
        this.isVisible = false
        this.stopSlideShow()

        // set starts X to 0
        this.startsX = 0
        this.initialMouseY = 0
        this.swipeType = null

        // clear interval
        clearInterval(this.swipeInterval)
        this.swipeAnimation = null

        // finish swipe
        this.isDraggingSwipe = false
        this.isZooming = true

        // remove events listener
        window.removeEventListener('keydown', this.eventListener)

        if (this.enableScrollLock) {
          self.removeCompensateForScrollbar();
          enableBodyScroll(self.$refs.coolLightbox);
        }

        // remove click event
        window.removeEventListener('click', this.showButtons)

        // remove resize event
        window.removeEventListener('resize', this.xPositionOnResize)
        
        // remove wheel event
        if(this.enableWheelEvent) {
          window.removeEventListener('wheel', this.wheelEvent)
        }
      }

    }, 
    
    imgIndex(prev, val) {
      const thisContext = this
      
      // when animation is loaded
      this.$nextTick(() => {
        if(prev !== null & val === null) {
          this.$emit("on-open", prev);
        }

        if(prev !== null) {
          if(prev !== val) {
            const prevSrc = this.getItemSrc(prev)
            if (!isYoutube(prevSrc) && !isVimeo(prevSrc)) {
              this.stopVideos()
            }
          }

          // if is an image change imageLoading to true
          if(!this.getVideoUrl(prev)) {
            if(!this.is_cached(this.getItemSrc(prev))) {
              this.imageLoading = true
            }
          }

          // add caption padding to Lightbox wrapper
          this.addCaptionPadding()
          
          if(this.getVideoUrl(prev)) {
            this.setAspectRatioVideo();
          }
        }

        // reset zoom
        this.resetZoom()

        // reset swipe type
        this.swipeType = null
        this.ySwipeWrapper = 0

      })
    }, 
  },

  beforeDestroy () {
    if (this.enableScrollLock) {
      this.removeCompensateForScrollbar();
      const $coolLightbox = this.$refs.coolLightbox
      if($coolLightbox) {
        enableBodyScroll($coolLightbox);
      }
    }
  },

  methods: {
    stopVideos() {
      const videos = document.getElementsByClassName("cool-lightbox-video")
      const isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)
      if(videos.length > 0) {
        Array.prototype.forEach.call(videos, video => {
          const type = video.tagName
          
          if(type === 'IFRAME') {
            var iframeSrc = video.src
            return video.src = iframeSrc
          }

          if(isVideoPlaying(video)) {
            return video.pause()
          }

        })
      }
    },
    setAutoplay(index) {
      const item = this.getItem(index)
      return item && item.autoplay
    },
    removeCompensateForScrollbar() {
      document.body.classList.remove("compensate-for-scrollbar");
      const noscrollStyle = document.getElementById("coollightbox-style-noscroll");
      if(noscrollStyle !== null) {
        document.getElementById("coollightbox-style-noscroll").remove();
      }
    },
    setCompensateForScrollbar() {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      if (!isMobile && document.body.scrollHeight > window.innerHeight) {
        document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend',
          '<style id="coollightbox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' +
            (window.innerWidth - document.documentElement.clientWidth) +
          "px;}</style>"
        )
        document.body.classList.add("compensate-for-scrollbar")
      }
    },
    toggleFullScreenMode() {
      if(this.isFullScreenMode) {
        closeFullscreen()
      } else {
        fullScreenMode()
      }

      this.isFullScreenMode = !this.isFullScreenMode
    },
    // check if event is arrow button or toolbar button
    checkIfIsButton(event) {
      var elements = '.cool-lightbox__iframe *, .cool-lightbox-button, .cool-lightbox-button *, .cool-lightbox-toolbar__btn, .cool-lightbox-toolbar__btn *, .cool-lightbox-caption h6, .cool-lightbox-caption p, .cool-lightbox-caption a';
      if (event.target.matches(elements)) {
        return true
      }

      return false
    },

    // start swipe event
    startSwipe(event) {
      if(this.isZooming) {
        return false;
      }

      // check if is some button
      if(this.checkIfIsButton(event)) {
        return false;
      }

      // clear interval
      clearInterval(this.swipeInterval)
      this.swipeAnimation = null

      // starts swipe
      this.isDraggingSwipe = true
      this.initialMouseX = this.getMouseXPosFromEvent(event);
      this.initialMouseY = this.getMouseYPosFromEvent(event);
    },

    // continue swipe event
    continueSwipe(event) {
      if(this.isDraggingSwipe) {
        this.IsSwipping = true
        const currentPosX = this.getMouseXPosFromEvent(event)
        const currentPosY = this.getMouseYPosFromEvent(event)
        const windowWidth = this.lightboxInnerWidth

        // diffs
        const diffX = Math.abs(currentPosX - this.initialMouseX)
        const diffY = Math.abs(currentPosY - this.initialMouseY)

        // swipe type
        if(this.swipeType == null) {
          if(diffY > 5 || diffX > 5) {
            if(diffY > diffX) {
              this.swipeType = 'v'
            } else {
              this.swipeType = 'h'
            }
          }
        }

        // swipe
        if(this.swipeType == 'h') {
          // swipe wrapper
          this.xSwipeWrapper = -(windowWidth*this.imgIndex) + currentPosX - this.initialMouseX - 30*this.imgIndex

        } else {
          this.ySwipeWrapper = currentPosY - this.initialMouseY
        }

        // mobile caseS
        if(event.type === 'touchmove') {
          this.endMouseX = this.getMouseXPosFromEvent(event);
          this.endMouseY = this.getMouseYPosFromEvent(event);
        }
      }
    },

    // end swipe event
    endSwipe(event) {
      if(this.checkIfIsButton(event) && this.initialMouseX === 0) {
        return false;
      }

      // event check is dragging and swipe
      const self = this
      const swipeType = this.swipeType
      this.isDraggingSwipe = false
      
      // horizontal swipe type
      if(this.initialMouseX === 0 && swipeType == 'h') {
        return false
      }

      // touch end fixes
      if(event.type !== 'touchend') {
        this.endMouseX = this.getMouseXPosFromEvent(event);
        this.endMouseY = this.getMouseYPosFromEvent(event);
      } else {
        if(this.endMouseX === 0) {
          return;
        }
      }

      // check if is dragged 
      if(
        ((this.endMouseX - this.initialMouseX === 0) && swipeType == 'h') || 
        this.isZooming ||
        ((this.endMouseY - this.initialMouseY === 0) && swipeType == 'v')
      ) {
        return;
      } 
      
      // set swipe animation
      this.setSwipeAnimation()

      // reset swipe data
      setTimeout(function() {
        self.IsSwipping = false
        self.initialMouseX = 0
        self.endMouseX = 0
      }, 10)

      // type of swipe
      if(this.swipeType === 'h') {

        // if the swipe is to the right
        if((this.endMouseX - this.initialMouseX) < -40) {
          return this.swipeToRight()
        } 

        // if the swipe is to the left
        if((this.endMouseX - this.initialMouseX) > 40) {
          return this.swipeToLeft();
        }
      }


      if(this.swipeType === 'v') {
        const diffY = Math.abs(this.endMouseY - this.initialMouseY)

        // diff Y
        if(diffY >= 90) {
          this.close()
        } else {
          this.ySwipeWrapper = 0
        }
      } 
      
      this.swipeType = null
      const windowWidth = this.lightboxInnerWidth

      this.xSwipeWrapper = -this.imgIndex*windowWidth - 30*this.imgIndex
    },
    
    // swipe to left effect
    swipeToLeft() {
      this.changeIndexToPrev()
    },
    
    // swipe to right effect
    swipeToRight() {
      this.changeIndexToNext()
    },

    // function that return x position from event
    getMouseXPosFromEvent(event) {
      if(event.type.indexOf('mouse') !== -1){
          return event.clientX;
      }
      return event.touches[0].clientX;
    },
    
    // function that return Y position from event
    getMouseYPosFromEvent(event) {
      if(event.type.indexOf('mouse') !== -1){
          return event.clientY;
      }
      return event.touches[0].clientY;
    },

    // toggle play slideshow event
    togglePlaySlideshow() {
      if(!this.slideshow) {
        return false
      }

      if(!this.hasNext && !this.loopData) {
        return false
      }
      this.isPlayingSlideShow = !this.isPlayingSlideShow

      // if is playing move if not stop it
      if(this.isPlayingSlideShow) {
        this.move()
      } else {
        this.stopSlideShow()
      }
    },

    // stop slideshow
    stopSlideShow() {
      this.isPlayingSlideShow = false
      clearInterval(this.intervalProgress);
      this.stylesInterval = {
        'transform': 'scaleX(0)',
        'transition': 'none',
      }
    },

    // move event in zoom
    move() {
      const self = this
      this.progressWidth = 100;
      this.intervalProgress = setInterval(frame, this.slideshowDuration + 90);
      
      self.stylesInterval = {
        'transform': 'scaleX(1)',
        'background': this.slideshowColorBar,
        'transition-duration': this.slideshowDuration+'ms',
      }
      function frame() {
        self.stylesInterval = {
          'transform': 'scaleX(0)',
          'transition': 'none',
        }
        
        if(self.dir === 'rtl') {
          self.onPrevClick(true)
        } else {
          self.onNextClick(true)
        }

        if(!self.hasNext && !self.loopData) {
          self.stopSlideShow()
        } else {
          setTimeout(function() {
            self.stylesInterval = {
              'transform': 'scaleX(1)',
              'background': self.slideshowColorBar,
              'transition-duration': self.slideshowDuration+'ms',
            }
          }, 50)
        }
      }
    }, 

    // show buttons event
    showButtons(event) {
      if (!this.checkIfIsButton(event)) {
        const self = this
        setTimeout(function() {
          self.buttonsVisible = !self.buttonsVisible
        }, 100)
      }
    },

    // check if is allowed to drag
    checkMouseEventPropButton(button) {
      if (!this.isZooming) return false
      // mouse left btn click
      return button === 0
    },

    // handle mouse down event
    handleMouseDown(e) {
      if (!this.checkMouseEventPropButton(e.button)) return
      this.lastX = e.clientX
      this.lastY = e.clientY
      this.isDraging = true
      e.stopPropagation()
    },

    // handle mouse up event
    handleMouseUp(e) {
      if (!this.checkMouseEventPropButton(e.button)) return
      this.isDraging = false
      this.lastX = this.lastY = 0

      // Fix drag zoom out
      const thisContext = this
      setTimeout(function() {
        thisContext.canZoom = true
      }, 100)
    },

    // handle mouse move event
    handleMouseMove(e) {
      if (!this.checkMouseEventPropButton(e.button)) return
      if (this.isDraging) {
        this.top = this.top - this.lastY + e.clientY
        this.left = this.left - this.lastX + e.clientX
        this.lastX = e.clientX
        this.lastY = e.clientY
        this.canZoom = false
        
        const item = e.target.parentNode.nodeName === 'PICTURE'
            ? e.target.parentNode.parentNode
            : e.target.parentNode
        const newZoom = 1.6 + this.zoomBar/10;
        item.style.transform  = 'translate3d(calc(-50% + '+this.left+'px), calc(-50% + '+this.top+'px), 0px) scale3d('+newZoom+', '+newZoom+', '+newZoom+')';
      }
      e.stopPropagation()
    },

    // zoom image event
    zoomImage(indexImage) {
      if(this.disableZoom) {
        return false
      }

      if(window.innerWidth < 700) {
        return false
      }

      if(!this.canZoom) {
        return false
      }

      if(this.IsSwipping) {
        return false
      }

      // item zoom
      let item;
      item = this.$refs.items.childNodes[0]
      
      // zoom variables
      const isZooming = this.isZooming
      const thisContext = this

      // Is zooming check
      if(isZooming) {
        if(!this.isDraging) { 
          this.isZooming = false
          this.zoomBar = 0
        }
      } else {
        this.isZooming = true
      }

      // check if is zooming
      if(this.isZooming) {
        this.stopSlideShow()

        // add scale
        item.style.transform  = 'translate3d(calc(-50%), calc(-50%), 0px) scale3d(1.6, 1.6, 1.6)';

        // hide buttons
        this.buttonsVisible = false

        // fix drag transition problems
        setTimeout(function() {
          thisContext.transition = 'all .0s ease'
        }, 100)

      } else {

        // show buttons 
        this.buttonsVisible = true
        this.resetZoom()
      }
    },

    // Reset zoom data
    resetZoom() {
      this.scale = 1
      this.left = 0
      this.top = 0
      this.zoomBar = 0
      this.isZooming = false
      this.swipeType = null
      this.transition = 'all .3s ease'

      // only if index is not null
      if(this.imgIndex != null) {
        
        let item;
        item = this.$refs.items.childNodes[0]

        // reset styles
        if(this.disableZoom) {
          item.style.transform  = 'translate3d(calc(-50% + '+this.left+'px), calc(-50% + '+this.top+'px), 0px)';
        } else {
          item.style.transform  = 'translate3d(calc(-50% + '+this.left+'px), calc(-50% + '+this.top+'px), 0px) scale3d(1, 1, 1)';
        }

        this.initialMouseX = 0
        if(window.innerWidth >= 700) {
          this.buttonsVisible = true
        }
      }
    },

    // Aspect Ratio responsive video
    setAspectRatioVideo() {
      const thisContext = this
      let el = document.getElementsByClassName('cool-lightbox__inner');
      el = el[0]

      let computedStyle = getComputedStyle(el)
      if(window.innerWidth < 1440) {

        let width = el.clientWidth;
        let height = Math.round((width/16)*9);

        this.aspectRatioVideo.height = height+'px'
        this.aspectRatioVideo.width = width+'px'

      } else {
        
        setTimeout(function() {
          let height = el.clientHeight;
          height -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);

          let width = (height/9)*16;

          thisContext.aspectRatioVideo.height = height+'px'
          thisContext.aspectRatioVideo.width = width+'px'
        }, 150)

      }
    },

    wheelEvent(event) {
      const delay = 350;
      const currentTime = new Date().getTime();
      let direction = event.deltaY > 0 ? 'top' : 'down';

      if (currentTime - this.prevTime < delay) return;

      this.prevTime = currentTime;

      switch (direction) {
        case 'top':
          return this.changeIndexToPrev();
          break;
        case 'down':
          return this.changeIndexToNext();
      }
    },

    // set lightbox inner width
    setLightboxInnerWidth() {
      let el = document.getElementsByClassName('cool-lightbox__inner');
      let width = el[0].clientWidth
      this.lightboxInnerWidth = width
    },

    // x position on resize event
    xPositionOnResize() {
      this.setLightboxInnerWidth()
      const index = this.imgIndex

      // set x position
      this.xSwipeWrapper = -index*this.lightboxInnerWidth-30*index
    },

    // set x position by img index
    setXPosition(index) {
      // set x position
      this.xSwipeWrapper = -index*this.lightboxInnerWidth-30*index
      return; 
    },

    // set swipe animation
    setSwipeAnimation() {
      const self = this
      clearInterval(this.swipeInterval)
      this.swipeAnimation = null

      // animation swipe
      this.swipeAnimation = 'all .3s ease';
      this.swipeInterval = setInterval(interval, 330);

      function interval() {
        self.swipeAnimation = null
      }
    },

    // caption size 
    addCaptionPadding() {
      if(this.currentItem.title || this.currentItem.descripcion) {
        const el = document.getElementsByClassName('cool-lightbox-caption');
        if(el.length > 0) {
          this.paddingBottom = el[0].offsetHeight
        } 
      } else {
        this.paddingBottom = 60
      }
    },

    // close event
    close() {
      this.stopSlideShow()
      this.swipeType = null
      this.$emit("close", this.imgIndex)
      this.showThumbs = false
      this.imgIndex = null
    },

    // close event click outside
    closeModal(event) {
      if(!this.closeOnClickOutsideMobile) {
        if(window.innerWidth < 700) {
          return false;
        }
      }

      if(this.IsSwipping) {
        return false;
      }

      var elements = '.cool-lightbox__iframe, .cool-lightbox__iframe *, .cool-lightbox-zoom, .cool-lightbox-zoom *, .cool-lightbox-thumbs, svg, path, rect, .cool-lightbox-thumbs *, .cool-lightbox-button, .cool-lightbox-toolbar__btn, .cool-lightbox-toolbar__btn *, .cool-lightbox-button *, .cool-lightbox__slide__img *, .cool-lightbox-video, .cool-lightbox-caption h6, .cool-lightbox-caption p, .cool-lightbox-caption a';
      if (!event.target.matches(elements)) {
        this.close()
      }
    },

    // next slide event
    onNextClick(isFromSlideshow = false) {
      if(this.isZooming) {
        return false;
      }

      if(!isFromSlideshow) {
        this.stopSlideShow()
      }

      this.setSwipeAnimation()

      this.changeIndexToNext()
    },

    // prev slide event
    onPrevClick(isFromSlideshow = false) {
      if(this.isZooming) {
        return false;
      }
      
      if(!isFromSlideshow) {
        this.stopSlideShow()
      }
      
      this.setSwipeAnimation()

      this.changeIndexToPrev();
    },

    // change to next index
    changeIndexToNext() {
      if(this.hasNext) {
        this.onIndexChange(this.imgIndex + 1)
      } else {
        // only if has loop prop
        if(this.loopData) {
          this.onIndexChange(0)
        }
      }
    },

    // change to prev index
    changeIndexToPrev() {
      if(this.hasPrevious) {
        this.onIndexChange(this.imgIndex - 1)
      } else {
        // only if has loop prop
        if(this.loopData) {
          this.onIndexChange(this.items.length - 1)
        }
      }
    },
    // index change
    onIndexChange(index) {
      const self = this;
      this.imgIndex = index;
      this.$emit('on-change', index);

      setTimeout(function() {
        self.$emit('on-change-end', index);
      }, 400);
    },
    // check if the image is cached
    is_cached(src) {
      var image = new Image();
      image.src = src;

      return image.complete;
    },

    // image loaded event
    imageLoaded() {
      this.imageLoading = false
    },
    getItem(index) {
      try {
        const item = this.items[index]
        if (item) {
          return isObject(item) ? item : { src: item }
        }
        return null
      } catch (error) {
        return null
      }
    },
    checkIsVideo(index) {
      const item = this.getItem(index)
      if (item) {
        const { mediaType, src } = item
        return mediaType ? ['video', 'webVideo'].includes(mediaType) : isVideo(src)
      }
      return false
    },
    // get item src
    getItemSrc(index) {
      const item = this.getItem(index)
      return item ? (item.src || item) : null
    },
    // get item thumbnail
    getItemThumb(index) {
      const item = this.getItem(index)
      if (item) {
        const { src, thumb } = item
        if (thumb) {
          return thumb
        } else if (isYoutube(src)) {
          return getYoutubeThumb(src) || src
        } else {
          return src
        }
      }
      return ''
    },
    // get item media type
    getMediaType(index) {
      const item = this.getItem(index)
      if (item) {
        const { mediaType } = item
        return mediaType ? mediaType : this.checkIsVideo(index) ? 'video' : 'image'
      }
      return 'image'
    },
    isItemPicture(index) {
      const item = this.getItem(index)
      return item ? !!item.picture : false
    },
    getPictureSources(index) {
      const item = this.getItem(index)
      return !item ? [] : (item.picture || [])
    },
    
    getVideoUrl(index) {
      const item = this.getItem(index)
      if (item && this.checkIsVideo(index)) {
        const { src } = item

        const youtubeUrl = getYoutubeUrl(src, this.youtubeCookies)
        if (youtubeUrl) return youtubeUrl
        
        const vimeoUrl = getVimeoUrl(src)
        if (vimeoUrl) return vimeoUrl

        return src
      }
      return null
    },
    // check if video is mp4
    checkIsMp4(itemIndex) {
      const itemSrc = this.getItemSrc(itemIndex)
      const suffix = fileSuffix(itemSrc)
      if (['mp4', 'mov', 'webm', 'ogg', 'avi'].includes(suffix)) {
        return itemSrc
      }
      return null
    },

    // if is video get extension
    videoSourceType(index) {
      const item = this.getItem(index)
      if (item) {
        return videoSourceType(item.src, { ext: item.ext })
      }
      return ''
    },

    // arrows and escape events
    eventListener(e) {
      switch (e.keyCode) {
        case 39:
          return this.onNextClick()
        case 37:
          return this.onPrevClick()
        case 38:
        case 40:
        case ' ':
          return e.preventDefault()
        case 27:
          return this.close()
      }
    },
    iframeLoaded(e) {
      console.log('iframe loaded ', e)
    },
    iframeDOMContentLoaded(e) {
      console.log('iframeDOMContentLoaded', e)
    },
    iframeReadystatechange(e) {
      console.log('iframeReadystatechange', e)
    }
  }
}
</script>
