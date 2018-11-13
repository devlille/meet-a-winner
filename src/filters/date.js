import moment from 'moment';
import Vue from 'vue';

function dateFilter(input, format) {
  let date = moment(input)

  if(input === 'now') {
    date = moment()
  }

  if(format === 'v') {
    return date.fromNow()
  }

  return date.format(format)
}

export default Vue.filter('date', dateFilter);
