<template>
    <md-drawer class="md-right draws-participants"
               :md-active.sync="showDrawer">
        <md-toolbar class="md-accent"
                    md-elevation="0">
            <div class="md-toolbar-section-start">
                <span class="md-title">{{ draw.name }}</span>
            </div>
            <div class="md-toolbar-section-end">
                <md-button v-if="isSelectingWinners && hasSelectedParticipants"
                           class="md-icon-button">
                    <md-icon>done</md-icon>
                </md-button>
                <md-button class="md-icon-button">
                    <md-icon>clear</md-icon>
                </md-button>
            </div>
        </md-toolbar>

        <md-list>
            <md-list-item v-for="(participant, id) in participants"
                          :key="`participant_${id}`"
                          :class="id > 0 && participants[id - 1].status === undefined ? 'blur' : ''">
                <span class="md-list-item-text">{{ participant.name }}</span>
                <md-button v-if="participant.status === undefined || participant.status === 'WINNER'"
                           class="md-list-action md-icon-button"
                           :class="participant.status === 'WINNER' ? 'good' : ''"
                           :disabled="id > 0 && participants[id - 1].status === undefined"
                           @click="addStatus('WINNER', participant, id)">
                    <md-icon>sentiment_very_satisfied</md-icon>
                </md-button>
                <md-button v-if="participant.status === undefined || participant.status === 'REJECTED'"
                           class="md-list-action md-icon-button"
                           :class="participant.status === 'REJECTED' ? 'bad' : ''"
                           :disabled="id > 0 && participants[id - 1].status === undefined"
                           @click="addStatus('REJECTED', participant, id)">
                    <md-icon>sentiment_very_dissatisfied</md-icon>
                </md-button>
            </md-list-item>
        </md-list>
    </md-drawer>
</template>

<script>
  export default {
    name: 'DrawsParticipants',
    props: {
      drawId: {
        type: String,
        default: null
      },
      draw: {
        type: Object,
        default: null
      }
    },
    computed: {
      showDrawer() {
        return this.drawId !== null;
      },
      participants() {
        return this.draw.participants;
      },
      isSelectingWinners() {
        return this.draw.status === 'CLOSED';
      },
      hasSelectedParticipants() {
        return this.participants.find(participant => participant.status !== undefined);
      }
    },
    methods: {
      addStatus(status, participant, participantId) {
        participant.status = status;
        this.participants.splice(participantId, 1, participant);
      }
    }
  }
</script>

<style scoped lang="scss">
    .draws-participants {
        .blur {
            filter: blur(5px);
        }

        .good {
            .md-icon {
                color: #4caf50 !important;
            }
        }

        .bad {
            .md-icon {
                color: #f44336 !important;
            }
        }
    }
</style>
