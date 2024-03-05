<template>
  <div id="EventSessions" :class="[cxType === '--session' ? 'md:max-lg:w-full' : '']">
    <div  v-if="!allEnded" class="sessions-section" :class="cxType">
      <template v-for="(d, i) in sessions" :key="i">
        <SessionCard 
          :design="design" 
          :data="d" 
          :activeType="activeType"
          :status="setStatus(i)"/>
      </template>
    </div>
  </div>
</template>

<script>
import SessionCard from './SessionCard';

export default {
  name: 'EventSessions',
  props: {
    design: Object,
    sessions: Array,
    activeSession: Number,
    activeType: String,
    nextSession: Number,
    allEnded: Boolean
  },
  components: {
    SessionCard
  },
  computed: {
    cxType() {
      return '--'+this.activeType;
    }
  },
  methods: {
    setStatus(index){
      const isActive = index === this.activeSession;
      const isNext = index === this.nextSession;
      return isActive ? 'active' : (isNext ? 'next' : 'hidden');
    }
  }
}
</script>

<style scoped>
  #EventSessions {
    width: auto;
    height: auto;
    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: 10;
    transition: all 0.3s ease;
    &.--active {
      height: 100%;
    }
    .sessions-section {
      width: 65vw;
      min-width: 600px;
      height: auto;
      display: flex;
      justify-content: end;
      align-items: end;
      flex-direction: column;
      padding: 20px 0px 0px 20px;
      &.--session {
        height: 100vh;
        justify-content: center;
        align-items: end;
      }
    }
  }

  /* responsive */
  @media (max-width: 1024px) {
    #EventSessions {
      width: 100%;
      .sessions-section {
        &.--session {
          width: 100%;
          min-width: 100%;
          height: 75vh;
          padding: 0px;
          align-items: center;
          .session.--active {
            width: 85%;
            border-radius: 20px;
            align-items: center;
          }
          .session.--next {
            width: 70%;
            border-radius: 20px;
            margin-bottom: 40px;
          }
        }
        &.--break {
          min-width: 100%;
          padding: 0px;
          .session.--next {
            width: 70%;
            margin-bottom: 40px;
          }
        }
      }
    }
  }
</style>