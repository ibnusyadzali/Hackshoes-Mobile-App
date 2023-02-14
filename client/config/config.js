import { ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({ 
    // put Forwarding url at ngrok here
    uri: 'https://3187-2001-448a-2076-1fd7-49a7-7308-405-5326.ap.ngrok.io',
    cache: new InMemoryCache(),
  });

export default client