import firebase from 'firebase/app'

class TweetsService {

  searchAll(params) {
    return firebase.functions().httpsCallable('findAllTweets')({ params: params })
      .then(result => result.data.tweets);
  }

  findAllTweetersInRetweets(params) {
    return firebase.functions().httpsCallable('findAllTweetersInRetweets')({ params: params })
      .then(result => result.data.tweeters);
  }

}

export default new TweetsService()
