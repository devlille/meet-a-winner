<template>
  <div class="organizations-edit mw-basic-layout">
    <div class="mw-content">
      <app-title :title="$t('ORGANIZATIONS_EDIT.LABEL')" />

      <form novalidate
            @submit.prevent="save">
        <md-card>
          <md-card-content>
            <md-field>
              <label for="name">{{ $t('ORGANIZATION.NAME.LABEL') }}</label>
              <md-input name="name"
                        id="name"
                        v-model.trim="organization.name"
                        :disabled="isSaving" />
              <span class="md-helper-text">{{ $t('ORGANIZATION.NAME.EXAMPLE') }}</span>
            </md-field>
          </md-card-content>
          <md-card-actions>
            <md-button @click="cancel">{{ $t('ACTIONS.CANCEL') }}</md-button>
            <md-button class="md-raised md-primary"
                       type="submit"
                       :disabled="$v.organization.$invalid || isSaving">
              {{ $t('ACTIONS.VALID') }}
            </md-button>
          </md-card-actions>
        </md-card>
      </form>
    </div>
  </div>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'
  import OrganizationsService from '@/services/OrganizationsService';
  import AppTitle from '@/components/app-title/AppTitle';

  export default {
    name: 'organizations-edit',
    components: {AppTitle},
    data() {
      return {
        isSaving: false,
        organization: {}
      }
    },
    validations: {
      organization: {
        name: {
          required
        }
      }
    },
    methods: {
      save() {
        this.isSaving = true;

        OrganizationsService.create(this.organization)
          .then(() => {
            this.$router.push({ name: 'organizations' });
          })
          .catch(err => {
            console.error(err);
            this.isSaving = false;
            this.$store.commit('notification/setNotification', {
              active: true,
              message: this.$t('ORGANIZATIONS_EDIT.ERROR')
            });
          })
      },
      cancel() {
        this.$router.back();
      }
    }
  }
</script>
