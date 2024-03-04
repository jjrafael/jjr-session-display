<template>
  <div class="session" :class="[cxStatus, cxRoundness, cxShadows]">
    <div v-if="status !== 'faded'" class="session-head">
      <h3 v-if="status === 'active'" class="session-head-title">Right Now</h3>
      <h3 v-else class="session-head-title">Up Next</h3>
      <h5 v-if="status !== 'active'" class="session-head-info">{{relTimeText}}</h5>
    </div>
    <div class="session-body">
      <h3 class="session-body-title" :class="[cxFont]">{{data.name}}</h3>
      <h4 class="session-body-info session-time font-color-gray-50">
        {{formatTime(data.startTime)}} - {{formatTime(data.endTime)}}
      </h4>
      <h5 v-if="status === 'active'" class="session-body-info">{{data.description}}</h5>
      <SpeakersGallery 
        v-if="status === 'active'" 
        :design="design"
        :data="data.speakers" />
    </div>
  </div>
</template>

<script>
import * as dayjs from 'dayjs';
import { formatDate, relTime, getNow } from '@/utils';
import SpeakersGallery from './SpeakersGallery';

export default {
  name: 'SessionCard',
  props: {
    design: Object,
    data: Object,
    status: String,
    activeType: String,
  },
  components: {
    SpeakersGallery
  },
  data() {
    return {
      relTimeText: ''
    };
  },
  computed: {
    cxStatus() {
      return '--'+this.status;
    },
    cxRoundness() {
      return 'roundness-'+this.design.roundness;
    },
    cxFont() {
      return 'font-fam-'+(this.design.font.toLowerCase());
    },
    cxShadows() {
      return 'shadow-'+this.design.shadows;
    },
    relativeStart() {
      return relTime(getNow('MM/DD/YYYY ')+this.data.startTime);
    }
  },
  methods: {
    formatTime(data) {
      return formatDate(data);
    },
    startRelTimer() {
      const interval = 1000;

      if(!this.relTimer){
        this.relTimer = setInterval(() => {
          const isEnded = dayjs().isAfter(this.data.startTime);
          if(isEnded){
            clearInterval(this.relTimer);
          }else{
           this.relTimeText = relTime(getNow('MM/DD/YYYY ')+this.data.startTime);
          }
        }, interval);
      }
    }
  },
  mounted() {
    this.startRelTimer();
  },
  onUnmounted() {
    clearInterval(this.relTimer);
  }
}
</script>

<style scoped>
  .session {
    width: 100%;
    height: max-content;
    background: white;
    border-radius: 20px 0px 0px 20px;
    margin-bottom: 20px;
    padding: 20px;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.4);
    transition: all 0.3s ease;
    .session-head {
      width: 25%;
      height: 100%;
      float: left;
      transition: all 0.3s ease;
      .session-head-title {
        color: v-bind('design.secondaryColour');
        transition: all 0.3s ease;
      }
      .session-head-info {
        margin-bottom: 2px;
        transition: all 0.3s ease;
      }
    }
    .session-body {
      width: calc(75% - 20px);
      height: 100%;
      float: left;
      padding-left: 20px;
      transition: all 0.3s ease;
      .session-body-title {
        color: v-bind('design.primaryColour');
        margin-bottom: 3px;
        transition: all 0.3s ease;
      }
      .session-body-info {
        margin-bottom: 3px;
        transition: all 0.3s ease;
      }
      .session-time {
        margin-bottom: 10px;
        font-size: 0.8rem;
      }
    }
    &.--faded {
      width: 70%;
      opacity: 0.4;
      height: 30%;
      border-radius: 20px 0px 0px 0px;
      margin-bottom: 0px;
    }
    &.--hidden {
      display: none;
    }
    &.--next {
      width: 65%;
      max-height: 150px;
    }
    &.--active {
      height: max-content;
      max-height: calc(100vh - 300px);
      position: relative;
      box-shadow: 0px 0px 20px -3px rgba(0,0,0,1);
      .session-head {
        position: absolute;
        top: -30px;
        right: 20px;
        height: max-content;
        .session-head-title {
          max-width: max-content;
          padding: 20px;
          text-align: center;
          background: v-bind('design.secondaryColour');
          border-radius: 20px;
          color: white;
          text-transform: uppercase;
          float: right;
          box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.4);
        }
      }
      .session-body {
        width: calc(90% - 20px);
        .session-body-title {
          font-size: 40px;
        }
        .session-time {
          color: rgba(21, 21, 21, 1);
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .session-body-info {
          font-size: 1rem;
          line-height: 18px;
        }
      }
    }
  }
</style>