import reduxApi, { transformers } from 'redux-api';
import 'isomorphic-fetch';
import adapterFetch from 'redux-api/lib/adapters/fetch';

const headers = {
	'User-Agent': 'redux-api',
	'Accept': 'application/json'
}

export default reduxApi({
	users: {
		url: `/api/users`,
		options: { headers },

		transformer: transformers.array
	}
}).use('fetch', adapterFetch(fetch));
