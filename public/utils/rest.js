import restUW                 from 'rest';
import mime                   from 'rest/interceptor/mime';
import errorCode              from 'rest/interceptor/errorCode';

//Unwrapped rest client
export default restUW.wrap(mime,{ mime: 'application/json; charset=utf-8' })
                     .wrap(errorCode);
