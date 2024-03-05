<template>
  <div id="SessionsDisplay" class="view">
    <div class="view-container">
      <EventBanner :room="room" :design="design" :activeType="activeType" />
      <EventSessions
        :sessions="sessions" 
        :design="design" 
        :activeSession="activeSession"
        :nextSession="nextSession"
        :allEnded="allEnded"
        :activeType="activeType"
      />
    </div>
  </div>
</template>

<script>
import * as dayjs from 'dayjs';
import EventBanner from '@/components/banner';
import EventSessions from '@/components/sessions';

export default {
  name: 'SessionsDisplay',
  components: {
    EventBanner,
    EventSessions
  },
  data() {
    return {
      default: {
        resData: {
          conferenceName: null,
          roomName: null,
          qr: null,
          design: null,
          sessions: []
        }
      },
      sessionSeq: [],
      activeSeq: null,
      activeType: null,
      activeSession: null,
      nextSession: null,
      allEnded: false,
    };
  },
  computed: {
    resData() {
      const data = this.$store.state.sessions.sessions || this.default.resData;
      return data;
    },
    room() {
      const room = {
        conferenceName: this.resData.conferenceName,
        roomName: this.resData.roomName,
        qr: this.resData.qr
      }
      return room;
    },
    design() {
      return this.resData.design;
    },
    sessions() {
      const today = dayjs().format('MM/DD/YYYY ');

      return this.resData.sessions.map((d) => {
        return {
          ...d,
          validStartTime: today+d.startTime,
          validEndTime: today+d.endTime
        }
      });
    }
  },
  methods: {
    setSessionSeq() {
      // create an array of sequence including both sessions and breaks, so it would be lighter when loop-checking on session time
      const len = this.sessions.length;
      const dateFormat = 'MM/DD/YYYY HH:mm:ss';
      let seq = [];
      
      if(this.sessions && len){
        this.sessions.forEach((d, i) => {
          const start = d.validStartTime;
          const end = d.validEndTime;
          const sequence = i + 1;
          //adding sessions to the sequence array
          seq.push({
            ogIndex: i,
            startTime: start,
            endTime: end,
            isSession: true,
            isBetween: dayjs().isBetween(start, end)
          });

          if(sequence !== len){
            const nxtSession = this.sessions[sequence];
            const startBreak = dayjs(end).add(1, 'second').format(dateFormat);
            const endBreak = dayjs(nxtSession.validStartTime).subtract(1, 'second').format(dateFormat);

            if(!dayjs(nxtSession.validStartTime).isSame(end)){
              //adding in-between breaks to the sequence array
              seq.push({
                ogIndex: i,
                startTime: startBreak,
                endTime: endBreak,
                isSession: false,
                isBetween: dayjs().isBetween(startBreak, endBreak)
              })
            }
          }
        });

        this.sessionSeq = seq.map((d, i) => {
          return {
            index: i,
            ...d
          }
        });
        
        this.setSeq();
      }
    },
    setSeq() {
      //set the status of each item on the sequence on which is the "active" session and "next" session
      const seq = this.sessionSeq;
      
      if(seq && seq.length){
        const last = seq.length - 1;
        const isLast = last === this.activeSeq;
        const lastSession = seq[last];
        const allEnded = dayjs().isAfter(lastSession.endTime);
        let active = null;

        this.allEnded = allEnded;
        
        if(!allEnded){
          active = seq.filter(d => d.isBetween)[0];
          this.activeSeq = active ? active.index : null;
          if(active){
            this.nextSession = !isLast ? active.ogIndex + 1 : null;
          }else{
            this.nextSession = 0;
          }
          this.seqTimer();
        }else{
          this.activeType = 'end';
        }
      }
    },
    seqTimer() {
      //start timer to loop-check on the sequence of sessions and breaks
      const seq = this.sessionSeq;
      const last = seq.length - 1;
      const interval = 1000;
      
        if(!this.timer){
          this.timer = setInterval(() => {
          const isLast = last === this.activeSeq;
          const active = typeof this.activeSeq === 'number' ? seq[this.activeSeq] : null;
          
          if(active){
            const activeEnded = dayjs().isAfter(active.endTime);
            const next = seq[active.index + 1];
            if(activeEnded && isLast){
              //timer should stop after all sessions ended
              clearInterval(this.timer);
              this.activeSession = null;
              this.activeSeq = null;
              this.nextSession = null;
              this.activeType = 'end';
            }else if(activeEnded && !isLast){
              this.activeSession = next.isSession ? active.ogIndex + 1 : null;
              this.activeSeq = active.index + 1 ;
              this.nextSession = next.isSession ? active.ogIndex + 2 : active.ogIndex + 1;
              this.activeType = next.isSession ? 'session' : 'break';
            }else{
              this.activeSession = active.isSession ? active.ogIndex : null;
              this.activeType = active.isSession ? 'session' : 'break';
            }
          }else{
            const first = seq[0];
            const roomStarted = dayjs().isSameOrAfter(first.startTime);
            if(roomStarted){
              this.activeSession = first.ogIndex;
              this.activeType = 'session';
              this.activeSeq = first.index;
              this.nextSession = first.ogIndex + 1;
            }else{
              this.activeType = 'break';
              this.nextSession = first.ogIndex;
            }
          }
        }, interval);
      }
    }
  },
  mounted() {
    //call sessions.json from mock folder thru axios and vue-store
    this.$store.dispatch("sessions/getSessions");
  },
  watch: {
    sessions(newVal) {
      //once we have the sessions data, we can now proceed to creating the sequence array and setting the timer
      if(newVal && newVal.length){
        this.setSessionSeq();
      }
    }
  },
  onUnmounted() {
    clearInterval(this.sessionTimer);
  }
}
</script>

<style scoped>
  #SessionsDisplay {
    position: absolute;
    top: 0px;
    right: 0px;
  }
</style>
