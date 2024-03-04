<template>
  <div id="EventSessions">
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
</style>