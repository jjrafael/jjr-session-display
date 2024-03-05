<template>
  <div id="EventBanner" :class="[cxType, cxBg]" v-bind:style="bg">
    <div v-if="design && design.bannerType === 'logo'" class="banner-content">
      <div class="banner-logo">
        <img :src="design.conferenceLogo" />
      </div>
      <h3 class="banner-subtitle" :class="cxFont">{{room.roomName}}</h3>
    </div>
    <div v-else class="banner-content">
      <h1 class="banner-title" :class="cxFont">{{room.conferenceName}}</h1>
      <h3 class="banner-subtitle">{{room.roomName}}</h3>
    </div>
    <div class="banner-float">
      <div class="banner-qr">
        <img :src="room.qr.file" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventBanner',
  props: {
    room: Object,
    design: Object,
    activeType: String
  },
  computed: {
    cxType() {
      return '--'+this.activeType;
    },
    cxRoundness() {
      return 'roundness-'+this.design.roundness;
    },
    cxFont() {
      return this.design ? 'font-fam-'+(this.design.font.toLowerCase()) : '';
    },
    cxShadows() {
      return 'shadow-'+this.design.shadows;
    },
    cxBg() {
      return this.design ? 'bg-'+this.design.backgroundType : '';
    },
    bg() {
      const isImage = this.design && this.design.backgroundType === 'image';
      const isColor = this.design && this.design.backgroundType === 'color';
      return isImage
        ? {'background-image': 'url(' + this.design.background + ')'}
        : (isColor ? {'background-color': this.design.background} : '');
    },
    colors() {
      return {
        prim: this.design ? this.design.primaryColour : '',
        sec: this.design ? this.design.secondaryColour : ''
      };
    },
  }
}
</script>

<style scoped>
  #EventBanner {
    width: 100%;
    height: 100%;
    position: relative;
    background: indigo;
    transition: all 0.3s ease;
    .banner-content {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      h1, h2, h3, h4 {
        color: rgba(236, 236, 236, 1);
        text-align: center;
      }
      .banner-logo {
        width: 75%;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: inherit;
          border-radius: 10px;
        }
      }
      .banner-title {
        margin-bottom: 20px;
      }
      .banner-subtitle {
        text-transform: uppercase;
        padding: 10px 20px;
        background: v-bind('colors.prim');
        color: white;
      }
    }
    .banner-float {
      position: absolute;
      bottom: 40px;
      left: 40px;
      .banner-qr {
        width: 180px;
        height: 180px;
        background: white;
        img {
          width: inherit;
        }
      }
    }
    &.bg-image {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    &.--session {
      .banner-content {
        width: 30vw;
        left: 0px;
        .banner-logo {
          img {
            width: 100%;
          }
        }
        .banner-title {
          font-size: 4vw;
        }
      }
    }
  }
</style>