import firebase from 'firebase/app'

class OrganizationsService {

  findAllForCurrentUser() {
    return firebase.firestore()
      .collection('organizations')
      .where(`members.${firebase.auth().currentUser.uid}`, '==', true)
      .get()
      .then(query => {
        const organizations = {}
        query.forEach(doc => organizations[doc.id] = doc.data())
        return organizations
      })
  }

  findOneForCurrentUser(organizationId) {
    return firebase.firestore()
      .collection('organizations')
      .doc(organizationId)
      .get()
      .then(organization => {
        if(!organization.exists) {
          throw new Error(`Organization ${organizationId} doesn't exist !!`)
        }

        return organization.data()
      })
  }

  create(organization) {
    organization.createdBy = firebase.auth().currentUser.uid
    organization.createdAt = new Date().getTime()
    organization.members = {}
    organization.members[firebase.auth().currentUser.uid] = true

    return firebase.firestore()
      .collection('organizations')
      .add(organization)
  }

}

export default new OrganizationsService()
