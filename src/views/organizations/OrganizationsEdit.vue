<template>
  <div class="organizations-edit">
    <form novalidate>
      <h2>
        <md-button class="md-icon-button"
                   @click="cancel">
          <md-icon>arrow_back</md-icon>
        </md-button>
        {{ $t('ORGANIZATIONS_EDIT.LABEL') }}
      </h2>
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
                     :disabled="$v.organization.$invalid || isSaving"
                     @click="save">
            {{ $t('ACTIONS.VALID') }}
          </md-button>
        </md-card-actions>
      </md-card>
    </form>

    <md-snackbar md-position="left"
                 :md-active.sync="showSnackbar"
                 md-persistent>
      <span>{{ $t('ORGANIZATIONS_EDIT.ERROR') }}</span>
    </md-snackbar>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import {required} from 'vuelidate/lib/validators'
  import OrganizationsService from "../../services/OrganizationsService";

  export default {
    name: 'organizations-edit',
    data() {
      return {
        isSaving: false,
        showSnackbar: false,
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
        this.isSaving = true

        OrganizationsService.create(this.organization)
          .then(() => this.$router.push({ name: 'organizations' }))
          .catch(err => {
            console.error(err)
            this.isSaving = false
            this.showSnackbar = true
          })
      },
      cancel() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="scss">
  .organizations-edit {
    display: grid;
    grid-template-columns: 20% 60% 20%;
    padding: 10px 0;

    form {
      grid-column: 2;

      h2 {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
