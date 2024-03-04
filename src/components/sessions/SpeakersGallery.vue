<template>
  <div class="speakers">
    <template v-for="(d, i) in data" :key="i">
      <div class="speaker" :class="[setPosition(i), setLayer(i)]">
        <div class="speaker-img">
          <img :src="d.image" />
        </div>
        <div class="speaker-info">
          <h3>{{d.name}}</h3>
          <h5>{{d.position}}</h5>
          <h5>{{d.company}}</h5>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SpeakersGallery',
  props: {
    data: Array,
    design: Object
  },
  data() {
    return {
      active: 0,
      sideRight: [1, 2],
      sideLeft: []
    }
  },
  methods: {
    setPosition(index) {
      return index === this.active
        ? '--active'
        : (this.sideRight.indexOf(index) !== -1
          ? '--sideR'
          : (this.sideLeft.indexOf(index) !== -1
            ? '--sideL'
            : ''))
    },
    setLayer(index) {
      const isLayer1 = this.sideRight.indexOf(index) === 0 || this.sideLeft.indexOf(index) === 0;
      const isLayer2 = this.sideRight.indexOf(index) === 1 || this.sideLeft.indexOf(index) === 1;
      return index === isLayer1 ? '--layer1' : (isLayer2 ? '--layer2' : '');
    },
    startTimer() {
      const interval = 8000; //8sec

      if(!this.timer){
        this.timer = setInterval(() => {
          const isLast = this.active === this.data.length;
          const nextActive = isLast ? 0 : this.active + 1;
          
          if(nextActive === 0){
            this.sideRight = [1, 2];
            this.sideLeft = [];
          }else if(nextActive === 1){
            this.sideRight = [2,3];
            this.sideLeft = [0];
          }else{
            this.sideRight = [nextActive + 1, nextActive + 2];
            this.sideLeft = [nextActive - 1, nextActive - 2];
          }
          this.active = nextActive;
          
        }, interval);
      }
    }
  },
  mounted() {
    if(this.data && this.data.length > 1){
      this.startTimer();
    }
  },
  onUnmounted() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped>
  .speakers {
    width: 100%;
    height: 250px;
    margin-top: 60px;
    padding-left: 20px;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    .speaker {
      width: 100px;
      height: 250px;
      position: relative;
      float: left;
      position: relative;
      margin-right: 5px;
      margin-bottom: 10px;
      filter: saturate(0);
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      transition: all 0.3s ease;
      .speaker-img {
        width: 100px;
        height: 100px;
        background: gray;
        margin-bottom: 20px;
        transition: all 0.3s ease;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: inherit;
          border-radius: 10px;
        }
      }
      .speaker-info {
        width: max-content;
        text-align: center;
        opacity: 0;
        transition: all 0.3s ease;
        h3 {
          color: v-bind('design.secondaryColour');
          margin-bottom: 5px;
        }
        h5 {
          font-size: 0.8rem;
        }
      }
      &.--active {
        filter: saturate(1);
        z-index: 14;
        overflow: visible;
        .speaker-img {
          box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.6);
          transform: scale(1.4);
        }
        .speaker-info {
          opacity: 1;
          margin-top: 20px;
        }
      }
      &.--hidden {
        display: none;
      }
    }
  }
</style>