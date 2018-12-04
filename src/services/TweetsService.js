import firebase from 'firebase/app'

class TweetsService {

  searchAll(params) {
    return firebase.functions().httpsCallable('findAllTweets')({ params: params })
      .then(result => result.data.tweets);
  }

}

export default new TweetsService()
