import firebase from 'firebase/app'

class DrawsService {

  findAllForOrganization(organizationId) {
    return firebase.firestore()
      .collection('draws')
      .where('organization', '==', organizationId)
      .get()
      .then(query => {
        const draws = {}
        query.forEach(doc => draws[doc.id] = doc.data())
        return draws
      })
  }

}

export default new DrawsService()
