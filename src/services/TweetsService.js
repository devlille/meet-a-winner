import firebase from 'firebase/app'

class TweetsService {

  findAllTweetsByQuery(params) {
    return firebase.functions().httpsCallable('findAllTweetsByQuery')({ params: params })
      .then(result => result.data.tweets);
  }

}

export default new TweetsService()
