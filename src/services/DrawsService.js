import firebase from 'firebase/app'
import TweetsService from "./TweetsService";

class DrawsService {

  findAllForOrganization(organizationId) {
    return firebase.firestore()
      .collection('draws')
      .where('organization', '==', organizationId)
      .get()
      .then(query => {
        const draws = {};
        query.forEach(doc => draws[doc.id] = doc.data());
        return draws;
      })
  }

  create(draw) {
    draw.createdBy = firebase.auth().currentUser.uid;
    draw.createdAt = new Date().getTime();

    return firebase.firestore()
      .collection('draws')
      .add(draw)
  }

  drawLotsOnTwitter(draw, id) {
    return TweetsService.findAllTweetersInRetweets()
      .then(tweeters => {

      });
  }

}

export default new DrawsService()
