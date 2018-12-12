<template>
    <md-drawer class="md-right draws-participants"
               :md-active.sync="active">
        <md-toolbar class="md-accent"
                    md-elevation="0">
            <div class="md-toolbar-section-start">
                <span class="md-title">{{ draw.name }}</span>
            </div>
            <div class="md-toolbar-section-end">
                <md-button v-if="!isFinished && hasSelectedParticipants"
                           :disabled="isSaving"
                           class="md-icon-button"
                           @click="save">
                    <md-icon>done</md-icon>
                </md-button>
                <md-button class="md-icon-button"
                           @click="close">
                    <md-icon>clear</md-icon>
                </md-button>
            </div>
        </md-toolbar>

        <md-list>
            <md-list-item v-for="(participant, id) in participants"
                          :key="`participant_${id}`"
                          :class="id > 0 && participants[id - 1].status === undefined ? 'blur' : ''">
                <span class="md-list-item-text">{{ participant.name }}</span>
                <md-button class="md-list-action md-icon-button"
                           :class="participant.status === 'WINNER' ? 'good' : ''"
                           :disabled="(id > 0 && participants[id - 1].status === undefined) || isFinished"
                           @click="addStatus('WINNER', participant, id)">
                    <md-icon>sentiment_very_satisfied</md-icon>
                </md-button>
                <md-button class="md-list-action md-icon-button"
                           :class="participant.status === 'REJECTED' ? 'bad' : ''"
                           :disabled="(id > 0 && participants[id - 1].status === undefined) || isFinished"
                           @click="addStatus('REJECTED', participant, id)">
                    <md-icon>sentiment_very_dissatisfied</md-icon>
                </md-button>
            </md-list-item>
        </md-list>
    </md-drawer>
</template>

<script>
  import DrawsService from '@/services/DrawsService';

  export default {
    name: 'DrawsParticipants',
    props: {
      drawId: {
        type: String,
        default: null
      },
      draw: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        isSaving: false,
        participants: []
      };
    },
    computed: {
      active: {
        get: function() {
          return this.drawId !== null;
        },
        set: function() {
          this.close();
        }
      },
      isFinished() {
        return this.draw.status === 'FINISHED';
      },
      hasSelectedParticipants() {
        return this.participants.find(participant => participant.status !== undefined);
      }
    },
    watch: {
      drawId: function() {
        if(this.drawId !== null) {
          this.participants = JSON.parse(JSON.stringify(this.draw.participants));
        }
      }
    },
    methods: {
      addStatus(status, participant, participantId) {
        participant.status = status;
        this.participants.splice(participantId, 1, participant);
      },
      save() {
        this.isSaving = true;
        this.draw.status = 'FINISHED';
        this.draw.participants = this.participants;

        DrawsService.update(this.draw, this.drawId)
          .then(() => {
            this.isSaving = false;
            this.close();
          })
          .catch(err => {
            console.error(err);
            this.isSaving = false;
            this.$store.commit('notification/setNotification', {
              active: true,
              message: this.$t('DRAWS_PARTICIPANTS.ERROR.SAVING'),
              action: {
                label: this.$t('ACTIONS.RETRY'),
                handler: () => this.save()
              }
            });
          })
      },
      close() {
        this.$emit('closed');
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
